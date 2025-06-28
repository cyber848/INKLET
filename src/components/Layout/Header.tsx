import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, PenTool } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <PenTool className="h-8 w-8 text-gold-400" />
            <span className="text-2xl font-serif font-semibold text-white">Inklet</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors duration-200">
              Home
            </Link>
            <Link to="/poems" className="text-slate-300 hover:text-white transition-colors duration-200">
              Poems
            </Link>
            <Link to="/blog" className="text-slate-300 hover:text-white transition-colors duration-200">
              Blog
            </Link>
            <Link to="/about" className="text-slate-300 hover:text-white transition-colors duration-200">
              About
            </Link>
            <Link to="/submit" className="text-slate-300 hover:text-white transition-colors duration-200">
              Submit
            </Link>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-200"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm">{user.full_name || user.email}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="inline h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    {user.is_admin && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="inline h-4 w-4 mr-2" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors duration-200"
                    >
                      <LogOut className="inline h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth"
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <nav className="px-4 py-4 space-y-4">
            <Link
              to="/"
              className="block text-slate-300 hover:text-white transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/poems"
              className="block text-slate-300 hover:text-white transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Poems
            </Link>
            <Link
              to="/blog"
              className="block text-slate-300 hover:text-white transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="block text-slate-300 hover:text-white transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/submit"
              className="block text-slate-300 hover:text-white transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Submit
            </Link>
            
            {user ? (
              <div className="pt-4 border-t border-slate-700 space-y-4">
                <div className="text-sm text-slate-400">
                  {user.full_name || user.email}
                </div>
                <Link
                  to="/profile"
                  className="block text-slate-300 hover:text-white transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                {user.is_admin && (
                  <Link
                    to="/admin"
                    className="block text-slate-300 hover:text-white transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="block text-slate-300 hover:text-white transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-slate-700 space-y-4">
                <Link
                  to="/auth"
                  className="block text-slate-300 hover:text-white transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="block bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;