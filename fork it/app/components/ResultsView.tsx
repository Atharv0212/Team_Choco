import React from "react";
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Clock, Users, TrendingUp, Flame } from 'lucide-react';

interface ResultsViewProps {
  backendData?: any;
}

export function ResultsView({ backendData }: ResultsViewProps) {
  const recipes = backendData?.recommended_recipes ?? [];
  const hasRecipes = Array.isArray(recipes) && recipes.length > 0;

  return (
    <section id="results" className="py-20 md:py-32 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-4 tracking-tight">
            Your Flavor Matches
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            Ranked by molecular similarity and taste compatibility
          </p>
        </motion.div>

        {/* Empty state */}
        {!hasRecipes && (
          <p className="text-slate-400 text-center py-12">No recipes match your criteria. Try different flavors or exclusions.</p>
        )}

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasRecipes && recipes.map((recipe: any, index: number) => {
            const score = Number(recipe?.similarity_score);
            const similarityPercent = Math.round((Number.isFinite(score) ? score : 0) * 100);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10">

                  {/* Image Placeholder (since backend has no images) */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-violet-900/40 to-slate-800 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold text-center px-4">
                      {recipe?.title ?? "—"}
                    </span>

                    {/* Similarity Badge */}
                    <div className="absolute top-4 right-4 px-3 py-2 backdrop-blur-xl bg-violet-600/90 rounded-full">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-white" />
                        <span className="text-white font-mono text-sm font-semibold">
                          {similarityPercent}%
                        </span>
                      </div>
                    </div>

                    {/* Region Badge */}
                    <div className="absolute top-4 left-4 px-3 py-2 backdrop-blur-xl bg-slate-900/90 rounded-full border border-white/10">
                      <span className="text-white text-xs font-medium">
                        {recipe?.region ?? "—"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl text-white mb-2 tracking-tight group-hover:text-violet-400 transition-colors">
                      {recipe?.title ?? "—"}
                    </h3>

                    <p className="text-sm text-slate-400 mb-4">
                      Calories: {recipe?.calories ?? "—"}
                    </p>

                    {/* Similarity Bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Flame className="w-3 h-3" />
                          Flavor Match
                        </span>
                        <span className="font-mono font-semibold text-violet-400">
                          {similarityPercent}%
                        </span>
                      </div>

                      <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${similarityPercent}%` }}
                          transition={{
                            duration: 1,
                            delay: index * 0.08 + 0.3,
                            ease: 'easeOut'
                          }}
                          className="h-full bg-gradient-to-r from-violet-600 via-violet-500 to-orange-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
