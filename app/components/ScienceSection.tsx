import { motion } from 'motion/react';
import { Database, Atom, ChefHat, Network } from 'lucide-react';
import { useState } from 'react';

export function ScienceSection() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const flavorNodes = [
    { x: '20%', y: '30%', color: 'violet', label: 'Vanilla' },
    { x: '40%', y: '25%', color: 'orange', label: 'Cinnamon' },
    { x: '30%', y: '40%', color: 'pink', label: 'Strawberry' },
    { x: '35%', y: '65%', color: 'emerald', label: 'Basil' },
  ];

  return (
    <section id="science" className="py-20 md:py-32 px-6 bg-slate-950 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-4 tracking-tight">
            The Science Behind FlavorOrbit
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto">
            We map ingredients in a multi-dimensional flavor vector space using molecular aroma data
            and real-world recipe relationships
          </p>
        </motion.div>

        {/* Technical diagram */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-20">
          {/* Left: Diagram */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="backdrop-blur-xl bg-slate-900/30 border border-slate-700/50 rounded-2xl p-8 md:p-12 aspect-square flex items-center justify-center">
              {/* Central node */}
              <div className="relative w-full h-full">
                {/* Axes */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-violet-500 to-transparent" />

                {/* Labels */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 font-mono">
                  Sweet
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 font-mono">
                  Savory
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -left-10 text-xs text-slate-500 font-mono">
                  Bitter
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-10 text-xs text-slate-500 font-mono">
                  Umami
                </div>

                {/* Flavor nodes */}
                {flavorNodes.map((node, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      x: [0, 10, 0],
                      y: [0, -5, 0],
                      scale: hoveredNode === index ? 1.5 : 1,
                    }}
                    transition={{
                      x: { duration: 4 + index, repeat: Infinity, ease: 'easeInOut' },
                      y: { duration: 5 + index, repeat: Infinity, ease: 'easeInOut' },
                      scale: { duration: 0.3 },
                    }}
                    className={`absolute w-3 h-3 md:w-4 md:h-4 rounded-full bg-${node.color}-400 shadow-lg shadow-${node.color}-500/50 cursor-pointer`}
                    style={{ top: node.y, left: node.x }}
                    onMouseEnter={() => setHoveredNode(index)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {hoveredNode === index && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: -25 }}
                        className="absolute whitespace-nowrap px-2 py-1 bg-slate-900/90 border border-white/10 rounded text-xs text-white"
                      >
                        {node.label}
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {/* Center point */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white" />
              </div>
            </div>
            <p className="text-center text-sm text-slate-500 mt-4 font-mono">
              Flavour Vector Space Projection
            </p>
          </motion.div>

          {/* Right: Data sources */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6"
          >
            <motion.div
              whileHover={{ x: 5 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 transition-all hover:border-violet-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <Atom className="w-5 h-5 md:w-6 md:h-6 text-violet-400" />
                </div>
                <div>
                  <h4 className="text-white text-base md:text-lg mb-2">FlavorDB</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Molecular aroma compound database mapping 1,000+ ingredients to their chemical signatures
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 transition-all hover:border-orange-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <ChefHat className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="text-white text-base md:text-lg mb-2">RecipeDB</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Real-world recipe data showing which ingredients are actually paired in practice
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 transition-all hover:border-pink-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                  <Network className="w-5 h-5 md:w-6 md:h-6 text-pink-400" />
                </div>
                <div>
                  <h4 className="text-white text-base md:text-lg mb-2">Vector Similarity</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Cosine similarity algorithm to find ingredients with matching flavor profiles
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 transition-all hover:border-emerald-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white text-base md:text-lg mb-2">Cost Integration</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Market price data to suggest affordable alternatives without sacrificing taste
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Technical specs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl bg-gradient-to-r from-violet-500/10 to-orange-500/10 border border-violet-500/20 rounded-2xl p-6 md:p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="text-3xl md:text-4xl text-white mb-2 font-mono">1,000+</div>
              <div className="text-slate-400 text-xs md:text-sm">Ingredients Mapped</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="text-3xl md:text-4xl text-white mb-2 font-mono">200+</div>
              <div className="text-slate-400 text-xs md:text-sm">Aroma Compounds</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="text-3xl md:text-4xl text-white mb-2 font-mono">50K+</div>
              <div className="text-slate-400 text-xs md:text-sm">Recipe Relationships</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="text-3xl md:text-4xl text-white mb-2 font-mono">∞</div>
              <div className="text-slate-400 text-xs md:text-sm">Flavor Combinations</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}