// src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [newProduct, setNewProduct] = useState({
  name: '',
  price: '',
  image: ''
});
  const navigate = useNavigate();
const handleAddProduct = async (e) => {
  e.preventDefault();
  try {
    await api.post('/products', newProduct);
    setNewProduct({ name: '', price: '', image: '' }); // Clear form
    fetchData(); // Refresh products + carts
    alert('Product added successfully!');
  } catch (err) {
    alert('Failed to add product');
  }
};
  const fetchData = async () => {
    try {
      const [prodRes, cartRes] = await Promise.all([
        api.get('/products'),
        api.get('/cart/all')
      ]);
      setProducts(prodRes.data);
      setCarts(cartRes.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin/login');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-indigo-200 text-sm mt-1">Manage your store efficiently</p>
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              className="group flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-red-500/50"
            >
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">Total Products</p>
                <p className="text-4xl font-bold text-slate-900">{products.length}</p>
              </div>
              <div className="bg-indigo-100 rounded-xl p-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">Active Carts</p>
                <p className="text-4xl font-bold text-slate-900">{carts.length}</p>
              </div>
              <div className="bg-green-100 rounded-xl p-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">Total Value</p>
                <p className="text-4xl font-bold text-slate-900">
                  ${carts.reduce((sum, cart) => sum + cart.total, 0).toFixed(2)}
                </p>
              </div>
              <div className="bg-amber-100 rounded-xl p-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`group flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 ${
              activeTab === 'products' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/50' 
                : 'bg-white text-slate-700 shadow-md hover:shadow-lg border border-slate-200'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Products
            <span className={`ml-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
              activeTab === 'products' ? 'bg-white/20' : 'bg-indigo-100 text-indigo-700'
            }`}>
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('carts')}
            className={`group flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 ${
              activeTab === 'carts' 
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/50' 
                : 'bg-white text-slate-700 shadow-md hover:shadow-lg border border-slate-200'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            User Carts
            <span className={`ml-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
              activeTab === 'carts' ? 'bg-white/20' : 'bg-green-100 text-green-700'
            }`}>
              {carts.length}
            </span>
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add Product Form */}
           {/* Add Product Form */}
<div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
  <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-6">
    <div className="flex items-center gap-3">
      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white">Add New Product</h2>
    </div>
  </div>
  <div className="p-8">
    <form onSubmit={handleAddProduct} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
        <input
          type="text"
          required
          value={newProduct.name}
          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="e.g. Wireless Earbuds Pro"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Price ($)</label>
        <input
          type="number"
          step="0.01"
          required
          value={newProduct.price}
          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="49.99"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL</label>
        <input
          type="url"
          required
          value={newProduct.image}
          onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold py-4 rounded-xl hover:from-indigo-700 hover:to-indigo-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
      >
        Add Product
      </button>
    </form>
  </div>
</div>

            {/* Product List */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">All Products</h2>
                </div>
              </div>
              <div className="p-6 max-h-[600px] overflow-y-auto">
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <p className="text-slate-500 text-lg">No products yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {products.map(p => (
                      <div key={p._id} className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300">
                        <div className="relative">
                          <img 
                            src={p.image} 
                            className="w-20 h-20 object-cover rounded-lg shadow-md" 
                            alt={p.name}
                          />
                          <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 rounded-lg transition-colors"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-900 text-lg truncate">{p.name}</h3>
                          <p className="text-indigo-600 font-bold text-xl">${p.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Carts Tab */}
        {activeTab === 'carts' && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">All User Carts</h2>
                </div>
                <div className="text-white text-right">
                  <p className="text-sm opacity-90">Total Revenue</p>
                  <p className="text-2xl font-bold">
                    ${carts.reduce((sum, cart) => sum + cart.total, 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              {carts.length === 0 ? (
                <div className="text-center py-20">
                  <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-500 text-xl font-medium">No active carts</p>
                  <p className="text-slate-400 mt-2">Customer carts will appear here</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {carts.map(cart => (
                    <div key={cart._id} className="border-2 border-green-200 rounded-2xl overflow-hidden hover:border-green-400 transition-colors duration-300">
                      {/* Cart Header */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-5 border-b border-green-200">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-center gap-4">
                            <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                              {cart.user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-slate-900">{cart.user.name}</h3>
                              <p className="text-slate-600 text-sm">{cart.user.email}</p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right">
                            <div className="flex items-center gap-2 mb-1">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="text-3xl font-bold text-green-600">${cart.total.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {new Date(cart.updatedAt).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cart Items */}
                      <div className="p-6 bg-white">
                        <div className="flex items-center gap-2 mb-4">
                          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          <h4 className="font-semibold text-slate-700">Cart Items ({cart.items.length})</h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                          {cart.items.map(item => (
                            <div key={item._id} className="group bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all duration-300">
                              <div className="relative">
                                <img 
                                  src={item.image} 
                                  className="w-full h-32 object-cover" 
                                  alt={item.name}
                                />
                                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  ×{item.quantity}
                                </div>
                              </div>
                              <div className="p-3 text-center">
                                <p className="font-semibold text-sm text-slate-900 truncate mb-1">{item.name}</p>
                                <p className="text-green-600 font-bold">${item.price}</p>
                                <p className="text-xs text-slate-500 mt-1">
                                  Total: ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}