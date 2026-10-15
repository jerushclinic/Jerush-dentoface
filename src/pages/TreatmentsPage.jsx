import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Info, Calendar, ArrowRight, X, ChevronDown, ChevronRight,
  Filter, Grid, List, CheckCircle2, Phone, RotateCcw, ExternalLink
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import { treatmentService } from '../services/treatmentService';

export default function TreatmentsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const initialCategory = searchParams.get('category') || 'all';
  const initialSubcategory = searchParams.get('sub') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSubcategory, setActiveSubcategory] = useState(initialSubcategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Accordion state for left sidebar: keeps track of open category panels
  const [openAccordions, setOpenAccordions] = useState({
    dental: true,
    cosmetic: false,
    hair: false,
    body: false
  });

  // Mobile accordion drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category state with URL param
  useEffect(() => {
    const cat = searchParams.get('category');
    const sub = searchParams.get('sub');
    if (cat && ['dental', 'cosmetic', 'hair', 'body'].includes(cat)) {
      setActiveCategory(cat);
      setActiveSubcategory(sub || 'all');
      setOpenAccordions(prev => ({ ...prev, [cat]: true }));
    } else if (cat === 'all') {
      setActiveCategory('all');
      setActiveSubcategory('all');
    } else if (sub) {
      setActiveSubcategory(sub);
    }
  }, [searchParams]);

  const toggleAccordion = (catId, e) => {
    if (e) e.stopPropagation();
    setOpenAccordions(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    setActiveSubcategory('all');
    if (catId !== 'all') {
      setOpenAccordions(prev => ({ ...prev, [catId]: true }));
    }
    const nextParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      nextParams.delete('category');
      nextParams.delete('sub');
    } else {
      nextParams.set('category', catId);
      nextParams.delete('sub');
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleSubcategorySelect = (catId, sub) => {
    setActiveCategory(catId);
    setActiveSubcategory(sub);
    setOpenAccordions(prev => ({ ...prev, [catId]: true }));
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('category', catId);
    if (sub === 'all') {
      nextParams.delete('sub');
    } else {
      nextParams.set('sub', sub);
    }
    setSearchParams(nextParams, { replace: true });
    // Auto-close mobile drawer if open
    setMobileFilterOpen(false);
  };

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
    { id: 'all', name: 'All Treatments', count: treatments.length },
    { id: 'dental', name: 'Dental Care', count: treatments.filter(t => t.category === 'dental').length },
    { id: 'cosmetic', name: 'Laser & Cosmetic', count: treatments.filter(t => t.category === 'cosmetic').length },
    { id: 'hair', name: 'Hair Restoration', count: treatments.filter(t => t.category === 'hair').length },
    { id: 'body', name: 'Body Contouring', count: treatments.filter(t => t.category === 'body').length },
  ];

  // Map subcategories dynamically for each department
  const subcategoriesByCategory = useMemo(() => {
    const map = {
      dental: new Set(),
      cosmetic: new Set(),
      hair: new Set(),
      body: new Set()
    };
    treatments.forEach(t => {
      if (map[t.category] && t.subcategory) {
        map[t.category].add(t.subcategory);
      }
    });
    return {
      dental: Array.from(map.dental).sort(),
      cosmetic: Array.from(map.cosmetic).sort(),
      hair: Array.from(map.hair).sort(),
      body: Array.from(map.body).sort()
    };
  }, [treatments]);

  const filteredData = treatments.filter(t => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSubcategory = activeSubcategory === 'all' || t.subcategory === activeSubcategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query ||
      t.title.toLowerCase().includes(query) ||
      (t.desc && t.desc.toLowerCase().includes(query)) ||
      (t.subcategory && t.subcategory.toLowerCase().includes(query)) ||
      (Array.isArray(t.benefits) && t.benefits.some(b => b.toLowerCase().includes(query)));
    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  const handleBookClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setActiveCategory('all');
    setActiveSubcategory('all');
    setSearchQuery('');
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('category');
    nextParams.delete('sub');
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <div className="bg-slate-50/70 text-slate-800 min-h-screen pt-0 font-body relative text-left pb-24">
      <PageBreadcrumbHero
        title="Our Medical Services"
        breadcrumbs={[{ label: 'Medical Services', active: true }]}
      />

      {/* Decorative ambient background glows contained without trapping sticky */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandSky/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-brandBlue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 mt-6 sm:mt-8">

        {/* ─── Mobile Header Controls: Category Pills & Filter Toggle (< lg) ─── */}
        <div className="block lg:hidden mb-5 space-y-3">
          {/* Quick Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brandSky/20 text-xs shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            )}
          </div>

          {/* Mobile Accordion Drawer Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="w-full flex items-center justify-between p-2.5 px-3 bg-white border border-slate-200/90 rounded-xl text-xs font-headline font-bold text-slate-800 shadow-xs"
          >
            <span className="uppercase tracking-wider font-headline font-bold text-xs text-slate-800">
              Browse by Department & Specialty
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Mobile Accordion Drawer Content */}
          <AnimatePresence>
            {mobileFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden bg-white border border-slate-200 rounded-2xl p-3 shadow-md space-y-2"
              >
                {['dental', 'cosmetic', 'hair', 'body'].map(catId => {
                  const cat = categories.find(c => c.id === catId);
                  const subs = subcategoriesByCategory[catId] || [];
                  const isOpen = openAccordions[catId];
                  return (
                    <div key={catId} className="border border-slate-100 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleAccordion(catId)}
                        className={`w-full flex items-center justify-between p-2.5 px-3 text-xs font-headline font-bold uppercase tracking-wider transition-colors ${activeCategory === catId ? 'bg-brandBlue/10 text-brandBlue' : 'bg-slate-50 text-slate-700'
                          }`}
                      >
                        <span className="font-headline font-bold text-xs uppercase tracking-wide">
                          <span>{cat?.name}</span>
                          <span className="text-[10px] text-slate-400 font-semibold ml-1.5">({cat?.count})</span>
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="p-2 space-y-1 bg-white border-t border-slate-100">
                          <button
                            onClick={() => handleSubcategorySelect(catId, 'all')}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold ${activeCategory === catId && activeSubcategory === 'all'
                                ? 'bg-brandBlue text-white'
                                : 'text-slate-600 hover:bg-slate-50'
                              }`}
                          >
                            All {cat?.name} ({cat?.count})
                          </button>
                          {subs.map(sub => {
                            const subCount = treatments.filter(t => t.category === catId && t.subcategory === sub).length;
                            const isSubActive = activeCategory === catId && activeSubcategory === sub;
                            return (
                              <button
                                key={sub}
                                onClick={() => handleSubcategorySelect(catId, sub)}
                                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs ${isSubActive
                                    ? 'bg-brandBlue text-white font-bold'
                                    : 'text-slate-600 hover:bg-slate-50'
                                  }`}
                              >
                                <span className="truncate pr-2">{sub}</span>
                                <span className="text-[10px] opacity-75 shrink-0">{subCount}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── Main Two-Column Layout: Left Side Accordion Sidebar + Right Compact Cards Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[285px_1fr] xl:grid-cols-[300px_1fr] gap-6 lg:gap-7 items-start">

          {/* ══════════════════════════════════════════════════════════════════
              LEFT SIDE ACCORDION NAVIGATION SIDEBAR (Desktop & Tablet)
              ══════════════════════════════════════════════════════════════════ */}
          <aside className="hidden lg:block w-full jerush-treatments-sidebar self-start space-y-3">

            <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-sm p-3.5 space-y-2">

              {/* 1. All Treatments Top-Level Pill */}
              <div>
                <button
                  onClick={() => handleCategorySelect('all')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${activeCategory === 'all'
                      ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-sm shadow-brandBlue/20 scale-[1.01]'
                      : 'bg-slate-50/80 hover:bg-slate-100/90 text-slate-700 border border-slate-200/70 hover:border-slate-300'
                    }`}
                >
                  <span>All Procedures</span>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${activeCategory === 'all' ? 'bg-white/25 text-white' : 'bg-white text-slate-600 border border-slate-200/80'
                    }`}>
                    {treatments.length}
                  </span>
                </button>
              </div>

              {/* 2. Department Accordion Panels */}
              <div className="space-y-1.5">
                {[
                  { id: 'dental', name: 'Dental Care' },
                  { id: 'cosmetic', name: 'Laser & Cosmetic' },
                  { id: 'hair', name: 'Hair Restoration' },
                  { id: 'body', name: 'Body Contouring' }
                ].map((dept) => {
                  const count = treatments.filter(t => t.category === dept.id).length;
                  const subs = subcategoriesByCategory[dept.id] || [];
                  const isDeptActive = activeCategory === dept.id;
                  const isOpen = !!openAccordions[dept.id];

                  return (
                    <div
                      key={dept.id}
                      className={`rounded-xl border transition-all overflow-hidden ${isDeptActive
                          ? 'border-brandBlue/40 bg-slate-50/40 shadow-xs'
                          : 'border-slate-200/70 bg-white hover:border-slate-300'
                        }`}
                    >
                      {/* Accordion Trigger Header */}
                      <div
                        onClick={() => handleCategorySelect(dept.id)}
                        className={`w-full flex items-center justify-between p-2.5 px-3.5 cursor-pointer select-none transition-colors ${isDeptActive && activeSubcategory === 'all'
                            ? 'bg-brandBlue/10 text-brandBlue font-bold'
                            : 'hover:bg-slate-50 text-slate-800'
                          }`}
                      >
                        <span className="font-headline font-bold text-xs uppercase tracking-wide truncate">
                          {dept.name}
                        </span>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                            {count}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => toggleAccordion(dept.id, e)}
                            className="p-1 hover:bg-slate-200/60 rounded-md text-slate-400 hover:text-slate-700 transition-colors"
                            aria-label={`Toggle ${dept.name} accordion`}
                          >
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brandBlue' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Accordion Content: Sub-Specialties List */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="p-2 pt-1 pb-2.5 bg-slate-50/60 border-t border-slate-100 space-y-0.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                              {/* "All in this department" option */}
                              <button
                                onClick={() => handleSubcategorySelect(dept.id, 'all')}
                                className={`w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-headline transition-all cursor-pointer ${isDeptActive && activeSubcategory === 'all'
                                    ? 'bg-brandBlue text-white font-bold shadow-xs'
                                    : 'text-slate-600 hover:text-brandBlue hover:bg-white font-medium'
                                  }`}
                              >
                                <span className="truncate">All {dept.name}</span>
                                <span className={`text-[9px] px-1 rounded-full font-bold ${isDeptActive && activeSubcategory === 'all' ? 'bg-white/20 text-white' : 'text-slate-400'
                                  }`}>
                                  {count}
                                </span>
                              </button>

                              {/* Individual Subcategories */}
                              {subs.map(sub => {
                                const subCount = treatments.filter(t => t.category === dept.id && t.subcategory === sub).length;
                                const isSubActive = isDeptActive && activeSubcategory === sub;

                                return (
                                  <button
                                    key={sub}
                                    onClick={() => handleSubcategorySelect(dept.id, sub)}
                                    className={`w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] transition-all cursor-pointer ${isSubActive
                                        ? 'bg-brandBlue text-white font-bold shadow-xs'
                                        : 'text-slate-600 hover:text-brandBlue hover:bg-white font-medium'
                                      }`}
                                  >
                                    <span className="truncate pr-1.5">{sub}</span>
                                    <span className={`text-[9px] px-1 rounded-full font-bold shrink-0 ${isSubActive ? 'bg-white/20 text-white' : 'text-slate-400 bg-slate-200/50'
                                      }`}>
                                      {subCount}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Reset Filters Option */}
              {(activeCategory !== 'all' || activeSubcategory !== 'all' || searchQuery) && (
                <div className="pt-3 mt-3 border-t border-slate-100">
                  <button
                    onClick={resetFilters}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold font-headline flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-brandBlue" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Doctor Assistance Box */}
            <div className="bg-gradient-to-br from-[#071324] via-[#0E2752] to-[#071324] text-white rounded-2xl p-4 shadow-md border border-white/10 relative overflow-hidden group">
              {/* Atmospheric Glow Blurs */}
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-brandSky/20 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-brandBlue/30 rounded-full blur-2xl pointer-events-none"></div>

              {/* Header Title with Live Pulse Indicator */}
              <div className="flex items-center gap-2 mb-2 relative z-10">
                <span className="w-2 h-2 rounded-full bg-brandSky animate-pulse shrink-0"></span>
                <h4 className="font-headline font-bold text-xs uppercase tracking-wider text-white">
                  Need Help Choosing?
                </h4>
              </div>

              {/* Big Doctor Portrait Cutout */}
              <div className="relative z-10 flex flex-col items-center pt-1 mb-2">
                {/* Ambient Halo behind Dr. Bladbin */}
                <div className="relative flex justify-center w-full">
                  <div className="absolute w-40 h-40 bg-brandSky/25 rounded-full blur-2xl pointer-events-none top-6" />
                  <img
                    src="/images/doctors/dr-bladbin-portrait.webp"
                    alt="Dr. A. Bladbin"
                    className="h-44 sm:h-48 w-auto max-w-full object-contain object-bottom drop-shadow-[0_16px_28px_rgba(0,0,0,0.65)] relative z-10 transition-transform duration-300 hover:scale-[1.03]"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/images/doctors/bladbin1.webp';
                    }}
                  />
                </div>

                {/* Doctor Name */}
                <Link
                  to="/leadership/dr-a-bladbin-chairman-founder"
                  className="font-headline font-extrabold text-sm sm:text-base text-white hover:text-brandSky tracking-wide text-center mt-2 relative z-10 transition-colors"
                >
                  Dr. A. Bladbin
                </Link>
              </div>

              {/* Guidance Description */}
              <p className="text-[11px] text-slate-300 leading-relaxed text-center mb-3.5 relative z-10">
                Consult our senior medical directors across 4 regional centres in Tamil Nadu & Dubai.
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2 relative z-10">
                <button
                  onClick={handleBookClick}
                  className="flex-1 py-2 px-3 bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue hover:brightness-110 active:scale-[0.99] text-white rounded-xl text-xs font-headline font-bold shadow-md shadow-brandBlue/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appt</span>
                </button>
                <a
                  href="tel:+919489160000"
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:border-brandSky/40 text-xs font-headline font-bold flex items-center justify-center gap-1 transition-all"
                  title="Call +91 94891 60000"
                >
                  <Phone className="w-3.5 h-3.5 text-brandSky" />
                </a>
              </div>
            </div>

          </aside>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT MAIN CONTENT: SEARCH + METADATA + COMPACT TREATMENT CARDS
              ══════════════════════════════════════════════════════════════════ */}
          <main className="min-w-0 space-y-4">

            {/* Top Toolbar: Search Bar + Active Filters + View Mode Switch */}
            <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 sm:p-3.5 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search Bar (Desktop) */}
                <div className="relative flex-1 hidden lg:block">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search procedures by name, condition, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 bg-slate-50/80 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-brandSky rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brandSky/20 text-xs sm:text-sm transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>

                {/* View Mode Toggle (Grid vs List) */}
                <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 self-end sm:self-auto">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'grid'
                        ? 'bg-white text-brandBlue shadow-xs font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                      }`}
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === 'list'
                        ? 'bg-white text-brandBlue shadow-xs font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                      }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Active Filter Pills Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-500 font-medium text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Showing <strong className="text-slate-900 font-bold">{filteredData.length}</strong> procedures
                  </span>

                  {activeCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brandBlue/10 text-brandBlue font-bold text-[11px]">
                      <span>{categories.find(c => c.id === activeCategory)?.name}</span>
                      <button onClick={() => handleCategorySelect('all')} className="hover:text-red-500">
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  )}

                  {activeSubcategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brandSky/15 text-brandSky text-[11px] font-bold">
                      <span>{activeSubcategory}</span>
                      <button onClick={() => handleSubcategorySelect(activeCategory, 'all')} className="hover:text-red-500">
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  )}

                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
                      <span>"{searchQuery}"</span>
                      <button onClick={() => setSearchQuery('')} className="hover:text-red-500">
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  )}
                </div>

                {(activeCategory !== 'all' || activeSubcategory !== 'all' || searchQuery) && (
                  <button
                    onClick={resetFilters}
                    className="text-brandBlue hover:text-brandSky font-bold text-[11px] underline cursor-pointer ml-auto"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* Loading Spinner */}
            {loading ? (
              <div className="py-20 flex justify-center items-center">
                <div className="w-9 h-9 border-3 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-16 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
                <p className="text-slate-800 font-headline font-bold text-base">No procedures match your selection.</p>
                <p className="text-slate-400 text-xs mt-1">Try selecting another department or resetting your search keywords.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 rounded-xl bg-brandBlue text-white font-headline font-bold text-xs shadow-xs hover:bg-brandSky transition-colors cursor-pointer"
                >
                  View All Procedures
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* ══════════════════════════════════════════════════════════════════
                 COMPACT GRID VIEW (Streamlined Height, Not "Big Big Cards")
                 ══════════════════════════════════════════════════════════════════ */
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${activeSubcategory}-${searchQuery}-grid`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                  {filteredData.map((treatment, idx) => {
                    return (
                      <motion.div
                        key={treatment.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.2) }}
                        className="group bg-white border border-slate-200/80 hover:border-brandSky/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-lg hover:shadow-brandBlue/10 hover:-translate-y-0.5"
                      >
                        <div className="flex flex-col flex-1">
                          {/* Compact Thumbnail (h-36 sm:h-40 instead of aspect 4/3!) */}
                          <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-100">
                            {treatment.image ? (
                              <img
                                src={treatment.image}
                                alt={treatment.title}
                                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  if (treatment.category === 'hair') e.target.src = '/images/medical-services/gfc_hair_therapy.png';
                                  else if (treatment.category === 'cosmetic') e.target.src = '/images/medical-services/botox_fillers.png';
                                  else if (treatment.category === 'body') e.target.src = '/images/medical-services/cryo_sculpting.png';
                                  else e.target.src = '/images/medical-services/dental_implants.png';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-brandBlue/5 to-brandSky/5 flex items-center justify-center">
                                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest font-headline">Jerush</span>
                              </div>
                            )}

                            {/* Subtle dark gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity"></div>

                            {/* Category Badge Pill on Top Left */}
                            <div className="absolute top-2.5 left-2.5 z-10">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full backdrop-blur-md text-[9px] font-extrabold uppercase tracking-wider font-headline shadow-xs border ${treatment.category === 'dental'
                                  ? 'bg-blue-600/90 text-white border-blue-400/30'
                                  : treatment.category === 'cosmetic'
                                    ? 'bg-purple-600/90 text-white border-purple-400/30'
                                    : treatment.category === 'hair'
                                      ? 'bg-emerald-600/90 text-white border-emerald-400/30'
                                      : 'bg-rose-600/90 text-white border-rose-400/30'
                                }`}>
                                <span className="w-1 h-1 rounded-full bg-white animate-pulse"></span>
                                {treatment.category === 'hair' ? 'Hair' : treatment.category === 'body' ? 'Body' : treatment.category === 'cosmetic' ? 'Skin & Laser' : 'Dental'}
                              </span>
                            </div>
                          </div>

                          {/* Compact Card Content Body */}
                          <div className="p-3.5 sm:p-4 text-left flex-1 flex flex-col justify-between">
                            <div>
                              {treatment.subcategory && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-brandBlue/90 block mb-1 truncate">
                                  {treatment.subcategory}
                                </span>
                              )}
                              <h3 className="font-headline font-bold text-sm sm:text-[15px] text-slate-900 group-hover:text-brandBlue transition-colors line-clamp-1 leading-snug">
                                {treatment.title}
                              </h3>
                              <p className="text-secondary text-xs leading-relaxed mt-1 line-clamp-2">
                                {treatment.desc}
                              </p>
                            </div>

                            {/* Inline Key Feature Badges (Single Compact Line) */}
                            {treatment.benefits && treatment.benefits.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-slate-100">
                                {treatment.benefits.slice(0, 2).map((b, bIdx) => (
                                  <span
                                    key={bIdx}
                                    className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600 bg-slate-100/90 px-1.5 py-0.5 rounded-md truncate max-w-[170px]"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-brandSky shrink-0"></span>
                                    <span className="truncate">{b}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Streamlined Card Action Bar */}
                        <div className="px-3.5 sm:px-4 py-2.5 mt-auto border-t border-slate-100 flex items-center justify-between gap-2 bg-slate-50/50">
                          <button
                            onClick={() => {
                              navigate(getTreatmentPath(treatment.id));
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-xs font-headline font-bold text-slate-700 hover:text-brandBlue flex items-center gap-1 transition-colors cursor-pointer group-hover:translate-x-0.5"
                          >
                            <span>Details</span>
                            <ArrowRight className="w-3 h-3 text-brandSky" />
                          </button>

                          <a
                            href="#"
                            onClick={handleBookClick}
                            className="px-3 py-1 rounded-lg bg-gradient-to-r from-brandBlue to-brandSky hover:brightness-105 text-white font-headline font-bold text-[11px] shadow-xs flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <Calendar className="w-3 h-3" />
                            <span>Book</span>
                          </a>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            ) : (
              /* ══════════════════════════════════════════════════════════════════
                 COMPACT LIST VIEW (Horizontal Sleek Streamlined Rows)
                 ══════════════════════════════════════════════════════════════════ */
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${activeSubcategory}-${searchQuery}-list`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {filteredData.map((treatment, idx) => {
                    return (
                      <motion.div
                        key={treatment.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: Math.min(idx * 0.015, 0.15) }}
                        className="group bg-white border border-slate-200/80 hover:border-brandSky/60 rounded-xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 shadow-xs hover:shadow-md transition-all"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-full sm:w-32 h-24 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                          {treatment.image && (
                            <img
                              src={treatment.image}
                              alt={treatment.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          )}
                          <span className={`absolute top-1.5 left-1.5 px-1.5 py-0.2 rounded-full text-[8px] font-extrabold uppercase ${treatment.category === 'dental' ? 'bg-blue-600 text-white' :
                              treatment.category === 'cosmetic' ? 'bg-purple-600 text-white' :
                                treatment.category === 'hair' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                            }`}>
                            {treatment.category}
                          </span>
                        </div>

                        {/* Info Body */}
                        <div className="flex-1 min-w-0">
                          {treatment.subcategory && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-brandBlue block truncate">
                              {treatment.subcategory}
                            </span>
                          )}
                          <h4 className="font-headline font-bold text-sm text-slate-900 group-hover:text-brandBlue transition-colors truncate">
                            {treatment.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {treatment.desc}
                          </p>
                          {treatment.benefits && treatment.benefits.length > 0 && (
                            <div className="flex items-center gap-1.5 mt-1.5 overflow-hidden">
                              {treatment.benefits.slice(0, 2).map((b, bi) => (
                                <span key={bi} className="inline-flex items-center gap-1 text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded truncate max-w-[150px]">
                                  <span className="w-1 h-1 rounded-full bg-brandSky"></span>
                                  <span className="truncate">{b}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex sm:flex-col items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                          <button
                            onClick={() => {
                              navigate(getTreatmentPath(treatment.id));
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-brandBlue hover:border-brandSky/60 text-xs font-headline font-bold transition-colors cursor-pointer"
                          >
                            Details
                          </button>
                          <a
                            href="#"
                            onClick={handleBookClick}
                            className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg bg-gradient-to-r from-brandBlue to-brandSky text-white text-xs font-headline font-bold shadow-xs hover:brightness-105 transition-all text-center cursor-pointer"
                          >
                            Book
                          </a>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}

          </main>
        </div>

      </div>

      {/* ─── Bottom CTA Banner (Unified Dark Navy Format) ─── */}
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

