// src/pages/Login.jsx
import { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import React from 'react';
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      let res;
      if (isLogin) {
        res = await api.post('/auth/login', {
          email: form.email,
          password: form.password
        });
      } else {
        res = await api.post('/auth/register', {
          name: form.name,
          email: form.email,
          password: form.password
        });
      }

      // Save token
      localStorage.setItem('token', res.data.token);
      setMessage(isLogin ? 'Login successful!' : 'Account created! Welcome!');

      // Redirect to shop after 1 second
      setTimeout(() => {
        navigate('/shop');
      }, 1000);

    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-700">QuickShop</h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Welcome back!' : 'Join us today!'}
          </p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`text-center p-4 rounded-lg mb-6 font-bold text-lg ${
            message.includes('success') || message.includes('Welcome') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:outline-none text-lg"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:outline-none text-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:outline-none text-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-5 rounded-xl text-xl hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        {/* Toggle */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage('');
                setForm({ name: '', email: '', password: '' });
              }}
              className="ml-2 text-indigo-600 font-bold hover:underline"
            >
              {isLogin ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>

        {/* Admin Link */}
        <div className="text-center mt-6 pt-6 border-t">
          <a href="/admin/login" className="text-sm text-gray-500 hover:text-indigo-600">
            Admin Login →
          </a>
        </div>
      </div>
    </div>
  );
}