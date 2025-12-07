import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';
export default function AdminLogin() {
  const [email, setEmail] = useState('admin@quickshop.com');
  const [password, setPassword] = useState('admin123');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email, password
      });
      localStorage.setItem('token', res.data.token);
      if (res.data.role === 'admin') {
        navigate('/admin');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-lg font-bold hover:bg-indigo-700 transition"
          >
            Login as Admin
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Default: admin@quickshop.com / admin123
        </p>
      </div>
    </div>
  );
}