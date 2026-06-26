import React from 'react';
import Link from 'next/link';
import { PackageOpen } from 'lucide-react'; 

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Decorative Blobs - Updated to Theme Colors */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-[80px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-[80px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

      {/* Strict container rule applied */}
      <div className="container px-4 max-w-7xl mx-auto relative z-10 text-center">
        
        <div className="max-w-2xl mx-auto">
          
          {/* Mischievous Animated Graphic (The Dropped Box) */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Bouncing open package representing a lost item */}
              <PackageOpen className="w-24 h-24 text-secondary animate-bounce drop-shadow-lg" strokeWidth={1.5} />
              {/* Fake shadow underneath the bouncing box */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-2 bg-black/10 rounded-[100%] blur-sm"></div>
            </div>
          </div>

          {/* The 404 Text - Updated to Navy/Gold Gradient */}
          <div className="mb-6">
            <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-sm">
              404
            </h1>
          </div>

          {/* The clever copy */}
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-4 tracking-tight">
            Looks like this page got relocated.
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed mb-10">
            We are experts at safely moving houses and offices... but someone definitely dropped the box containing this URL. It might have been lost in transit.
          </p>

          {/* Action Buttons - Themed strictly to Primary (Navy) and Secondary (Gold) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="px-8 py-4 bg-secondary hover:bg-[#b08d4a] text-white font-bold rounded-xl transition-all shadow-xl shadow-secondary/20 text-lg"
            >
              &larr; Back to Homepage
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white border-2 border-gray-200 hover:border-primary hover:text-primary text-gray-500 font-bold rounded-xl transition-all text-lg"
            >
              Contact Support
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}