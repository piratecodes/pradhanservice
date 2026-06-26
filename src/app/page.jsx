import React from "react";

import HeroSection from "@/components/landing/hero";
import TrustBadges from "@/components/landing/TrustBadges";
import AboutSection from "@/components/landing/abour";
import ServicesSection from "@/components/landing/service";
// import HowItWorksSection from "@/componant/landing/howto";
import WhyChooseUsSection from "@/components/landing/whyWeBest";
import TestimonialsSection from "@/components/landing/testimonials";
import FaqSection from "@/components/landing/faq";

export const metadata = {
  title: 'Packers and Movers Company in Kolkata | Pradhan Packers and Movers Pvt. Ltd.',
  description: 'Trusted packers and movers company in Kolkata offering shifting, storage solutions, and car transport services with safe, reliable handling.',
  keywords: ["packers and movers service kolkata", "Pradhan Packers and movers"],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Pradhan Packers and Movers Private Limited",
  "url": "https://pradhanservice.com/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://pradhanservice.com/logo.png"
  },
  "description": "Pradhan Packers and Movers Private Limited is a trusted relocation service provider company in Kolkata with over 45 years of experience in packing and moving services.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "P-61, Bijan Kanan,",
    "addressLocality": "Brahmapur, Kolkata, ",
    "addressRegion": "West Bengal",
    "postalCode": "700096",
    "addressCountry": "IN"
  },
  "image": "https://pradhanservice.com/logo.png",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91 9830070983",
      "contactType": "customer service",
      "email": "support@pradhanservice.com",
      "areaServed": "IN",
      "availableLanguage": "English, Hindi"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/pradhanpackersandmoverspvtltd.kolkata",
    "https://www.instagram.com/pradhan_packers_and_movers",
    "https://in.linkedin.com/company/pradhanpackersandmovers-kolkata",
    "https://www.youtube.com/@pradhanpackersandmovers"
  ],
  "foundingDate": "1977-02-25",
  "founder": {
    "@type": "Person",
    "name": "Mr. Himangshu Pradhan"
  }
}

export default function Home() {
  return (
    <React.Fragment>
      {/* Add JSON-LD to your page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <HeroSection />
      <main role="main" className="relative">
        {/* <TrustBadges /> */}
        <AboutSection />
        <ServicesSection />
        {/* <HowItWorksSection /> */}
        <WhyChooseUsSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
    </React.Fragment>
  );
}
