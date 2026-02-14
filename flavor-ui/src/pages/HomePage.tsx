import { HeroSection } from '../components/HeroSection';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Atom, Shield } from 'lucide-react';
import { Link } from 'react-router';

export function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <HeroSection />

      {/* Quick Overview */}
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
              Culinary Discovery Reimagined
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Navigate the molecular landscape of flavor to find perfect ingredient matches,
              substitutions, and unexpected pairings.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Features Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/features"
                className="group block h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-violet-500/50 transition-all hover:shadow-2xl hover:shadow-violet-500/10"
              >
                <div className="w-14 h-14 rounded-xl bg-violet-500/20 flex items-center justify-center mb-6 text-violet-400 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-2xl text-white mb-3 tracking-tight">
                  Smart Features
                </h3>
                <p className="text-slate-400 mb-4 leading-relaxed">
                  Discover allergy-safe substitutions, taste blending, and cost-effective alternatives.
                </p>
                <div className="flex items-center gap-2 text-violet-400">
                  <span>Explore Features</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

            {/* Science Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link
                to="/science"
                className="group block h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-500/50 transition-all hover:shadow-2xl hover:shadow-orange-500/10"
              >
                <div className="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center mb-6 text-orange-400 group-hover:scale-110 transition-transform">
                  <Atom className="w-7 h-7" />
                </div>
                <h3 className="text-2xl text-white mb-3 tracking-tight">
                  The Science
                </h3>
                <p className="text-slate-400 mb-4 leading-relaxed">
                  Learn how we map flavor molecules and recipe relationships in vector space.
                </p>
                <div className="flex items-center gap-2 text-orange-400">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

            {/* Explore Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                to="/explore"
                className="group block h-full backdrop-blur-xl bg-gradient-to-br from-violet-500/20 to-orange-500/20 border border-violet-500/30 rounded-2xl p-6 md:p-8 hover:border-violet-500/50 transition-all hover:shadow-2xl hover:shadow-violet-500/20"
              >
                <div className="w-14 h-14 rounded-xl bg-slate-900/50 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7" />
                </div>
                <h3 className="text-2xl text-white mb-3 tracking-tight">
                  Start Exploring
                </h3>
                <p className="text-slate-400 mb-4 leading-relaxed">
                  Find your perfect flavor matches with our intelligent discovery engine.
                </p>
                <div className="flex items-center gap-2 text-white">
                  <span>Discover Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.1)_0%,_transparent_50%)]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl text-white mb-6 tracking-tight">
              Ready to explore flavor?
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              Join thousands of chefs and home cooks discovering new culinary possibilities
            </p>
            <Link
              to="/explore"
              className="inline-block px-10 py-4 bg-gradient-to-r from-violet-600 to-orange-500 text-white rounded-full text-lg hover:from-violet-500 hover:to-orange-400 transition-all shadow-lg shadow-violet-500/20"
            >
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
