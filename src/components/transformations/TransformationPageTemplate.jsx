import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Smile, ShieldCheck, Activity, Search,
  CheckCircle2, Clock, Calendar, ArrowRight, Play,
  Maximize2, X, ChevronRight, Layers, Phone
} from 'lucide-react';
import PageBreadcrumbHero from '../common/PageBreadcrumbHero';
import BeforeAfterSlider from '../common/BeforeAfterSlider';
import TreatmentCtaBanner from '../common/TreatmentCtaBanner';

export default function TransformationPageTemplate({
  pageTitle,
  pageHeadlinePrefix,
  pageHeadlineHighlight,
  pageHeadlineSuffix,
  pageDescription,
  badgeText,
  heroMetrics = [],
  cases = [],
  videoStories = [],
  ctaProps = {}
}) {
  const navigate = useNavigate();
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalCase, setActiveModalCase] = useState(null);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalCase(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute available subcategories
  const subCategories = useMemo(() => {
    const set = new Set(cases.map((c) => c.subCategory));
    return ['all', ...Array.from(set)];
  }, [cases]);

  // Filtered cases
  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      const matchSubCategory = selectedSubCategory === 'all' || item.subCategory === selectedSubCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.procedure.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSubCategory && matchSearch;
    });
  }, [cases, selectedSubCategory, searchQuery]);

  const handleBookClick = (e) => {
    if (e) e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white text-slate-800 font-body relative pt-0 pb-24 min-h-screen overflow-hidden">
      {/* ─── 1. BREADCRUMB HERO ─── */}
      <PageBreadcrumbHero
        title={pageTitle}
        breadcrumbs={[
          { label: 'Transformations', path: '/smile-transformations' },
          { label: pageTitle, active: true }
        ]}
      />

      {/* Subtle Background Glows */}
      <div className="absolute top-36 left-1/4 w-[500px] h-[500px] bg-brandSky/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-2/3 right-10 w-[450px] h-[450px] bg-brandBlue/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ─── 2. HERO INTRO & METRICS ─── */}
        <section className="text-center space-y-5 pt-8 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brandBlue/5 border border-brandBlue/15 rounded-full text-xs font-bold font-headline uppercase tracking-widest text-brandBlue shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brandSky" />
            {badgeText || 'Verified Clinical Case Dossier'}
          </div>

          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-snug max-w-3xl mx-auto">
            {pageHeadlinePrefix}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandSky">
              {pageHeadlineHighlight}
            </span>{' '}
            {pageHeadlineSuffix}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {pageDescription}
          </p>

          {/* Trust Counter Strip */}
          {heroMetrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-2">
              {heroMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl p-3.5 text-center shadow-sm hover:shadow-md hover:border-brandSky/40 transition-all"
                >
                  <span className="font-headline font-black text-xl sm:text-2xl text-brandBlue block">
                    {metric.value}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ─── 3. SUB-CATEGORY FOCUS PILLS & SEARCH BAR ─── */}
        <section className="space-y-6 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
            {/* Subcategories */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-headline mr-1 hidden sm:inline">
                Focus:
              </span>
              {subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-headline font-semibold transition-all cursor-pointer ${selectedSubCategory === sub
                      ? 'bg-brandBlue text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/60'
                    }`}
                >
                  {sub === 'all' ? 'All Sub-Treatments' : sub}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search procedure, doctor, case..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brandSky focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ─── 5. TRANSFORMATION CARDS GRID ─── */}
        <section className="space-y-8 mb-20">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider font-headline">
              Showing <span className="text-brandBlue font-bold">{filteredCases.length}</span> Clinical Cases
            </p>
          </div>

          {filteredCases.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center space-y-4">
              <Smile className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="font-headline font-bold text-lg text-slate-900">No cases match your filter</h3>
              <p className="text-slate-500 text-xs">Try selecting "All Sub-Treatments" or clearing your search query.</p>
              <button
                onClick={() => {
                  setSelectedSubCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-brandBlue text-white text-xs font-bold rounded-xl font-headline hover:bg-brandSky transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:border-brandSky/40 transition-all flex flex-col justify-between space-y-4 text-left group"
                >
                  {/* Card Top Info */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-sky-50 text-brandBlue border border-sky-200/60 uppercase tracking-wider font-headline">
                        {item.subCategory}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
                        <Clock className="w-3 h-3 text-brandSky" />
                        <span>{item.timeframe}</span>
                      </div>
                    </div>

                    <h3 className="font-headline font-bold text-base text-slate-900 leading-snug group-hover:text-brandBlue transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  {/* Interactive Before-After Slider Component (Light Theme) */}
                  <BeforeAfterSlider
                    beforeImage={item.beforeImg}
                    afterImage={item.afterImg}
                    beforeLabel={item.beforeLabel}
                    afterLabel={item.afterLabel}
                    aspectRatio="aspect-[4/3]"
                    theme="light"
                    alt={item.title}
                  />

                  {/* Patient & Doctor Footer */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center text-brandBlue font-headline font-black text-xs">
                          {item.patientName[0]}
                        </div>
                        <div>
                          <p className="font-headline font-bold text-slate-900 leading-tight">{item.patientName}</p>
                          <p className="text-[10px] text-slate-500 font-medium">{item.location}</p>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified Case
                      </span>
                    </div>

                    {/* Action Triggers */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        onClick={() => setActiveModalCase(item)}
                        className="text-xs font-headline font-bold text-brandBlue hover:text-brandSky flex items-center gap-1.5 transition-colors cursor-pointer py-1"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-brandSky" />
                        <span>Full Case Dossier</span>
                      </button>

                      <button
                        onClick={handleBookClick}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-brandBlue text-slate-700 hover:text-white font-headline font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm"
                      >
                        Consult Specialist
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* ─── 6. PATIENT VIDEO TESTIMONIALS SECTION ─── */}
        {videoStories.length > 0 && (
          <section className="space-y-8 mb-20">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold text-brandBlue uppercase tracking-widest bg-sky-50 px-3.5 py-1 rounded-full border border-sky-200 inline-block font-headline">
                Real Patient Journeys On Video
              </span>
              <h2 className="font-headline font-black text-2xl sm:text-4xl text-slate-900">
                Watch Patients Share Their Journey
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
                Real, unscripted testimonials recorded directly from our centres in Thuckalay, Nagercoil, Chennai & Trichy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoStories.map((vid) => (
                <div
                  key={vid.id}
                  className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-brandSky/40 transition-all flex flex-col justify-between space-y-4 text-left group"
                >
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-sm bg-slate-100">
                    <img
                      src={vid.thumbnail}
                      alt={vid.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                      <a
                        href={vid.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-brandBlue hover:bg-brandSky text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer"
                        title="Watch video on external channel"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </a>
                    </div>
                    <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] font-bold text-white uppercase font-headline">
                      {vid.treatment}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-headline font-bold text-base text-slate-900">{vid.name}</h4>
                      <span className="text-[10px] text-slate-500 font-medium">{vid.location}</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed italic line-clamp-2">
                      "{vid.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <Link
                to="/video-testimonials"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 hover:border-brandBlue text-brandBlue font-headline font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-sm hover:shadow-md"
              >
                <span>View All Video Testimonials</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        )}

        {/* ─── 7. LIGHTBOX / CASE DOSSIER MODAL (Clean Light Theme) ─── */}
        <AnimatePresence>
          {activeModalCase && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-left space-y-6 shadow-2xl relative"
              >
                {/* Modal Close Button */}
                <button
                  onClick={() => setActiveModalCase(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="space-y-2 pr-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-sky-50 text-brandBlue border border-sky-200 uppercase tracking-wider font-headline">
                      {activeModalCase.subCategory}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified Patient Case File
                    </span>
                  </div>
                  <h3 className="font-headline font-black text-xl sm:text-2xl text-slate-900">
                    {activeModalCase.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Patient: {activeModalCase.patientName} (Age {activeModalCase.age}) • {activeModalCase.location} • Timeframe: {activeModalCase.timeframe}
                  </p>
                </div>

                {/* Large Comparison Slider */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 p-2">
                  <BeforeAfterSlider
                    beforeImage={activeModalCase.beforeImg}
                    afterImage={activeModalCase.afterImg}
                    beforeLabel={activeModalCase.beforeLabel}
                    afterLabel={activeModalCase.afterLabel}
                    aspectRatio="aspect-[16/10]"
                    theme="light"
                    alt={activeModalCase.title}
                  />
                </div>

                {/* Procedure & Clinical Notes Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
                    <span className="text-[10px] font-bold text-brandBlue uppercase tracking-widest font-headline block">
                      Procedure Applied
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      {activeModalCase.procedure}
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
                    <span className="text-[10px] font-bold text-brandBlue uppercase tracking-widest font-headline block">
                      Lead Specialist & Diagnosis
                    </span>
                    <p className="text-xs font-headline font-bold text-slate-900">
                      {activeModalCase.doctor}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {activeModalCase.doctorRole}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-headline block">
                    Full Clinical Doctor Notes
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {activeModalCase.clinicalNotes}
                  </p>
                </div>

                {/* Booking Call to Action in Modal */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                  <div className="text-xs text-slate-500">
                    Ready to achieve a similar transformation?
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveModalCase(null)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-headline font-bold uppercase transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                    <button
                      onClick={(e) => {
                        setActiveModalCase(null);
                        handleBookClick(e);
                      }}
                      className="px-6 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl text-xs font-headline font-bold uppercase tracking-wider hover:brightness-105 shadow-md shadow-brandBlue/20 transition-all flex items-center gap-2 cursor-pointer"
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

        {/* ─── 8. BOTTOM CTA BANNER (Adheres to dark navy TreatmentCtaBanner format) ─── */}
        <TreatmentCtaBanner
          badgeText={ctaProps.badgeText || 'Centres of Clinical Excellence'}
          titlePrefix={ctaProps.titlePrefix || 'Begin Your Personal'}
          highlightWord={ctaProps.highlightWord || 'Transformation Today'}
          titleSuffix={ctaProps.titleSuffix || ''}
          subtitle={
            ctaProps.subtitle ||
            'Schedule your private digital consultation with our board-certified dental and aesthetic specialists at Jerush Dentofacial.'
          }
          primaryBtnText="Book Free Consultation"
          onPrimaryClick={handleBookClick}
          secondaryBtnText="Call +91 94891 60055"
          secondaryBtnPhone="+919489160055"
          doctorImage={ctaProps.doctorImage || '/images/doctors/dr-binila-portrait.webp'}
          doctorName={ctaProps.doctorName || 'DR. C. BINILA ASIR'}
          doctorRole={ctaProps.doctorRole || 'Managing Director & Prosthodontist'}
          doctorAlt={ctaProps.doctorAlt || 'DR. C. BINILA ASIR - Managing Director'}
        />
      </div>
    </div>
  );
}
