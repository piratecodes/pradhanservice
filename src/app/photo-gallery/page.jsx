import React from 'react';
import GalleryShowcase from '@/componant/gallery/GalleryShowcase';

// 🌟 SEO METADATA
export const metadata = {
  title: 'Photo Gallery | Pradhan Services',
  description: 'Explore our latest relocation, packing, and transportation projects.',
  keywords: ['gallery', 'relocation photos', 'packers and movers images', 'portfolio'],
};

// 🌟 SERVER-SIDE FETCHING
async function getGalleries() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`, { 
      next: { revalidate: 3600 } // Caches for 1 hour for extreme speed
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data?.galleries || [];
  } catch (error) {
    return [];
  }
}

export default async function PhotoGalleryPage() {
  const albums = await getGalleries();

  return (
    <main className="min-h-screen w-full pt-24 pb-32">
      <div className="container px-6 mb-16">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-center text-primary tracking-tight mb-4">
          Our <span className="text-secondary italic font-serif">Gallery</span>
        </h1>
        <p className="mx-auto text-center text-lg font-medium text-slate-500 max-w-2xl">
          A visual journey through our recent relocations, secure packaging, and successful transit operations.
        </p>
      </div>

      {/* 🌟 PASS DATA TO CLIENT INTERACTIVE COMPONENT 🌟 */}
      <GalleryShowcase albums={albums} />
    </main>
  );
}