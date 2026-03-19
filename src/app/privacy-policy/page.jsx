import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Pradhan Packers & Movers',
  description: 'Read the Privacy Policy for Pradhan Packers & Movers. Learn how we collect, protect, and use your personal information when you submit moving inquiries on our platform.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-6 tracking-tight">
            Privacy <span className="text-secondary italic">Policy</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium">
            How we collect, protect, and manage your data during the inquiry process.
          </p>
          <p className="text-sm text-gray-400 mt-4">Effective Date: March 2026</p>
        </div>

        {/* Layout: Sticky Sidebar + Content Box */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="hidden lg:block w-1/4 sticky top-32">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-primary/5 border border-gray-100">
              <h4 className="font-bold text-primary mb-6 uppercase tracking-widest text-xs">Contents</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                {/* Anchor links connecting to the scroll-mt divs */}
                <li><a href="#introduction" className="hover:text-secondary transition-colors block">1. Introduction</a></li>
                <li><a href="#collection" className="hover:text-secondary transition-colors block">2. Information We Collect</a></li>
                <li><a href="#usage" className="hover:text-secondary transition-colors block">3. How We Use Data</a></li>
                <li><a href="#third-party" className="hover:text-secondary transition-colors block">4. Third-Party Tracking & CRM</a></li>
                <li><a href="#retention" className="hover:text-secondary transition-colors block">5. Data Retention & Marketing</a></li>
                <li><a href="#security" className="hover:text-secondary transition-colors block">6. Data Security</a></li>
                <li><a href="#contact" className="hover:text-secondary transition-colors block">7. Contact Us</a></li>
              </ul>
            </div>
          </aside>

          {/* Main Content Box */}
          <section className="w-full lg:w-3/4 bg-white p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-2xl shadow-primary/10 border border-gray-100">
            <div className="space-y-16 text-gray-600 leading-relaxed">
              
              <div id="introduction" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">1. Introduction</h2>
                <p className="mb-4">
                  At Pradhan Packers & Movers, we respect your privacy and are committed to protecting the personal data you share with us. This Privacy Policy outlines how we handle the information collected strictly through our lead-generation website and online inquiry forms.
                </p>
                <p>
                  By browsing our website or submitting a request for a moving estimate, you consent to the data collection and usage practices described in this document.
                </p>
              </div>

              <div id="collection" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">2. Information We Collect</h2>
                <p className="mb-4">
                  Because our website operates as an inquiry platform, we collect information necessary to generate accurate moving estimates and contact you regarding your logistics needs. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong className="text-primary">Personal Details:</strong> Your name, email address, and primary phone/WhatsApp number submitted via our forms.</li>
                  <li><strong className="text-primary">Relocation Data:</strong> Moving dates, pickup addresses, destination addresses, and basic inventory details provided to calculate estimates.</li>
                  <li><strong className="text-primary">Automated Usage Data:</strong> Your IP address, browser type, device type, and the pages you visit on our site, collected automatically via cookies.</li>
                </ul>
              </div>

              <div id="usage" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">3. How We Use Your Data</h2>
                <p className="mb-4">We do not process payments or finalize contracts online. Therefore, the data collected on this platform is strictly used to:</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>Contact you directly to provide logistical estimates and moving consultations.</li>
                  <li>Schedule physical or virtual surveys of your inventory based on your inquiry.</li>
                  <li>Analyze website traffic to improve our user experience and service offerings.</li>
                  <li>Comply with legal obligations regarding digital communications.</li>
                </ul>
              </div>

              <div id="third-party" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">4. Third-Party Tracking & CRM Integration</h2>
                <p className="mb-4">
                  To provide you with a seamless experience and to measure the effectiveness of our marketing, we integrate several trusted third-party tools into our website. When you submit an inquiry or browse our site, your data may be processed by:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong className="text-primary">Google Analytics:</strong> We use this to understand how users navigate our site and to improve our digital infrastructure.</li>
                  <li><strong className="text-primary">Facebook Pixel:</strong> This tool helps us measure the success of our advertising campaigns and may be used to show you relevant Pradhan Packers ads on social media.</li>
                  <li><strong className="text-primary">Zoho CRM:</strong> When you submit a lead form, your contact details and moving requirements are securely pushed into our Zoho Customer Relationship Management system so our sales team can efficiently manage your quotation.</li>
                </ul>
                <p className="mt-4 text-sm text-gray-500">
                  These third parties have their own strict privacy policies, and we do not sell your personal data to any external marketing agencies.
                </p>
              </div>

              <div id="retention" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">5. Data Retention & Marketing</h2>
                <p className="mb-4">
                  Once your relocation service is completed, we may retain your basic contact information (email and phone number) in our CRM for administrative records, future service discounts, or occasional marketing communications regarding Pradhan Packers & Movers.
                </p>
                <p>
                  <strong className="text-primary">Your Right to Opt-Out:</strong> If you do not wish to be contacted for future marketing, or if you want your data completely erased from our Zoho CRM after your move is finalized, you may request full data deletion at any time by contacting our support team.
                </p>
              </div>

              <div id="security" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">6. Data Security</h2>
                <p>
                  We implement industry-standard digital security measures, including SSL encryption on our website, to ensure that the contact information and location data you submit through our inquiry forms is transmitted securely to our backend systems and CRM. Access to this data is strictly limited to authorized sales and logistics personnel.
                </p>
              </div>

              <div id="contact" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">7. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy, the third-party tools we use, or if you would like to exercise your right to access or delete your data, please contact our administrative team:
                </p>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 inline-block">
                  <p className="font-bold text-primary mb-1">Pradhan Packers & Movers</p>
                  <p className="flex items-center gap-2 text-primary font-medium">
                    <span className="text-secondary">✉️</span> 
                    <a href="mailto:support@pradhanservice.com" className="hover:text-secondary transition-colors">support@pradhanservice.com</a>
                  </p>
                </div>
              </div>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}