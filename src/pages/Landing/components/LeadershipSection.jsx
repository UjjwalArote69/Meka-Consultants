import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * MEKA Consultants — LeadershipSection
 *
 * Replaces Dredging's chaotic asymmetric grid (col-spans 5/6/6 with mixed
 * aspects) with a CLEAN uniform 3-column grid styled as editorial "index
 * cards". Each card carries a numbered index, portrait, name, role,
 * practice-area tags, a teaser, and a "Read profile" CTA. Hover swaps to
 * a bronze tint instead of Dredging's dark blur overlay.
 *
 * Modal mechanic is retained (escape key, click-outside, body lock) but
 * its content surfaces practice areas and switches the footer attribution.
 *
 * Palette: Ink #050A15 · Base #FAFAFA · Bronze #B38356
 *
 * NOTE: Entries 02 and 03 are PLACEHOLDERS. Swap names, photos
 * (/hero/leadership-2.webp etc.), and bio paragraphs when available.
 */

const leaders = [
  {
    num: "01",
    name: "Mr. Hemanth Meka Rao",
    role: "Director",
    practice: "Group Leadership",
    img: "/directors/hemantrao.png",
    teaser:
      "A Mechanical Engineer from Georgia Tech, leading the strategic direction of the Meka Group practice.",
    practiceAreas: ["Strategy", "Growth", "Group Leadership"],
    bio: [
      "Mr. Hemanth Meka Rao is a Mechanical Engineer from Georgia Tech, USA, and leads the strategic direction of the Meka Group's consulting and outsourced manpower practices.",
      "Under his leadership, MEKA Consultants has built a multi-disciplinary practice spanning strategic advisory, operational excellence, manpower deployment, and end-to-end execution across multiple industries.",
      "His engineering background combined with sharp business acumen drives the group's commitment to building practical, measurable, and lasting value for every engagement.",
    ],
  },
  {
    num: "02",
    name: "Dr. Meka Rao",
    role: "Founder",
    practice: "Founding Leadership",
    img: "/directors/drmekapaparao.jpeg",
    teaser:
      "Founder of the Meka Group. Four decades of engineering-led leadership across marine, infrastructure, and professional services.",
    practiceAreas: ["Founding Vision", "Governance", "Mentorship"],
    bio: [
      "Dr. Meka Rao founded the Meka Group in 1978, establishing an engineering-first culture that today spans nine practices — from marine construction and dredging to urban infrastructure, consulting, and professional services.",
      "His leadership has shaped the group's foundational principles of innovation, engineering excellence, and client accountability — values that continue to anchor every mandate MEKA Consultants takes on.",
      "He remains actively involved in governance and mentorship, guiding the next generation of practice leaders across the group.",
    ],
  },
  {
    num: "03",
    name: "Mrs. Rajlakshmi Rao",
    role: "Co-Founder",
    practice: "Founding Leadership",
    img: "/directors/mrsrajyalaskhmirao.jpg",
    teaser:
      "Co-Founder of the Meka Group. Central to the organization's people-first culture and long-term operating ethos since 1978.",
    practiceAreas: ["People & Culture", "Governance", "Stakeholder Relations"],
    bio: [
      "Mrs. Rajlakshmi Rao is a Co-Founder of the Meka Group, alongside Dr. Meka Rao since the group's founding in 1978. Her influence has shaped the people-first culture that defines how the group's nine practices operate today.",
      "Her stewardship has anchored lasting relationships with clients, partners, and the extended practice community — relationships that continue to underwrite the group's reputation for reliability.",
      "She remains active in guiding the organization on matters of culture, governance, and long-term stakeholder relationships.",
    ],
  },
];

// Tiny helper: derives initials for the fallback portrait
function getInitials(name) {
  const cleaned = name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Capt\.)\s+/i, "");
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0]?.slice(0, 2).toUpperCase() ?? "—";
}

export default function LeadershipSection() {
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const [activeBio, setActiveBio] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const closeBio = useCallback(() => {
    setActiveBio(null);
    document.body.style.overflow = "auto";
    // Resume Lenis smooth-scroll if it's running. Lenis maintains its own
    // RAF loop and ignores body.overflow, so it must be toggled directly.
    if (window.__lenis && typeof window.__lenis.start === "function") {
      window.__lenis.start();
    }
    if (previouslyFocusedRef.current) {
      previouslyFocusedRef.current.focus();
      previouslyFocusedRef.current = null;
    }
  }, []);

  const openBio = useCallback((leader, event) => {
    previouslyFocusedRef.current =
      (event && event.currentTarget) || document.activeElement;
    setActiveBio(leader);
    document.body.style.overflow = "hidden";
    if (window.__lenis && typeof window.__lenis.stop === "function") {
      window.__lenis.stop();
    }
  }, []);

  // Move focus into the modal when it opens
  useEffect(() => {
    if (!activeBio || !modalRef.current) return;
    const focusable = modalRef.current.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();
  }, [activeBio]);

  // Escape closes modal + focus trap (Tab cycles within modal)
  useEffect(() => {
    if (!activeBio) return;
    const handleKey = (e) => {
      if (e.key === "Escape") {
        closeBio();
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusables = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeBio, closeBio]);

  // Reveal animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        ".lead-header-el",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".lead-header", start: "top 85%" },
        }
      );

      // Cards — clip-path curtain reveal (top → down)
      const cards = gsap.utils.toArray(".leader-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(100% 0% 0% 0%)", y: 30 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 1.2,
            delay: i * 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="py-32 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* ═══════ HEADER ═══════ */}
          <div className="lead-header flex flex-col md:flex-row justify-between items-end mb-20 md:mb-24 border-b border-slate-200 pb-12 gap-8">
            <div className="max-w-2xl">
              <p className="lead-header-el text-[#8B5E3C] font-bold tracking-[0.3em] text-[10px] uppercase mb-4 flex items-center gap-4">
                <span className="w-8 h-px bg-[#B38356]" /> Practice Leadership
              </p>
              <h2 className="lead-header-el text-4xl md:text-6xl font-serif text-slate-900 leading-[1.1]">
                The people behind{" "}
                <span className="text-[#8B5E3C] italic font-light">
                  the practice.
                </span>
              </h2>
            </div>
            <p className="lead-header-el text-slate-500 font-light max-w-sm pb-2 text-sm leading-relaxed">
              Senior leaders accountable for every engagement — bringing
              decades of advisory, operational, and people-management
              experience to each mandate.
            </p>
          </div>

          {/* ═══════ UNIFORM 3-COL GRID ═══════ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {leaders.filter((l) => !l.isPlaceholder).map((leader) => {
              const showInitials =
                imageErrors[leader.num] || leader.isPlaceholder;
              return (
                <div
                  key={leader.num}
                  className="leader-card group cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={`Read bio of ${leader.name}`}
                  onClick={(e) => openBio(leader, e)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openBio(leader, e);
                    }
                  }}
                >
                  {/* Top index strip */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-500">
                      {leader.num} · {leader.practice}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-slate-300 group-hover:text-[#8B5E3C] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Portrait */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#FAFAFA] border border-slate-200">
                    {showInitials ? (
                      // Initials fallback for placeholders / failed loads
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FAFAFA] to-[#f0ece4]">
                        <span className="font-serif text-[#8B5E3C]/40 text-7xl md:text-8xl tracking-tight select-none">
                          {getInitials(leader.name)}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={leader.img}
                        alt={`Portrait of ${leader.name}`}
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="500"
                        onError={() =>
                          setImageErrors((prev) => ({
                            ...prev,
                            [leader.num]: true,
                          }))
                        }
                        className="w-full h-full object-cover object-top md:grayscale md:group-hover:grayscale-0 transition-all duration-[1.2s] ease-out"
                      />
                    )}

                    {/* Bronze tint on hover (replaces Dredging's dark blur) */}
                    <div className="absolute inset-0 bg-[#B38356]/0 group-hover:bg-[#B38356]/10 transition-colors duration-500 pointer-events-none" />

                    {/* Bottom gradient bar reveal */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#B38356] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>

                  {/* Card body */}
                  <div className="pt-6">
                    <h3 className="text-xl md:text-2xl font-serif text-slate-900 group-hover:text-[#8B5E3C] transition-colors duration-300 leading-snug mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-[#8B5E3C] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                      {leader.role}
                    </p>

                    <p className="text-slate-500 text-sm font-light leading-relaxed mb-5">
                      {leader.teaser}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {leader.practiceAreas.map((area, i) => (
                        <span
                          key={i}
                          className="text-[9px] tracking-[0.12em] uppercase font-bold px-2.5 py-1 border border-slate-200 text-slate-500"
                        >
                          {area}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-bold text-slate-900 group-hover:text-[#8B5E3C] transition-colors duration-300 border-b border-slate-300 group-hover:border-[#B38356] pb-0.5">
                      Read Profile
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ═══════ BOTTOM NOTE ═══════ */}
          <div className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-[10px] tracking-[0.2em] uppercase font-mono text-slate-500">
            <span>
              Every engagement is led by a senior partner accountable to the
              client.
            </span>
            <span>Meka Consultants · Practice Roster</span>
          </div>
        </div>
      </section>

      {/* ════════ BIO MODAL ════════ */}
      {/* Rendered via Portal to document.body so the modal escapes the
          <div className="cv-auto"> wrapper in LandingPage.jsx — that
          wrapper applies `content-visibility: auto` which establishes a
          containing block for position:fixed descendants, causing the
          modal to be sized to the section rather than the viewport.
          Sits at z-[100] — above the fixed navbar (z-50) — so the bio
          fully occupies the viewport and the navbar is hidden behind
          the backdrop. Body scroll AND Lenis RAF loop are both paused
          while the modal is open. */}
      {activeBio && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
          onClick={closeBio}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm animate-fadeIn" />

          {/* Modal */}
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bio-modal-title"
            className="relative z-10 bg-white w-full max-w-5xl max-h-[90dvh] overflow-hidden flex flex-col md:flex-row animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeBio}
              className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center text-slate-500 hover:text-[#8B5E3C] transition-colors duration-300 bg-white/80 backdrop-blur-sm"
              aria-label="Close profile"
            >
              <X size={20} />
            </button>

            {/* Image side */}
            <div className="relative w-full md:w-2/5 h-64 md:h-auto min-h-[300px] bg-[#FAFAFA] overflow-hidden shrink-0">
              {imageErrors[activeBio.num] || activeBio.isPlaceholder ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FAFAFA] to-[#f0ece4]">
                  <span className="font-serif text-[#8B5E3C]/40 text-9xl tracking-tight select-none">
                    {getInitials(activeBio.name)}
                  </span>
                </div>
              ) : (
                <img
                  src={activeBio.img}
                  alt={`Portrait of ${activeBio.name}`}
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="750"
                  className="w-full h-full object-cover object-top"
                />
              )}
            </div>

            {/* Content side */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto bio-scroll">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-500 mb-2">
                {activeBio.num} · {activeBio.practice}
              </p>
              <p className="text-[#8B5E3C] text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                {activeBio.role}
              </p>
              <h3
                id="bio-modal-title"
                className="text-3xl md:text-4xl font-serif text-slate-900 mb-8 leading-tight"
              >
                {activeBio.name}
              </h3>

              <div className="space-y-5">
                {activeBio.bio.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-slate-600 text-sm leading-relaxed font-light"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Practice areas in modal */}
              <div className="mt-8">
                <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-slate-500 mb-3">
                  Practice Areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeBio.practiceAreas.map((area, i) => (
                    <span
                      key={i}
                      className="text-[10px] tracking-[0.12em] uppercase font-bold px-3 py-1.5 border border-slate-200 text-slate-600"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer attribution */}
              <div className="mt-10 pt-6 border-t border-slate-200">
                <p className="text-slate-500 text-[10px] tracking-[0.2em] uppercase font-bold">
                  MEKA Consultants — A Meka Group practice
                </p>
              </div>
            </div>
          </div>

          {/* Scoped styles for modal */}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(30px) scale(0.98); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
            .animate-slideUp { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            .bio-scroll::-webkit-scrollbar { width: 4px; }
            .bio-scroll::-webkit-scrollbar-track { background: transparent; }
            .bio-scroll::-webkit-scrollbar-thumb { background: #B38356; border-radius: 2px; }
          `}</style>
        </div>,
        document.body
      )}
    </>
  );
}