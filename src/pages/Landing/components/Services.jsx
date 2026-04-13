import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Code, ShieldCheck, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Briefcase,
    title: 'Manpower & Staffing Solutions',
    description: 'Supplying skilled and semi-skilled labor, technical staffing for onshore/offshore, and specialized executive search to power your business.',
  },
  {
    icon: Code,
    title: 'Software & Web Development',
    description: 'Delivering agile, scalable software solutions, IT staff augmentation, and ERP implementation tailored to meet the digital needs of modern enterprises.',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity & Cloud IT',
    description: 'Securing your data and operations with robust cybersecurity management, reliable cloud infrastructure, and seamless workflow automation.',
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // 1. Header Animation
    tl.fromTo(headerRef.current.children, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );

    // 2. Cards Staggered Fade & Slide In
    const validCards = cardsRef.current.filter(Boolean);
    
    tl.fromTo(validCards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    // 3. Icon Pop inside cards
    validCards.forEach(card => {
      const icon = card.querySelector('.srv-icon');
      if (icon) {
        tl.fromTo(icon,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' },
          '-=0.6'
        );
      }
    });

  }, { scope: sectionRef });

  return (
    <section id="services" ref={sectionRef} className="py-24 px-6 lg:px-8 bg-[#f8f8f5]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-16">
          <p className="text-sm uppercase tracking-wider mb-4 flex items-center gap-3 text-slate-600 font-semibold">
            <span className="w-2 h-2 bg-[#0a2526] rounded-full"></span> 
            Our Services
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.1] text-[#0a2526]">
              Explore our<br/>service offerings
            </h2>
            <p className="text-slate-500 max-w-md text-lg leading-relaxed">
              Agile, compliant, and cost-effective IT and manpower solutions designed to power businesses with the right human capital and digital capabilities.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="bg-white p-10 lg:p-12 rounded-[2rem] group hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-400 ease-out flex flex-col"
            >
              <div className="srv-icon w-16 h-16 rounded-full bg-[#f8f8f5] text-[#0a2526] flex items-center justify-center mb-8 group-hover:bg-[#0a2526] group-hover:text-white transition-colors duration-300">
                <service.icon size={28} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-medium text-[#0a2526] mb-4">
                {service.title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                {service.description}
              </p>
              
              <Link 
                to="/services" 
                className="inline-flex items-center gap-2 text-[#0a2526] font-semibold text-sm group-hover:gap-3 transition-all duration-300"
              >
                Learn more <ArrowRight size={16} />
              </Link>
            </div>
          ))}

          {/* Dark CTA Card */}
          <div
            ref={el => cardsRef.current[3] = el}
            className="bg-[#0a2526] p-10 lg:p-12 rounded-[2rem] flex flex-col justify-center text-white relative overflow-hidden"
          >
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-medium text-[#e6ebff] mb-4">
                Expert Consultation
              </h3>
              <p className="text-slate-300 leading-relaxed mb-10 max-w-sm text-lg">
                Get guidance from our team of professionals to optimize your workforce management and IT infrastructure.
              </p>
              
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#0a2526] px-8 py-4 rounded-full font-semibold text-sm hover:bg-[#e6ebff] hover:shadow-lg transition-all duration-300"
              >
                Request Consultation <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}