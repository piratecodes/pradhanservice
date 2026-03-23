import React from 'react';
import Image from 'next/image';

export default function ServicesSection() {
  const servicesData = [
    {
      title: "Local Shifting",
      description: "Safe and quick local shifting services in Kolkata with professional packing, careful loading, and on-time delivery.",
      image: "https://dummyimage.com/600x400/1e293b/ffffff&text=Local+Shifting"
    },
    {
      title: "Inter State Shifting",
      description: "Reliable interstate relocation services from Kolkata with secure packing, tracking, and safe transportation. ",
      image: "https://dummyimage.com/600x400/1e293b/ffffff&text=Inter+State"
    },
    {
      title: "Industrial Relocation",
      description: "Expert industrial shifting services for factories, machinery, and heavy equipment with professional handling. ",
      image: "https://dummyimage.com/600x400/1e293b/ffffff&text=Industrial"
    },
    {
      title: "Car Transport Service",
      description: "Door-to-door car transportation services from Kolkata using secure car carriers and insured vehicle transport. ",
      image: "https://dummyimage.com/600x400/1e293b/ffffff&text=Car+Transport"
    },
    {
      title: "Secure Storage Services",
      description: "Safe warehouse and storage services in Kolkata with inventory management and 24/7 monitored facilities.",
      image: "https://dummyimage.com/600x400/1e293b/ffffff&text=Secure+Storage"
    },
    {
      title: "Goods Vehicle for Rent",
      description: "Affordable truck rental and goods vehicle services in Kolkata for commercial transport and logistics needs. ",
      image: "https://dummyimage.com/600x400/1e293b/ffffff&text=Vehicle+Rent"
    },
    {
      title: "Home/Flat Shifting Service",
      description: "Professional house shifting services in Kolkata with complete packing, loading, moving, and unpacking support.",
      image: "https://dummyimage.com/600x400/1e293b/ffffff&text=Home+Shifting"
    },
    {
      title: "Home Appliance Fitting",
      description: "Expert AC, TV, and appliance installation services during relocation for safe setup at your new home.",
      image: "https://dummyimage.com/600x400/1e293b/ffffff&text=Appliance+Fitting"
    }
  ];

  return (
    <section className="container px-4 py-20 relative z-10">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 text-secondary rounded-full mb-6 font-bold text-xs uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          Our Expertise
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-primary mb-6 tracking-tight">
          Comprehensive <span className="text-secondary italic">Logistics</span>
        </h2>
        <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
          From local apartment moves to massive industrial relocations across India, Pradhan Packers & Movers delivers uncompromising quality and safety.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {servicesData.map((service, index) => (
          <div 
            key={index} 
            className="group flex flex-col bg-white rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/10 border border-gray-100"
          >
            {/* Image Container with Hover Zoom */}
            <div className="w-full h-48 sm:h-56 relative overflow-hidden bg-primary">
              {/* Strict Image sizing applied */}
              <Image 
                height={0} 
                width={0} 
                sizes="100vw"
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              {/* Subtle gradient overlay using dynamic primary color */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col grow p-8 text-center items-center relative">
              {/* Decorative dot */}
              <div className="w-8 h-1 bg-secondary rounded-full mb-6 transition-all duration-300 group-hover:w-16"></div>
              
              <h3 className="text-xl font-black text-primary mb-4">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
    
  );
}