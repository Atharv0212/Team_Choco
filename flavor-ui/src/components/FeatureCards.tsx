import { motion } from "framer-motion";
import { Shield, Lightbulb, Blend, TrendingDown, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const features = [
  {
    icon: Shield,
    title: 'Allergy-Safe Substitution',
    description: 'Find molecular-similar ingredients that match your dietary restrictions without compromising on flavor complexity.',
    details: 'Our algorithm analyzes aromatic compounds to suggest safe alternatives that maintain the same flavor profile while avoiding allergens.',
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-400',
    borderColor: 'border-violet-500/30',
    hoverBorder: 'group-hover:border-violet-500/60',
  },
  {
    icon: Lightbulb,
    title: 'Similar-Taste Discovery',
    description: 'Explore ingredients with matching flavor profiles based on shared aromatic compounds from FlavorDB.',
    details: 'Discover unexpected ingredient pairings using our molecular database of over 200 aromatic compounds across 1,000+ foods.',
    gradient: 'from-orange-500/20 to-amber-500/20',
    iconColor: 'text-orange-400',
    borderColor: 'border-orange-500/30',
    hoverBorder: 'group-hover:border-orange-500/60',
  },
  {
    icon: Blend,
    title: 'Multi-Taste Blending',
    description: 'Combine unexpected flavors to create harmonious pairings. Discover what works beyond traditional recipes.',
    details: 'Use vector math to blend multiple flavor profiles and find ingredients that bridge different taste categories.',
    gradient: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-400',
    borderColor: 'border-pink-500/30',
    hoverBorder: 'group-hover:border-pink-500/60',
  },
  {
    icon: TrendingDown,
    title: 'Cost-Effective Alternatives',
    description: 'Access premium flavors on any budget. Find affordable ingredients with similar taste signatures.',
    details: 'Real-time market pricing data helps you find budget-friendly substitutes that deliver the same flavor experience.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    hoverBorder: 'group-hover:border-emerald-500/60',
  },
];

export function FeatureCards() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="features" className="py-20 md:py-32 px-6 bg-gradient-to-b from-slate-950 to-slate-900 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
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
            Powered by Flavor Science
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Combining molecular gastronomy with practical cooking to unlock new culinary possibilities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setExpandedIndex(expandedIndex === index ? null : index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-expanded={expandedIndex === index}
              aria-label={`${feature.title}. ${expandedIndex === index ? 'Show less' : 'Learn more'}`}
            >
              <div
                className={`h-full backdrop-blur-xl bg-gradient-to-br ${feature.gradient} border ${feature.borderColor} ${feature.hoverBorder} rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10 focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-950`}
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-slate-900/50 flex items-center justify-center mb-4 md:mb-6 ${feature.iconColor} group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
                </div>
                <h3 className="text-xl md:text-2xl text-white mb-2 md:mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base mb-4">
                  {feature.description}
                </p>

                {/* Expandable details */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedIndex === index ? 'auto' : 0,
                    opacity: expandedIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {feature.details}
                    </p>
                  </div>
                </motion.div>

                {/* Expand indicator */}
                <div className="flex items-center gap-2 mt-4 text-sm text-slate-500 group-hover:text-violet-400 transition-colors">
                  <span>{expandedIndex === index ? 'Show less' : 'Learn more'}</span>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}