import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Sparkles, Flame, Shield, ArrowRight, Check, ArrowUpRight } from 'lucide-react';
import { treatmentService } from '../../services/treatmentService';

const CATEGORIES = [
  { id: 'dental', label: 'Dental Care', gif: '/gifs/dental-care.gif', icon: Smile },
  { id: 'cosmetic', label: 'Skin & Laser', gif: '/gifs/cosmetic.gif', icon: Sparkles },
  { id: 'hair', label: 'Hair Restoration', gif: '/gifs/hair.gif', icon: Flame },
  { id: 'body', label: 'Body Contouring', gif: '/gifs/body-reduction.gif', icon: Shield }
];

const getTreatmentImage = (treatment) => {
  if (treatment.image && treatment.image.trim() !== '') {
    return treatment.image;
  }
  switch (treatment.category) {
    case 'dental':
      return '/images/treatments/dental_implants.png';
    case 'cosmetic':
      return '/images/treatments/botox_fillers.png';
    case 'hair':
      return '/images/treatments/gfc_hair_therapy.png';
    case 'body':
      return '/images/treatments/cryo_sculpting.png';
    default:
      return '/images/treatments/dental_implants.png';
  }
};

export default function TreatmentsSection({ treatments }) {
  const navigate = useNavigate();
  const [localTreatments, setLocalTreatments] = useState([]);
  const [activeTab, setActiveTab] = useState('dental');

  useEffect(() => {
    if (treatments && treatments.length > 0) {
      setLocalTreatments(treatments);
    } else {
      treatmentService.getTreatments().then((data) => {
        setLocalTreatments(data);
      });
    }
  }, [treatments]);

  // Filter treatments by selected category — show only 4 on homepage for any tab
  const filteredTreatments = localTreatments
    .filter(t => t.category === activeTab)
    .slice(0, 4);

  const handleCtaClick = (e, path) => {
    e.preventDefault();
    navigate(path || '/treatments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get descriptive page links for specific redesigned treatments
  const getTreatmentPath = (item) => {
    if (item.id === 'gfc-hair') return '/hair-restoration-treatments/gfc-growth-factor-concentrate';
    if (item.id === 'fractional-co2-laser') return '/cosmetic-dermatology-laser-treatments/fractional-co2-laser';
    if (item.id === 'cryo-sculpting') return '/body-contouring-wellness/cryo-cool-sculpting';
    if (item.id === 'hair-transplant' || item.id === 'fue-transplant') return '/hair-restoration-treatments/hair-transplant';
    if (item.id === 'oral-pathology') return '/dental-treatments/oral-pathology-screening';
    if (item.id === 'dental-implants') return '/dental-implants';
    if (item.id === 'root-canal') return '/dental-treatments/root-canal-treatment-in-tamilnadu';
    if (item.id === 'metal-braces') return '/treatments/metal-braces';
    return `/treatments/${item.id}`;
  };

  const handleImageError = (e, category) => {
    e.target.onerror = null; // Prevent infinite loops
    switch (category) {
      case 'dental':
        e.target.src = '/images/treatments/dental_implants.png';
        break;
      case 'cosmetic':
        e.target.src = '/images/treatments/botox_fillers.png';
        break;
      case 'hair':
        e.target.src = '/images/treatments/gfc_hair_therapy.png';
        break;
      case 'body':
        e.target.src = '/images/treatments/cryo_sculpting.png';
        break;
      default:
        e.target.src = '/images/treatments/dental_implants.png';
    }
  };

  return (
    <section id="jerush-treatments" className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white font-body text-left relative overflow-hidden">
      {/* Background ambient decorative glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brandSky/8 rounded-full blur-3xl pointer-events-none -mr-40"></div>
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-brandBlue/8 rounded-full blur-3xl pointer-events-none -ml-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/15 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brandSky relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brandSky"></span>
            </span>
            <span className="text-[11px] font-bold text-brandBlue uppercase tracking-wider font-headline">
              Our Specialities
            </span>
          </div>
          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-[42px] text-slate-900 leading-tight tracking-tight">
            Advanced{' '}
            <span className="bg-gradient-to-r from-brandBlue via-[#1479BD] to-brandSky bg-clip-text text-transparent">
              Dental & Cosmetic Treatments
            </span>
          </h2>
          <p className="text-secondary text-sm sm:text-base mt-4 leading-relaxed max-w-2xl mx-auto">
            Discover our comprehensive range of dental, dermatology, hair restoration, and body wellness treatments — all under one roof with expert clinical precision.
          </p>
        </div>

        {/* Category Tabs (Modern Segmented Pill Dock) */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <div className="inline-flex max-w-full overflow-x-auto no-scrollbar scroll-smooth p-1.5 sm:p-2 bg-slate-100/90 backdrop-blur-xl rounded-full border border-slate-200/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] items-center gap-1.5 sm:gap-2 mx-auto">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`group relative flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-bold font-headline uppercase tracking-wider transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer select-none ${
                    isActive
                      ? 'bg-gradient-to-r from-brandBlue via-[#198BC8] to-brandSky text-white shadow-lg shadow-brandBlue/25 scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                  }`}
                >
                  <span className={`relative flex items-center justify-center w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full overflow-hidden shrink-0 transition-all duration-300 ${
                    isActive
                      ? 'bg-white/20 ring-1 ring-white/50 shadow-inner'
                      : 'bg-white border border-slate-200/90 shadow-xs group-hover:scale-105'
                  }`}>
                    <img src={cat.gif} alt={cat.label} loading="eager" className="w-full h-full object-cover pointer-events-none" />
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Display with Clean Fade-Slide Staggered Transition (No FLIP Scale Stretching) */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 xl:gap-7"
          >
            {filteredTreatments.map((treatment, idx) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-[26px] border border-slate-200/80 overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_35px_-10px_rgba(0,102,204,0.15)] hover:border-brandSky/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1.5"
                onClick={(e) => handleCtaClick(e, getTreatmentPath(treatment))}
              >
                <div className="flex flex-col flex-1">
                  {/* Photo Wrapper with Aspect 4:3 (Generous visible height without stretching) */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                    <img 
                      src={getTreatmentImage(treatment)} 
                      alt={treatment.title} 
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => handleImageError(e, treatment.category)}
                    />
                    {/* Subtle Gradient Scrim Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

                    {/* Floating Category Badge Pill on Top Left */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-brandBlue font-extrabold text-[10px] uppercase tracking-wider font-headline shadow-sm border border-white/60 group-hover:bg-brandBlue group-hover:text-white group-hover:border-transparent transition-all duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-brandSky group-hover:bg-white animate-pulse"></span>
                        {treatment.category === 'dental' && 'Dental'}
                        {treatment.category === 'cosmetic' && 'Skin & Laser'}
                        {treatment.category === 'hair' && 'Hair Restoration'}
                        {treatment.category === 'body' && 'Body Contour'}
                      </span>
                    </div>

                    {/* Floating Quick Action Arrow on Top Right (reveals on hover) */}
                    <div className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-slate-700 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-brandBlue group-hover:text-white transition-all duration-300 scale-75 group-hover:scale-100">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 sm:p-6 text-left flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-headline font-extrabold text-[17px] text-slate-900 group-hover:text-brandBlue transition-colors duration-300 line-clamp-2 min-h-[46px] flex items-center leading-snug">
                        {treatment.title}
                      </h3>
                      <p className="text-secondary text-xs sm:text-[13px] leading-relaxed line-clamp-3 font-medium mt-2">
                        {treatment.desc}
                      </p>
                    </div>

                    {/* Short checklist of key benefits */}
                    {treatment.benefits && treatment.benefits.length > 0 && (
                      <div className="space-y-1.5 pt-2.5 border-t border-slate-100">
                        {treatment.benefits.slice(0, 2).map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-600 font-medium">
                            <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/70">
                              <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                            </span>
                            <span className="line-clamp-1">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 mt-auto text-left">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brandBlue group-hover:text-brandSky font-headline uppercase tracking-wider transition-colors duration-300">
                      Learn Details
                    </span>
                    <span className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-brandBlue group-hover:to-brandSky group-hover:text-white flex items-center justify-center text-slate-500 transition-all duration-300 group-hover:translate-x-1 shadow-xs">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Treatments CTA */}
        <div className="text-center mt-12 sm:mt-14">
          <a
            href="#"
            onClick={(e) => handleCtaClick(e, '/treatments')}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-brandBlue via-[#198BC8] to-brandSky text-white font-bold text-xs sm:text-sm rounded-full overflow-hidden shadow-lg shadow-brandBlue/20 hover:shadow-brandBlue/35 hover:-translate-y-0.5 transition-all duration-300 select-none font-headline uppercase tracking-wider"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative z-10 flex items-center gap-2.5">
              <span>View All Treatments</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
