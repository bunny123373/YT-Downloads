'use client';

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    question: 'Is YT Downloads free to use?',
    answer: 'Yes, YT Downloads is completely free to use. There are no hidden fees or subscription requirements. You can download as many videos as you want without paying anything.',
  },
  {
    question: 'What video quality options are available?',
    answer: 'We support multiple quality options including 360p, 480p, 720p (HD), and 1080p (Full HD). The available qualities depend on the original video upload.',
  },
  {
    question: 'Can I convert YouTube videos to MP3?',
    answer: 'Absolutely! You can convert any YouTube video to MP3 format with options for 128kbps, 192kbps, or 320kbps quality.',
  },
  {
    question: 'Is it legal to download YouTube videos?',
    answer: 'Downloading videos for personal use may be permitted under YouTube\'s terms of service. Please ensure you have the right to download content and respect copyright laws in your country.',
  },
  {
    question: 'Do I need to install any software?',
    answer: 'No, YT Downloads is a web-based platform. You can access it directly from your browser on any device without installing anything.',
  },
  {
    question: 'Why is my download taking so long?',
    answer: 'Download speed depends on various factors including your internet connection, the video size, and server load. For very long videos, the process naturally takes more time.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-dark-950 relative">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Frequently Asked
            </span>{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-gray-400">
            Got questions? We have answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-dark-900/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-white">{faq.question}</span>
                <FaChevronDown 
                  className={`text-gray-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <p className="px-5 pb-5 text-gray-400 text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
