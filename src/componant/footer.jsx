"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Loader2, MessageCircle } from 'lucide-react';

export default function Footer() {
  // 1. Create state with fallbacks that perfectly match your API keys
  const [contactData, setContactData] = useState({
    facebookUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    twitterUrl: '',
    headOfficeAddress: 'Bhawanipur 25A, Asutosh Mukherjee Road, Kolkata, West Bengal, India',
    primaryPhone: '+91 98765 43210',
    supportEmail: 'info@pradhanservice.com'
  });

  // 2. Fetch the data from your API
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/`);
        const result = await response.json();
        
        // Match the exact structure of your API response
        if (result.success && result.data && result.data.contact) {
          // Merge the fetched data with our defaults so empty fields don't break the UI
          setContactData((prev) => ({ ...prev, ...result.data.contact }));
        }
      } catch (error) {
        console.error("Failed to fetch footer contact info:", error);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 md:py-16">
      <div className="container px-4 mx-auto max-w-7xl">
        
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          
          {/* LEFT SIDE: Brand & About */}
          <div className="flex flex-col gap-4 w-full lg:w-1/3 lg:pr-8">
            <Link href="/" className="inline-block">
              <Image 
                src="https://dummyimage.com/200x60/1e293b/ffffff&text=Pradhan+Packers" 
                alt="Pradhan Packers Logo" 
                width={200} 
                height={60} 
                className="object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mt-2">
              Your trusted partner for safe, hassle-free, and premium relocation services across India. We ensure your belongings reach their destination securely and on time.
            </p>
            
            {/* DYNAMIC Social Media Icons */}
            <div className="flex items-center gap-3 mt-4">
              {contactData.facebookUrl && (
                <a href={contactData.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
              )}
              {contactData.instagramUrl && (
                <a href={contactData.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
              )}
              {contactData.linkedinUrl && (
                <a href={contactData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
              )}
              {contactData.twitterUrl && (
                <a href={contactData.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: The 3 Columns */}
          <div className="w-full lg:w-2/5 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:pl-12 xl:pl-24">
            
            {/* Column 1: Quick Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold mb-2">Quick Links</h4>
              <ul className="flex flex-col gap-3 text-sm">
                <li><Link href="/" className="hover:text-secondary transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
                <li><Link href="/how-it-works" className="hover:text-secondary transition-colors">How It Works</Link></li>
                <li><Link href="/testimonials" className="hover:text-secondary transition-colors">Testimonials</Link></li>
                <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 2: Services */}
            {/* <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold mb-2">Our Services</h4>
              <ul className="flex flex-col gap-3 text-sm">
                <li><Link href="/services/local" className="hover:text-secondary transition-colors">Local Shifting</Link></li>
                <li><Link href="/services/inter-state" className="hover:text-secondary transition-colors">Inter State</Link></li>
                <li><Link href="/services/office" className="hover:text-secondary transition-colors">Office Relocation</Link></li>
                <li><Link href="/services/storage" className="hover:text-secondary transition-colors">Secure Storage</Link></li>
                <li><Link href="/services/vehicle" className="hover:text-secondary transition-colors">Vehicle Transport</Link></li>
              </ul>
            </div> */}

            {/* Column 3: DYNAMIC Contact Info */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold mb-2">Contact Us</h4>
              <ul className="flex flex-col gap-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-0.5">📍</span>
                  <span className="text-slate-400">{contactData.headOfficeAddress}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-secondary">📞</span>
                  <a href={`tel:${contactData.primaryPhone.replace(/\s/g,'')}`} className="text-slate-400 hover:text-secondary transition-colors">
                    {contactData.primaryPhone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-secondary">✉️</span>
                  <a href={`mailto:${contactData.supportEmail}`} className="text-slate-400 hover:text-secondary transition-colors">
                    {contactData.supportEmail}
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Pradhan Packers. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-condition" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}