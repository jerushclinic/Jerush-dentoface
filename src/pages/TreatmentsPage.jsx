import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smile, ShieldCheck, Heart, Sparkles, Activity, Search, Info, Calendar, ArrowRight,
  TrendingUp, Scissors, UserCheck, Flame
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import { treatmentService } from '../services/treatmentService';

// Icon Map helper to load Lucide components
const iconMap = {
  Smile, ShieldCheck, Heart, Sparkles, Activity, TrendingUp, Scissors, UserCheck, Flame
};

const getIcon = (name) => {
  return iconMap[name] || iconMap[name + 'Icon'] || Smile;
};

export default function TreatmentsPage() {
  const navigate = useNavigate();
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getTreatmentPath = (id) => {
    if (id === 'gfc-hair') return '/hair-restoration-treatments/gfc-growth-factor-concentrate';
    if (id === 'fractional-co2-laser') return '/cosmetic-dermatology-laser-treatments/fractional-co2-laser';
    if (id === 'cryo-sculpting') return '/body-contouring-wellness/cryo-cool-sculpting';
    if (id === 'hair-transplant' || id === 'fue-transplant') return '/hair-restoration-treatments/hair-transplant';
    if (id === 'oral-pathology') return '/dental-treatments/oral-pathology-screening';
    if (id === 'dental-implants') return '/dental-implants';
    if (id === 'root-canal') return '/dental-treatments/root-canal-treatment-in-tamilnadu';
    if (id === 'metal-braces') return '/treatments/metal-braces';
    return `/treatments/${id}`;
  };

  useEffect(() => {
    const fetchTreatments = async () => {
      setLoading(true);
      try {
        const data = await treatmentService.getTreatments();
        // Parse benefit arrays if they are stored as JSON/comma string in DB
        const parsed = data.map(t => {
          let parsedBenefits = [];
          if (Array.isArray(t.benefits)) {
            parsedBenefits = t.benefits;
          } else if (typeof t.benefits === 'string') {
            try {
              parsedBenefits = JSON.parse(t.benefits);
            } catch (e) {
              parsedBenefits = t.benefits.split(',').map(b => b.trim());
            }
          }
          return {
            ...t,
            benefits: parsedBenefits
          };
        });
        setTreatments(parsed);
      } catch (err) {
        console.error("Failed to load treatments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  const categories = [
    { id: 'all', name: 'All Treatments', icon: Activity, count: treatments.length },
    { id: 'dental', name: 'Dental Care', icon: Smile, count: treatments.filter(t => t.category === 'dental').length },
    { id: 'cosmetic', name: 'Laser & Cosmetic', icon: Sparkles, count: treatments.filter(t => t.category === 'cosmetic').length },
    { id: 'hair', name: 'Hair Restoration', icon: TrendingUp, count: treatments.filter(t => t.category === 'hair').length },
    { id: 'body', name: 'Body Contouring', icon: Heart, count: treatments.filter(t => t.category === 'body').length },
  ];

  const filteredData = treatments.filter(t => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pt-0 font-body relative overflow-hidden text-left pb-24">
      <PageBreadcrumbHero 
        title="Our Treatments" 
        breadcrumbs={[{ label: 'Treatments', active: true }]} 
      />

      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-brandBlue/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 mt-12">

        {/* Sticky Filter and Search Bar */}
        <div className="sticky top-[84px] z-30 flex flex-col lg:flex-row gap-6 items-center justify-between mb-12 bg-white/90 backdrop-blur-xl border border-slate-200/80 py-4 px-6 rounded-3xl shadow-md shadow-slate-200/50 transition-all">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-x-2.5 gap-y-3 justify-center lg:justify-start w-full lg:w-auto">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl font-headline font-bold text-xs uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white border-transparent shadow-lg shadow-brandBlue/15'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                    activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative w-full lg:max-w-xs shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl placeholder-slate-400 focus:outline-none focus:border-brandSky focus:bg-white transition-all text-sm shadow-inner"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          /* Treatments Cards Grid with Smooth Staggered Transition (No FLIP Scale Stretching) */
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${activeCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8"
            >
              {filteredData.map((treatment, idx) => {
                const Icon = getIcon(treatment.iconName || 'Smile');
                return (
                  <motion.div
                    key={treatment.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
                    className="group bg-white border border-slate-200/80 hover:border-brandSky/40 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-brandBlue/10 hover:-translate-y-1.5"
                  >
                    <div className="flex flex-col flex-1">
                      {/* Image & Badges with Natural 4:3 Visible Height */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                        {treatment.image ? (
                          <img 
                            src={treatment.image} 
                            alt={treatment.title} 
                            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105" 
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              if (treatment.category === 'hair') e.target.src = '/images/treatments/gfc_hair_therapy.png';
                              else if (treatment.category === 'cosmetic') e.target.src = '/images/treatments/botox_fillers.png';
                              else if (treatment.category === 'body') e.target.src = '/images/treatments/cryo_sculpting.png';
                              else e.target.src = '/images/treatments/dental_implants.png';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-brandBlue/5 to-brandSky/5 flex items-center justify-center">
                            <Smile className="w-12 h-12 text-brandSky/30" />
                          </div>
                        )}

                        {/* Subtle Scrim Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                        
                        {/* Floating Category Badge Pill on Top Left */}
                        <div className="absolute top-3.5 left-3.5 z-10">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider font-headline shadow-sm border ${
                            treatment.category === 'dental' 
                              ? 'bg-blue-600/90 text-white border-blue-400/30'
                              : treatment.category === 'cosmetic'
                              ? 'bg-purple-600/90 text-white border-purple-400/30'
                              : treatment.category === 'hair'
                              ? 'bg-emerald-600/90 text-white border-emerald-400/30'
                              : 'bg-rose-600/90 text-white border-rose-400/30'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                            {treatment.category === 'hair' ? 'Hair Restoration' : treatment.category === 'body' ? 'Body Contouring' : treatment.category === 'cosmetic' ? 'Skin & Laser' : 'Dental Care'}
                          </span>
                        </div>
                        
                        {/* Floating Icon Round Badge Overlay on Bottom Right of Photo */}
                        <div className="absolute bottom-3.5 right-3.5 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-white/60 shadow-md flex items-center justify-center text-brandBlue group-hover:scale-110 group-hover:bg-brandBlue group-hover:text-white transition-all duration-300 z-10">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 pb-2 text-left flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-headline font-extrabold text-[17px] sm:text-lg text-slate-900 group-hover:text-brandBlue transition-colors line-clamp-2 min-h-[48px] flex items-center leading-snug">
                            {treatment.title}
                          </h3>
                          <p className="text-secondary text-xs sm:text-sm leading-relaxed mt-2 line-clamp-3">
                            {treatment.desc}
                          </p>
                        </div>

                        {/* Bullet Benefits */}
                        {treatment.benefits && treatment.benefits.length > 0 && (
                          <div className="space-y-1.5 pt-3 mt-3 border-t border-slate-100">
                            {treatment.benefits.slice(0, 3).map((b, bIdx) => (
                              <div key={bIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-600 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-brandSky shrink-0"></span>
                                <span className="line-clamp-1">{b}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="px-6 pb-6 pt-3 mt-auto">
                      <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => {
                            navigate(getTreatmentPath(treatment.id));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80 rounded-xl text-xs font-bold font-headline transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Info className="w-3.5 h-3.5 text-brandBlue" />
                          Details
                        </button>
                        <a
                          href="#"
                          onClick={handleBookClick}
                          className="flex-1 py-2.5 bg-gradient-to-r from-brandBlue via-[#198BC8] to-brandSky text-white rounded-xl text-xs font-bold font-headline transition-all hover:shadow-md hover:shadow-brandBlue/20 hover:brightness-105 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-brandBlue/15"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          Book Now
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {filteredData.length === 0 && !loading && (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl">
            <p className="text-slate-550 font-headline font-bold text-lg">No treatments found matching your query.</p>
            <p className="text-slate-400 text-xs mt-2">Try adjusting your filters or search keywords.</p>
          </div>
        )}

      </div>

      {/* ─── Bottom CTA Banner (New Dark Navy Aesthetic) ─── */}
      <TreatmentCtaBanner
        badgeText="World-Class Care"
        titlePrefix="Book Your"
        highlightWord="Appointment"
        titleSuffix="Today"
        subtitle="Take the first step toward a healthier, brighter smile. Our expert multidisciplinary team is ready to provide personalized care just for you."
        primaryBtnText="Book Free Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
      />
    </div>
  );
}
