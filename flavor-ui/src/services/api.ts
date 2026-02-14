const BASE_URL = "http://localhost:8000";

export interface RecommendPayload {
  mode: "blend" | "single";
  taste_inputs: string[];
  exclude: string[];
  budget: "low" | "high";
}

export const recommendRecipes = async (payload: RecommendPayload) => {
  const response = await fetch(`${BASE_URL}/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return await response.json();
};
