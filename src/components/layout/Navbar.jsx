/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router"; // Use react-router-dom if on v6
import gsap from "gsap";

/**
 * MEKA Consultants — Navbar
 * Palette: Ink #050A15 / Base #FAFAFA / Bronze #B38356
 *
 * Desktop nav: unchanged.
 * Mobile nav: kept minimal — clean serif list, inline-expanding Services
 * submenu, a single CTA, and one line of direct contact.
 */

function useHashScroll() {
  const navigate = useNavigate();
  const location = useLocation();

  return (e, href) => {
    e.preventDefault();
    const [pathname, hash] = href.split("#");
    const targetPath = pathname || location.pathname;

    if (location.pathname === targetPath && hash) {
      const el = document.getElementById(hash);
      if (el) {
        const lenis = window.__lenis;
        if (lenis && typeof lenis.scrollTo === "function") {
          lenis.scrollTo(el, { offset: -160 });
        } else {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // Element not in DOM (e.g. filtered out) — navigate to update the hash
        // and let the target page's own scroll handler take over
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };
}

// ═══════════════════════════════════════════════
// DESKTOP NAV ITEM
// ═══════════════════════════════════════════════
function DesktopNavItem({ link, currentPath, onNavClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const isActive =
    currentPath === link.href || currentPath.startsWith(link.href + "/");
  const hasChildren = link.children && link.children.length > 0;
  const isMega = !!link.mega;

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div
      className="relative flex items-center h-full py-6 group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={link.href}
        onClick={(e) => onNavClick(e, link.href)}
        className={`flex items-center gap-1.5 transition-colors duration-300 ${
          isActive ? "text-[#B38356]" : "text-slate-500 hover:text-slate-900"
        }`}
      >
        {isActive && (
          <span className="w-1 h-1 rounded-full bg-[#B38356] mr-1" />
        )}
        {link.label}
        {hasChildren && (
          <ChevronDown
            size={12}
            strokeWidth={2.5}
            className={`transition-transform duration-300 ${
              isOpen
                ? "rotate-180 text-[#B38356]"
                : "text-slate-400 group-hover:text-slate-900"
            }`}
          />
        )}
      </a>

      {hasChildren && (
        <div
          className={`absolute top-[100%] pt-2 z-50 transition-all duration-300 ease-out ${
            isMega ? "left-1/2 -translate-x-1/2 w-[520px]" : "left-0 min-w-[240px]"
          } ${
            isOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible translate-y-3 pointer-events-none"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/70 shadow-[0_30px_60px_rgba(5,10,21,0.08)] rounded-2xl overflow-hidden">
            <div className="h-[3px] w-full bg-gradient-to-r from-[#8b6540] via-[#B38356] to-transparent" />

            <div className={`p-3 ${isMega ? "grid grid-cols-1 gap-1" : "flex flex-col gap-1"}`}>
              {link.children.map((child, idx) => (
                <a
                  key={idx}
                  href={child.href}
                  onClick={(e) => {
                    onNavClick(e, child.href);
                    setIsOpen(false);
                  }}
                  className="group/link flex items-start gap-4 px-4 py-3 rounded-xl transition-colors duration-300 hover:bg-[#FAFAFA]"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-slate-800 group-hover/link:text-[#B38356] transition-colors">
                      {child.label}
                    </p>
                  </div>
                  <span className="opacity-0 group-hover/link:opacity-100 transition-opacity text-[#B38356] shrink-0 mt-0.5">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// MOBILE NAV ITEM
// ═══════════════════════════════════════════════
function MobileNavItem({ link, currentPath, onNavClick, onClose }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = link.children && link.children.length > 0;
  const isActive =
    currentPath === link.href || currentPath.startsWith(link.href + "/");

  const handleRowClick = (e) => {
    if (hasChildren) {
      e.preventDefault();
      setIsExpanded((v) => !v);
    } else {
      onNavClick(e, link.href);
      onClose();
    }
  };

  const handleChildClick = (e, href) => {
    onNavClick(e, href);
    onClose();
  };

  return (
    <div className="mobile-nav-item">
      <button
        onClick={handleRowClick}
        className="w-full flex items-center justify-between text-left py-3 group"
        aria-expanded={hasChildren ? isExpanded : undefined}
      >
        <span
          className={`font-serif text-4xl font-light leading-none transition-colors duration-300 ${
            isActive
              ? "text-[#B38356]"
              : "text-white group-hover:text-[#B38356]"
          }`}
        >
          {link.label}
        </span>

        {hasChildren && (
          <ChevronDown
            size={20}
            strokeWidth={1.5}
            className={`text-white/40 transition-all duration-500 ${
              isExpanded ? "rotate-180 text-[#B38356]" : ""
            }`}
          />
        )}
      </button>

      {hasChildren && (
        <div
          className="grid transition-[grid-template-rows] duration-500 ease-out"
          style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="pb-3 pt-1 space-y-3">
              {link.children.map((child) => (
                <a
                  key={child.href}
                  href={child.href}
                  onClick={(e) => handleChildClick(e, child.href)}
                  className="block text-slate-400 text-sm font-light leading-snug hover:text-[#B38356] transition-colors"
                >
                  {child.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN NAVBAR
// ═══════════════════════════════════════════════
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobilePanelRef = useRef(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const handleNavClick = useHashScroll();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gentle stagger when the panel opens
  useEffect(() => {
    if (!isMobileMenuOpen || !mobilePanelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mobile-nav-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.25,
        }
      );

      gsap.fromTo(
        ".mobile-footer-el",
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.6,
        }
      );
    }, mobilePanelRef);

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    {
      label: "Services",
      href: "/services",
      mega: true,
      children: [
        {
          label: "Strategic & Management Consulting",
          href: "/services#strategic",
        },
        {
          label: "Operational Excellence & Process Optimization",
          href: "/services#operations",
        },
        {
          label: "Outsourced Manpower Supply",
          href: "/services#manpower",
        },
        {
          label: "End-to-End Execution Support",
          href: "/services#execution",
        },
      ],
    },
    // { label: "Insights", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <>
      {/* ═══════════════════════════════════════════ */}
      {/* MOBILE MENU                                  */}
      {/* ═══════════════════════════════════════════ */}
      <div
        ref={mobilePanelRef}
        className={`fixed inset-0 z-[100] bg-[#050A15] text-white transition-transform duration-[0.8s] ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 md:px-8 pt-6 pb-6">
          <span className="font-serif text-xl tracking-wide text-white">
            MEKA{" "}
            <span className="text-[#B38356] italic font-light">
              Consultants
            </span>
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-white hover:text-[#B38356] transition-colors"
            aria-label="Close menu"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 md:px-8 pt-4 pb-6 overflow-y-auto">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <MobileNavItem
                key={link.label}
                link={link}
                currentPath={currentPath}
                onNavClick={handleNavClick}
                onClose={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </div>
        </nav>

        {/* Footer — minimal */}
        <div className="px-6 md:px-8 pb-10 pt-6 border-t border-white/5 shrink-0">
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <button className="mobile-footer-el group w-full bg-[#B38356] hover:bg-white text-white hover:text-slate-900 py-4 text-[11px] tracking-[0.25em] uppercase font-bold transition-colors duration-300 flex items-center justify-center gap-3">
              Start a Conversation
              <ArrowUpRight
                size={14}
                className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </Link>

          <div className="mobile-footer-el mt-5 flex items-center justify-center gap-4 text-xs font-light text-slate-500">
            <a
              href="mailto:mail@meka.com"
              className="hover:text-[#B38356] transition-colors"
            >
              mail@meka.com
            </a>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <a
              href="tel:+912240890000"
              className="hover:text-[#B38356] transition-colors"
            >
              +91 22 4089 0000
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* DESKTOP NAV — unchanged                      */}
      {/* ═══════════════════════════════════════════ */}
      <div className="fixed w-full top-0 z-50 flex justify-center px-4 pt-6 pointer-events-none">
        <nav
          className={`pointer-events-auto transition-all duration-700 w-full max-w-[1400px] rounded-full px-5 lg:px-8 py-1.5 ${
            scrolled
              ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(5,10,21,0.06)] border border-slate-200/50"
              : "bg-white/0 border border-transparent"
          }`}
        >
          <div className="flex justify-between items-center w-full h-full">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img
                className="md:h-12 md:w-auto h-8 w-auto"
                src="/logo.png"
                alt="Meka Consultants"
              />
            </Link>

            <div className="hidden lg:flex items-center space-x-7 xl:space-x-9 text-[10px] tracking-[0.2em] uppercase font-bold">
              {navLinks.map((link) => (
                <DesktopNavItem
                  key={link.label}
                  link={link}
                  currentPath={currentPath}
                  onNavClick={handleNavClick}
                />
              ))}

              <Link to="/contact">
                <button className="bg-slate-900 hover:bg-[#B38356] text-white px-6 py-3 rounded-full text-[10px] tracking-[0.15em] uppercase font-bold transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#B38356]/30">
                  Get in Touch
                </button>
              </Link>
            </div>

            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-slate-900 p-2 hover:text-[#B38356] transition-colors"
                aria-label="Open menu"
              >
                <Menu size={28} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}