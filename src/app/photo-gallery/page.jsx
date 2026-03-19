import React from 'react';
import Image from 'next/image';

// Replace this with your API fetch later
const dummyPhotos = [
  { id: 1, src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', title: 'Home Shifting in Salt Lake' },
  { id: 2, src: 'https://images.unsplash.com/photo-1586528116311-ad8ed7a64a2a?q=80&w=800&auto=format&fit=crop', title: 'Warehouse Loading' },
  { id: 3, src: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop', title: 'Factory Machinery Move' },
  { id: 4, src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop', title: 'Luxury Car Transport' },
  { id: 5, src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', title: 'Corporate IT Relocation' },
  { id: 6, src: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?q=80&w=800&auto=format&fit=crop', title: 'Antique Safe Handling' },
];

export default function PhotoGalleryPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Our Work in Action</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">A visual journey of our fleet, crew, and successful relocations across India.</p>
        </div>

        {/* CSS Grid for Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyPhotos.map((photo) => (
            <div key={photo.id} className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white cursor-pointer">
              <Image 
                src={photo.src} 
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {photo.title}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}