import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | Pradhan Packers & Movers',
  description: 'Read the Terms and Conditions of Pradhan Packers and Movers covering service scope, pricing, liability, and client responsibilities for safe and transparent moving services.',
};

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container px-4 relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-6 tracking-tight">
            Terms & <span className="text-secondary italic">Conditions</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium">
            Operational guidelines and service agreements for our logistics network.
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
                {/* Using standard anchor links to jump to sections without needing "use client" */}
                <li><a href="#acceptance" className="hover:text-secondary transition-colors block">1. Acceptance of Terms</a></li>
                <li><a href="#inquiries" className="hover:text-secondary transition-colors block">2. Inquiries & Quotations</a></li>
                <li><a href="#service-scope" className="hover:text-secondary transition-colors block">3. Scope of Services</a></li>
                <li><a href="#client-duties" className="hover:text-secondary transition-colors block">4. Client Responsibilities</a></li>
                <li><a href="#prohibited" className="hover:text-secondary transition-colors block">5. Prohibited Items</a></li>
                <li><a href="#liability" className="hover:text-secondary transition-colors block">6. Insurance & Liability</a></li>
                <li><a href="#governing-law" className="hover:text-secondary transition-colors block">7. Governing Law</a></li>
              </ul>
            </div>
          </aside>

          {/* Main Content Box */}
          <section className="w-full lg:w-3/4 bg-white p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-2xl shadow-primary/10 border border-gray-100">
            <div className="space-y-16 text-gray-600 leading-relaxed">
              
              {/* scroll-mt-32 ensures the header doesn't get covered when the link jumps here */}
              <div id="acceptance" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  Welcome to Pradhan Packers & Movers. By accessing our website, submitting an inquiry form, or utilizing our digital platforms to request relocation estimates, you agree to comply with and be bound by the following Terms and Conditions.
                </p>
                <p>
                  These terms govern your use of our digital platforms. Any actual relocation services provided will be governed by a separate, physical contract signed off-platform after the final inspection of goods.
                </p>
              </div>

              <div id="inquiries" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">2. Inquiries, Quotations, and Pricing</h2>
                <p className="mb-4">
                  Our website operates strictly as a lead-generation and inquiry platform. We do not process online payments, nor do we finalize binding contracts through web forms.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong className="text-primary">Estimates:</strong> All quotes generated via our website or provided over the phone based on your digital inquiry are preliminary estimates. Final pricing is subject to a physical or detailed virtual survey of the inventory.</li>
                  <li><strong className="text-primary">Validity:</strong> Offline quotations provided after an inquiry are valid for a period of 15 days from the date of issuance.</li>
                  <li><strong className="text-primary">Payments:</strong> No payments are collected via this website. All financial transactions, advances, and final settlements are handled offline via bank transfer, physical terminal, or cash as outlined in the offline service agreement.</li>
                </ul>
              </div>

              <div id="service-scope" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">3. Scope of Services</h2>
                <p className="mb-4">
                  Pradhan Packers & Movers provides packing, loading, transportation, and unloading services. Upon submitting an inquiry, our team will contact you to detail the exact scope of your move.
                </p>
                <p>
                  Any additional services requested on the day of the move that were not declared during the initial inquiry phase (such as hoisting heavy furniture, excessive stair carries, or handling highly fragile items) will result in a revision of the offline quotation.
                </p>
              </div>

              <div id="client-duties" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">4. Client Responsibilities</h2>
                <p className="mb-4">To ensure a smooth estimation and relocation process, clients are expected to:</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>Provide highly accurate inventory details when filling out website inquiry forms.</li>
                  <li>Ensure all necessary permissions are obtained from building management or local authorities for the loading and unloading of moving vehicles.</li>
                  <li>Be physically present, or have an authorized representative present, during the packing and loading phases to verify the inventory list.</li>
                </ul>
              </div>

              <div id="prohibited" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">5. Prohibited Items</h2>
                <p className="mb-4">
                  For legal and safety reasons, we strictly prohibit the transportation of hazardous or illegal materials. By submitting an inquiry for our services, you agree not to include the following items in your shipment:
                </p>
                <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 mt-6">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> Flammable liquids or gases</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> Firearms, ammunition, or explosives</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> Perishable food or agricultural items</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> Illegal narcotics or contraband</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> Live animals or uncertified plants</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> Currency, high-value jewelry, or deeds</li>
                  </ul>
                </div>
              </div>

              <div id="liability" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">6. Insurance & Liability</h2>
                <p className="mb-4">
                  While our platform facilitates the booking inquiry, all liability regarding the physical safety of goods is governed by our offline transit policies. We strongly advise clients to declare the actual value of their goods and opt for comprehensive transit insurance during the offline quotation process.
                </p>
                <p>
                  Pradhan Packers & Movers shall not be held liable for internal damage to electronic appliances if the external casing shows no signs of physical impact, nor for damages arising from force majeure events.
                </p>
              </div>

              <div id="governing-law" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">7. Governing Law</h2>
                <p>
                  These Terms and Conditions, and any disputes arising from the use of this website or the subsequent services provided, shall be governed by and construed in accordance with the laws of India. Any legal proceedings shall be subject to the exclusive jurisdiction of the courts in Kolkata, West Bengal.
                </p>
              </div>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}