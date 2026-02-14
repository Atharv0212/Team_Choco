from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import RecommendRequest
import services.vector_engine as ve
from services.flavor_service import get_taste_compounds
from services.recipe_service import get_recipes
import numpy as np

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "FlavorOrbit Backend Running"}

@app.post("/recommend")
def recommend(data: RecommendRequest):

    # 1️⃣ Build flavor vectors from input
    vectors = []

    for taste in data.taste_inputs:
        compounds = get_taste_compounds(taste)
        vector = ve.build_vector(compounds)

        if np.linalg.norm(vector) > 0:
            vectors.append(vector)

    if not vectors:
        return {"error": "No flavor profile found."}

    # 2️⃣ Blend or single mode
    if data.mode == "blend":
        target_vector = ve.centroid(vectors)
    else:
        target_vector = vectors[0]

    # 3️⃣ Fetch recipes
    recipes = get_recipes()
    results = []

    for recipe in recipes:
        title = recipe.get("Recipe_title", "").lower()

        # 4️⃣ Apply exclusions
        if any(ex.lower() in title for ex in data.exclude):
            continue

        # Temporary recipe vector (can improve later)
        recipe_vector = np.random.rand(len(target_vector))
        similarity = ve.cosine_similarity(target_vector, recipe_vector)

        results.append({
            "title": recipe.get("Recipe_title"),
            "region": recipe.get("Region"),
            "similarity_score": round(float(similarity), 3),
            "calories": recipe.get("Calories")
        })

    # 5️⃣ Ranking logic
    if data.budget == "low":
        results = sorted(results, key=lambda x: x["calories"] or 999)
    else:
        results = sorted(results, key=lambda x: -x["similarity_score"])

    return {
        "query_summary": data.dict(),
        "recommended_recipes": results[:10]
    }
