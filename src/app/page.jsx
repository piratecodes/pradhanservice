import React from "react";

import HeroSection from "@/componant/landing/hero";
import AboutSection from "@/componant/landing/abour";
import ServicesSection from "@/componant/landing/service";
// import HowItWorksSection from "@/componant/landing/howto";
import WhyChooseUsSection from "@/componant/landing/whyWeBest";
import TestimonialsSection from "@/componant/landing/testimonials";
import FaqSection from "@/componant/landing/faq";

export default function Home() {
  return (
    <React.Fragment>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      {/* <HowItWorksSection /> */}
      <WhyChooseUsSection />
      <TestimonialsSection />
      <FaqSection />
    </React.Fragment>
  );
}
