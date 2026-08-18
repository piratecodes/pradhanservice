import React from 'react';
import { 
  Gift, Share2, Phone, IndianRupee, CheckCircle2, ShieldCheck, CreditCard, Users, Star
} from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Refer & Earn | Pradhan Packers and Movers',
  description: 'Refer a friend to Pradhan Packers and Movers and earn a ₹299 instant reward plus a Lifetime Privilege Partner Card!',
};

export default async function ReferAndEarnPage() {
  let primaryPhone = "+91 9830070983";
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/`, { cache: 'no-store' });
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
      title: "3. Earn ₹299 Reward",
      description: "Instantly receive a ₹299 cash reward directly to your account immediately after their successful move. No gap acceptable!"
    },
    {
      icon: <CreditCard size={24} />,
      title: "4. Become a Partner",
      description: "You'll be officially registered as a Pradhan Privilege Partner, unlocking a 20% lifetime discount for you and your entire family."
    }
  ];

  const terms = [
    "You must be an existing user or have previously taken services from Pradhan Packers and Movers.",
    "The ₹299 referral reward is processed only after the successful completion of the referred friend's relocation.",
    "Your friend must mention your name and registered phone number at the time of their initial booking.",
    "Self-referrals are not applicable for this program.",
    "To activate the 20% Lifetime Family Discount, the referrer's details must be officially registered in our Admin Panel.",
    "The 20% lifetime discount is applicable to the registered Privilege Partner and their immediate family members for all future relocations.",
    "Pradhan Packers and Movers reserves the right to modify or terminate the referral program without prior notice."
  ];

  return (
    <main role="main" aria-label="Refer and Earn">
      
      {/* 1. HERO SECTION (Ultra-Premium Creative Theme) */}
      <section className="relative w-full pt-24 pb-32 overflow-hidden bg-slate-950">
        {/* Deep Spotlight & Floating Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-slate-900 via-[#0a1128] to-slate-950 pointer-events-none"></div>
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-linear-to-tr from-secondary/20 to-yellow-200/10 rounded-full blur-2xl animate-[pulse_4s_ease-in-out_infinite] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-linear-to-bl from-blue-500/20 to-purple-500/10 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite] pointer-events-none"></div>
        
        {/* Animated Grid that fades out */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="container px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Glassmorphism Text Container */}
            <div className="space-y-8 relative">
              {/* Decorative side line */}
              <div className="absolute -left-6 top-0 w-1 h-full bg-linear-to-b from-secondary via-secondary/50 to-transparent rounded-full hidden lg:block"></div>

              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <Gift className="text-secondary animate-bounce" size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/90 drop-shadow-md">Exclusive Referral Program</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.05] tracking-tighter drop-shadow-2xl relative">
                Refer a Friend, <br />
                <span className="relative inline-block mt-2">
                  <span className="absolute -inset-2 bg-linear-to-r from-secondary to-yellow-200 blur-xl opacity-20"></span>
                  <span className="relative text-transparent bg-clip-text bg-linear-to-r from-secondary via-yellow-200 to-secondary italic">Earn ₹299 & Perks</span>
                </span>
              </h1>
              
              <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-lg drop-shadow-md">
                Share the trust with your friends and family. When they complete a move with us, you earn an instant <strong className="text-white">₹299 reward</strong> and unlock a permanent <strong className="text-secondary">20% family discount!</strong>
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                <a href={`tel:${primaryPhone.replace(/\s/g, '')}`} className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-secondary text-primary px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all overflow-hidden shadow-[0_0_40px_rgba(197,160,89,0.3)] hover:shadow-[0_0_80px_rgba(197,160,89,0.6)] hover:-translate-y-1">
                  {/* Hover shine effect */}
                  <div className="absolute inset-0 bg-white/40 -translate-x-[105%] group-hover:translate-x-[105%] transition-transform duration-700 ease-in-out skew-x-12"></div>
                  <Phone size={18} className="relative z-10" /> <span className="relative z-10">Call Now to Refer</span>
                </a>
              </div>
            </div>

            {/* Privilege Partner Card Showcase - Floating 3D effect */}
            <div className="relative w-full aspect-4/3 flex items-center justify-center p-4 lg:p-8">
              
              {/* Massive ambient glow behind card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-secondary/30 blur-[100px] rounded-full animate-pulse pointer-events-none"></div>
              
              {/* Floating Card Container */}
              <div className="relative w-full max-w-md aspect-[1.586/1] bg-linear-to-br from-slate-900/60 via-[#112440]/70 to-slate-900/60 backdrop-blur-2xl rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden border border-white/10 hover:border-secondary/50 transition-all duration-700 ease-out group transform-[perspective(1000px)_rotateY(-15deg)_rotateX(5deg)] hover:transform-[perspective(1000px)_rotateY(0deg)_rotateX(0deg)]">
                
                {/* Diagonal Glassmorphism Shine */}
                <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 pointer-events-none"></div>

                {/* Gold abstract shapes inside card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000 ease-out"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3 group-hover:scale-150 transition-transform duration-1000 ease-out"></div>
                
                <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between backdrop-blur-sm">
                  {/* Card Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-secondary font-black text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-1">Pradhan Packers and Movers</h3>
                      <p className="text-white/60 font-medium text-[9px] tracking-[0.2em]">EST. 1980</p>
                    </div>
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10 shadow-inner">
                      <Star className="text-secondary fill-secondary opacity-90" size={20} />
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="space-y-1 text-center mt-6">
                    <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-slate-300 tracking-[0.15em] uppercase drop-shadow-xl" style={{ WebkitTextStroke: '0.5px rgba(255,255,255,0.1)' }}>
                      Privilege
                    </h2>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-widest uppercase drop-shadow-xl opacity-90">
                      Partner
                    </h2>
                    <p className="text-secondary/80 font-black text-[10px] tracking-[0.3em] mt-2">MEMBER ID CARD</p>
                  </div>

                  {/* Card Footer */}
                  <div className="flex justify-between items-end border-t border-white/10 pt-5 mt-6 relative">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-secondary/20 to-secondary/5 flex items-center justify-center border border-secondary/30 backdrop-blur-md shadow-lg group-hover:bg-secondary/40 transition-colors duration-500">
                        <Users className="text-secondary" size={18} />
                      </div>
                      <div>
                        <p className="text-[8px] sm:text-[9px] text-white/50 uppercase tracking-[0.2em] font-black mb-0.5">Family Benefit</p>
                        <p className="text-secondary font-black text-xs sm:text-sm tracking-widest drop-shadow-md">20% LIFETIME OFF</p>
                      </div>
                    </div>
                    {/* Simulated Smart Chip */}
                    <div className="w-10 h-8 rounded-md border border-secondary/30 bg-linear-to-br from-secondary/20 to-transparent flex items-center justify-center overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                       <div className="w-full h-px bg-secondary/30 absolute"></div>
                       <div className="w-px h-full bg-secondary/30 absolute"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="container px-4 border-b border-gray-50 pb-20">
        <div className="text-center max-w-3xl mx-auto mb-16 z-20">
          <div className="inline-flex items-center gap-2 text-secondary font-black text-xs uppercase tracking-[0.2em] mb-4 z-20">
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight z-20">
            How to <span className="text-secondary italic z-20">Achieve It?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 p-6 md:p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-primary/5 transition-all duration-500 hover:-translate-y-2 group flex flex-col items-center text-center h-full">
               <div className="w-16 h-16 rounded-2xl bg-slate-50 text-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors border border-gray-100 shadow-sm relative shrink-0">
                  {step.icon}
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-secondary text-white font-black flex items-center justify-center border-2 border-white text-xs shadow-md">
                    {i + 1}
                  </div>
               </div>
               <h3 className="text-lg font-black text-primary mb-3 leading-tight z-20">{step.title}</h3>
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
