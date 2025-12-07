import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';
import React from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in and get their info
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link 
            to="/" 
            className="group flex items-center gap-3 text-3xl font-bold transition-all duration-300"
          >
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-2.5 rounded-xl shadow-lg group-hover:shadow-indigo-500/50 transition-all duration-300 group-hover:scale-110">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-indigo-900">
              QuickShop
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`relative text-lg font-medium transition-colors duration-300 ${
                isActive('/') 
                  ? 'text-indigo-600' 
                  : 'text-slate-700 hover:text-indigo-600'
              }`}
            >
              Home
              {isActive('/') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></span>
              )}
            </Link>
            <Link 
              to="/shop" 
              className={`relative text-lg font-medium transition-colors duration-300 ${
                isActive('/shop') 
                  ? 'text-indigo-600' 
                  : 'text-slate-700 hover:text-indigo-600'
              }`}
            >
              Shop
              {isActive('/shop') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></span>
              )}
            </Link>
            <Link 
              to="/about" 
              className={`relative text-lg font-medium transition-colors duration-300 ${
                isActive('/about') 
                  ? 'text-indigo-600' 
                  : 'text-slate-700 hover:text-indigo-600'
              }`}
            >
              About
              {isActive('/about') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></span>
              )}
            </Link>

            {/* User / Admin Area */}
            {user ? (
              <div className="flex items-center gap-4">
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="group flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/50"
                  >
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Admin Panel
                  </Link>
                )}

                <div className="flex items-center gap-4 bg-slate-50 rounded-xl px-4 py-2 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-sm text-slate-500 leading-tight">Welcome back</p>
                      <p className="font-semibold text-slate-900">
                        {user.name.split(' ')[0]}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="group flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="hidden xl:inline">Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="group flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/50"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login / Register
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden bg-slate-100 hover:bg-slate-200 p-2 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg className="w-7 h-7 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
          <div className="space-y-3 pt-4">
            <Link 
              to="/" 
              className={`block px-4 py-3 rounded-xl font-medium text-lg transition-all ${
                isActive('/') 
                  ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600' 
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={`block px-4 py-3 rounded-xl font-medium text-lg transition-all ${
                isActive('/shop') 
                  ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600' 
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className={`block px-4 py-3 rounded-xl font-medium text-lg transition-all ${
                isActive('/about') 
                  ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600' 
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            {user ? (
              <>
                {/* User Info */}
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Logged in as</p>
                    <p className="font-semibold text-slate-900">{user.name}</p>
                  </div>
                </div>

                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Admin Panel
                  </Link>
                )}

                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-red-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}