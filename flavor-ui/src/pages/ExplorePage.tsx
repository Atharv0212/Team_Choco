import { ResultsView } from '../components/ResultsView'
import { motion } from 'framer-motion'
import { Shuffle, Search, AlertCircle, DollarSign, Star, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { recommendRecipes } from '../services/api'
import type { RecommendPayload } from '../services/api'

const BUDGET_OPTIONS = [
  { label: "Low Cost", value: "low" as const },
  { label: "Moderate", value: "moderate" as const },
  { label: "Premium", value: "high" as const },
  { label: "No Preference", value: "no-preference" as const },
]

export function ExplorePage() {
  const [backendData, setBackendData] = useState<any>(null)
  const [budget, setBudget] = useState<"low" | "moderate" | "high" | "no-preference">("no-preference")
  const [mode, setMode] = useState<"blend" | "single">("blend")
  const [flavorInput, setFlavorInput] = useState("")
  const [excludeInput, setExcludeInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    const flavorArray = flavorInput.split(",").map(f => f.trim()).filter(Boolean)
    if (mode === "blend" && flavorArray.length < 1) return
    if (mode === "single" && !flavorInput.trim()) return

    const payload: RecommendPayload = {
      mode,
      taste_inputs: mode === "blend" ? flavorArray : [flavorInput.trim()],
      exclude: excludeInput ? excludeInput.split(",").map(e => e.trim()).filter(Boolean) : [],
      budget,
    }

    try {
      setLoading(true)
      const data = await recommendRecipes(payload)
      setBackendData(data)
    } catch (err) {
      console.error("Backend error:", err)
      setBackendData({
        error: "Network error. Is the backend running at http://127.0.0.1:8000?",
        recommended_recipes: [],
      })
    } finally {
      setLoading(false)
    }
  }

  const flavorArray = flavorInput.split(",").map(f => f.trim()).filter(Boolean)
  const isBlendInvalid = mode === "blend" && flavorArray.length < 1
  const isSingleInvalid = mode === "single" && !flavorInput.trim()


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

            {/* MODE CARDS – different layouts: Blend = vertical, Find Similar = horizontal */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* BLEND – vertical: icon on top, then title, then description */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setMode("blend")}
                className={`relative rounded-2xl border-2 p-8 text-left cursor-pointer transition-all duration-300 ${
                  mode === "blend"
                    ? "border-violet-500 bg-violet-500/10 shadow-[0_0_30px_rgba(124,58,237,0.25)]"
                    : "border-slate-600 bg-slate-800/50 hover:border-slate-500"
                }`}
              >
                <div className="flex flex-col items-center md:block">
                  <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4 md:mb-5">
                    <Shuffle className="w-7 h-7 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Blend Flavors</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Combine multiple ingredients or taste profiles to discover foods that lie between them.
                  </p>
                </div>
              </motion.button>

              {/* FIND SIMILAR – horizontal: icon left, text right */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setMode("single")}
                className={`relative rounded-2xl border-2 p-8 text-left cursor-pointer transition-all duration-300 flex flex-row gap-4 ${
                  mode === "single"
                    ? "border-violet-500 bg-violet-500/10 shadow-[0_0_30px_rgba(124,58,237,0.25)]"
                    : "border-slate-600 bg-slate-800/50 hover:border-slate-500"
                }`}
              >
                <div className="shrink-0 w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                  <Search className="w-7 h-7 text-orange-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-white mb-2">Find Similar Taste</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Enter a dish or ingredient to explore new experiences with similar flavor.
                  </p>
                </div>
              </motion.button>
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
                  <div className="flex items-center gap-2 mb-3">
                    <label className="text-sm text-slate-400">
                      Any allergies or ingredients to avoid?
                    </label>
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  </div>
                  <input
                    value={excludeInput}
                    onChange={(e) => setExcludeInput(e.target.value)}
                    placeholder="e.g., peanuts, dairy, shellfish, gluten..."
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Tell us what you can&apos;t consume - we&apos;ll keep your flavor safe.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-5 h-5 text-slate-400" />
                    <span className="text-sm text-slate-400">Budget Sensitivity</span>
                  </div>
                  <div className="flex flex-col gap-3 max-w-[200px]">
                    {BUDGET_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setBudget(opt.value)}
                        className={`min-w-[140px] px-5 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                          budget === opt.value
                            ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                            : "bg-slate-800/70 text-slate-300 border border-slate-600 hover:border-slate-500 hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Prioritizes ingredients based on availability and common usage.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-14 flex flex-col items-center">
              <button
                onClick={handleSearch}
                disabled={loading || isBlendInvalid || isSingleInvalid}
                className="w-full max-w-md py-4 px-6 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-orange-500 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 shadow-[0_0_30px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2 font-semibold text-lg"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Star className="w-5 h-5" />
                )}
                {loading ? "Searching..." : "Explore Flavor"}
              </button>
              <p className="text-slate-500 text-sm mt-3 text-center">
                Results ranked by flavor similarity under your constraints.
              </p>
            </div>

          </div>
        </div>
      </div>

      {backendData?.error && (
        <div className="relative max-w-2xl mx-auto px-6 py-8 text-center">
          <p className="text-red-400 font-medium">{backendData.error}</p>
        </div>
      )}

      {backendData && !backendData.error && (
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
