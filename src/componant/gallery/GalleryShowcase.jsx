"use client";

import React, { useState, Fragment, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { X, Images as ImagesIcon } from 'lucide-react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; 

export default function GalleryShowcase({ albums }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  
  const mainRef = useRef(null);
  const thumbsRef = useRef(null);

  useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, [selectedAlbum]);

  if (!albums || albums.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-6">
        <div className="relative">
          <div className="absolute inset-0 bg-secondary/30 animate-ping rounded-full blur-xl"></div>
          <ImagesIcon size={80} className="text-slate-300 relative z-10 animate-bounce" />
        </div>
        <h3 className="text-3xl font-black text-primary mt-8 mb-3">No Photos Available</h3>
        <p className="text-slate-500 font-medium text-center max-w-md">
          We are currently updating our gallery. Check back soon to see our latest successful projects!
        </p>
      </div>
    );
  }

  const openGallery = (album) => {
    const allImages = [album.featuredImage, ...(album.images || [])].filter(img => img?.url);
    setSelectedAlbum({ ...album, allImages });
  };

  return (
    <>
      <section className="container px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {albums.map((album) => (
            <div 
              key={album._id} 
              onClick={() => openGallery(album)}
              className="group cursor-pointer flex flex-col gap-4"
            >
              <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-slate-200/50 bg-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:border-secondary/50">
                {/* 🌟 FIX 1: Reverted to width/height 0, added w-full h-full */}
                <Image 
                  src={album.featuredImage?.url || "https://dummyimage.com/800x600/e2e8f0/475569"} 
                  alt={album.featuredImage?.alt || album.categoryName}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ImagesIcon size={14} className="text-secondary" /> 
                  {(album.images?.length || 0) + 1} Photos
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
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

      <Transition show={!!selectedAlbum} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setSelectedAlbum(null)}>
          
          {/* 🌟 FIX 2: Tailwind v4 Glassmorphic Gradient */}
          <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gradient-to-br from-slate-950/80 to-secondary/20 backdrop-blur-2xl transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 flex flex-col h-full max-w-7xl mx-auto px-4 py-6">
              
              <div className="flex justify-between items-start shrink-0 mb-6 px-2">
                <div>
                  <DialogTitle className="text-2xl md:text-3xl font-black text-white drop-shadow-md">
                    {selectedAlbum?.categoryName}
                  </DialogTitle>
                  <p className="text-secondary font-bold text-sm tracking-widest uppercase mt-1 drop-shadow-md">
                    {selectedAlbum?.allImages?.length || 0} Photos
                  </p>
                </div>
                <button onClick={() => setSelectedAlbum(null)} className="p-3 bg-white/10 hover:bg-secondary text-white rounded-full transition-colors outline-none backdrop-blur-md shadow-lg border border-white/10">
                  <X size={24} />
                </button>
              </div>

              {/* Glassmorphic Frame for Main Slider */}
              <div className="flex-1 min-h-0 relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-lg">
                <Splide
                  ref={mainRef}
                  options={{
                    type: 'fade', 
                    rewind: true,
                    pagination: false,
                    arrows: true,
                    drag: true, 
                    height: '100%',
                    width: '100%',
                  }}
                  className="h-full w-full custom-splide-arrows"
                >
                  {selectedAlbum?.allImages?.map((img, idx) => (
                    <SplideSlide key={idx} className="!h-full w-full">
                      <div className="absolute inset-0 p-2 md:p-8 flex items-center justify-center">
                        {/* 🌟 FIX 1: Width/Height 0 combined with w-full h-full */}
                        <Image 
                          src={img.url}
                          alt={img.alt || "Gallery image"}
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-full h-full object-contain drop-shadow-2xl"
                          priority={idx === 0} 
                          unoptimized 
                        />
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              </div>

              {/* THUMBNAILS SPLIDE CAROUSEL */}
              {selectedAlbum?.allImages?.length > 1 && (
                <div className="h-24 mt-6 shrink-0 px-8">
                  <Splide
                    ref={thumbsRef}
                    options={{
                      fixedWidth: 100,
                      fixedHeight: 64,
                      isNavigation: true, 
                      gap: 12,
                      focus: 'center',
                      pagination: false,
                      cover: true,
                      arrows: false,
                      dragMinThreshold: { mouse: 4, touch: 10 },
                      breakpoints: {
                        640: { fixedWidth: 80, fixedHeight: 52, gap: 8 },
                      }
                    }}
                  >
                    {selectedAlbum?.allImages.map((img, idx) => (
                      
                      <SplideSlide key={idx} className="rounded-xl overflow-hidden border-2 border-transparent transition-all is-active:border-secondary cursor-pointer shadow-lg">
                        <Image 
                          src={img.url} 
                          alt="Thumbnail" 
                          width={0}
                          height={0}
                          sizes="100px"
                          className="w-full h-full object-cover" 
                          unoptimized 
                        />
                      </SplideSlide>
                    ))}
                  </Splide>
                </div>
              )}

            </div>
          </div>
        </Dialog>
      </Transition>

      <style jsx global>{`
        .custom-splide-arrows .splide__arrow {
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(12px);
          width: 3.5rem !important;
          height: 3.5rem !important;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .custom-splide-arrows .splide__arrow:hover {
          background: #c5a059 !important; 
          transform: scale(1.1);
        }
        .custom-splide-arrows .splide__arrow svg {
          fill: white !important;
          width: 1.5rem !important;
          height: 1.5rem !important;
        }
      `}</style>
    </>
  );
}