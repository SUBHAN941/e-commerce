import { useCart } from '../context/CartContext';
import React from 'react';

export default function CartSidebar({ isOpen, onClose }) {
  const { cart, removeFromCart, cartTotal } = useCart();

  return (
    <>
      {/* Overlay with Animation */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <p className="text-sm text-indigo-200">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20"
            >
              <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 h-[calc(100vh-250px)]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="bg-slate-100 rounded-full p-8 mb-6">
                <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h3>
              <p className="text-slate-600 mb-6">Add some products to get started!</p>
              <button 
                onClick={onClose}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div 
                  key={item.id} 
                  className="group flex gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-300 border border-slate-200"
                >
                  {/* Product Image */}
                  <div className="relative flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow" 
                    />
                    <div className="absolute -top-2 -left-2 bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                      {item.quantity}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-slate-600">${item.price}</span>
                      <span className="text-slate-400">×</span>
                      <span className="text-slate-600">{item.quantity}</span>
                    </div>
                    <p className="text-lg font-bold text-indigo-600 mt-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="group/btn flex-shrink-0 self-start p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove from cart"
                  >
                    <svg className="w-5 h-5 text-slate-400 group-hover/btn:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Total & Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-slate-200 bg-white p-6 shadow-lg">
            {/* Subtotal */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold">${cartTotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <div className="text-right">
                  <span className="text-3xl font-bold text-indigo-600">${cartTotal}</span>
                  <p className="text-xs text-slate-500">Tax included</p>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="group w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 flex items-center justify-center gap-3">
              <span>Proceed to Checkout</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {/* Continue Shopping Link */}
            <button 
              onClick={onClose}
              className="w-full mt-3 text-slate-600 hover:text-indigo-600 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}