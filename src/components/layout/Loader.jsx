import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * MEKA Consultants — Loader
 * Palette (shared with Dredging): Ink #050A15 / Base #FAFAFA / Bronze #B38356
 * Intentionally different from Dredging's loader:
 *   - Single unified panel (Dredging uses 5 sliding columns)
 *   - Three rotating taglines: THINK SMARTER → GROW FASTER → LEAD CONFIDENTLY
 *     (Dredging shows a huge numeric 00→100 counter)
 *   - Horizontal progress line centered at the bottom
 *   - Exit: whole panel slides UP as one piece
 *
 * API: calls onComplete() when finished (compatible with App.jsx).
 */
export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const panelRef = useRef(null);
  const brandRef = useRef(null);
  const subBrandRef = useRef(null);
  const taglineRefs = useRef([]);
  const progressLineRef = useRef(null);
  const percentRef = useRef(null);
  const contentRef = useRef(null);

  const taglines = ["Think Smarter", "Grow Faster", "Lead Confidently"];

  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        onComplete && onComplete();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => onComplete && onComplete(),
      });

      // 1. Brand lockup rises in
      tl.fromTo(
        [brandRef.current, subBrandRef.current],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
        },
        "+=0.15"
      );

      // 2. Rotating taglines — each fades up then out
      taglineRefs.current.forEach((el, i) => {
        tl.fromTo(
          el,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
          },
          i === 0 ? "-=0.4" : "+=0.25"
        ).to(
          el,
          {
            y: -20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          },
          "+=0.5"
        );
      });

      // 3. Progress line + percent counter (runs in parallel with taglines)
      const counter = { value: 0 };
      tl.to(
        counter,
        {
          value: 100,
          duration: 2.8,
          ease: "power2.inOut",
          onUpdate: () => {
            if (percentRef.current) {
              percentRef.current.innerText = `${Math.round(counter.value)
                .toString()
                .padStart(3, "0")}`;
            }
          },
        },
        1.2
      ).fromTo(
        progressLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 2.8, ease: "power2.inOut" },
        "<"
      );

      // 4. Exit — whole panel slides up as ONE piece
      tl.to(
        contentRef.current,
        {
          y: -20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "+=0.15"
      ).to(
        panelRef.current,
        {
          yPercent: -100,
          duration: 1.1,
          ease: "expo.inOut",
        },
        "-=0.2"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] pointer-events-none"
      aria-hidden="true"
    >
      {/* SINGLE unified panel (not 5 columns) */}
      <div
        ref={panelRef}
        className="absolute inset-0 bg-[#FAFAFA]"
        style={{ willChange: "transform" }}
      />

      {/* Foreground content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-8"
      >
        {/* Top-left corner mark */}
        <div className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#B38356]" />
          <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-slate-500">
            Meka Group
          </span>
        </div>

        {/* Top-right percent readout */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12">
          <span
            ref={percentRef}
            className="font-mono text-[11px] tracking-[0.15em] text-slate-400"
          >
            000
          </span>
        </div>

        {/* Centerpiece — brand lockup */}
        <div className="flex flex-col items-center text-center">
          <span
            ref={brandRef}
            className="inline-block font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-slate-900 leading-none"
            style={{ willChange: "transform, opacity" }}
          >
            MEKA
          </span>
          <span
            ref={subBrandRef}
            className="inline-block font-serif italic text-3xl md:text-5xl lg:text-6xl tracking-tight text-[#B38356] leading-none mt-2"
            style={{ willChange: "transform, opacity" }}
          >
            Consultants
          </span>

          {/* Rotating taglines — stacked in same slot */}
          <div className="relative mt-10 md:mt-14 h-6 md:h-7 w-full flex items-center justify-center overflow-hidden">
            {taglines.map((line, i) => (
              <span
                key={i}
                ref={(el) => (taglineRefs.current[i] = el)}
                className="absolute font-sans text-[11px] md:text-[12px] tracking-[0.35em] uppercase font-bold text-slate-700"
                style={{ willChange: "transform, opacity", opacity: 0 }}
              >
                {line}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom-center horizontal progress line */}
        <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 w-[min(320px,60vw)]">
          <div className="h-[1px] bg-slate-300/60 overflow-hidden relative">
            <div
              ref={progressLineRef}
              className="absolute inset-0 bg-[#B38356] origin-left"
              style={{ willChange: "transform" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}