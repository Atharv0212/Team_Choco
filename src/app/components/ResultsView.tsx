import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Clock, Users, TrendingUp, Flame } from 'lucide-react';

interface ResultsViewProps {
  searchData?: {
    query: string;
    allergies: string[];
    budget: string;
  };
}

const mockResults = [
  {
    id: 1,
    name: 'Grilled Chicken with Tarragon',
    similarity: 94,
    cost: '$',
    time: '25 min',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600',
    description: 'Molecular match: Anise, Limonene compounds',
    tags: ['High Protein', 'Quick'],
    difficulty: 'Easy',
  },
  {
    id: 2,
    name: 'Miso-Glazed Salmon',
    similarity: 91,
    cost: '$$',
    time: '30 min',
    servings: 2,
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=600',
    description: 'Umami-rich, savory depth profile',
    tags: ['Omega-3', 'Gourmet'],
    difficulty: 'Medium',
  },
  {
    id: 3,
    name: 'Roasted Cauliflower with Cumin',
    similarity: 89,
    cost: '$',
    time: '35 min',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1568584711271-28d84a1ab403?w=600',
    description: 'Nutty, earthy flavor compounds',
    tags: ['Vegan', 'Low-Carb'],
    difficulty: 'Easy',
  },
  {
    id: 4,
    name: 'Dark Chocolate & Berry Tart',
    similarity: 87,
    cost: '$$',
    time: '45 min',
    servings: 8,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600',
    description: 'Anthocyanin & Theobromine pairing',
    tags: ['Dessert', 'Antioxidants'],
    difficulty: 'Medium',
  },
  {
    id: 5,
    name: 'Coconut Curry Vegetables',
    similarity: 85,
    cost: '$',
    time: '20 min',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600',
    description: 'Aromatic spice complex match',
    tags: ['Vegan', 'Spicy'],
    difficulty: 'Easy',
  },
  {
    id: 6,
    name: 'Seared Scallops with Citrus',
    similarity: 83,
    cost: '$$$',
    time: '15 min',
    servings: 2,
    image: 'https://images.unsplash.com/photo-1559661219-132e78cfc2c7?w=600',
    description: 'Fresh, bright terpene profile',
    tags: ['Seafood', 'Quick'],
    difficulty: 'Hard',
  },
];

const difficultyColors = {
  Easy: 'text-green-400 bg-green-400/10 border-green-400/20',
  Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  Hard: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
};

export function ResultsView({ searchData }: ResultsViewProps) {
  return (
    <section id="results" className="py-20 md:py-32 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-4 tracking-tight">
            Your Flavor Matches
          </h2>
          <p className="text-slate-400 text-base md:text-lg mb-4">
            Ranked by molecular similarity and taste compatibility
          </p>
          {searchData && (
            <p className="text-sm text-violet-400">
              Showing results for: <span className="font-semibold">{searchData.query}</span>
              {searchData.allergies.length > 0 && (
                <span className="text-slate-500">
                  {' • '}Excluding: {searchData.allergies.join(', ')}
                </span>
              )}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockResults.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
                  <ImageWithFallback
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Similarity badge */}
                  <div className="absolute top-4 right-4 px-3 py-2 backdrop-blur-xl bg-violet-600/90 rounded-full">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-white" />
                      <span className="text-white font-mono text-sm font-semibold">{recipe.similarity}%</span>
                    </div>
                  </div>
                  {/* Cost indicator */}
                  <div className="absolute top-4 left-4 px-3 py-2 backdrop-blur-xl bg-slate-900/90 rounded-full border border-white/10">
                    <span className="text-white text-sm font-medium">{recipe.cost}</span>
                  </div>
                  {/* Difficulty badge */}
                  <div className={`absolute bottom-4 left-4 px-3 py-1.5 backdrop-blur-xl rounded-full text-xs font-medium border ${difficultyColors[recipe.difficulty as keyof typeof difficultyColors]}`}>
                    {recipe.difficulty}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl text-white mb-2 tracking-tight group-hover:text-violet-400 transition-colors">
                    {recipe.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                    {recipe.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-slate-800/50 border border-slate-700/50 rounded-full text-xs text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-sm text-slate-500 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings}</span>
                    </div>
                  </div>

                  {/* Similarity bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Flame className="w-3 h-3" />
                        Flavor Match
                      </span>
                      <span className="font-mono font-semibold text-violet-400">{recipe.similarity}%</span>
                    </div>
                    <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${recipe.similarity}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-violet-600 via-violet-500 to-orange-500 rounded-full relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}