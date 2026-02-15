import { motion } from 'motion/react';
import { Home, Search } from 'lucide-react';
import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-400 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-8xl md:text-9xl font-mono bg-gradient-to-r from-violet-400 via-violet-500 to-orange-400 bg-clip-text text-transparent relative">
            404
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-4 -right-4 w-16 h-16 border-2 border-violet-500/30 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-4 -left-4 w-12 h-12 border-2 border-orange-500/30 rounded-full"
            />
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl md:text-5xl text-white mb-4 md:mb-6 tracking-tight"
        >
          Flavor Not Found
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-slate-400 mb-8 md:mb-12"
        >
          Looks like this page doesn't exist in our flavor database.
          Let's get you back to exploring delicious discoveries.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-full hover:from-violet-500 hover:to-violet-400 transition-all shadow-lg shadow-violet-500/20"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          
          <Link
            to="/explore"
            className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 backdrop-blur-xl bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 hover:border-violet-500/50 transition-all"
          >
            <Search className="w-5 h-5" />
            <span>Explore Flavors</span>
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 pt-8 border-t border-white/5"
        >
          <p className="text-slate-500 text-sm mb-4">Or try these pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/features" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
              Features
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/science" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
              Science
            </Link>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => window.history.back()}
              className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              Go Back
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}