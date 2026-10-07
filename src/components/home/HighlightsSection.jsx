import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight, Sparkles, Clock, Layers, Award } from 'lucide-react';
import { highlightService } from '../../services/highlightService';
import { highlights as defaultHighlights } from '../../data/highlights';
import HighlightDetailModal from './HighlightDetailModal';

export default function HighlightsSection() {
  const [items, setItems] = useState(defaultHighlights);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Fetch highlights and filter published ones
    highlightService.getHighlights()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const published = data.filter(h => h.status === 'published' || !h.status);
          if (published.length > 0) {
            setItems(published);
          }
        }
      })
      .catch(err => {
        console.warn("Using default highlights data:", err);
      });
  }, []);

  const [visibleCount, setVisibleCount] = useState(3);
  const [gap, setGap] = useState(28);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      let newVisibleCount = 3;
      let newGap = 28;

      if (width >= 1024) {
        newVisibleCount = 3;
        newGap = 28;
      } else if (width >= 768) {
        newVisibleCount = 2;
        newGap = 20;
      } else {
        newVisibleCount = 1;
        newGap = 16;
      }

      setVisibleCount(newVisibleCount);
      setGap(newGap);

      setCurrentIndex(prev => {
        if (items.length === 0) return 0;
        const maxIndex = Math.max(0, items.length - newVisibleCount);
        return Math.min(prev, maxIndex);
      });
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [items.length]);

  // Auto-slide every 6 seconds when not paused or modal open
  useEffect(() => {
    if (isPaused || modalOpen || items.length <= visibleCount) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, items.length - visibleCount);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, modalOpen, items.length, visibleCount]);

  const maxIndex = Math.max(0, items.length - visibleCount);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  if (items.length === 0) return null;

  return (
    <section
      id="clinic-spotlight"
      className="w-full py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white text-left relative overflow-hidden transition-colors duration-300 font-body select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-brandBlue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-brandSky/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ─── 1. SECTION HEADER & NAVIGATION CONTROLS ─── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-brandBlue/5 border border-brandBlue/15 rounded-full text-[11px] font-headline font-bold uppercase tracking-wider text-brandBlue mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brandSky" />
              Clinical Excellence &amp; Milestones
            </span>

            <h2 className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight tracking-tight">
              Clinic Highlights &amp;{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Milestones
              </span>
            </h2>

            <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
              Explore our latest surgical breakthroughs, advanced technological acquisitions, and life-changing patient care milestones across Jerush centres.
            </p>
          </div>

          {/* Controls: Page Indicator & Next / Prev Buttons */}
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-end">
            <div className="text-xs font-headline font-bold text-slate-500 bg-slate-100/90 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-inner">
              <span className="text-brandBlue font-black">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="mx-1 text-slate-400">/</span>
              <span>{String(items.length).padStart(2, '0')}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-xl border border-slate-200/90 bg-white text-slate-700 hover:text-brandBlue hover:border-brandSky/60 hover:shadow-md flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                title="Previous Highlight"
                aria-label="Previous Highlight"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-xl border border-slate-200/90 bg-white text-slate-700 hover:text-brandBlue hover:border-brandSky/60 hover:shadow-md flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                title="Next Highlight"
                aria-label="Next Highlight"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ─── 2. CAROUSEL CARDS SLIDER ─── */}
        <div className="relative overflow-hidden w-full pt-2 pb-8 px-2 -mx-2" ref={containerRef}>
          <motion.div
            className="flex gap-4 sm:gap-6 lg:gap-7 w-full"
            animate={{ x: `calc(-${currentIndex * (100 / visibleCount)}% - ${currentIndex * (gap / visibleCount)}px)` }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                style={{ width: `calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})` }}
                className="shrink-0 flex-grow-0"
              >
                <div
                  onClick={() => handleCardClick(item)}
                  className="bg-white border border-slate-200/80 rounded-[28px] overflow-hidden shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06),0_10px_25px_-5px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-8px_rgba(15,23,42,0.12),0_8px_16px_-4px_rgba(15,23,42,0.06)] hover:border-slate-300/90 transition-all duration-500 flex flex-col h-[490px] cursor-pointer group text-left relative"
                >
                  {/* Image Cover Container */}
                  <div className="h-60 w-full overflow-hidden relative shrink-0 bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                    {/* Floating Category Pill Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`px-3 py-1 text-[10px] font-headline font-extrabold uppercase tracking-wider rounded-full shadow-lg text-white bg-gradient-to-r ${
                        item.categoryBadge || 'from-brandBlue to-brandSky'
                      } border border-white/20 backdrop-blur-md`}>
                        {item.category || 'Milestone'}
                      </span>
                    </div>

                    {/* Read Time Tag (Top Right) */}
                    {item.readTime && (
                      <div className="absolute top-4 right-4 z-20">
                        <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wide rounded-full bg-black/60 backdrop-blur-md text-slate-200 border border-white/15 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-brandSky" />
                          {item.readTime}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      {/* Date Row */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5 text-brandSky" />
                        <span>{item.date}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-headline font-black text-base sm:text-lg text-slate-900 group-hover:text-brandBlue transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed font-body">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-headline font-bold text-brandBlue group-hover:text-brandSky transition-colors">
                        Read Full Story
                      </span>

                      <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-brandBlue group-hover:to-brandSky text-slate-500 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm group-hover:scale-110">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─── 3. PAGINATION DOT INDICATORS ─── */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {Array.from({ length: items.length - visibleCount + 1 }).map((_, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-8 bg-gradient-to-r from-brandBlue to-brandSky shadow-sm'
                    : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                title={`Go to slide ${idx + 1}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>

      </div>

      {/* Highlights Modal Overlay */}
      <HighlightDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        highlight={selectedItem}
      />
    </section>
  );
}
