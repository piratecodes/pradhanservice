import React from 'react';
import { 
  Gift, Share2, Phone, IndianRupee, CheckCircle2, ArrowRight, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Refer & Earn | Pradhan Packers and Movers',
  description: 'Refer a friend to Pradhan Packers and Movers and earn instant payment rewards! Share the trust and get rewarded today.',
};

export default async function ReferAndEarnPage() {
  let primaryPhone = "+91 9830070983";
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success && data.data?.contact?.primaryPhone) {
      primaryPhone = data.data.contact.primaryPhone;
    }
  } catch (e) {
    console.error("Failed to fetch contact for refer page", e);
  }
  
  const steps = [
    {
      icon: <Share2 size={24} />,
      title: "1. Spread the Word",
      description: "Know someone who is looking to relocate? Tell them about your seamless experience with Pradhan Packers and Movers."
    },
    {
      icon: <Phone size={24} />,
      title: "2. Connect Us via Call",
      description: "Directly call our support team or have your friend mention your name/phone number when they book their move with us."
    },
    {
      icon: <IndianRupee size={24} />,
      title: "3. Earn Instant Rewards",
      description: "Once their shifting is successfully completed, you receive an instant payment reward directly to your account!"
    }
  ];

  const terms = [
    "You must be an existing user or have previously taken services from Pradhan Packers and Movers.",
    "The referral reward is processed only after the successful completion of the referred friend's relocation.",
    "Your friend must mention your name and registered phone number at the time of their initial booking.",
    "Self-referrals are not applicable for this program.",
    "The reward amount varies based on the total value of the referred shifting service.",
    "Pradhan Packers and Movers reserves the right to modify or terminate the referral program without prior notice."
  ];

  return (
    <main role="main" aria-label="Refer and Earn">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-10 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent opacity-70 pointer-events-none"></div>

        <div className="container px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Hero Text */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
                <Gift className="text-secondary" size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Exclusive Referral Program</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-primary leading-[1.1] tracking-tighter">
                Refer a Friend & <br />
                <span className="text-secondary italic">Earn Instant Rewards</span>
              </h1>
              
              <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-lg">
                Loved our moving services? Share the trust with your friends and family. When they move with us, you earn an instant payment directly to your account!
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href={`tel:${primaryPhone.replace(/\s/g, '')}`} className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-[#112440] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                  <Phone size={18} /> Call Now to Refer
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full aspect-4/3 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 border-4 border-white">
              <Image src="/referral-hero.webp" alt="Friends shaking hands - Referral Program" fill className="object-cover hover:scale-105 transition-transform duration-700" />
              {/* Optional fallback if image isn't loaded correctly: */}
              <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="container px-4 border-b border-gray-50">
        <div className="text-center max-w-3xl mx-auto mb-16 z-20">
          <div className="inline-flex items-center gap-2 text-secondary font-black text-xs uppercase tracking-[0.2em] mb-4 z-20">
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight z-20">
            How to <span className="text-secondary italic z-20">Achieve It?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 p-8 md:p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-primary/5 transition-all duration-500 hover:-translate-y-2 group flex flex-col items-center text-center">
               <div className="w-20 h-20 rounded-2xl bg-slate-50 text-secondary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors border border-gray-100 shadow-sm relative">
                  {step.icon}
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-secondary text-white font-black flex items-center justify-center border-2 border-white text-sm shadow-md">
                    {i + 1}
                  </div>
               </div>
               <h3 className="text-xl font-black text-primary mb-4 leading-tight z-20">{step.title}</h3>
               <p className="text-gray-500 text-sm font-medium leading-relaxed z-20">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TERMS & CONDITIONS */}
      <section className="container px-4 py-20">
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-lg shadow-primary/5">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 border border-gray-200 shadow-sm">
              <ShieldCheck className="text-secondary" size={24} />
            </div>
            <h2 className="text-3xl font-black text-primary tracking-tight z-20">
              Terms & Conditions
            </h2>
          </div>

          <div className="space-y-4">
            {terms.map((term, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <CheckCircle2 className="text-secondary shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity z-20" size={20} />
                <p className="text-gray-600 font-medium leading-relaxed text-sm md:text-base z-20">{term}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-white rounded-2xl border-l-4 border-primary shadow-sm">
            <p className="text-primary font-bold text-sm md:text-base leading-relaxed z-30">
              Have questions about the program? Give us a call at <a href={`tel:${primaryPhone.replace(/\s/g, '')}`} className="text-secondary hover:underline z-30">{primaryPhone}</a> and we'll be happy to help!
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
