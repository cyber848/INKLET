import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Heart, Eye, Calendar, Tag } from 'lucide-react';

const Poems: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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
      created_at: "2024-01-15T08:00:00Z"
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
      created_at: "2024-01-10T14:30:00Z"
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
      created_at: "2024-01-08T16:45:00Z"
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
      created_at: "2024-01-05T10:20:00Z"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'nature', label: 'Nature' },
    { value: 'urban', label: 'Urban' },
    { value: 'memory', label: 'Memory' },
    { value: 'philosophy', label: 'Philosophy' },
    { value: 'love', label: 'Love' },
    { value: 'social', label: 'Social' }
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">
            Poetry Collection
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Discover voices that speak to the soul, explore themes that resonate across time, 
            and find words that capture the ineffable beauty of human experience.
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search poems, authors, or themes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-10 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            {filteredPoems.length} {filteredPoems.length === 1 ? 'poem' : 'poems'} found
          </p>
        </div>

        {/* Poems Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPoems.map((poem) => (
            <div key={poem.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-300">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full font-medium">
                      {poem.category}
                    </span>
                    {poem.featured && (
                      <span className="inline-block bg-gold-100 text-gold-800 text-xs px-2 py-1 rounded-full font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-serif font-semibold text-slate-900 mb-1">
                    {poem.title}
                  </h2>
                  <p className="text-sm text-slate-600 mb-3">
                    by {poem.author}
                  </p>
                </div>
              </div>

              {/* Excerpt */}
              <div className="mb-4">
                <p className="text-slate-700 italic leading-relaxed">
                  "{poem.excerpt}"
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {poem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center text-xs text-slate-600 bg-slate-100 rounded-full px-2 py-1"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    {poem.likes}
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {poem.views}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(poem.created_at)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                to={`/poems/${poem.id}`}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                Read Full Poem
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPoems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No poems found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search terms or category filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Load More Button (for pagination) */}
        {filteredPoems.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Load More Poems
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Poems;