import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, ChevronRight,
  Cpu, Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import { TECHNOLOGIES_DATA, CATEGORIES_DATA } from '../data/technologiesData';

export default function TechnologiesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTech, setSelectedTech] = useState(TECHNOLOGIES_DATA[0]);
  const [activeImage, setActiveImage] = useState(TECHNOLOGIES_DATA[0].image);

  // Sync activeImage whenever selectedTech changes
  useEffect(() => {
    if (selectedTech) {
      setActiveImage(selectedTech.image);
    }
  }, [selectedTech]);

  // Auto-cycle through gallery images every 5 seconds
  useEffect(() => {
    if (!selectedTech?.gallery || selectedTech.gallery.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImage((currentImg) => {
        const gallery = selectedTech.gallery;
        const currentIndex = gallery.findIndex((item) => item.url === currentImg);
        const nextIndex = (currentIndex + 1) % gallery.length;
        return gallery[nextIndex].url;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedTech, activeImage]);

  const filteredTechnologies = activeTab === 'all'
    ? TECHNOLOGIES_DATA
    : TECHNOLOGIES_DATA.filter(t => t.category === activeTab);

  // If activeTab changes and current tech is not in filtered list, pick first
  const handleTabChange = (catId) => {
    setActiveTab(catId);
    const newFiltered = catId === 'all'
      ? TECHNOLOGIES_DATA
      : TECHNOLOGIES_DATA.filter(t => t.category === catId);
    if (newFiltered.length > 0 && !newFiltered.some(t => t.id === selectedTech?.id)) {
      setSelectedTech(newFiltered[0]);
      setActiveImage(newFiltered[0].image);
    }
  };

  const handleSelectTech = (tech) => {
    setSelectedTech(tech);
    setActiveImage(tech.image);
    // Smooth scroll into detail view on mobile
    if (window.innerWidth < 1024) {
      const stage = document.getElementById('tech-detail-stage');
      if (stage) {
        stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="w-full bg-slate-50 font-body text-left relative pt-0 pb-24 min-h-screen">
      {/* ─── 1. BREADCRUMB HERO ─── */}
      <PageBreadcrumbHero
        title="Advanced Technologies"
        subtitle="Explore our international medical-grade equipment, German CAD/CAM 3D aligner robotics, and FDA-approved laser platforms across Jerush centres."
        breadcrumbs={[
          { label: 'Technologies', active: true }
        ]}
      />

      <div className="jerush-container pt-10 sm:pt-12">

        {/* ─── 2. CENTERED SECTION HEADER & SUBTITLE ─── */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/15 text-brandBlue text-[11px] font-bold uppercase tracking-wider font-headline mb-3.5 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-brandSky" />
            <span>State-of-the-Art Clinical Infrastructure</span>
          </div>

          <h2 className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-tight">
            Precision Technologies Across{' '}
            <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
              Dental, Cosmetic &amp; Hair Care
            </span>
          </h2>

          <p className="text-secondary text-sm sm:text-base mt-3.5 leading-relaxed font-medium max-w-2xl mx-auto text-slate-600">
            Select any technology from the directory on the left to inspect its multi-angle clinical views, computerized precision parameters, and patient advantages across Jerush centres.
          </p>
        </div>

        {/* ─── 3. MASTER-DETAIL INTERACTIVE STUDIO (LEFT LIST, RIGHT SHOWCASE) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* ══════════════ LEFT COLUMN: ALL TECHNOLOGIES SELECTOR ══════════════ */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col space-y-4 lg:sticky lg:top-24">

            {/* Category Filter Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 sm:p-1.5 bg-slate-200/70 rounded-2xl border border-slate-300/60 shadow-inner">
              {CATEGORIES_DATA.map((cat) => {
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleTabChange(cat.id)}
                    className={`w-full py-2 px-1 sm:px-2 rounded-xl font-headline font-bold text-[10px] sm:text-[11px] uppercase tracking-tight sm:tracking-wider transition-all duration-200 cursor-pointer text-center whitespace-nowrap flex items-center justify-center ${isActive
                      ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-sm shadow-brandBlue/30'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                      }`}
                  >
                    <span>{cat.id === 'all' ? 'All' : cat.id === 'dental' ? 'Dental' : cat.id === 'cosmetic' ? 'Cosmetic' : 'Hair'}</span>
                    <span className="ml-0.5 sm:ml-1 opacity-75 text-[9px] sm:text-[10px]">({cat.count})</span>
                  </button>
                );
              })}
            </div>

            {/* List of Technologies with Vibrant, Visible Hover States & No Clipping */}
            <div className="space-y-3 pr-0 select-none">
              {filteredTechnologies.map((tech) => {
                const isSelected = selectedTech?.id === tech.id;

                return (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={() => handleSelectTech(tech)}
                    className={`group relative w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 flex items-center justify-between gap-3.5 border cursor-pointer overflow-hidden ${isSelected
                      ? 'bg-white border-brandBlue shadow-xl shadow-brandBlue/15 ring-2 ring-brandBlue/20 scale-[1.01]'
                      : 'bg-white hover:bg-gradient-to-r hover:from-white hover:to-sky-50/70 border-slate-200/90 hover:border-brandSky hover:shadow-lg hover:shadow-brandSky/10 hover:-translate-y-0.5'
                      }`}
                  >
                    {/* Left Accent Bar for Selected Item */}
                    {isSelected && (
                      <div className="absolute left-0 top-2.5 bottom-2.5 w-1.5 bg-gradient-to-b from-brandBlue to-brandSky rounded-r-full" />
                    )}

                    {/* Thumbnail with visible hover zoom */}
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border transition-all duration-300 relative shadow-xs ${isSelected ? 'border-brandBlue/40 ring-2 ring-brandBlue/20' : 'border-slate-200/80 group-hover:border-brandSky/60 group-hover:ring-2 group-hover:ring-brandSky/20'
                      }`}>
                      <img
                        src={tech.image}
                        alt={tech.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
                        loading="lazy"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider font-headline block mb-0.5 transition-colors ${tech.category === 'dental'
                        ? 'text-brandBlue'
                        : tech.category === 'cosmetic'
                          ? 'text-sky-600'
                          : 'text-emerald-600'
                        }`}>
                        {tech.categoryLabel}
                      </span>

                      <h4 className={`font-headline font-bold text-xs sm:text-[13px] leading-snug line-clamp-2 transition-colors duration-200 ${isSelected
                        ? 'text-brandBlue font-extrabold'
                        : 'text-slate-900 group-hover:text-brandBlue'
                        }`}>
                        {tech.title}
                      </h4>

                      <p className="text-slate-400 group-hover:text-slate-600 text-[11px] truncate mt-0.5 font-medium transition-colors">
                        {tech.equipmentName}
                      </p>
                    </div>

                    {/* Active Indicator Arrow with Clear Hover Reaction */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isSelected
                      ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-xs scale-105'
                      : 'bg-slate-100 group-hover:bg-brandSky group-hover:text-white text-slate-400 group-hover:scale-110 shadow-xs'
                      }`}>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* ══════════════ RIGHT COLUMN: SAME-PAGE FULL SPECIFICATION STAGE ══════════════ */}
          <div id="tech-detail-stage" className="lg:col-span-8 xl:col-span-8">
            <AnimatePresence mode="wait">
              {selectedTech && (
                <motion.div
                  key={selectedTech.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="bg-white rounded-3xl p-5 sm:p-7 lg:p-8 border border-slate-200/90 shadow-[0_10px_35px_rgba(15,23,42,0.05)] text-left flex flex-col space-y-7"
                >

                  {/* ─── 1. LARGE HIGHLIGHTED HERO IMAGE (SMOOTH CROSS-FADE CAROUSEL, NO BLINKING) ─── */}
                  <div>
                    <div className="w-full aspect-[16/10] sm:aspect-[16/9] max-h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 relative border border-slate-200/80 shadow-inner group">
                      {selectedTech.gallery?.map((item) => {
                        const isCur = activeImage === item.url;
                        return (
                          <img
                            key={item.url}
                            src={item.url}
                            alt={item.caption || selectedTech.title}
                            loading="eager"
                            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-out group-hover:scale-[1.03] group-hover:duration-[1800ms] will-change-transform ${
                              isCur ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                            }`}
                          />
                        );
                      })}
                    </div>

                    {/* ─── 2. CLINICAL THUMBNAIL GALLERY (BIGGER SIZING IN MOBILE) ─── */}
                    {selectedTech.gallery && selectedTech.gallery.length > 0 && (
                      <div className="mt-3.5 sm:mt-4">
                        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
                          {selectedTech.gallery.map((item, idx) => {
                            const isCur = activeImage === item.url;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setActiveImage(item.url)}
                                className={`group/thumb relative aspect-[4/3] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                                  isCur
                                    ? 'border-brandBlue ring-2 ring-brandBlue/30 shadow-md opacity-100'
                                    : 'border-slate-200 hover:border-brandSky/60 opacity-60 hover:opacity-100'
                                }`}
                              >
                                <img
                                  src={item.url}
                                  alt={item.caption}
                                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover/thumb:scale-105"
                                />
                                {isCur && (
                                  <div className="absolute inset-0 bg-brandBlue/10 pointer-events-none" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ─── 3. TITLE & EQUIPMENT IDENTITY ─── */}
                  <div className="border-b border-slate-100 pb-5">
                    <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-headline font-extrabold uppercase tracking-widest border mb-2.5 ${selectedTech.disciplineColor}`}>
                      {selectedTech.categoryLabel}
                    </span>

                    <h3 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 tracking-tight leading-tight">
                      {selectedTech.title}
                    </h3>

                    <p className="text-brandBlue font-headline font-bold text-sm sm:text-base mt-1">
                      {selectedTech.equipmentName}
                    </p>
                  </div>

                  {/* ─── 4. CLINICAL OVERVIEW ─── */}
                  <div>
                    <h4 className="font-headline font-black text-xs sm:text-sm uppercase tracking-wider text-slate-900 mb-2">
                      Clinical Overview &amp; Mode of Action
                    </h4>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {selectedTech.description}
                    </p>
                  </div>

                  {/* ─── 5. PATIENT ADVANTAGES AT JERUSH CENTRES ─── */}
                  <div>
                    <h4 className="font-headline font-black text-xs sm:text-sm uppercase tracking-wider text-slate-900 mb-3">
                      Patient Advantages at Jerush Centres
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedTech.advantages.map((adv, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50/90 rounded-2xl p-3.5 sm:p-4 border border-slate-200/70 flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed">
                            {adv}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ─── 6. TECHNICAL SPECIFICATIONS GRID ─── */}
                  <div>
                    <h4 className="font-headline font-black text-xs sm:text-sm uppercase tracking-wider text-slate-900 mb-3">
                      Precision Parameters &amp; Technical Specifications
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedTech.keySpecs.map((spec, idx) => (
                        <div
                          key={idx}
                          className="px-3.5 py-2 rounded-xl bg-slate-100/90 text-slate-800 font-headline font-bold text-xs border border-slate-200/80 shadow-xs flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brandSky" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ─── 7. DIRECT APPOINTMENT & CONSULTATION ACTION ─── */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-sky-50/40 to-slate-50 p-4 sm:p-5 rounded-2xl border border-sky-100">
                    <div className="min-w-0">
                      <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold block mb-0.5">
                        Associated Treatment:
                      </span>
                      <strong className="text-slate-900 font-headline font-bold text-sm sm:text-base leading-snug block">
                        {selectedTech.relatedTreatment}
                      </strong>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full xl:w-auto shrink-0">
                      <Link
                        to={selectedTech.relatedLink || '/treatments'}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 hover:border-brandSky bg-white text-slate-700 hover:text-brandBlue font-headline font-bold text-xs uppercase tracking-wider transition-all text-center whitespace-nowrap shadow-xs hover:shadow-sm"
                      >
                        Learn Treatment
                      </Link>

                      <Link
                        to="/contact"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-center whitespace-nowrap"
                      >
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>Book Consultation</span>
                      </Link>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* ─── 5. TREATMENT CTA BANNER ─── */}
        <div className="mt-12 sm:mt-16">
          <TreatmentCtaBanner
            badgeText="STATE-OF-THE-ART CARE"
            titlePrefix="Experience"
            highlightWord="Technology-Driven"
            titleSuffix="Care"
            subtitle="Consult with our senior specialists to discover how our German aligner robotics and medical-grade lasers can transform your treatment experience."
            primaryBtnText="Book Consultation"
            primaryBtnLink="/contact"
            imageSrc="/images/dental-chair.webp"
          />
        </div>

      </div>
    </div>
  );
}
