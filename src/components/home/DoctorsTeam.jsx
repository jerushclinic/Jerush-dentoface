import React, { useState, useEffect, useRef, useCallback } from 'react';
import { doctorService } from '../../services/doctorService';
import DoctorProfileModal from '../common/DoctorProfileModal';

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
  }, [doctors]);

  const scrollNext = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const card = container.querySelector('.jerush-doctor-card');
      if (card) {
        const style = window.getComputedStyle(container);
        const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 24;
        const cardWidth = card.offsetWidth + gap;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScroll - 5) {
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
        const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 24;
        const cardWidth = card.offsetWidth + gap;
        if (container.scrollLeft <= 5) {
          container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
      }
    }
  }, []);

  // Auto-scroll on ALL devices — every 5 seconds, pause on hover
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
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-brandSky relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brandSky"></span>
            </span>
            <span className="text-[10px] font-bold text-brandBlue uppercase tracking-wider font-headline">
              Our Specialists
            </span>
          </div>
          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-primary mt-2">
            Meet Our{' '}
            <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
              Specialized Medical Team
            </span>
          </h2>
          <p className="text-secondary text-sm sm:text-base mt-4 leading-relaxed">
            Consult with our certified surgeons, orthodontists, and aesthetic dermatologists for personalized diagnostics.
          </p>
        </div>

        {/* Carousel Control Bar */}
        <div className="flex justify-end gap-3 mb-6">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-brandBlue hover:text-brandBlue shadow-sm transition-all duration-300 active:scale-95"
            aria-label="Previous card"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-brandBlue hover:text-brandBlue shadow-sm transition-all duration-300 active:scale-95"
            aria-label="Next card"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Doctors Carousel — scrollable on all devices, 4 visible on desktop */}
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex gap-6 overflow-x-auto pt-2 pb-8 px-1 scroll-smooth snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {localDoctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoctor(doc)}
              className="jerush-doctor-card rounded-3xl p-5 bg-gradient-to-b from-blue-50/40 via-sky-50/20 to-white border border-slate-200/60 hover:border-brandSky/50 shadow-[0_4px_20px_rgba(40,83,164,0.05)] hover:shadow-[0_14px_34px_rgba(40,83,164,0.12)] transition-all duration-300 ease-out shrink-0 w-[85%] sm:w-[280px] md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)] snap-start cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              {/* Soft glow accents */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brandSky/5 group-hover:bg-gradient-to-br group-hover:from-brandBlue/20 group-hover:to-brandSky/30 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10">
                {/* Image Wrap */}
                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-slate-100/60 relative border border-slate-200/50">
                  <img
                    src={doc.image || doc.fallbackImg}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = doc.fallbackImg;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-[10px] text-white font-headline font-bold uppercase tracking-wider bg-brandBlue/90 px-3 py-1.5 rounded-lg shadow-sm">
                      View Profile
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <h4 className="font-headline font-extrabold text-base text-primary group-hover:text-brandBlue transition-colors">
                    {doc.name}
                  </h4>
                  <p className="text-brandBlue font-semibold text-[11px] uppercase tracking-wider">
                    {doc.role}
                  </p>
                  <p className="text-slate-500 text-xs font-semibold">
                    {doc.qualification}
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-headline font-bold uppercase tracking-wide">
                <span>{doc.experience}</span>
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-brandBlue group-hover:to-brandSky text-slate-500 group-hover:text-white flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                  <span className="text-sm font-bold group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </div>
              </div>
            </div>
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
