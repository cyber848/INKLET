import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Clock, 
  Eye, 
  Calendar, 
  Tag, 
  Star, 
  FileText,
  Sparkles,
  TrendingUp,
  BookOpen,
  Heart,
  User
} from 'lucide-react';

const Blog: React.FC = () => {
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
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Modern Poetry",
      author: "Inklet Editorial",
      excerpt: "Exploring how contemporary poets are reshaping the literary landscape with innovative forms and digital platforms...",
      content: "Full article content here...",
      category: "Craft",
      tags: ["poetry", "modern", "technique"],
      reading_time: 5,
      likes: 42,
      views: 287,
      featured: true,
      published: true,
      created_at: "2024-01-15T08:00:00Z",
      gradient: "from-blue-400 to-cyan-400",
      image: "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      title: "Finding Your Voice",
      author: "Sarah Chen",
      excerpt: "A comprehensive guide for emerging poets on developing their unique style and perspective in the literary world...",
      content: "Full article content here...",
      category: "Writing Tips",
      tags: ["voice", "style", "beginners"],
      reading_time: 7,
      likes: 38,
      views: 234,
      featured: true,
      published: true,
      created_at: "2024-01-12T14:30:00Z",
      gradient: "from-purple-400 to-pink-400",
      image: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      title: "The Power of Metaphor",
      author: "Marcus Johnson",
      excerpt: "Understanding how metaphors can transform ordinary language into extraordinary poetry that resonates with readers...",
      content: "Full article content here...",
      category: "Literary Analysis",
      tags: ["metaphor", "language", "analysis"],
      reading_time: 6,
      likes: 29,
      views: 198,
      featured: false,
      published: true,
      created_at: "2024-01-10T16:45:00Z",
      gradient: "from-green-400 to-emerald-400",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 4,
      title: "Digital Poetry Platforms",
      author: "Elena Rodriguez",
      excerpt: "How technology is changing the way we create, share, and experience poetry in the 21st century...",
      content: "Full article content here...",
      category: "Technology",
      tags: ["digital", "platforms", "future"],
      reading_time: 8,
      likes: 35,
      views: 156,
      featured: false,
      published: true,
      created_at: "2024-01-08T10:20:00Z",
      gradient: "from-orange-400 to-red-400",
      image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', color: 'from-slate-400 to-slate-500' },
    { value: 'craft', label: 'Craft', color: 'from-blue-400 to-cyan-400' },
    { value: 'writing tips', label: 'Writing Tips', color: 'from-purple-400 to-pink-400' },
    { value: 'literary analysis', label: 'Literary Analysis', color: 'from-green-400 to-emerald-400' },
    { value: 'technology', label: 'Technology', color: 'from-orange-400 to-red-400' },
    { value: 'interviews', label: 'Interviews', color: 'from-pink-400 to-rose-400' },
    { value: 'reviews', label: 'Reviews', color: 'from-indigo-400 to-purple-400' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           post.category.toLowerCase() === selectedCategory;
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
      <div className="relative bg-gradient-to-r from-secondary-600 via-accent-600 to-primary-600 overflow-hidden">
        <div className="absolute inset-0 bg-floating-shapes opacity-20"></div>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="mb-6">
              <FileText className="h-16 w-16 text-white mx-auto mb-4 animate-float" />
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
              Literary Blog
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Insights, techniques, and inspiration for writers and literature lovers. 
              Explore the craft behind great writing and discover new perspectives on the literary arts.
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
                placeholder="Search articles, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-secondary-200 focus:border-secondary-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-10 rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-secondary-200 focus:border-secondary-400 appearance-none bg-white/80 backdrop-blur-sm min-w-[200px] transition-all duration-300"
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
              {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
            </p>
          </div>
        </div>

        {/* Featured Posts */}
        {filteredPosts.some(post => post.featured) && (
          <div className="mb-12 animate-on-scroll">
            <div className="flex items-center space-x-2 mb-6">
              <Star className="h-6 w-6 text-gold-500" />
              <h2 className="text-2xl font-bold text-slate-900">Featured Articles</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredPosts.filter(post => post.featured).map((post, index) => (
                <div 
                  key={post.id} 
                  className={`card-gradient hover-lift group animate-on-scroll overflow-hidden`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-block bg-gradient-to-r ${post.gradient} text-white text-sm px-4 py-2 rounded-full font-semibold shadow-lg`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-gold-400 to-orange-400 text-white text-sm px-3 py-2 rounded-full font-semibold shadow-lg">
                        <Star className="h-3 w-3" />
                        <span>Featured</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-secondary-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.reading_time} min read</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </span>
                        <span className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </span>
                      </div>
                      
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-secondary-500 to-accent-500 hover:from-secondary-600 hover:to-accent-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <span>Read More</span>
                        <Sparkles className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div className="animate-on-scroll">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-3 text-primary-600" />
            All Articles
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div 
                key={post.id} 
                className={`card-gradient hover-lift group animate-on-scroll overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-block bg-gradient-to-r ${post.gradient} text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg`}>
                      {post.category}
                    </span>
                  </div>
                  {post.featured && (
                    <div className="absolute top-3 right-3">
                      <Star className="h-5 w-5 text-gold-400" />
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-secondary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center text-xs text-slate-600 bg-slate-100 rounded-full px-2 py-1"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.reading_time} min</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.views}</span>
                      </span>
                    </div>
                    
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-secondary-600 hover:text-secondary-700 font-semibold text-sm transition-colors"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 animate-on-scroll">
            <div className="card-gradient p-12 max-w-md mx-auto">
              <Search className="h-16 w-16 text-slate-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 mb-4">No articles found</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Try adjusting your search terms or category filter to discover more content.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="btn-secondary"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-16 animate-on-scroll">
            <button className="btn-accent inline-flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Load More Articles</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;