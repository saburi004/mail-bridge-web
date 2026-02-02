"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ user, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getInitials = (email) => {
    return email ? email.charAt(0).toUpperCase() : 'U';
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gradient-to-r from-[#b3cde0] via-[#b2d7e9] to-[#011f4b] shadow-lg'
        : 'bg-gradient-to-r from-[#b3cde0]/90 via-[#b2d7e9]/90 to-[#011f4b]/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-white to-[#b3cde0] rounded-lg flex items-center justify-center">
                <span className="text-[#011f4b] font-bold text-lg">Q</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                QuickMailer
                <span className="text-[#b3cde0] animate-pulse-slow">.</span>
              </span>
              <span className="hidden md:inline text-xs bg-gradient-to-r from-[#b3cde0] to-[#b2d7e9] text-[#011f4b] px-2 py-1 rounded-full font-semibold">
                Lightning Fast
              </span>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/documentation" 
              className="text-white hover:text-[#b3cde0] transition-colors duration-200 font-medium"
            >
              Documentation
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-white to-[#b2d7e9] rounded-full flex items-center justify-center text-[#011f4b] font-bold">
                    {getInitials(user.email)}
                  </div>
                  <span className="text-white text-sm">{user.email}</span>
                  <motion.svg
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1"
                    >
                      {/* <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#b3cde0]/10 hover:text-[#011f4b]"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </Link> */}
                      <button
                        onClick={() => {
                          onLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-[#b3cde0] to-[#b2d7e9] text-[#011f4b] px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white rounded-lg mt-2 py-2"
            >
              <Link
                href="/documentation"
                className="block px-4 py-2 text-gray-700 hover:bg-[#b3cde0]/10"
                onClick={() => setIsDropdownOpen(false)}
              >
                Documentation
              </Link>
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-[#b3cde0]/10"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block px-4 py-2 text-[#011f4b] hover:bg-[#b3cde0]/10"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Login
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}