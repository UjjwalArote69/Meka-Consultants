import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowUpRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * MEKA Consultants — Footer
 * Palette (shared with Dredging): Ink #050A15 / Base #FAFAFA / Bronze #B38356
 * Layout distinctions from Dredging (which uses dark navy footer with a
 * glowing blob and a 3-column layout after the brand block):
 *   - LIGHT cream background
 *   - Tagline-triad masthead with primary CTA at the top
 *   - Consulting service list (not dredging services)
 *   - Regulatory note from mekaconsultants.com
 */
export default function Footer() {
  const footerRef = useRef(null);
  const ctaRef = useRef(null);
  const columnsRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
          }
        );
      }

      if (columnsRef.current) {
        const cols = columnsRef.current.querySelectorAll(".footer-col");
        gsap.fromTo(
          cols,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: columnsRef.current, start: "top 90%" },
          }
        );
      }

      if (bottomRef.current) {
        gsap.fromTo(
          bottomRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: { trigger: bottomRef.current, start: "top 95%" },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#FAFAFA] text-slate-900 border-t border-slate-200 relative z-10 overflow-hidden"
    >
      {/* ── CTA MASTHEAD ── */}
      <div
        ref={ctaRef}
        className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 md:pt-32 pb-16 md:pb-20"
      >
        <p className="text-[#B38356] text-[10px] tracking-[0.3em] uppercase font-bold mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[#B38356]" /> Ready to partner
        </p>

        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-4xl">
          Think Smarter.{" "}
          <span className="text-[#B38356] italic">Grow Faster.</span>{" "}
          Lead Confidently.
        </h2>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-slate-900 hover:bg-[#B38356] text-white px-8 py-4 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#B38356]/20"
          >
            Start a Conversation
            <ArrowUpRight
              size={14}
              className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
          <a
            href="mailto:mail@meka.com"
            className="text-sm font-light text-slate-600 hover:text-slate-900 transition-colors border-b border-transparent hover:border-slate-900 pb-0.5"
          >
            mail@meka.com
          </a>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20">
          {/* ── COLUMNS ── */}
          <div
            ref={columnsRef}
            className="grid grid-cols-1 md:grid-cols-12 gap-12"
          >
            {/* Brand */}
            <div className="md:col-span-5 footer-col">
              <Link to="/">
                <span className="font-serif text-2xl md:text-3xl tracking-tight text-slate-900 block mb-6 hover:opacity-80 transition-opacity">
                  MEKA <span className="text-[#B38356] italic">Consultants</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed max-w-sm font-light text-slate-600 mb-8">
                A professional services firm delivering strategic consulting
                and outsourced manpower solutions. A proud member of the Meka
                Group.
              </p>

              <div className="text-sm font-light text-slate-600 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-[#B38356]" />
                  <p className="leading-relaxed">
                    20 Madhuli Dr. A B Road, Worli
                    <br />
                    Mumbai (400 018) India
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={14} className="shrink-0 text-[#B38356]" />
                  <a
                    href="tel:+912240890000"
                    className="hover:text-[#B38356] transition-colors"
                  >
                    +91 22 4089 0000
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={14} className="shrink-0 text-[#B38356]" />
                  <a
                    href="mailto:mail@meka.com"
                    className="hover:text-[#B38356] transition-colors"
                  >
                    mail@meka.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={14} className="shrink-0 text-[#B38356]" />
                  <span>Mon–Fri · 9am – 5pm IST</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="md:col-span-3 md:col-start-7 footer-col">
              <h4 className="text-slate-900 text-[10px] tracking-[0.25em] uppercase font-bold mb-6">
                Services
              </h4>
              <ul className="space-y-3.5 text-sm font-light text-slate-600">
                <li>
                  <Link
                    to="/services#strategic"
                    className="hover:text-[#B38356] transition-colors"
                  >
                    Strategic &amp; Management Consulting
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services#operations"
                    className="hover:text-[#B38356] transition-colors"
                  >
                    Operational Excellence
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services#manpower"
                    className="hover:text-[#B38356] transition-colors"
                  >
                    Outsourced Manpower Supply
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services#execution"
                    className="hover:text-[#B38356] transition-colors"
                  >
                    End-to-End Execution Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3 footer-col">
              <h4 className="text-slate-900 text-[10px] tracking-[0.25em] uppercase font-bold mb-6">
                Company
              </h4>
              <ul className="space-y-3.5 text-sm font-light text-slate-600">
                <li>
                  <Link to="/" className="hover:text-[#B38356] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#B38356] transition-colors">
                    About
                  </Link>
                </li>
                {/* <li>
                  <Link to="/blog" className="hover:text-[#B38356] transition-colors">
                    Insights
                  </Link>
                </li> */}
                <li>
                  <Link to="/faq" className="hover:text-[#B38356] transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-[#B38356] transition-colors"
                  >
                    Get in Touch
                  </Link>
                </li>
                <li>
                  <a
                    href="https://meka.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#B38356] transition-colors"
                  >
                    Meka Group <ArrowUpRight size={12} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* ── REGULATORY NOTE ── */}
          <div className="mt-16 pt-8 border-t border-slate-200">
            <p className="text-[11px] text-slate-500 font-light italic max-w-3xl">
              MEKA Consultants provides manpower services only. No machinery or
              equipment is supplied.
            </p>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-slate-200">
        <div
          ref={bottomRef}
          className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center text-xs font-light text-slate-500 gap-3"
        >
          <p>&copy; {new Date().getFullYear()} Meka Group. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms &amp; Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}