import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

/**
 * MEKA Consultants — About
 *
 * A corporate dossier. Deliberately inverts every Dredging About signature:
 *   - No hero photo     → typography-only masthead with file reference
 *   - No parallax images → a single editorial article with a drop cap
 *   - No 3×3 values grid → constitutional numbered principles (I–V)
 *   - No vertical zig-zag timeline → horizontal chronological strip
 *   - No dark HSEQ section → closing signature block / dossier stamp
 *
 * Palette: Ink #050A15 · Base #FAFAFA · Bronze #B38356
 */

// ═══════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════

const sectionIndex = [
  { num: "I", label: "Profile" },
  { num: "II", label: "At a Glance" },
  { num: "III", label: "Principles" },
  { num: "IV", label: "Chronology" },
  { num: "V", label: "Sectors" },
];

const specs = [
  { label: "Founded", value: "1986 (Meka Group)" },
  { label: "Practice", value: "Professional Services" },
  { label: "Headquarters", value: "Mumbai, India" },
  {
    label: "Disciplines",
    value:
      "Strategic Consulting · Operational Excellence · Outsourced Manpower · End-to-End Execution",
  },
  { label: "Professionals Deployed", value: "1,200+" },
  { label: "Mandates Delivered", value: "350+" },
  { label: "Group Heritage", value: "40+ years" },
  { label: "Operating Hours", value: "Mon–Fri · 9am–5pm IST" },
];

const principles = [
  {
    num: "I",
    title: "Accountability over advice.",
    body: "We don't just recommend — we stay until outcomes are measurable. Every engagement is led by a senior partner answerable to the client.",
  },
  {
    num: "II",
    title: "People first, process second.",
    body: "The right people, placed well, outperform any process. Our manpower practice exists because strategy without human capacity is unfinished work.",
  },
  {
    num: "III",
    title: "Clarity, always.",
    body: "Every deliverable carries a clear decision, a recommended action, and a metric by which the work can be judged. Ambiguity is a failure mode.",
  },
  {
    num: "IV",
    title: "Execution as discipline.",
    body: "Execution is a practice, not a phase. It demands its own rigor, its own metrics, and its own accountable owner — we provide all three.",
  },
  {
    num: "V",
    title: "Quiet professionalism.",
    body: "Our work is built for our clients' success — not ours. We prefer to be measured by the outcomes we help produce, not the noise we make around them.",
  },
];

const milestones = [
  { year: "1986", title: "Meka Group Founded", desc: "Dr. Meka Vijay Paparao establishes the parent group with an engineering-first culture." },
  { year: "1995", title: "Advisory Roots", desc: "Early mandates in engineering and operational advisory across industrial clients." },
  { year: "2008", title: "Manpower Practice", desc: "Expansion into outsourced manpower — deploying specialists and teams end-to-end." },
  { year: "2016", title: "Consulting Practice", desc: "Dedicated strategy and operations consulting practice formalized under the group." },
  { year: "2020", title: "Cross-Sector Growth", desc: "Engagements span BFSI, energy, logistics, manufacturing, and healthcare." },
  { year: "2024", title: "Scale", desc: "Practice grows to 1,200+ deployed professionals and 350+ mandates delivered." },
  { year: "2026", title: "Four Disciplines", desc: "Four-discipline practice formally established under MEKA Consultants." },
];

const sectorsPrimary = ["BFSI", "Energy", "Logistics", "Manufacturing", "Healthcare"];
const sectorsSecondary = ["Technology", "Retail", "Real Estate", "Public Sector", "Infrastructure"];
const sectorsFunctional = ["Strategy", "Finance", "HR", "Operations", "Compliance", "Procurement"];

// ═══════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════

export default function About() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── 1. Masthead: letter-by-letter word reveal ───
      gsap.fromTo(
        ".masthead-line",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "expo.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        ".masthead-meta",
        { opacity: 0 },
        { opacity: 1, duration: 1, stagger: 0.1, ease: "power2.out", delay: 1 }
      );

      gsap.fromTo(
        ".toc-item",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out", delay: 1.4 }
      );

      // ─── 2. Article: drop-cap pops, paragraphs fade up ───
      gsap.fromTo(
        ".drop-cap",
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".article-section", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".article-para",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".article-section", start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".article-pullquote",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".article-pullquote", start: "top 85%" },
        }
      );

      // ─── 3. Specs sheet: rows slide in ───
      gsap.fromTo(
        ".spec-row",
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".specs-section", start: "top 80%" },
        }
      );

      // ─── 4. Principles: roman numerals scale in, text slides from left ───
      const principleRows = gsap.utils.toArray(".principle-row");
      principleRows.forEach((row) => {
        const numeral = row.querySelector(".principle-numeral");
        const text = row.querySelector(".principle-text");
        const divider = row.querySelector(".principle-divider");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 80%" },
        });

        tl.fromTo(
          divider,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "expo.inOut" }
        )
          .fromTo(
            numeral,
            { scale: 0.6, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: "expo.out" },
            "-=0.5"
          )
          .fromTo(
            text.children,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
            },
            "-=0.6"
          );
      });

      // ─── 5. Chronology strip: progress line + items reveal ───
      gsap.fromTo(
        ".chrono-line-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".chrono-section",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".chrono-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".chrono-section", start: "top 75%" },
        }
      );

      // ─── 6. Sectors: grid reveal ───
      gsap.fromTo(
        ".sector-tag",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: { trigger: ".sectors-section", start: "top 80%" },
        }
      );

      // ─── 7. Closing + stamp ───
      gsap.fromTo(
        ".closing-el",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".closing-section", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".dossier-stamp",
        { scale: 0.8, opacity: 0, rotate: -8 },
        {
          scale: 1,
          opacity: 1,
          rotate: -6,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".dossier-stamp", start: "top 90%" },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-[#B38356] selection:text-white overflow-hidden"
    >
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* §I — MASTHEAD                                                */}
      {/* Document title page. No photo. Replaces Dredging's full-bleed*/}
      {/* "Precision, Purpose." hero with editorial dossier framing.   */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-20 pb-24 lg:pt-36 lg:pb-32 border-b border-slate-200">
        {/* Top meta strip — like a document header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 md:mb-24 flex flex-wrap justify-between items-start gap-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400">
          <span className="masthead-meta">File · MC-2026-01</span>
          <span className="masthead-meta">Firm Profile</span>
          <span className="masthead-meta">Vol. 01 / 2026</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Big document-style title */}
          <div className="overflow-hidden mb-4">
            <p className="masthead-line text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase flex items-center gap-4">
              <span className="w-8 h-px bg-[#B38356]" /> About the Firm
            </p>
          </div>

          <h1 className="font-serif text-slate-900 tracking-tight leading-[0.95] text-5xl md:text-7xl lg:text-[8rem] mb-10 lg:mb-14">
            <span className="block overflow-hidden">
              <span className="masthead-line inline-block">A professional</span>
            </span>
            <span className="block overflow-hidden">
              <span className="masthead-line inline-block">services firm —</span>
            </span>
            <span className="block overflow-hidden mt-1 lg:mt-2">
              <span className="masthead-line inline-block text-[#B38356] italic font-light">
                since 1986.
              </span>
            </span>
          </h1>

          {/* Pull-quote intro */}
          <div className="max-w-3xl mb-14 flex gap-6 items-start">
            <span className="w-10 h-px bg-slate-900 mt-4 shrink-0" />
            <p className="text-slate-700 text-lg md:text-xl leading-relaxed font-light">
              MEKA Consultants helps organizations achieve strategic clarity,
              operational excellence, and reliable manpower deployment — so
              leaders focus on results while we manage the people.
            </p>
          </div>

          {/* Table of contents hint */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-slate-200 pt-6">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 masthead-meta">
              Contents:
            </span>
            {sectionIndex.map((item, i) => (
              <a
                key={i}
                href={`#section-${item.num.toLowerCase()}`}
                className="toc-item font-mono text-[10px] tracking-[0.2em] uppercase text-slate-600 hover:text-[#B38356] transition-colors duration-300"
              >
                {item.num}. {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* §II — OPENING ARTICLE (with drop cap)                        */}
      {/* Replaces Dredging's sticky-sidebar + parallax-image editorial */}
      {/* spread with a typography-only magazine article.              */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        id="section-i"
        className="article-section py-28 md:py-40 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Sidebar */}
            <aside className="lg:col-span-3">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-3">
                § I
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-slate-900 leading-tight">
                The firm, <br />
                <span className="italic text-[#B38356] font-light">
                  in profile.
                </span>
              </h2>
            </aside>

            {/* Main article — two-column body on desktop */}
            <div className="lg:col-span-9">
              {/* First paragraph with drop-cap */}
              <div className="article-para mb-8">
                <p className="font-serif text-xl md:text-2xl leading-[1.55] text-slate-800">
                  <span className="drop-cap float-left font-serif text-[#B38356] text-7xl md:text-8xl leading-[0.85] mr-3 mt-1">
                    M
                  </span>
                  eka Consultants is a professional services firm specializing
                  in business consulting and outsourced manpower supply.
                  Operating under the umbrella of the Meka Group — founded in
                  1986 — the firm helps organizations improve decision-making,
                  strengthen operations, and deploy the right people at the
                  right scale.
                </p>
              </div>

              {/* Two-column body */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-14">
                <p className="article-para text-slate-600 text-base leading-relaxed font-light">
                  The practice draws on the engineering-rooted, execution-oriented
                  culture of the Meka Group, applied across strategic advisory,
                  operational design, and manpower solutions. Clients range
                  from fast-growing enterprises to global organizations — each
                  supported with bespoke engagement models and senior
                  accountability on every mandate.
                </p>
                <p className="article-para text-slate-600 text-base leading-relaxed font-light">
                  What differentiates MEKA Consultants is a singular operating
                  principle: we don't hand a client a slide deck and walk away.
                  We stay — or we step back — but always on terms that compound
                  outcomes. The firm's four-discipline practice is built to
                  carry a mandate from first conversation through to measured
                  result.
                </p>
              </div>

              {/* Pull quote */}
              <blockquote className="article-pullquote border-l-2 border-[#B38356] pl-8 py-4 mb-14">
                <p className="font-serif italic text-2xl md:text-3xl leading-[1.3] text-slate-900">
                  Strategy without execution is theatre.
                  <br />
                  Execution without the right people is chance.
                </p>
                <p className="mt-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400">
                  — Operating premise
                </p>
              </blockquote>

              <p className="article-para text-slate-600 text-base leading-relaxed font-light max-w-3xl">
                Under this philosophy, the firm has built a practice spanning
                four disciplines — strategic consulting, operational excellence,
                outsourced manpower, and end-to-end execution — each led by
                senior partners and scoped to the client's own definition of
                success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* §III — AT A GLANCE (SPECS SHEET)                             */}
      {/* Replaces Dredging's HSEQ certification-box grid with a       */}
      {/* structured data sheet (label / value rows).                  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        id="section-ii"
        className="specs-section py-28 md:py-36 bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12">
            <aside className="lg:col-span-3">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-3">
                § II
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-slate-900 leading-tight">
                At a{" "}
                <span className="italic text-[#B38356] font-light">glance.</span>
              </h2>
              <p className="text-slate-500 text-sm font-light leading-relaxed mt-6 max-w-xs">
                A structured summary of the firm's practice, scale, and
                operating footprint.
              </p>
            </aside>

            {/* Data sheet */}
            <div className="lg:col-span-9">
              <div className="border-t border-slate-200">
                {specs.map((spec, i) => (
                  <div
                    key={i}
                    className="spec-row grid grid-cols-12 gap-4 py-5 border-b border-slate-200 items-start"
                  >
                    <p className="col-span-12 md:col-span-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 md:pt-0.5">
                      {spec.label}
                    </p>
                    <p className="col-span-12 md:col-span-8 font-serif text-lg md:text-xl text-slate-900 leading-snug">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* §IV — OPERATING PRINCIPLES (CONSTITUTIONAL LIST)             */}
      {/* Replaces Dredging's 3×3 "Nine Values" card grid with a       */}
      {/* numbered Roman-numeral list styled like a constitution.      */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        id="section-iii"
        className="py-28 md:py-40 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16 md:mb-24 max-w-3xl">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-3">
              § III
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-slate-900 leading-[1.05]">
              Operating{" "}
              <span className="italic text-[#B38356] font-light">
                principles.
              </span>
            </h2>
            <p className="text-slate-500 font-light max-w-xl leading-relaxed mt-8 text-base">
              Five principles that shape how we accept work, run engagements,
              and measure what we deliver.
            </p>
          </div>

          <div>
            {principles.map((p) => (
              <div
                key={p.num}
                className="principle-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-12 md:py-16 relative"
              >
                {/* Top divider (animates) */}
                <span className="principle-divider absolute top-0 left-0 right-0 h-px bg-slate-200 origin-left" />

                {/* Roman numeral column */}
                <div className="lg:col-span-3">
                  <span className="principle-numeral font-serif text-6xl md:text-7xl text-[#B38356] leading-none inline-block">
                    {p.num}
                  </span>
                </div>

                {/* Text column */}
                <div className="principle-text lg:col-span-9 max-w-3xl">
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-slate-900 mb-4 leading-[1.2]">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* §V — CHRONOLOGY (HORIZONTAL STRIP)                           */}
      {/* Replaces Dredging's vertical zig-zag timeline with a         */}
      {/* horizontal chronological strip — a scroll-scrubbed progress  */}
      {/* line reinforces the left-to-right reading direction.         */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        id="section-iv"
        className="chrono-section py-28 md:py-40 bg-white border-b border-slate-200 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16 md:mb-20 max-w-3xl">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-3">
              § IV
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-slate-900 leading-[1.05]">
              A working{" "}
              <span className="italic text-[#B38356] font-light">
                chronology.
              </span>
            </h2>
          </div>

          {/* The horizontal progress track */}
          <div className="relative mb-12">
            <div className="h-px w-full bg-slate-200" />
            <div className="chrono-line-fill absolute top-0 left-0 h-px w-full bg-[#B38356] origin-left" />
          </div>

          {/* Scroll container for milestones */}
          <div className="flex gap-8 md:gap-12 overflow-x-auto pb-6 -mx-6 lg:-mx-12 px-6 lg:px-12 scrollbar-thin scrollbar-thumb-slate-300">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="chrono-item shrink-0 w-64 md:w-72 relative"
              >
                <div className="w-2 h-2 rounded-full bg-[#B38356] -mt-[5px] mb-6" />
                <p className="font-serif text-3xl md:text-4xl text-slate-900 mb-2">
                  {m.year}
                </p>
                <p className="text-[#B38356] text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                  {m.title}
                </p>
                <p className="text-slate-500 text-sm font-light leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400 text-center md:text-left">
            Drag or scroll horizontally ·{" "}
            {milestones.length} entries
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* §VI — SECTORS (MARQUEE + GRID)                               */}
      {/* Consulting-specific: industries and functions we serve.      */}
      {/* Marquee replaces the card pattern Dredging uses for fleet.   */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        id="section-v"
        className="sectors-section py-28 md:py-36 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <aside className="lg:col-span-3">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-3">
                § V
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-slate-900 leading-tight">
                Sectors{" "}
                <span className="italic text-[#B38356] font-light">
                  served.
                </span>
              </h2>
            </aside>

            <div className="lg:col-span-9 space-y-10">
              {/* Primary */}
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-4">
                  Primary Industries
                </p>
                <div className="flex flex-wrap gap-3">
                  {sectorsPrimary.map((s, i) => (
                    <span
                      key={i}
                      className="sector-tag inline-block font-serif text-xl md:text-2xl text-slate-900 border-b-2 border-slate-200 hover:border-[#B38356] transition-colors duration-300 pb-1 px-1 cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Secondary */}
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-4">
                  Adjacent Sectors
                </p>
                <div className="flex flex-wrap gap-3">
                  {sectorsSecondary.map((s, i) => (
                    <span
                      key={i}
                      className="sector-tag inline-block text-slate-600 text-sm tracking-wide border border-slate-200 px-4 py-2 hover:border-[#B38356]/50 hover:text-[#B38356] transition-colors duration-300 cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Functional */}
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-4">
                  Functional Areas
                </p>
                <div className="flex flex-wrap gap-3">
                  {sectorsFunctional.map((s, i) => (
                    <span
                      key={i}
                      className="sector-tag inline-block text-[10px] tracking-[0.2em] uppercase font-bold px-3 py-2 bg-slate-100 text-slate-500 hover:bg-[#B38356] hover:text-white transition-colors duration-300 cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Infinite marquee of mixed sector labels */}
        <div className="relative py-6 border-y border-slate-200 overflow-hidden bg-white">
          <div className="flex gap-12 whitespace-nowrap marquee-track">
            {[...sectorsPrimary, ...sectorsSecondary, ...sectorsFunctional,
              ...sectorsPrimary, ...sectorsSecondary, ...sectorsFunctional].map(
              (s, i) => (
                <span
                  key={i}
                  className="font-serif italic text-2xl md:text-3xl text-slate-300 shrink-0"
                >
                  {s}
                  <span className="mx-6 text-[#B38356]">·</span>
                </span>
              )
            )}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════ */}
      {/* DOCUMENT FOOTER STRIP                                        */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="border-t border-slate-200 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-wrap justify-between items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400">
          <span>MC-2026-01 · Firm Profile</span>
          <span>A Meka Group practice · Mumbai, India</span>
          <span>Vol. 01 / 2026</span>
        </div>
      </div>

      <Footer />

      {/* Scoped styles — marquee animation */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        /* Thin scrollbar for chronology strip */
        .scrollbar-thin::-webkit-scrollbar { height: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #B38356; }
      `}</style>
    </div>
  );
}