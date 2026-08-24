import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger sticky state when scrolled past 400px
      if (window.scrollY > 400) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleActionClick = (target, e) => {
    e.preventDefault();
    if (target === 'contact') {
      navigate('/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="jerush-hero" className="w-full relative overflow-hidden font-body bg-slate-950 h-[100dvh] xl:h-[calc(100vh-124px)] text-left">
      {/* HTML5 Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ transform: 'translate3d(0, 0, 0)' }}>
        <video
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-100"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ transform: 'translate3d(-50%, -50%, 0)', backfaceVisibility: 'hidden' }}
        >
          <source src="/videos/jerush-hero-video.mp4" type="video/mp4" />
        </video>
        {/* Multi-stage premium dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent via-70% to-slate-950"></div>
      </div>

      {/* Enclosed Capsule Quick Actions Bar (Desktop Only) */}
      <div 
        className={`hidden lg:block z-[999] transition-all duration-500 ease-out px-4 sm:px-6 ${
          isSticky 
            ? 'fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl' 
            : 'absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl'
        }`}
      >
        <div className={`grid grid-cols-4 divide-x divide-slate-800/80 overflow-hidden transform transition-all duration-300 ${
          isSticky 
            ? 'bg-slate-950/95 backdrop-blur-2xl border-t border-x border-b-0 border-sky-500/40 rounded-t-2xl ring-1 ring-white/10 hover:border-sky-400/60 shadow-[0_-4px_12px_rgba(15,23,42,0.08)]' 
            : 'bg-slate-950/90 backdrop-blur-xl border border-b-0 border-sky-500/30 rounded-t-2xl hover:border-sky-400/50'
        }`}>
          {/* Action 1: Book Appointment */}
          <a
            href="#"
            onClick={(e) => handleActionClick('contact', e)}
            className={`flex items-center justify-between hover:bg-white/[0.06] transition-all duration-300 group ${
              isSticky ? 'px-4 py-3 lg:px-5 lg:py-3.5' : 'px-5 py-3.5 lg:px-6 lg:py-4.5'
            }`}
          >
            <div className="flex flex-col text-left">
              <span className={`font-headline font-bold text-white group-hover:text-brandSky transition-colors whitespace-nowrap ${
                isSticky ? 'text-xs lg:text-[13.5px]' : 'text-sm lg:text-[15px]'
              }`}>
                Book Appointment
              </span>
              <span className={`text-slate-400 group-hover:text-slate-300 mt-0.5 transition-colors whitespace-nowrap ${
                isSticky ? 'text-[10.5px] lg:text-[11.5px]' : 'text-xs'
              }`}>
                Schedule online
              </span>
            </div>
            <div className={`rounded-full bg-brandSky/15 text-brandSky flex items-center justify-center shrink-0 group-hover:bg-brandSky group-hover:text-white group-hover:shadow-[0_0_12px_rgba(30,151,212,0.5)] transition-all duration-300 transform group-hover:translate-x-0.5 ml-2.5 ${
              isSticky ? 'w-6 h-6' : 'w-7 h-7'
            }`}>
              <svg className={isSticky ? 'w-3 h-3' : 'w-3.5 h-3.5'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          {/* Action 2: Find Clinics */}
          <a
            href="#"
            onClick={(e) => handleActionClick('contact', e)}
            className={`flex items-center justify-between hover:bg-white/[0.06] transition-all duration-300 group ${
              isSticky ? 'px-4 py-3 lg:px-5 lg:py-3.5' : 'px-5 py-3.5 lg:px-6 lg:py-4.5'
            }`}
          >
            <div className="flex flex-col text-left">
              <span className={`font-headline font-bold text-white group-hover:text-brandSky transition-colors whitespace-nowrap ${
                isSticky ? 'text-xs lg:text-[13.5px]' : 'text-sm lg:text-[15px]'
              }`}>
                Find Clinics
              </span>
              <span className={`text-slate-400 group-hover:text-slate-300 mt-0.5 transition-colors whitespace-nowrap ${
                isSticky ? 'text-[10.5px] lg:text-[11.5px]' : 'text-xs'
              }`}>
                Locate centre
              </span>
            </div>
            <div className={`rounded-full bg-brandSky/15 text-brandSky flex items-center justify-center shrink-0 group-hover:bg-brandSky group-hover:text-white group-hover:shadow-[0_0_12px_rgba(30,151,212,0.5)] transition-all duration-300 transform group-hover:translate-x-0.5 ml-2.5 ${
              isSticky ? 'w-6 h-6' : 'w-7 h-7'
            }`}>
              <svg className={isSticky ? 'w-3 h-3' : 'w-3.5 h-3.5'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          {/* Action 3: Explore Treatments */}
          <a
            href="#"
            onClick={(e) => handleActionClick('jerush-treatments', e)}
            className={`flex items-center justify-between hover:bg-white/[0.06] transition-all duration-300 group ${
              isSticky ? 'px-4 py-3 lg:px-5 lg:py-3.5' : 'px-5 py-3.5 lg:px-6 lg:py-4.5'
            }`}
          >
            <div className="flex flex-col text-left">
              <span className={`font-headline font-bold text-white group-hover:text-brandSky transition-colors whitespace-nowrap ${
                isSticky ? 'text-xs lg:text-[13.5px]' : 'text-sm lg:text-[15px]'
              }`}>
                Treatments
              </span>
              <span className={`text-slate-400 group-hover:text-slate-300 mt-0.5 transition-colors whitespace-nowrap ${
                isSticky ? 'text-[10.5px] lg:text-[11.5px]' : 'text-xs'
              }`}>
                View medical wings
              </span>
            </div>
            <div className={`rounded-full bg-brandSky/15 text-brandSky flex items-center justify-center shrink-0 group-hover:bg-brandSky group-hover:text-white group-hover:shadow-[0_0_12px_rgba(30,151,212,0.5)] transition-all duration-300 transform group-hover:translate-x-0.5 ml-2.5 ${
              isSticky ? 'w-6 h-6' : 'w-7 h-7'
            }`}>
              <svg className={isSticky ? 'w-3 h-3' : 'w-3.5 h-3.5'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          {/* Action 4: Smile Stories */}
          <a
            href="#"
            onClick={(e) => handleActionClick('testimonials', e)}
            className={`flex items-center justify-between hover:bg-white/[0.06] transition-all duration-300 group ${
              isSticky ? 'px-4 py-3 lg:px-5 lg:py-3.5' : 'px-5 py-3.5 lg:px-6 lg:py-4.5'
            }`}
          >
            <div className="flex flex-col text-left">
              <span className={`font-headline font-bold text-white group-hover:text-brandSky transition-colors whitespace-nowrap ${
                isSticky ? 'text-xs lg:text-[13.5px]' : 'text-sm lg:text-[15px]'
              }`}>
                Smile Stories
              </span>
              <span className={`text-slate-400 group-hover:text-slate-300 mt-0.5 transition-colors whitespace-nowrap ${
                isSticky ? 'text-[10.5px] lg:text-[11.5px]' : 'text-xs'
              }`}>
                Patient reviews
              </span>
            </div>
            <div className={`rounded-full bg-brandSky/15 text-brandSky flex items-center justify-center shrink-0 group-hover:bg-brandSky group-hover:text-white group-hover:shadow-[0_0_12px_rgba(30,151,212,0.5)] transition-all duration-300 transform group-hover:translate-x-0.5 ml-2.5 ${
              isSticky ? 'w-6 h-6' : 'w-7 h-7'
            }`}>
              <svg className={isSticky ? 'w-3 h-3' : 'w-3.5 h-3.5'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
