"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function Documentation() {
  const [user, setUser] = useState(null);

  // Check for user on mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011f4b] via-[#0a2a5c] to-[#011f4b]">
      <Navbar user={user} onLogout={handleLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            QuickMailer Documentation
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Learn how to integrate and use our lightning-fast email API
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - Table of Contents */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Contents</h3>
              <ul className="space-y-3">
                {['Getting Started', 'Authentication', 'API Endpoints', 'Rate Limits', 'Examples', 'Troubleshooting'].map((item, index) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-300 hover:text-[#b2d7e9] transition-colors flex items-center"
                    >
                      <span className="w-2 h-2 bg-[#b2d7e9] rounded-full mr-3"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {[
              {
                id: 'getting-started',
                title: 'Getting Started',
                content: 'QuickMailer provides a simple REST API for sending transactional emails. Get your API key from the dashboard and start sending emails in minutes.'
              },
              {
                id: 'authentication',
                title: 'Authentication',
                content: 'All API requests require authentication using your API key. Include it in the Authorization header as Bearer token.'
              },
              {
                id: 'api-endpoints',
                title: 'API Endpoints',
                content: 'Send emails via POST /send, check status via GET /status/{id}, and manage templates via our template endpoints.'
              },
              {
                id: 'rate-limits',
                title: 'Rate Limits',
                content: 'Free tier: 100 emails/hour. Pro tier: 10,000 emails/hour. Enterprise: Custom limits available.'
              },
              {
                id: 'examples',
                title: 'Examples',
                content: 'Check our GitHub repository for complete examples in Node.js, Python, Ruby, and PHP.'
              },
              {
                id: 'troubleshooting',
                title: 'Troubleshooting',
                content: 'Common issues and their solutions. Contact support if you need further assistance.'
              }
            ].map((section, index) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/20"
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-300">
                  {section.content}
                </p>
                {section.id === 'authentication' && (
                  <div className="mt-6 p-4 bg-black/30 rounded-lg">
                    <code className="text-sm text-[#b2d7e9]">
                      curl -X POST https://api.quickmailer.com/send \<br />
                      &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY" \<br />
                      &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
                      &nbsp;&nbsp;-d '{"{"}"to": "recipient@example.com", "subject": "Hello", "body": "Test email"{"}"}'
                    </code>
                  </div>
                )}
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}