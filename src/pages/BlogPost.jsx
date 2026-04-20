import React, { useRef, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Clock,
  ChevronUp,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
  posts,
} from "../data/posts";

gsap.registerPlugin(ScrollTrigger);

/**
 * MEKA Consultants — Blog Post (detail)
 *
 * §VII.n — a single Journal entry rendered in full. Structure mirrors
 * the dossier design system used across the site (masthead, mono
 * metadata, serif body, pull-quotes, definition lists). Content is
 * sourced from src/data/posts.js.
 */

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const containerRef = useRef(null);
  const progressRef = useRef(null);

  // If slug is invalid, bounce to /blog
  if (!post) return <Navigate to="/blog" replace />;

  const related = getRelatedPosts(slug, 3);
  const { prev, next } = getAdjacentPosts(slug);
  const currentIndex = posts.findIndex((p) => p.id === slug) + 1;

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (!progressRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(
        100,
        Math.max(0, (scrollTop / docHeight) * 100)
      );
      progressRef.current.style.width = `${progress}%`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hero + body reveals
  useGSAP(
    () => {
      gsap.fromTo(
        ".post-meta",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, stagger: 0.08, ease: "power2.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".post-hero-line",
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
        ".post-hero-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 1.1 }
      );

      gsap.utils.toArray(".post-section").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 85%" },
          }
        );
      });

      gsap.utils.toArray(".takeaway-el").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });

      gsap.utils.toArray(".related-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [slug] }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-[#B38356] selection:text-white overflow-hidden"
    >
      <title>{`${post.title} — Meka Consultants`}</title>
      {post.excerpt && <meta name="description" content={post.excerpt} />}
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-[90] pointer-events-none">
        <div
          ref={progressRef}
          className="h-full bg-[#B38356] transition-[width] duration-150"
          style={{ width: "0%" }}
        />
      </div>

      <Navbar />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* MASTHEAD                                                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-40 pb-16 lg:pt-52 lg:pb-20 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb + meta */}
          <div className="mb-10 flex flex-wrap justify-between items-start gap-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400">
            <span className="post-meta flex items-center gap-2">
              <Link
                to="/blog"
                className="hover:text-[#B38356] transition-colors"
              >
                § VII · The Journal
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-slate-600">
                Entry {String(currentIndex).padStart(2, "0")}
              </span>
            </span>
            <span className="post-meta">
              File · MC-{post.date.split(",")[1]?.trim() || "2026"}-
              {post.num}
            </span>
          </div>

          {/* Category */}
          <div className="overflow-hidden mb-6">
            <p className="post-hero-line text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase flex items-center gap-4">
              <span className="w-8 h-px bg-[#B38356]" />
              {post.categoryLabel}
            </p>
          </div>

          {/* Title */}
          <h1 className="font-serif text-slate-900 tracking-tight leading-[1.05] text-4xl md:text-5xl lg:text-6xl mb-8">
            <span className="block overflow-hidden">
              <span className="post-hero-line inline-block">
                {post.title}
              </span>
            </span>
          </h1>

          {/* Sub-hero */}
          {post.heroSubtitle && (
            <p className="post-hero-desc text-slate-600 text-lg md:text-xl leading-relaxed font-light mb-10 max-w-3xl">
              {post.heroSubtitle}
            </p>
          )}

          {/* Date · read time · author strip */}
          <div className="post-hero-desc flex flex-wrap items-center gap-4 md:gap-6 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-500">
            <span>{post.date}</span>
            <span className="w-4 h-px bg-slate-300" />
            <span className="flex items-center gap-1.5">
              <Clock size={11} />
              {post.readTime}
            </span>
            <span className="w-4 h-px bg-slate-300" />
            <span>
              By{" "}
              <span className="text-slate-700">{post.author}</span>
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO VISUAL BLOCK                                            */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
          <div className="relative aspect-[21/9] bg-gradient-to-br from-[#050A15] via-slate-800 to-[#050A15] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#B38356]/20 via-transparent to-transparent" />
            <div className="absolute top-8 left-8 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B38356]" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B38356]">
                {post.categoryLabel}
              </span>
            </div>
            <div className="absolute bottom-8 left-8">
              <p className="font-serif text-[#B38356] text-sm tracking-tight mb-1">
                Entry
              </p>
              <p className="font-serif text-white text-7xl md:text-9xl leading-none tracking-tight">
                {post.num}
              </p>
            </div>
            <div className="absolute top-8 right-8 font-mono text-[10px] tracking-[0.25em] uppercase text-white/50">
              The Journal · Vol. 01
            </div>
            <div className="absolute bottom-8 right-8 font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 text-right max-w-xs hidden md:block">
              {post.heroSubtitle?.split(".")[0]}.
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* KEY TAKEAWAYS                                                */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {post.keyTakeaways?.length > 0 && (
        <section className="py-16 md:py-20 border-b border-slate-200 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <p className="takeaway-el font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-8">
              § Key Takeaways
            </p>
            <ul className="space-y-5">
              {post.keyTakeaways.map((t, i) => (
                <li
                  key={i}
                  className="takeaway-el flex items-start gap-5 border-l-2 border-[#B38356]/30 pl-5 py-1"
                >
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#B38356] pt-1 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-serif text-lg md:text-xl text-slate-800 leading-snug">
                    {t}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* BODY                                                          */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <article className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {post.sections.map((section, idx) => (
            <section
              key={section.id || idx}
              id={section.id}
              className="post-section mb-16 last:mb-0 scroll-mt-32"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B38356]">
                  § {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 h-px bg-slate-200" />
              </div>

              <h2 className="font-serif text-3xl md:text-4xl text-slate-900 leading-[1.1] mb-8">
                {section.heading}
              </h2>

              {section.paragraphs?.map((p, i) => (
                <p
                  key={i}
                  className="text-slate-700 text-base md:text-lg leading-relaxed font-light mb-6 last:mb-0"
                >
                  {p}
                </p>
              ))}

              {section.list && (
                <div className="mt-8 border-t border-slate-200">
                  {section.list.map((item, i) => (
                    <div
                      key={i}
                      className="py-6 border-b border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
                    >
                      <div className="md:col-span-4 flex items-start gap-3">
                        <span className="font-mono text-[10px] tracking-[0.25em] text-[#B38356] pt-1.5 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-serif text-xl md:text-2xl text-slate-900 leading-snug">
                          {item.label}
                        </h3>
                      </div>
                      <p className="md:col-span-8 text-slate-600 text-base leading-relaxed font-light">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {section.pullQuote && (
                <blockquote className="my-12 border-l-2 border-[#B38356] pl-8 py-2">
                  <p className="font-serif italic text-2xl md:text-3xl text-slate-900 leading-snug">
                    &ldquo;{section.pullQuote}&rdquo;
                  </p>
                </blockquote>
              )}
            </section>
          ))}

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="post-section mt-16 pt-10 border-t border-slate-200">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-4">
                § Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] tracking-[0.12em] uppercase font-bold px-3 py-1.5 border border-slate-200 text-slate-500 hover:border-[#B38356]/40 hover:text-[#B38356] transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Byline block */}
          <div className="post-section mt-12 p-8 md:p-10 bg-white border border-slate-200">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-4">
              § About the author
            </p>
            <h3 className="font-serif text-2xl text-slate-900 mb-3">
              {post.author}
            </h3>
            <p className="text-slate-600 text-base font-light leading-relaxed">
              The Practice is the collective byline of MEKA Consultants —
              carrying the firm's view rather than any single author's.
              Entries are drawn from active client mandates across
              strategy, operations, and outsourced manpower, and reflect
              the firm's positioning rather than specific engagements.
            </p>
          </div>
        </div>
      </article>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PREV / NEXT NAVIGATION                                       */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {prev ? (
            <Link
              to={`/blog/${prev.id}`}
              className="group block border border-slate-200 p-6 md:p-8 hover:border-[#B38356] transition-colors duration-500"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-4 group-hover:text-[#B38356] transition-colors">
                <ArrowLeft size={12} />
                Previous Entry · {prev.num}
              </div>
              <h4 className="font-serif text-xl md:text-2xl text-slate-900 group-hover:text-[#B38356] transition-colors leading-snug">
                {prev.title}
              </h4>
            </Link>
          ) : (
            <div className="border border-slate-100 p-6 md:p-8 opacity-40">
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-4">
                <ArrowLeft size={12} />
                Previous Entry
              </div>
              <p className="font-serif text-base text-slate-400">
                Start of journal.
              </p>
            </div>
          )}

          {next ? (
            <Link
              to={`/blog/${next.id}`}
              className="group block border border-slate-200 p-6 md:p-8 hover:border-[#B38356] transition-colors duration-500 text-right"
            >
              <div className="flex items-center justify-end gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-4 group-hover:text-[#B38356] transition-colors">
                Next Entry · {next.num}
                <ArrowRight size={12} />
              </div>
              <h4 className="font-serif text-xl md:text-2xl text-slate-900 group-hover:text-[#B38356] transition-colors leading-snug">
                {next.title}
              </h4>
            </Link>
          ) : (
            <div className="border border-slate-100 p-6 md:p-8 opacity-40 text-right">
              <div className="flex items-center justify-end gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-4">
                Next Entry
                <ArrowRight size={12} />
              </div>
              <p className="font-serif text-base text-slate-400">
                End of journal.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* RELATED ENTRIES                                              */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {related.length > 0 && (
        <section className="py-20 md:py-24 bg-[#FAFAFA] border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex justify-between items-end mb-10">
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-3">
                  § Related entries
                </p>
                <h3 className="font-serif text-3xl md:text-4xl text-slate-900 leading-tight">
                  From the same file.
                </h3>
              </div>
              <Link
                to="/blog"
                className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-bold text-slate-900 hover:text-[#B38356] transition-colors"
              >
                <span className="border-b border-slate-300 hover:border-[#B38356] pb-0.5">
                  All entries
                </span>
                <ArrowUpRight size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/blog/${rp.id}`}
                  className="related-card group bg-white border border-slate-200 hover:border-[#B38356] transition-colors duration-500 flex flex-col"
                >
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-[#FAFAFA] via-white to-[#B38356]/10 overflow-hidden border-b border-slate-200 group-hover:border-[#B38356] transition-colors">
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#B38356]" />
                      <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#B38356] font-bold">
                        {rp.categoryLabel}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-4">
                      <p className="font-serif text-[#B38356]/40 group-hover:text-[#B38356] text-5xl leading-none tracking-tight transition-colors">
                        {rp.num}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3 font-mono text-[9px] tracking-[0.2em] uppercase text-slate-400">
                      <span>{rp.date}</span>
                      <span className="w-3 h-px bg-slate-300" />
                      <span className="flex items-center gap-1">
                        <Clock size={9} />
                        {rp.readTime}
                      </span>
                    </div>
                    <h4 className="font-serif text-lg md:text-xl text-slate-900 group-hover:text-[#B38356] transition-colors leading-snug mb-3 flex-1">
                      {rp.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase font-bold text-slate-900 group-hover:text-[#B38356] transition-colors">
                      <span className="border-b border-slate-300 group-hover:border-[#B38356] pb-0.5">
                        Read
                      </span>
                      <ArrowUpRight size={10} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CTA STRIP                                                    */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#050A15] text-white py-20 md:py-24 border-t border-[#B38356]/20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B38356] mb-6">
            § Continue the conversation
          </p>
          <h3 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
            Strategy, operations, or manpower —
            <br />
            <span className="italic font-light text-[#B38356]">
              we handle all three under one partner.
            </span>
          </h3>
          <p className="text-white/60 font-light text-base md:text-lg max-w-xl mx-auto mb-10">
            If any of what you read above lined up with what is on your
            desk, a short conversation is usually the right first step.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#B38356] text-white px-8 py-4 text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white hover:text-[#050A15] transition-colors"
            >
              Open a conversation
              <ArrowUpRight size={14} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 text-[10px] tracking-[0.25em] uppercase font-bold hover:border-[#B38356] hover:text-[#B38356] transition-colors"
            >
              Review services
            </Link>
          </div>
        </div>
      </section>

      {/* Back-to-top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:border-[#B38356] hover:text-[#B38356] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)] transition-colors"
        aria-label="Back to top"
      >
        <ChevronUp size={18} />
      </button>

      <Footer />
    </div>
  );
}
