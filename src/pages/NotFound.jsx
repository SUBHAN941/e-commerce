import React from "react";
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        <p className="text-4xl mt-6">Page Not Found</p>
        <a href="/" className="mt-8 inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-indigo-700">
          Go Home
        </a>
      </div>
    </div>
  );
}