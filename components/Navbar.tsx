'use client';

import { useState, useEffect } from 'react';
import { FaYoutube, FaHome, FaStar, FaQuestionCircle } from 'react-icons/fa';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-purple-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
              <FaYoutube className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              YT Downloads
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <FaHome />
              <span>Home</span>
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <FaStar />
              <span>Features</span>
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <FaQuestionCircle />
              <span>FAQ</span>
            </button>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => scrollToSection('home')}
              className="p-2 text-gray-300 hover:text-white"
            >
              <FaHome className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
