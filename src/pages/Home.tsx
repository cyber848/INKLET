import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Feather, Users, Star } from 'lucide-react';

const Home: React.FC = () => {
  const featuredPoems = [
    {
      id: 1,
      title: "Whispers of Dawn",
      author: "Sarah Chen",
      excerpt: "In the quiet hours before sunrise, when the world holds its breath...",
      category: "Nature"
    },
    {
      id: 2,
      title: "City Rhythms",
      author: "Marcus Johnson",
      excerpt: "Concrete jungle pulses with life, each step a beat in the urban symphony...",
      category: "Urban"
    },
    {
      id: 3,
      title: "Memory's Garden",
      author: "Elena Rodriguez",
      excerpt: "In the garden of remembrance, flowers bloom in sepia tones...",
      category: "Memory"
    }
  ];

  const featuredBlogPosts = [
    {
      id: 1,
      title: "The Art of Modern Poetry",
      author: "Inklet Editorial",
      excerpt: "Exploring how contemporary poets are reshaping the literary landscape...",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Finding Your Voice",
      author: "Inklet Editorial",
      excerpt: "A guide for emerging poets on developing their unique style and perspective...",
      readTime: "7 min read"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-hero-gradient bg-literary-texture min-h-[80vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Where Words
            <span className="block text-gold-400">Find Their Voice</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover, create, and share the beauty of poetry and prose in our literary sanctuary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/poems"
              className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Explore Poems
            </Link>
            <Link
              to="/submit"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              Submit Your Work
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Poems */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              Featured Poems
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover the latest voices and timeless themes in our curated collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredPoems.map((poem) => (
              <div key={poem.id} className="bg-slate-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4">
                  <span className="inline-block bg-gold-100 text-gold-800 text-xs px-2 py-1 rounded-full font-medium">
                    {poem.category}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-2">
                  {poem.title}
                </h3>
                <p className="text-slate-600 mb-3 italic">
                  "{poem.excerpt}"
                </p>
                <p className="text-sm text-slate-500 mb-4">
                  by {poem.author}
                </p>
                <Link
                  to={`/poems/${poem.id}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/poems"
              className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              View All Poems
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <BookOpen className="h-12 w-12 text-primary-600 mb-4" />
              <div className="text-3xl font-bold text-slate-900 mb-2">1,247</div>
              <div className="text-slate-600">Poems Published</div>
            </div>
            <div className="flex flex-col items-center">
              <Feather className="h-12 w-12 text-gold-500 mb-4" />
              <div className="text-3xl font-bold text-slate-900 mb-2">156</div>
              <div className="text-slate-600">Featured Authors</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-primary-600 mb-4" />
              <div className="text-3xl font-bold text-slate-900 mb-2">3,842</div>
              <div className="text-slate-600">Community Members</div>
            </div>
            <div className="flex flex-col items-center">
              <Star className="h-12 w-12 text-gold-500 mb-4" />
              <div className="text-3xl font-bold text-slate-900 mb-2">98%</div>
              <div className="text-slate-600">Reader Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              Latest Insights
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore the craft, technique, and inspiration behind great poetry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {featuredBlogPosts.map((post) => (
              <div key={post.id} className="bg-slate-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {post.title}
                </h3>
                <p className="text-slate-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    by {post.author}
                  </span>
                  <span className="text-sm text-primary-600 font-medium">
                    {post.readTime}
                  </span>
                </div>
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mt-4"
                >
                  Read Article
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/blog"
              className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Join Our Literary Community
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Share your voice, connect with fellow writers, and be part of a community 
            that celebrates the power of words.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth?mode=signup"
              className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Join Today
            </Link>
            <Link
              to="/submit"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              Submit Your Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;