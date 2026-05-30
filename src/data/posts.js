/**
 * MEKA Consultants — Blog / Insights metadata
 *
 * §VII of the ongoing dossier. This file carries only metadata for the
 * Journal index and related-post lookups. Each post's body (keyTakeaways
 * and sections) lives in its own module under ./posts/[slug].js and is
 * lazy-loaded by BlogPost.jsx via loadPostBody(slug).
 */

// Vite will split each body into its own chunk (matched at build time).
const bodyLoaders = import.meta.glob("./posts/*.js");

export const categories = [
  { id: "all", label: "All Insights" },
  { id: "strategy", label: "Strategy" },
  { id: "operations", label: "Operations" },
  { id: "manpower", label: "Manpower" },
  { id: "business", label: "Business" },
  { id: "research", label: "Research" },
];

export const tags = [
  "Advisory",
  "Leadership",
  "Operations",
  "Governance",
  "Manpower",
  "Measurement",
  "Productivity",
  "Strategy",
];

export const posts = [
  {
    id: "creating-successful-strategies",
    num: "01",
    title: "Creating successful strategies for businesses",
    excerpt:
      "A good strategy tells you what you will and won't do — and why. This note sketches the three-part test we apply to any strategic plan before it lands on a board table: is it specific, is it sequenced, and is it owned by a named leader?",
    category: "strategy",
    categoryLabel: "Strategy",
    date: "April 08, 2026",
    readTime: "8 min read",
    author: "The Practice",
    featured: true,
    heroSubtitle:
      "Most strategies fail not at conception but at the handoff between boardroom and floor. A short argument for strategy documents that are specific, sequenced, and owned.",
    tags: ["Strategy", "Leadership", "Advisory", "Governance"],
  },
  {
    id: "redefining-goals-faster",
    num: "02",
    title: "Discover a better way of redefining company goals faster",
    excerpt:
      "Most organizations revisit their goals annually, whether they need to or not. We argue for a different cadence — quarterly refreshes, with a structured diagnostic that asks only three questions.",
    category: "strategy",
    categoryLabel: "Strategy",
    date: "March 26, 2026",
    readTime: "6 min read",
    author: "The Practice",
    heroSubtitle:
      "The annual planning cycle is a relic of a slower commercial era. A short case for quarterly goal refreshes, built around a three-question diagnostic.",
    tags: ["Strategy", "Governance", "Leadership", "Advisory"],
  },
  {
    id: "five-signals-operating-model",
    num: "03",
    title: "Five signals of an operating model under strain",
    excerpt:
      "Before metrics crack, weaker signals tell the story. This note enumerates the five warning signs we watch for — from rising meeting load to decision latency to the disappearance of quiet work.",
    category: "operations",
    categoryLabel: "Operations",
    date: "March 18, 2026",
    readTime: "7 min read",
    author: "The Practice",
    heroSubtitle:
      "Operating models rarely fail suddenly. They deteriorate through a sequence of small, legible signals — all of which appear months before any KPI moves.",
    tags: ["Operations", "Governance", "Leadership", "Advisory"],
  },
  {
    id: "boost-performance",
    num: "04",
    title: "Boost your work performance with us",
    excerpt:
      "Performance rarely stalls for a single reason. In most engagements we find a compounding mix of unclear priorities, missing feedback loops, and the absence of a shared operating rhythm.",
    category: "business",
    categoryLabel: "Business",
    date: "March 04, 2026",
    readTime: "6 min read",
    author: "The Practice",
    heroSubtitle:
      "Stalled performance is almost never a motivation problem. It is a structural one — and structure responds to specific, boring interventions.",
    tags: ["Productivity", "Operations", "Leadership", "Advisory"],
  },
  {
    id: "manpower-accountable-owner",
    num: "05",
    title: "Why outsourced manpower needs an accountable owner",
    excerpt:
      "Deploying external talent without naming an internal owner is the fastest way to waste capacity. A short argument for single-threaded accountability on every outsourced engagement.",
    category: "manpower",
    categoryLabel: "Manpower",
    date: "February 21, 2026",
    readTime: "5 min read",
    author: "The Practice",
    heroSubtitle:
      "An outsourced team without a named internal owner is not a team. It is a parallel organisation — and parallel organisations produce parallel results.",
    tags: ["Manpower", "Governance", "Operations", "Advisory"],
  },
  {
    id: "measurement-frameworks-wallpaper",
    num: "06",
    title: "Measurement frameworks that don't become wallpaper",
    excerpt:
      "Most KPI dashboards are consulted once, then forgotten. Three design principles that keep measurement systems alive inside an organization — and the one that matters most is rarely discussed.",
    category: "research",
    categoryLabel: "Research",
    date: "February 09, 2026",
    readTime: "9 min read",
    author: "The Practice",
    heroSubtitle:
      "A measurement system that no-one looks at is not a measurement system. It is wallpaper — and wallpaper is more expensive than it appears.",
    tags: ["Measurement", "Governance", "Operations", "Strategy"],
  },
  {
    id: "functional-features-businesses",
    num: "07",
    title: "Functional new features that enhance businesses",
    excerpt:
      "Operational features — the small, repeating routines that shape how work flows — often outrank strategy for near-term impact. Five that consistently compound across our mandates.",
    category: "research",
    categoryLabel: "Research",
    date: "January 28, 2026",
    readTime: "6 min read",
    author: "The Practice",
    heroSubtitle:
      "Strategy sets the direction; operational features determine how far you actually travel. A short catalogue of the ones that compound.",
    tags: ["Operations", "Productivity", "Governance", "Research"],
  },
  {
    id: "apps-productivity",
    num: "08",
    title: "Apps that can help you with productivity",
    excerpt:
      "Tooling doesn't make teams productive on its own, but the right configuration can remove enough friction to unlock an extra gear. A curated view of the stack that consistently delivers.",
    category: "business",
    categoryLabel: "Business",
    date: "January 14, 2026",
    readTime: "5 min read",
    author: "The Practice",
    heroSubtitle:
      "Tooling does not make a team productive. But the wrong tooling can reliably make a team unproductive — and the distinction matters.",
    tags: ["Productivity", "Operations", "Research"],
  },
  {
    id: "contributing-to-initiatives",
    num: "09",
    title: "How we think about contributing to global initiatives",
    excerpt:
      "A short note on why consulting firms should take clear positions on initiatives beyond their clients — and how we think about the trade-off between independence and engagement.",
    category: "operations",
    categoryLabel: "Operations",
    date: "December 18, 2025",
    readTime: "7 min read",
    author: "The Practice",
    heroSubtitle:
      "A consulting firm that will not take a public position on anything its clients might disagree with is, practically, a firm without positions.",
    tags: ["Advisory", "Governance", "Leadership", "Manpower"],
  },
];

// ────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────

export function getPostBySlug(slug) {
  return posts.find((p) => p.id === slug) || null;
}

export function getRelatedPosts(slug, limit = 3) {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const sameCategory = posts.filter(
    (p) => p.id !== slug && p.category === current.category
  );
  const others = posts.filter(
    (p) => p.id !== slug && p.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function getAdjacentPosts(slug) {
  const idx = posts.findIndex((p) => p.id === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}

// Lazy-load a single post body. Returns { keyTakeaways, sections } or null.
export async function loadPostBody(slug) {
  const key = `./posts/${slug}.js`;
  const loader = bodyLoaders[key];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
