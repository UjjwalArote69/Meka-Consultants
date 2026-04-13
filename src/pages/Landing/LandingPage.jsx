import React, { Suspense, lazy } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

// Above-the-fold — loads normally so there's no initial layout shift
import HeroSection from "./components/HeroSection";

// Below-the-fold sections, lazy-loaded.
// File names are kept from the Dredging scaffold so nothing breaks, but
// each one is being re-scoped for Consultants content. Purpose per section:
//
//   MetricsSection      → "Impact in numbers" for Consultants:
//                          e.g. years advising, professionals deployed,
//                          industries served, engagements completed.
//
//   PhilosophySection   → The three pillars expanded:
//                          Think Smarter · Grow Faster · Lead Confidently.
//
//   CapabilitiesSection → The four consulting services expanded with
//                          descriptive cards:
//                          Strategic Consulting · Operational Excellence ·
//                          Outsourced Manpower · End-to-End Execution.
//
//   LeadershipSection   → Leadership + engagement leads (retains name).
//
// (Request each one when you want it rewritten.)
const MetricsSection = lazy(() => import("./components/MetricsSection"));
const PhilosophySection = lazy(() => import("./components/PhilosophySection"));
const CapabilitiesSection = lazy(() =>
  import("./components/CapabilitiesSection")
);
const LeadershipSection = lazy(() => import("./components/LeadershipSection"));

// Small, theme-matched fallback so the lazy boundary doesn't flash white
function SectionFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-[#FAFAFA]">
      <div className="flex items-center gap-3 opacity-60">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B38356] animate-pulse" />
        <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-slate-500">
          Loading
        </span>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-[#B38356] selection:text-white overflow-hidden">
      <Navbar />

      <main>
        <HeroSection />

        <Suspense fallback={<SectionFallback />}>
          <MetricsSection />
          <PhilosophySection />
          <CapabilitiesSection />
          <LeadershipSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}