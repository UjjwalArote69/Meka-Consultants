import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const badgeRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Text Reveals
    tl.fromTo('.hero-title-line',
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power4.out' },
      0.2
    );

    tl.fromTo('.hero-tagline',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.6
    );

    tl.fromTo('.hero-cta',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.8
    );

    // 2. Main Image Reveal (Wipe effect)
    if (imgRef.current) {
      gsap.set(imgRef.current, { clipPath: 'inset(100% 0 0 0)' });
      tl.to(imgRef.current, {
        clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut',
      }, 0.3);
      tl.from(imgRef.current.querySelector('img'), {
        scale: 1.15, duration: 1.6, ease: 'power3.out',
      }, 0.3);
    }

    // 3. Floating Badge Pop-in
    tl.fromTo(badgeRef.current,
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' },
      1.2
    );

    // 4. Stats Strip Fade In
    tl.from('.hero-stat', {
      y: 15, opacity: 0, duration: 0.5, stagger: 0.1,
    }, 1.4);

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#f8f8f5] px-6 lg:px-8 pt-20 lg:pt-32 pb-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Main Content Split */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left: Text & CTA */}
          <div className="flex-1 space-y-8 w-full z-10">
            <h1 className="text-5xl md:text-6xl lg:text-[76px] font-medium tracking-tight leading-[1.05] text-[#0a2526]">
              <div className="overflow-hidden pb-2"><div className="hero-title-line">Pioneering</div></div>
              <div className="overflow-hidden pb-2"><div className="hero-title-line text-slate-500">Urban</div></div>
              <div className="overflow-hidden pb-2"><div className="hero-title-line">Infrastructure</div></div>
            </h1>
            
            <p className="hero-tagline text-slate-600 max-w-md text-lg leading-relaxed">
              With almost 40 years of excellence in marine and civil works, we deliver solutions that empower cities and businesses to grow.
            </p>
            
            <div className="hero-cta flex items-center gap-6 pt-2">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0a2526] text-white text-sm font-semibold rounded-full hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                View Projects
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowUpRight size={14} className="text-white" />
                </span>
              </Link>
              <Link
                to="/contact"
                className="text-[#0a2526] text-sm font-semibold hover:text-slate-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-slate-300 hover:after:bg-[#0a2526] after:transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
          
          {/* Right: Image & Badge */}
          <div className="flex-1 relative w-full lg:mt-0 mt-8">
            <div ref={imgRef} className="w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50">
              <img 
                src="https://mekainfra.com/wp-content/uploads/2025/08/image-49.webp" 
                alt="Meka Infrastructure Construction" 
                className="w-full h-[500px] lg:h-[650px] object-cover origin-center"
              />
            </div>
            
            {/* Floating Glassmorphism Badge */}
            <div 
              ref={badgeRef} 
              className="absolute -bottom-6 -left-6 lg:bottom-10 lg:-left-12 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-white/40 max-w-[240px]"
            >
               <div className="bg-[#e6ebff] p-3 rounded-full text-[#0a2526]">
                 <Sparkles size={24} strokeWidth={1.5} />
               </div>
               <div>
                 <p className="text-sm font-bold text-[#0a2526]">40+ Years</p>
                 <p className="text-xs text-slate-500 font-medium">Of Marine Excellence</p>
               </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-24 pt-10 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="hero-stat flex flex-col gap-1">
            <span className="text-4xl font-medium text-[#0a2526]">300+</span>
            <span className="text-sm font-medium text-slate-500">Skilled Engineers</span>
          </div>
          <div className="hero-stat flex flex-col gap-1">
            <span className="text-4xl font-medium text-[#0a2526]">25+</span>
            <span className="text-sm font-medium text-slate-500">Years Combined Expertise</span>
          </div>
          <div className="hero-stat flex flex-col gap-1">
            <span className="text-4xl font-medium text-[#0a2526]">40+</span>
            <span className="text-sm font-medium text-slate-500">Successful Projects</span>
          </div>
          <div className="hero-stat flex flex-col gap-1">
            <span className="text-4xl font-medium text-[#0a2526]">450+</span>
            <span className="text-sm font-medium text-slate-500">Ongoing Projects</span>
          </div>
        </div>

      </div>
    </section>
  );
}