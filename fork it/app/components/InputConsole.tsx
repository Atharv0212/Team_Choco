import React from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  DollarSign,
  X,
  Loader2,
  Shuffle,
  Search as SearchIcon,
  Star,
} from "lucide-react";
import { useState } from "react";

const COMMON_ALLERGENS = [
  "peanuts", "peanut", "tree nuts", "almonds", "walnuts", "cashews", "pecans", "pistachios",
  "milk", "dairy", "lactose", "cheese", "butter", "cream",
  "eggs", "egg",
  "fish", "salmon", "tuna", "cod",
  "shellfish", "shrimp", "crab", "lobster", "oysters", "clams", "mussels",
  "wheat", "gluten",
  "soy", "soybean", "tofu",
  "sesame", "sesame seeds",
  "mustard", "celery", "lupin", "molluscs",
  "sulfites", "sulphites",
];

type Intent = "blend" | "similar";

interface InputConsoleProps {
  onSearch: (data: any) => void;
}

const BUDGET_OPTIONS = [
  { value: "low", label: "Low Cost" },
  { value: "moderate", label: "Moderate" },
  { value: "high", label: "Premium" },
  { value: "no-preference", label: "No Preference" },
] as const;

export function InputConsole({ onSearch }: InputConsoleProps) {
  const [selectedIntent, setSelectedIntent] = useState<Intent>("blend");
  const [blendTokens, setBlendTokens] = useState<string[]>([]);
  const [blendInput, setBlendInput] = useState("");
  const [similarInput, setSimilarInput] = useState("");
  const [exclusions, setExclusions] = useState<string[]>([]);
  const [currentExclusion, setCurrentExclusion] = useState("");
  const [exclusionError, setExclusionError] = useState("");
  const [budget, setBudget] = useState<string>("no-preference");
  const [isSearching, setIsSearching] = useState(false);

  const addBlendToken = () => {
    const trimmed = blendInput.trim();
    if (!trimmed) return;
    if (blendTokens.some((t) => t.toLowerCase() === trimmed.toLowerCase())) return;
    setBlendTokens([...blendTokens, trimmed]);
    setBlendInput("");
  };

  const removeBlendToken = (index: number) => {
    setBlendTokens(blendTokens.filter((_, i) => i !== index));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (selectedIntent === "blend") {
      if (e.key === "Enter") {
        e.preventDefault();
        addBlendToken();
      }
      if (e.key === "Backspace" && !blendInput && blendTokens.length > 0) {
        removeBlendToken(blendTokens.length - 1);
      }
    }
  };

  const validateExclusion = (exclusion: string): boolean => {
    const normalized = exclusion.toLowerCase().trim();
    return COMMON_ALLERGENS.some(
      (allergen) => normalized.includes(allergen) || allergen.includes(normalized)
    );
  };

  const addExclusion = () => {
    const trimmed = currentExclusion.trim();
    if (!trimmed) {
      setExclusionError("Please enter an ingredient");
      return;
    }
    if (exclusions.map((a) => a.toLowerCase()).includes(trimmed.toLowerCase())) {
      setExclusionError("Already excluded");
      return;
    }
    if (!validateExclusion(trimmed)) {
      setExclusionError("Please enter a valid food allergen");
      return;
    }
    setExclusions([...exclusions, trimmed]);
    setCurrentExclusion("");
    setExclusionError("");
  };

  const removeExclusion = (index: number) => {
    setExclusions(exclusions.filter((_, i) => i !== index));
  };

  const isSearchValid = () => {
    if (selectedIntent === "blend") return blendTokens.length >= 1;
    return similarInput.trim().length > 0;
  };

  const handleSearch = async () => {
    if (!isSearchValid()) return;
    setIsSearching(true);

    const payload = {
      mode: selectedIntent,
      taste_inputs: selectedIntent === "blend" ? blendTokens : [similarInput.trim()],
      exclude: exclusions,
      budget,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: any;
      try {
        data = await response.json();
      } catch {
        data = { error: "Invalid response from server." };
      }

      setIsSearching(false);

      if (!response.ok) {
        onSearch({ error: data?.error || `Request failed (${response.status})`, recommended_recipes: [] });
        return;
      }
      if (data?.error) {
        onSearch({ error: data.error, recommended_recipes: data.recommended_recipes ?? [] });
        return;
      }
      onSearch({ ...data, recommended_recipes: data.recommended_recipes ?? [] });
    } catch (error) {
      console.error("Backend error:", error);
      setIsSearching(false);
      onSearch({
        error: "Network error. Is the backend running at http://127.0.0.1:8000?",
        recommended_recipes: [],
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pb-20 text-white">
      {/* What would you like to explore? */}
      <section className="mb-10">
        <h2 className="text-xl md:text-2xl text-white mb-6 font-medium">
          What would you like to explore?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Blend Flavors card – vertical layout: icon on top, then title, then description */}
          <motion.button
            type="button"
            onClick={() => setSelectedIntent("blend")}
            className={`text-left rounded-2xl border-2 p-6 md:p-8 transition-all duration-200 ${
              selectedIntent === "blend"
                ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                : "border-slate-600 bg-slate-800/50 hover:border-slate-500"
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex flex-col items-center md:block">
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4 md:mb-5">
                <Shuffle className="w-7 h-7 text-white" aria-hidden />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Blend Flavors</h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Combine multiple ingredients or taste profiles to discover foods that lie between them.
              </p>
            </div>
          </motion.button>

          {/* Find Similar Taste card – horizontal layout: icon left, text right */}
          <motion.button
            type="button"
            onClick={() => setSelectedIntent("similar")}
            className={`text-left rounded-2xl border-2 p-6 md:p-8 transition-all duration-200 flex flex-row gap-4 ${
              selectedIntent === "similar"
                ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                : "border-slate-600 bg-slate-800/50 hover:border-slate-500"
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="shrink-0 w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
              <SearchIcon className="w-7 h-7 text-white" aria-hidden />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Find Similar Taste</h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Enter a dish or ingredient to explore new experiences with similar flavor.
              </p>
            </div>
          </motion.button>
        </div>

        {/* Single input below both cards */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Enter flavors, ingredients, or dishes <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={selectedIntent === "blend" ? blendInput : similarInput}
            onChange={(e) =>
              selectedIntent === "blend"
                ? setBlendInput(e.target.value)
                : setSimilarInput(e.target.value)
            }
            onKeyDown={handleInputKeyDown}
            placeholder="Try 'grilled salmon', 'umami', 'dark chocolate'..."
            className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-600 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition"
          />
          <p className="text-slate-500 text-sm mt-2">
            {selectedIntent === "blend"
              ? "Press Enter to add + Backspace to remove • Minimum 1 flavor required"
              : "Type a dish or ingredient and click Explore Flavor"}
          </p>
          {selectedIntent === "blend" && blendTokens.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {blendTokens.map((token, index) => (
                <span
                  key={`${token}-${index}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/20 border border-violet-500/40 text-sm text-white"
                >
                  {token}
                  <button
                    type="button"
                    onClick={() => removeBlendToken(index)}
                    className="p-0.5 rounded hover:bg-white/20 transition"
                    aria-label={`Remove ${token}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Constraints & Preferences */}
      <section className="mb-10">
        <h2 className="text-xl md:text-2xl text-white mb-6 font-medium">
          Constraints & Preferences
        </h2>

        {/* Allergies */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm font-medium text-slate-300">
              Any allergies or ingredients to avoid?
            </label>
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" aria-hidden />
          </div>
          <input
            type="text"
            value={currentExclusion}
            onChange={(e) => setCurrentExclusion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addExclusion()}
            placeholder="e.g., peanuts, dairy, shellfish, gluten..."
            className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-600 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition"
          />
          {exclusionError && <p className="text-red-400 text-sm mt-1">{exclusionError}</p>}
          <p className="text-slate-500 text-sm mt-2">
            Tell us what you can&apos;t consume - we&apos;ll keep your flavor safe.
          </p>
          {exclusions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {exclusions.map((ex, index) => (
                <span
                  key={`${ex}-${index}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/80 text-sm text-white"
                >
                  {ex}
                  <button
                    type="button"
                    onClick={() => removeExclusion(index)}
                    className="p-0.5 rounded hover:bg-white/20 transition"
                    aria-label={`Remove ${ex}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Budget Sensitivity – vertical buttons, different layout from exploration cards */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-5 h-5 text-slate-400" aria-hidden />
            <span className="text-sm font-medium text-slate-300">Budget Sensitivity</span>
          </div>
          <div className="flex flex-col gap-3 max-w-[200px]">
            {BUDGET_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setBudget(opt.value)}
                className={`min-w-[140px] px-5 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                  budget === opt.value
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                    : "bg-slate-800 text-slate-300 border border-slate-600 hover:border-slate-500 hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-2">
            Prioritizes ingredients based on availability and common usage.
          </p>
        </div>
      </section>

      {/* Explore Flavor CTA */}
      <div className="flex flex-col items-center">
        <motion.button
          type="button"
          onClick={handleSearch}
          disabled={!isSearchValid() || isSearching}
          className="w-full max-w-md py-4 px-6 rounded-xl bg-gradient-to-r from-blue-700 to-violet-600 text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-violet-500 transition-all"
          whileHover={!isSearching && isSearchValid() ? { scale: 1.02 } : {}}
          whileTap={!isSearching && isSearchValid() ? { scale: 0.98 } : {}}
        >
          {isSearching ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Star className="w-5 h-5" />
          )}
          {isSearching ? "Searching..." : "Explore Flavor"}
        </motion.button>
        <p className="text-slate-500 text-sm mt-3 text-center">
          Results ranked by flavor similarity under your constraints.
        </p>
      </div>
    </div>
  );
}
