'use client';

import { FaBolt, FaFilm, FaMusic, FaMobileAlt } from 'react-icons/fa';

const features = [
  {
    icon: FaBolt,
    title: 'Fast Downloads',
    description: 'Lightning-fast download speeds with optimized servers for the best experience.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: FaFilm,
    title: 'Quality Selection',
    description: 'Choose from multiple quality options including Full HD, HD, and SD.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: FaMusic,
    title: 'MP3 Conversion',
    description: 'Convert any video to high-quality MP3 with bitrates up to 320kbps.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FaMobileAlt,
    title: 'Mobile Support',
    description: 'Works perfectly on all devices - desktop, tablet, and mobile phones.',
    gradient: 'from-green-500 to-emerald-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-950">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[96px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[96px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Why Choose
            </span>{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              YT Downloads
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Experience the best YouTube downloading platform with premium features designed for modern users.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-4 sm:p-6 bg-dark-900/50 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-3 sm:mb-4 shadow-lg`}>
                <feature.icon className="text-white text-lg sm:text-xl" />
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
