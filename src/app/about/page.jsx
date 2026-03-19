"use client";

import React from 'react';
import { Globe, Users, Heart, Zap, ShieldCheck, Share2, History, ArrowRight, Quote } from 'lucide-react';

export default function AboutPage() {
  const dnaPoints = [
    { icon: <Heart size={24} />, title: "Customer First", description: "Your peace of mind is our primary payload." },
    { icon: <Zap size={24} />, title: "Fast & On Time", description: "Precision scheduling for zero-day delays." },
    { icon: <ShieldCheck size={24} />, title: "Accountable", description: "End-to-end ownership of every carton." },
    { icon: <Share2 size={24} />, title: "Connected", description: "Real-time updates across 29+ states." },
  ];

  const stats = [
    { label: "Years of Trust", value: "46+", icon: <History size={16} /> },
    { label: "States Covered", value: "29+", icon: <Globe size={16} /> },
    { label: "Active Leads", value: "4.5k", icon: <Users size={16} /> },
    { label: "Safety Rating", value: "99%", icon: <ShieldCheck size={16} /> }
  ];

  return (
    <main className="min-h-screen">
      
      {/* 1. CREATIVE HERO: The "46-Year" Statement */}
      <section className="relative w-full pt-32 md:pt-48 pb-20 overflow-hidden">
      
      {/* FULL-BLEED GRAFFITI: Scales perfectly with 'vw' units */}
      <div className="absolute top-0 right-0 z-0 pointer-events-none select-none opacity-[0.06] translate-x-1/12 -translate-y-1/3">
        <h2 
          className="text-[45vw] lg:text-[55rem] font-black leading-none tracking-tighter"
          style={{ 
            WebkitTextStroke: '2px #c5a059', 
            color: 'transparent'
          }}
        >
          8
        </h2>
      </div>

      {/* 2. CONTENT CONTAINER (Fixed Width) */}
      <div className="container px-4 relative z-10">
        <div className="max-w-7xl">
          
          {/* Header Area */}
          <div className="space-y-8 mb-16 md:mb-24">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-50 border border-gray-100 rounded-full shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Est. 2018 / Tactical Heritage</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-primary leading-[0.85] tracking-tighter">
              Legacy <br />
              <span className="text-secondary italic">In Motion.</span>
            </h1>

            <div className="flex flex-col md:flex-row md:items-center gap-6 pt-4">
               <p className="text-gray-400 text-lg md:text-2xl font-medium max-w-xl leading-snug">
                 From a family transport desk in Kolkata to a national powerhouse. We bring <span className="text-primary font-black">architectural precision</span> to the physical world.
               </p>
               <div className="h-px md:h-12 w-12 md:w-px bg-gray-200 hidden md:block"></div>
               <button className="group flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm hover:text-secondary transition-colors">
                  Our Story <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
          </div>

          {/* 3. NEW STAT STRIP: Replaces the 'Big Cards' */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-gray-100 py-10 md:py-16 gap-y-10">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col md:items-center md:text-center px-4 md:border-r border-gray-100 last:border-0 group">
                <div className="flex items-center gap-2 text-secondary mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                   {stat.icon}
                   <span className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                </div>
                <p className="text-4xl md:text-6xl font-black text-primary tracking-tighter group-hover:scale-105 transition-transform duration-500">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          
          {/*Bottom Marker*/}
          <p className="text-right mt-10 text-xs font-black text-gray-200 uppercase tracking-[1em] vertical-text hidden lg:block">
            PRADHAN SERVICE CORE
          </p>

        </div>
      </div>

    </section>


      {/* 2. THE DNA GRID: Staggered Glassmorphism */}
      <section className="container px-4 py-24 lg:py-32 bg-slate-50/50 rounded-[4rem] border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dnaPoints.map((point, i) => (
            <div key={i} className={`p-10 rounded-[3rem] bg-white border border-gray-50 shadow-xl shadow-primary/5 transition-all duration-500 hover:-translate-y-4 group ${i % 2 !== 0 ? 'lg:mt-12' : ''}`}>
               <div className="w-16 h-16 rounded-2xl bg-primary text-secondary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {point.icon}
               </div>
               <h3 className="text-xl font-black text-primary uppercase tracking-widest mb-4">{point.title}</h3>
               <p className="text-gray-500 text-sm font-medium leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. NEW SECTION: The Founder's Narrative */}
      <section className="container px-4 py-24 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-4 border-2 border-secondary/20 rounded-[3rem] rotate-3"></div>
            <div className="relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden bg-slate-200">
               {/* Use height={0} width={0} sizes="100vw" as per your rule */}
               <img 
                 src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop" 
                 alt="Leadership"
                 className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
               />
            </div>
          </div>
          
          <div className="space-y-10">
            <Quote className="text-secondary opacity-30" size={60} />
            <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight leading-tight">
              "We treat every house like a lived-in story, not a checklist of furniture."
            </h2>
            <div className="space-y-6 text-gray-500 text-lg font-medium leading-relaxed">
              <p>
                Relocation is deeply personal. Our legacy was built on the understanding that behind every truckload is a family starting a new chapter. We bring architectural precision to the physical world.
              </p>
              <p>
                Today, we lead with technology but remain rooted in the same discipline that started 46 years ago: <strong>The discipline of being on time, every time.</strong>
              </p>
            </div>
            <div className="flex items-center gap-4 pt-6">
               <div className="w-12 h-px bg-primary"></div>
               <p className="font-black text-primary uppercase tracking-widest text-sm">Pradhan Service Leadership</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CREATIVE CTA: The "Floating Command" Banner */}
      <section className="container px-4 pb-32">
        <div className="relative bg-primary rounded-[4rem] p-12 md:p-24 text-center overflow-hidden group">
          {/* Subtle Glow Background */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent opacity-50"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-12">
            <div className="inline-flex items-center gap-2 text-secondary font-black text-xs uppercase tracking-[0.4em]">
              Ready to Settle?
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
              Start Your Next <br />
              <span className="text-secondary italic">Chapter With Us.</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto bg-secondary text-primary px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-2xl shadow-secondary/20 flex items-center justify-center gap-3">
                Get a Quote <ArrowRight size={18} />
              </button>
              <button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                Contact Support
              </button>
            </div>
          </div>

          {/* Abstract DNA Line in CTA */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent"></div>
        </div>
      </section>

    </main>
  );
}