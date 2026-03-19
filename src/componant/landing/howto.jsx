import React from 'react';
import { 
  ClipboardList, 
  FileSignature, 
  CalendarCheck, 
  MousePointerClick, 
  PackageCheck, 
  Truck, 
  Home, 
  Headset 
} from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    { id: 1, title: "Survey (Online/Offline)", icon: ClipboardList },
    { id: 2, title: "Quotation", icon: FileSignature },
    { id: 3, title: "Date Confirm", icon: CalendarCheck },
    { id: 4, title: "Booking", icon: MousePointerClick },
    { id: 5, title: "Packing", icon: PackageCheck },
    { id: 6, title: "Transport", icon: Truck },
    { id: 7, title: "Delivery", icon: Home },
    { id: 8, title: "Follow Up", icon: Headset }
  ];

  return (
    <section className="container px-4 py-20 lg:py-28 relative z-10">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center space-y-3 mb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 text-secondary rounded-full mb-4 font-bold text-xs uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          The Process
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight">
          How It <span className="text-secondary italic">Works</span>
        </h2>
        <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed mt-4">
          A seamless, transparent 8-step process designed to move you safely and efficiently from your first inquiry to your final destination.
        </p>
      </div>

      {/* Steps Flex Area */}
      <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
        {steps.map((step) => {
          const IconComponent = step.icon;
          return (
            <div 
              key={step.id} 
              className="group relative flex flex-col items-center justify-center bg-white border border-gray-100 rounded-[1.5rem] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-secondary/10 hover:border-secondary/50 w-full sm:w-[47%] md:w-[30%] lg:w-[22%] xl:w-[23%]"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-black border-2 border-white shadow-sm">
                0{step.id}
              </div>

              {/* Icon Container with Hover Animation */}
              <div className="w-16 h-16 rounded-full bg-slate-50 shadow-sm flex items-center justify-center mb-5 text-primary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                <IconComponent className="w-8 h-8" strokeWidth={1.5} />
              </div>
              
              {/* Text Content */}
              <h3 className="text-base font-bold text-primary text-center">
                {step.title}
              </h3>
            </div>
          );
        })}
      </div>

    </section>
  );
}