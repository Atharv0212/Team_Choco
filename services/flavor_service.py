import requests
from config import FLAVOR_BASE_URL, HEADERS
import requests
from config import FLAVOR_BASE_URL, HEADERS

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
    return data.get("content", [])


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