import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const containerRef = useRef(null);
  const sidebarRef = useRef(null);
  const dividerRef = useRef(null);
  const attributionRef = useRef(null);
  const quoteGlyphRef = useRef(null);

  useGSAP(
    () => {
      // 1. Sidebar column reveal
      if (sidebarRef.current) {
        gsap.fromTo(
          sidebarRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: sidebarRef.current, start: "top 85%" },
          }
        );
      }

      // 2. Decorative quote glyph pop & parallax
      if (quoteGlyphRef.current) {
        // Initial pop-in
        gsap.fromTo(
          quoteGlyphRef.current,
          { scale: 0.8, opacity: 0, rotate: -5 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: quoteGlyphRef.current,
              start: "top 90%",
            },
          }
        );

        // Gentle drift on scroll
        gsap.to(quoteGlyphRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 3. Stanza 1 — liquid color scrub (Slate Ink)
      const claims = gsap.utils.toArray(".stanza-claim");
      claims.forEach((line) => {
        gsap.fromTo(
          line,
          {
            color: "rgba(15, 23, 42, 0.05)",
            y: 15,
          },
          {
            color: "#0f172a",
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: "top 55%",
              scrub: 1.5,
            },
          }
        );
      });

      // 4. Divider stretches open
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "expo.inOut",
            scrollTrigger: { trigger: dividerRef.current, start: "top 85%" },
          }
        );
      }

      // 5. Stanza 2 — liquid color scrub (Bronze Italic)
      const promises = gsap.utils.toArray(".stanza-promise");
      promises.forEach((line) => {
        gsap.fromTo(
          line,
          {
            color: "rgba(179, 131, 86, 0.15)",
            x: -10,
            y: 10,
          },
          {
            color: "#B38356",
            x: 0,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: "top 55%",
              scrub: 1.5,
            },
          }
        );
      });

      // 6. Attribution fade-in
      if (attributionRef.current) {
        gsap.fromTo(
          attributionRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: attributionRef.current,
              start: "top 95%",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-32 md:py-48 bg-[#FAFAFA] relative overflow-hidden selection:bg-[#B38356] selection:text-white"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* ═══════ SIDEBAR ═══════ */}
          <aside
            ref={sidebarRef}
            className="lg:col-span-4 flex flex-col lg:sticky lg:top-40 lg:self-start z-10"
          >
            <p className="text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase mb-5 flex items-center gap-4">
              <span className="w-8 h-px bg-[#B38356]" /> Our Ethos
            </p>

            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400 mb-10">
              A note on practice
            </p>

            {/* Decorative Quote */}
            <span
              ref={quoteGlyphRef}
              className="font-serif italic text-[#B38356]/20 text-[8rem] md:text-[10rem] lg:text-[14rem] leading-none select-none pointer-events-none origin-top-left -ml-4"
              style={{ willChange: "transform, opacity" }}
              aria-hidden="true"
            >
              “
            </span>
          </aside>

          {/* ═══════ MANIFESTO COLUMN ═══════ */}
          <div className="lg:col-span-8 lg:pt-8 relative z-20">
            
            {/* Screen Reader Full Text */}
            <div className="sr-only">
              <h2>Strategy sets the direction. Operations sets the pace. People close the distance.</h2>
              <h3>We hold all three — so clients focus on what’s next, while we manage the rest.</h3>
            </div>

            {/* Stanza 1 — the claim */}
            <h2 
              className="font-serif leading-[1.1] tracking-tight text-4xl md:text-5xl lg:text-[4rem] max-w-4xl"
              aria-hidden="true"
            >
              <span className="stanza-claim block will-change-transform mb-2">
                Strategy sets the direction.
              </span>
              <span className="stanza-claim block will-change-transform mb-2">
                Operations sets the pace.
              </span>
              <span className="stanza-claim block will-change-transform">
                People close the distance.
              </span>
            </h2>

            {/* Divider with bronze mark */}
            <div className="relative flex items-center my-14 lg:my-20 max-w-3xl">
              <div
                ref={dividerRef}
                className="h-px w-full bg-slate-200 origin-left"
              />
              <span className="absolute left-0 w-2 h-2 rounded-full bg-[#B38356] shadow-[0_0_10px_rgba(179,131,86,0.5)] -translate-y-1/2 top-1/2" />
            </div>

            {/* Attribution */}
            <div
              ref={attributionRef}
              className="mt-16 flex flex-wrap items-center gap-4 text-[10px] tracking-[0.2em] uppercase font-mono text-slate-500"
            >
              <span className="w-8 h-px bg-slate-300 hidden sm:block" />
              <span className="text-slate-900 font-bold">Meka Consultants</span>
              <span className="text-slate-300">·</span>
              <span>A Meka Group practice since 1986</span>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}