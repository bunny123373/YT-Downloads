'use client';

import { FaYoutube, FaGithub, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaYoutube className="text-2xl text-red-500" />
              <span className="text-xl font-bold text-white">YT Downloads</span>
            </div>
            <p className="text-gray-400 text-sm">
              Fast and reliable YouTube video and audio downloader. Convert your favorite videos to MP3 or download in HD quality.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-purple-400 transition-colors">Features</a></li>
              <li><a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-700 transition-colors">
                <FaGithub />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-700 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-dark-700 transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} YT Downloads. All rights reserved.
          </p>
          <p className="text-center text-gray-600 text-xs mt-2">
            This service is for educational purposes only. Please respect copyright laws and YouTube's terms of service.
          </p>
        </div>
      </div>
    </footer>
  );
}
