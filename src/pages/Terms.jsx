import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-[#B38356] selection:text-white overflow-hidden">
      <title>Terms & Conditions — Meka Consultants</title>
      <meta name="description" content="Terms and conditions governing the use of the Meka Consultants website and services." />

      <Navbar />

      <main>
        <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-24 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 flex flex-wrap justify-between items-start gap-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-500">
            <span>File · MC-2026-TRM</span>
            <span>§ XI · Terms</span>
            <span>Last Updated · {new Date().getFullYear()}</span>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <p className="text-[#8B5E3C] font-bold tracking-[0.3em] text-[10px] uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#B38356]" /> Terms & Conditions
            </p>

            <h1 className="font-serif text-slate-900 tracking-tight leading-[1.05] text-5xl md:text-7xl lg:text-[7rem] mb-10">
              <span className="block">The terms of</span>
              <span className="block text-[#8B5E3C] italic font-light">engagement.</span>
            </h1>

            <p className="max-w-2xl text-slate-600 text-base md:text-lg leading-relaxed font-light">
              By accessing this site and engaging our services, you agree to the
              terms below. Full terms to follow; reach out for the current draft.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-12 text-slate-700 font-light leading-relaxed">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4">1. Use of Site</h2>
              <p>This website is provided for informational purposes. Content is owned by Meka Consultants and may not be reproduced without permission.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4">2. Engagement Terms</h2>
              <p>Consulting engagements are governed by separate written agreements. The terms on this site do not substitute for those agreements.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4">3. Intellectual Property</h2>
              <p>All trademarks, logos, and content remain the property of Meka Consultants or their respective owners.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4">4. Limitation of Liability</h2>
              <p>The site and its content are provided "as is" without warranties. Meka Consultants is not liable for indirect or consequential losses arising from site use.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4">5. Governing Law</h2>
              <p>These terms are governed by the laws applicable to the jurisdiction in which Meka Consultants operates.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4">6. Contact</h2>
              <p>Questions about these terms? Write to us at <a href="mailto:mail@meka.com" className="text-slate-900 border-b border-slate-300 hover:border-[#B38356] hover:text-[#8B5E3C] transition-colors">mail@meka.com</a>.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
