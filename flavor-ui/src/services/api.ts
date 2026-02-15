const BASE_URL = "http://127.0.0.1:8000";

export interface RecommendPayload {
  mode: "blend" | "single";
  taste_inputs: string[];
  exclude: string[];
  budget: "low" | "moderate" | "high" | "no-preference";
}

export interface RecommendResponse {
  error?: string;
  recommended_recipes?: Array<{
    title?: string;
    region?: string;
    similarity_score?: number;
    calories?: string | number;
  }>;
  query_summary?: unknown;
}

export const recommendRecipes = async (payload: RecommendPayload): Promise<RecommendResponse> => {
  const response = await fetch(`${BASE_URL}/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data: RecommendResponse;
  try {
    data = await response.json();
  } catch {
    data = { error: "Invalid response from server.", recommended_recipes: [] };
  }

  if (!response.ok) {
    return {
      error: (data as any)?.error || `Request failed (${response.status})`,
      recommended_recipes: [],
    };
  }

  return {
    ...data,
    recommended_recipes: data.recommended_recipes ?? [],
  };
};
