import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Mail, Twitter, Instagram, Facebook, Heart, Sparkles, Globe, BookOpen } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-floating-shapes opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <PenTool className="h-10 w-10 text-gold-400" />
                <Sparkles className="h-4 w-4 text-gold-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-3xl font-serif font-bold text-gradient-animated">Inklet</span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md leading-relaxed text-lg">
              A vibrant literary sanctuary where poetry and prose find their voice. 
              Discover, create, and share the beauty of written expression with our global community.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
                { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
                { icon: Mail, href: '#', color: 'hover:text-green-400' },
              ].map(({ icon: Icon, href, color }, index) => (
                <a
                  key={index}
                  href={href}
                  className={`text-slate-400 ${color} transition-all duration-300 transform hover:scale-110 hover:shadow-glow p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-6 text-xl text-gradient flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/poems', label: 'Poems' },
                { to: '/blog', label: 'Blog' },
                { to: '/categories', label: 'Categories' },
                { to: '/submit', label: 'Submit Work' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link 
                    to={to} 
                    className="text-slate-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block relative group"
                  >
                    {label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold mb-6 text-xl text-gradient flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Connect
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/about', label: 'Our Story' },
                { to: '/contact', label: 'Contact' },
                { to: '/guidelines', label: 'Guidelines' },
                { to: '/privacy', label: 'Privacy Policy' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link 
                    to={to} 
                    className="text-slate-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block relative group"
                  >
                    {label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400 text-center md:text-left mb-4 md:mb-0">
              &copy; 2024 Inklet. All rights reserved. 
              <span className="inline-flex items-center ml-2">
                Crafted with <Heart className="h-4 w-4 text-red-400 mx-1 animate-pulse" /> for literature.
              </span>
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-slate-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;