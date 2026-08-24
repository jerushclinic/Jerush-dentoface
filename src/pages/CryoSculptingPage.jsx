import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ShieldCheck, Heart, Activity, Info, Calendar, Phone, ArrowRight, 
  ChevronDown, Flame, Layers, Eye, RefreshCw, Zap, UserCheck
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';

export default function CryoSculptingPage() {
  const navigate = useNavigate();
  const [activeArea, setActiveArea] = useState('abdomen');
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Target areas data
  const targetAreas = {
    abdomen: {
      title: "Abdominal Sculpting",
      duration: "35 - 45 Minutes per area",
      applicators: "Large / Medium contouring cups",
      coolingTemp: "-11°C Target cooling",
      focus: "Targets persistent lower and upper belly fat that resists standard exercise and core training.",
      resultText: "Up to 20-25% fat layer thickness reduction in the treated area after a single session.",
      clinicalTip: "Combined with a 2-minute deep post-treatment massage to break up crystallized lipids and boost fat clearance."
    },
    flanks: {
      title: "Flanks & Love Handles",
      duration: "35 Minutes per side",
      applicators: "Parallel flat contouring cups",
      coolingTemp: "-11°C Target cooling",
      focus: "Eliminates stubborn side fat deposits, helping restore a smooth, tapered waistline and hourglass contour.",
      resultText: "Provides a visible reduction in waist circumference and smoother skin transition above the hip.",
      clinicalTip: "Perfectly complements abdominal treatments for a comprehensive 360-degree midsection transformation."
    },
    chin: {
      title: "Submental (Double Chin)",
      duration: "45 Minutes per session",
      applicators: "Mini contouring applicator",
      coolingTemp: "-10°C Gentle cooling",
      focus: "Reduces submental fat under the jawline, restoring a sharp, defined, and youthful facial profile.",
      resultText: "Excellent tightening and sculpting effect without invasive lipo or needles.",
      clinicalTip: "Requires precise custom placement using protective foam contours. Requires zero social downtime."
    },
    thighs: {
      title: "Inner & Outer Thighs",
      duration: "60 Minutes per session",
      applicators: "Surface smooth applicators",
      coolingTemp: "-11°C Target cooling",
      focus: "Targets outer thigh pockets ('saddlebags') or inner thighs to prevent rubbing and improve silhouette gap.",
      resultText: "Smooths outer profiles and streamlines inner leg spacing naturally.",
      clinicalTip: "We utilize flat, non-vacuum applicators specifically calibrated for dense thigh fat tissues."
    },
    arms: {
      title: "Upper Arm Contouring",
      duration: "35 Minutes per arm",
      applicators: "Medium curved contouring cups",
      coolingTemp: "-11°C Target cooling",
      focus: "Reduces loose, hanging fat under the triceps ('bat-wings') to yield toned, firmer-looking upper arms.",
      resultText: "Restores arm confidence, making clothing fit more comfortably and cleanly.",
      clinicalTip: "Best paired with skin-toning RF therapies to tighten skin as underlying fat layer diminishes."
    }
  };

  // Fat freezing science steps
  const sciencePhases = [
    {
      step: "Phase 1",
      title: "Controlled Cryolipolysis",
      desc: "An applicator delivers vacuum pressure and precise cooling to the target fat bulge. Fat cells are cooled to crystallizing temperatures.",
      icon: Sparkles,
      color: "text-brandBlue bg-brandBlue/5 border-brandBlue/10"
    },
    {
      step: "Phase 2",
      title: "Lipid Crystallization",
      desc: "Fat cells (adipocytes) are naturally richer in lipids, meaning they freeze and crystallize at higher temperatures than surrounding skin, nerves, and muscle tissues.",
      icon: Layers,
      color: "text-brandSky bg-brandSky/5 border-brandSky/10"
    },
    {
      step: "Phase 3",
      title: "Apoptosis induction",
      desc: "The crystallization triggers a natural, programmed cellular breakdown (apoptosis) of the fat cells, causing them to gradually deflate.",
      icon: Zap,
      color: "text-brandBlue bg-brandBlue/5 border-brandBlue/10"
    },
    {
      step: "Phase 4",
      title: "Metabolic Clearance",
      desc: "Over the next 8-12 weeks, your body's lymphatic system naturally processes and permanently flushes away the dead fat cells.",
      icon: RefreshCw,
      color: "text-brandSky bg-brandSky/5 border-brandSky/10"
    }
  ];

  // FAQs
  const faqs = [
    {
      q: "What is Cryo Cool Sculpting? Is it a weight loss surgery?",
      a: "No, Cryo Cool Sculpting (Cryolipolysis) is a non-surgical, non-invasive body contouring treatment. It is not a weight loss procedure for obesity. Instead, it is designed to target and permanently eliminate localized pockets of stubborn fat (like belly fat, double chins, or love handles) that resist diet and exercise."
    },
    {
      q: "What does a cryolipolysis session feel like? Is it painful?",
      a: "At the start of the session, you will feel a firm pulling/vacuum sensation and intense cold as the applicator draws in the fat bulge. Within 5 to 10 minutes, the area becomes completely numb. Most patients comfortably read, watch shows, work on their laptops, or even nap during the rest of the session."
    },
    {
      q: "How long does it take to see results, and are they permanent?",
      a: "You may start to notice changes as early as 4 weeks after your treatment, with the most dramatic contouring results appearing between 8 to 12 weeks. Because the treated fat cells are crystallized and permanently metabolized out of the body, they cannot return. Maintaining a stable weight will sustain your sculpted contours indefinitely."
    },
    {
      q: "Is there any post-procedure downtime?",
      a: "There is zero downtime. Since the procedure is completely non-surgical, you can return to work, exercise, and normal activities immediately. Some patients experience temporary redness, mild swelling, bruising, or tingling in the treated area, which resolves naturally within a couple of weeks."
    }
  ];

  const handleBookClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAFBFD] text-slate-800 min-h-screen pt-0 font-body relative overflow-hidden">
      {/* Cool Ice-Blue Decorative Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-brandBlue/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-[700px] h-[700px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none"></div>

      <PageBreadcrumbHero 
        title="Cryo Cool Sculpting & Fat Freezing" 
        breadcrumbs={[
          { label: 'Fat Reduction & Body Sculpting', path: '/treatments' },
          { label: 'Cryo Cool Sculpting', active: true }
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
              <span className="text-xs font-bold text-brandBlue uppercase tracking-widest font-headline">Non-Invasive Contouring</span>
            </div>
            
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
              Freeze Away Stubborn Fat:<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandSky">
                Advanced Cryolipolysis Treatment
              </span>
            </h2>
            
            <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
              Cryo Cool Sculpting is the gold standard in non-surgical fat reduction. Using FDA-cleared cooling technology, this treatment targets fat deposits underneath the skin without needles, incisions, or anesthesia. By freezing fat cells to the point of crystallization, it triggers natural elimination while leaving surrounding tissues completely unharmed, allowing you to sculpt your body and return to work immediately.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <Flame className="w-5 h-5 text-brandBlue mb-2 rotate-180" />
                <h4 className="font-headline font-bold text-xs sm:text-sm text-slate-900">Targeted Fat Freezing</h4>
                <p className="text-xs text-slate-500 mt-1">Freezes subcutaneous fat bulges safely.</p>
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <Layers className="w-5 h-5 text-brandBlue mb-2" />
                <h4 className="font-headline font-bold text-xs sm:text-sm text-slate-900">Permanent Cell Loss</h4>
                <p className="text-xs text-slate-500 mt-1">Elminated fat cells are cleared forever.</p>
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <ShieldCheck className="w-5 h-5 text-brandBlue mb-2" />
                <h4 className="font-headline font-bold text-xs sm:text-sm text-slate-900">Zero Downtime</h4>
                <p className="text-xs text-slate-500 mt-1">No recovery period or social restrictions.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brandBlue to-brandSky rounded-3xl blur-2xl opacity-10 -rotate-2"></div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-white border border-slate-200/60 shadow-xl relative group p-2">
              <div className="rounded-2xl overflow-hidden w-full h-full">
                <img 
                  src="/images/treatments/cryo_sculpting.png" 
                  alt="Clinical body sculpting Cryo Freezing session" 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-2 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
            </div>
          </motion.div>
        </section>

        {/* Target Contours Section - Light bluish alternative bg */}
        <section className="mb-24 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Side Tab buttons stacked */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
                Target Contouring Zones
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Select a treatment zone to see how our clinical cool applicators are calibrated to target specific fat distributions.
              </p>

              <div className="flex flex-col gap-2.5">
                {Object.keys(targetAreas).map((key) => (
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
                        activeArea === key ? 'bg-brandBlue text-white' : 'bg-slate-150 text-slate-500'
                      }`}>
                        {key === 'abdomen' && <Layers className="w-4 h-4" />}
                        {key === 'flanks' && <Activity className="w-4 h-4" />}
                        {key === 'chin' && <Eye className="w-4 h-4" />}
                        {key === 'thighs' && <Zap className="w-4 h-4" />}
                        {key === 'arms' && <Sparkles className="w-4 h-4" />}
                      </div>
                      <span className="text-xs font-bold font-headline uppercase tracking-wider">
                        {targetAreas[key].title}
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
            <div className="lg:col-span-7 bg-white border border-slate-100 p-8 sm:p-10 rounded-3xl shadow-sm min-h-[440px] flex flex-col justify-between relative overflow-hidden">
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
                      {targetAreas[activeArea].title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold font-headline">
                      Zone-Specific Calibration
                    </p>
                  </div>

                  <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-medium">
                    {targetAreas[activeArea].focus}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="text-[10px] sm:text-xs font-bold text-brandBlue block uppercase tracking-wider">Target Cooling Level</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 block">{targetAreas[activeArea].coolingTemp}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="text-[10px] sm:text-xs font-bold text-brandBlue block uppercase tracking-wider">Applicator Profiling</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 block">{targetAreas[activeArea].applicators}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="text-[10px] sm:text-xs font-bold text-brandBlue block uppercase tracking-wider">Session Time</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 block">{targetAreas[activeArea].duration}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="text-[10px] sm:text-xs font-bold text-brandBlue block uppercase tracking-wider">Average Reduction</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 block">{targetAreas[activeArea].resultText}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-brandSky/5 p-4 rounded-xl border border-brandSky/10">
                    <Info className="w-4 h-4 text-brandBlue shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong>Clinical Protocol:</strong> {targetAreas[activeArea].clinicalTip}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Science of Cryolipolysis - Light bluish gradient block */}
        <section className="mb-24 py-16 bg-[#FFFDFB]/40 backdrop-blur border border-slate-100 rounded-3xl px-6 sm:px-8 shadow-sm">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
              The Science of Fat Freezing
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
              How does controlled cryolipolysis destroy localized fat deposits? Explore the physiological cellular breakdown timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-[1px] bg-slate-200 -z-10"></div>

            {sciencePhases.map((phase, idx) => {
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
                        {phase.step}
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

        {/* FAQs Accordion - Light bluish gradient bg */}
        <section className="mb-24 py-16 bg-gradient-to-b from-slate-50/60 via-blue-50/20 to-slate-50/60 border border-slate-200/60 rounded-3xl px-6 sm:px-8 shadow-sm">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-gradient-to-r from-brandSky/10 to-brandBlue/10 px-3.5 py-1.5 rounded-full border border-brandSky/20">Medical FAQ</span>
            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900 mt-4">
              Cool Sculpting <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">FAQs</span>
            </h3>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Medical guidance and safety information concerning Cryolipolysis fat-freezing procedures.
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
        badgeText="Facial & Body Aesthetics Specialist"
        titlePrefix="Ready to Recontour Your"
        highlightWord="Profile?"
        titleSuffix=""
        subtitle="Arrange a clinical body analysis with our surgeons to customize a safe, comfortable, and permanent fat-freezing contouring protocol."
        primaryBtnText="Schedule Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call Clinic: +91 94891 60055"
        secondaryBtnPhone="+919489160055"
        doctorImage="/images/doctors/dr-bladbin-portrait.webp"
        doctorName="DR. A. BLADBIN"
        doctorRole="Facial & Body Aesthetics Specialist"
        doctorAlt="DR. A. BLADBIN - Jerush Dentofacial"
      />

      </div>
    </div>
  );
}
