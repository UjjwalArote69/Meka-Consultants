import React, { Suspense, lazy, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

// Above-the-fold — loads normally so there's no initial layout shift
import HeroSection from "./components/HeroSection";

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
  // Refresh ScrollTrigger once lazy sections have mounted so their
  // triggers pick up the correct page offsets.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-[#B38356] selection:text-white overflow-hidden">
      <title>Meka Consultants — Engineering & Infrastructure Consulting</title>
      <meta name="description" content="Meka Consultants delivers expert engineering, project management, and infrastructure consulting services." />
      <Navbar />

      <main>
        <HeroSection />

        <Suspense fallback={<SectionFallback />}>
          <div className="cv-auto">
            <MetricsSection />
          </div>
          <div className="cv-auto">
            <PhilosophySection />
          </div>
          <div className="cv-auto">
            <CapabilitiesSection />
          </div>
          <div className="cv-auto">
            <LeadershipSection />
          </div>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}