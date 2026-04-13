import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const ctaRef = useRef(null);
  const columnsRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA section reveal
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // Columns stagger reveal
      if (columnsRef.current) {
        const cols = columnsRef.current.querySelectorAll('.footer-col');
        gsap.fromTo(cols,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: columnsRef.current,
              start: 'top 90%',
            }
          }
        );
      }

      // Bottom bar fade in
      if (bottomRef.current) {
        gsap.fromTo(bottomRef.current,
          { opacity: 0 },
          {
            opacity: 1, duration: 1.2, ease: 'power2.out',
            scrollTrigger: {
              trigger: bottomRef.current,
              start: 'top 95%',
            }
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#050A15] text-slate-400 py-24 border-t border-white/5 relative z-10 overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#B38356]/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Columns */}
        <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand Column */}
          <div className="md:col-span-5 footer-col">
            <Link to="/">
              <span className="font-serif font-bold text-3xl tracking-widest uppercase text-white block mb-6 hover:opacity-80 transition-opacity">
                Meka <span className="text-[#B38356]">Dredging</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm font-light mb-8 opacity-80">
              A proud division of the Meka Group. Delivering high-performance dredging and coastal development solutions with precision and reliability.
            </p>
            <div className="text-sm font-light opacity-80 space-y-2">
              <p>20 Madhuli Dr. A B Road, Worli</p>
              <p>Mumbai (400 018) India</p>
              <a href="tel:+912240890000" className="block hover:text-[#B38356] transition-colors">+91 22 4089 0000</a>
              <a href="mailto:mail@meka.com" className="block hover:text-[#B38356] transition-colors">mail@meka.com</a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7 footer-col">
            <h4 className="text-white text-[10px] tracking-[0.25em] uppercase font-bold mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm font-light opacity-80">
              <li><Link to="/" className="hover:text-[#B38356] hover:opacity-100 transition-all">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#B38356] hover:opacity-100 transition-all">About</Link></li>
              <li><Link to="/services" className="hover:text-[#B38356] hover:opacity-100 transition-all">Services</Link></li>
              <li><Link to="/projects" className="hover:text-[#B38356] hover:opacity-100 transition-all">Projects</Link></li>
              <li><a href="https://meka.com/careers" className="hover:text-[#B38356] hover:opacity-100 transition-all">Careers</a></li>
              <li><Link to="/contact" className="hover:text-[#B38356] hover:opacity-100 transition-all">Contact</Link></li>
            </ul>
          </div>

          {/* Services Highlights */}
          <div className="md:col-span-3 footer-col">
            <h4 className="text-white text-[10px] tracking-[0.25em] uppercase font-bold mb-8">Services</h4>
            <ul className="space-y-4 text-sm font-light opacity-80">
              <li><Link to="/services#feasibility" className="hover:text-[#B38356] hover:opacity-100 transition-all">Feasibility Studies</Link></li>
              <li><Link to="/services#planning" className="hover:text-[#B38356] hover:opacity-100 transition-all">Planning & Design</Link></li>
              <li><Link to="/services#assessment" className="hover:text-[#B38356] hover:opacity-100 transition-all">Environmental Assessment</Link></li>
              <li><Link to="/services#supervision" className="hover:text-[#B38356] hover:opacity-100 transition-all">Contract Supervision</Link></li>
              <li><Link to="/services#resolution" className="hover:text-[#B38356] hover:opacity-100 transition-all">Dispute Resolution</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div ref={bottomRef} className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs font-light opacity-60">
          <p>&copy; {new Date().getFullYear()} Meka Dredging. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}