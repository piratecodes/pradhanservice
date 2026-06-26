"use client";

import React from 'react';
import { CheckCircle2, XCircle, scale3d } from 'lucide-react';

const comparisonData = [
  { feature: 'Vehicle Assurance', local: true, pradhan: true },
  { feature: 'Verified Professional Driver', local: false, pradhan: true },
  { feature: 'Real-time Shifting Updates', local: false, pradhan: true },
  { feature: 'Premium Household Packaging', local: true, pradhan: true },
  { feature: 'Furniture Dismantling & Assembly', local: true, pradhan: true },
  { feature: 'Trained & Uniformed Labour', local: false, pradhan: true },
  { feature: 'Multi-layer Fragile Wrapping', local: false, pradhan: true },
  { feature: 'On-demand Storage Add-on', local: false, pradhan: true },
  { feature: 'Comprehensive Damage Assurance', local: false, pradhan: true },
];

export default function ServiceComparison({ cityName }) {
  const displayCity = cityName || 'Your City';

  return (
    <section className="container px-4 py-20 lg:py-28 relative z-10 border-t border-gray-50">
      
      {/* Header Area */}
      <div className="flex flex-col items-center text-center space-y-4 mb-16 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 text-secondary rounded-full font-bold text-xs uppercase tracking-widest">
           Market Analysis
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight">
          How We Compare in <span className="text-secondary italic">{displayCity}</span>
        </h2>
        <p className="text-gray-500 text-lg font-medium leading-relaxed">
          Before you hand over your keys, see what you are really getting. We stack up typical local movers against the Pradhan Standard to help you choose with your eyes open.
        </p>
      </div>

      {/* Table Container with Premium Settlement */}
      <div className="relative group">
        {/* Background Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-secondary/5 rounded-full blur-[120px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

        <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="py-8 px-8 md:px-12 font-black text-primary text-xl w-1/2">
                    Features & Services
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">The Quality Audit</p>
                  </th>
                  <th className="py-8 px-4 font-black text-gray-400 text-center w-1/4">
                    Local Vendors
                  </th>
                  <th className="py-8 px-4 font-black text-secondary text-center w-1/4 bg-primary/5 border-l border-white">
                    Pradhan Standard
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {comparisonData.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50/30 transition-colors group/row">
                    <td className="py-6 px-8 md:px-12 text-base font-bold text-primary/80 group-hover/row:text-primary transition-colors">
                      {row.feature}
                    </td>
                    <td className="py-6 px-4 text-center">
                      {row.local ? (
                        <CheckCircle2 className="mx-auto text-gray-300" size={24} />
                      ) : (
                        <XCircle className="mx-auto text-red-300 opacity-40" size={24} strokeWidth={1.5} />
                      )}
                    </td>
                    <td className="py-6 px-4 text-center border-l border-white bg-primary/[0.02] group-hover/row:bg-primary/[0.04] transition-colors">
                      <div className="flex justify-center">
                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shadow-sm">
                           <CheckCircle2 size={22} strokeWidth={3} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              
            </table>
          </div>

          {/* Table Footer / Trust Message */}
          <div className="p-8 bg-primary text-center">
            <p className="text-white/60 text-sm font-bold tracking-tight">
              Don&apos;t settle for a single quote. <span className="text-secondary italic">Settle for a guaranteed standard of care.</span>
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}