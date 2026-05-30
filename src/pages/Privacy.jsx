import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-[#B38356] selection:text-white overflow-hidden">
      <title>Privacy Policy — Meka Consultants</title>
      <meta name="description" content="Privacy policy for Meka Consultants — how we collect, use, and protect your information." />

      <Navbar />

      <main>
        <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-24 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 flex flex-wrap justify-between items-start gap-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-500">
            <span>File · MC-2026-PRV</span>
            <span>§ X · Privacy</span>
            <span>Last Updated · {new Date().getFullYear()}</span>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <p className="text-[#8B5E3C] font-bold tracking-[0.3em] text-[10px] uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#B38356]" /> Privacy Policy
            </p>

            <h1 className="font-serif text-slate-900 tracking-tight leading-[1.05] text-5xl md:text-7xl lg:text-[7rem] mb-10">
              <span className="block">How we handle</span>
              <span className="block text-[#8B5E3C] italic font-light">your data.</span>
            </h1>

            <p className="max-w-2xl text-slate-600 text-base md:text-lg leading-relaxed font-light">
              This policy describes what information Meka Consultants collects,
              how we use it, and the choices you have. Full policy to follow.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-12 text-slate-700 font-light leading-relaxed">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4">1. Information We Collect</h2>
              <p>Details of the categories of information we collect will be published here. Contact us directly in the interim.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4">2. How We Use Information</h2>
              <p>We use collected information to deliver our services, respond to enquiries, and improve our practice offerings.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4">3. Data Retention & Security</h2>
              <p>We retain information only as long as necessary for the purposes described, and apply reasonable safeguards to protect it.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4">4. Your Rights</h2>
              <p>You may request access, correction, or deletion of personal information we hold about you by writing to us.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4">5. Contact</h2>
              <p>Questions about this policy? Write to us at <a href="mailto:mail@meka.com" className="text-slate-900 border-b border-slate-300 hover:border-[#B38356] hover:text-[#8B5E3C] transition-colors">mail@meka.com</a>.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
