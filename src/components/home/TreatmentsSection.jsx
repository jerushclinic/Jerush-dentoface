import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Sparkles, Flame, Shield, ArrowRight, Check } from 'lucide-react';
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
    <section id="jerush-treatments" className="w-full py-16 lg:py-20 bg-white font-body text-left relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-brandBlue/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-brandSky relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brandSky"></span>
            </span>
            <span className="text-[10px] font-bold text-brandBlue uppercase tracking-wider font-headline">
              Our Specialities
            </span>
          </div>
          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-primary mt-2">
            Advanced{' '}
            <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
              Dental & Cosmetic Treatments
            </span>
          </h2>
          <p className="text-secondary text-sm sm:text-base mt-4 leading-relaxed">
            Discover our comprehensive range of dental, dermatology, hair restoration, and body wellness treatments — all under one roof with expert clinical precision.
          </p>
        </div>

        {/* Category Tabs (Modern Segmented Pill Dock) */}
        <div className="flex justify-center mb-12 sm:mb-14">
          <div className="inline-flex max-w-full overflow-x-auto no-scrollbar scroll-smooth p-1.5 sm:p-2 bg-slate-100/90 backdrop-blur-xl rounded-full border border-slate-200/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] items-center gap-1.5 sm:gap-2 mx-auto">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`group relative flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-bold font-headline uppercase tracking-wider transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer select-none ${
                    isActive
                      ? 'bg-gradient-to-r from-brandBlue via-[#198BC8] to-brandSky text-white shadow-lg shadow-brandSky/25 scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                  }`}
                >
                  <span className={`relative flex items-center justify-center w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full overflow-hidden shrink-0 transition-all duration-300 ${
                    isActive
                      ? 'bg-white/20 ring-1 ring-white/50 shadow-inner'
                      : 'bg-white border border-slate-200/90 shadow-sm group-hover:scale-105'
                  }`}>
                    <img src={cat.gif} alt={cat.label} loading="eager" className="w-full h-full object-cover pointer-events-none" />
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Display */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredTreatments.map((treatment) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              key={treatment.id}
              className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-brandSky/20 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={(e) => handleCtaClick(e, getTreatmentPath(treatment))}
            >
              <div>
                {/* Photo Wrapper */}
                <div className="aspect-[16/10] overflow-hidden bg-slate-50 relative border-b border-slate-50">
                  <img 
                    src={getTreatmentImage(treatment)} 
                    alt={treatment.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => handleImageError(e, treatment.category)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent"></div>
                  <span className="absolute top-4 left-4 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-brandBlue/90 text-white shadow-sm font-headline">
                    {treatment.category === 'dental' && 'Dental'}
                    {treatment.category === 'cosmetic' && 'Skin & Laser'}
                    {treatment.category === 'hair' && 'Hair Restoration'}
                    {treatment.category === 'body' && 'Body Contour'}
                  </span>
                </div>

                {/* Body Info */}
                <div className="p-6 text-left space-y-3">
                  <h3 className="font-headline font-extrabold text-base text-primary group-hover:text-brandBlue transition-colors duration-300">
                    {treatment.title}
                  </h3>
                  <p className="text-secondary text-xs sm:text-sm leading-relaxed line-clamp-3 font-medium">
                    {treatment.desc}
                  </p>

                  {/* Short checklist of benefits */}
                  {treatment.benefits && treatment.benefits.length > 0 && (
                    <ul className="space-y-1.5 pt-2">
                      {treatment.benefits.slice(0, 2).map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="line-clamp-1">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Footer Link */}
              <div className="p-6 pt-0 mt-auto text-left">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brandBlue hover:text-brandSky font-headline uppercase tracking-wider group-hover:translate-x-1 transition-all duration-300">
                  Learn Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <a
            href="#"
            onClick={(e) => handleCtaClick(e, '/treatments')}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-brandBlue to-brandSky text-white font-bold text-sm rounded-xl overflow-hidden shadow-lg shadow-brandBlue/15 hover:shadow-brandBlue/25 hover:-translate-y-0.5 transition-all duration-300 select-none"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-brandSky to-brandBlue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative z-10 flex items-center gap-2 font-headline uppercase tracking-wider text-xs">
              View All Treatments
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
