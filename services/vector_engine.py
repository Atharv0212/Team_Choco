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
