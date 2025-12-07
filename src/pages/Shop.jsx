import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Add to Cart Function
  const addToCart = async (productId) => {
    if (!token) {
      setMessage('Please login to add items to cart!');
      setTimeout(() => setMessage(''), 3000);
      navigate('/login');
      return;
    }

    try {
      const res = await api.post('/cart/add', { productId });
      setMessage('Added to cart!');
      setTimeout(() => setMessage(''), 3000);
      console.log('Cart updated:', res.data);
    } catch (err) {
      setMessage('Failed to add to cart');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Loading Products</h2>
          <p className="text-slate-600">Please wait while we fetch the latest items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 mb-6">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-sm font-semibold text-slate-700">Premium Collection</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
              Shop All Products
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Discover our curated collection of {products.length} premium {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-2xl text-white font-semibold text-base z-50 shadow-2xl transition-all backdrop-blur-sm flex items-center gap-3 ${
            message.includes('Added') 
              ? 'bg-gradient-to-r from-green-600 to-green-700' 
              : message.includes('login')
              ? 'bg-gradient-to-r from-amber-600 to-amber-700'
              : 'bg-gradient-to-r from-red-600 to-red-700'
          }`}>
            {message.includes('Added') ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : message.includes('login') ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {message}
          </div>
        )}

        {/* No Products State */}
        {products.length === 0 ? (
          <div className="text-center py-20 md:py-32">
            <div className="bg-white rounded-3xl shadow-xl border-2 border-dashed border-slate-300 w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-8 flex items-center justify-center">
              <svg className="w-24 h-24 sm:w-32 sm:h-32 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">No Products Available</h2>
            <p className="text-lg md:text-xl text-slate-600 mb-8">Our collection is being updated. Check back soon!</p>
            <div className="inline-flex items-center gap-2 text-indigo-600 font-medium">
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refreshing inventory</span>
            </div>
          </div>
        ) : (

          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-indigo-200 hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-slate-50 aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    ${product.price}
                  </div>

                  {/* Quick View Icon */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  {product.description && (
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                    <span className="text-xs text-slate-500 ml-2">(5.0)</span>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product._id)}
                    className="group/btn w-full bg-slate-900 hover:bg-indigo-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 flex items-center justify-center gap-2"
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}