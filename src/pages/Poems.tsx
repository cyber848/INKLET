import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Heart, Eye, Calendar, Tag, Star, BookOpen, Sparkles, TrendingUp } from 'lucide-react';

const Poems: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Mock data - this would come from Supabase in a real implementation
  const poems = [
    {
      id: 1,
      title: "Whispers of Dawn",
      author: "Sarah Chen",
      excerpt: "In the quiet hours before sunrise, when the world holds its breath and dreams linger in the silver air...",
      content: `In the quiet hours before sunrise,
when the world holds its breath
and dreams linger in the silver air,
I find myself walking
through corridors of memory,
each step echoing
with the whispers of dawn.

The sky blushes pink
like a secret being told,
and I am reminded
that every ending
is just another beginning
waiting to unfold.`,
      category: "Nature",
      tags: ["dawn", "memories", "hope"],
      likes: 23,
      views: 187,
      featured: true,
      published: true,
      created_at: "2024-01-15T08:00:00Z",
      gradient: "from-pink-400 to-rose-400"
    },
    {
      id: 2,
      title: "City Rhythms",
      author: "Marcus Johnson",
      excerpt: "Concrete jungle pulses with life, each step a beat in the urban symphony that never sleeps...",
      content: `Concrete jungle pulses with life,
each step a beat
in the urban symphony
that never sleeps.

Neon signs flicker
like electric poetry,
while strangers pass
carrying stories
in their hurried steps.

The city breathes
through subway grates,
exhales the dreams
of millions,
inhales the hope
of tomorrow's rush.`,
      category: "Urban",
      tags: ["city", "life", "rhythm"],
      likes: 15,
      views: 142,
      featured: false,
      published: true,
      created_at: "2024-01-10T14:30:00Z",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      id: 3,
      title: "Memory's Garden",
      author: "Elena Rodriguez",
      excerpt: "In the garden of remembrance, flowers bloom in sepia tones, each petal a moment preserved...",
      content: `In the garden of remembrance,
flowers bloom in sepia tones,
each petal a moment preserved
in the amber of time.

I tend to these memories
with gentle hands,
watering them with tears
of joy and sorrow,
watching as they grow
into something beautiful.

Some wilt with age,
others stand eternal,
but all belong
to this sacred space
where love lives on
in whispered names.`,
      category: "Memory",
      tags: ["memory", "love", "time"],
      likes: 31,
      views: 203,
      featured: true,
      published: true,
      created_at: "2024-01-08T16:45:00Z",
      gradient: "from-purple-400 to-pink-400"
    },
    {
      id: 4,
      title: "Storm's Eye",
      author: "David Kim",
      excerpt: "Within the chaos of the tempest, there exists a place of perfect stillness...",
      content: `Within the chaos of the tempest,
there exists a place
of perfect stillness,
where thoughts crystallize
like raindrops
suspended in time.

I am the storm,
I am the eye,
I am the silence
between the thunder
and the light.

In this moment
of absolute calm,
I understand
that peace is not
the absence of chaos,
but the presence
of acceptance.`,
      category: "Philosophy",
      tags: ["storm", "peace", "acceptance"],
      likes: 18,
      views: 156,
      featured: false,
      published: true,
      created_at: "2024-01-05T10:20:00Z",
      gradient: "from-green-400 to-emerald-400"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', color: 'from-slate-400 to-slate-500' },
    { value: 'nature', label: 'Nature', color: 'from-green-400 to-emerald-400' },
    { value: 'urban', label: 'Urban', color: 'from-blue-400 to-cyan-400' },
    { value: 'memory', label: 'Memory', color: 'from-purple-400 to-pink-400' },
    { value: 'philosophy', label: 'Philosophy', color: 'from-orange-400 to-red-400' },
    { value: 'love', label: 'Love', color: 'from-pink-400 to-rose-400' },
    { value: 'social', label: 'Social', color: 'from-indigo-400 to-purple-400' }
  ];

  const filteredPoems = poems.filter(poem => {
    const matchesSearch = poem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poem.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poem.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           poem.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Floating Background Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="floating-shape floating-shape-1"></div>
        <div className="floating-shape floating-shape-2"></div>
        <div className="floating-shape floating-shape-3"></div>
        <div className="floating-shape floating-shape-4"></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 overflow-hidden">
        <div className="absolute inset-0 bg-floating-shapes opacity-20"></div>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="mb-6">
              <BookOpen className="h-16 w-16 text-white mx-auto mb-4 animate-float" />
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
              Poetry Collection
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover voices that speak to the soul, explore themes that resonate across time, 
              and find words that capture the ineffable beauty of human experience.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className={`card-gradient p-6 mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search poems, authors, or themes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-10 rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-400 appearance-none bg-white/80 backdrop-blur-sm min-w-[200px] transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-8 animate-on-scroll">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.value
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-8 animate-on-scroll">
          <div className="flex items-center space-x-2 text-slate-600">
            <TrendingUp className="h-5 w-5" />
            <p className="font-medium">
              {filteredPoems.length} {filteredPoems.length === 1 ? 'poem' : 'poems'} found
            </p>
          </div>
        </div>

        {/* Poems Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPoems.map((poem, index) => (
            <div 
              key={poem.id} 
              className={`card-gradient hover-lift group animate-on-scroll`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`inline-block bg-gradient-to-r ${poem.gradient} text-white text-sm px-4 py-2 rounded-full font-semibold shadow-lg`}>
                        {poem.category}
                      </span>
                      {poem.featured && (
                        <div className="flex items-center space-x-1 bg-gradient-to-r from-gold-400 to-orange-400 text-white text-sm px-3 py-2 rounded-full font-semibold shadow-lg">
                          <Star className="h-3 w-3" />
                          <span>Featured</span>
                        </div>
                      )}
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {poem.title}
                    </h2>
                    <p className="text-slate-600 mb-4 font-medium">
                      by {poem.author}
                    </p>
                  </div>
                </div>

                {/* Excerpt */}
                <div className="mb-6">
                  <p className="text-slate-700 italic leading-relaxed text-lg">
                    "{poem.excerpt}"
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {poem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-sm text-slate-600 bg-slate-100 rounded-full px-3 py-1 hover:bg-slate-200 transition-colors"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                  <div className="flex items-center space-x-6">
                    <span className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="font-medium">{poem.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                      <Eye className="h-4 w-4" />
                      <span className="font-medium">{poem.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(poem.created_at)}</span>
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={`/poems/${poem.id}`}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Read Full Poem</span>
                  <Sparkles className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPoems.length === 0 && (
          <div className="text-center py-16 animate-on-scroll">
            <div className="card-gradient p-12 max-w-md mx-auto">
              <Search className="h-16 w-16 text-slate-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 mb-4">No poems found</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Try adjusting your search terms or category filter to discover more poetry.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="btn-primary"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {filteredPoems.length > 0 && (
          <div className="text-center mt-16 animate-on-scroll">
            <button className="btn-accent inline-flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Load More Poems</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Poems;