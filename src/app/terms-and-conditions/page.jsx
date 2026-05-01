import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | Pradhan Packers & Movers',
  description: 'Read the Terms and Conditions of Pradhan Packers and Movers covering service scope, pricing, liability, safety policies, and client responsibilities.',
};

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-gray-50/50" role="main" aria-label="Terms and Conditions of Pradhan Packers and Movers">
      <div className="container px-4 relative z-10 mx-auto max-w-7xl">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-6 tracking-tight">
            Terms & <span className="text-secondary italic">Conditions</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">
            Operational guidelines, corporate policies, and service agreements for our comprehensive logistics network.
          </p>
          <p className="text-sm text-gray-400 mt-4 font-bold">Effective Date: March 2026</p>
        </div>

        {/* Layout: Sticky Sidebar + Content Box */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="hidden lg:block w-1/4 sticky top-32 shrink-0">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-primary/5 border border-gray-100">
              <h4 className="font-bold text-primary mb-6 uppercase tracking-widest text-xs">Table of Contents</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                <li><Link href="#acceptance" className="hover:text-secondary transition-colors block">1. Acceptance of Terms</Link></li>
                <li><Link href="#vision-dna" className="hover:text-secondary transition-colors block">2. Corporate Vision & DNA</Link></li>
                <li><Link href="#safety-scope" className="hover:text-secondary transition-colors block">3. Service Scope & Safety Policy</Link></li>
                <li><Link href="#quotations-pricing" className="hover:text-secondary transition-colors block">4. Quotations & Pricing</Link></li>
                <li><Link href="#client-duties" className="hover:text-secondary transition-colors block">5. Client Responsibilities</Link></li>
                <li><Link href="#prohibited" className="hover:text-secondary transition-colors block">6. Prohibited Items</Link></li>
                <li><Link href="#insurance-liability" className="hover:text-secondary transition-colors block">7. Insurance & Liability</Link></li>
                <li><Link href="#payment-terms" className="hover:text-secondary transition-colors block">8. Payment Terms & Billing</Link></li>
                <li><Link href="#governing-law" className="hover:text-secondary transition-colors block">9. Governing Law</Link></li>
              </ul>
            </div>
          </aside>

          {/* Main Content Box */}
          <section className="w-full lg:w-3/4 bg-white p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-2xl shadow-primary/10 border border-gray-100">
            <div className="space-y-16 text-gray-600 leading-relaxed">
              
              {/* SECTION 1 */}
              <div id="acceptance" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  Welcome to Pradhan Packers & Movers Pvt. Ltd. By accessing our website, submitting an inquiry form, or engaging our relocation services, you agree to comply with and be bound by the following Terms and Conditions. 
                </p>
                <p>
                  These terms govern both your use of our digital platforms and the physical execution of our relocation services. Please review them carefully to ensure a smooth, transparent, and secure moving experience.
                </p>
              </div>

              {/* SECTION 2 */}
              <div id="vision-dna" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">2. Corporate Vision & DNA</h2>
                <p className="mb-6">
                  Our overarching mission is to be the first choice for customers by providing convenient access to high-quality relocation services across all geographies. We strive to offer affordable pricing while consistently exceeding expectations regarding turnaround times. Furthermore, we are dedicated to collaborating with our channel partners and vendors to foster sustainable, profitable growth and establish long-term partnerships.
                </p>
                
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                  <h3 className="text-sm font-bold text-primary mb-4 uppercase tracking-widest">Our Core DNA</h3>
                  <div className="grid grid-cols-1 gap-y-4 text-gray-800">
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0"></span> 
                      <p><strong className="text-primary">Customer First:</strong> Prioritizing client needs above all else.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0"></span> 
                      <p><strong className="text-primary">Fast & On Time:</strong> Unwavering commitment to punctuality.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0"></span> 
                      <p><strong className="text-primary">Highly Accountable:</strong> Taking full responsibility for our services.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0"></span> 
                      <p><strong className="text-primary">Always Connected:</strong> Maintaining clear, transparent communication.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3 */}
              <div id="safety-scope" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">3. Service Scope & Safety Policy</h2>
                <p className="mb-4">
                  Pradhan Packers & Movers provides comprehensive packing, loading, transportation, and unloading services. We are deeply committed to conducting our operations with the utmost respect and care for both people and the environment.
                </p>
                <p className="mb-6">
                  To ensure a secure working environment, we actively prevent incidents and occupational illnesses by providing adequate control of health and safety risks arising from our work activities. We are dedicated to continually improving our safety, health, and environmental performance. We continuously educate our employees on safety protocols and strive for the responsible utilization of natural resources.
                </p>
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                  <span className="text-2xl">🌱</span>
                  <p className="text-sm font-bold text-emerald-800">
                    Environmental Initiative: We proudly plant at least 101 trees every year to offset our carbon footprint.
                  </p>
                </div>
              </div>

              {/* SECTION 4 */}
              <div id="quotations-pricing" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">4. Quotations & Pricing</h2>
                <p className="mb-4">
                  All initial estimates provided via our website or phone are preliminary. Final pricing is established following a physical or detailed virtual survey of your inventory. The quoted rates are calculated based on the use of our standard, high-quality packing materials required for the safe transit of your household articles.
                </p>
                <p>
                  Please note that any specialized wooden packing required on the moving date will incur additional charges. Furthermore, if you require temporary warehousing, we offer secure storage facilities at a nominal additional charge.
                </p>
              </div>

              {/* SECTION 5 */}
              <div id="client-duties" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">5. Client Responsibilities</h2>
                <p className="mb-6">
                  To facilitate a seamless relocation process, we require clients to provide prior intimation of at least 4 to 5 days before the scheduled packing date. 
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold shrink-0">•</span>
                    <p><strong className="text-gray-900">Custody of Valuables:</strong> Clients must secure all valuable items—including essential documents, cash, jewelry, daily medications, keys, and electronic remotes—under their personal custody before our packing crew begins the shifting process.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold shrink-0">•</span>
                    <p><strong className="text-gray-900">Permissions and Access:</strong> It is the client's responsibility to verify and secure all necessary permissions from building societies or local authorities regarding vehicle entry timings. Any restrictions concerning morning, evening, or Sunday shifts must be resolved prior to the moving date.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold shrink-0">•</span>
                    <p><strong className="text-gray-900">Vehicle Transportation:</strong> If your relocation includes car transportation, please ensure the vehicle contains a minimum of 10 liters of petrol to facilitate essential loading and unloading maneuvers.</p>
                  </li>
                </ul>
              </div>

              {/* SECTION 6 */}
              <div id="prohibited" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">6. Prohibited Items</h2>
                <p className="mb-6">
                  For legal compliance and the safety of our crew and your belongings, certain items are strictly prohibited from transport. By engaging our services, you agree not to pack or request the movement of the following items:
                </p>
                <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-gray-200">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-gray-700">
                    <li className="flex items-center gap-2"><span className="text-red-500 text-lg">⨯</span> Jewelry & High-Value Assets</li>
                    <li className="flex items-center gap-2"><span className="text-red-500 text-lg">⨯</span> Arms & Ammunitions</li>
                    <li className="flex items-center gap-2"><span className="text-red-500 text-lg">⨯</span> Crackers & Explosives</li>
                    <li className="flex items-center gap-2"><span className="text-red-500 text-lg">⨯</span> Battery Acids & Corrosive Chemicals</li>
                    <li className="flex items-center gap-2"><span className="text-red-500 text-lg">⨯</span> Inflammable Oils (Diesel, Petrol, Kerosene)</li>
                    <li className="flex items-center gap-2"><span className="text-red-500 text-lg">⨯</span> Narcotics & Illegal Contraband</li>
                  </ul>
                </div>
              </div>

              {/* SECTION 7 */}
              <div id="insurance-liability" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">7. Insurance & Liability</h2>
                <p className="mb-6">
                  To protect your consignment against carrier risks, natural hazards, or unforeseen circumstances, we strongly advise clients to insure their goods. An individual insurance policy and receipt will be provided directly by the respective insurance company.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold shrink-0">•</span>
                    <p><strong className="text-gray-900">Limitations of Liability:</strong> Pradhan Packers & Movers assumes no liability for internal damages to items where the external packaging remains intact. Furthermore, we do not cover damages to any goods that were not directly packed by our authorized crew.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold shrink-0">•</span>
                    <p><strong className="text-gray-900">Force Majeure:</strong> Our company and its agents are explicitly exempted from any claims of loss or damage resulting from uncontrollable events, including accidents, pilferage, fire, rain collisions, or any other natural or road hazards. Without comprehensive insurance, no claims for loss or damage will be entertained.</p>
                  </li>
                </ul>
              </div>

              {/* SECTION 8 */}
              <div id="payment-terms" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">8. Payment Terms & Billing</h2>
                <p className="mb-6">
                  To initiate your relocation order, a 20% advance payment is required along with your official purchase order. The remaining balance must be settled in full upon completion at the loading point. Additionally, if you have opted for transit insurance, the insurance premium must be paid at the loading point prior to the departure of your consignment.
                </p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-secondary font-bold shrink-0">•</span>
                    <p><strong className="text-gray-900">Accepted Payment Modes:</strong> All payments must be made via NEFT, RTGS, Demand Draft (DD), or Cash, drawn exclusively in favor of <strong>Pradhan Packers And Movers Pvt. Ltd.</strong></p>
                  </li>
                </ul>
                <div className="bg-red-50 p-5 rounded-xl border border-red-100 flex items-start gap-3">
                  <span className="text-red-600 text-xl font-bold mt-0.5">!</span>
                  <p className="text-sm font-semibold text-red-900">
                    Late Payment Policy: In the event that payment is not completed within 15 days of the invoice date, an interest charge of 24% per annum will be applied to the outstanding balance.
                  </p>
                </div>
              </div>

              {/* SECTION 9 */}
              <div id="governing-law" className="scroll-mt-32">
                <h2 className="text-2xl font-black text-primary mb-4">9. Governing Law</h2>
                <p>
                  These Terms and Conditions, alongside any disputes arising from the provision of our logistics services, shall be governed by and construed in accordance with the laws of India. Any legal proceedings shall be subject to the exclusive jurisdiction of the competent courts in Kolkata, West Bengal.
                </p>
              </div>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}