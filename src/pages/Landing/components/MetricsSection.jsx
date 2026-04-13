/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metricsData = [
  {
    num: "01",
    target: 40,
    suffix: "+",
    label: "Years of Group Legacy",
    sub: "Meka Group · Est. 1986",
    fill: 0.9,
  },
  {
    num: "02",
    target: 1200,
    suffix: "+",
    label: "Professionals Deployed",
    sub: "Across functions and levels",
    fill: 0.75,
  },
  {
    num: "03",
    target: 20,
    suffix: "+",
    label: "Industries Served",
    sub: "BFSI, energy, logistics, and more",
    fill: 0.55,
  },
  {
    num: "04",
    target: 350,
    suffix: "+",
    label: "Mandates Delivered",
    sub: "Consulting and manpower engagements",
    fill: 0.85,
  },
];

export default function MetricsSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header & Meta reveal
      gsap.fromTo(
        ".header-element",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".header-element", start: "top 85%" },
        }
      );

      // 2. Top rule stretches
      gsap.fromTo(
        ".top-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "expo.inOut",
          scrollTrigger: { trigger: ".top-rule", start: "top 85%" },
        }
      );

      // 3. Metric Cards Timeline
      const cards = gsap.utils.toArray(".metric-card");
      
      cards.forEach((card, i) => {
        const metric = metricsData[i];
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          card.querySelector(".metric-index"),
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        // Counter animation
        const numEl = card.querySelector(".metric-number");
        const counter = { value: 0 };
        
        tl.fromTo(numEl, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.1)
          .to(
            counter,
            {
              value: metric.target,
              duration: 2, // Slightly longer for a smoother finish
              ease: "expo.out",
              onUpdate: () => {
                const formatted = Math.floor(counter.value).toLocaleString("en-US");
                numEl.innerText = `${formatted}${metric.suffix}`;
              },
            },
            "<"
          );

        tl.fromTo(
          card.querySelectorAll(".metric-text"),
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" },
          "-=1.5"
        );

        tl.fromTo(
          card.querySelector(".metric-bar"),
          { scaleX: 0 },
          { scaleX: metric.fill, duration: 1.2, ease: "expo.out" },
          "-=1.0"
        );
      });

      // 4. Bottom note
      gsap.fromTo(
        ".bottom-note",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".bottom-note", start: "top 95%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-32 md:py-40 bg-[#FAFAFA] relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        
        {/* ═══════ HEADER ═══════ */}
        <div className="mb-12 max-w-3xl">
          <p className="header-element text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase mb-5">
            By the Numbers
          </p>
          <h2 className="header-element text-5xl md:text-6xl lg:text-[4.5rem] font-serif text-slate-900 leading-[1] tracking-tight">
            Scale, <span className="italic text-[#B38356] font-light">measured.</span>
          </h2>
        </div>

        {/* ═══════ META ROW ═══════ */}
        <div className="header-element flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400 mb-8">
          <span>Dossier · 2026</span>
          <span className="w-8 h-px bg-slate-300" />
          <span>Meka Consultants</span>
          <span className="w-8 h-px bg-slate-300" />
          <span>Professional Services</span>
        </div>

        {/* ═══════ TOP RULE ═══════ */}
        <div className="top-rule h-px w-full bg-slate-200 origin-left mb-0" />

        {/* ═══════ 4-COLUMN METRIC GRID ═══════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 border-b border-slate-200">
          {metricsData.map((metric, i) => (
            <div
              key={metric.num}
              className="metric-card group relative p-8 lg:p-10 hover:bg-white transition-colors duration-500 flex flex-col"
            >
              {/* Screen reader only text for accessibility */}
              <span className="sr-only">
                {metric.target}{metric.suffix} {metric.label}
              </span>

              {/* Index marker */}
              <div className="metric-index flex items-center gap-3 mb-10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B38356] group-hover:scale-125 transition-transform duration-300" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 group-hover:text-slate-600 transition-colors">
                  {metric.num}
                </span>
              </div>

              {/* Counting number (Hidden from screen readers to prevent spam) */}
              <h3 
                className="metric-number font-serif text-6xl md:text-7xl lg:text-[5.5rem] text-slate-900 leading-[0.85] tracking-tight mb-8"
                aria-hidden="true"
              >
                0{metric.suffix}
              </h3>

              {/* Label + sub */}
              <div className="mt-auto mb-8">
                <p className="metric-text text-[11px] tracking-[0.2em] uppercase font-bold text-[#B38356] mb-3 leading-relaxed">
                  {metric.label}
                </p>
                <p className="metric-text text-slate-500 font-light text-[13px] leading-relaxed max-w-[220px]">
                  {metric.sub}
                </p>
              </div>

              {/* Progress bar */}
              <div className="relative h-px w-full bg-slate-100 overflow-hidden mt-auto">
                <span className="metric-bar absolute inset-y-0 left-0 w-full bg-[#B38356] origin-left" />
              </div>
            </div>
          ))}
        </div>

        {/* ═══════ BOTTOM NOTE ═══════ */}
        <div className="bottom-note mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] tracking-[0.2em] uppercase font-mono text-slate-400">
          <span className="flex items-center gap-3">
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            Figures combine Meka Group legacy with Consultants practice
          </span>
          <span>Updated · Q1 2026</span>
        </div>
      </div>
    </section>
  );
}