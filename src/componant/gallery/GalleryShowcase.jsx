"use client";

import React, { useState, Fragment, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, Transition, TransitionChild, DialogPanel } from '@headlessui/react';
import { X, ChevronLeft, ChevronRight, Images as ImagesIcon } from 'lucide-react';

export default function GalleryShowcase({ albums }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // If no albums exist from the backend, show absolutely nothing (per your request)
  if (!albums || albums.length === 0) return null;

  // When an album is clicked, combine the featured image and bulk images into one seamless array
  const openGallery = (album) => {
    const allImages = [album.featuredImage, ...(album.images || [])].filter(img => img?.url);
    setSelectedAlbum({ ...album, allImages });
    setCurrentIndex(0);
  };

  const closeGallery = () => {
    setSelectedAlbum(null);
    setCurrentIndex(0);
  };

  const nextImage = () => {
    if (!selectedAlbum) return;
    setCurrentIndex((prev) => (prev === selectedAlbum.allImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    if (!selectedAlbum) return;
    setCurrentIndex((prev) => (prev === 0 ? selectedAlbum.allImages.length - 1 : prev - 1));
  };

  // Keyboard navigation for the slider
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedAlbum) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeGallery();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAlbum]);

  return (
    <>
      {/* =========================================
          1. THE MAIN ALBUM GRID (Transparent Glass)
          ========================================= */}
      <section className="container px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {albums.map((album) => (
            <div 
              key={album._id} 
              onClick={() => openGallery(album)}
              className="group cursor-pointer flex flex-col gap-4"
            >
              {/* Image Frame - Must have 'relative' for the fill prop to work */}
              <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-slate-200/50 bg-white/20 backdrop-blur-sm shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:border-secondary/50">
                <Image 
                  src={album.featuredImage?.url || "https://dummyimage.com/800x600/e2e8f0/475569"} 
                  alt={album.featuredImage?.alt || album.categoryName}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Photo Count Overlay */}
                <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ImagesIcon size={14} className="text-secondary" /> 
                  {(album.images?.length || 0) + 1} Photos
                </div>

                {/* Subtle dark gradient at bottom for contrast */}
                <div className="absolute inset-0 bg-linear-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-2xl font-black text-primary transition-colors group-hover:text-secondary">
                  {album.categoryName}
                </h3>
                {album.description && (
                  <p className="text-slate-500 font-medium mt-1 line-clamp-2">
                    {album.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          2. THE CINEMATIC POPUP SLIDER
          ========================================= */}
      <Transition show={!!selectedAlbum} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeGallery}>
          
          {/* Heavy Glass Backdrop */}
          <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-primary/95 backdrop-blur-2xl transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-between pt-6 pb-8">
              
              {/* Top Header Bar */}
              <div className="container px-6 flex justify-between items-center shrink-0">
                <div>
                  <DialogTitle className="text-2xl font-black text-white">
                    {selectedAlbum?.categoryName}
                  </DialogTitle>
                  <p className="text-secondary font-bold text-sm tracking-widest uppercase mt-1">
                    Image {currentIndex + 1} of {selectedAlbum?.allImages?.length}
                  </p>
                </div>
                <button onClick={closeGallery} className="p-3 bg-white/10 hover:bg-secondary text-white rounded-full transition-colors outline-none">
                  <X size={24} />
                </button>
              </div>

              {/* Main Image Stage */}
              <div className="flex-1 relative flex items-center justify-center container px-6 mt-4 mb-8">
                
                {/* Left Arrow */}
                <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-6 z-10 p-4 bg-white/5 hover:bg-secondary text-white rounded-full backdrop-blur-md border border-white/10 transition-all outline-none hidden md:block">
                  <ChevronLeft size={32} />
                </button>

                {/* The Image */}
                {selectedAlbum?.allImages?.[currentIndex]?.url && (
                  <div className="relative w-full max-w-5xl aspect-video md:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/50">
                    <Image 
                      src={selectedAlbum.allImages[currentIndex].url}
                      alt={selectedAlbum.allImages[currentIndex].alt || "Gallery image"}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                )}

                {/* Right Arrow */}
                <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-6 z-10 p-4 bg-white/5 hover:bg-secondary text-white rounded-full backdrop-blur-md border border-white/10 transition-all outline-none hidden md:block">
                  <ChevronRight size={32} />
                </button>

              </div>

              {/* Bottom Thumbnail Strip */}
              {selectedAlbum?.allImages?.length > 1 && (
                <div className="container px-6 shrink-0">
                  <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-4 snap-x">
                    {selectedAlbum.allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`relative w-24 h-16 shrink-0 rounded-xl overflow-hidden snap-center transition-all duration-300 border-2 outline-none ${currentIndex === idx ? 'border-secondary scale-110 opacity-100 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`}
                      >
                        <Image 
                          src={img.url} 
                          alt="Thumbnail" 
                          fill
                          sizes="96px"
                          className="object-cover" 
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}