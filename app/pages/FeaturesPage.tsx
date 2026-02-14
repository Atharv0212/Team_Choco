import { FeatureCards } from '../components/FeatureCards';
import { BackToTop } from '../components/BackToTop';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router';

export function FeaturesPage() {
  const benefits = [
    'Molecular-level ingredient matching',
    'Real-time allergy and dietary restriction filtering',
    'Cost optimization without flavor compromise',
    'Unexpected flavor pairing suggestions',
    'Recipe adaptation recommendations',
    'Multi-cuisine flavor translation',
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-24">
      <BackToTop />
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl text-white mb-6 tracking-tight">
              Features That
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">
                Transform Cooking
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Powered by molecular gastronomy and machine learning to unlock
              culinary possibilities you never knew existed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <FeatureCards />

      {/* Additional Benefits */}
      <section className="py-32 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl text-white mb-6 tracking-tight">
                Everything you need to innovate in the kitchen
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                FlavorOrbit combines cutting-edge food science with practical cooking
                knowledge to give you insights that traditional recipe apps can't provide.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0" />
                    <span className="text-slate-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="backdrop-blur-xl bg-gradient-to-br from-violet-500/10 to-orange-500/10 border border-violet-500/20 rounded-3xl p-12">
                <div className="space-y-6">
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="text-5xl text-white mb-2 font-mono">94%</div>
                    <div className="text-slate-400">Average Similarity Score</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="text-5xl text-white mb-2 font-mono">1000+</div>
                    <div className="text-slate-400">Ingredients in Database</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="text-5xl text-white mb-2 font-mono">∞</div>
                    <div className="text-slate-400">Possible Combinations</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl text-white mb-6 tracking-tight">
              Experience the power of flavor science
            </h2>
            <Link
              to="/explore"
              className="inline-block px-10 py-4 bg-gradient-to-r from-violet-600 to-orange-500 text-white rounded-full text-lg hover:from-violet-500 hover:to-orange-400 transition-all shadow-lg shadow-violet-500/20"
            >
              Try It Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}