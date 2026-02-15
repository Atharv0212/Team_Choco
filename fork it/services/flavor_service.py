import requests
from config import FLAVOR_BASE_URL, HEADERS
import requests
from config import FLAVOR_BASE_URL, HEADERS
from functools import lru_cache

# Cache for FlavorDB API responses
FLAVOR_CACHE = {}

def get_taste_compounds_cached(term: str):
    """Get taste compounds with caching to save API tokens."""
    term_lower = term.lower().strip()
    
    if term_lower in FLAVOR_CACHE:
        return FLAVOR_CACHE[term_lower]
    
    # Fetch from API
    result = get_taste_compounds(term)
    
    # Cache the result
    FLAVOR_CACHE[term_lower] = result
    
    return result


def get_taste_compounds(term: str):
    url = f"{FLAVOR_BASE_URL}/properties/taste-threshold"

    params = {
        "values": term,
        "page": 0,
        "size": 50
    }

    response = requests.get(url, headers=HEADERS, params=params)

    if response.status_code != 200:
        print("FlavorDB Error:", response.text)
        return []

    data = response.json()
    content = data.get("content", [])
    if not content and "payload" in data:
        content = data.get("payload") or {}
        if isinstance(content, dict):
            content = content.get("content", [])
    return content if isinstance(content, list) else []


'''
def get_taste_compounds(term: str):
    url = f"{FLAVOR_BASE_URL}/properties/taste-threshold"

    params = {
        "values": term,
        "page": 0,
        "size": 50
    }

    response = requests.get(url, headers=HEADERS, params=params)

    if response.status_code != 200:
        print("FlavorDB Error:", response.text)
        return []

    data = response.json()

    # FlavorDB usually nests under payload
    if "payload" in data:
        return data["payload"].get("content", [])

    return data.get("content", [])
'''