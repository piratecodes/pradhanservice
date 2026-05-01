"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

import icon from '@/assets/footerIcon.png';

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
        
        if (result.success && result.data && result.data.contact) {
          setContactData((prev) => ({ ...prev, ...result.data.contact }));
        }
      } catch (error) {
        console.error("Failed to fetch footer contact info:", error);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 md:py-16 rounded-t-[5rem]" role="Footer">
      <div className="container px-4 mx-auto">
        
        {/* 🌟 THE MAIN SPLIT: Left (Profile) vs Right (The 3 Data Blocks) */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-60">
          
          {/* ================= LEFT PART: Company Profile ================= */}
          <div className="flex flex-col gap-4 w-full lg:w-[25%] shrink-0">
            <Link href="/" className="flex items-center space-x-3 shrink-0">
              <Image 
                src={icon} 
                alt="Pradhan Logo" 
                className="h-10 w-auto object-contain" 
                draggable={false} 
                priority
              />
              <span className="self-center text-xl text-gray-200 font-black whitespace-nowrap tracking-tight">Pradhan Services</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mt-2">
              Your trusted partner for safe, hassle-free, and premium relocation services across India. We ensure your belongings reach their destination securely and on time.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-3 mt-2">
              {contactData.facebookUrl && (
                <a href={contactData.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors">
                  <Facebook size={16} />
                </a>
              )}
              {contactData.instagramUrl && (
                <a href={contactData.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-colors">
                  <Instagram size={16} />
                </a>
              )}
              {contactData.linkedinUrl && (
                <a href={contactData.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors">
                  <Linkedin size={16} />
                </a>
              )}
              {contactData.twitterUrl && (
                <a href={contactData.twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-colors">
                  <Twitter size={16} />
                </a>
              )}
              <a href="https://www.youtube.com/@pradhanpackersandmovers" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-colors">
                  <Youtube size={16} />
              </a>
            </div>
          </div>


          {/* ================= RIGHT PART: Systematic Data Grid ================= */}
          {/* Using a 12-column internal grid to divide the 3 boxes systematically */}
          <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-2">
            
            {/* Quick Links (Takes 3/12 of the right side) */}
            <div className="flex flex-col gap-4 lg:col-span-3">
              <h4 className="text-white font-semibold mb-1">Quick Links</h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li><Link href="/" className="hover:text-secondary transition-colors">Home</Link></li>
                <li><Link href="/photo-gallery" className="hover:text-secondary transition-colors">Gallery</Link></li>
                <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Contact Info (Takes 4/12 of the right side) */}
            <div className="flex flex-col gap-4 lg:col-span-4">
              <h4 className="text-white font-semibold mb-1">Contact Us</h4>
              <ul className="flex flex-col gap-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-0.5 shrink-0">📍</span>
                  <span className="text-slate-400 leading-relaxed">{contactData.headOfficeAddress}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-secondary shrink-0">📞</span>
                  <a href={`tel:${contactData.primaryPhone.replace(/\s/g,'')}`} className="text-slate-400 hover:text-secondary transition-colors truncate">
                    {contactData.primaryPhone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-secondary shrink-0">✉️</span>
                  <a href={`mailto:${contactData.supportEmail}`} className="text-slate-400 hover:text-secondary transition-colors truncate">
                    {contactData.supportEmail}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Box (Takes 5/12 of the right side) */}
            <div className="flex flex-col lg:col-span-5 sm:col-span-2">
              {/* 🌟 FIX: Drastically reduced padding (p-4), margins, and text size to make it sleek */}
              <div className="px-3.5 py-2.5 bg-slate-800/40 hover:bg-slate-800 transition-colors duration-300 rounded-xl border border-slate-700/50 shadow-lg shadow-black/10">
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shrink-0"></span>
                  <p className="text-[11px] text-secondary font-black tracking-widest uppercase">Government Approved</p>
                </div>
                
                <ul className="space-y-2 text-xs text-slate-400 font-medium">
                  <li className="flex justify-between items-center gap-3">
                    <strong className="text-slate-300 shrink-0">GST No:</strong> 
                    <span className="text-right tracking-wide">19AANCP7639J1ZL</span>
                  </li>
                  <li className="flex justify-between items-center gap-3">
                    <strong className="text-slate-300 shrink-0">UDYAM Reg:</strong> 
                    <span className="text-right tracking-wide">UDYAN-WB-18-0052046</span>
                  </li>
                  <li className="flex justify-between items-center gap-3">
                    <strong className="text-slate-300 shrink-0">Trade License:</strong> 
                    <span className="text-right tracking-wide">0917P387223145863</span>
                  </li>
                  <li className="pt-2 mt-2 border-t border-slate-700/80 text-[10px] text-slate-300 font-semibold leading-relaxed">
                    ISO 9001:2015, 14001:2015 & 45001:2018 Certified Company
                  </li>
                </ul>

              </div>
            </div>

          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} Pradhan Services. All rights reserved.</p>
            <p className='font-extrabold text-slate-500'>
              Developed by:{' '}
              <Link 
                href="https://straxcel.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-semibold text-slate-400 hover:text-secondary transition-colors"
              >
                Straxcel Business Solutions
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}