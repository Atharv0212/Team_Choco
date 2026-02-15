import { useState } from "react";

const COMMON_ALLERGENS = [
  "peanuts","peanut","tree nuts","almonds","walnuts","cashews","pecans","pistachios",
  "milk","dairy","lactose","cheese","butter","cream",
  "eggs","egg",
  "fish","salmon","tuna","cod",
  "shellfish","shrimp","crab","lobster","oysters","clams","mussels",
  "wheat","gluten",
  "soy","soybean","tofu",
  "sesame","sesame seeds",
  "mustard","celery","lupin","molluscs",
  "sulfites","sulphites",
];

type Intent = "blend" | "similar";

interface InputConsoleProps {
  onSearch: (data: any) => void;
}

export function InputConsole({ onSearch }: InputConsoleProps) {
  const [selectedIntent, setSelectedIntent] = useState<Intent>("blend");

  const [blendTokens, setBlendTokens] = useState<string[]>([]);
  const [blendInput, setBlendInput] = useState("");

  const [similarInput, setSimilarInput] = useState("");

  const [exclusions, setExclusions] = useState<string[]>([]);
  const [currentExclusion, setCurrentExclusion] = useState("");

  const [budget, setBudget] = useState("no-preference");
  const [isSearching, setIsSearching] = useState(false);

  // -------------------------------
  // Blend Functions
  // -------------------------------
  const addBlendToken = () => {
    const trimmed = blendInput.trim();
    if (!trimmed) return;
    if (blendTokens.some(t => t.toLowerCase() === trimmed.toLowerCase())) return;
    setBlendTokens([...blendTokens, trimmed]);
    setBlendInput("");
  };

  const removeBlendToken = (index: number) => {
    setBlendTokens(blendTokens.filter((_, i) => i !== index));
  };

  // -------------------------------
  // Exclusion Functions
  // -------------------------------
  const validateExclusion = (exclusion: string): boolean => {
    const normalized = exclusion.toLowerCase().trim();
    return COMMON_ALLERGENS.some(allergen =>
      normalized.includes(allergen) || allergen.includes(normalized)
    );
  };

  const addExclusion = () => {
    const trimmed = currentExclusion.trim();
    if (!trimmed) {
      return;
    }
    if (exclusions.map(a => a.toLowerCase()).includes(trimmed.toLowerCase())) {
      return;
    }
    if (!validateExclusion(trimmed)) {
      return;
    }
    setExclusions([...exclusions, trimmed]);
    setCurrentExclusion("");
  };

  const removeExclusion = (index: number) => {
    setExclusions(exclusions.filter((_, i) => i !== index));
  };

  // -------------------------------
  // Search Validation
  // -------------------------------
  const isSearchValid = () => {
    if (selectedIntent === "blend") return blendTokens.length >= 1;
    if (selectedIntent === "similar") return similarInput.trim().length > 0;
    return false;
  };

  // -------------------------------
  // 🔥 BACKEND INTEGRATION
  // -------------------------------
  const handleSearch = async () => {
    if (!isSearchValid()) return;

    setIsSearching(true);

    const payload = {
      mode: selectedIntent,
      taste_inputs:
        selectedIntent === "blend"
          ? blendTokens
          : [similarInput.trim()],
      exclude: exclusions,
      budget: budget,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setIsSearching(false);
      onSearch(data);

    } catch (error) {
      console.error("Backend error:", error);
      setIsSearching(false);
    }
  };

  // -------------------------------
  // UI (Minimal to Keep Answer Focused)
  // -------------------------------
  return (
    <div className="p-10 text-white">

      {/* Intent Toggle */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setSelectedIntent("blend")}>Blend</button>
        <button onClick={() => setSelectedIntent("similar")}>Similar</button>
      </div>

      {/* Blend Mode */}
      {selectedIntent === "blend" && (
        <div>
          <input
            value={blendInput}
            onChange={(e) => setBlendInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addBlendToken()}
            placeholder="Add flavor"
          />
          <div className="flex gap-2 mt-2">
            {blendTokens.map((token, index) => (
              <span key={index}>
                {token}
                <button onClick={() => removeBlendToken(index)}>x</button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Similar Mode */}
      {selectedIntent === "similar" && (
        <input
          value={similarInput}
          onChange={(e) => setSimilarInput(e.target.value)}
          placeholder="Enter dish"
        />
      )}

      {/* Allergies */}
      <div className="mt-6">
        <input
          value={currentExclusion}
          onChange={(e) => setCurrentExclusion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addExclusion()}
          placeholder="Allergy"
        />
        <div className="flex gap-2 mt-2">
          {exclusions.map((ex, index) => (
            <span key={index}>
              {ex}
              <button onClick={() => removeExclusion(index)}>x</button>
            </span>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="mt-6">
        <select value={budget} onChange={(e) => setBudget(e.target.value)}>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
          <option value="no-preference">No Preference</option>
        </select>
      </div>

      {/* CTA */}
      <button
        onClick={handleSearch}
        disabled={!isSearchValid() || isSearching}
        className="mt-6 px-6 py-3 bg-purple-600 rounded-lg"
      >
        {isSearching ? "Searching..." : "Explore Flavor"}
      </button>
    </div>
  );
}
