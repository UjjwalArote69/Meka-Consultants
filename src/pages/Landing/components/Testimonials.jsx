import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "They brought clarity to complex problems, outlining clear metrics and delivering impactful solutions. Their business expertise exceeds our highest standards, consistently over-delivering on expectations.",
    author: "Jane Doe",
    role: "CEO, Tech Innovators",
    avatar: "https://placehold.co/100x100/1e293b/cbd5e1?text=JD"
  },
  {
    quote: "They navigated highly complex problems, outlining clear metrics and delivering impactful solutions. I was highly impressed by the management working cross-functionally to achieve outstanding business outcomes.",
    author: "John Smith",
    role: "CFO, Next Generation Infrastructure",
    avatar: "https://placehold.co/100x100/1e293b/cbd5e1?text=JS"
  }
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Fade in the container slightly
    tl.from(sectionRef.current.querySelector('.test-container'), {
      y: 40, opacity: 0.8, duration: 1, ease: 'power3.out'
    }, 0);

    // Header reveal
    tl.fromTo(headerRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      0.2
    );

    // Cards staggered reveal
    tl.fromTo(cardsRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
      0.6
    );

  }, { scope: sectionRef });

  return (
    <section id="testimonials" ref={sectionRef} className="py-12 px-4 lg:px-8">
      <div className="test-container bg-[#0a2526] text-white py-24 px-8 lg:px-16 rounded-[2rem] md:rounded-[3rem] max-w-[1200px] mx-auto relative overflow-hidden shadow-2xl">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d5d9ff]/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="relative z-10">
          {/* Header */}
          <div ref={headerRef} className="mb-16 md:mb-20">
            <p className="text-sm uppercase tracking-wider mb-4 flex items-center gap-3 text-[#d5d9ff] font-semibold">
              <span className="w-2 h-2 bg-white rounded-full"></span> 
              Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.1] text-[#e6ebff] max-w-2xl">
              Our Success Stories<br/>Real Results, Real Impact.
            </h2>
          </div>
          
          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {testimonials.map((item, index) => (
              <div 
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="bg-white/5 border border-white/10 p-8 lg:p-10 rounded-[2rem] relative group hover:bg-white/10 transition-colors duration-500 flex flex-col justify-between"
              >
                {/* Large Background Icon */}
                <Quote 
                  size={120} 
                  strokeWidth={0.5} 
                  className="absolute top-4 right-4 text-white/5 group-hover:text-white/10 transition-colors duration-500 -rotate-12" 
                />

                <div className="relative z-10 mb-10">
                  <p className="text-xl lg:text-2xl font-light leading-relaxed text-slate-200">
                    "{item.quote}"
                  </p>
                </div>
                
                <div className="relative z-10 flex items-center gap-5 pt-6 border-t border-white/10">
                  <img 
                    src={item.avatar} 
                    alt={item.author} 
                    className="w-14 h-14 rounded-full border border-white/20 object-cover"
                  />
                  <div>
                    <p className="text-lg font-medium text-white">{item.author}</p>
                    <p className="text-sm text-[#d5d9ff]">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}