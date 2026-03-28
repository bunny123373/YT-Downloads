'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useDownload } from '@/hooks/useDownload';

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const HeroSection = dynamic(() => import('@/components/HeroSection'), { ssr: false });
const ResultCard = dynamic(() => import('@/components/ResultCard'), { ssr: false });
const FormatSelector = dynamic(() => import('@/components/FormatSelector'), { ssr: false });
const AudioSelector = dynamic(() => import('@/components/AudioSelector'), { ssr: false });
const Features = dynamic(() => import('@/components/Features'), { ssr: false });
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const Loader = dynamic(() => import('@/components/Loader'), { ssr: false });

export default function Home() {
  const { videoInfo, downloadState, error, analyzeUrl, downloadVideo, downloadAudio, reset } = useDownload();
  const [url, setUrl] = useState('');

  const isLoading = downloadState.status === 'analyzing' || downloadState.status === 'downloading' || downloadState.status === 'converting';

  const handleAnalyze = async (inputUrl: string) => {
    setUrl(inputUrl);
    await analyzeUrl(inputUrl);
  };

  const handleReset = () => {
    setUrl('');
    reset();
  };

  return (
    <main className="min-h-screen bg-dark-950">
      <Navbar />
      
      <HeroSection onAnalyze={handleAnalyze} isLoading={downloadState.status === 'analyzing'} />

      {isLoading && (
        <section className="py-8 sm:py-12 px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-4 sm:p-8">
              <Loader message={downloadState.message} />
            </div>
          </div>
        </section>
      )}

      {error && (
        <section className="py-8 sm:py-12 px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-4 sm:p-6 lg:p-8 border-red-500/30">
              <p className="text-red-400 text-center text-sm sm:text-base">{error}</p>
              <button
                onClick={handleReset}
                className="mt-4 mx-auto block px-4 sm:px-6 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg text-white transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      )}

      {videoInfo && !isLoading && (
        <section className="py-8 sm:py-12 px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <ResultCard video={videoInfo} />
            
            <FormatSelector
              video={videoInfo}
              onSelectFormat={downloadVideo}
              isLoading={downloadState.status === 'downloading'}
            />
            
            <AudioSelector
              video={videoInfo}
              onSelectBitrate={downloadAudio}
              isLoading={downloadState.status === 'converting'}
            />

            <div className="mt-6 sm:mt-8 text-center">
              <button
                onClick={handleReset}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-dark-800 hover:bg-dark-700 border border-white/10 rounded-xl text-white transition-colors"
              >
                Download Another
              </button>
            </div>
          </div>
        </section>
      )}

      {downloadState.status === 'complete' && (
        <section className="py-8 sm:py-12 px-3 sm:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass rounded-2xl p-4 sm:p-6 lg:p-8 border-green-500/30">
              <p className="text-green-400 text-base sm:text-lg mb-3 sm:mb-4">{downloadState.message}</p>
              <button
                onClick={handleReset}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-white transition-colors"
              >
                Download Another
              </button>
            </div>
          </div>
        </section>
      )}

      <Features />
      <FAQ />
      <Footer />
    </main>
  );
}
