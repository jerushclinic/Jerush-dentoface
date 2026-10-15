import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Sparkles, Flame, Shield, ArrowRight, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { treatmentService } from '../../services/treatmentService';

const CATEGORIES = [
  { id: 'cosmetic', label: 'Skin & Laser', gif: '/gifs/cosmetic.gif', icon: Sparkles },
  { id: 'dental', label: 'Dental Care', gif: '/gifs/dental-care.gif', icon: Smile },
  { id: 'hair', label: 'Hair Restoration', gif: '/gifs/hair.gif', icon: Flame },
  { id: 'body', label: 'Body Contouring', gif: '/gifs/body-reduction.gif', icon: Shield }
];

// Curated high-aesthetic treatment list with precise imagery & clinical descriptions
// Every category has at least 7-8 treatments so exactly 5 cards show cleanly on desktop with smooth carousel scroll
const CURATED_TREATMENTS = {
  cosmetic: [
    {
      id: 'laser-hair-removal',
      title: 'Laser Hair Removal',
      subtitle: 'Triple-wavelength diode cooling technology',
      image: '/images/medical-services/hydrafacial.png',
      path: '/treatments/laser-hair-removal',
      tag: 'Permanent Reduction'
    },
    {
      id: 'fractional-co2-laser',
      title: 'Acne Scar Treatment',
      subtitle: 'Fractional CO₂ laser skin resurfacing',
      image: '/images/medical-services/fractional_co2_laser.png',
      path: '/cosmetic-dermatology-laser-treatments/fractional-co2-laser',
      tag: 'FDA Approved'
    },
    {
      id: 'acne-treatment',
      title: 'Pimples Treatment',
      subtitle: 'Clinical acne control & salicylic peels',
      image: '/images/medical-services/chemical_peels.png',
      path: '/treatments/acne-treatment',
      tag: 'Active Acne Care'
    },
    {
      id: 'skin-whitening-treatment',
      title: 'Skin Lightening Treatment',
      subtitle: 'Medical brightening & glow therapy',
      image: '/images/medical-services/skin_whitening.png',
      path: '/treatments/skin-whitening-treatment',
      tag: 'Radiant Complexion'
    },
    {
      id: 'pigmentation-treatment',
      title: 'Pigmentation Treatment',
      subtitle: 'Melasma & dark spot Q-switch toning',
      image: '/images/medical-services/pico_laser.png',
      path: '/treatments/pigmentation-treatment',
      tag: 'Pico Laser Toning'
    },
    {
      id: 'hydrafacial',
      title: 'HydraFacial Deep Glow',
      subtitle: 'Pore vortex detox & antioxidant serum',
      image: '/images/medical-services/hydrafacial.png',
      path: '/treatments/hydrafacial',
      tag: 'Instant Radiance'
    },
    {
      id: 'carbon-peel-laser-treatment',
      title: 'Carbon Peel Laser',
      subtitle: 'Hollywood porcelain pore refining',
      image: '/images/medical-services/carbon_peel.png',
      path: '/treatments/carbon-peel-laser-treatment',
      tag: 'Zero Downtime'
    },
    {
      id: 'botox-fillers',
      title: 'Botox & Dermal Fillers',
      subtitle: 'US FDA-approved facial rejuvenation',
      image: '/images/medical-services/botox_fillers.png',
      path: '/treatments/botox-fillers',
      tag: 'Youthful Volume'
    }
  ],
  dental: [
    {
      id: 'clear-aligners',
      title: 'Jerushaligne Clear Aligners',
      subtitle: 'Custom 3D CAD/CAM invisible aligners',
      image: '/images/medical-services/clear_aligners.png',
      path: '/dental-treatments/top-quality-invisible-clear-aligners-jerushaligne',
      tag: 'Virtually Invisible'
    },
    {
      id: 'dental-implants',
      title: 'Advanced Dental Implants',
      subtitle: 'CBCT-guided permanent titanium roots',
      image: '/images/medical-services/dental_implants.png',
      path: '/dental-implants',
      tag: 'Lifetime Durability'
    },
    {
      id: 'smile-makeover',
      title: 'Cosmetic Smile Makeover',
      subtitle: 'Digital smile design & aesthetic veneers',
      image: '/images/medical-services/teeth_whitening.png',
      path: '/treatments/smile-makeover',
      tag: 'Custom Aesthetics'
    },
    {
      id: 'root-canal',
      title: 'Single-Visit Root Canal',
      subtitle: 'Painless rotary endodontics in 1 sitting',
      image: '/images/medical-services/root_canal.png',
      path: '/dental-treatments/root-canal-treatment-in-tamilnadu',
      tag: 'Save Natural Tooth'
    },
    {
      id: 'metal-braces',
      title: 'Orthodontic Braces',
      subtitle: 'Tooth-coloured ceramic & precision braces',
      image: '/images/medical-services/orthodontics_braces.png',
      path: '/treatments/metal-braces',
      tag: 'Precision Alignment'
    },
    {
      id: 'teeth-whitening',
      title: 'Laser Teeth Whitening',
      subtitle: 'Up to 8 shades whiter in 45 minutes',
      image: '/images/medical-services/teeth_whitening.png',
      path: '/treatments/teeth-whitening',
      tag: 'Instant Brightness'
    },
    {
      id: 'fixed-partial-denture',
      title: 'Crowns & Bridges (FPD)',
      subtitle: 'Premium monolithic zirconia restoration',
      image: '/images/medical-services/fixed_partial_denture.png',
      path: '/dental-treatments/best-crowns-and-bridges-treatment',
      tag: 'Zirconia Strength'
    },
    {
      id: 'wisdom-tooth',
      title: 'Wisdom Tooth Surgery',
      subtitle: 'Minimally invasive impacted extraction',
      image: '/images/medical-services/wisdom_tooth.png',
      path: '/treatments/wisdom-tooth',
      tag: 'Painless Relief'
    }
  ],
  hair: [
    {
      id: 'gfc-hair',
      title: 'GFC Growth Factor Therapy',
      subtitle: 'Concentrated autologous growth serum',
      image: '/images/medical-services/gfc_hair_therapy.png',
      path: '/hair-restoration-treatments/gfc-growth-factor-concentrate',
      tag: 'High Density'
    },
    {
      id: 'hair-transplant',
      title: 'FUE Hair Transplant',
      subtitle: 'Artistic hairline micro-extraction',
      image: '/images/medical-services/gfc_hair_therapy.png',
      path: '/hair-restoration-treatments/hair-transplant',
      tag: 'Permanent Growth'
    },
    {
      id: 'prp-hair-treatment',
      title: 'Clinical PRP Hair Therapy',
      subtitle: 'Platelet-rich plasma follicle revitalization',
      image: '/images/medical-services/gfc_hair_therapy.png',
      path: '/treatments/prp-hair-treatment',
      tag: 'Root Strengthening'
    },
    {
      id: 'qr678-hair',
      title: 'QR 678® Neo Therapy',
      subtitle: 'US FDA-patented peptide formulation',
      image: '/images/medical-services/qr678_therapy.png',
      path: '/treatments/qr678-hair',
      tag: 'Proven Regrowth'
    },
    {
      id: 'mesotherapy-hair',
      title: 'Scalp Mesotherapy',
      subtitle: 'Targeted vitamin & peptide micro-dosing',
      image: '/images/medical-services/gfc_hair_therapy.png',
      path: '/treatments/prp-hair-treatment',
      tag: 'Follicle Boost'
    },
    {
      id: 'anti-dandruff-scalp',
      title: 'Clinical Scalp Detox',
      subtitle: 'Anti-fungal & sebum rebalancing therapy',
      image: '/images/medical-services/hydrafacial.png',
      path: '/treatments/prp-hair-treatment',
      tag: 'Healthy Scalp'
    },
    {
      id: 'laser-hair-stimulation',
      title: 'Laser Hair Stimulation',
      subtitle: 'Cold red-light follicle bio-activation',
      image: '/images/medical-services/pico_laser.png',
      path: '/treatments/prp-hair-treatment',
      tag: 'Light Therapy'
    }
  ],
  body: [
    {
      id: 'cryo-sculpting',
      title: 'Cryo CoolSculpting',
      subtitle: 'Targeted non-surgical fat freezing',
      image: '/images/medical-services/cryo_sculpting.png',
      path: '/body-contouring-wellness/cryo-cool-sculpting',
      tag: 'Stubborn Fat Loss'
    },
    {
      id: 'hifu-skin-tightening',
      title: 'HIFU Non-Surgical Facelift',
      subtitle: 'Deep SMAS ultrasound tissue lifting',
      image: '/images/medical-services/botox_fillers.png',
      path: '/treatments/hifu-skin-tightening',
      tag: 'Face & Neck Lift'
    },
    {
      id: 'botox-fillers',
      title: 'Botox & Dermal Fillers',
      subtitle: 'US FDA-approved wrinkle relaxation',
      image: '/images/medical-services/botox_fillers.png',
      path: '/treatments/botox-fillers',
      tag: 'Youthful Volume'
    },
    {
      id: 'anti-ageing-facial',
      title: 'Clinical Collagen Therapy',
      subtitle: 'Micro-currents & peptide skin firming',
      image: '/images/medical-services/hydrafacial.png',
      path: '/treatments/anti-ageing-facial',
      tag: 'Supple Elasticity'
    },
    {
      id: 'rf-body-contouring',
      title: 'RF Body Contouring',
      subtitle: 'Radiofrequency dermal tissue tightening',
      image: '/images/medical-services/cryo_sculpting.png',
      path: '/body-contouring-wellness/cryo-cool-sculpting',
      tag: 'Tone & Firm'
    },
    {
      id: 'double-chin-reduction',
      title: 'Double Chin Sculpting',
      subtitle: 'Submental lipolysis & jaw contouring',
      image: '/images/medical-services/botox_fillers.png',
      path: '/body-contouring-wellness/cryo-cool-sculpting',
      tag: 'Jaw Definition'
    },
    {
      id: 'stretch-mark-reduction',
      title: 'Stretch Mark Revision',
      subtitle: 'Fractional laser dermal remodeling',
      image: '/images/medical-services/fractional_co2_laser.png',
      path: '/cosmetic-dermatology-laser-treatments/fractional-co2-laser',
      tag: 'Texture Renewal'
    }
  ]
};

export default function TreatmentsSection({ treatments }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cosmetic');
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Active items based on current category
  const activeItems = CURATED_TREATMENTS[activeTab] || CURATED_TREATMENTS.cosmetic;

  const isUpdatingScroll = useRef(false);
  const updateScrollButtons = () => {
    if (!isUpdatingScroll.current) {
      isUpdatingScroll.current = true;
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
          setCanScrollLeft(scrollLeft > 10);
          setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
        isUpdatingScroll.current = false;
      });
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollLeft = 0;
      updateScrollButtons();
    }
  }, [activeTab]);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isMobile = window.innerWidth < 640;
      // On mobile scroll by exactly one full card width; on desktop scroll by viewport section
      const scrollAmount = isMobile ? container.clientWidth : container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(updateScrollButtons, 350);
    }
  };

  const handleCtaClick = (e, path) => {
    e.preventDefault();
    navigate(path || '/treatments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/images/medical-services/hydrafacial.png';
  };

  return (
    <section id="jerush-treatments" className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50/80 to-white font-body text-left relative overflow-hidden">
      {/* Background ambient decorative glows with Jerush blue palette */}
      <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-brandSky/8 rounded-full blur-3xl pointer-events-none transform-gpu"></div>
      <div className="absolute bottom-1/4 -left-32 w-[450px] h-[450px] bg-brandBlue/6 rounded-full blur-3xl pointer-events-none transform-gpu"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/15 mb-3.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brandSky relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brandSky"></span>
            </span>
            <span className="text-[11px] font-bold text-brandBlue uppercase tracking-wider font-headline">
              Centres of Clinical Excellence
            </span>
          </div>

          <h2 className="font-headline font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight tracking-tight">
            Advanced{' '}
            <span className="bg-gradient-to-r from-brandBlue via-[#1685C5] to-brandSky bg-clip-text text-transparent">
              Dental & Cosmetic Treatments
            </span>
          </h2>

          <p className="text-secondary text-xs sm:text-sm md:text-[15px] mt-3.5 leading-relaxed max-w-2xl mx-auto font-normal text-slate-600">
            We personalise treatments to give you healthy, glowing skin and a confident, radiant smile. Explore our expert-led cosmetic dermatology, dental aesthetics, hair restoration and laser procedures.
          </p>
        </div>

        {/* Category Tabs: Instant-visibility 2x2 Grid on Mobile, Modern Segmented Pill Dock on Desktop */}
        <div className="flex justify-center mb-8 sm:mb-12 px-1 sm:px-0">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2 p-1.5 sm:p-2 bg-slate-100/90 backdrop-blur-xl rounded-2xl sm:rounded-full border border-slate-200/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] w-full max-w-[420px] sm:max-w-none sm:w-auto">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`group relative flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 px-3 sm:px-5 py-2.5 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-[13px] font-bold font-headline uppercase tracking-tight sm:tracking-wider transition-all duration-300 select-none cursor-pointer w-full sm:w-auto min-h-[46px] sm:min-h-0 ${isActive
                      ? 'bg-gradient-to-r from-brandBlue via-[#198BC8] to-brandSky text-white shadow-md sm:shadow-lg shadow-brandBlue/25 scale-[1.01]'
                      : 'bg-white/85 sm:bg-transparent text-slate-700 sm:text-slate-600 hover:text-slate-950 hover:bg-white sm:hover:bg-white/80 border border-slate-200/70 sm:border-transparent shadow-xs sm:shadow-none'
                    }`}
                >
                  <span className={`relative flex items-center justify-center w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full overflow-hidden shrink-0 transition-all duration-300 ${isActive
                      ? 'bg-white/20 ring-1 ring-white/50 shadow-inner'
                      : 'bg-white border border-slate-200/90 shadow-xs group-hover:scale-105'
                    }`}>
                    <img src={cat.gif} alt={cat.label} loading="eager" className="w-full h-full object-cover pointer-events-none" />
                  </span>
                  <span className="leading-tight text-left sm:text-center sm:whitespace-nowrap">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Oval Cards Carousel Slider matching user's design */}
        {/* Exactly 1 card on mobile (w-full snap-center), and 5 cards on desktop */}
        <div className="relative group/carousel">
          {/* Flanking Left Navigation Arrow */}
          <button
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous treatment"
            className={`absolute left-0 sm:-left-3 lg:-left-5 top-[165px] sm:top-[175px] xl:top-[185px] -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all duration-300 shadow-lg shadow-slate-300/40 ${
              canScrollLeft
                ? 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-700 hover:bg-gradient-to-r hover:from-brandBlue hover:to-brandSky hover:text-white hover:border-transparent hover:shadow-brandSky/25 hover:scale-110 active:scale-95 cursor-pointer'
                : 'bg-white/60 backdrop-blur-sm border-slate-200/50 text-slate-300 shadow-xs cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronLeft className="w-5 h-5 transition-transform duration-200" />
          </button>

          {/* Flanking Right Navigation Arrow */}
          <button
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Next treatment"
            className={`absolute right-0 sm:-right-3 lg:-right-5 top-[165px] sm:top-[175px] xl:top-[185px] -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all duration-300 shadow-lg shadow-slate-300/40 ${
              canScrollRight
                ? 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-700 hover:bg-gradient-to-r hover:from-brandBlue hover:to-brandSky hover:text-white hover:border-transparent hover:shadow-brandSky/25 hover:scale-110 active:scale-95 cursor-pointer'
                : 'bg-white/60 backdrop-blur-sm border-slate-200/50 text-slate-300 shadow-xs cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronRight className="w-5 h-5 transition-transform duration-200" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              ref={scrollContainerRef}
              onScroll={updateScrollButtons}
              className="flex items-stretch gap-4 sm:gap-4 md:gap-5 xl:gap-5 overflow-x-auto no-scrollbar pb-8 pt-2 px-0.5 overscroll-x-contain snap-x snap-mandatory sm:snap-none"
            >
              {activeItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={(e) => handleCtaClick(e, item.path)}
                  className="shrink-0 w-full sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2*1.25rem)/3)] lg:w-[calc((100%-4*1rem)/5)] xl:w-[calc((100%-4*1.25rem)/5)] snap-center flex flex-col items-center group cursor-pointer select-none"
                >
                  {/* Oval Container - taller, bigger vertical capsule with light soothing sky blue background */}
                  <div className="relative w-full max-w-[270px] sm:max-w-none aspect-[3.4/5.1] min-h-[310px] sm:min-h-[350px] lg:min-h-[340px] xl:min-h-[370px] rounded-[150px] overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#f0f7ff] to-[#e0f2fe] border border-sky-200/70 shadow-[0_10px_26px_-8px_rgba(30,151,212,0.12)] group-hover:shadow-[0_20px_38px_-6px_rgba(30,151,212,0.22)] group-hover:border-brandSky/60 group-hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-300 transform-gpu flex items-center justify-center p-2 sm:p-2.5">

                    {/* Model / Treatment Visual - Crisp, natural clarity */}
                    <div className="relative w-full h-full rounded-[140px] overflow-hidden flex items-center justify-center bg-transparent">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        onError={handleImageError}
                        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-108"
                      />
                    </div>

                    {/* Circular Action Button at the Bottom Center of the Oval */}
                    <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-20">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 xl:w-12 xl:h-12 rounded-full bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue text-white flex items-center justify-center shadow-md shadow-brandSky/35 group-hover:shadow-lg group-hover:shadow-brandSky/55 group-hover:scale-110 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Title & Subtitle below the Oval Card */}
                  <div className="mt-4 text-center px-1 w-full">
                    <h3 className="font-headline font-bold text-slate-800 text-[15px] sm:text-[16px] group-hover:text-brandBlue transition-colors duration-200 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-1 leading-snug">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View All Treatments CTA */}
        <div className="text-center mt-9 sm:mt-11">
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


