import { ResultsView } from '../components/ResultsView'
import { motion } from 'motion/react'
import { Shuffle, Search } from 'lucide-react'
import { useState } from 'react'
import { recommendRecipes } from '../services/api'
import type { RecommendPayload } from '../services/api'

export function ExplorePage() {
  const [backendData, setBackendData] = useState<any>(null)
  const [budget, setBudget] = useState("No Preference")
  const [mode, setMode] = useState<"blend" | "single">("blend")
  const [flavorInput, setFlavorInput] = useState("")
  const [excludeInput, setExcludeInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!flavorInput.trim()) return

    const mappedBudget =
      budget === "Low Cost"
        ? "low"
        : budget === "Premium"
        ? "high"
        : "low"

    const payload: RecommendPayload = {
      mode,
      taste_inputs:
        mode === "blend"
          ? flavorInput.split(",").map(f => f.trim())
          : [flavorInput.trim()],
      exclude: excludeInput
        ? excludeInput.split(",").map(e => e.trim())
        : [],
      budget: mappedBudget as "low" | "high",
    }

    try {
      setLoading(true)
      const data = await recommendRecipes(payload)
      setBackendData(data)
    } catch (err) {
      console.error("Backend error:", err)
    } finally {
      setLoading(false)
    }
  }
  // Validation logic
  const flavorArray = flavorInput
    .split(",")
    .map(f => f.trim())
    .filter(Boolean)

  const isBlendInvalid = mode === "blend" && flavorArray.length < 2
  const isSingleInvalid = mode === "single" && flavorArray.length < 1


  return (
    <div className="relative min-h-screen pt-24 text-white overflow-hidden bg-[#050816]">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(124,58,237,0.15),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(249,115,22,0.12),transparent_40%)]" />

      {/* HERO */}
      <section className="relative py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 leading-tight">
            Discover Your Next
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
              Flavor Adventure
            </span>
          </h1>

          <p className="text-slate-400/80 max-w-2xl mx-auto text-lg">
            Configure your preferences and let our AI-powered engine find
            the perfect flavor matches for you.
          </p>
        </motion.div>
      </section>

      {/* MAIN CARD */}
      <div className="relative px-6 pb-24">
        <div className="relative max-w-6xl mx-auto rounded-3xl p-[1px] bg-gradient-to-br from-violet-500/20 to-orange-400/20">

          <div className="rounded-3xl bg-slate-900/70 backdrop-blur-3xl p-12 border border-white/10 shadow-[0_0_60px_rgba(124,58,237,0.15)]">

            <h2 className="text-3xl font-semibold mb-10">
              What would you like to explore?
            </h2>

            {/* MODE CARDS */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">

              {/* BLEND */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => setMode("blend")}
                className={`relative rounded-2xl p-[1px] cursor-pointer transition-all duration-300 ${
                  mode === "blend"
                    ? "bg-gradient-to-r from-violet-500 via-purple-500 to-orange-400 shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                    : "bg-white/5 hover:bg-gradient-to-r hover:from-violet-500/50 hover:to-orange-400/50"
                }`}
              >
                <div className="rounded-2xl bg-slate-900/80 p-8 backdrop-blur-xl">
                  <Shuffle className="w-6 h-6 mb-4 text-violet-400" />
                  <h3 className="text-xl font-semibold mb-2">
                    Blend Flavors
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Combine multiple ingredients to discover new matches.
                  </p>
                </div>
              </motion.div>

              {/* SINGLE */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => setMode("single")}
                className={`relative rounded-2xl p-[1px] cursor-pointer transition-all duration-300 ${
                  mode === "single"
                    ? "bg-gradient-to-r from-violet-500 via-purple-500 to-orange-400 shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                    : "bg-white/5 hover:bg-gradient-to-r hover:from-violet-500/50 hover:to-orange-400/50"
                }`}
              >
                <div className="rounded-2xl bg-slate-900/80 p-8 backdrop-blur-xl">
                  <Search className="w-6 h-6 mb-4 text-orange-400" />
                  <h3 className="text-xl font-semibold mb-2">
                    Find Similar Taste
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Enter a dish or ingredient to explore similar profiles.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* DYNAMIC INPUT SECTION */}
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              {mode === "blend" ? (
                <>
                  <label className="text-sm text-slate-400 block mb-3">
                    Enter flavors, ingredients, or dishes
                  </label>
                  <input
                    type="text"
                    value={flavorInput}
                    onChange={(e) => setFlavorInput(e.target.value)}
                    placeholder="Try 'grilled salmon', 'umami', 'dark chocolate'..."
                    className="w-full bg-slate-900/80 border border-white/10 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-violet-500/60 transition"
                  />
                  <p className="text-xs text-slate-500 mt-3">
                    Press Enter to add • Minimum 2 flavors recommended
                  </p>
                </>
              ) : (
                <>
                  <label className="text-sm text-slate-400 block mb-3">
                    Enter a dish or ingredient you enjoy
                  </label>
                  <input
                    type="text"
                    value={flavorInput}
                    onChange={(e) => setFlavorInput(e.target.value)}
                    placeholder="e.g., 'miso ramen', 'aged parmesan'..."
                    className="w-full bg-slate-900/80 border border-white/10 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-violet-500/60 transition"
                  />
                  <p className="text-xs text-slate-500 mt-3">
                    Press Enter to search
                  </p>
                </>
              )}
            </motion.div>

            {/* CONSTRAINTS */}
            <div className="border-t border-white/10 pt-10">
              <h3 className="text-xl font-semibold mb-8">
                Constraints & Preferences
              </h3>

              <div className="grid md:grid-cols-2 gap-10">

                <div>
                  <label className="text-sm text-slate-400 block mb-3">
                    Exclude ingredients
                  </label>
                  <input
                    value={excludeInput}
                    onChange={(e) => setExcludeInput(e.target.value)}
                    placeholder="peanuts, dairy"
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 block mb-4">
                    Budget
                  </label>

                  {["Low Cost", "Premium", "No Preference"].map(option => (
                    <button
                      key={option}
                      onClick={() => setBudget(option)}
                      className={`w-full py-3 rounded-xl mb-3 transition ${
                        budget === option
                          ? "bg-gradient-to-r from-violet-600 via-purple-600 to-orange-500 shadow-lg shadow-violet-500/30"
                          : "bg-slate-800/70 hover:bg-slate-700/70"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-14">
              <button
                onClick={handleSearch}
                disabled={loading || isBlendInvalid || isSingleInvalid}

                className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-orange-500 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 shadow-[0_0_30px_rgba(124,58,237,0.5)]"
              >
                {loading
                  ? "Exploring..."
                  : mode === "blend"
                  ? "Blend Flavors"
                  : "Find Similar Taste"}
              </button>
            </div>

          </div>
        </div>
      </div>

      {backendData && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ResultsView backendData={backendData} />
        </motion.div>
      )}
    </div>
  )
}
