import { ScienceSection } from '../components/ScienceSection';
import { BackToTop } from '../components/BackToTop';
import { motion } from 'motion/react';
import { BookOpen, FlaskConical, Cpu } from 'lucide-react';
import { Link } from 'react-router';

export function SciencePage() {
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
              The Science of
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">
                Flavor Discovery
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Combining molecular gastronomy, data science, and culinary expertise
              to map the infinite landscape of taste.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Science Section */}
      <ScienceSection />

      {/* Methodology */}
      <section className="py-32 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-tight">
              Our Methodology
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              A three-pillar approach to understanding and predicting flavor compatibility
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-violet-500/20 flex items-center justify-center mb-6 text-violet-400">
                <FlaskConical className="w-7 h-7" />
              </div>
              <h3 className="text-2xl text-white mb-4 tracking-tight">
                Molecular Analysis
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                We analyze the chemical composition of ingredients, identifying shared
                aromatic compounds that create flavor harmonies.
              </p>
              <div className="space-y-2 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span>200+ aroma compounds tracked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span>Chemical signature matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span>FlavorDB integration</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center mb-6 text-orange-400">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-2xl text-white mb-4 tracking-tight">
                Recipe Intelligence
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Real-world recipe data shows us which ingredients work together in practice,
                validating molecular predictions.
              </p>
              <div className="space-y-2 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  <span>50,000+ recipe relationships</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  <span>Global cuisine patterns</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  <span>Chef-validated pairings</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6 text-pink-400">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="text-2xl text-white mb-4 tracking-tight">
                Machine Learning
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Advanced algorithms learn from patterns to predict novel combinations
                and optimize for your preferences.
              </p>
              <div className="space-y-2 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  <span>Vector similarity matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  <span>Multi-dimensional analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  <span>Continuous improvement</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="py-32 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-xl bg-gradient-to-br from-violet-500/10 to-orange-500/10 border border-violet-500/20 rounded-3xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl text-white mb-6 tracking-tight">
              Built on peer-reviewed research
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Our flavor mapping system is based on published studies in food chemistry,
              sensory science, and computational gastronomy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full text-sm text-slate-300">
                Nature Scientific Reports
              </div>
              <div className="px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full text-sm text-slate-300">
                Food Chemistry
              </div>
              <div className="px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full text-sm text-slate-300">
                Computational Gastronomy
              </div>
            </div>
          </motion.div>
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
              See the science in action
            </h2>
            <Link
              to="/explore"
              className="inline-block px-10 py-4 bg-gradient-to-r from-violet-600 to-orange-500 text-white rounded-full text-lg hover:from-violet-500 hover:to-orange-400 transition-all shadow-lg shadow-violet-500/20"
            >
              Start Discovering
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}