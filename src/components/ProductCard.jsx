import { useCart } from '../context/CartContext';
import React from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-indigo-200">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-slate-50 aspect-square">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Quick View Badge */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <svg 
              className="w-5 h-5 text-slate-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Product Name */}
        <h3 className="font-semibold text-xl mb-3 text-slate-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Price Section */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-3xl font-bold text-slate-900">
              ${product.price}
            </p>
            <p className="text-sm text-slate-500 mt-1">Free shipping</p>
          </div>
          
          {/* Rating Stars (decorative) */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                className="w-4 h-4 text-amber-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="group/btn w-full bg-slate-900 hover:bg-indigo-600 text-white py-3.5 px-6 rounded-xl transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 flex items-center justify-center gap-2"
        >
          <svg 
            className="w-5 h-5 group-hover/btn:scale-110 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}