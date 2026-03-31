"use client";

import React from 'react';
import { 
  Globe, Users, Heart, Zap, ShieldCheck, Share2, History, ArrowRight, 
  Target, Eye, CheckCircle2, PackageOpen, Clock, IndianRupee, FileCheck2,
  Medal, Award, Network
} from 'lucide-react';

export default function AboutPage() {
  
  // 1. Core Values (Exact Text)
  const coreValues = [
    { icon: <Heart size={24} />, title: "Customer First", description: "Every relocation is handled with care and responsibility" },
    { icon: <ShieldCheck size={24} />, title: "Safety & Reliability", description: "We ensure safe packing, handling, and transportation of goods" },
    { icon: <Zap size={24} />, title: "Professional Service", description: "Our trained staff follows systematic processes for every move" },
    { icon: <Share2 size={24} />, title: "Trust & Transparency", description: "We maintain clear communication and honest pricing" },
  ];

  // 2. Experience & Strength (Exact Text)
  const strengths = [
    { icon: <History size={20} />, text: "40+ Years of Experience in packing and moving services" },
    { icon: <Medal size={20} />, text: "15,000+ Successful Shifting Projects completed" },
    { icon: <Users size={20} />, text: "10,000+ Happy Customers served across India" },
    { icon: <Award size={20} />, text: "Professional Packing & Handling Team" },
    { icon: <Network size={20} />, text: "Strong network for interstate relocation services" }
  ];

  // 3. Services List (Exact Text)
  const servicesList = [
    "Local Shifting Services in Kolkata for quick and safe household relocation",
    "Interstate Relocation Services for secure long-distance shifting across India",
    "Industrial Relocation for factories, machinery, and heavy equipment transportation",
    "Car Transport Services using safe and specialized vehicle carriers",
    "Secure Warehouse & Storage Solutions with monitored storage facilities",
    "Goods Vehicle Rental Services for transportation and logistics support",
    "Home and Flat Shifting Services with complete packing and moving assistance",
    "Home Appliance Installation Services for AC, TV, and electronic fittings after relocation"
  ];

  // 4. Why Choose Us Grid (Exact Text)
  const whyChooseUs = [
    { title: "Safe Packing", description: "High-quality packing materials ensure safe shifting services in Kolkata with maximum protection for your belongings.", icon: <PackageOpen size={24} /> },
    { title: "On-Time Delivery", description: "Reliable packers and movers in Kolkata ensure timely pickup, fast transit, and secure delivery.", icon: <Clock size={24} /> },
    { title: "Skilled Moving Team", description: "Experienced professionals handling packing, loading, and relocation services with care and efficiency.", icon: <Users size={24} /> },
    { title: "Affordable Pricing", description: "Transparent and competitive pricing from the best packers and movers in Kolkata.", icon: <IndianRupee size={24} /> },
    { title: "No Hidden Charges", description: "Clear quotations with zero hidden costs for home shifting and relocation services.", icon: <FileCheck2 size={24} /> },
    { title: "Damage Claim Support", description: "Transit insurance support with quick claim assistance for safe moving services.", icon: <ShieldCheck size={24} /> }
  ];

  return (
    <main className="min-h-screen">
      
      {/* 1. HERO & ABOUT SECTION: Accommodating the full narrative */}
      <section className="relative w-full pt-32 md:pt-48 pb-20 overflow-hidden border-b border-gray-50">
        
        {/* Responsive Graffiti Watermark */}
        <div className="absolute top-0 right-0 z-0 pointer-events-none select-none opacity-[0.05] translate-x-1/12 -translate-y-1/4">
          <h2 className="text-[40vw] lg:text-[50rem] font-black leading-none tracking-tighter" style={{ WebkitTextStroke: '2px #c5a059', color: 'transparent' }}>
            40
          </h2>
        </div>

        <div className="container px-4 relative z-10">
          
          <div className="mb-16 md:mb-24">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-50 border border-gray-100 rounded-full shadow-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Est. 1980 / Kolkata Heritage</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-[0.9] tracking-tighter mb-16">
              About Pradhan Packers <br className="hidden md:block" />
              <span className="text-secondary italic">and Movers Pvt Ltd</span>
            </h1>

            {/* The Full "About" Text Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              <div className="lg:col-span-7 space-y-6 text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
                <p>
                  Pradhan Packers and Movers Pvt Ltd is a trusted relocation company providing professional packing and moving services in Kolkata since 1980. With more than four decades of experience, we have successfully helped thousands of families, professionals, and businesses relocate safely across Kolkata and all over India.
                </p>
                <p>
                  Our team specializes in home shifting, office relocation, car transportation, industrial relocation, and warehouse storage services. Every move is handled with proper planning, high-quality packing materials, and trained professionals to ensure the safety of your belongings.
                </p>
                <p>
                  At Pradhan Packers and Movers Pvt Ltd, we focus on reliability, transparent pricing, and customer satisfaction. Whether you are moving locally within Kolkata or shifting to another city, our goal is to make the relocation process simple, safe, and stress-free.
                </p>
              </div>

              {/* Our Experience & Strength (Sidebar Panel) */}
              <div className="lg:col-span-5 bg-slate-50 border border-gray-100 p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-primary/5">
                <h3 className="text-2xl font-black text-primary mb-8 border-b-2 border-secondary/30 pb-4 inline-block">
                  Our Experience & Strength
                </h3>
                <ul className="space-y-6">
                  {strengths.map((item, index) => (
                    <li key={index} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-white text-secondary flex items-center justify-center shrink-0 border border-gray-200 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                        {item.icon}
                      </div>
                      <span className="text-primary font-bold text-sm md:text-base leading-snug pt-2">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR SERVICES */}
      <section className="container px-4 py-20 lg:py-28 border-b border-gray-50">
        <div className="max-w-4xl mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-6">
            Our <span className="text-secondary italic">Services</span>
          </h2>
          <p className="text-gray-500 text-lg font-medium leading-relaxed">
            Pradhan Packers and Movers Pvt Ltd offers a complete range of relocation solutions :
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {servicesList.map((service, i) => (
            <div key={i} className="flex items-start gap-4 p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:border-secondary/30 transition-all group">
              <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={24} />
              <p className="text-primary text-sm md:text-base font-bold leading-relaxed">{service}</p>
            </div>
          ))}
        </div>

        <div className="p-6 md:p-8 bg-slate-50 rounded-2xl border-l-4 border-secondary max-w-5xl">
          <p className="text-gray-600 font-medium text-lg leading-relaxed">
            Our experienced team ensures proper packing, careful loading, secure transportation, and safe delivery at your destination.
          </p>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="container px-4 py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          <div className="bg-primary p-10 md:p-14 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/10 text-secondary flex items-center justify-center mb-8 border border-white/20">
                <Target size={32} />
              </div>
              <h3 className="font-black text-3xl mb-6">Our Mission</h3>
              <p className="text-white/80 text-lg leading-relaxed font-medium mb-4">
                Our mission is to provide safe, reliable, and affordable packing and moving services in Kolkata while maintaining the highest standards of professionalism and customer care.
              </p>
              <p className="text-white/80 text-lg leading-relaxed font-medium">
                We aim to make every relocation smooth, efficient, and worry-free for our customers.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-10 md:p-14 rounded-[3rem] border border-gray-100 hover:border-secondary/30 transition-colors group">
            <div className="w-16 h-16 rounded-2xl bg-white text-primary flex items-center justify-center mb-8 border border-gray-200 shadow-sm group-hover:bg-primary group-hover:text-secondary transition-colors">
              <Eye size={32} />
            </div>
            <h3 className="font-black text-primary text-3xl mb-6">Our Vision</h3>
            <p className="text-gray-500 text-lg leading-relaxed font-medium">
              To become one of the most trusted packers and movers companies in India by delivering high-quality relocation services, maintaining transparency, and continuously improving customer satisfaction.
            </p>
          </div>

        </div>
      </section>

      {/* 4. OUR CORE VALUES */}
      <section className="container px-4 pb-20 lg:pb-28">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight">
            Our <span className="text-secondary italic">Core Values</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((point, i) => (
            <div key={i} className={`p-8 md:p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-primary/5 transition-all duration-500 hover:-translate-y-4 group ${i % 2 !== 0 ? 'lg:mt-12' : ''}`}>
               <div className="w-16 h-16 rounded-2xl bg-slate-50 text-secondary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors border border-gray-100">
                  {point.icon}
               </div>
               <h3 className="text-xl font-black text-primary uppercase tracking-widest mb-4">{point.title}</h3>
               <p className="text-gray-500 text-sm font-medium leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="container px-4 py-24 lg:py-32 border-t border-gray-50">
        <div className="max-w-4xl mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight tracking-tighter mb-6">
            Why Choose <br className="hidden md:block" />
            <span className="text-secondary italic">Pradhan Packers and Movers</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed border-l-4 border-secondary/30 pl-6">
            Trusted by thousands, Pradhan Packers and Movers Pvt Ltd delivers safe, reliable, and affordable relocation services across Kolkata and India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-12">
          {whyChooseUs.map((feature, index) => (
            <div key={index} className="group relative flex gap-6 items-start p-8 rounded-[2.5rem] bg-white border border-gray-50 hover:bg-slate-50/50 hover:border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-secondary flex items-center justify-center shrink-0 border border-gray-200 transition-all duration-500 group-hover:bg-primary group-hover:text-white shadow-sm">
                {feature.icon}
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-black text-secondary group-hover:text-primary transition-colors">0{index + 1} //</span>
                <h3 className="text-xl font-black text-primary leading-tight">{feature.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA */}
      <section className="container px-4 pb-32">
        <div className="relative bg-primary rounded-[4rem] p-12 md:p-24 text-center overflow-hidden group">
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
              <button className="w-full sm:w-auto bg-secondary text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-secondary transition-all shadow-2xl shadow-secondary/20 flex items-center justify-center gap-3">
                Get a Quote <ArrowRight size={18} />
              </button>
              <button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                Contact Support
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-secondary/30 to-transparent"></div>
        </div>
      </section>

    </main>
  );
}