import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Feather, Users, Star, Sparkles, Heart, Eye, TrendingUp, Award, Zap, Globe } from 'lucide-react';

const Home: React.FC = () => {
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

  const featuredPoems = [
    {
      id: 1,
      title: "Whispers of Dawn",
      author: "Sarah Chen",
      excerpt: "In the quiet hours before sunrise, when the world holds its breath...",
      category: "Nature",
      gradient: "from-pink-400 to-rose-400"
    },
    {
      id: 2,
      title: "City Rhythms",
      author: "Marcus Johnson",
      excerpt: "Concrete jungle pulses with life, each step a beat in the urban symphony...",
      category: "Urban",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      id: 3,
      title: "Memory's Garden",
      author: "Elena Rodriguez",
      excerpt: "In the garden of remembrance, flowers bloom in sepia tones...",
      category: "Memory",
      gradient: "from-purple-400 to-pink-400"
    }
  ];

  const featuredBlogPosts = [
    {
      id: 1,
      title: "The Art of Modern Poetry",
      author: "Inklet Editorial",
      excerpt: "Exploring how contemporary poets are reshaping the literary landscape...",
      readTime: "5 min read",
      gradient: "from-green-400 to-emerald-400"
    },
    {
      id: 2,
      title: "Finding Your Voice",
      author: "Inklet Editorial",
      excerpt: "A guide for emerging poets on developing their unique style and perspective...",
      readTime: "7 min read",
      gradient: "from-orange-400 to-red-400"
    }
  ];

  const stats = [
    { icon: BookOpen, label: "Poems Published", value: "1,247", color: "from-blue-500 to-purple-500" },
    { icon: Feather, label: "Featured Authors", value: "156", color: "from-pink-500 to-rose-500" },
    { icon: Users, label: "Community Members", value: "3,842", color: "from-green-500 to-emerald-500" },
    { icon: Star, label: "Reader Satisfaction", value: "98%", color: "from-yellow-500 to-orange-500" }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Floating Background Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="floating-shape floating-shape-1"></div>
        <div className="floating-shape floating-shape-2"></div>
        <div className="floating-shape floating-shape-3"></div>
        <div className="floating-shape floating-shape-4"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 animate-gradient"></div>
        <div className="absolute inset-0 bg-floating-shapes opacity-30"></div>
        
        {/* Content */}
        <div className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <Sparkles className="h-16 w-16 text-gold-300 mx-auto mb-4 animate-pulse" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-tight text-white">
            Where Words
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-yellow-300 to-orange-300 animate-gradient">
              Find Their Voice
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover, create, and share the beauty of poetry and prose in our vibrant literary sanctuary.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/poems"
              className="group bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2"
            >
              <BookOpen className="h-6 w-6 group-hover:animate-bounce" />
              <span>Explore Poems</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/submit"
              className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Feather className="h-6 w-6 group-hover:animate-wiggle" />
              <span>Submit Your Work</span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Poems */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-6 py-3 rounded-full mb-6">
              <Star className="h-5 w-5 text-primary-600" />
              <span className="text-primary-700 font-semibold">Featured Collection</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient mb-6">
              Poetry That Moves Souls
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover the latest voices and timeless themes in our curated collection of extraordinary poetry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredPoems.map((poem, index) => (
              <div 
                key={poem.id} 
                className={`card-gradient hover-lift group animate-on-scroll`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="p-8">
                  <div className="mb-6">
                    <div className={`inline-block bg-gradient-to-r ${poem.gradient} text-white text-sm px-4 py-2 rounded-full font-semibold shadow-lg`}>
                      {poem.category}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {poem.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 italic leading-relaxed">
                    "{poem.excerpt}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500 font-medium">
                      by {poem.author}
                    </p>
                    <Link
                      to={`/poems/${poem.id}`}
                      className="inline-flex items-center text-primary-600 hover:text-secondary-600 font-semibold group-hover:translate-x-1 transition-all"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center animate-on-scroll">
            <Link
              to="/poems"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <BookOpen className="h-5 w-5" />
              <span>Explore All Poems</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-floating-shapes opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Our Growing Community
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of poets and literature lovers from around the world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className={`text-center animate-on-scroll hover-lift`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl mb-6 shadow-2xl`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full mb-6">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="text-purple-700 font-semibold">Latest Insights</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient-2 mb-6">
              Literary Wisdom
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Explore the craft, technique, and inspiration behind great poetry with our expert insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featuredBlogPosts.map((post, index) => (
              <div 
                key={post.id} 
                className={`card-gradient hover-lift group animate-on-scroll`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="p-8">
                  <div className={`inline-block bg-gradient-to-r ${post.gradient} text-white text-sm px-4 py-2 rounded-full font-semibold shadow-lg mb-6`}>
                    {post.readTime}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 font-medium">
                      by {post.author}
                    </span>
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center text-purple-600 hover:text-pink-600 font-semibold group-hover:translate-x-1 transition-all"
                    >
                      Read Article
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center animate-on-scroll">
            <Link
              to="/blog"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <Globe className="h-5 w-5" />
              <span>Read All Articles</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-floating-shapes opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-on-scroll">
            <div className="mb-8">
              <Award className="h-20 w-20 text-gold-400 mx-auto mb-6 animate-pulse" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Join Our Literary
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-yellow-300 to-orange-300">
                Renaissance
              </span>
            </h2>
            
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Share your voice, connect with fellow writers, and be part of a community 
              that celebrates the transformative power of words.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/auth?mode=signup"
                className="group bg-gradient-to-r from-gold-400 to-orange-400 hover:from-gold-500 hover:to-orange-500 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3"
              >
                <Zap className="h-6 w-6 group-hover:animate-bounce" />
                <span>Join Today</span>
                <Sparkles className="h-5 w-5" />
              </Link>
              <Link
                to="/submit"
                className="group bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <Feather className="h-6 w-6 group-hover:animate-wiggle" />
                <span>Submit Your Work</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;