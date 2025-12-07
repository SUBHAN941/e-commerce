// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import React from 'react';

export default function Home() {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    api.get('/products')
      .then(res => {
        const found = res.data.find(p => p.isBanner);
        setBanner(found);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen">
      {banner ? (
        <div className="relative h-screen overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src={banner.image} 
              alt="" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-indigo-900/80"></div>
          </div>
          
          {/* Content */}
          <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-5xl">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <span className="text-white/90 text-sm font-medium tracking-wide">
                  Featured Product
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight">
                <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                  {banner.bannerTitle || banner.name}
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-12 text-indigo-100 font-light">
                {banner.bannerSubtitle || `Starting at $${banner.price}`}
              </p>
              
              {/* CTA Button */}
              <Link 
                to="/shop" 
                className="group inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-full text-lg font-semibold hover:bg-indigo-50 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/50 hover:scale-105"
              >
                Shop Now
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
        </div>
      ) : (
        <div className="relative h-screen overflow-hidden bg-slate-900">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-900">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NCAwLTE4IDguMDYtMTggMThzOC4wNiAxOCAxOCAxOCAxOC04LjA2IDE4LTE4LTguMDYtMTgtMTgtMTh6bTAgMzJjLTcuNzMgMC0xNC02LjI3LTE0LTE0czYuMjctMTQgMTQtMTQgMTQgNi4yNyAxNCAxNC02LjI3IDE0LTE0IDE0eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-20"></div>
          </div>
          
          {/* Content */}
          <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl">
              {/* Logo/Brand */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                  <svg 
                    className="w-12 h-12 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
              
              {/* Title */}
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 text-white leading-tight tracking-tight">
                QuickShop
              </h1>
              
              {/* Subtitle */}
              <p className="text-2xl sm:text-3xl md:text-4xl text-indigo-200 font-light mb-12">
                Your Premium Shopping Destination
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <div className="flex items-center gap-2 text-white/90">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Quality Products</span>
                </div>
              </div>
              
              {/* CTA Button */}
              <Link 
                to="/shop" 
                className="group inline-flex items-center gap-3 bg-white text-slate-900 px-12 py-5 rounded-full text-xl font-semibold hover:bg-indigo-50 transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-105"
              >
                Start Shopping
                <svg 
                  className="w-6 h-6 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}