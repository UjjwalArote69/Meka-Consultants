import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, Phone, Mail, Clock, AlertCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

/**
 * MEKA Consultants — Contact
 *
 * Continues the dossier motif (§ VIII · Correspondence). Replaces
 * Dredging's three-office + marine-parallax layout with:
 *   - One real Mumbai office (data from mekaconsultants.com)
 *   - Four consulting disciplines as inquiry types
 *   - "What happens next" engagement process strip
 *   - Direct mailto channels per practice
 *   - Regulatory disclaimer (manpower services only)
 *
 * Palette: Ink #050A15 · Base #FAFAFA · Bronze #B38356
 */

// ═══════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════

const primaryOffice = {
  type: "Headquarters",
  city: "Mumbai, India",
  addressLines: [
    "20 Madhuli Drive, A B Road",
    "Worli, Mumbai 400 018",
    "Maharashtra, India",
  ],
  phone: "+91 22 4089 0000",
  phoneHref: "+912240890000",
  email: "mail@meka.com",
  hours: "Mon–Fri · 9am – 5pm IST",
  responseSLA: "Within 1 business day",
};

const inquiryTypes = [
  { value: "strategic", label: "Strategic & Management Consulting" },
  { value: "operations", label: "Operational Excellence & Process Optimization" },
  { value: "manpower", label: "Outsourced Manpower Supply" },
  { value: "execution", label: "End-to-End Execution Support" },
  { value: "general", label: "General / Other" },
];

const engagementSteps = [
  {
    num: "01",
    title: "You reach out",
    desc: "A short note is enough — no formal RFP required. Tell us what you're trying to achieve.",
  },
  {
    num: "02",
    title: "We respond within 1 business day",
    desc: "A senior from the relevant practice reviews and replies personally, not automatically.",
  },
  {
    num: "03",
    title: "A 30-minute scoping call",
    desc: "Structured conversation to understand the mandate, constraints, and what success looks like.",
  },
  {
    num: "04",
    title: "Tailored engagement proposal",
    desc: "Written proposal covering modules, accountable lead, timeline, and fees — usually within a week.",
  },
];

const practiceChannels = [
  {
    id: "strategic",
    num: "I",
    label: "Strategic & Management Consulting",
    subject: "Strategic & Management Consulting Inquiry",
  },
  {
    id: "operations",
    num: "II",
    label: "Operational Excellence",
    subject: "Operational Excellence & Process Optimization Inquiry",
  },
  {
    id: "manpower",
    num: "III",
    label: "Outsourced Manpower Supply",
    subject: "Outsourced Manpower Supply Inquiry",
  },
  {
    id: "execution",
    num: "IV",
    label: "End-to-End Execution Support",
    subject: "End-to-End Execution Support Inquiry",
  },
];

// ═══════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════

export default function Contact() {
  const heroRef = useRef(null);
  const heroTextRefs = useRef([]);
  const formRef = useRef(null);
  const dataSheetRef = useRef(null);
  const stepsRef = useRef(null);
  const channelsRef = useRef(null);
  const metaRefs = useRef([]);

  const [submitted, setSubmitted] = useState(false);

  // Helpers
  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) refArray.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Masthead meta + hero ───
      gsap.fromTo(
        metaRefs.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        heroTextRefs.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          stagger: 0.1,
          ease: "expo.out",
          delay: 0.5,
        }
      );

      // ─── Form stagger ───
      if (formRef.current) {
        gsap.fromTo(
          formRef.current.querySelectorAll(".form-field"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: formRef.current, start: "top 85%" },
          }
        );
      }

      // ─── Data sheet rows slide in ───
      if (dataSheetRef.current) {
        gsap.fromTo(
          dataSheetRef.current.querySelectorAll(".data-row"),
          { x: 20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: dataSheetRef.current, start: "top 85%" },
          }
        );
      }

      // ─── Engagement steps ───
      if (stepsRef.current) {
        gsap.fromTo(
          stepsRef.current.querySelectorAll(".step-item"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: stepsRef.current, start: "top 80%" },
          }
        );

        gsap.fromTo(
          ".step-divider",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: "expo.inOut",
            scrollTrigger: { trigger: stepsRef.current, start: "top 80%" },
          }
        );
      }

      // ─── Practice channels ───
      if (channelsRef.current) {
        gsap.fromTo(
          channelsRef.current.querySelectorAll(".channel-card"),
          { clipPath: "inset(100% 0% 0% 0%)", y: 20 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: channelsRef.current, start: "top 85%" },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Form handler — placeholder; hook up to backend when available
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset after a moment so the form becomes usable again
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-[#B38356] selection:text-white overflow-hidden">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* MASTHEAD                                                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-20 lg:pt-52 lg:pb-24 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 flex flex-wrap justify-between items-start gap-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400">
          <span ref={(el) => addToRefs(el, metaRefs)}>File · MC-2026-01</span>
          <span ref={(el) => addToRefs(el, metaRefs)}>§ VIII · Correspondence</span>
          <span ref={(el) => addToRefs(el, metaRefs)}>Mumbai, India</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row justify-between lg:items-end gap-10">
          <div className="max-w-4xl">
            <div className="overflow-hidden mb-6">
              <p
                ref={(el) => addToRefs(el, heroTextRefs)}
                className="text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase flex items-center gap-4"
              >
                <span className="w-8 h-px bg-[#B38356]" /> Get in Touch
              </p>
            </div>

            <h1 className="font-serif text-slate-900 tracking-tight leading-[0.95] text-5xl md:text-7xl lg:text-[7rem]">
              <span className="block overflow-hidden">
                <span
                  ref={(el) => addToRefs(el, heroTextRefs)}
                  className="inline-block"
                >
                  Start a
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  ref={(el) => addToRefs(el, heroTextRefs)}
                  className="inline-block text-[#B38356] italic font-light"
                >
                  conversation.
                </span>
              </span>
            </h1>
          </div>

          <div className="overflow-hidden pb-4 max-w-sm">
            <p
              ref={(el) => addToRefs(el, heroTextRefs)}
              className="text-slate-600 font-light leading-relaxed"
            >
              A short note is enough. Tell us what you're trying to achieve —
              a senior from the relevant practice will come back to you
              within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* MAIN — FORM + DATA SHEET                                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            {/* LEFT: Form */}
            <div className="lg:col-span-7">
              <div className="mb-12">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-3">
                  § VIII.a
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4 leading-tight">
                  Direct{" "}
                  <span className="italic text-[#B38356] font-light">
                    inquiry.
                  </span>
                </h2>
                <p className="text-slate-500 font-light leading-relaxed max-w-lg">
                  Submit your project parameters. Every inquiry is routed to
                  a senior partner in the relevant practice and receives a
                  personal reply — not an automated confirmation.
                </p>
              </div>

              <form
                ref={formRef}
                className="space-y-10"
                onSubmit={handleSubmit}
              >
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="form-field relative group">
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-transparent border-b border-slate-200 py-4 text-slate-900 font-light focus:outline-none focus:border-[#B38356] transition-colors peer rounded-none"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 top-4 text-slate-400 font-light text-sm transition-all duration-300 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#B38356] peer-focus:tracking-wider peer-focus:uppercase peer-valid:-top-3 peer-valid:text-[10px] peer-valid:tracking-wider peer-valid:uppercase"
                    >
                      Full Name
                    </label>
                  </div>

                  <div className="form-field relative group">
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-transparent border-b border-slate-200 py-4 text-slate-900 font-light focus:outline-none focus:border-[#B38356] transition-colors peer rounded-none"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 top-4 text-slate-400 font-light text-sm transition-all duration-300 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#B38356] peer-focus:tracking-wider peer-focus:uppercase peer-valid:-top-3 peer-valid:text-[10px] peer-valid:tracking-wider peer-valid:uppercase"
                    >
                      Corporate Email
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="form-field relative group">
                    <input
                      type="text"
                      id="company"
                      className="w-full bg-transparent border-b border-slate-200 py-4 text-slate-900 font-light focus:outline-none focus:border-[#B38356] transition-colors peer rounded-none"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="company"
                      className="absolute left-0 top-4 text-slate-400 font-light text-sm transition-all duration-300 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#B38356] peer-focus:tracking-wider peer-focus:uppercase peer-valid:-top-3 peer-valid:text-[10px] peer-valid:tracking-wider peer-valid:uppercase"
                    >
                      Company / Organization
                    </label>
                  </div>

                  <div className="form-field relative group">
                    <select
                      id="inquiry"
                      className="w-full bg-transparent border-b border-slate-200 py-4 text-slate-900 font-light focus:outline-none focus:border-[#B38356] transition-colors appearance-none cursor-pointer rounded-none"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled hidden>
                        Select Discipline
                      </option>
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="inquiry"
                      className="absolute left-0 -top-3 text-[10px] text-slate-400 tracking-wider uppercase font-light"
                    >
                      Discipline
                    </label>
                  </div>
                </div>

                <div className="form-field relative group">
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full bg-transparent border-b border-slate-200 py-4 text-slate-900 font-light focus:outline-none focus:border-[#B38356] transition-colors peer resize-none rounded-none"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-0 top-4 text-slate-400 font-light text-sm transition-all duration-300 peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#B38356] peer-focus:tracking-wider peer-focus:uppercase peer-valid:-top-3 peer-valid:text-[10px] peer-valid:tracking-wider peer-valid:uppercase"
                  >
                    What are you trying to achieve?
                  </label>
                </div>

                <div className="form-field pt-2">
                  <button
                    type="submit"
                    disabled={submitted}
                    className={`group bg-slate-900 hover:bg-[#B38356] text-white px-10 py-5 text-[11px] tracking-[0.25em] uppercase font-bold transition-all duration-500 flex items-center justify-center gap-4 w-full md:w-auto disabled:opacity-70 disabled:cursor-default`}
                  >
                    {submitted ? (
                      <>Inquiry Submitted ✓</>
                    ) : (
                      <>
                        Submit Inquiry
                        <ArrowRight
                          size={16}
                          className="transform group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>
                  <p className="mt-4 text-[10px] tracking-[0.2em] uppercase font-mono text-slate-400">
                    Response time · Within 1 business day
                  </p>
                </div>
              </form>
            </div>

            {/* RIGHT: Data sheet */}
            <aside className="lg:col-span-5 lg:pl-6">
              <div className="mb-10">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-3">
                  § VIII.b
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4 leading-tight">
                  The{" "}
                  <span className="italic text-[#B38356] font-light">
                    office.
                  </span>
                </h2>
              </div>

              {/* Data sheet — label / value rows (echoes About's "At a Glance") */}
              <div ref={dataSheetRef} className="border-t border-slate-200">
                <div className="data-row grid grid-cols-12 gap-4 py-5 border-b border-slate-200 items-start">
                  <p className="col-span-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 pt-0.5">
                    Office
                  </p>
                  <div className="col-span-8">
                    <p className="text-[#B38356] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                      {primaryOffice.type}
                    </p>
                    <p className="font-serif text-xl text-slate-900">
                      {primaryOffice.city}
                    </p>
                  </div>
                </div>

                <div className="data-row grid grid-cols-12 gap-4 py-5 border-b border-slate-200 items-start">
                  <p className="col-span-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 pt-0.5">
                    Address
                  </p>
                  <div className="col-span-8 flex gap-3">
                    <MapPin
                      size={14}
                      className="mt-1 shrink-0 text-[#B38356]"
                      strokeWidth={1.5}
                    />
                    <div className="text-slate-600 font-light text-sm leading-relaxed">
                      {primaryOffice.addressLines.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="data-row grid grid-cols-12 gap-4 py-5 border-b border-slate-200 items-center">
                  <p className="col-span-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400">
                    Phone
                  </p>
                  <div className="col-span-8 flex items-center gap-3">
                    <Phone
                      size={14}
                      className="shrink-0 text-[#B38356]"
                      strokeWidth={1.5}
                    />
                    <a
                      href={`tel:${primaryOffice.phoneHref}`}
                      className="text-slate-700 font-light hover:text-[#B38356] transition-colors text-sm"
                    >
                      {primaryOffice.phone}
                    </a>
                  </div>
                </div>

                <div className="data-row grid grid-cols-12 gap-4 py-5 border-b border-slate-200 items-center">
                  <p className="col-span-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400">
                    Email
                  </p>
                  <div className="col-span-8 flex items-center gap-3">
                    <Mail
                      size={14}
                      className="shrink-0 text-[#B38356]"
                      strokeWidth={1.5}
                    />
                    <a
                      href={`mailto:${primaryOffice.email}`}
                      className="text-slate-700 font-light hover:text-[#B38356] transition-colors text-sm"
                    >
                      {primaryOffice.email}
                    </a>
                  </div>
                </div>

                <div className="data-row grid grid-cols-12 gap-4 py-5 border-b border-slate-200 items-center">
                  <p className="col-span-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400">
                    Hours
                  </p>
                  <div className="col-span-8 flex items-center gap-3">
                    <Clock
                      size={14}
                      className="shrink-0 text-[#B38356]"
                      strokeWidth={1.5}
                    />
                    <span className="text-slate-600 font-light text-sm">
                      {primaryOffice.hours}
                    </span>
                  </div>
                </div>

                <div className="data-row grid grid-cols-12 gap-4 py-5 items-center">
                  <p className="col-span-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400">
                    Response
                  </p>
                  <div className="col-span-8">
                    <span className="text-slate-700 font-light text-sm">
                      {primaryOffice.responseSLA}
                    </span>
                  </div>
                </div>
              </div>

              {/* Regulatory disclaimer */}
              <div className="data-row mt-10 flex items-start gap-3 p-5 border border-[#B38356]/30 bg-[#B38356]/5 text-sm">
                <AlertCircle
                  size={16}
                  className="text-[#B38356] mt-0.5 shrink-0"
                  strokeWidth={1.5}
                />
                <p className="text-slate-700 italic font-light leading-relaxed">
                  MEKA Consultants provides manpower services only. No
                  machinery or equipment is supplied.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* ENGAGEMENT PROCESS                                           */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        ref={stepsRef}
        className="py-24 md:py-32 bg-white border-y border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16 lg:mb-20 max-w-3xl">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-3">
              § VIII.c
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-slate-900 leading-[1.05]">
              What happens{" "}
              <span className="italic text-[#B38356] font-light">next.</span>
            </h2>
            <p className="text-slate-500 font-light max-w-xl leading-relaxed mt-6 text-base">
              A transparent view of how we take an inquiry from first note
              to signed engagement.
            </p>
          </div>

          {/* Horizontal progress line */}
          <div className="relative h-px w-full bg-slate-200 mb-12">
            <div className="step-divider absolute top-0 left-0 h-px w-full bg-[#B38356] origin-left" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {engagementSteps.map((step) => (
              <div key={step.num} className="step-item relative">
                <div className="w-2 h-2 rounded-full bg-[#B38356] -mt-[49px] mb-8" />
                <p className="font-serif text-[#B38356] text-3xl md:text-4xl tracking-tight mb-4">
                  {step.num}
                </p>
                <h3 className="font-serif text-xl text-slate-900 leading-snug mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PRACTICE CHANNELS                                            */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section ref={channelsRef} className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12 md:mb-16 border-b border-slate-200 pb-8">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-3">
                § VIII.d
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-slate-900 leading-tight">
                Or reach a{" "}
                <span className="italic text-[#B38356] font-light">
                  specific practice.
                </span>
              </h2>
            </div>
            <p className="text-slate-500 text-sm font-light max-w-sm leading-relaxed md:text-right">
              Email us directly about a discipline — subject lines are
              pre-filled so your note is routed to the right partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {practiceChannels.map((channel) => (
              <a
                key={channel.id}
                href={`mailto:${primaryOffice.email}?subject=${encodeURIComponent(
                  channel.subject
                )}`}
                className="channel-card group bg-white border border-slate-200 p-6 md:p-8 flex items-center justify-between gap-6 transition-colors duration-500 hover:border-[#B38356] hover:shadow-[0_8px_30px_-16px_rgba(179,131,86,0.2)]"
              >
                <div className="flex items-center gap-6">
                  <span className="font-serif text-[#B38356] text-3xl md:text-4xl leading-none">
                    {channel.num}
                  </span>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400 mb-1">
                      Practice
                    </p>
                    <h3 className="font-serif text-lg md:text-xl text-slate-900 group-hover:text-[#B38356] transition-colors duration-300 leading-tight">
                      {channel.label}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Mail
                    size={14}
                    className="text-slate-300 group-hover:text-[#B38356] transition-colors duration-500"
                    strokeWidth={1.5}
                  />
                  <ArrowRight
                    size={18}
                    className="text-slate-300 group-hover:text-[#B38356] transform group-hover:translate-x-1 transition-all duration-500"
                    strokeWidth={1.5}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* BOTTOM NOTE                                                  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="border-t border-slate-200 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">
          <span>
            All inquiries are read by a senior partner before being routed.
          </span>
          <span>MC-2026-01 · § VIII · Correspondence</span>
        </div>
      </div>

      <Footer />
    </div>
  );
}