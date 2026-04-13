/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router"; // Use react-router-dom if on v6

/**
 * MEKA Consultants — Navbar
 * Palette: Ink #050A15 / Base #FAFAFA / Bronze #B38356
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
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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

  // Cleanup timeout on unmount
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

      {/* Pure CSS/Tailwind Dropdown Transition */}
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
// MAIN NAVBAR
// ═══════════════════════════════════════════════
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    { label: "Insights", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <>
      {/* ── MOBILE MENU ── */}
      <div
        className={`fixed inset-0 z-[100] bg-[#050A15] text-white transition-transform duration-[0.8s] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 pt-10 pb-6 border-b border-white/5">
          <span className="font-serif text-xl tracking-wide text-white">
            MEKA <span className="text-[#B38356]">Consultants</span>
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white hover:text-[#B38356] transition-colors p-2"
          >
            <X size={32} strokeWidth={1} />
          </button>
        </div>

        <div className="flex flex-col justify-center h-[calc(100vh-200px)] px-8 gap-6 overflow-y-auto">
          {navLinks.map((item, index) => {
            const isActive =
              currentPath === item.href ||
              currentPath.startsWith(item.href + "/");
            return (
              <div key={index} className="overflow-hidden">
                <a
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`inline-block text-3xl md:text-5xl font-serif font-light transition-colors ${
                    isActive ? "text-[#B38356]" : "text-white hover:text-[#B38356]"
                  }`}
                  style={{
                    transform: isMobileMenuOpen ? "translateY(0)" : "translateY(100%)",
                    transition: `transform 0.8s cubic-bezier(0.76,0,0.24,1) ${
                      index * 0.08 + 0.2
                    }s, color 0.3s ease`,
                  }}
                >
                  {item.label}
                </a>
              </div>
            );
          })}

          <div
            className="mt-8 pt-8 border-t border-white/10"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: `opacity 0.8s ease 0.8s`,
            }}
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-500 mb-3 font-bold">
              Ready to partner?
            </p>
            <p className="text-sm text-slate-300 font-light mb-6 leading-relaxed">
              Think Smarter · Grow Faster · Lead Confidently
            </p>
            <Link to="/contact">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#B38356] hover:bg-white hover:text-slate-900 text-white w-full py-5 text-[11px] tracking-[0.25em] uppercase font-bold transition-colors duration-300"
              >
                Get in Touch
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── DESKTOP NAV ── */}
      <div className="fixed w-full top-0 z-50 flex justify-center px-4 pt-6 pointer-events-none">
        <nav
          className={`pointer-events-auto transition-all duration-700 w-full max-w-[1400px] rounded-full px-5 lg:px-8 py-1.5 ${
            scrolled
              ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(5,10,21,0.06)] border border-slate-200/50"
              : "bg-white/0 border border-transparent"
          }`}
        >
          <div className="flex justify-between items-center w-full h-full">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img
                className="md:h-12 md:w-auto h-8 w-auto"
                src="/logo.png"
                alt="Meka Consultants"
              />
            </Link>

            {/* LINKS + CTA */}
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

            {/* MOBILE HAMBURGER */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-slate-900 p-2 hover:text-[#B38356] transition-colors"
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