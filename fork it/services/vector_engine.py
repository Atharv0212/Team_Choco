import numpy as np

TASTE_DIMENSIONS = [
    "sweet", "fruity", "bitter",
    "umami", "salty", "sour",
    "spicy", "nutty"
]

def build_vector(compounds):
    vector = np.zeros(len(TASTE_DIMENSIONS))

    for compound in compounds:
        # FlavorDB returns Taste_threshold_values
        taste_values = compound.get("Taste_threshold_values", "")
        if not taste_values:
            continue

        taste_values = taste_values.lower()

        for i, dim in enumerate(TASTE_DIMENSIONS):
            if dim in taste_values:
                vector[i] += 1

    norm = np.linalg.norm(vector)
    return vector / norm if norm > 0 else vector

def centroid(vectors):
    return np.mean(vectors, axis=0)

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-9)


def _ingredient_to_queries(name):
    """Produce FlavorDB lookup terms: full name first, then first word (e.g. 'habanero pepper' -> ['habanero pepper', 'habanero'])."""
    name = str(name).strip()
    if not name:
        return []
    parts = name.split()
    queries = [name]
    if len(parts) > 1:
        queries.append(parts[0])
    return queries


def _title_to_queries(title):
    """Extract meaningful words from recipe title for FlavorDB lookup (skip stopwords)."""
    if not title:
        return []
    stop = {"easy", "the", "a", "an", "and", "with", "for", "in", "on", "or", "best", "quick", "simple", "magpie's", "grandma's", "mom's", "dad's"}
    words = []
    for part in str(title).replace(",", " ").replace("'", " ").split():
        w = part.strip().lower()
        if len(w) > 2 and w not in stop and not w.isdigit():
            words.append(w)
    return words[:5]


def build_recipe_vector(recipe, get_taste_compounds_fn):
    """
    Build 8-dim flavor vector for a recipe using FlavorDB.
    Uses recipe ingredients when available; otherwise falls back to recipe title words.
    Tries multiple lookup strategies so we get non-zero vectors when possible.
    """
    all_compounds = []
    ingredients = recipe.get("ingredients") or []

    if ingredients:
        for item in ingredients:
            name = item.get("name") if isinstance(item, dict) else str(item)
            for query in _ingredient_to_queries(name):
                compounds = get_taste_compounds_fn(query)
                if compounds:
                    all_compounds.extend(compounds)
                    break
    else:
        title = recipe.get("Recipe_title") or recipe.get("recipe_title") or ""
        if title:
            full = get_taste_compounds_fn(str(title).strip())
            if full:
                all_compounds.extend(full)
            else:
                for word in _title_to_queries(title):
                    compounds = get_taste_compounds_fn(word)
                    if compounds:
                        all_compounds.extend(compounds)

    return build_vector(all_compounds)
