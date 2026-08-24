import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, Activity, Heart, Info, ArrowRight, 
  ChevronDown, Calendar, FileText, CheckCircle2, UserCheck, Search, Phone
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';

export default function OralPathologyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Warnings / Symptoms Data
  const symptoms = [
    {
      title: "Non-Healing Sores",
      desc: "Any ulcer, sore, or cold sore in the mouth that does not completely heal within 10 to 14 days.",
      severity: "High Warning Sign",
      icon: AlertTriangle,
      color: "from-rose-500/10 to-red-600/5 text-rose-500 border-rose-500/20"
    },
    {
      title: "Red & White Patches",
      desc: "Velvety red (erythroplakia) or thick white (leukoplakia) patches on the gums, tongue, or mouth lining.",
      severity: "Critical Warning Sign",
      icon: Info,
      color: "from-amber-500/10 to-yellow-650/5 text-amber-600 border-amber-500/20"
    },
    {
      title: "Unexplained Lumps",
      desc: "Lumps, thickening, or hard spots in the cheek, gums, lip, neck, or under the jaw that feel unusual.",
      severity: "High Warning Sign",
      icon: Activity,
      color: "from-blue-500/10 to-indigo-600/5 text-blue-600 border-blue-500/20"
    },
    {
      title: "Swallowing Difficulty",
      desc: "Persistent feeling that something is caught in the throat, difficulty chewing, speaking, or moving the jaw.",
      severity: "General Symptom",
      icon: Heart,
      color: "from-emerald-500/10 to-teal-600/5 text-emerald-600 border-emerald-500/20"
    }
  ];

  // Steps in the screening process
  const screeningSteps = [
    {
      step: "01",
      title: "Clinical History & Risk Assessment",
      desc: "We review your medical history, lifestyle factors (such as tobacco or alcohol usage), and any symptoms you have noticed.",
      highlight: "In-depth consultation"
    },
    {
      step: "02",
      title: "Extraoral Head & Neck Exam",
      desc: "Our specialists carefully palpate the neck glands, throat, jawline, and lips to check for lymph node swelling or external tissue changes.",
      highlight: "Manual palpation"
    },
    {
      step: "03",
      title: "Intraoral Soft Tissue Assessment",
      desc: "A meticulous visual inspection of all interior areas: the floor of the mouth, underside of tongue, cheeks, hard/soft palate, and tonsils.",
      highlight: "Visual scan"
    },
    {
      step: "04",
      title: "Advanced Illumination & Biopsy (If Needed)",
      desc: "If any abnormal area is identified, we use advanced light-assisted scopes to evaluate tissues. If necessary, a precise diagnostic biopsy is conducted in-house.",
      highlight: "Same-sitting biopsy procedure"
    }
  ];

  // Common Conditions Investigated
  const pathologicalConditions = [
    {
      id: "leukoplakia",
      name: "Leukoplakia",
      category: "precancerous",
      desc: "Thickened, white patches that form on the gums, cheeks, or bottom of the mouth. While usually benign, they can show precancerous changes.",
      clinicalCare: "Regular biopsies and close monitoring or laser excision."
    },
    {
      id: "erythroplakia",
      name: "Erythroplakia",
      category: "precancerous",
      desc: "A bright red velvety area or patch on the oral mucosa. It carries a much higher risk of containing precancerous or early cancerous cells.",
      clinicalCare: "Immediate biopsy and surgical/laser excision are typically advised."
    },
    {
      id: "lichen-planus",
      name: "Oral Lichen Planus",
      category: "inflammatory",
      desc: "A chronic inflammatory condition affecting mucous membranes inside the mouth, showing as lacy white patterns, painful sores, or redness.",
      clinicalCare: "Symptom management with topical clinical therapies and biannual checkups."
    },
    {
      id: "benign-cysts",
      name: "Oral Cysts & Tumors",
      category: "growth",
      desc: "Non-cancerous fluid-filled sacs or tissue growths that develop in the jawbone or soft tissues. Left untreated, they can expand and weaken bones.",
      clinicalCare: "Minimally invasive surgical removal with reconstructive maxillofacial surgery."
    }
  ];

  // FAQs
  const faqs = [
    {
      q: "What is an oral pathology examination?",
      a: "An oral pathology examination evaluates the soft tissues, gums, tongue, salivary glands, and jawbones to diagnose diseases of the mouth. This includes screening for precancerous lesions, oral cancer, fungal infections, and salivary gland disorders."
    },
    {
      q: "Does oral cancer screening hurt?",
      a: "No, not at all. The screening is entirely painless, non-invasive, and takes less than 10 minutes. It involves a visual exam, manual palpation of the neck and jaw tissues, and high-intensity examination lights."
    },
    {
      q: "When would I need a biopsy?",
      a: "A biopsy is indicated if our maxillofacial surgeons find a spot, lump, or patch that does not resolve within 14 days, or if the clinical appearance suggests abnormal cellular changes. A tiny tissue sample is taken under local anesthesia and sent to our pathology lab for accurate diagnosis."
    },
    {
      q: "How often should I get screened?",
      a: "Healthy adults should undergo an oral cancer screening once a year during their regular dental cleaning. High-risk individuals (tobacco users, heavy drinkers, or those with a history of oral lesions) should get screened every 6 months."
    }
  ];

  const handleBookClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredConditions = activeTab === 'all' 
    ? pathologicalConditions 
    : pathologicalConditions.filter(c => c.category === activeTab);

  return (
    <div className="bg-white text-slate-800 min-h-screen pt-0 font-body relative overflow-hidden">
      <PageBreadcrumbHero 
        title="Oral Pathology & Cancer Screening" 
        breadcrumbs={[
          { label: 'Oral Health & Cancer Screening', path: '/treatments' },
          { label: 'Oral Pathology & Screening', active: true }
        ]}
      />

      {/* Subtle Light Bluish Decorative Glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brandSky/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[650px] h-[650px] bg-brandBlue/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 py-16">
        
        {/* Intro Section - Standard Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandSky/10 border border-brandSky/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brandSky"></span>
              <span className="text-[10px] font-bold text-brandBlue uppercase tracking-wider font-headline">Oral Pathology Treatment</span>
            </div>
            
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
              Early Detection Saves Lives:<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandSky">
                Advanced Oral Cancer Screening
              </span>
            </h2>
            
            <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
              Oral pathology deals with the identification and treatment of diseases affecting the mouth, jaws, salivary glands, and facial structures. Because early stages of serious conditions like oral cancer are often painless, routine clinical screening remains the single most effective defense against disease progression.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-sm">
                <ShieldCheck className="w-5 h-5 text-brandBlue shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-headline font-bold text-xs text-slate-900 font-headline">Clinical Expertise</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Screenings led by specialized Maxillofacial Surgeons.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-brandBlue shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-headline font-bold text-xs text-slate-900 font-headline">In-house Biopsies</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Diagnostic sampling and path-lab processing on site.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200/60 shadow-xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800" 
                alt="Oral pathology screening checkup" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </section>

        {/* Warning Signs Section - Light bluish alternative bg */}
        <section className="mb-24 py-16 bg-slate-50/80 border-y border-slate-100 rounded-3xl px-6 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
              Warning Signs & Symptoms
            </h3>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              If you notice any of these mucosal changes or symptoms persisting for more than two weeks, please book a diagnostic screening checkup immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {symptoms.map((symptom, idx) => {
              const SymptomIcon = symptom.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  key={idx}
                  className="bg-white hover:bg-slate-50/50 border border-slate-200/50 hover:border-brandSky/30 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-lg hover:shadow-brandBlue/5"
                >
                  <div className="space-y-4 text-left">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${symptom.color} border flex items-center justify-center`}>
                      <SymptomIcon className="w-6 h-6" />
                    </div>
                    <h4 className="font-headline font-bold text-base text-slate-900 group-hover:text-brandBlue transition-colors">
                      {symptom.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {symptom.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-rose-500 font-headline">
                      {symptom.severity}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Screening Journey - Light bluish gradient block */}
        <section className="mb-24 py-16 bg-gradient-to-br from-brandBlue/5 to-brandSky/5 border border-brandSky/10 rounded-3xl px-6 sm:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brandBlue/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 space-y-4 text-left">
              <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
                Our Screening Process
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                What happens during an oral pathology visit? We follow a rigorous clinical sequence designed to make you comfortable while ensuring thorough tissue assessment.
              </p>
              <div className="pt-4">
                <a 
                  href="#" 
                  onClick={handleBookClick} 
                  className="inline-flex items-center gap-2 text-xs font-bold text-brandBlue hover:text-brandSky transition-colors group"
                >
                  Book your screening appointment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {screeningSteps.map((step, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-slate-200/50 p-5 rounded-2xl text-left hover:border-brandSky/20 transition-colors shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black font-headline text-brandBlue/15">{step.step}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-brandBlue font-headline bg-brandBlue/5 px-2.5 py-1 rounded-md border border-brandBlue/10">
                      {step.highlight}
                    </span>
                  </div>
                  <h4 className="font-headline font-bold text-sm text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Pathologies filterable grid */}
        <section className="mb-24 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="max-w-xl">
              <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
                Conditions We Investigate
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
                We diagnose and manage a broad spectrum of mucosal, glandular, and hard-tissue lesions inside the oral cavity.
              </p>
            </div>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 shrink-0">
              {['all', 'precancerous', 'inflammatory', 'growth'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold font-headline uppercase tracking-wider border transition-all duration-300 ${
                    activeTab === category
                      ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white border-transparent shadow-lg shadow-brandBlue/15'
                      : 'bg-white text-slate-500 border-slate-200/80 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredConditions.map((condition) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={condition.id}
                  className="bg-white border border-slate-200/60 hover:border-brandSky/30 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-headline font-bold text-lg text-slate-900">{condition.name}</h4>
                      <span className={`text-[8px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${
                        condition.category === 'precancerous' 
                          ? 'bg-rose-50 text-rose-600 border-rose-100'
                          : condition.category === 'inflammatory'
                          ? 'bg-blue-50 text-blue-600 border-blue-100'
                          : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {condition.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-650 leading-relaxed">
                      {condition.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <UserCheck className="w-4 h-4 text-brandBlue shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block font-headline">Clinical Care Approach</span>
                      <p className="text-[11px] text-slate-700 mt-0.5 leading-relaxed">{condition.clinicalCare}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* FAQs Accordion - Light bluish gradient bg */}
        <section className="mb-24 py-16 bg-gradient-to-b from-slate-50/60 via-blue-50/20 to-slate-50/60 border-y border-slate-100/80 rounded-3xl px-6 sm:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-gradient-to-r from-brandSky/10 to-brandBlue/10 px-3.5 py-1.5 rounded-full border border-brandSky/20">Medical FAQ</span>
            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900 mt-4">
              Oral Pathology <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">FAQs</span>
            </h3>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Common questions and medical guidance concerning diagnostic checks and tissue biopsy evaluations.
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
        badgeText="Oral & Maxillofacial Specialist"
        titlePrefix="Concerned About a Change Inside Your"
        highlightWord="Mouth?"
        titleSuffix=""
        subtitle="Do not wait for discomfort. Early diagnostic checkups can catch abnormalities before they advance. Schedule a professional screening with our Oral & Maxillofacial Surgeons today."
        primaryBtnText="Schedule A Screening"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call Clinic: +91 94891 60055"
        secondaryBtnPhone="+919489160055"
        doctorImage="/images/doctors/ajai-shalu1.webp"
        doctorName="DR. AJAI SHALU"
        doctorRole="Oral & Maxillofacial Surgeon"
        doctorAlt="DR. AJAI SHALU - Jerush Dentofacial"
      />

      </div>
    </div>
  );
}
