import React from 'react';
import Image from 'next/image';
import { 
  UserCheck, 
  Users, 
  PackageSearch, 
  Clock, 
  BellRing, 
  Globe 
} from 'lucide-react';

export default function WhyChooseUsSection() {
  const leftFeatures = [
    {
      id: 1,
      title: "Background Check",
      icon: UserCheck,
      description: "Every member who enters your home has been verified and trained before joining an active crew. We check identity, behaviour and on-job performance so you are not opening your door to unknown, untested labour."
    },
    {
      id: 2,
      title: "Professional Teams",
      icon: Users,
      description: "Our teams work in a clear sequence - packing, labelling, loading and setup. Supervisors coordinate with you, the driver, and building staff so the shift feels controlled, not chaotic."
    },
    {
      id: 3,
      title: "Safe Packing & Handling",
      icon: PackageSearch,
      description: "From TV units to wardrobes, we use appropriate packing material and smart stacking inside the vehicle. The goal is to reduce impact and tilt so your goods arrive in the exact same condition."
    }
  ];

  const rightFeatures = [
    {
      id: 4,
      title: "24-Hour Moves Available",
      icon: Clock,
      description: "Some moves cannot wait. For urgent relocations, we can plan late-night or early-morning operations, aligning with your society rules so the job gets done without disturbing everyone around."
    },
    {
      id: 5,
      title: "Clear Coordination",
      icon: BellRing,
      description: "You should always know what is happening. Our team keeps you informed about packing progress, vehicle departure and expected arrival, so you are never guessing where your belongings are."
    },
    {
      id: 6,
      title: "Pan-India Network",
      icon: Globe,
      description: "If your new address is outside the state, we plan the route through our wider network. A single team remains responsible for your consignment's journey, instead of leaving you to manage multiple vendors."
    }
  ];

  return (
    <section className="container px-4 py-20 lg:py-28 relative z-10">
      
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
        <div className="w-full h-full min-h-[500px] lg:min-h-[700px] relative rounded-[2.5rem] overflow-hidden order-first lg:order-none mb-10 lg:mb-0 shadow-2xl shadow-primary/10 border-8 border-white">
          <Image 
            height={0} 
            width={0} 
            sizes="100vw" 
            src="https://dummyimage.com/600x1000/1e293b/ffffff&text=Professional+Moving" 
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