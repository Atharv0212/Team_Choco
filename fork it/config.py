import os
from dotenv import load_dotenv

load_dotenv()

FLAVOR_BASE_URL = os.getenv("FLAVOR_BASE_URL")
RECIPE_BASE_URL = os.getenv("RECIPE_BASE_URL")
API_KEY = os.getenv("API_KEY")

HEADERS = {
    "Authorization": f"Bearer {API_KEY}"
}
