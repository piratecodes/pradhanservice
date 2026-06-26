"use client";

import React from 'react';
import Image from 'next/image';
import { Truck, Navigation, PackageCheck, Repeat } from 'lucide-react';

export default function BestMovers({ cityName }) {
  const displayCity = cityName || 'Your City';

  const highlights = [
    { icon: <PackageCheck size={18} />, text: `House shifting within ${displayCity}` },
    { icon: <Truck size={18} />, text: 'Office relocations for zero downtime' },
    { icon: <Navigation size={18} />, text: 'Vehicle & furniture logistics' },
    { icon: <Repeat size={18} />, text: 'Intercity relocation specialists' }
  ];

  return (
    <section className="container px-4 py-20 lg:py-32 relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Side: Visual Anchor with Fixed Image Pattern */}
        <div className="w-full lg:w-1/2 relative">
          <div className="absolute top-10 -left-10 w-full h-full border-2 border-secondary/20 rounded-[3rem] -z-10 hidden lg:block"></div>
          
          <div className="relative w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-50">
            <Image 
              src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=800&auto=format&fit=crop" 
              alt={`Premium Moving Fleet in ${displayCity}`}
              // Applying your specific Image property requirements
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }} 
              className="hover:scale-105 transition-transform duration-700"
            />
            
            {/* Floating Trust Card */}
            <div className="absolute bottom-6 right-6 bg-primary p-6 rounded-[2rem] text-white shadow-2xl max-w-[180px]">
               <p className="text-secondary font-black text-3xl mb-1">24/7</p>
               <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 leading-tight">
                 Support across {displayCity}
               </p>
            </div>
          </div>
        </div>

        {/* Right Side: Narrative Content */}
        <div className="w-full lg:w-1/2 space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 text-secondary rounded-full font-bold text-xs uppercase tracking-widest">
               Local Operations
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight tracking-tight">
              The Best Packers Near You in <span className="text-secondary italic">{displayCity}</span>
            </h2>
            <div className="space-y-6 text-gray-500 text-lg font-medium leading-relaxed">
              <p>
                In a city that moves as fast as {displayCity}, your relocation needs to be the cleanest part of your transition. We specialize in bringing order to moving days that could otherwise feel chaotic.
              </p>
              <p>
                Our crews are trained for specific urban challenges—from basement ramps to strict society gates. We work in a steady rhythm to ensure your goods move once, correctly.
              </p>
            </div>
          </div>

          {/* Service Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <span className="text-primary font-bold text-sm leading-tight">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}