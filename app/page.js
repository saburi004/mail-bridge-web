"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SpeedAnimation from '@/components/SpeedAnimation';
import { motion } from 'framer-motion';

export default function Landing() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, verify token with backend
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  const [copiedKey, setCopiedKey] = useState(null);

  const generateKey = async () => {
    if (!user) {
      setError("Please login first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/generate-key`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ email: user.email })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate API key");
      }

      // Handle multiple keys
      const currentKeys = user.apiKeys || (user.apiKey ? [user.apiKey] : []);
      const updatedKeys = [...currentKeys, data.apiKey];

      // Update user data
      const updatedUser = { ...user, apiKeys: updatedKeys, apiKey: data.apiKey }; // Keep apiKey for backward compat if needed
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setApiKey(data.apiKey); // Show the new key animation
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  const currentKeys = user ? (user.apiKeys || (user.apiKey ? [user.apiKey] : [])) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011f4b] via-[#0a2a5c] to-[#011f4b]">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b3cde0] via-[#b2d7e9] to-white">
              QuickMailer
            </span>
            <span className="text-[#b2d7e9] animate-pulse">.</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Lightning-fast email API service with MongoDB integration.
            Generate API keys instantly and send emails at scale.
          </p>

          {!user ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="/login"
                className="px-8 py-4 bg-gradient-to-r from-[#b3cde0] to-[#b2d7e9] text-[#011f4b] rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Get Started Free
              </a>
              <a
                href="/documentation"
                className="px-8 py-4 border-2 border-[#b2d7e9] text-white rounded-full font-bold text-lg hover:bg-[#b2d7e9]/10 transition-all duration-300"
              >
                View Documentation
              </a>
            </motion.div>
          ) : null}
        </motion.div>

        {/* Speed Animation */}
        <SpeedAnimation />

        {/* API Key Generator (Only for logged in users) */}
        {user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mt-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Manage API Keys
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b2d7e9] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-gray-300">
                  Keys: {currentKeys.length} / 5
                </p>
              </div>

              <button
                onClick={generateKey}
                disabled={loading || currentKeys.length >= 5}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${loading || currentKeys.length >= 5
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:shadow-2xl hover:scale-[1.02]'
                  } ${currentKeys.length >= 5
                    ? 'bg-gray-600 text-gray-300'
                    : 'bg-gradient-to-r from-[#b3cde0] to-[#b2d7e9] text-[#011f4b]'
                  }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-[#011f4b]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </span>
                ) : currentKeys.length >= 5 ? 'Limit Reached (5 Keys)' : 'Generate New API Key'}
              </button>

              {/* List of Keys */}
              {currentKeys.length > 0 && (
                <div className="space-y-4 mt-6">
                  {currentKeys.map((key, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 bg-gradient-to-r from-[#011f4b] to-[#0a2a5c] rounded-xl border border-[#b2d7e9]/30 flex flex-col sm:flex-row justify-between items-center gap-4"
                    >
                      <code className="block p-3 bg-black/50 rounded-lg text-[#b2d7e9] font-mono text-sm overflow-x-auto w-full sm:w-auto flex-1">
                        {key}
                      </code>
                      <div className="flex items-center gap-2">
                        {copiedKey === key && (
                          <span className="text-green-400 text-sm font-medium">Copied!</span>
                        )}
                        <button
                          onClick={() => handleCopy(key)}
                          className="p-2 bg-[#b2d7e9] text-[#011f4b] rounded hover:bg-[#b3cde0] transition-colors"
                          title="Copy to clipboard"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  <p className="mt-4 text-amber-300 flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Save these keys. They are stored locally.
                  </p>
                </div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-red-900/30 border border-red-700 rounded-lg"
                >
                  <p className="text-red-400 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}