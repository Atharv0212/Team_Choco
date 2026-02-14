from pydantic import BaseModel
from typing import List

class RecommendRequest(BaseModel):
    mode: str
    taste_inputs: List[str]
    exclude: List[str]
    budget: str
