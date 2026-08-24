import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Smile, ShieldCheck, Activity, Search, Filter,
  CheckCircle2, Star, Calendar, Phone, ArrowRight, Play,
  Maximize2, X, User, Clock, MapPin, Award, Check, Layers, ChevronRight
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import BeforeAfterSlider from '../components/common/BeforeAfterSlider';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import { CATEGORIES, transformationCases, VIDEO_STORIES } from '../data/transformationsData';

export default function SmileStoriesPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterSectionRef = useRef(null);

  const normalizeCategory = (cat) => {
    if (!cat) return 'all';
    const lower = cat.toLowerCase().trim();
    if (lower === 'dental' || lower === 'smile' || lower === 'smile-transformations' || lower === 'smile-stories' || lower === 'dentistry') return 'dental';
    if (lower === 'skin' || lower === 'laser' || lower === 'cosmetic' || lower === 'cosmetic-resurfacing' || lower === 'resurfacing') return 'skin';
    if (lower === 'hair' || lower === 'hair-restoration' || lower === 'hair-regrowth' || lower === 'hair-regrowth-results') return 'hair';
    if (lower === 'body' || lower === 'body-contouring' || lower === 'body-contouring-cases' || lower === 'wellness') return 'body';
    return 'all';
  };

  const paramCategory = searchParams.get('category') || searchParams.get('tab');
  const initialCategory = normalizeCategory(paramCategory);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalCase, setActiveModalCase] = useState(null);
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [viewLayout, setViewLayout] = useState('grid'); // 'grid' or 'compact'

  // Sync category when URL search parameter changes
  useEffect(() => {
    if (paramCategory) {
      const normalized = normalizeCategory(paramCategory);
      setSelectedCategory(normalized);
    }
  }, [paramCategory]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalCase(null);
        setActiveVideoModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute available subcategories based on selected category
  const subCategories = useMemo(() => {
    const cases = selectedCategory === 'all'
      ? transformationCases
      : transformationCases.filter(c => c.category === selectedCategory);
    const set = new Set(cases.map(c => c.subCategory));
    return ['all', ...Array.from(set)];
  }, [selectedCategory]);

  // Reset subcategory if not found in new category
  useEffect(() => {
    setSelectedSubCategory('all');
  }, [selectedCategory]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ category: catId }, { replace: true });
    }
  };

  // Filtered cases
  const filteredCases = useMemo(() => {
    return transformationCases.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSubCategory = selectedSubCategory === 'all' || item.subCategory === selectedSubCategory;
      const matchSearch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.procedure.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSubCategory && matchSearch;
    });
  }, [selectedCategory, selectedSubCategory, searchQuery]);

  const handleBookClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Smile': return <Smile className="w-4 h-4" />;
      case 'Activity': return <Activity className="w-4 h-4" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full bg-slate-950 text-white font-body relative pt-0 pb-24 min-h-screen overflow-hidden">
      {/* ─── 1. BREADCRUMB HERO ─── */}
      <PageBreadcrumbHero
        title="Smile Stories & Transformations"
        breadcrumbs={[
          { label: 'Transformations', path: '/smile-stories' },
          { label: 'Smile Stories', active: true }
        ]}
      />

      {/* Background Ambient Glows */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-brandBlue/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-brandSky/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ─── 2. HERO INTRO & METRICS ─── */}
        <section className="text-center space-y-6 pt-8 pb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/90 border border-brandSky/30 rounded-full text-xs font-bold font-headline uppercase tracking-widest text-brandSky shadow-lg shadow-brandSky/5">
            <Sparkles className="w-4 h-4 text-brandSky" />
            Verified Clinical Case Dossier
          </div>
          
          <h1 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Witness the Art of <span className="bg-gradient-to-r from-brandSky via-sky-300 to-white bg-clip-text text-transparent">Life-Changing</span> Transformations
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Explore authentic, documented Before & After journeys across Advanced Dentistry, Laser Cosmetic Dermatology, Micro-FUE Hair Restoration, and Body Contouring at South India's premier super-speciality centre.
          </p>

          {/* Trust Counter Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center backdrop-blur-md">
              <span className="font-headline font-black text-2xl sm:text-3xl text-brandSky block">25,000+</span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mt-1">Smiles Restored</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center backdrop-blur-md">
              <span className="font-headline font-black text-2xl sm:text-3xl text-brandSky block">99.4%</span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mt-1">Patient Satisfaction</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center backdrop-blur-md">
              <span className="font-headline font-black text-2xl sm:text-3xl text-brandSky block">25+ Yrs</span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mt-1">Clinical Legacy</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center backdrop-blur-md">
              <span className="font-headline font-black text-2xl sm:text-3xl text-brandSky block">100%</span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mt-1">Verified Clinical Cases</span>
            </div>
          </div>
        </section>

        {/* ─── 3. FILTER PILLS & SEARCH BAR ─── */}
        <section className="space-y-6 mb-12">
          {/* Main Category Filter Pills */}
          <div className="flex justify-center">
            <div className="flex flex-wrap items-center justify-center gap-2.5 p-2 bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-full backdrop-blur-xl max-w-full shadow-2xl">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = cat.id === 'all' 
                  ? transformationCases.length 
                  : transformationCases.filter(c => c.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-headline font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-lg shadow-brandBlue/30 scale-102'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {getCategoryIcon(cat.icon)}
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subcategory Filter Pills & Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md">
            {/* Subcategories */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest font-headline mr-1 hidden sm:inline">
                Focus:
              </span>
              {subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-headline font-semibold transition-all cursor-pointer ${
                    selectedSubCategory === sub
                      ? 'bg-brandSky/20 text-brandSky border border-brandSky/40 shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {sub === 'all' ? 'All Sub-Treatments' : sub}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search procedure, doctor, case..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brandSky transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ─── 4. TRANSFORMATION CARDS GRID ─── */}
        <section className="space-y-8 mb-20">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider font-headline">
              Showing <span className="text-brandSky font-bold">{filteredCases.length}</span> Transformation Cases
            </p>
          </div>

          {filteredCases.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <Smile className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="font-headline font-bold text-lg text-white">No transformation cases match your filter</h3>
              <p className="text-slate-400 text-xs">Try selecting "All Stories" or clearing your search term.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSelectedSubCategory('all'); setSearchQuery(''); }}
                className="px-4 py-2 bg-brandBlue text-white text-xs font-bold rounded-xl font-headline"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-slate-900/70 border border-slate-800/90 rounded-3xl p-5 shadow-xl hover:shadow-2xl hover:border-slate-700/80 transition-all flex flex-col justify-between space-y-4 text-left group backdrop-blur-sm"
                >
                  {/* Card Top Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-brandSky/10 text-brandSky border border-brandSky/20 uppercase tracking-wider font-headline">
                        {item.subCategory}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
                        <Clock className="w-3 h-3 text-brandSky" />
                        <span>{item.timeframe}</span>
                      </div>
                    </div>

                    <h3 className="font-headline font-bold text-base text-white leading-snug group-hover:text-brandSky transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  {/* Interactive Before-After Slider Component */}
                  <BeforeAfterSlider
                    beforeImage={item.beforeImg}
                    afterImage={item.afterImg}
                    beforeLabel={item.beforeLabel}
                    afterLabel={item.afterLabel}
                    aspectRatio="aspect-[4/3]"
                    alt={item.title}
                  />

                  {/* Patient & Doctor Footer */}
                  <div className="pt-2 border-t border-slate-800/70 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-brandSky font-headline font-black text-xs">
                          {item.patientName[0]}
                        </div>
                        <div>
                          <p className="font-headline font-bold text-white leading-tight">{item.patientName}</p>
                          <p className="text-[10px] text-slate-500 font-semibold">{item.location}</p>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Verified
                      </span>
                    </div>

                    {/* Action Triggers */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        onClick={() => setActiveModalCase(item)}
                        className="text-xs font-headline font-bold text-brandSky hover:text-white flex items-center gap-1 transition-colors cursor-pointer py-1"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Full Case Dossier</span>
                      </button>

                      <button
                        onClick={handleBookClick}
                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-brandBlue text-white font-headline font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                      >
                        Consult Doctor
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* ─── 5. PATIENT VIDEO TESTIMONIALS SECTION ─── */}
        <section className="space-y-8 mb-20">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-brandSky uppercase tracking-widest bg-brandSky/10 px-3 py-1 rounded-full border border-brandSky/20 inline-block font-headline">
              Real Patient Stories On Video
            </span>
            <h2 className="font-headline font-black text-2xl sm:text-4xl text-white">
              Watch Patients Share Their Journey
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              Real, unscripted testimonials recorded directly from our clinics in Thuckalay, Nagercoil, Chennai & Trichy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEO_STORIES.map((vid) => (
              <div
                key={vid.id}
                className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 shadow-xl hover:border-brandSky/50 transition-all flex flex-col justify-between space-y-4 text-left group"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={vid.thumbnail}
                    alt={vid.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <a
                      href={vid.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-2xl hover:scale-115 transition-transform cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </a>
                  </div>
                  <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold text-white uppercase font-headline">
                    {vid.treatment}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-headline font-bold text-base text-white">{vid.name}</h4>
                    <span className="text-[10px] text-slate-500">{vid.location}</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed italic line-clamp-2">
                    "{vid.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/video-testimonials"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 border border-slate-700 hover:border-brandSky text-brandSky font-headline font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md"
            >
              <span>View All Video Testimonials</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ─── 6. LIGHTBOX / CASE DOSSIER MODAL ─── */}
        <AnimatePresence>
          {activeModalCase && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-left space-y-6 shadow-2xl relative"
              >
                {/* Modal Close Button */}
                <button
                  onClick={() => setActiveModalCase(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="space-y-2 pr-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-brandSky/10 text-brandSky border border-brandSky/20 uppercase tracking-wider font-headline">
                      {activeModalCase.subCategory}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Verified Patient Case File
                    </span>
                  </div>
                  <h3 className="font-headline font-black text-xl sm:text-3xl text-white">
                    {activeModalCase.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">
                    Patient: {activeModalCase.patientName} (Age {activeModalCase.age}) • {activeModalCase.location} • Timeframe: {activeModalCase.timeframe}
                  </p>
                </div>

                {/* Large Comparison Slider */}
                <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950 p-2">
                  <BeforeAfterSlider
                    beforeImage={activeModalCase.beforeImg}
                    afterImage={activeModalCase.afterImg}
                    beforeLabel={activeModalCase.beforeLabel}
                    afterLabel={activeModalCase.afterLabel}
                    aspectRatio="aspect-[16/10]"
                    alt={activeModalCase.title}
                  />
                </div>

                {/* Procedure & Clinical Notes Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-1.5">
                    <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest font-headline block">
                      Procedure Applied
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeModalCase.procedure}
                    </p>
                  </div>

                  <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-1.5">
                    <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest font-headline block">
                      Lead Specialist & Diagnosis
                    </span>
                    <p className="text-xs font-headline font-bold text-white">
                      {activeModalCase.doctor}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {activeModalCase.doctorRole}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-headline block">
                    Full Clinical Doctor Notes
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeModalCase.clinicalNotes}
                  </p>
                </div>

                {/* Booking Call to Action in Modal */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                  <div className="text-xs text-slate-400">
                    Ready to achieve a similar transformation?
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveModalCase(null)}
                      className="px-4 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-headline font-bold uppercase transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={(e) => {
                        setActiveModalCase(null);
                        handleBookClick(e);
                      }}
                      className="px-6 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl text-xs font-headline font-bold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-brandBlue/30 transition-all flex items-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Book Consultation
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ─── 7. BOTTOM CTA BANNER (New Dark Navy Aesthetic) ─── */}
        <TreatmentCtaBanner
          badgeText="Managing Director & Prosthodontist"
          titlePrefix="Begin Your Personal Smile"
          highlightWord="Transformation Today"
          titleSuffix=""
          subtitle="Every smile has a unique story waiting to unfold. Schedule your private digital consultation with our board-certified dental and aesthetic specialists at Jerush Dentofacial."
          primaryBtnText="Book Free Consultation"
          onPrimaryClick={handleBookClick}
          secondaryBtnText="Call +91 94891 60055"
          secondaryBtnPhone="+919489160055"
          doctorImage="/images/doctors/dr-binila-portrait.webp"
          doctorName="DR. C. BINILA ASIR"
          doctorRole="Managing Director & Prosthodontist"
          doctorAlt="DR. C. BINILA ASIR - Managing Director & Aesthetic Specialist"
        />
      </div>
    </div>
  );
}
