import { InputConsole } from '../components/InputConsole';
import { ResultsView } from '../components/ResultsView';
import { BackToTop } from '../components/BackToTop';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

export function ExplorePage() {
  const [showResults, setShowResults] = useState(false);
  const [searchData, setSearchData] = useState({
    query: '',
    allergies: [] as string[],
    budget: 'medium',
  });

  const handleSearch = (data: { query: string; allergies: string[]; budget: string }) => {
    setSearchData(data);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24">
      <BackToTop />
      {/* Hero */}
      <section className="py-16 md:py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
        {/* Floating hint */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute top-8 right-8 hidden lg:block"
        >
          <div className="backdrop-blur-xl bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
            <span className="text-xs text-violet-300">Configure your taste profile below</span>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">
              Discover Your Next
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">
                Flavor Adventure
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              Configure your preferences and let our AI-powered engine find
              the perfect flavor matches for you.
            </p>
          </motion.div>
        </div>
      </section>

      <InputConsole onSearch={handleSearch} />
      {showResults && <ResultsView searchData={searchData} />}
    </div>
  );
}