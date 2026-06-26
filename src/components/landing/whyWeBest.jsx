import React from 'react';
import Image from 'next/image';
import { UserCheck, Users, PackageSearch, Clock, BellRing, Globe} from 'lucide-react';

//Image Import
import Img from '@/assets/how.png';

export default function WhyChooseUsSection() {
  const leftFeatures = [
    {
      id: 1,
      title: "Legacy Experience",
      icon: UserCheck,
      description: "Operating since 1980, handling diverse relocation challenges across India with proven execution, not theoretical processes or recent market entry."
    },
    {
      id: 2,
      title: "Pan-India Network",
      icon: Users,
      description: "Pan India service through controlled teams and routes, reducing dependency on unknown third parties and maintaining consistency in long-distance moves."
    },
    {
      id: 3,
      title: "Ground Expertise",
      icon: PackageSearch,
      description: "Experienced in handling narrow lanes, old buildings, and no-lift moves common in Indian cities, ensuring practical execution without damage risk."
    }
  ];

  const rightFeatures = [
    {
      id: 4,
      title: "Controlled Handling",
      icon: Clock,
      description: "Structured packing, item segregation, and supervised loading methods to minimize breakage instead of rushed or unplanned shifting practices."
    },
    {
      id: 5,
      title: "Verified Teams",
      icon: BellRing,
      description: "Our trained, in-house specialists provide strict supervision and full accountability, replacing unverified contractors with a permanent, seasoned relocation crew."
    },
    {
      id: 6,
      title: "Cost Clarity",
      icon: Globe,
      description: "Transparent pricing based on requirments, volume, distance, and access conditions, reducing unexpected hidden charges during or after the move."
    }
  ];

  return (
    <section className="container px-4 py-10 relative z-10">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center space-y-4 mb-16 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 text-secondary rounded-full font-bold text-xs uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          The Gold Standard
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight">
          Why Pradhan Packers Is <span className="text-secondary italic">Rated the Best</span>
        </h2>
        <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed mt-4">
          We have earned our reputation by delivering outstanding, tech-driven relocation services. From real-time tracking to verified crews, you can rest assured your household is in the safest hands.
        </p>
      </div>

      {/* 3-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
        
        {/* Left Column - Features */}
        <div className="flex flex-col gap-6">
          {leftFeatures.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={feature.id} 
                className="group flex flex-col p-8 border-l-4 border-transparent bg-white rounded-2xl shadow-lg shadow-primary/5 hover:border-secondary hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-black text-xl text-primary">{feature.title}</h3>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Center Column - Image */}
        <div className="w-full h-full min-h-125 lg:min-h-175 relative rounded-[2.5rem] overflow-hidden order-first lg:order-0 mb-10 lg:mb-0 shadow-2xl shadow-primary/10 border-8 border-white">
          <Image 
            height={0} 
            width={0} 
            sizes="100vw" 
            src={Img}
            alt="Safe Packaging and Moving" 
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay to tie the image into the theme */}
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
        </div>

        {/* Right Column - Features */}
        <div className="flex flex-col gap-6">
          {rightFeatures.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={feature.id} 
                className="group flex flex-col p-8 border-l-4 border-transparent bg-white rounded-2xl shadow-lg shadow-primary/5 hover:border-secondary hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-black text-xl text-primary">{feature.title}</h3>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}