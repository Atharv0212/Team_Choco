import requests
from config import RECIPE_BASE_URL, HEADERS

RECIPESINFO_URL = f"{RECIPE_BASE_URL}/recipe2-api/recipe/recipesinfo"
WITH_INGREDIENTS_URL = f"{RECIPE_BASE_URL}/recipe2-api/recipe/recipe-day/with-ingredients-categories"

REQUEST_TIMEOUT = 30


def _normalize_title(title):
    if not title:
        return ""
    return str(title).strip().lower()


def _extract_list(data, payload_key="payload", list_key="data"):
    """Extract recipe list from API response (payload.data or data)."""
    if "payload" in data:
        payload = data["payload"]
        if isinstance(payload, list):
            return payload
        return payload.get(list_key, [])
    return data.get("data", data.get(list_key, []))


def get_recipes_info(page=1, limit=30):
    """Fetch recipe metadata (no ingredients) from recipesinfo."""
    try:
        response = requests.get(
            RECIPESINFO_URL,
            headers=HEADERS,
            params={"page": page, "limit": limit},
            timeout=REQUEST_TIMEOUT,
        )
    except requests.RequestException as e:
        print("RecipeDB recipesinfo request error:", e)
        return []

    if response.status_code != 200:
        print("RecipeDB recipesinfo error:", response.status_code, response.text[:200])
        return []

    try:
        data = response.json()
    except Exception as e:
        print("RecipeDB recipesinfo JSON error:", e)
        return []

    recipes = _extract_list(data)
    print(f"Page {page}: fetched {len(recipes)} recipes from /recipesinfo")
    return recipes


def get_recipes_with_ingredients(page=1, limit=30):
    """Fetch recipes with ingredients from recipe-day/with-ingredients-categories."""
    try:
        response = requests.get(
            WITH_INGREDIENTS_URL,
            headers=HEADERS,
            params={"page": page, "limit": limit},
            timeout=REQUEST_TIMEOUT,
        )
    except requests.RequestException as e:
        print("RecipeDB with-ingredients request error:", e)
        return []

    if response.status_code != 200:
        print("RecipeDB with-ingredients error:", response.status_code, response.text[:200])
        return []

    try:
        data = response.json()
    except Exception as e:
        print("RecipeDB with-ingredients JSON error:", e)
        return []

    recipes = _extract_list(data)
    print(f"Page {page}: fetched {len(recipes)} recipes from /with-ingredients-categories")
    
    # Count how many have ingredients
    with_ing = sum(1 for r in recipes if r.get("ingredients"))
    print(f"Page {page}: {with_ing}/{len(recipes)} have ingredients")
    
    return recipes


def get_enriched_recipes(pages=3, per_page=30):
    """
    Fetch from both endpoints, join by Recipe_title, return list of recipes
    with metadata (from recipesinfo) + ingredients (from with-ingredients).
    """
    all_info = []
    for p in range(1, pages + 1):
        chunk = get_recipes_info(page=p, limit=per_page)
        all_info.extend(chunk)
        if len(chunk) < per_page:
            break

    # Build lookup: normalized_title -> ingredients list
    ingredients_by_title = {}
    for p in range(1, pages + 1):
        chunk = get_recipes_with_ingredients(page=p, limit=per_page)
        for recipe in chunk:
            title = recipe.get("Recipe_title") or recipe.get("recipe_title") or ""
            key = _normalize_title(title)
            ing = recipe.get("ingredients") or []
            if key and ing:
                ingredients_by_title[key] = ing
        if len(chunk) < per_page:
            break

    # Enrich each recipe from recipesinfo with ingredients when available
    enriched = []
    seen = set()
    for r in all_info:
        title = r.get("Recipe_title") or ""
        key = _normalize_title(title)
        if key in seen:
            continue
        seen.add(key)
        rec = dict(r)
        rec["ingredients"] = ingredients_by_title.get(key, [])
        enriched.append(rec)

    return enriched
