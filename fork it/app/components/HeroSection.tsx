import { motion, AnimatePresence } from "framer-motion";
import { FlavorOrbitVisualization } from './FlavorOrbitVisualization';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background visualization */}
      <div className="absolute inset-0 opacity-60">
        <FlavorOrbitVisualization />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(2,6,23,0.8)_100%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-6 md:mb-8"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-4">
              <span className="bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
                FlavorOrbit
              </span>
            </h1>
            <div className="h-[1px] w-24 md:w-32 mx-auto bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6 tracking-tight px-4"
          >
            Don't just cook recipes—
            <br />
            <span className="text-violet-400">explore flavour</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 md:mb-12 px-4"
          >
            A flavor-similarity discovery engine powered by molecular aroma science
            and real-world cooking data.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Link
              to="/explore"
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-full text-base md:text-lg hover:from-violet-500 hover:to-violet-400 transition-all shadow-lg shadow-violet-500/20"
            >
              Start Exploring
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 2 },
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute bottom-8 md:bottom-12"
        >
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-slate-500" />
        </motion.div>
      </div>
    </section>
  );
}