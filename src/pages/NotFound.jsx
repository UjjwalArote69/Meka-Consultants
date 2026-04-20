import React from "react";
import { Link } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-[#B38356] selection:text-white overflow-hidden flex flex-col">
      <title>Page Not Found — Meka Consultants</title>
      <meta name="description" content="The page you are looking for does not exist or has been moved." />
      <meta name="robots" content="noindex" />

      <Navbar />

      <main className="flex-1 flex items-center">
        <section className="w-full pt-40 pb-24 lg:pt-52 lg:pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-between items-start gap-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-12">
              <span>File · MC-2026-404</span>
              <span>§ ∅ · Not Found</span>
              <span>Status · 404</span>
            </div>

            <p className="text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase flex items-center gap-4 mb-6">
              <span className="w-8 h-px bg-[#B38356]" /> Off the map
            </p>

            <h1 className="font-serif text-slate-900 tracking-tight leading-[0.95] text-5xl md:text-7xl lg:text-[7rem] mb-10">
              <span className="block">This page</span>
              <span className="block text-[#B38356] italic font-light">
                doesn't exist.
              </span>
            </h1>

            <p className="max-w-2xl text-slate-600 text-base md:text-lg leading-relaxed font-light mb-12">
              The address you followed may be outdated, mistyped, or refer to a
              document we've since retired. Return to familiar ground below.
            </p>

            <nav aria-label="Primary destinations" className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200 max-w-3xl">
              {[
                { to: "/", label: "Home" },
                { to: "/services", label: "Services" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="bg-[#FAFAFA] px-6 py-6 text-xs tracking-[0.25em] uppercase font-bold text-slate-700 hover:bg-white hover:text-[#B38356] transition-colors text-center"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
