import React, { useRef } from "react";
import { ArrowUpRight, Compass, Workflow, Users, Zap } from "lucide-react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    icon: Compass,
    title: "Strategic & Management Consulting",
    tagline: "Clarity before commitment.",
    desc: "Deep engagement with executives to sharpen strategy, reorganize teams, and plan growth with measurable milestones.",
    tags: ["Growth Strategy", "Org Design", "Board Advisory", "Market Entry"],
    engagement: "Advisory · 4–12 weeks",
    href: "/services#strategic",
  },
  {
    num: "02",
    icon: Workflow,
    title: "Operational Excellence",
    tagline: "Lean process, measurable gains.",
    desc: "Diagnosing bottlenecks, redesigning workflows, and embedding performance systems to create durable operational improvements.",
    tags: ["Process Audit", "Lean Systems", "KPI Design", "Continuous Improvement"],
    engagement: "Project · 8–16 weeks",
    href: "/services#operations",
  },
  {
    num: "03",
    icon: Users,
    title: "Outsourced Manpower Supply",
    tagline: "Right people, right away.",
    desc: "Individual specialists to full functional teams — deployed fast, with HR, payroll, and compliance handled under one contract.",
    tags: ["Executive Search", "Staff Augmentation", "HR & Payroll", "Compliance"],
    engagement: "Ongoing · Rapid mobilization",
    href: "/services#manpower",
  },
  {
    num: "04",
    icon: Zap,
    title: "End-to-End Execution Support",
    tagline: "From mandate to delivery.",
    desc: "We run programs day-to-day with our people and playbooks — ideal for expansions, transformations, and capacity-constrained teams.",
    tags: ["Program Management", "PMO", "Transformation", "24/7 Support"],
    engagement: "Managed · 3–12 months",
    href: "/services#execution",
  },
];

export default function CapabilitiesSection() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // 1. Header — staggered text reveal
      const headerEls = gsap.utils.toArray(".cap-header-el");
      gsap.fromTo(
        headerEls,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cap-header", start: "top 85%" },
        }
      );

      // 2. Each row reveals independently
      const rows = gsap.utils.toArray(".service-row");
      rows.forEach((row) => {
        const divider = row.querySelector(".row-divider");
        const content = row.querySelector(".row-content");
        const tags = row.querySelectorAll(".row-tag");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Top divider stretches left-to-right
        tl.fromTo(
          divider,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "expo.inOut" },
          0
        );

        // Row content slides up
        tl.fromTo(
          content.children,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.5"
        );

        // Tags fade in last
        tl.fromTo(
          tags,
          { x: -8, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.4"
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-32 lg:py-48 bg-white relative overflow-hidden selection:bg-[#B38356] selection:text-white"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* ═══════ HEADER ═══════ */}
        <div className="cap-header mb-16 lg:mb-28 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-slate-200">
          <div className="max-w-3xl">
            <p className="cap-header-el text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#B38356]" /> Our Practice
            </p>
            <h2 className="cap-header-el text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-[1.1] tracking-tight">
              Four disciplines.{" "}
              <span className="text-[#B38356] italic font-light">
                One accountable partner.
              </span>
            </h2>
          </div>
          <p className="cap-header-el text-slate-500 font-light max-w-sm leading-relaxed text-sm lg:pb-2">
            From strategic advisory through full execution — a single,
            coordinated practice built to compound outcomes across the
            engagement lifecycle.
          </p>
        </div>

        {/* ═══════ ROW-STACK (Semantic List) ═══════ */}
        <ul className="border-b border-slate-200 flex flex-col">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <li key={service.num} className="service-row group relative block">
                <Link
                  to={service.href}
                  className="block w-full py-12 lg:py-16 transition-colors duration-500 hover:bg-[#FAFAFA]"
                >
                  {/* Top divider */}
                  <span className="row-divider absolute top-0 left-0 right-0 h-px bg-slate-200 origin-left" />

                  {/* Left-edge bronze indicator */}
                  <span
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#B38356] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
                    style={{ willChange: "transform" }}
                  />

                  <div className="row-content grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start px-4 lg:px-8">
                    
                    {/* Index number */}
                    <div className="md:col-span-1 hidden md:block">
                      <span className="font-serif text-[#B38356] text-3xl lg:text-4xl tracking-tight italic font-light">
                        {service.num}
                      </span>
                    </div>

                    {/* Title + tagline + icon */}
                    <div className="md:col-span-5 transform group-hover:translate-x-2 transition-transform duration-500 ease-out">
                      <div className="flex items-start gap-5 mb-3">
                        <div className="w-12 h-12 shrink-0 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-[#B38356] group-hover:text-[#B38356] group-hover:bg-white transition-all duration-500">
                          <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0 pt-1">
                          <span className="md:hidden font-serif text-[#B38356] text-xl tracking-tight italic font-light block mb-2">
                            {service.num}
                          </span>
                          <h3 className="text-2xl lg:text-3xl font-serif text-slate-900 group-hover:text-[#B38356] transition-colors duration-300 leading-tight">
                            {service.title}
                          </h3>
                          <p className="text-[#B38356] italic text-sm font-light mt-2">
                            {service.tagline}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description + engagement meta + tags */}
                    <div className="md:col-span-5 transform group-hover:translate-x-2 transition-transform duration-500 ease-out delay-75">
                      <p className="text-slate-600 text-sm lg:text-base leading-relaxed font-light mb-6 max-w-lg">
                        {service.desc}
                      </p>

                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400 mb-5">
                        {service.engagement}
                      </p>

                      <div className="flex flex-wrap gap-2.5">
                        {service.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="row-tag text-[9px] tracking-[0.15em] uppercase font-bold px-3 py-1.5 border border-slate-200 text-slate-500 group-hover:border-[#B38356]/30 group-hover:text-[#B38356] group-hover:bg-[#B38356]/5 transition-all duration-500"
                            style={{ transitionDelay: `${tIdx * 40}ms` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="md:col-span-1 flex justify-start md:justify-end pt-4 md:pt-2">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#B38356] transition-colors duration-500">
                        <ArrowUpRight
                          size={18}
                          className="text-slate-400 group-hover:text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ═══════ BOTTOM NOTE ═══════ */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] tracking-[0.2em] uppercase font-mono text-slate-400">
          <span className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#B38356] rounded-full" />
            Mandates often combine disciplines under a single accountable lead.
          </span>
          <Link
            to="/services"
            className="text-slate-900 hover:text-[#B38356] font-bold transition-colors border-b border-slate-300 hover:border-[#B38356] pb-1"
          >
            See full service index →
          </Link>
        </div>
      </div>
    </section>
  );
}