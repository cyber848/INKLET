import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Mail, Twitter, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <PenTool className="h-8 w-8 text-gold-400" />
              <span className="text-2xl font-serif font-semibold">Inklet</span>
            </div>
            <p className="text-slate-300 mb-4 max-w-md">
              A literary sanctuary where poetry and prose find their voice. 
              Discover, create, and share the beauty of written expression.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-gold-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-gold-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-gold-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-gold-400 transition-colors duration-200">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/poems" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Poems
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Submit Work
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-300 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 Inklet. All rights reserved. Crafted with love for literature.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;