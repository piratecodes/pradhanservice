import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Map, Award } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="container px-4 relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* LEFT CONTENT AREA */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Top Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 text-secondary rounded-full w-max font-bold text-xs uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            India&apos;s Trusted Movers
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-tight tracking-tight">
            Hassle-free, Safe & <span className="text-secondary italic">Premium Relocation</span>
          </h2>

          {/* Paragraphs with fixed apostrophes and corrected branding */}
          <div className="flex flex-col gap-5 text-gray-500 text-lg font-medium leading-relaxed">
            <p>
              Whether you are moving across the street or across the country, the demand for reliable, secure logistics is at an all-time high. It houses the world&apos;s biggest challenges, but we make it simple.
            </p>
            <p>
              From lavish city apartments to massive corporate offices, Pradhan Packers & Movers offers bespoke, premium relocation services tailored entirely to your timeline and inventory.
            </p>
          </div>

          {/* Stats / Trust Badges Area - Upgraded to Premium Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 mt-2">
            
            {/* Stat Card 1 */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:border-secondary/30 transition-colors">
              <ShieldCheck className="w-6 h-6 text-secondary" />
              <div>
                <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-0.5">One Platform</span>
                <span className="block text-primary font-black text-lg">5+ Services</span>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:border-secondary/30 transition-colors">
              <Map className="w-6 h-6 text-secondary" />
              <div>
                <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-0.5">Total Moves</span>
                <span className="block text-primary font-black text-lg">5000+ </span>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-2 p-4 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:border-secondary/30 transition-colors">
              <Award className="w-6 h-6 text-secondary" />
              <div>
                <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-0.5">Happy Clients</span>
                <span className="block text-primary font-black text-lg">2500+</span>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE AREA */}
        <div className="flex-1 w-full mt-10 lg:mt-0 relative">
          
          {/* Design Upgrade: Decorative Background Accent */}
          <div className="absolute -inset-4 md:-inset-6 bg-secondary/10 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
          
          <figure className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 border-4 border-white">
            {/* Strict Image Sizing Rule Applied */}
            <Image 
              src="https://dummyimage.com/800x600/112440/c5a059&text=Pradhan+Packers" 
              alt="Safe and Premium Relocation Services" 
              height={0} 
              width={0} 
              sizes="100vw"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </figure>
          
          {/* Design Upgrade: Floating Badge over the image */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-gray-100 font-black text-xl">
                45+
              </div>
              <div>
                <p className="text-primary font-black leading-tight">Years of<br/>Experience</p>
              </div>
          </div>

        </div>

      </div>
    </section>
  );
}