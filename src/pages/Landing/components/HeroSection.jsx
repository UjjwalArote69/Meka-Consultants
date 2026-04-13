import React, { useEffect, useRef } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router"; 
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    num: "01",
    title: "Think Smarter",
    desc: "Strategic & management consulting.",
    href: "/services#strategic",
  },
  {
    num: "02",
    title: "Grow Faster",
    desc: "Operational excellence & process.",
    href: "/services#operations",
  },
  {
    num: "03",
    title: "Lead Confidently",
    desc: "Outsourced manpower & execution.",
    href: "/services#manpower",
  },
];

export default function HeroSection() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Ambient fade in for masthead framing
      tl.fromTo(
        ".frame-element",
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power2.out" },
        0.1
      );

      // 2. Centered Mask Reveal for Headline
      tl.fromTo(
        ".hero-word-inner",
        { y: "110%", rotate: 2 },
        {
          y: "0%",
          rotate: 0,
          duration: 1.2,
          stagger: 0.04,
          ease: "expo.out",
        },
        0.3
      );

      // 3. Reveal Subhead & CTA (sliding up into center)
      tl.fromTo(
        ".hero-ui",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" },
        0.9
      );

      // 4. Reveal the Floating Dock
      tl.fromTo(
        ".floating-dock",
        { y: 40, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" },
        1.1
      );

      // 5. Parallax the background grid slightly on scroll
      gsap.to(".bg-grid", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100dvh] bg-[#FAFAFA] flex flex-col justify-between pt-28 pb-6 lg:pt-32 lg:pb-10 overflow-hidden selection:bg-[#B38356] selection:text-white"
    >
      {/* ── BACKGROUND LAYER ── */}
      <div
        className="bg-grid absolute inset-0 z-0 opacity-[0.03] pointer-events-none origin-top"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #050A15 0, #050A15 1px, transparent 1px, transparent 24px)",
        }}
      />
      
      {/* Subtle Central Glow */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white opacity-80 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex-1 flex flex-col h-full">
        
        {/* MASTHEAD FRAMING */}
        <div className="flex justify-between items-start w-full absolute top-0 left-0 px-6 lg:px-12 pt-6 pointer-events-none">
          <div className="frame-element flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B38356] animate-pulse" />
            <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-slate-500">
              Meka Group
            </p>
          </div>
          <div className="frame-element hidden md:flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">
            <span>Mumbai · India</span>
          </div>
        </div>

        {/* ── CENTERED HERO BODY ── */}
        <div className="flex-1 flex flex-col items-center justify-center text-center mt-10 lg:mt-4 max-w-5xl mx-auto w-full">
          
          <h1 
            className="font-serif text-slate-900 tracking-tight leading-[0.95] text-[3.5rem] md:text-7xl lg:text-[7.5rem] mb-8"
            aria-label="You run the business. We run the people."
          >
            <span className="block flex flex-wrap justify-center gap-x-[0.2em] gap-y-2 mb-2 lg:mb-4">
              {["You", "run", "the", "business."].map((word, i) => (
                <span key={`w1-${i}`} className="overflow-hidden block inline-flex pb-2">
                  <span className="hero-word-inner inline-block origin-top-left">{word}</span>
                </span>
              ))}
            </span>
            <span className="block flex flex-wrap justify-center gap-x-[0.2em] gap-y-2 text-[#B38356] italic font-light">
              {["We", "run", "the", "people."].map((word, i) => (
                <span key={`w2-${i}`} className="overflow-hidden block inline-flex pb-2">
                  <span className="hero-word-inner inline-block origin-top-left">{word}</span>
                </span>
              ))}
            </span>
          </h1>

          <p className="hero-ui text-slate-600 text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto mb-10">
            Strategic clarity, operational excellence, and reliable manpower deployment. 
            <span className="font-medium text-slate-900 block mt-2">You focus on results; we manage the execution.</span>
          </p>
          
          <div className="hero-ui flex flex-wrap items-center justify-center gap-6">
            <Link to="/contact">
              <button className="group relative overflow-hidden bg-slate-900 text-white px-8 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 shadow-2xl shadow-slate-900/10 hover:shadow-[#B38356]/20">
                <span className="relative z-10 flex items-center gap-3">
                  Start a Conversation
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-[#B38356] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
              </button>
            </Link>
            <Link
              to="/services"
              className="text-[11px] tracking-[0.25em] uppercase font-bold text-slate-500 hover:text-[#B38356] transition-colors border-b border-transparent hover:border-[#B38356] pb-1"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* ── FLOATING PILLAR DOCK ── */}
        <div className="mt-auto pt-16 w-full max-w-6xl mx-auto">
          <div className="floating-dock bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(5,10,21,0.05)] border border-slate-200/60 overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {pillars.map((p) => (
              <Link
                key={p.num}
                to={p.href}
                className="group relative block p-8 lg:p-10 hover:bg-[#FAFAFA] transition-colors duration-500"
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="font-serif text-[#B38356] text-lg lg:text-xl italic font-light">
                    {p.num}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-slate-300 group-hover:text-[#B38356] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  />
                </div>
                
                <div>
                  <h3 className="font-serif text-xl text-slate-900 mb-2 group-hover:text-[#B38356] transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>
                
                {/* Subtle top highlight on hover instead of bottom */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#B38356] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}