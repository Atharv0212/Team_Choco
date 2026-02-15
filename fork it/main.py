from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import RecommendRequest
import services.vector_engine as ve
from services.flavor_service import get_taste_compounds, get_taste_compounds_cached
from services.recipe_service import get_enriched_recipes
import numpy as np
from typing import List
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Cache for recipes and their pre-computed vectors
RECIPE_CACHE = None
RECIPE_VECTORS_CACHE = None


def get_cached_recipes():
    global RECIPE_CACHE
    if RECIPE_CACHE is None:
        logger.info("Fetching recipes from RecipeDB (this may take a moment)...")
        RECIPE_CACHE = get_enriched_recipes(pages=20, per_page=100)
        logger.info(f"Cached {len(RECIPE_CACHE)} recipes")
    return RECIPE_CACHE


def get_recipe_vectors():
    """Pre-compute and cache recipe vectors (runs once at startup)"""
    global RECIPE_VECTORS_CACHE
    if RECIPE_VECTORS_CACHE is not None:
        return RECIPE_VECTORS_CACHE
    
    recipes = get_cached_recipes()
    logger.info(f"Starting to pre-compute vectors for {len(recipes)} recipes...")
    
    vectors = []
    zero_vector_count = 0
    no_ingredients_count = 0
    
    for i, recipe in enumerate(recipes):
        # Use cached version to save tokens
        recipe_vector = ve.build_recipe_vector(recipe, get_taste_compounds_cached)
        norm = np.linalg.norm(recipe_vector)
        
        ingredients = recipe.get("ingredients") or []
        
        if not ingredients:
            no_ingredients_count += 1
        elif norm == 0:
            zero_vector_count += 1
            
        if norm > 0:
            vectors.append({
                'recipe': recipe,
                'vector': recipe_vector,
                'norm': norm
            })
        
        # Log progress every 100 recipes
        if (i + 1) % 100 == 0:
            logger.info(f"Processed {i+1}/{len(recipes)} recipes, {len(vectors)} with valid vectors")
    
    logger.info(f"=== Vector Summary ===")
    logger.info(f"Total recipes: {len(recipes)}")
    logger.info(f"Recipes with no ingredients: {no_ingredients_count}")
    logger.info(f"Recipes with ingredients but zero vector: {zero_vector_count}")
    logger.info(f"Recipes with valid vectors: {len(vectors)}")
    
    RECIPE_VECTORS_CACHE = vectors
    return vectors

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict later in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "FlavorOrbit Backend Running"}


@app.get("/cache/status")
def cache_status():
    """Check cache status"""
    from services.flavor_service import FLAVOR_CACHE
    
    # Count recipes with valid vectors
    valid_recipes = len([v for v in RECIPE_VECTORS_CACHE]) if RECIPE_VECTORS_CACHE else 0
    
    return {
        "cached": RECIPE_CACHE is not None,
        "recipe_count": len(RECIPE_CACHE) if RECIPE_CACHE else 0,
        "vectors_computed": RECIPE_VECTORS_CACHE is not None,
        "vector_count": valid_recipes,
        "flavor_cache_size": len(FLAVOR_CACHE),
        "sample_recipes": [r['recipe'].get('Recipe_title', 'Unknown')[:30] for r in RECIPE_VECTORS_CACHE[:5]] if RECIPE_VECTORS_CACHE else []
    }


@app.get("/debug/recipes")
def debug_recipes():
    """Debug: show sample recipes and their ingredients"""
    from services.flavor_service import FLAVOR_CACHE
    
    sample = []
    if RECIPE_CACHE:
        for r in RECIPE_CACHE[:10]:
            sample.append({
                "title": r.get("Recipe_title", "Unknown")[:40],
                "region": r.get("Region", "Unknown"),
                "ingredients": r.get("ingredients", [])[:5] if r.get("ingredients") else [],
                "ingredient_count": len(r.get("ingredients", []))
            })
    
    return {
        "total_recipes": len(RECIPE_CACHE) if RECIPE_CACHE else 0,
        "sample": sample
    }


@app.post("/cache/clear")
def clear_cache():
    """Clear recipe cache to refetch from API"""
    global RECIPE_CACHE, RECIPE_VECTORS_CACHE
    RECIPE_CACHE = None
    RECIPE_VECTORS_CACHE = None
    # Also clear flavor cache
    from services.flavor_service import FLAVOR_CACHE
    FLAVOR_CACHE.clear()
    return {"message": "Cache cleared"}


@app.post("/recommend")
def recommend(data: RecommendRequest):

    # Ensure safe defaults
    taste_inputs: List[str] = data.taste_inputs or []
    exclude_list: List[str] = data.exclude or []

    # 1️⃣ Build flavor vectors from input
    vectors = []

    for taste in taste_inputs:
        compounds = get_taste_compounds(taste)
        logger.info(f"Input '{taste}': got {len(compounds)} compounds from FlavorDB")
        vector = ve.build_vector(compounds)
        logger.info(f"Input '{taste}': vector = {vector}, norm = {np.linalg.norm(vector)}")

        if vector is not None and np.linalg.norm(vector) > 0:
            vectors.append(vector)

    if not vectors:
        return {"error": "No flavor profile found."}

    # 2️⃣ Blend or single mode
    if data.mode == "blend" and len(vectors) > 1:
        target_vector = ve.centroid(vectors)
    else:
        target_vector = vectors[0]

    # 3️⃣ Get pre-computed recipe vectors
    recipe_data = get_recipe_vectors()
    results = []

    for item in recipe_data:
        recipe = item['recipe']
        recipe_vector = item['vector']
        
        title = (recipe.get("Recipe_title") or "").strip()
        if not title:
            continue

        title_lower = title.lower()

        # 4️⃣ Apply exclusions safely
        if any(ex.lower() in title_lower for ex in exclude_list):
            continue

        similarity = ve.cosine_similarity(target_vector, recipe_vector)

        # Skip recipes with zero similarity only
        if similarity <= 0.01:
            continue

        # Safe calorie handling
        calories = recipe.get("Calories")
        try:
            calories = float(calories) if calories is not None else None
        except (ValueError, TypeError):
            calories = None

        results.append({
            "title": title,
            "region": recipe.get("Region"),
            "similarity_score": round(float(similarity), 3),
            "calories": calories
        })

    if not results:
        return {"error": "No recipes matched your filters."}

    # 5️⃣ Ranking logic
    if data.budget == "low":
        # Lowest calories first, None goes last
        results = sorted(
            results,
            key=lambda x: x["calories"] if x["calories"] is not None else float("inf")
        )
    else:
        # Highest similarity first
        results = sorted(
            results,
            key=lambda x: x["similarity_score"],
            reverse=True
        )

    return {
        "query_summary": data.model_dump(),  # Pydantic v2 safe
        "recommended_recipes": results[:10]
    }
