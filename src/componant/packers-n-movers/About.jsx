"use client";

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, ShieldCheck, MapPin, Globe } from 'lucide-react';

export default function CityAbout({ cityName }) {
  const displayCity = cityName || 'Your City';

  return (
    <section className="container px-4 py-20 lg:py-28 relative z-10 border-b border-gray-100">
      
      {/* Top Split Section: Image + Text (Flipped for Z-Pattern) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
        
        {/* Left Column: Image with Decorative Frame */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-secondary/10 rounded-[2.5rem] rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
          <div className="relative h-[450px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border border-white">
            <Image 
              src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=800&auto=format&fit=crop" 
              alt={`Professional Packers and Movers in ${displayCity}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay Badge */}
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-white/20">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-secondary">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Local Expertise</p>
                <p className="text-primary font-bold text-lg leading-none mt-1">{displayCity} Operations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 text-secondary rounded-full font-bold text-xs uppercase tracking-widest">
              Moving In {displayCity}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight tracking-tight">
              A City This Intense Needs A Partner Who <span className="text-secondary italic font-serif">Gets It</span>
            </h2>
          </div>

          <div className="text-gray-500 text-lg font-medium leading-relaxed space-y-6">
            <p>
              {displayCity} does not slow down just because you are shifting. From packed traffic to strict society rules for service lifts and loading hours, moving here is a logistical puzzle. You need more than a truck; you need a team that quietens the chaos.
            </p>
            <p>
              Pradhan Service treats every house like a lived-in story, not a checklist. We plan around your specific fragile items and the layout of your new home, ensuring the relocation feels guided rather than hurried.
            </p>
          </div>

          {/* Bullet List - Themed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Multi-layer fragile packing",
              "Building-specific logistics",
              "Trained high-rise experts",
              "Real-time coordination"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 border border-gray-100 rounded-2xl">
                <CheckCircle2 className="text-secondary shrink-0" size={20} />
                <span className="text-primary font-bold text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Insights */}
      <div className="bg-primary rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden mb-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="max-w-4xl relative z-10">
          <h3 className="text-3xl font-black mb-6 tracking-tight">
            Local Support Across {displayCity}&apos;s Neighbourhoods
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-gray-300 font-medium leading-relaxed">
            <p>
              We know {displayCity} is not one single kind of city. Shifting out of a high-rise in the business district is entirely different from moving in the independent lanes of the suburbs. Our teams are mapped to local pockets so they understand the specific lanes and laws of your area.
            </p>
            <p>
              Whether you are moving between neighbouring suburbs or crossing the city end-to-end, our focus is on timing and safety first, then speed. It&apos;s about being fast without being careless.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Stats / Trust Bar - Settled */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-12 border-t border-gray-100">
        <div className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary border border-gray-100 group-hover:bg-primary group-hover:text-white transition-all">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-2xl font-black text-primary leading-none tracking-tighter">8 Services</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Single Platform</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 group md:border-x border-gray-100 md:px-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary border border-gray-100 group-hover:bg-primary group-hover:text-white transition-all">
            <Globe size={24} />
          </div>
          <div>
            <p className="text-2xl font-black text-primary leading-none tracking-tighter">20+ States</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Pan-India Reach</p>
          </div>
        </div>
      </div>

    </section>
  );
}