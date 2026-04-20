/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { Plus, Filter, ArrowUpRight, AlertCircle } from "lucide-react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

/**
 * MEKA Consultants — FAQ
 *
 * § IX of the ongoing dossier. Content sourced from
 * mekaconsultants.com/faq (5 real entries, used verbatim) and expanded
 * with consulting-voice answers covering all four disciplines so the
 * page isn't manpower-skewed like the live site.
 *
 * Accordion uses a pure-CSS grid-template-rows transition for smooth
 * height animation without JS measurement.
 *
 * Palette: Ink #050A15 · Base #FAFAFA · Bronze #B38356
 */

// ═══════════════════════════════════════════════════════════════════
// DATA — (*) marks verbatim from mekaconsultants.com/faq
// ═══════════════════════════════════════════════════════════════════

const faqSections = [
  {
    id: "firm",
    num: "I",
    title: "About the Firm",
    items: [
      {
        num: "1.1",
        q: "What does MEKA Consultants do?",
        a: "MEKA Consultants is a professional services firm specializing in business consulting and outsourced manpower supply. Operating under the Meka Group — founded in 1986 — we help organizations improve decision-making, strengthen operations, and deploy the right people at the right scale.",
      },
      {
        num: "1.2",
        q: "Which industries do you support?",
        a: "We support infrastructure, industrial, project-based, and corporate sectors across domestic and international markets.",
        verbatim: true,
      },
      {
        num: "1.3",
        q: "Where are you based?",
        a: "Our headquarters is in Mumbai, India — 20 Madhuli Drive, A B Road, Worli. Engagements are delivered across domestic and international markets.",
      },
      {
        num: "1.4",
        q: "Do you work with companies of all sizes?",
        a: "Yes. Engagements range from fast-growing enterprises to large global organizations. Scope, engagement model, and fees are tailored to the client's scale and the mandate at hand.",
      },
    ],
  },
  {
    id: "engagements",
    num: "II",
    title: "Engagements",
    items: [
      {
        num: "2.1",
        q: "How do I start an engagement?",
        a: "Reach out via our contact form or email mail@meka.com with a short note on what you're trying to achieve — no formal RFP required. A senior partner from the relevant practice will respond personally within one business day.",
      },
      {
        num: "2.2",
        q: "What's your typical response time?",
        a: "Within one business day. Every inquiry is read by a senior partner and routed to the relevant practice for a personal reply — not an automated acknowledgement.",
      },
      {
        num: "2.3",
        q: "How long does a typical engagement last?",
        a: "It varies by discipline. Strategic advisory mandates typically run 4–12 weeks. Operational excellence projects 8–16 weeks. Manpower deployments are ongoing with rapid mobilization. End-to-end execution programs 3–12 months.",
      },
      {
        num: "2.4",
        q: "Do you offer fixed-scope engagements or ongoing retainers?",
        a: "Both. Fixed-scope project engagements, retainer-based advisory, and managed execution contracts are all supported. Structure is scoped to the mandate during the initial conversation.",
      },
      {
        num: "2.5",
        q: "Who runs the work — senior partners or junior consultants?",
        a: "A named senior partner leads every engagement and remains accountable to the client throughout. Delivery teams scale up or down as the mandate requires, but the point of accountability does not move.",
      },
    ],
  },
  {
    id: "disciplines",
    num: "III",
    title: "Disciplines",
    items: [
      {
        num: "3.1",
        q: "What's the difference between Strategic Consulting and Operational Excellence?",
        a: "Strategic consulting answers what the organization should do — direction, priorities, structure. Operational excellence answers how the organization should run — efficiency, productivity, governance. Many engagements combine both under a single lead.",
      },
      {
        num: "3.2",
        q: "What does End-to-End Execution Support actually mean?",
        a: "We run programs day-to-day until outcomes are met — integrating leadership direction, operational planning, and deployed manpower under one accountable lead. It is the right model when leadership capacity is the constraint on execution.",
      },
      {
        num: "3.3",
        q: "Can modules from different disciplines be combined?",
        a: "Yes — and they frequently are. A single mandate might combine strategic advisory, operational redesign, and manpower deployment under one engagement lead, rather than splitting across vendors.",
      },
    ],
  },
  {
    id: "manpower",
    num: "IV",
    title: "Manpower Supply",
    items: [
      {
        num: "4.1",
        q: "Do you provide outsourced manpower services?",
        a: "Yes. Outsourced manpower supply is a core service of MEKA Consultants. We manage sourcing, deployment, payroll, and compliance end-to-end.",
        verbatim: true,
      },
      {
        num: "4.2",
        q: "Do you supply machinery or equipment?",
        a: "No. We strictly provide outsourced manpower services only and do not supply machinery or equipment.",
        verbatim: true,
        disclaimer: true,
      },
      {
        num: "4.3",
        q: "Which industries do you support?",
        a: "We support infrastructure, industrial, project-based, and corporate sectors across domestic and international markets.",
        verbatim: true,
      },
      {
        num: "4.4",
        q: "Can manpower be deployed on a project basis?",
        a: "Yes. We offer flexible manpower models including project-based, contract, and long-term deployments.",
        verbatim: true,
      },
      {
        num: "4.5",
        q: "Do you manage statutory compliance and payroll?",
        a: "Yes. All deployed manpower is managed by MEKA Consultants, including payroll, statutory compliance, and HR administration.",
        verbatim: true,
      },
      {
        num: "4.6",
        q: "How quickly can personnel be mobilized?",
        a: "Depends on role and seniority. Skilled and semi-skilled personnel can often be mobilized within days; specialized technical roles and senior specialists typically take 1–3 weeks depending on scope and vetting requirements.",
      },
      {
        num: "4.7",
        q: "What if I need to replace a deployed team member?",
        a: "Replacement is handled by us as part of the mobilization lifecycle — no additional contracting required from the client side. We maintain continuity while the replacement is onboarded.",
      },
    ],
  },
];

// Flatten for total count
const allItems = faqSections.flatMap((s) => s.items);

// ═══════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════

export default function FAQ() {
  const [activeFilter, setActiveFilter] = useState("all");
  // Open first item by default so users see the accordion behavior immediately
  const [openIds, setOpenIds] = useState(new Set(["1.1"]));
  const containerRef = useRef(null);

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setOpenIds(new Set(allItems.map((i) => i.num)));
  };

  const collapseAll = () => {
    setOpenIds(new Set());
  };

  const visibleSections = faqSections.filter(
    (s) => activeFilter === "all" || s.id === activeFilter
  );

  const filters = [
    { id: "all", label: "All Questions", count: allItems.length },
    ...faqSections.map((s) => ({
      id: s.id,
      label: s.title,
      count: s.items.length,
    })),
  ];

  // ── Hero reveal ──
  useGSAP(
    () => {
      gsap.fromTo(
        ".faq-meta",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, stagger: 0.08, ease: "power2.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".faq-hero-line",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
          delay: 0.5,
        }
      );

      gsap.fromTo(
        ".faq-hero-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 1.1 }
      );

      gsap.fromTo(
        ".faq-filter-bar",
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 1.3 }
      );
    },
    { scope: containerRef }
  );

  // ── Section + item reveals (rerun on filter change) ──
  useGSAP(
    () => {
      gsap.fromTo(
        ".section-header-el",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-list", start: "top 90%" },
        }
      );

      const items = gsap.utils.toArray(".faq-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { clipPath: "inset(0% 100% 0% 0%)", y: 15 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 0.8,
            delay: (i % 3) * 0.06,
            ease: "expo.out",
            scrollTrigger: { trigger: item, start: "top 92%" },
          }
        );
      });
    },
    { dependencies: [activeFilter], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-[#B38356] selection:text-white overflow-hidden"
    >
      <title>FAQ — Meka Consultants</title>
      <meta name="description" content="Answers to common questions about working with Meka Consultants — engagements, process, timelines, and more." />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* MASTHEAD                                                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 flex flex-wrap justify-between items-start gap-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400">
          <span className="faq-meta">File · MC-2026-01</span>
          <span className="faq-meta">§ IX · FAQ</span>
          <span className="faq-meta">
            {allItems.length} Questions · {faqSections.length} Sections
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="overflow-hidden mb-6">
            <p className="faq-hero-line text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase flex items-center gap-4">
              <span className="w-8 h-px bg-[#B38356]" /> Frequently Asked
            </p>
          </div>

          <h1 className="font-serif text-slate-900 tracking-tight leading-[0.95] text-5xl md:text-7xl lg:text-[7rem] mb-10">
            <span className="block overflow-hidden">
              <span className="faq-hero-line inline-block">Questions,</span>
            </span>
            <span className="block overflow-hidden">
              <span className="faq-hero-line inline-block text-[#B38356] italic font-light">
                answered.
              </span>
            </span>
          </h1>

          <p className="faq-hero-desc max-w-2xl text-slate-600 text-base md:text-lg leading-relaxed font-light">
            A reference on how we work — from engagement structure to
            discipline scope to deployed manpower. Can't find what you're
            looking for? <Link to="/contact" className="text-slate-900 border-b border-slate-300 hover:border-[#B38356] hover:text-[#B38356] transition-colors pb-0.5">Start a conversation</Link>.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* STICKY FILTER BAR                                            */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="faq-filter-bar sticky top-[88px] z-30 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center gap-4 overflow-x-auto">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 flex items-center gap-2 shrink-0">
            <Filter size={12} />
            Navigator
          </span>

          <div className="flex items-center gap-2 shrink-0">
            {filters.map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "bg-white border border-slate-200 text-slate-500 hover:border-[#B38356] hover:text-[#B38356]"
                  }`}
                >
                  <span>{f.label}</span>
                  <span
                    className={`font-mono text-[9px] ${
                      isActive
                        ? "text-white/60"
                        : "text-slate-400 group-hover:text-[#B38356]/70"
                    }`}
                  >
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="ml-auto shrink-0 flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase font-bold">
            <button
              onClick={expandAll}
              className="text-slate-500 hover:text-[#B38356] transition-colors"
            >
              Expand All
            </button>
            <span className="w-px h-3 bg-slate-300" />
            <button
              onClick={collapseAll}
              className="text-slate-500 hover:text-[#B38356] transition-colors"
            >
              Collapse
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FAQ LIST                                                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="faq-list py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {visibleSections.map((section, sIdx) => (
            <div
              key={section.id}
              id={section.id}
              className={`scroll-mt-40 ${
                sIdx > 0
                  ? "pt-16 md:pt-24 mt-16 md:mt-24 border-t border-slate-200"
                  : ""
              }`}
            >
              {/* Section header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-10 md:mb-14">
                <div className="lg:col-span-3">
                  <p className="section-header-el font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-3">
                    § {section.num} · Section
                  </p>
                  <span className="section-header-el font-serif text-7xl md:text-8xl text-[#B38356] leading-none inline-block">
                    {section.num}
                  </span>
                </div>

                <div className="lg:col-span-9">
                  <h2 className="section-header-el font-serif text-3xl md:text-5xl text-slate-900 leading-[1.05] mb-4">
                    {section.title}
                  </h2>
                  <p className="section-header-el font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">
                    {section.items.length}{" "}
                    {section.items.length === 1 ? "question" : "questions"} ·{" "}
                    <span className="text-[#B38356]">
                      {section.num}.1 – {section.num}.{section.items.length}
                    </span>
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="lg:ml-[calc(25%+1rem)] space-y-3">
                {section.items.map((item) => {
                  const isOpen = openIds.has(item.num);
                  return (
                    <article
                      key={item.num}
                      id={`faq-${item.num}`}
                      className={`faq-item scroll-mt-40 bg-white border transition-colors duration-500 ${
                        isOpen
                          ? "border-[#B38356] shadow-[0_8px_30px_-16px_rgba(179,131,86,0.2)]"
                          : "border-slate-200 hover:border-[#B38356]/50"
                      } relative`}
                    >
                      {/* Left bronze accent when open */}
                      <span
                        className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#B38356] origin-top transition-transform duration-500 ${
                          isOpen ? "scale-y-100" : "scale-y-0"
                        }`}
                      />

                      <button
                        onClick={() => toggle(item.num)}
                        className="w-full flex items-start gap-4 md:gap-6 text-left p-5 md:p-7"
                        aria-expanded={isOpen}
                      >
                        <span className="font-mono text-[11px] tracking-[0.15em] text-[#B38356] font-bold shrink-0 pt-1.5 w-8">
                          {item.num}
                        </span>

                        <h3
                          className={`flex-1 font-serif text-lg md:text-xl leading-snug transition-colors duration-300 ${
                            isOpen ? "text-[#B38356]" : "text-slate-900"
                          }`}
                        >
                          {item.q}
                        </h3>

                        <span
                          className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                            isOpen
                              ? "border-[#B38356] bg-[#B38356] text-white rotate-45"
                              : "border-slate-200 text-slate-400"
                          }`}
                          aria-hidden="true"
                        >
                          <Plus size={14} strokeWidth={2} />
                        </span>
                      </button>

                      {/* Expandable answer — pure CSS grid-rows trick */}
                      <div
                        className="grid transition-[grid-template-rows] duration-500 ease-out"
                        style={{
                          gridTemplateRows: isOpen ? "1fr" : "0fr",
                        }}
                      >
                        <div className="overflow-hidden">
                          <div className="pl-5 md:pl-[4.5rem] pr-5 md:pr-16 pb-6 md:pb-7">
                            {item.disclaimer && (
                              <div className="mb-4 flex items-start gap-3 p-4 border border-[#B38356]/30 bg-[#B38356]/5 text-sm">
                                <AlertCircle
                                  size={16}
                                  className="text-[#B38356] mt-0.5 shrink-0"
                                  strokeWidth={1.5}
                                />
                                <p className="text-slate-700 italic font-light leading-relaxed">
                                  Regulatory disclaimer — referenced on
                                  Services and Contact.
                                </p>
                              </div>
                            )}
                            <p className="text-slate-600 text-base leading-relaxed font-light">
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}

          {visibleSections.length === 0 && (
            <div className="py-32 text-center text-slate-400 text-sm">
              No questions match the selected filter.
            </div>
          )}
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════ */}
      {/* BOTTOM NOTE                                                  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="border-t border-slate-200 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">
          <span>
            Answers reviewed quarterly · Last revised April 2026.
          </span>
          <span>MC-2026-01 · § IX · FAQ</span>
        </div>
      </div>

      <Footer />
    </div>
  );
}