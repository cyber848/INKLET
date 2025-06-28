import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, PenTool, Sparkles } from 'lucide-react';
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
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <PenTool className="h-8 w-8 text-primary-600 group-hover:text-secondary-600 transition-colors duration-300" />
              <Sparkles className="h-4 w-4 text-gold-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-2xl font-serif font-bold text-gradient group-hover:scale-105 transition-transform duration-300">
              Inklet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { to: '/', label: 'Home' },
              { to: '/poems', label: 'Poems' },
              { to: '/blog', label: 'Blog' },
              { to: '/about', label: 'About' },
              { to: '/submit', label: 'Submit' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="relative text-slate-700 hover:text-primary-600 transition-colors duration-300 font-medium group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-slate-700 hover:text-primary-600 transition-colors duration-300 bg-gradient-to-r from-primary-50 to-secondary-50 px-4 py-2 rounded-xl hover:shadow-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{user.full_name || user.email}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 card animate-slide-down z-50">
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-all duration-200 rounded-lg mx-2"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="inline h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      {user.is_admin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-all duration-200 rounded-lg mx-2"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="inline h-4 w-4 mr-2" />
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 rounded-lg mx-2"
                      >
                        <LogOut className="inline h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth"
                  className="text-slate-700 hover:text-primary-600 transition-colors duration-300 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-700 hover:text-primary-600 p-2 rounded-lg hover:bg-primary-50 transition-all duration-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/20 animate-slide-down">
          <nav className="px-4 py-4 space-y-4">
            {[
              { to: '/', label: 'Home' },
              { to: '/poems', label: 'Poems' },
              { to: '/blog', label: 'Blog' },
              { to: '/about', label: 'About' },
              { to: '/submit', label: 'Submit' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="block text-slate-700 hover:text-primary-600 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            
            {user ? (
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <div className="text-sm text-slate-600 px-4">
                  {user.full_name || user.email}
                </div>
                <Link
                  to="/profile"
                  className="block text-slate-700 hover:text-primary-600 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                {user.is_admin && (
                  <Link
                    to="/admin"
                    className="block text-slate-700 hover:text-primary-600 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="block text-slate-700 hover:text-red-600 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 w-full text-left"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <Link
                  to="/auth"
                  className="block text-slate-700 hover:text-primary-600 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="block btn-primary text-center"
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