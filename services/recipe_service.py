import requests
from config import RECIPE_BASE_URL, HEADERS

def get_recipes(limit=30):
    url = f"{RECIPE_BASE_URL}/recipe2-api/recipe/recipesinfo"

    params = {
        "page": 1,
        "limit": limit
    }

    response = requests.get(url, headers=HEADERS, params=params)

    if response.status_code != 200:
        print("RecipeDB Error:", response.text)
        return []

    data = response.json()

    if "payload" in data:
        return data["payload"].get("data", [])

    return data.get("data", [])
