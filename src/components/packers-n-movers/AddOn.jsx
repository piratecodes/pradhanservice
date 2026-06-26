"use client";

import React from 'react';
import { Scale, FileSignature, UserCheck, Snowflake, ArrowRight, Phone } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Property Legal',
    subtitle: 'Deeds & Verification',
    description: 'Expert sale deeds, lease agreements, and title checks to secure your move.',
    price: '1,999',
    icon: <Scale size={24} />,
    glow: 'from-amber-400/20 to-transparent',
    accent: 'text-amber-400'
  },
  {
    id: 2,
    title: 'Rent Agreement',
    subtitle: 'Digital Signatures',
    description: 'Legally valid agreements with doorstep stamp paper delivery.',
    price: '1,499',
    icon: <FileSignature size={24} />,
    glow: 'from-orange-400/20 to-transparent',
    accent: 'text-orange-400'
  },
  {
    id: 3,
    title: 'Tenant Verify',
    subtitle: 'Safety First',
    description: 'ID and police record verification through authorized channels.',
    price: '999',
    icon: <UserCheck size={24} />,
    glow: 'from-cyan-400/20 to-transparent',
    accent: 'text-cyan-400'
  },
  {
    id: 4,
    title: 'AC Services',
    subtitle: 'Gas & Installation',
    description: 'Certified technicians for gas refilling and performance testing.',
    price: '1,999',
    icon: <Snowflake size={24} />,
    glow: 'from-emerald-400/20 to-transparent',
    accent: 'text-emerald-400'
  }
];

export default function AddOnServices({ cityName }) {
  return (
    <section className="container px-4 py-20 lg:py-28 relative z-10">
      <div className="flex flex-col gap-12">
        
        {/* Header: Centered & Modern */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 text-secondary rounded-full font-bold text-xs uppercase tracking-widest">
            Value Added Services
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-primary leading-tight tracking-tight">
            The <span className="text-secondary italic">Concierge</span> Experience
          </h2>
          <p className="text-gray-500 text-lg font-medium max-w-2xl leading-relaxed">
            Relocation is more than just moving boxes. We handle the legal, administrative, and technical details so you can focus on your new beginning.
          </p>
        </div>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group relative bg-white border border-gray-100 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 flex flex-col justify-between overflow-hidden min-h-[380px]"
            >
              {/* Subtle Background Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.glow} rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>

              <div>
                <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center ${service.accent} mb-8 border border-gray-50 group-hover:bg-primary group-hover:text-white transition-all duration-500`}>
                  {service.icon}
                </div>
                
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${service.accent}`}>
                  {service.subtitle}
                </p>
                <h3 className="text-2xl font-black text-primary mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Investment</p>
                  <p className="text-xl font-black text-primary">₹{service.price}</p>
                </div>
                <button className="flex items-center gap-2 text-primary font-bold text-sm group/btn">
                  Book Now
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover/btn:bg-secondary group-hover/btn:text-white transition-all">
                    <ArrowRight size={14} />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner: Microsoft Badge Integration */}
        <div className="mt-12 bg-primary rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden group">
          {/* Abstract Background Detail */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent opacity-50"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 relative z-10">
            <div className="text-center lg:text-left space-y-4">
              <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Ready for a <span className="text-secondary italic">Stress-Free</span> Move?
              </h3>
              <p className="text-gray-400 text-lg font-medium max-w-xl">
                Don't let logistics hold you back. Join 4,500+ happy families who moved with the Pradhan Standard in { cityName }.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a 
                href="tel:+918588886465"
                className="flex items-center justify-center gap-3 bg-secondary text-primary px-10 py-5 rounded-2xl font-black text-lg hover:bg-white transition-all hover:shadow-[0_20px_50px_rgba(197,160,89,0.3)] group/btn"
              >
                <Phone size={20} fill="currentColor" />
                Get Free Quote
              </a>
              <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all">
                View Pricing
              </button>
            </div>
          </div>
        </div>      

      </div>
    </section>
  );
}