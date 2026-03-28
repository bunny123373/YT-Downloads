'use client';

import { FaYoutube, FaGithub, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-white/5 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaYoutube className="text-xl sm:text-2xl text-red-500" />
              <span className="text-lg sm:text-xl font-bold text-white">YT Downloads</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">
              Fast and reliable YouTube video and audio downloader. Convert your favorite videos to MP3 or download in HD quality.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-1 sm:space-y-2 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-purple-400 transition-colors">Features</a></li>
              <li><a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Connect</h4>
            <div className="flex gap-3 sm:gap-4">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-700 transition-colors">
                <FaGithub />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-700 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-dark-800 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-dark-700 transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-white/5">
          <p className="text-center text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} YT Downloads. All rights reserved.
          </p>
          <p className="text-center text-gray-600 text-xs mt-2 px-2">
            This service is for educational purposes only. Please respect copyright laws and YouTube&apos;s terms of service.
          </p>
        </div>
      </div>
    </footer>
  );
}
