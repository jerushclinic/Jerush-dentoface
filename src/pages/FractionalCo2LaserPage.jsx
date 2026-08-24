import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ShieldCheck, Heart, Activity, Info, Calendar, ArrowRight, 
  ChevronDown, Flame, Layers, Eye, RefreshCw, Zap
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';

export default function FractionalCo2LaserPage() {
  const navigate = useNavigate();
  const [activeArea, setActiveArea] = useState('face');
  const [activeConcern, setActiveConcern] = useState('scars');
  const [showAfter, setShowAfter] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Before & After Slider Concerns Data (with Unsplash dummy images)
  const concerns = {
    scars: {
      title: "Acne Scars & Pitting",
      beforeLabel: "Deep Pitted Scars & Uneven Texture",
      afterLabel: "Smooth, Refined & Rebuilt Skin Structure",
      beforeImg: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
      afterImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
      description: "Fractional CO₂ laser energy penetrates deep into the dermis, vaporizing scarred tissue and triggering massive new collagen production to fill in deep pits and acne craters."
    },
    wrinkles: {
      title: "Deep Wrinkles & Fine Lines",
      beforeLabel: "Static Wrinkles & Skin Laxity",
      afterLabel: "Plumped, Tightened & Youthful Elasticity",
      beforeImg: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600",
      afterImg: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600",
      description: "By creating microscopic thermal zones, the laser forces the surrounding healthy skin to contract immediately, smoothing out lines around the eyes, mouth, and forehead."
    },
    pigment: {
      title: "Sun Damage & Pigment",
      beforeLabel: "Dark Sun Spots & Melasma Patches",
      afterLabel: "Bright, Even & Luminous Complexion",
      beforeImg: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600",
      afterImg: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600",
      description: "Pigment cells are shattered by the laser's thermal action. Over the next few days, the treated spots flake off naturally to reveal fresh, even-toned skin underneath."
    }
  };

  // Treatment Areas Data
  const treatmentAreas = {
    face: {
      title: "Full Face Resurfacing",
      depth: "1.5mm - 2.5mm Dermal Penetration",
      duration: "30 - 40 Minutes per session",
      recovery: "5 - 7 Days (Social Downtime)",
      intensity: "High Impact (Customizable)",
      focus: "Excellent for severe acne scarring, surgical scars, deep wrinkles, large pores, and overall skin laxity.",
      tips: "We apply a medical-grade topical numbing cream for 45 minutes prior to the procedure to ensure complete comfort."
    },
    neck: {
      title: "Neck & Décolletage Toning",
      depth: "1.0mm - 1.5mm Dermal Penetration",
      duration: "20 - 25 Minutes per session",
      recovery: "4 - 6 Days (Mild Flushing)",
      intensity: "Medium-High Impact",
      focus: "Targets crepey skin texture, horizontal neck bands ('tech-neck' lines), and severe sun damage/mottling on the chest.",
      tips: "Requires lower energy settings than the face because neck skin is thinner and has fewer oil glands for healing."
    },
    eyes: {
      title: "Periorbital 'Madonna' Lift",
      depth: "0.5mm - 1.0mm Dermal Penetration",
      duration: "10 - 15 Minutes per session",
      recovery: "3 - 5 Days (Moderate Swelling)",
      intensity: "Delicate & Precise",
      focus: "Smooths fine crow's feet lines, tightens loose skin on the upper and lower eyelids, and improves dark hollow circles.",
      tips: "Performed using protective ocular shields. An incredible non-surgical alternative to traditional blepharoplasty."
    },
    hands: {
      title: "Hand Rejuvenation",
      depth: "1.0mm Dermal Penetration",
      duration: "15 Minutes per session",
      recovery: "5 Days (Dryness & Peeling)",
      intensity: "Targeted Spot Correction",
      focus: "Erases age spots, dark liver spots, sun damage, and addresses paper-thin skin texture by thickening the dermal collagen layer.",
      tips: "We recommend combining laser sessions with advanced hand hydration creams for maximum results."
    }
  };

  // Science Healing Phases Timeline
  const healingPhases = [
    {
      day: "Day 1-2",
      title: "Micro-Thermal Injury & Flushing",
      desc: "The laser creates thousands of microscopic column-like hot spots, leaving the surrounding skin intact. The skin looks sun-burned and feels warm.",
      icon: Flame,
      color: "text-brandBlue bg-brandBlue/5 border-brandBlue/10"
    },
    {
      day: "Day 3-5",
      title: "Natural Micro-Exfoliation",
      desc: "Old, damaged epidermal cells begin to flake away naturally. You will notice dry, sandpaper-like texture as the skin regenerates.",
      icon: RefreshCw,
      color: "text-brandSky bg-brandSky/5 border-brandSky/10"
    },
    {
      day: "Week 2",
      title: "Collagen & Elastin Induction",
      desc: "Dermal fibroblasts trigger the synthesis of fresh Type I and Type III collagen. The skin surface looks remarkably smoother and tighter.",
      icon: Layers,
      color: "text-brandBlue bg-brandBlue/5 border-brandBlue/10"
    },
    {
      day: "Month 3+",
      title: "Matrix Remodeling & Maturation",
      desc: "Newly formed collagen structures mature and contract. Scars continue to shallow, lines soften, and structural improvement peaks.",
      icon: Zap,
      color: "text-brandSky bg-brandSky/5 border-brandSky/10"
    }
  ];

  // FAQs
  const faqs = [
    {
      q: "What does the treatment feel like? Is it painful?",
      a: "With our advanced clinical protocols, discomfort is kept to an absolute minimum. We apply a medical-grade topical anesthetic cream for 45-60 minutes before the treatment. During the session, you will feel a warm, prickling sensation. We also run a synchronized medical cold-air blower (cryo-cooler) over the skin to soothe it in real-time."
    },
    {
      q: "How many sessions are typically required for acne scars?",
      a: "For mild to moderate acne scarring, 2 to 3 sessions spaced 4-6 weeks apart yield outstanding results. For deep, severely pitted scars, a series of 4 to 5 sessions may be recommended. You will continue to see structural skin improvements for up to 6 months after your final session."
    },
    {
      q: "What is the expected post-treatment downtime?",
      a: "For a standard full face resurfacing, social downtime is about 5 to 7 days. During the first 48 hours, the skin is red and mildly swollen (similar to a sunburn). By day 3-5, a bronzing effect occurs, and the skin begins to peel or flake. Makeup can safely be applied from day 6 onwards."
    },
    {
      q: "Are the results of Fractional CO₂ laser permanent?",
      a: "Yes, the remodeling of collagen and structural improvements for acne scars, surgical scars, and wrinkles are permanent. However, your skin will continue to age naturally. We recommend maintaining your results with daily sunscreen (SPF 50+), a clinical skincare routine, and touch-up sessions once a year."
    }
  ];

  const handleBookClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAFBFD] text-slate-800 min-h-screen pt-0 font-body relative overflow-hidden">
      {/* Background Glows utilizing only official brand colors (brandBlue and brandSky) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-brandBlue/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-[700px] h-[700px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none"></div>

      <PageBreadcrumbHero 
        title="CO₂ / Fractional Laser Resurfacing" 
        breadcrumbs={[
          { label: 'Acne & Pigmentation', path: '/treatments' },
          { label: 'Fractional CO₂ Laser', active: true }
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 py-16">
        
        {/* Luxury Hero Description Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/10 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brandSky animate-pulse"></span>
              <span className="text-xs font-bold text-brandBlue uppercase tracking-widest font-headline">Gold-Standard Resurfacing</span>
            </div>
            
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
              Flawless Skin Reborn:<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandSky">
                Fractional CO₂ Laser Therapy
              </span>
            </h2>
            
            <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
              Our FDA-approved Fractional Carbon Dioxide (CO₂) laser resurfacing is the ultimate clinical solution for severe skin imperfections. By delivering carbon dioxide laser beams in a matrix of micro-beams, it vaporizes columns of damaged skin while leaving surrounding cells intact to speed up healing. This triggers the skin's natural healing response to construct a brand-new, healthy skin surface.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-brandSky/20 transition-all">
                <Flame className="w-5 h-5 text-brandBlue mb-2" />
                <h4 className="font-headline font-bold text-xs sm:text-sm text-slate-900">Deep Scar Repair</h4>
                <p className="text-xs text-slate-500 mt-1">Shallows deep pitted acne scars permanently.</p>
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-brandSky/20 transition-all">
                <RefreshCw className="w-5 h-5 text-brandBlue mb-2" />
                <h4 className="font-headline font-bold text-xs sm:text-sm text-slate-900">Texture Refinement</h4>
                <p className="text-xs text-slate-500 mt-1">Shrinks enlarged pores and smooths wrinkles.</p>
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-brandSky/20 transition-all">
                <Layers className="w-5 h-5 text-brandBlue mb-2" />
                <h4 className="font-headline font-bold text-xs sm:text-sm text-slate-900">Collagen Boosting</h4>
                <p className="text-xs text-slate-500 mt-1">Triggers renewal of structural skin layers.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            {/* Elegant luxury framing */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brandBlue to-brandSky rounded-3xl blur-2xl opacity-10 -rotate-2"></div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-white border border-slate-200/60 shadow-xl relative group p-2">
              <div className="rounded-2xl overflow-hidden w-full h-full">
                <img 
                  src="/images/treatments/fractional_co2_laser.png" 
                  alt="Fractional CO2 Laser Therapy session" 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800";
                  }}
                />
              </div>
              <div className="absolute inset-2 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
            </div>
          </motion.div>
        </section>

        {/* Interactive Before/After Visualizer Section */}
        <section className="mb-24 py-16 bg-[#FFFDFB]/40 backdrop-blur border border-slate-100 rounded-3xl px-6 sm:px-12 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brandSky/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brandBlue/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl mx-auto mb-10">
            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
              Interactive Transformations
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
              Select a clinical skin concern below to see the microscopic thermal restructuring effect of our Fractional CO₂ laser treatment.
            </p>

            {/* Concern Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {Object.keys(concerns).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveConcern(key);
                    setShowAfter(true);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-bold font-headline uppercase tracking-wider border transition-all duration-300 ${
                    activeConcern === key
                      ? 'bg-brandBlue text-white border-transparent shadow-md shadow-brandBlue/10'
                      : 'bg-white text-slate-500 border-slate-200/80 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  {concerns[key].title}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Toggle & Slider Visualizer */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Visual display with Cross-Fade */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeConcern + (showAfter ? '_after' : '_before')}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full relative"
                  >
                    <img 
                      src={showAfter ? concerns[activeConcern].afterImg : concerns[activeConcern].beforeImg} 
                      alt={showAfter ? "After Treatment" : "Before Treatment"}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-slate-950/80 backdrop-blur rounded-lg text-[9px] font-bold text-white uppercase tracking-wider">
                      {showAfter ? "AFTER RESURFACING" : "BEFORE RESURFACING"}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Toggle Action */}
              <div className="flex items-center gap-3 mt-6 bg-slate-50 p-1.5 rounded-xl border border-slate-100 shadow-inner">
                <button 
                  onClick={() => setShowAfter(false)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-bold font-headline uppercase tracking-wider transition-colors ${
                    !showAfter ? 'bg-white text-brandBlue shadow-sm font-bold' : 'text-slate-500 hover:text-slate-850'
                  }`}
                >
                  Before state
                </button>
                <button 
                  onClick={() => setShowAfter(true)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-bold font-headline uppercase tracking-wider transition-colors ${
                    showAfter ? 'bg-brandBlue text-white shadow-sm' : 'text-slate-500 hover:text-slate-850'
                  }`}
                >
                  After state
                </button>
              </div>
            </div>

            {/* Right Column: Descriptions */}
            <div className="lg:col-span-5 text-left space-y-4">
              <h4 className="font-headline font-extrabold text-xl text-slate-900">
                {concerns[activeConcern].title}
              </h4>
              <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
                {concerns[activeConcern].description}
              </p>
              
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-3">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-brandBlue block uppercase tracking-wider">Pre-treatment condition</span>
                  <p className="text-xs sm:text-sm text-slate-700 font-semibold">{concerns[activeConcern].beforeLabel}</p>
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-brandSky block uppercase tracking-wider">Expected clinical result</span>
                  <p className="text-xs sm:text-sm text-slate-700 font-semibold">{concerns[activeConcern].afterLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Target Treatment Areas Section */}
        <section className="mb-24 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Sticky/Fixed Left Side Details */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
                Target Treatment Areas
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                The depth and intensity of the CO₂ laser beam are precisely calibrated to match the anatomical thickness of the targeted tissue layer.
              </p>

              {/* Area Tab buttons stacked */}
              <div className="flex flex-col gap-2.5">
                {Object.keys(treatmentAreas).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveArea(key)}
                    className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 ${
                      activeArea === key
                        ? 'bg-white border-brandBlue/30 shadow-md shadow-brandBlue/5 text-brandBlue scale-102 font-bold'
                        : 'bg-transparent border-slate-200/50 hover:bg-white hover:border-brandSky/20 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        activeArea === key ? 'bg-brandBlue text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {key === 'face' && <Sparkles className="w-4 h-4" />}
                        {key === 'neck' && <Layers className="w-4 h-4" />}
                        {key === 'eyes' && <Eye className="w-4 h-4" />}
                        {key === 'hands' && <Activity className="w-4 h-4" />}
                      </div>
                      <span className="text-xs font-bold font-headline uppercase tracking-wider">
                        {key === 'face' && 'Full Face'}
                        {key === 'neck' && 'Neck & Chest'}
                        {key === 'eyes' && 'Eye Area (Madonna Lift)'}
                        {key === 'hands' && 'Hands Restoration'}
                      </span>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform ${
                      activeArea === key ? 'translate-x-0' : '-translate-x-2 opacity-0'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side Info Pane Display with Animation */}
            <div className="lg:col-span-7 bg-white border border-slate-100 p-8 sm:p-10 rounded-3xl shadow-sm min-h-[420px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brandSky/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeArea}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="font-headline font-black text-xl sm:text-2xl text-slate-900">
                      {treatmentAreas[activeArea].title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 uppercase tracking-widest font-bold font-headline">
                      Calibrated Focus Area
                    </p>
                  </div>

                  <p className="text-slate-650 text-sm sm:text-base leading-relaxed font-medium">
                    {treatmentAreas[activeArea].focus}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="text-[10px] sm:text-xs font-bold text-brandBlue block uppercase tracking-wider">Target Clinical Depth</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 block">{treatmentAreas[activeArea].depth}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="text-[10px] sm:text-xs font-bold text-brandBlue block uppercase tracking-wider">Procedure Duration</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 block">{treatmentAreas[activeArea].duration}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="text-[10px] sm:text-xs font-bold text-brandBlue block uppercase tracking-wider">Expected Downtime</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 block">{treatmentAreas[activeArea].recovery}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="text-[10px] sm:text-xs font-bold text-brandBlue block uppercase tracking-wider">Calibration Level</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 block">{treatmentAreas[activeArea].intensity}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-brandSky/5 p-4 rounded-xl border border-brandSky/10">
                    <Info className="w-4 h-4 text-brandBlue shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong>Clinical Guideline:</strong> {treatmentAreas[activeArea].tips}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Science of Dermal Repair Timeline */}
        <section className="mb-24 py-16 bg-[#FFFDFB]/40 backdrop-blur border border-slate-100 rounded-3xl px-6 sm:px-8 shadow-sm">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
              The Science of Dermal Repair
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
              How does fractional ablation trigger structural skin remodeling? Explore the physiological healing phases post-treatment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Grid connecting path line (desktop) */}
            <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-[1px] bg-slate-200 -z-10"></div>

            {healingPhases.map((phase, idx) => {
              const PhaseIcon = phase.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  key={idx}
                  className="bg-white border border-slate-200/60 hover:border-brandSky/30 p-6 rounded-2xl transition-all flex flex-col justify-between shadow-sm relative group"
                >
                  <div className="space-y-4 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-brandBlue bg-brandBlue/5 px-2.5 py-1 rounded-md font-headline">
                        {phase.day}
                      </span>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${phase.color}`}>
                        <PhaseIcon className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="font-headline font-bold text-sm sm:text-base text-slate-900 group-hover:text-brandBlue transition-colors">
                      {phase.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Laser FAQs */}
        <section className="mb-24 py-16 bg-gradient-to-b from-slate-50/60 via-blue-50/20 to-slate-50/60 border border-slate-200/60 rounded-3xl px-6 sm:px-8 shadow-sm">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-gradient-to-r from-brandSky/10 to-brandBlue/10 px-3.5 py-1.5 rounded-full border border-brandSky/20">Medical FAQ</span>
            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900 mt-4">
              Laser Resurfacing <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">FAQs</span>
            </h3>
            <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
              Medical guidance and safety information concerning Fractional CO₂ laser resurfacing procedures.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                    isExpanded
                      ? 'bg-gradient-to-r from-white via-blue-50/50 to-sky-50/40 border border-brandSky/40 shadow-md ring-1 ring-brandSky/20'
                      : 'bg-gradient-to-r from-white via-slate-50/60 to-blue-50/20 border border-slate-200/70 hover:border-brandSky/40 hover:shadow-md hover:from-white hover:to-blue-50/40'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left font-headline font-bold text-sm sm:text-base text-slate-900 focus:outline-none group"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isExpanded 
                        ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white rotate-180 shadow-sm' 
                        : 'bg-gradient-to-br from-brandBlue/10 to-brandSky/10 text-brandBlue group-hover:bg-brandBlue group-hover:text-white'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-3 text-slate-650 text-xs sm:text-sm leading-relaxed border-t border-slate-100/80 bg-gradient-to-br from-white/40 via-blue-50/20 to-slate-50/50 font-body text-left">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      {/* ─── Bottom CTA Banner (New Dark Navy Aesthetic) ─── */}
      <TreatmentCtaBanner
        badgeText="Laser & Aesthetic Specialist"
        titlePrefix="Ready for a Skin Renewal"
        highlightWord="Consultation?"
        titleSuffix=""
        subtitle="Consult with our Chief Maxillofacial Surgeon and cosmetic laser specialists to design a customized resurfacing protocol tailored to your skin type."
        primaryBtnText="Schedule Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call Clinic: +91 94891 60055"
        secondaryBtnPhone="+919489160055"
        doctorImage="/images/doctors/dr-binila-portrait.webp"
        doctorName="DR. BINILA BLADBIN"
        doctorRole="Laser & Aesthetic Specialist"
        doctorAlt="DR. BINILA BLADBIN - Jerush Dentofacial"
      />

      </div>
    </div>
  );
}
