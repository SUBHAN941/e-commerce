import React from "react";
export default function About() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold mb-10 text-indigo-600">About QuickShop</h1>
        <div className="text-left bg-gray-50 p-10 rounded-2xl shadow-inner">
          <h2 className="text-3xl font-bold mb-6">Tech Stack</h2>
          <ul className="text-lg space-y-4 text-gray-700">
            <li>Frontend: React 18 + Vite + Tailwind CSS</li>
            <li>Backend: Node.js + Express</li>
            <li>Database: MongoDB (Local)</li>
            <li>Auth: JWT + bcrypt</li>
            <li>Admin Panel: Full CRUD for Products</li>
          </ul>
          <p className="text-2xl font-bold text-indigo-600 mt-12">
            You just built a real full-stack e-commerce app!
          </p>
        </div>
      </div>
    </div>
  );
}