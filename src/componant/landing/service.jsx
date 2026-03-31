import React from 'react';
import Image from 'next/image';


// Images
import LocalShiftingImage from "@/assets/LocalShifting.png";
import SecureStorageImage from "@/assets/SecureStorage.png";
import CarTransportImage from "@/assets/CarTransport.png";
import BikeTransportImage from "@/assets/BikeTransport.png";

export default function ServicesSection() {
  const servicesData = [
    {
      title: "Packers And Movers",
      description: "Reliable packers and movers for home and office shifting, offering safe, fast and affordable packing and moving services.",
      image: LocalShiftingImage
    },
    {
      title: "Storage Solutions",
      description: "Secure storage solutions by expert packers and movers, offering safe, flexible and affordable warehouse storage services.",
      image: SecureStorageImage
    },
    {
      title: "Car Transportation",
      description: "Safe car transportation by professional packers and movers, ensuring quick, damage-free and secure vehicle shifting.",
      image: CarTransportImage
    },
    {
      title: "Bike Transportation",
      description: "Trusted bike transportation by best packers and movers, offering door to door, safe and affordable bike shifting services.",
      image: BikeTransportImage
    }
  ];

  return (
    <section className="container px-4 py-10 relative z-10">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-primary mb-6 tracking-tight">
          Our <span className="text-secondary italic">Services</span>
        </h2>
        <h2 className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
          From local apartment moves to massive industrial relocations across India, Pradhan Packers & Movers delivers uncompromising quality and safety.
        </h2>
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
              <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>
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