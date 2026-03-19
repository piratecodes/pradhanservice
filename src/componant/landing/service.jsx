import React from 'react';
import Image from 'next/image';

export default function ServicesSection() {
  const servicesData = [
    {
      title: "Local Shifting",
      description: "The demand for local shifting services is gradually increasing in Kolkata due to the availability of people from different regions. We provide packers and movers for local shifting service in Kolkata within the same day.",
      image: "https://dummyimage.com/600x400/1e293b/ffffff&text=Local+Shifting"
    },
    {
      title: "Inter State Shifting",
      description: "No matter which city of the country you are shifting to, you can always rely on Pradhan Packers and Movers in Kolkata. We assist to provide interstate shifting service to our customers because of our strong network.",
      image: "https://dummyimage.com/600x400/1e293b/ffffff&text=Inter+State"
    },
    {
      title: "Industrial Relocation",
      description: "India is developing rapidly now. Most people are trying to become an entrepreneur by setting up a small-scale or medium-scale industry. We assist door to door industrial product relocation.",
      image: "https://dummyimage.com/600x400/1e293b/ffffff&text=Industrial"
    },
    {
      title: "Car Transport Service",
      description: "Most people want to transport their car to the new working location instead of purchasing a new one. We assist our customers to transport any kind of car to their new destination safely.",
      image: "https://dummyimage.com/600x400/1e293b/ffffff&text=Car+Transport"
    },
    {
      title: "Secure Storage Services",
      description: "Our Secure Storage services offer secure, spacious, and efficient storage solutions. With inventory management, 24/7 security, and flexible options, we ensure safe and seamless logistics for your business.",
      image: "https://dummyimage.com/600x400/1e293b/ffffff&text=Secure+Storage"
    },
    {
      title: "Goods Vehicle for Rent",
      description: "It is a risky thing to shift both new and usable vehicles for a long distance. We assist our customers to transport their vehicles to their destinations with well-protected transporters.",
      image: "https://dummyimage.com/600x400/1e293b/ffffff&text=Vehicle+Rent"
    },
    {
      title: "Home/Flat Shifting Service",
      description: "Expert home and flat shifting services with safe packing, secure transport, timely delivery, and professional handling, ensuring a smooth, hassle-free relocation experience at affordable rates.",
      image: "https://dummyimage.com/600x400/1e293b/ffffff&text=Home+Shifting"
    },
    {
      title: "Home Appliance Fitting",
      description: "Our home appliance fitting service ensures seamless installation of Fans, ACs, refrigerators, washing machines, geysers, and more. Expert technicians provide safe, efficient, and reliable setup.",
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