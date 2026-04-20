import React, { useState, useRef, useEffect } from "react";
import {
  ArrowUpRight,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
} from "lucide-react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { posts, categories, tags } from "../data/posts";

gsap.registerPlugin(ScrollTrigger);

/**
 * MEKA Consultants — Blog / Insights listing
 *
 * §VII of the ongoing dossier. Titles mirror the live site
 * (mekaconsultants.com/blog-list); full post bodies live in
 * src/data/posts.js and are rendered by BlogPost.jsx.
 *
 * Palette: Ink #050A15 · Base #FAFAFA · Bronze #B38356
 */

const POSTS_PER_PAGE = 6;

// ═══════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef(null);

  // Filter by category + search
  const filtered = posts.filter((p) => {
    const matchesCategory =
      activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured only shown when unfiltered
  const showFeatured =
    activeCategory === "all" && searchQuery.trim() === "";
  const featured = showFeatured
    ? posts.find((p) => p.featured) || posts[0]
    : null;
  const listPosts = featured
    ? filtered.filter((p) => p.id !== featured.id)
    : filtered;

  // Pagination
  const totalPages = Math.max(1, Math.ceil(listPosts.length / POSTS_PER_PAGE));
  const paginatedPosts = listPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // ── Hero reveal ──
  useGSAP(
    () => {
      gsap.fromTo(
        ".blog-meta",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, stagger: 0.08, ease: "power2.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".blog-hero-line",
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
        ".blog-hero-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 1.1 }
      );

      gsap.fromTo(
        ".blog-filter-bar",
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 1.3 }
      );
    },
    { scope: containerRef }
  );

  // ── Featured + card reveals (rerun on filter/page change) ──
  useGSAP(
    () => {
      if (featured) {
        gsap.fromTo(
          ".featured-el",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: ".featured-section", start: "top 90%" },
          }
        );
      }

      const cards = gsap.utils.toArray(".post-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(100% 0% 0% 0%)", y: 20 },
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

      gsap.fromTo(
        ".widget-el",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".widgets-row", start: "top 90%" },
        }
      );
    },
    { dependencies: [activeCategory, searchQuery, currentPage], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-[#B38356] selection:text-white overflow-hidden"
    >
      <title>Journal — Meka Consultants</title>
      <meta name="description" content="Field notes, essays, and case studies from the Meka Consultants team on engineering, infrastructure, and practice." />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* MASTHEAD                                                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 flex flex-wrap justify-between items-start gap-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400">
          <span className="blog-meta">File · MC-2026-01</span>
          <span className="blog-meta">§ VII · The Journal</span>
          <span className="blog-meta">{posts.length} Entries · Vol. 01</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="overflow-hidden mb-6">
            <p className="blog-hero-line text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase flex items-center gap-4">
              <span className="w-8 h-px bg-[#B38356]" /> Insights & Field Notes
            </p>
          </div>

          <h1 className="font-serif text-slate-900 tracking-tight leading-[0.95] text-5xl md:text-7xl lg:text-[7rem] mb-10">
            <span className="block overflow-hidden">
              <span className="blog-hero-line inline-block">Notes from</span>
            </span>
            <span className="block overflow-hidden">
              <span className="blog-hero-line inline-block text-[#B38356] italic font-light">
                the practice.
              </span>
            </span>
          </h1>

          <p className="blog-hero-desc max-w-2xl text-slate-600 text-base md:text-lg leading-relaxed font-light">
            Observations, frameworks, and short essays drawn from our
            engagements — on strategy, operations, manpower, and the craft
            of getting things done inside real organizations.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FILTER + SEARCH BAR                                          */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="blog-filter-bar sticky top-[88px] z-30 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center gap-4 overflow-x-auto">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 flex items-center gap-2 shrink-0">
            <Filter size={12} />
            Categories
          </span>

          <div className="flex items-center gap-2 shrink-0">
            {categories.map((c) => {
              const count =
                c.id === "all"
                  ? posts.length
                  : posts.filter((p) => p.category === c.id).length;
              const isActive = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "bg-white border border-slate-200 text-slate-500 hover:border-[#B38356] hover:text-[#B38356]"
                  }`}
                >
                  <span>{c.label}</span>
                  <span
                    className={`font-mono text-[9px] ${
                      isActive
                        ? "text-white/60"
                        : "text-slate-400 group-hover:text-[#B38356]/70"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="ml-auto shrink-0 relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="bg-white border border-slate-200 rounded-full pl-9 pr-4 py-2 text-xs font-light text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#B38356] w-40 transition-colors duration-300"
            />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FEATURED POST                                                */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {featured && (
        <section className="featured-section py-16 md:py-24 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <p className="featured-el font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-8">
              Featured · Latest Entry
            </p>

            <Link
              to={`/blog/${featured.id}`}
              className="featured-el group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch"
            >
              {/* Visual block — gradient with serif numeral */}
              <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto bg-gradient-to-br from-[#050A15] via-slate-800 to-[#050A15] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#B38356]/20 via-transparent to-transparent" />
                <div className="absolute top-8 left-8 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B38356]" />
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B38356]">
                    {featured.categoryLabel}
                  </span>
                </div>
                <div className="absolute bottom-8 left-8">
                  <p className="font-serif text-[#B38356] text-sm tracking-tight mb-1">
                    Entry
                  </p>
                  <p className="font-serif text-white text-6xl md:text-8xl leading-none tracking-tight">
                    {featured.num}
                  </p>
                </div>
                <div className="absolute top-8 right-8 font-mono text-[10px] tracking-[0.25em] uppercase text-white/50">
                  The Journal
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400">
                  <span>{featured.date}</span>
                  <span className="w-4 h-px bg-slate-300" />
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} />
                    {featured.readTime}
                  </span>
                </div>

                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.05] mb-6 group-hover:text-[#B38356] transition-colors duration-500">
                  {featured.title}
                </h2>

                <p className="text-slate-600 text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl">
                  {featured.excerpt}
                </p>

                <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase font-bold text-slate-900 group-hover:text-[#B38356] transition-colors duration-300">
                  <span className="border-b border-slate-300 group-hover:border-[#B38356] pb-0.5">
                    Read the Entry
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* POSTS GRID                                                   */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {paginatedPosts.length === 0 ? (
            <div className="py-32 text-center">
              <p className="text-slate-400 text-sm mb-4">
                No entries match the current filter.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="text-[10px] tracking-[0.25em] uppercase font-bold text-slate-900 hover:text-[#B38356] border-b border-slate-300 hover:border-[#B38356] pb-0.5 transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-end mb-10">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400">
                  {filtered.length}{" "}
                  {filtered.length === 1 ? "entry" : "entries"}
                  {activeCategory !== "all" && (
                    <>
                      {" · "}
                      <span className="text-[#B38356]">
                        {categories.find((c) => c.id === activeCategory)?.label}
                      </span>
                    </>
                  )}
                </p>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 hidden md:block">
                  Page {currentPage} of {totalPages}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {paginatedPosts.map((post) => (
                  <Link
                    to={`/blog/${post.id}`}
                    key={post.id}
                    className="post-card scroll-mt-40 group bg-white border border-slate-200 transition-colors duration-500 hover:border-[#B38356] hover:shadow-[0_8px_30px_-16px_rgba(179,131,86,0.2)] flex flex-col"
                  >
                    {/* Gradient header */}
                    <div className="relative aspect-[16/9] bg-gradient-to-br from-[#FAFAFA] via-white to-[#B38356]/10 overflow-hidden border-b border-slate-200 group-hover:border-[#B38356] transition-colors duration-500">
                      <div className="absolute top-5 left-5 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#B38356]" />
                        <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#B38356] font-bold">
                          {post.categoryLabel}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-5">
                        <p className="font-serif text-[#B38356]/40 group-hover:text-[#B38356] text-6xl md:text-7xl leading-none tracking-tight transition-colors duration-500">
                          {post.num}
                        </p>
                      </div>
                      <div className="absolute top-5 right-5 font-mono text-[9px] tracking-[0.2em] uppercase text-slate-400">
                        Journal
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-4 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">
                        <span>{post.date}</span>
                        <span className="w-3 h-px bg-slate-300" />
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl md:text-2xl text-slate-900 group-hover:text-[#B38356] transition-colors duration-300 leading-snug mb-4">
                        {post.title}
                      </h3>

                      <p className="text-slate-500 text-sm font-light leading-relaxed mb-6 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-bold text-slate-900 group-hover:text-[#B38356] transition-colors duration-300">
                        <span className="border-b border-slate-300 group-hover:border-[#B38356] pb-0.5">
                          Read More
                        </span>
                        <ArrowUpRight
                          size={12}
                          className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* ═══════ PAGINATION ═══════ */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.max(1, p - 1))
                    }
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center border border-slate-200 text-slate-500 hover:border-[#B38356] hover:text-[#B38356] transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:text-slate-500"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-10 h-10 flex items-center justify-center font-mono text-[11px] tracking-[0.1em] font-bold transition-colors duration-300 ${
                          currentPage === p
                            ? "bg-slate-900 text-white"
                            : "border border-slate-200 text-slate-500 hover:border-[#B38356] hover:text-[#B38356]"
                        }`}
                      >
                        {String(p).padStart(2, "0")}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center border border-slate-200 text-slate-500 hover:border-[#B38356] hover:text-[#B38356] transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:text-slate-500"
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* WIDGETS ROW — categories + tags + subscribe                  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="widgets-row py-20 md:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Categories */}
          <div className="widget-el">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-6">
              Categories
            </p>
            <ul className="space-y-3">
              {categories
                .filter((c) => c.id !== "all")
                .map((c) => {
                  const count = posts.filter(
                    (p) => p.category === c.id
                  ).length;
                  return (
                    <li key={c.id}>
                      <button
                        onClick={() => {
                          setActiveCategory(c.id);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="group flex items-center justify-between w-full text-left py-2 border-b border-slate-100 hover:border-[#B38356]/30 transition-colors duration-300"
                      >
                        <span className="font-serif text-lg text-slate-700 group-hover:text-[#B38356] transition-colors duration-300">
                          {c.label}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-slate-400 group-hover:text-[#B38356]">
                          {String(count).padStart(2, "0")}
                        </span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>

          {/* Tags */}
          <div className="widget-el">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-6">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] tracking-[0.12em] uppercase font-bold px-3 py-1.5 border border-slate-200 text-slate-500 hover:border-[#B38356]/40 hover:text-[#B38356] transition-colors duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Subscribe */}
          <div className="widget-el">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-6">
              Subscribe
            </p>
            <h4 className="font-serif text-lg text-slate-900 mb-3 leading-snug">
              Quarterly notes from the practice.
            </h4>
            <p className="text-slate-500 text-sm font-light leading-relaxed mb-5">
              One short email each quarter with the most useful things we
              wrote that season. No sales pitch.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // hook up to backend when available
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="your@company.com"
                className="flex-1 bg-transparent border-b border-slate-300 py-2 text-sm font-light text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#B38356] transition-colors duration-300"
              />
              <button
                type="submit"
                className="text-[10px] tracking-[0.25em] uppercase font-bold text-slate-900 hover:text-[#B38356] transition-colors"
              >
                Send →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* BOTTOM NOTE                                                  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="border-t border-slate-200 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">
          <span>
            All entries reflect the views of the authors, not specific client
            engagements.
          </span>
          <Link
            to="/services"
            className="text-slate-900 hover:text-[#B38356] transition-colors border-b border-slate-300 hover:border-[#B38356] pb-0.5"
          >
            Review services →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}