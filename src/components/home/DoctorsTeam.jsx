import React, { useState, useEffect, useRef, useCallback } from 'react';
import { doctorService } from '../../services/doctorService';
import DoctorProfileModal from '../common/DoctorProfileModal';
import DoctorCard from '../common/DoctorCard';

export default function DoctorsTeam({ doctors }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [localDoctors, setLocalDoctors] = useState([]);
  const containerRef = useRef(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    if (doctors) {
      setLocalDoctors(doctors);
    } else {
      doctorService.getDoctors().then((data) => {
        setLocalDoctors(data);
      });
    }

    const handleUpdated = (e) => {
      if (e.detail && Array.isArray(e.detail) && e.detail.length > 0) {
        setLocalDoctors(e.detail);
      }
    };
    window.addEventListener('jerush_doctors_updated', handleUpdated);
    return () => window.removeEventListener('jerush_doctors_updated', handleUpdated);
  }, [doctors]);

  const scrollNext = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const card = container.querySelector('.jerush-doctor-card');
      if (card) {
        const style = window.getComputedStyle(container);
        const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 16;
        const cardWidth = card.offsetWidth + gap;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }
  }, []);

  const scrollPrev = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const card = container.querySelector('.jerush-doctor-card');
      if (card) {
        const style = window.getComputedStyle(container);
        const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 16;
        const cardWidth = card.offsetWidth + gap;
        if (container.scrollLeft <= 10) {
          container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
      }
    }
  }, []);

  // Auto-scroll on ALL devices — every 5 seconds, pause on hover or touch
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPausedRef.current) {
        scrollNext();
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [scrollNext]);

  const handleMouseEnter = () => { isPausedRef.current = true; };
  const handleMouseLeave = () => { isPausedRef.current = false; };

  return (
    <section id="jerush-doctors" className="w-full py-16 lg:py-20 bg-white font-body relative overflow-hidden text-left">

      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-brandBlue/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/15 mb-3.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brandSky relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brandSky"></span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-brandBlue uppercase tracking-wider font-headline">
              Our Specialists
            </span>
          </div>
          <h2 className="font-headline font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight tracking-tight">
            Meet Our{' '}
            <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
              Specialized Medical Team
            </span>
          </h2>
          <p className="text-secondary text-xs sm:text-sm md:text-base mt-2.5 sm:mt-3 leading-relaxed font-normal text-slate-600 max-w-2xl mx-auto">
            Consult with our certified surgeons, orthodontists and aesthetic dermatologists for personalized diagnostics.
          </p>
        </div>

        {/* Carousel Control Bar — at the top of the card on the right side */}
        <div className="flex justify-end items-center gap-2.5 mb-3 sm:mb-4">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:border-brandBlue hover:text-brandBlue hover:bg-slate-50 shadow-sm transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Previous specialist"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:border-brandBlue hover:text-brandBlue hover:bg-slate-50 shadow-sm transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Next specialist"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Doctors Carousel — exactly one card visible on mobile, 2 on tablet, 4 on desktop */}
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onTouchEnd={handleMouseLeave}
          className="flex gap-4 sm:gap-6 overflow-x-auto pt-2 pb-8 px-0 sm:px-1 scroll-smooth snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {localDoctors.map((doc) => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
              onClick={() => setSelectedDoctor(doc)}
              className="shrink-0 w-full min-w-full sm:min-w-0 sm:w-[280px] md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)] snap-start"
            />
          ))}
        </div>
      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <DoctorProfileModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </section>
  );
}
