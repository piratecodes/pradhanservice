"use client";

import React, { useState, useEffect } from 'react';
import { Home, Package, Truck, Bike, Globe, MapPin } from 'lucide-react';

const servicesData = [
  {
    id: 1,
    title: 'House Shifting',
    description: 'Complete end-to-end support for packing, safe transportation, and careful unpacking of your household goods, whether it\'s a compact flat or a large villa.',
    icon: <Home size={24} />,
  },
  {
    id: 2,
    title: 'Packing & Unpacking',
    description: 'Expert layers of bubble wrap and waterproof protection. We ensure every appliance and fragile item is secured and neatly placed in your new home.',
    icon: <Package size={24} />,
  },
  {
    id: 3,
    title: 'Loading & Unloading',
    description: 'Precision-managed relocation teams for heavy furniture and electronics. Every step is handled with care to prevent any damage or transit delays.',
    icon: <Truck size={24} />,
  },
  {
    id: 4,
    title: 'Bike Transport',
    description: 'Reliable two-wheeler transport with specialized safety clamps. Your scooters or superbikes reach their destination scratch-free across India.',
    icon: <Bike size={24} />,
  },
  {
    id: 5,
    title: 'Intercity Services',
    description: 'Connecting major cities with optimized routes and insurance options. Long-distance shifting made as smooth as a local move across states.',
    icon: <Globe size={24} />,
  },
  {
    id: 6,
    title: 'Intracity Services',
    description: 'Same-day local relocation within city limits. Ideal for professionals and families looking for quick, organized, and reliable shifting support.',
    icon: <MapPin size={24} />,
  }
];

export default function AllServices({ cityName }) {
  const displayCity = cityName || 'Your City';
  const [activeCardId, setActiveCardId] = useState(null);

  useEffect(() => {
    let timeoutId;
    if (activeCardId !== null) {
      timeoutId = setTimeout(() => {
        setActiveCardId(null);
      }, 2500); // 2.5 second highlight reset
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeCardId]);

  return (
    <section className="container px-4 py-20 lg:py-28 relative z-10 border-t border-gray-50">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center space-y-4 mb-20 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 text-secondary rounded-full font-bold text-xs uppercase tracking-widest">
           Service Catalog
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight">
          Our Full Suite of Services in <span className="text-secondary italic">{displayCity}</span>
        </h2>
        <p className="text-gray-500 text-lg font-medium leading-relaxed">
          From compact house shifting to focused industrial logistics, we provide one responsible, organized team for every relocation need in {displayCity}.
        </p>
      </div>

      {/* Grid Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service) => {
          const isHighlighted = activeCardId === service.id;

          return (
            <div 
              key={service.id} 
              onClick={() => setActiveCardId(service.id)}
              className={`relative p-10 rounded-[2.5rem] border cursor-pointer transition-all duration-500 group overflow-hidden ${
                isHighlighted 
                  ? 'bg-primary text-white border-primary shadow-2xl scale-[1.02] z-20' 
                  : 'bg-white text-primary border-gray-100 hover:border-secondary/30 hover:shadow-xl hover:shadow-primary/5 z-10'
              }`}
            >
              {/* Highlight Glow Effect */}
              {isHighlighted && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse"></div>
              )}

              {/* Icon Container */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${
                isHighlighted 
                  ? 'bg-secondary text-primary' 
                  : 'bg-slate-50 text-secondary border border-gray-100 group-hover:bg-primary group-hover:text-white'
              }`}>
                {service.icon}
              </div>

              {/* Text Content */}
              <div className="relative z-10">
                <h3 className={`text-2xl font-black mb-4 transition-colors duration-300 ${
                  isHighlighted ? 'text-white' : 'text-primary'
                }`}>
                  {service.title}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 font-medium ${
                  isHighlighted ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {service.description}
                </p>
              </div>

              {/* Interaction Indicator */}
              <div className={`mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-opacity duration-300 ${
                isHighlighted ? 'opacity-100 text-secondary' : 'opacity-0'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                Active Highlight
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}