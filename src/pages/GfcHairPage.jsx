import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ShieldCheck, Heart, Activity, Info, Calendar, Phone, ArrowRight, 
  ChevronDown, Droplet, Layers, Zap, CheckCircle2, UserCheck, TrendingUp
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';

export default function GfcHairPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('science');
  const [expandedFaq, setExpandedFaq] = useState(null);

  // GFC vs PRP Comparison Data
  const comparisonData = [
    {
      feature: "Platelet Activation",
      gfc: "In-vitro (activated in specialized tubes before application, releasing all growth factors instantly)",
      prp: "In-vivo (activated inside the scalp tissue, leading to variable and delayed growth factor release)"
    },
    {
      feature: "Cellular Purity",
      gfc: "Acellular (strictly contains only pure concentrated growth factors; no RBCs or WBCs)",
      prp: "Cellular (contains red and white blood cells, which can trigger inflammatory pain)"
    },
    {
      feature: "Discomfort & Swelling",
      gfc: "Minimal to none (pure liquid extracts lead to a highly comfortable, virtually painless injection)",
      prp: "Moderate (presence of RBCs/WBCs often causes burning sensations, soreness, and swelling)"
    },
    {
      feature: "Preparation Standard",
      gfc: "Highly stable & standardized (consistent growth factor dose delivered every single session)",
      prp: "Highly operator-dependent (platelet count varies greatly based on draw, centrifuge, and kit used)"
    },
    {
      feature: "Recommended Sessions",
      gfc: "4 - 6 sessions for peak clinical outcomes",
      prp: "8 - 10 sessions with regular maintenance needed"
    }
  ];

  // Steps in GFC preparation
  const processingSteps = [
    {
      step: "01",
      title: "Blood Collection & Tube Incubation",
      desc: "Around 10-15 ml of your blood is drawn and collected in customized GFC activation tubes containing a proprietary activator.",
      highlight: "Standardized draw"
    },
    {
      step: "02",
      title: "Platelet Activation",
      desc: "The blood is incubated for 30 minutes. Platelets release highly concentrated growth factors (PDGF, VEGF, EGF, and IGF) directly into the tube.",
      highlight: "In-vitro activation"
    },
    {
      step: "03",
      title: "Precision Centrifugation",
      desc: "Tubes are spun in a calibrated centrifuge to completely separate the concentrated growth factors from red and white blood cells.",
      highlight: "Acellular separation"
    },
    {
      step: "04",
      title: "Targeted Micro-Injection",
      desc: "The golden, pure growth factor concentrate is harvested and micro-injected into thinning regions of your scalp to revive dormant roots.",
      highlight: "Pain-free micro-application"
    }
  ];

  // Core Benefits Data
  const benefits = [
    {
      title: "Follicle Revival",
      desc: "Stimulates dormant (telogen phase) hair follicles and pushes them back into the active growth (anagen) phase.",
      icon: Zap,
      color: "from-sky-500/10 to-brandSky/5 text-brandSky border-brandSky/20"
    },
    {
      title: "Diameter & Density",
      desc: "Directly thickens thinning, miniaturized hair shafts, resulting in visually thicker scalp coverage and volume.",
      icon: TrendingUp,
      color: "from-blue-500/10 to-brandBlue/5 text-brandBlue border-brandBlue/20"
    },
    {
      title: "Active Shedding Control",
      desc: "Significantly reduces hair fall and stabilizes androgenic alopecia progression within 2 to 3 sessions.",
      icon: ShieldCheck,
      color: "from-emerald-500/10 to-emerald-650/5 text-emerald-600 border-emerald-500/20"
    },
    {
      title: "100% Autologous & Safe",
      desc: "Uses your own blood factors. There are no synthetic chemicals or additives, ensuring zero risk of allergic reactions.",
      icon: Heart,
      color: "from-rose-500/10 to-red-650/5 text-rose-500 border-rose-500/20"
    }
  ];

  // FAQs
  const faqs = [
    {
      q: "What is GFC (Growth Factor Concentrate) Hair Therapy?",
      a: "GFC is an advanced, next-generation hair restoration therapy. Unlike traditional PRP (Platelet-Rich Plasma), GFC isolates only the pure growth factors from your blood platelets in specialized pre-activated tubes. This yields an acellular, highly concentrated solution that directly triggers follicular regeneration, without the inflammatory cells that cause pain and swelling."
    },
    {
      q: "Is GFC painful? How does it compare to traditional PRP?",
      a: "GFC is virtually painless. Traditional PRP contains red and white blood cells which cause burning and post-procedure soreness. GFC is completely acellular and contains only pure growth factor liquid. Combined with our use of medical numbing sprays or local anesthetic creams, patients report extremely high comfort levels."
    },
    {
      q: "How many GFC sessions are required to see results?",
      a: "We recommend a standard starter course of 4 to 6 sessions, spaced 4 weeks apart. Active hair shedding is typically controlled within the first 2 sessions. Visible hair regrowth, thickness, and density improvements usually manifest by the 3rd or 4th month."
    },
    {
      q: "Is there any downtime or recovery period after GFC?",
      a: "There is zero downtime. You can return to your routine activities immediately after the treatment. We only advise avoiding head washes, heavy sweating, or direct sun exposure for 12 to 24 hours to let the micro-injection sites heal naturally."
    }
  ];

  const handleBookClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen pt-0 font-body relative overflow-hidden">
      <PageBreadcrumbHero 
        title="GFC (Growth Factor Concentrate) Hair Therapy" 
        breadcrumbs={[
          { label: 'Hair Fall Treatments', path: '/treatments' },
          { label: 'GFC Hair Therapy', active: true }
        ]}
      />

      {/* Light Bluish Decorative Ambient Glows */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-brandSky/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-brandBlue/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 py-16">
        
        {/* Intro Grid Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandSky/10 border border-brandSky/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brandSky animate-pulse"></span>
              <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline">Regenerative Hair Restoration</span>
            </div>
            
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
              Next-Gen Follicle Awakening:<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandSky">
                Advanced GFC Hair Therapy
              </span>
            </h2>
            
            <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
              Growth Factor Concentrate (GFC) therapy represents the absolute peak of autologous hair regeneration. By extracting and concentrating growth factors (VEGF, PDGF, EGF, and IGF) from your own blood platelets, GFC delivers a highly potent, acellular treatment directly to the scalp. This bio-engineered approach awakens dormant follicles, stabilizes hair loss, and increases hair density with maximum comfort and safety.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-sm">
                <ShieldCheck className="w-5 h-5 text-brandBlue shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-headline font-bold text-xs sm:text-sm text-slate-900">Acellular Purity</h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Contains only pure isolated growth factors, avoiding painful red and white blood cells.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-brandBlue shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-headline font-bold text-xs sm:text-sm text-slate-900">Consistent Efficacy</h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Standardized dosage tubes deliver consistent, predictable clinical outcomes.</p>
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
            <div className="absolute inset-0 bg-gradient-to-tr from-brandBlue to-brandSky rounded-3xl blur-2xl opacity-10 -rotate-2"></div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200/60 shadow-xl relative group">
              <img 
                src="/images/treatments/gfc_hair_therapy.png" 
                alt="Hair care clinical GFC treatment" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </section>

        {/* Benefits Grid Section - Light Bluish background wrapper */}
        <section className="mb-24 py-16 bg-slate-50/80 border-y border-slate-100 rounded-3xl px-6 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
              Why GFC is the Gold Standard
            </h3>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Explore the clinical advantages of Growth Factor Concentrate therapy in cellular hair regeneration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => {
              const BenefitIcon = benefit.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  key={idx}
                  className="bg-white hover:bg-slate-50/50 border border-slate-200/50 hover:border-brandSky/30 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-lg"
                >
                  <div className="space-y-4 text-left">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} border flex items-center justify-center`}>
                      <BenefitIcon className="w-6 h-6" />
                    </div>
                    <h4 className="font-headline font-bold text-base text-slate-900 group-hover:text-brandBlue transition-colors">
                      {benefit.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* GFC Process Steps - Light bluish gradient block */}
        <section className="mb-24 py-16 bg-gradient-to-br from-brandBlue/5 to-brandSky/5 border border-brandSky/10 rounded-3xl px-6 sm:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brandBlue/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 space-y-4 text-left">
              <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
                The Science of GFC Preparation
              </h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
                Our clinical laboratory standardizes the concentration process under strict sterile controls to deliver the highest possible dose of pure growth factor.
              </p>
              <div className="pt-4">
                <a 
                  href="#" 
                  onClick={handleBookClick} 
                  className="inline-flex items-center gap-2 text-xs font-bold text-brandBlue hover:text-brandSky transition-colors group"
                >
                  Book a clinical evaluation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {processingSteps.map((step, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-slate-200/50 p-5 rounded-2xl text-left hover:border-brandSky/20 transition-colors shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black font-headline text-brandBlue/15">{step.step}</span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brandBlue font-headline bg-brandBlue/5 px-2.5 py-1 rounded-md border border-brandBlue/10">
                      {step.highlight}
                    </span>
                  </div>
                  <h4 className="font-headline font-bold text-sm sm:text-base text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GFC vs PRP Tabbed Comparison */}
        <section className="mb-24 text-left">
          <div className="max-w-3xl mb-12">
            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
              GFC vs Traditional PRP Therapy
            </h3>
            <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
              Why should you opt for next-generation GFC over traditional Platelet-Rich Plasma? Below is a technical comparison of cellular properties.
            </p>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-55 border-b border-slate-200">
                  <th className="p-5 font-headline font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-500 w-[20%]">Clinical Feature</th>
                  <th className="p-5 font-headline font-bold text-xs sm:text-sm uppercase tracking-wider text-brandBlue bg-brandBlue/5 w-[40%]">GFC (Growth Factor Concentrate)</th>
                  <th className="p-5 font-headline font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-600 w-[40%]">Traditional PRP</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="p-5 font-headline font-bold text-xs sm:text-sm text-slate-800">{row.feature}</td>
                    <td className="p-5 text-xs sm:text-sm text-slate-700 bg-brandBlue/5/10 font-medium leading-relaxed">{row.gfc}</td>
                    <td className="p-5 text-xs sm:text-sm text-slate-505 leading-relaxed">{row.prp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Accordion - Light bluish gradient bg */}
        <section className="mb-24 py-16 bg-gradient-to-b from-slate-50/60 via-blue-50/20 to-slate-50/60 border-y border-slate-100 rounded-3xl px-6 sm:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-gradient-to-r from-brandSky/10 to-brandBlue/10 px-3.5 py-1.5 rounded-full border border-brandSky/20">Medical FAQ</span>
            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900 mt-4">
              GFC Treatment <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">FAQs</span>
            </h3>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Medical guidance and safety information concerning GFC hair restoration procedures.
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
        badgeText="Hair & Aesthetic Specialist"
        titlePrefix="Frustrated by Hair Thinning or"
        highlightWord="Hair Loss?"
        titleSuffix=""
        subtitle="Start your clinical regenerative journey today. Schedule a private consultation with our aesthetic dermatologists and surgeons to check if GFC therapy is right for your scalp profile."
        primaryBtnText="Schedule Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call Clinic: +91 94891 60055"
        secondaryBtnPhone="+919489160055"
        doctorImage="/images/doctors/dr-binila-portrait.webp"
        doctorName="DR. BINILA BLADBIN"
        doctorRole="Hair & Aesthetic Specialist"
        doctorAlt="DR. BINILA BLADBIN - Jerush Dentofacial"
      />

      </div>
    </div>
  );
}
