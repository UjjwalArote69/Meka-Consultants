/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger to prevent warnings/errors
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const statRefs = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // 1. Container fade-in slightly
    tl.from(sectionRef.current, {
      y: 40, opacity: 0.8, duration: 1, ease: 'power3.out'
    }, 0);

    // 2. Image wipe reveal
    tl.fromTo('.about-img-wrap',
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut' },
      0.2
    );
    
    // Image slight scale down while revealing
    tl.from('.about-img', {
      scale: 1.2, duration: 1.6, ease: 'power3.out',
    }, 0.2);

    // 3. Text reveals
    tl.from('.about-label', { 
      y: 10, opacity: 0, duration: 0.5 
    }, 0.6);

    tl.from('.about-heading', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out'
    }, 0.8);

    tl.from('.about-text', {
      y: 20, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
    }, 1.0);

    // 4. Number Counters
    statRefs.current.forEach((el, index) => {
      if (!el) return;
      const target = parseInt(el.dataset.target, 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      
      if (!isNaN(target)) {
        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power3.out',
            snap: { innerText: 1 },
            onUpdate: function() {
              el.innerText = `${prefix}${Math.ceil(this.targets()[0].innerText)}${suffix}`;
            },
            scrollTrigger: { 
              trigger: el, 
              start: 'top 85%' 
            },
          }
        );
      }
    });

    tl.from('.about-stat-label', {
      y: 10, opacity: 0, duration: 0.5, stagger: 0.1,
    }, 1.2);

  }, { scope: sectionRef });

  return (
    <section className="px-4 lg:px-8 py-12">
      <div 
        id="about" 
        ref={sectionRef} 
        className="bg-[#0a2526] text-white py-24 px-8 lg:px-16 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left: Image */}
          <div className="w-full lg:w-[45%] shrink-0">
            <div className="about-img-wrap overflow-hidden rounded-[2rem] aspect-square lg:aspect-[4/5] shadow-2xl shadow-black/50">
              <img
                src="https://mekainfra.com/wp-content/uploads/2025/08/New-Project-2.webp"
                alt="Meka Infrastructure Engineering"
                className="about-img w-full h-full object-cover will-change-transform"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 space-y-10 lg:space-y-14">
            
            <div className="space-y-6">
              <div className="about-label flex items-center gap-3">
                <div className="w-2 h-2 bg-[#d5d9ff] rounded-full" />
                <p className="text-[#d5d9ff] text-sm font-semibold tracking-wider uppercase">
                  About Meka Infra
                </p>
              </div>

              <h2 className="about-heading text-4xl lg:text-5xl font-medium leading-[1.2] text-[#e6ebff]">
                With decades of engineering expertise, we deliver solutions that inspire progress.
              </h2>
            </div>

            <div className="space-y-6">
              <p className="about-text text-slate-300 text-lg leading-relaxed font-light">
                Meka Infrastructure was formed to address the rising need for quality urban and marine infrastructure solutions. We specialize in delivering innovative, reliable, and large-scale projects that drive growth in cities and coastal regions.
              </p>
              <p className="about-text text-slate-300 text-lg leading-relaxed font-light">
                We deliver world-class construction solutions by combining cutting-edge technology, specialized equipment, and expert teams to help clients bring their vision to life.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-8 pt-6 border-t border-slate-700/50">
              <div>
                <p 
                  ref={el => statRefs.current[0] = el} 
                  data-target="40" 
                  data-suffix="+"
                  className="font-medium text-4xl lg:text-5xl text-white mb-2"
                >
                  0
                </p>
                <p className="about-stat-label text-sm text-slate-400 font-medium">Successful Projects</p>
              </div>
              
              <div>
                <p 
                  ref={el => statRefs.current[1] = el} 
                  data-target="2016"
                  className="font-medium text-4xl lg:text-5xl text-white mb-2"
                >
                  0
                </p>
                <p className="about-stat-label text-sm text-slate-400 font-medium">Year Founded</p>
              </div>
              
              <div>
                <p 
                  ref={el => statRefs.current[2] = el} 
                  data-target="300"
                  data-suffix="+"
                  className="font-medium text-4xl lg:text-5xl text-white mb-2"
                >
                  0
                </p>
                <p className="about-stat-label text-sm text-slate-400 font-medium">Skilled Engineers</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}