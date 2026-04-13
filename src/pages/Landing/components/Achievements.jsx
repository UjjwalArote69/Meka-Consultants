import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Award, ShieldCheck, Medal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const awards = [
  {
    icon: ShieldCheck,
    title: 'ISO 9001:2015 Certified',
    description: 'Recognized for our rigorous quality management systems across all marine and civil engineering projects.',
  },
  {
    icon: Trophy,
    title: 'Excellence in Marine Infrastructure',
    description: 'Awarded for outstanding execution of complex intake and outfall pipeline systems over the last decade.',
  },
  {
    icon: Award,
    title: 'Zero Incident Safety Record',
    description: 'Maintained an impeccable safety and compliance record across all major urban infrastructure sites.',
  },
  {
    icon: Medal,
    title: 'Top Tier Manpower Provider',
    description: 'Consistently ranked as a premier staffing partner for technical and offshore executive search.',
  }
];

export default function Achievements() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const numberRefs = useRef([]);
  const cardRefs = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // 1. Header Reveal
    tl.fromTo(headerRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );

    // 2. Big Numbers Animation
    numberRefs.current.forEach((el) => {
      if (!el) return;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      
      tl.fromTo(el,
        { innerText: 0, opacity: 0, y: 20 },
        {
          innerText: target,
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          snap: { innerText: 1 },
          onUpdate: function() {
            el.innerText = `${Math.ceil(this.targets()[0].innerText)}${suffix}`;
          }
        },
        "-=0.6" // Overlap with header animation
      );
    });

    // 3. Labels under numbers
    tl.from('.achievement-label', {
      y: 10, opacity: 0, duration: 0.5, stagger: 0.1,
    }, "-=1");

    // 4. Cards Staggered Fade In
    tl.fromTo(cardRefs.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      "-=0.4"
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-8 bg-[#f8f8f5]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div ref={headerRef} className="mb-20 text-center flex flex-col items-center">
          <p className="text-sm uppercase tracking-wider mb-4 flex items-center gap-3 text-slate-600 font-semibold">
            <span className="w-2 h-2 bg-[#0a2526] rounded-full"></span> 
            Our Achievements
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-[#0a2526] max-w-3xl">
            Setting the standard in infrastructure and technology.
          </h2>
        </div>

        {/* Massive Milestone Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 pb-16 border-b border-slate-200">
          <div className="flex flex-col items-center text-center">
            <span 
              ref={el => numberRefs.current[0] = el} 
              data-target="40" 
              data-suffix="+"
              className="text-6xl lg:text-7xl font-medium text-[#0a2526] mb-2 tracking-tighter"
            >
              0
            </span>
            <span className="achievement-label text-sm font-semibold text-slate-500 uppercase tracking-widest">
              Years Legacy
            </span>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <span 
              ref={el => numberRefs.current[1] = el} 
              data-target="150" 
              data-suffix="+"
              className="text-6xl lg:text-7xl font-medium text-[#0a2526] mb-2 tracking-tighter"
            >
              0
            </span>
            <span className="achievement-label text-sm font-semibold text-slate-500 uppercase tracking-widest">
              Global Clients
            </span>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <span 
              ref={el => numberRefs.current[2] = el} 
              data-target="500" 
              data-suffix="+"
              className="text-6xl lg:text-7xl font-medium text-[#0a2526] mb-2 tracking-tighter"
            >
              0
            </span>
            <span className="achievement-label text-sm font-semibold text-slate-500 uppercase tracking-widest">
              Projects Delivered
            </span>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <span 
              ref={el => numberRefs.current[3] = el} 
              data-target="100" 
              data-suffix="%"
              className="text-6xl lg:text-7xl font-medium text-[#0a2526] mb-2 tracking-tighter"
            >
              0
            </span>
            <span className="achievement-label text-sm font-semibold text-slate-500 uppercase tracking-widest">
              Safety Compliance
            </span>
          </div>
        </div>

        {/* Awards & Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award, index) => (
            <div 
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-400 group"
            >
              <div className="w-14 h-14 rounded-full bg-[#f8f8f5] flex items-center justify-center mb-6 group-hover:bg-[#0a2526] transition-colors duration-300">
                <award.icon size={24} strokeWidth={1.5} className="text-[#0a2526] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-medium text-[#0a2526] mb-3 leading-snug">
                {award.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {award.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}