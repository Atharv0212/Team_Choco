import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, DollarSign, X, Loader2, Sparkles, Info, Shuffle, Search as SearchIcon } from 'lucide-react';
import { useState } from 'react';

// Common food allergens for validation
const COMMON_ALLERGENS = [
  'peanuts', 'peanut', 'tree nuts', 'almonds', 'walnuts', 'cashews', 'pecans', 'pistachios',
  'milk', 'dairy', 'lactose', 'cheese', 'butter', 'cream',
  'eggs', 'egg',
  'fish', 'salmon', 'tuna', 'cod',
  'shellfish', 'shrimp', 'crab', 'lobster', 'oysters', 'clams', 'mussels',
  'wheat', 'gluten',
  'soy', 'soybean', 'tofu',
  'sesame', 'sesame seeds',
  'mustard',
  'celery',
  'lupin',
  'molluscs',
  'sulfites', 'sulphites',
];

type Intent = 'blend' | 'similar';

interface InputConsoleProps {
  onSearch: (data: { query: string; allergies: string[]; budget: string }) => void;
}

// Animated background particles component
function FlavorParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 12 + 18,
    delay: Math.random() * 8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-md"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.id % 3 === 0 
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(217, 70, 239, 0.6))'
              : particle.id % 3 === 1
              ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.8), rgba(251, 146, 60, 0.6))'
              : 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.6))',
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function InputConsole({ onSearch }: InputConsoleProps) {
  // Intent Selection
  const [selectedIntent, setSelectedIntent] = useState<Intent>('blend');

  // Blend Flavors State
  const [blendTokens, setBlendTokens] = useState<string[]>([]);
  const [blendInput, setBlendInput] = useState('');

  // Find Similar State
  const [similarInput, setSimilarInput] = useState('');

  // Constraints (Always Visible)
  const [exclusions, setExclusions] = useState<string[]>([]);
  const [currentExclusion, setCurrentExclusion] = useState('');
  const [exclusionError, setExclusionError] = useState('');
  const [budget, setBudget] = useState('no-preference');

  // UI State
  const [isSearching, setIsSearching] = useState(false);

  // Blend Flavors Functions
  const addBlendToken = () => {
    const trimmed = blendInput.trim();
    if (!trimmed) return;
    if (blendTokens.some(t => t.toLowerCase() === trimmed.toLowerCase())) return;
    
    setBlendTokens([...blendTokens, trimmed]);
    setBlendInput('');
  };

  const removeBlendToken = (index: number) => {
    setBlendTokens(blendTokens.filter((_, i) => i !== index));
  };

  // Exclusion Functions
  const validateExclusion = (exclusion: string): boolean => {
    const normalized = exclusion.toLowerCase().trim();
    return COMMON_ALLERGENS.some(allergen => 
      normalized.includes(allergen) || allergen.includes(normalized)
    );
  };

  const addExclusion = () => {
    const trimmed = currentExclusion.trim();
    
    if (!trimmed) {
      setExclusionError('Please enter an ingredient');
      return;
    }

    if (exclusions.map(a => a.toLowerCase()).includes(trimmed.toLowerCase())) {
      setExclusionError('Already excluded');
      return;
    }

    if (!validateExclusion(trimmed)) {
      setExclusionError('Please enter a valid food allergen');
      return;
    }

    setExclusions([...exclusions, trimmed]);
    setCurrentExclusion('');
    setExclusionError('');
  };

  const removeExclusion = (index: number) => {
    setExclusions(exclusions.filter((_, i) => i !== index));
  };

  // Search Handler
  const handleSearch = () => {
    let query = '';
    
    // Build query based on intent
    switch (selectedIntent) {
      case 'blend':
        if (blendTokens.length < 2) return;
        query = blendTokens.join(', ');
        break;
      case 'similar':
        if (!similarInput.trim()) return;
        query = similarInput;
        break;
    }

    setIsSearching(true);
    
    setTimeout(() => {
      setIsSearching(false);
      
      onSearch({
        query,
        allergies: exclusions,
        budget: budget,
      });
      
      setTimeout(() => {
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 1500);
  };

  // Smart Status Hint
  const getStatusHint = () => {
    if (selectedIntent === 'blend' && blendTokens.length > 0 && blendTokens.length < 2) {
      return 'Add at least 2 flavors to create a blend…';
    }
    if (selectedIntent === 'blend' && blendTokens.length >= 2) {
      return 'Blending multiple flavor vectors…';
    }
    if (selectedIntent === 'similar' && similarInput.trim()) {
      return 'Searching nearby flavor space…';
    }
    if (exclusions.length > 0) {
      return 'Excluding restricted ingredients…';
    }
    return 'Results ranked by flavor similarity under your constraints.';
  };

  // Check if search is valid
  const isSearchValid = () => {
    switch (selectedIntent) {
      case 'blend': return blendTokens.length >= 2;
      case 'similar': return similarInput.trim().length > 0;
    }
  };

  const intents = [
    {
      id: 'blend' as Intent,
      icon: Shuffle,
      title: 'Blend Flavors',
      description: 'Combine multiple ingredients or taste profiles to discover foods that lie between them.',
    },
    {
      id: 'similar' as Intent,
      icon: SearchIcon,
      title: 'Find Similar Taste',
      description: 'Enter a dish or ingredient to explore new experiences with similar flavor.',
    },
  ];

  return (
    <section className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background particles */}
      <FlavorParticles />
      
      {/* Ambient glow layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.2)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(249,115,22,0.15)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.12)_0%,_transparent_50%)]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="backdrop-blur-3xl bg-gradient-to-br from-slate-800/60 via-slate-900/60 to-slate-950/60 border border-white/[0.08] rounded-[32px] p-12 md:p-16 shadow-[0_32px_128px_-32px_rgba(0,0,0,0.6)] relative overflow-hidden"
        >
          {/* Inner glow layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.07] via-transparent to-orange-500/[0.06] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(139,92,246,0.1)_0%,_transparent_50%)] pointer-events-none" />
          
          {/* Subtle animated border glow */}
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
          
          <div className="relative z-10">
            {/* 1. Intent Selection */}
            <div className="mb-16">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-2xl md:text-3xl font-semibold text-white mb-10 tracking-tight bg-gradient-to-r from-white via-white to-slate-300 bg-clip-text text-transparent"
              >
                What would you like to explore?
              </motion.h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {intents.map((intent, index) => {
                  const Icon = intent.icon;
                  const isSelected = selectedIntent === intent.id;
                  
                  return (
                    <motion.button
                      key={intent.id}
                      onClick={() => setSelectedIntent(intent.id)}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.03, y: -6 }}
                      whileTap={{ scale: 0.97 }}
                      className={`group relative text-left p-9 rounded-[24px] transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-br from-violet-600/40 via-purple-600/30 to-violet-600/40'
                          : 'bg-slate-800/50 hover:bg-slate-800/70'
                      }`}
                    >
                      {/* Animated gradient border */}
                      <div className={`absolute inset-0 rounded-[24px] transition-opacity duration-300 ${
                        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                      }`}>
                        <div className="absolute inset-0 rounded-[24px] p-[2px] bg-gradient-to-br from-violet-500 via-purple-500 to-orange-500">
                          <div className="absolute inset-[2px] rounded-[22px] bg-slate-900" />
                        </div>
                      </div>
                      
                      {/* Glow effect on hover */}
                      <div className={`absolute inset-0 rounded-[24px] bg-gradient-to-br from-violet-500/20 to-purple-500/20 blur-2xl transition-opacity duration-300 ${
                        isSelected ? 'opacity-50' : 'opacity-0 group-hover:opacity-30'
                      }`} />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className={`w-14 h-14 rounded-[18px] flex items-center justify-center mb-6 transition-all duration-300 ${
                          isSelected 
                            ? 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-2xl shadow-violet-500/50' 
                            : 'bg-slate-700/60 group-hover:bg-slate-700/80 group-hover:shadow-lg group-hover:shadow-slate-700/50'
                        }`}>
                          <Icon className={`w-7 h-7 transition-all duration-300 ${
                            isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white group-hover:scale-110'
                          }`} />
                        </div>
                        
                        <h4 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                          isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                        }`}>
                          {intent.title}
                        </h4>
                        
                        <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                          {intent.description}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* 2. Dynamic Input Based on Intent */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIntent}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mb-16"
              >
                {selectedIntent === 'blend' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-5 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-violet-400" />
                      </div>
                      Enter flavors, ingredients, or dishes
                    </label>
                    
                    <div className="relative group">
                      <div className="min-h-[72px] px-6 py-5 bg-slate-900/80 backdrop-blur-2xl border border-slate-700/60 rounded-[20px] focus-within:ring-2 focus-within:ring-violet-500/60 focus-within:border-violet-500/60 transition-all duration-300 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] hover:border-slate-600/60">
                        <div className="flex flex-wrap gap-3 items-center">
                          {/* Blend Tokens */}
                          <AnimatePresence>
                            {blendTokens.map((token, index) => (
                              <motion.span
                                key={index}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 600, damping: 35 }}
                                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-violet-500/40 to-purple-500/40 border border-violet-400/50 rounded-full text-violet-100 text-sm font-medium shadow-xl shadow-violet-500/20 hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-200"
                              >
                                {token}
                                <button
                                  onClick={() => removeBlendToken(index)}
                                  className="hover:text-white hover:scale-110 transition-all duration-200"
                                  aria-label={`Remove ${token}`}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </motion.span>
                            ))}
                          </AnimatePresence>
                          
                          {/* Input */}
                          <input
                            type="text"
                            value={blendInput}
                            onChange={(e) => setBlendInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && blendInput.trim()) {
                                addBlendToken();
                              } else if (e.key === 'Backspace' && !blendInput && blendTokens.length > 0) {
                                removeBlendToken(blendTokens.length - 1);
                              }
                            }}
                            placeholder={blendTokens.length === 0 ? "Try 'grilled salmon', 'umami', 'dark chocolate'..." : "Add another..."}
                            className="flex-1 min-w-[240px] bg-transparent border-none outline-none text-white placeholder-slate-500 text-base"
                          />
                        </div>
                      </div>
                      
                      <p className="text-xs text-slate-500 mt-4 flex items-center gap-2">
                        <div className="w-5 h-5 rounded-lg bg-slate-800/50 flex items-center justify-center">
                          <Info className="w-3 h-3" />
                        </div>
                        Press Enter to add • Backspace to remove • Minimum 2 flavors required
                      </p>
                    </div>
                  </div>
                )}

                {selectedIntent === 'similar' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-5 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                        <SearchIcon className="w-4 h-4 text-violet-400" />
                      </div>
                      Enter a dish or ingredient you enjoy
                    </label>
                    
                    <div className="relative group">
                      <input
                        type="text"
                        value={similarInput}
                        onChange={(e) => setSimilarInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="e.g., 'miso ramen', 'aged parmesan', 'caramelized onions'..."
                        className="w-full h-[72px] px-6 bg-slate-900/80 backdrop-blur-2xl border border-slate-700/60 rounded-[20px] text-white placeholder-slate-500 text-base focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:border-violet-500/60 transition-all duration-300 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] hover:border-slate-600/60"
                      />
                      
                      <p className="text-xs text-slate-500 mt-4 flex items-center gap-2">
                        <div className="w-5 h-5 rounded-lg bg-slate-800/50 flex items-center justify-center">
                          <Info className="w-3 h-3" />
                        </div>
                        Press Enter to search
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* 3. Constraints & Preferences Section */}
            <div className="border-t border-white/[0.06] pt-14 mb-14">
              <h4 className="text-xl font-semibold text-white mb-10 tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Constraints & Preferences
              </h4>
              
              <div className="grid md:grid-cols-3 gap-10">
                {/* Allergies / Dietary Restrictions */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-200 mb-5 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    </div>
                    Any allergies or ingredients to avoid?
                  </label>
                  
                  <input
                    type="text"
                    value={currentExclusion}
                    onChange={(e) => {
                      setCurrentExclusion(e.target.value);
                      if (exclusionError) setExclusionError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && currentExclusion.trim()) {
                        addExclusion();
                      }
                    }}
                    placeholder="e.g., peanuts, dairy, shellfish, gluten..."
                    className="w-full h-16 px-6 bg-slate-900/80 backdrop-blur-2xl border border-slate-700/60 rounded-[18px] text-white placeholder-slate-500 text-base focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:border-red-500/60 transition-all duration-300 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] hover:border-slate-600/60"
                  />
                  
                  {exclusionError && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs mt-3 flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {exclusionError}
                    </motion.p>
                  )}
                  
                  {/* Exclusion Pills */}
                  {exclusions.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-5">
                      <AnimatePresence>
                        {exclusions.map((exclusion, index) => (
                          <motion.span
                            key={index}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 600, damping: 35 }}
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-red-500/30 border border-red-400/50 rounded-full text-red-200 text-sm font-medium shadow-xl shadow-red-500/20 hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-200"
                          >
                            {exclusion}
                            <button
                              onClick={() => removeExclusion(index)}
                              className="hover:text-red-50 hover:scale-110 transition-all duration-200"
                              aria-label={`Remove ${exclusion}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                  
                  <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                    Tell us what you can't consume — we'll keep your flavor safe.
                  </p>
                </div>

                {/* Budget Sensitivity */}
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-5 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-500/20 to-slate-600/20 flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-slate-400" />
                    </div>
                    Budget Sensitivity
                  </label>
                  
                  <div className="space-y-3">
                    {[
                      { value: 'low', label: 'Low Cost' },
                      { value: 'moderate', label: 'Moderate' },
                      { value: 'high', label: 'Premium' },
                      { value: 'no-preference', label: 'No Preference' },
                    ].map((option) => (
                      <motion.button
                        key={option.value}
                        onClick={() => setBudget(option.value)}
                        whileHover={{ scale: 1.03, x: 2 }}
                        whileTap={{ scale: 0.97 }}
                        className={`w-full h-12 px-5 rounded-[14px] text-sm font-semibold transition-all duration-300 ${
                          budget === option.value
                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-xl shadow-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/50'
                            : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800/80 hover:text-slate-300 border border-slate-700/40 hover:border-slate-600/40'
                        }`}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                  
                  <p className="text-xs text-slate-500 mt-5 leading-relaxed">
                    Prioritizes ingredients based on availability and common usage.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Primary CTA */}
            <motion.button
              whileHover={isSearchValid() ? { scale: 1.015, y: -4 } : {}}
              whileTap={isSearchValid() ? { scale: 0.985 } : {}}
              onClick={handleSearch}
              disabled={isSearching || !isSearchValid()}
              className={`relative w-full h-[72px] rounded-[20px] text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden ${
                !isSearchValid()
                  ? 'bg-slate-700/60 text-slate-500 cursor-not-allowed border border-slate-700/40'
                  : 'bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white shadow-[0_20px_70px_-15px_rgba(139,92,246,0.7)] hover:shadow-[0_25px_90px_-15px_rgba(139,92,246,0.9)]'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {/* Shimmer effect */}
              {isSearchValid() && !isSearching && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  {/* Pulsing glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-violet-600/40 via-purple-600/40 to-violet-600/40 blur-2xl"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </>
              )}
              
              <span className="relative z-10 flex items-center gap-3">
                {isSearching ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Analyzing flavor compounds...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    <span>Explore Flavor</span>
                  </>
                )}
              </span>
            </motion.button>

            {/* 5. Smart Status Hint */}
            <AnimatePresence mode="wait">
              <motion.div
                key={getStatusHint()}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center mt-6"
              >
                <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-slate-800/40 border border-slate-700/40 backdrop-blur-xl">
                  <Info className="w-4 h-4 text-violet-400" />
                  <span className="text-xs text-slate-400 font-medium">{getStatusHint()}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
