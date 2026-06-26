import React from 'react';
import Image from 'next/image';

// Replace this with your API fetch later
const dummyVideos = [
  { id: 1, thumb: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop', title: 'Client Testimonial: Mumbai to Delhi', duration: '2:45' },
  { id: 2, thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', title: 'Behind the Scenes: Proper Wrapping', duration: '1:30' },
  { id: 3, thumb: 'https://images.unsplash.com/photo-1586528116311-ad8ed7a64a2a?q=80&w=800&auto=format&fit=crop', title: 'Our Fleet Loading Process', duration: '3:15' },
];

export default function VideoGalleryPage() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-stone-600 mb-4">Video Gallery</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">Watch our crew in action and hear directly from our happy clients.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyVideos.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              
              {/* Thumbnail Container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-700 mb-4 bg-slate-800">
                <Image 
                  src={video.thumb} 
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Dark Overlay for Video Effect */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                
                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-stone-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs text-stone-600 font-medium">
                  {video.duration}
                </div>
              </div>

              {/* Video Title below thumbnail */}
              <h3 className="text-lg font-bold text-stone-600 group-hover:text-[#22c55e] transition-colors line-clamp-2">
                {video.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}