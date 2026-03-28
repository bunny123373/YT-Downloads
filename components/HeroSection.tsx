'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaYoutube, FaPaste, FaSearch, FaTimes } from 'react-icons/fa';

interface HeroSectionProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export default function HeroSection({ onAnalyze, isLoading }: HeroSectionProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handlePaste = async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text && isValidUrl(text)) {
          setUrl(text);
        }
      } catch {
        // Clipboard access denied
      }
    };

    const handlePasteEvent = (e: ClipboardEvent) => {
      const text = e.clipboardData?.getData('text');
      if (text && isValidUrl(text)) {
        setUrl(text);
      }
    };

    document.addEventListener('paste', handlePasteEvent);
    return () => document.removeEventListener('paste', handlePasteEvent);
  }, []);

  const isValidUrl = (text: string) => {
    return text.includes('youtube.com') || text.includes('youtu.be');
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setError('');
      }
    } catch {
      setError('Could not access clipboard');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }
    if (!isValidUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    setError('');
    onAnalyze(url);
  };

  const clearInput = () => {
    setUrl('');
    setError('');
  };

  return (
    <section id="home" className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-dark-950">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-dark-950 to-blue-900/30" />
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/20 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,dark-950_100%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300 mb-6 sm:mb-8">
          <FaYoutube className="text-red-500" />
          <span>Best YouTube Downloader</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Download Video and Audio
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Instantly
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
          Fast premium downloader built for modern users. Convert YouTube videos to MP3 or download in HD quality.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-2">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-dark-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <button
                type="button"
                onClick={handlePaste}
                className="flex items-center justify-center gap-2 px-4 py-3 sm:py-4 text-gray-400 hover:text-white transition-colors border-b sm:border-b-0 sm:border-r border-white/10"
              >
                <FaPaste className="text-lg" />
                <span className="hidden sm:inline">Paste</span>
              </button>

              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError('');
                }}
                placeholder="Paste YouTube URL here..."
                className="flex-1 bg-transparent text-white px-4 py-3 sm:py-4 outline-none placeholder:text-gray-500 min-w-0"
              />

              {url && (
                <button
                  type="button"
                  onClick={clearInput}
                  className="p-2 text-gray-400 hover:text-white transition-colors absolute right-24 sm:relative sm:right-auto"
                >
                  <FaTimes />
                </button>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <FaSearch />
                    <span>Analyze</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-red-400 text-sm">{error}</p>
          )}
        </form>

        <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
          <span className="flex items-center gap-1.5 sm:gap-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Free to use
          </span>
          <span className="flex items-center gap-1.5 sm:gap-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            No registration
          </span>
          <span className="flex items-center gap-1.5 sm:gap-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Fast downloads
          </span>
        </div>
      </div>
    </section>
  );
}
