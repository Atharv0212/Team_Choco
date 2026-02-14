import { ResultsView } from '../components/ResultsView';
import { motion } from 'motion/react';
import { Shuffle, Search } from 'lucide-react';
import { useState } from 'react';
import { recommendRecipes } from '../services/api';
import type { RecommendPayload } from '../services/api';


export function ExplorePage() {
  const [backendData, setBackendData] = useState<any>(null);
  const [budget, setBudget] = useState("No Preference");
  const [mode, setMode] = useState<"blend" | "single">("blend");

  const [flavorInput, setFlavorInput] = useState("");
  const [excludeInput, setExcludeInput] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!flavorInput.trim()) return;

    const mappedBudget =
      budget === "Low Cost" ? "low" :
      budget === "Premium" ? "high" :
      "low"; // default

    const payload: RecommendPayload = {
      mode,
      taste_inputs: flavorInput.split(",").map(f => f.trim()),
      exclude: excludeInput
        ? excludeInput.split(",").map(e => e.trim())
        : [],
      budget: mappedBudget as "low" | "high",
    };

    try {
      setLoading(true);
      const data = await recommendRecipes(payload);
      setBackendData(data);
    } catch (err) {
      console.error("Backend error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1023] pt-24 text-white">

      {/* HERO */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#0B1023] to-[#0F172A] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">
            Discover Your Next
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">
              Flavor Adventure
            </span>
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Configure your preferences and let our AI-powered engine find
            the perfect flavor matches for you.
          </p>
        </motion.div>
      </section>

      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-2xl rounded-3xl p-12 border border-white/10 shadow-2xl">

          <h2 className="text-3xl font-semibold mb-10">
            What would you like to explore?
          </h2>

          {/* MODE CARDS */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">

            <div
              onClick={() => setMode("blend")}
              className={`relative rounded-2xl p-[1px] cursor-pointer transition-all duration-300 ${
                mode === "blend"
                  ? "bg-gradient-to-r from-violet-500 to-orange-400 shadow-lg shadow-violet-500/20"
                  : "bg-slate-800 hover:bg-gradient-to-r hover:from-violet-500 hover:to-orange-400"
              }`}
            >
              <div className="rounded-2xl bg-slate-900 p-8 h-full">
                <Shuffle className="w-6 h-6 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Blend Flavors
                </h3>
              </div>
            </div>

            <div
              onClick={() => setMode("single")}
              className={`relative rounded-2xl p-[1px] cursor-pointer transition-all duration-300 ${
                mode === "single"
                  ? "bg-gradient-to-r from-violet-500 to-orange-400 shadow-lg shadow-violet-500/20"
                  : "bg-slate-800 hover:bg-gradient-to-r hover:from-violet-500 hover:to-orange-400"
              }`}
            >
              <div className="rounded-2xl bg-slate-900 p-8 h-full">
                <Search className="w-6 h-6 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Find Similar Taste
                </h3>
              </div>
            </div>

          </div>

          {/* FLAVOR INPUT */}
          <div className="mb-12">
            <label className="text-sm text-slate-400 block mb-3">
              Enter flavors (comma separated)
            </label>
            <input
              type="text"
              value={flavorInput}
              onChange={(e) => setFlavorInput(e.target.value)}
              placeholder="spicy, chocolate, umami"
              className="w-full bg-slate-900 border border-white/10 rounded-full px-6 py-4 focus:outline-none focus:border-violet-500 transition"
            />
          </div>

          {/* CONSTRAINTS */}
          <div className="border-t border-white/10 pt-10">
            <h3 className="text-xl font-semibold mb-8">
              Constraints & Preferences
            </h3>

            <div className="grid md:grid-cols-2 gap-10">

              <div>
                <label className="text-sm text-slate-400 block mb-3">
                  Exclude ingredients (comma separated)
                </label>
                <input
                  value={excludeInput}
                  onChange={(e) => setExcludeInput(e.target.value)}
                  placeholder="peanuts, dairy"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 block mb-4">
                  Budget
                </label>

                {["Low Cost", "Premium", "No Preference"].map(
                  (option) => (
                    <button
                      key={option}
                      onClick={() => setBudget(option)}
                      className={`w-full py-3 rounded-xl mb-3 transition ${
                        budget === option
                          ? "bg-gradient-to-r from-violet-600 to-purple-600"
                          : "bg-slate-800 hover:bg-slate-700"
                      }`}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <div className="mt-14">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-orange-500 hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Exploring..." : "Explore Flavor"}
            </button>
          </div>

        </div>
      </div>

      {backendData && <ResultsView backendData={backendData} />}
    </div>
  );
}
