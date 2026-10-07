import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * TreatmentSectionNav
 * Single-row horizontal scrollable capsule pill navigation with Odoo-style
 * smooth dynamic edge fade-in/fade-out, interactive chevron buttons,
 * and auto-centering active tab transitions.
 */
export default function TreatmentSectionNav({ tabs, activeSection, onTabClick }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check scroll position to dynamically toggle edge fade masks & arrows
  const checkScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    // Allow slight tolerance buffer for subpixel calculation
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  // Monitor scroll and window resize
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScrollState();
    el.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);

    // Track vertical page scroll for frosted glass elevation effect
    const handleWindowScroll = () => {
      setIsScrolled(window.scrollY > 160);
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [checkScrollState]);

  // Smoothly auto-center active tab in horizontal scroll view
  useEffect(() => {
    if (!scrollContainerRef.current || !activeSection) return;

    const container = scrollContainerRef.current;
    const activeEl = container.querySelector(`[data-tab-id="${activeSection}"]`);

    if (activeEl) {
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      const currentScroll = container.scrollLeft;
      const targetScroll = currentScroll + (activeRect.left - containerRect.left) - (container.clientWidth / 2) + (activeEl.clientWidth / 2);

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }

    // Re-check after smooth scroll completes
    const timer = setTimeout(checkScrollState, 350);
    return () => clearTimeout(timer);
  }, [activeSection, checkScrollState]);

  // Smooth manual scroll when clicking arrow buttons
  const handleManualScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollDistance = container.clientWidth * 0.65;

    container.scrollBy({
      left: direction === 'left' ? -scrollDistance : scrollDistance,
      behavior: 'smooth'
    });
  };

  if (!tabs || tabs.length === 0) return null;

  return (
    <div
      className={`jerush-sticky-subnav py-2 sm:py-2.5 z-30 relative transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-y border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.08)]'
          : 'bg-white/90 backdrop-blur-md border-y border-slate-200/70 shadow-xs'
        }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 relative">
        {/* ─── Odoo-Style Smooth Edge Fade-In / Fade-Out Masks ─── */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10 transition-opacity duration-300 ease-in-out ${canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10 transition-opacity duration-300 ease-in-out ${canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* ─── Left Chevron Scroll Button (Fades In when scrollable) ─── */}
        <button
          type="button"
          aria-label="Scroll tabs left"
          onClick={() => handleManualScroll('left')}
          className={`absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/95 shadow-md border border-slate-200/80 text-slate-700 hover:text-brandBlue hover:border-brandSky/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${canScrollLeft
              ? 'opacity-100 translate-x-0 pointer-events-auto'
              : 'opacity-0 -translate-x-2 pointer-events-none'
            }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* ─── Right Chevron Scroll Button (Fades In when scrollable) ─── */}
        <button
          type="button"
          aria-label="Scroll tabs right"
          onClick={() => handleManualScroll('right')}
          className={`absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/95 shadow-md border border-slate-200/80 text-slate-700 hover:text-brandBlue hover:border-brandSky/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${canScrollRight
              ? 'opacity-100 translate-x-0 pointer-events-auto'
              : 'opacity-0 translate-x-2 pointer-events-none'
            }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* ─── Scrollable Pill List Container ─── */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto no-scrollbar scroll-smooth px-3 sm:px-6 text-xs font-headline font-bold uppercase tracking-wider"
        >
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-max mx-auto py-0.5">
            {tabs.map((tab) => {
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  data-tab-id={tab.id}
                  onClick={() => onTabClick(tab.id)}
                  className={`shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-300 whitespace-nowrap active:scale-95 flex items-center gap-1.5 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brandSky/60 ${isActive
                      ? 'bg-gradient-to-r from-brandBlue via-[#198BC8] to-brandSky text-white shadow-[0_2px_12px_rgba(25,139,200,0.32)] scale-[1.02] border border-transparent font-extrabold'
                      : 'bg-slate-100/90 text-slate-600 hover:text-brandBlue hover:bg-brandSky/10 border border-slate-200/80 hover:border-brandSky/30 hover:scale-[1.02]'
                    }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
