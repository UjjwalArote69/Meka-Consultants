import React, { useRef, useState, useEffect } from "react";
import {
  TrendingUp, Network, Briefcase, Map,
  ClipboardCheck, Workflow, Target, LineChart,
  Users, UserPlus, Users2, FileCheck,
  LayoutGrid, RefreshCcw, Settings2,
  ArrowDownRight, Filter, AlertCircle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link, useLocation } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

/**
 * MEKA Consultants — Services
 *
 * Content sourced directly from mekaconsultants.com/services (the four
 * live discipline pages). Discipline-level descriptions are used
 * verbatim where the real site has them. Module subsections are derived
 * from the stated scope of each discipline — for Manpower, the five
 * modules mirror the site's own bulleted list one-to-one.
 *
 * The regulatory note from the live Manpower page is surfaced as a
 * dedicated disclaimer strip on that discipline section:
 *   "MEKA Consultants provides manpower services only.
 *    No machinery or equipment is supplied."
 *
 * Palette: Ink #050A15 · Base #FAFAFA · Bronze #B38356
 */

// ═══════════════════════════════════════════════════════════════════
// DATA — sourced from mekaconsultants.com
// ═══════════════════════════════════════════════════════════════════

const disciplines = [
  {
    id: "strategic",
    num: "I",
    title: "Strategic & Management Consulting",
    tagline: "Clarity before commitment.",
    // Verbatim from mekaconsultants.com/services
    desc: "Data-driven advisory services supporting leadership decision-making, business planning, organizational structuring, and performance improvement.",
    modules: [
      {
        id: "leadership-decision",
        num: "1.1",
        icon: Briefcase,
        title: "Leadership Decision-Making",
        tagline: "Data, framed for decisions.",
        desc: "Structured advisory for executives and boards — translating market data, internal performance signals, and strategic options into decisions leadership can act on with confidence.",
        tags: ["Executive Advisory", "Decision Support", "Scenario Planning"],
      },
      {
        id: "business-planning",
        num: "1.2",
        icon: TrendingUp,
        title: "Business Planning",
        tagline: "From ambition to plan.",
        desc: "Annual and multi-year business planning that translates strategic intent into funded, prioritized, and measurable initiatives — each with a named owner and a schedule.",
        tags: ["Annual Plans", "Budgeting", "Prioritization"],
      },
      {
        id: "org-structuring",
        num: "1.3",
        icon: Network,
        title: "Organizational Structuring",
        tagline: "Structure follows strategy.",
        desc: "Reshaping structures, roles, reporting lines, and spans of control to match strategic intent — including leadership configuration and workforce planning.",
        tags: ["Org Design", "Role Definition", "Workforce Planning"],
      },
      {
        id: "performance-improvement",
        num: "1.4",
        icon: Target,
        title: "Performance Improvement",
        tagline: "Metrics that drive action.",
        desc: "Diagnosing and closing performance gaps — from topline growth to functional productivity — with measurement systems, operating rhythms, and accountable owners.",
        tags: ["Performance Diagnostics", "KPIs", "Operating Rhythm"],
      },
    ],
  },
  {
    id: "operations",
    num: "II",
    title: "Operational Excellence & Process Optimization",
    tagline: "Efficiency, productivity, governance.",
    // Verbatim from mekaconsultants.com/services
    desc: "Improving efficiency, productivity, and governance across projects and organizations through structured operational frameworks.",
    modules: [
      {
        id: "efficiency",
        num: "2.1",
        icon: Workflow,
        title: "Efficiency Improvement",
        tagline: "Friction, removed.",
        desc: "Identifying and eliminating waste, handoffs, and bottlenecks across operational workflows — applying lean principles adapted for service and knowledge work.",
        tags: ["Lean Ops", "Waste Elimination", "Workflow Redesign"],
      },
      {
        id: "productivity",
        num: "2.2",
        icon: LineChart,
        title: "Productivity Enhancement",
        tagline: "Output per hour, raised.",
        desc: "Programs that raise output and throughput across teams and functions — through better tooling, clearer roles, and measurement against productive-time benchmarks.",
        tags: ["Throughput", "Team Productivity", "Tooling"],
      },
      {
        id: "governance",
        num: "2.3",
        icon: ClipboardCheck,
        title: "Governance Frameworks",
        tagline: "Clarity on who decides.",
        desc: "Structured governance models for projects, programs, and organizations — with clear decision rights, escalation paths, and review cadences.",
        tags: ["Project Governance", "Decision Rights", "Escalation"],
      },
      {
        id: "operational-frameworks",
        num: "2.4",
        icon: Settings2,
        title: "Operational Framework Design",
        tagline: "Repeatable, not ad-hoc.",
        desc: "Designing and implementing structured frameworks — from SOPs to operating models — that standardize how work runs at scale, audit-ready and adaptable.",
        tags: ["SOPs", "Operating Model", "Standardization"],
      },
    ],
  },
  {
    id: "manpower",
    num: "III",
    title: "Outsourced Manpower Supply",
    tagline: "Right people, right away.",
    // Verbatim from mekaconsultants.com/services
    desc: "End-to-end outsourced manpower services — supplying qualified professionals, technical staff, and project teams across industries.",
    disclaimer:
      "MEKA Consultants provides manpower services only. No machinery or equipment is supplied.",
    // The five modules below mirror the site's own bulleted list exactly.
    modules: [
      {
        id: "project-deployment",
        num: "3.1",
        icon: LayoutGrid,
        title: "Project-Based Manpower Deployment",
        tagline: "Teams scoped to the project.",
        desc: "Deployment of dedicated manpower for specific projects — sized, skilled, and timed to the engagement, demobilized cleanly on completion.",
        tags: ["Project Teams", "Scoped Deployment", "Handover"],
      },
      {
        id: "staffing-duration",
        num: "3.2",
        icon: UserPlus,
        title: "Long-Term & Short-Term Staffing",
        tagline: "Engagements of any tenure.",
        desc: "Long-term placements for enduring roles, and short-term augmentation for seasonal or burst capacity needs — under a single managed contract.",
        tags: ["Long-Term", "Short-Term", "Contract Staffing"],
      },
      {
        id: "technical-personnel",
        num: "3.3",
        icon: Users,
        title: "Skilled, Semi-Skilled & Technical Personnel",
        tagline: "Every skill tier, supplied.",
        desc: "Qualified professionals across skill bands — from technical specialists to skilled trades and semi-skilled support — vetted and deployed to client sites.",
        tags: ["Technical", "Skilled Trades", "Semi-Skilled"],
      },
      {
        id: "mobilization",
        num: "3.4",
        icon: RefreshCcw,
        title: "Mobilization, Replacement & Demobilization",
        tagline: "Lifecycle, managed.",
        desc: "End-to-end lifecycle management of deployed personnel — mobilization onto site, in-engagement replacement when needed, and compliant demobilization.",
        tags: ["Mobilization", "Replacement", "Demobilization"],
      },
      {
        id: "payroll-compliance",
        num: "3.5",
        icon: FileCheck,
        title: "Payroll, Statutory Compliance & HR Administration",
        tagline: "Employer-of-record, end-to-end.",
        desc: "Full administration of deployed personnel: payroll processing, statutory and labour-law compliance, benefits, and HR support — all handled under one contract.",
        tags: ["Payroll", "Statutory Compliance", "HR Admin"],
      },
    ],
  },
  {
    id: "execution",
    num: "IV",
    title: "End-to-End Execution Support",
    tagline: "Strategy and execution, bridged.",
    // Verbatim from mekaconsultants.com/services
    desc: "Bridging the gap between strategy and execution by aligning leadership direction, operational planning, and outsourced manpower — ensuring predictable, scalable outcomes.",
    modules: [
      {
        id: "strategy-alignment",
        num: "4.1",
        icon: Map,
        title: "Strategy–Execution Alignment",
        tagline: "From intent to action.",
        desc: "Translating leadership direction into operating plans, owner assignments, and measurable milestones — closing the gap where strategies usually stall.",
        tags: ["Cascade", "Plan Alignment", "Ownership"],
      },
      {
        id: "operational-planning",
        num: "4.2",
        icon: ClipboardCheck,
        title: "Operational Planning",
        tagline: "Detailed plans, owned plans.",
        desc: "Detailed operational planning — resources, timelines, dependencies, risks — scoped to the mandate and tracked through structured program cadences.",
        tags: ["Operating Plans", "Resource Planning", "Risk Management"],
      },
      {
        id: "manpower-integration",
        num: "4.3",
        icon: Users2,
        title: "Manpower Integration",
        tagline: "Plans and people, together.",
        desc: "Integrating deployed manpower into the execution plan — onboarding, roles, accountability — so that plans and people arrive together, not sequentially.",
        tags: ["Onboarding", "Team Integration", "Accountability"],
      },
      {
        id: "outcomes",
        num: "4.4",
        icon: TrendingUp,
        title: "Outcome Delivery & Scaling",
        tagline: "Predictable, scalable outcomes.",
        desc: "Running the delivery cadence day-to-day until outcomes are met — then scaling what worked and transitioning stewardship back to the client's teams.",
        tags: ["Delivery Cadence", "Scaling", "Transition"],
      },
    ],
  },
];

const filters = [
  { id: "all", label: "All Modules", count: 17 },
  { id: "strategic", label: "Strategic", count: 4 },
  { id: "operations", label: "Operational", count: 4 },
  { id: "manpower", label: "Manpower", count: 5 },
  { id: "execution", label: "Execution", count: 4 },
];

// ═══════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════

export default function Services() {
  const [activeFilter, setActiveFilter] = useState("all");
  const containerRef = useRef(null);
  const location = useLocation();

  const visibleDisciplines = disciplines.filter(
    (d) => activeFilter === "all" || d.id === activeFilter
  );

  // ── Cross-page hash navigation ──
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");

      const directMatch = disciplines.find((d) => d.id === id);
      const moduleMatch = disciplines.find((d) =>
        d.modules.some((m) => m.id === id)
      );
      const parent = directMatch || moduleMatch;

      if (parent && activeFilter !== "all" && activeFilter !== parent.id) {
        setActiveFilter(parent.id);
      }

      const timeoutId = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const lenis = window.__lenis;
          if (lenis && typeof lenis.scrollTo === "function") {
            lenis.scrollTo(element, { offset: -160 });
          } else {
            const offset = 160; // navbar + sticky filter bar
            const y =
              element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }
      }, 800);

      return () => clearTimeout(timeoutId);
    } else {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  // ── Hero reveal ──
  useGSAP(
    () => {
      gsap.fromTo(
        ".svc-meta",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, stagger: 0.08, ease: "power2.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".svc-hero-line",
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
        ".svc-hero-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 1.1 }
      );

      gsap.fromTo(
        ".svc-filter-bar",
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 1.3 }
      );
    },
    { scope: containerRef }
  );

  // ── Per-discipline reveals (rerun when filter changes) ──
  useGSAP(
    () => {
      gsap.fromTo(
        ".disc-header-el",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".disc-section",
            start: "top 90%",
          },
        }
      );

      const cards = gsap.utils.toArray(".module-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(0% 100% 0% 0%)", y: 20 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 0.9,
            delay: (i % 2) * 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
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
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO / MASTHEAD                                              */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 flex flex-wrap justify-between items-start gap-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400">
          <span className="svc-meta">File · MC-2026-01</span>
          <span className="svc-meta">§ VI · Services Index</span>
          <span className="svc-meta">17 Modules · 4 Disciplines</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="overflow-hidden mb-6">
            <p className="svc-hero-line text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase flex items-center gap-4">
              <span className="w-8 h-px bg-[#B38356]" /> The Services Index
            </p>
          </div>

          <h1 className="font-serif text-slate-900 tracking-tight leading-[0.95] text-5xl md:text-7xl lg:text-[7rem] mb-10">
            <span className="block overflow-hidden">
              <span className="svc-hero-line inline-block">Four disciplines.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="svc-hero-line inline-block text-[#B38356] italic font-light">
                One practice.
              </span>
            </span>
          </h1>

          <p className="svc-hero-desc max-w-2xl text-slate-600 text-base md:text-lg leading-relaxed font-light">
            Business consulting and outsourced manpower — organized across
            four disciplines. Each module scopes independently or as part of
            a larger mandate, and every engagement is led by a senior partner
            accountable to the client.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HORIZONTAL STICKY FILTER BAR                                 */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="svc-filter-bar sticky top-[88px] z-30 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-slate-200">
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
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* DISCIPLINES & MODULES                                        */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {visibleDisciplines.map((disc, dIdx) => (
            <div
              key={disc.id}
              id={disc.id}
              className={`disc-section scroll-mt-40 ${
                dIdx > 0 ? "pt-24 md:pt-32 mt-24 md:mt-32 border-t border-slate-200" : ""
              }`}
            >
              {/* Discipline header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-10 md:mb-14">
                <div className="lg:col-span-3">
                  <p className="disc-header-el font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-3">
                    § {disc.num} · Discipline
                  </p>
                  <span className="disc-header-el font-serif text-7xl md:text-8xl text-[#B38356] leading-none inline-block">
                    {disc.num}
                  </span>
                </div>

                <div className="lg:col-span-9">
                  <h2 className="disc-header-el font-serif text-3xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.05] mb-6">
                    {disc.title}
                  </h2>
                  <p className="disc-header-el text-[#B38356] italic text-lg md:text-xl font-light mb-6">
                    {disc.tagline}
                  </p>
                  <p className="disc-header-el text-slate-600 text-base leading-relaxed font-light max-w-2xl mb-8">
                    {disc.desc}
                  </p>
                  <div className="disc-header-el flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">
                    <span>
                      {disc.modules.length} modules in this discipline
                    </span>
                    <span className="w-6 h-px bg-slate-300" />
                    <span className="text-[#B38356]">
                      {disc.num}.1 – {disc.num}.{disc.modules.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Regulatory disclaimer strip — only when the discipline has one */}
              {disc.disclaimer && (
                <div className="disc-header-el mb-12 lg:ml-[calc(25%+1rem)]">
                  <div className="flex items-start gap-3 p-5 border border-[#B38356]/30 bg-[#B38356]/5 text-sm">
                    <AlertCircle
                      size={16}
                      className="text-[#B38356] mt-0.5 shrink-0"
                      strokeWidth={1.5}
                    />
                    <p className="text-slate-700 italic font-light leading-relaxed">
                      {disc.disclaimer}
                    </p>
                  </div>
                </div>
              )}

              {/* Modules grid — 2 columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {disc.modules.map((m) => {
                  const Icon = m.icon;
                  return (
                    <article
                      key={m.id}
                      id={m.id}
                      className="module-card scroll-mt-40 group bg-white border border-slate-200 p-6 md:p-8 transition-colors duration-500 hover:border-[#B38356] hover:shadow-[0_8px_30px_-16px_rgba(179,131,86,0.2)] flex gap-5"
                    >
                      {/* Icon box */}
                      <div className="w-14 h-14 shrink-0 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-[#B38356] group-hover:text-[#B38356] group-hover:bg-[#FAFAFA] transition-all duration-500">
                        <Icon size={20} strokeWidth={1.5} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-[11px] tracking-[0.15em] text-[#B38356] font-bold">
                            {m.num}
                          </span>
                          <span className="h-px flex-1 bg-slate-200" />
                        </div>

                        <h3 className="font-serif text-xl md:text-2xl text-slate-900 group-hover:text-[#B38356] transition-colors duration-300 leading-tight mb-1">
                          {m.title}
                        </h3>
                        <p className="text-[#B38356] italic text-sm font-light mb-4">
                          {m.tagline}
                        </p>

                        <p className="text-slate-600 text-sm leading-relaxed font-light mb-5">
                          {m.desc}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {m.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[9px] tracking-[0.12em] uppercase font-bold px-2.5 py-1 border border-slate-200 text-slate-500 group-hover:border-[#B38356]/40 group-hover:text-[#B38356]/80 transition-colors duration-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}

          {visibleDisciplines.length === 0 && (
            <div className="py-32 text-center text-slate-400 text-sm">
              No modules match the selected filter.
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* BOTTOM NOTE                                                  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">
          <span>
            Modules combine under a single mandate when engagements span
            multiple disciplines.
          </span>
          <Link
            to="/about"
            className="text-slate-900 hover:text-[#B38356] transition-colors border-b border-slate-300 hover:border-[#B38356] pb-0.5"
          >
            About the firm →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}