import React from 'react';
import ContactPage from "@/componant/contact/contactPage";

export const metadata = { 
  "title": 'Contact Pradhan Packers and Movers',
  "description": 'Get in touch with Pradhan Packers and Movers, a trusted moving company in Kolkata offering house shifting, car shifting, and storage solution services across India.',
  other: {
    'script:ld+json': JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://pradhanservice.com",
    "url": "https://pradhanservice.com",
    "name": "Contact Pradhan Packers and Movers | Pradhan Packers and Movers Private Limited",
    "description": "Contact Pradhan Packers and Movers Private Limited in Kolkata. Reach out to our customer service team for reliable packing and moving assistance.",
    "mainEntity": {
      "@type": "MovingCompany",
      "name": "Pradhan Packers and Movers Private Limited",
      "priceRange": "₹₹",
      "url": "https://pradhanservice.com",
      "image": "https://pradhanservice.com/logo.png",
      "telephone": "+91 9830070983",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "P-61, Bijan Kanan,",
        "addressLocality": "Brahmapur, Kolkata,",
        "addressRegion": "West Bengal",
        "postalCode": "700096",
        "addressCountry": "IN"
      }
    } 
    }),
  },
}

export default function Contact() { 
  return <ContactPage />
}