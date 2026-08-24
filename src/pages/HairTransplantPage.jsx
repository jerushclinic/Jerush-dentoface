import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ShieldCheck, Heart, Activity, Info, Calendar, Phone, ArrowRight, 
  ChevronDown, Droplet, Layers, Zap, CheckCircle2, UserCheck, TrendingUp
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';

export default function HairTransplantPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);

  // FUE vs FUT Comparison Data
  const comparisonData = [
    {
      feature: "Extraction Method",
      fue: "Individual follicular units extracted one-by-one using microscopic punches (0.7mm - 0.9mm)",
      fut: "A strip of scalp tissue is surgically removed from the donor area and dissected into grafts"
    },
    {
      feature: "Scarring & Aesthetic",
      fue: "Virtually invisible tiny dot scars scattered across donor area; wear hair short with confidence",
      fut: "A permanent linear scar across the back of the head, visible if hair is worn short"
    },
    {
      feature: "Recovery Time",
      fue: "Rapid recovery (3 to 5 days); return to work almost immediately with minimal restrictions",
      fut: "Longer recovery (10 to 14 days) due to surgical stitches/staples in the donor area"
    },
    {
      feature: "Post-op Pain",
      fue: "Minimal to mild discomfort; managed easily with standard over-the-counter medication",
      fut: "Moderate pain and tension in the scalp due to suturing the donor wound"
    },
    {
      feature: "Graft Survival Rate",
      fue: "Exceptional (95%+ graft survival) when performed by our specialized surgeons",
      fut: "High (90-95%) but handles tissue strips which requires delicate manual division"
    }
  ];

  // Steps in FUE procedure
  const processingSteps = [
    {
      step: "01",
      title: "Donor Profiling & Trimming",
      desc: "The donor area at the back and sides of the scalp is sterilized, trimmed, and mapped. Local anesthesia is applied for absolute comfort.",
      highlight: "Pain-free setup"
    },
    {
      step: "02",
      title: "Microscopic Extraction",
      desc: "Individual healthy follicular units (containing 1-4 hairs) are extracted one-by-one using precision micro-punches.",
      highlight: "Minimal scarring"
    },
    {
      step: "03",
      title: "Graft Sorting & Holding",
      desc: "Extracted grafts are immediately sorted under stereo microscopes and preserved in chilled, nutrient-rich solution.",
      highlight: "Viability control"
    },
    {
      step: "04",
      title: "High-Density Implantation",
      desc: "Micro-slits are created in the thinning recipient zones matching natural growth angles, and grafts are placed manually.",
      highlight: "Natural results"
    }
  ];

  // Core Benefits Data
  const benefits = [
    {
      title: "Natural-Looking Hairline",
      desc: "Grafts are placed precisely matching the natural direction and angle of your existing hair for seamless blend.",
      icon: Sparkles,
      color: "from-sky-500/10 to-brandSky/5 text-brandSky border-brandSky/20"
    },
    {
      title: "Maximum Density",
      desc: "Advanced micro-punch technology allows packing grafts closely together to restore thickness and volume.",
      icon: TrendingUp,
      color: "from-blue-500/10 to-brandBlue/5 text-brandBlue border-brandBlue/20"
    },
    {
      title: "Virtually Scarless",
      desc: "Because no strip of skin is cut, there is no linear scar, leaving only microscopic dots that fade quickly.",
      icon: ShieldCheck,
      color: "from-emerald-500/10 to-emerald-650/5 text-emerald-600 border-emerald-500/20"
    },
    {
      title: "Lifetime Guarantee",
      desc: "The donor follicles are genetically resistant to DHT (balding hormone), ensuring the transplanted hair grows permanently.",
      icon: Heart,
      color: "from-rose-500/10 to-red-650/5 text-rose-500 border-rose-500/20"
    }
  ];

  // FAQs
  const faqs = [
    {
      q: "What is FUE (Follicular Unit Extraction) Hair Transplant?",
      a: "FUE is the modern gold standard in surgical hair restoration. Unlike the older strip method (FUT), FUE involves extracting individual hair follicles from the donor area (back of the head) using a specialized micro-punch. These follicles are then meticulously implanted into the thinning or balding areas, resulting in natural density and no linear scarring."
    },
    {
      q: "Is the hair transplant procedure painful?",
      a: "The procedure is performed under local anesthesia, which numbs both the donor and recipient areas. Aside from the initial numbing injections, you will not feel any pain. Many patients watch movies, use their phones, or take a nap during the session."
    },
    {
      q: "How long does it take to see the final results?",
      a: "Transplanted hair will shed within 2 to 4 weeks after the procedure—this is a completely normal part of the cycle. New hair begins to grow from the roots starting in the 3rd or 4th month. You will see noticeable density improvements by month 6, with the final, mature results visible at 12 months."
    },
    {
      q: "Are the results of an FUE hair transplant permanent?",
      a: "Yes, the results are permanent. The hair follicles extracted from the back and sides of the head are genetically resistant to DHT, the hormone responsible for male pattern baldness. Once implanted, they maintain this resistance and continue to grow naturally for a lifetime."
    }
  ];

  const handleBookClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen pt-0 font-body relative overflow-hidden text-left">
      <PageBreadcrumbHero 
        title="FUE Hair Transplant Surgery" 
        breadcrumbs={[
          { label: 'Hair Restoration', path: '/treatments' },
          { label: 'Hair Transplant', active: true }
        ]}
      />

      {/* Ambient decorative glows */}
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
              <span className="text-xs font-bold text-brandBlue uppercase tracking-wider font-headline">Surgical Hair Restoration</span>
            </div>
            
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
              Permanent Hair Density Reborn:<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandSky">
                Advanced FUE Hair Transplant
              </span>
            </h2>
            
            <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
              Follicular Unit Extraction (FUE) represents the absolute pinnacle of surgical hair restoration. By utilizing micro-punch extraction and high-precision implantation techniques, our specialized surgeons can reconstruct your hairline and restore balding areas with seamless natural density. The entire procedure is performed under local anesthesia with a rapid recovery timeframe and zero linear scars.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-sm">
                <ShieldCheck className="w-5 h-5 text-brandBlue shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-headline font-bold text-xs sm:text-sm text-slate-900">95%+ Graft Survival</h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Grafts are kept in specialized nutrient solutions to guarantee cell survival and growth.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 p-4 rounded-xl shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-brandBlue shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-headline font-bold text-xs sm:text-sm text-slate-900">Natural Growth Angles</h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Each graft is placed manually matching the direction and flow of your original hair.</p>
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
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800" 
                alt="Hair Transplant clinical evaluation" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </section>

        {/* Benefits Grid Section */}
        <section className="mb-24 py-16 bg-slate-50/80 border-y border-slate-100 rounded-3xl px-6 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
              Why Opt for FUE Hair Transplant
            </h3>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Explore the key advantages of Follicular Unit Extraction for restoring hair volume and confidence.
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
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* FUE Process Steps */}
        <section className="mb-24 py-16 bg-gradient-to-br from-brandBlue/5 to-brandSky/5 border border-brandSky/10 rounded-3xl px-6 sm:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brandBlue/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 space-y-4 text-left">
              <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
                The FUE Transplant Journey
              </h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
                Our surgical team follows strict clinical safety standards to preserve graft quality and ensure dense, natural-looking results.
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

        {/* FUE vs FUT Tabbed Comparison */}
        <section className="mb-24 text-left">
          <div className="max-w-3xl mb-12">
            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900">
              FUE vs Traditional FUT Strip Method
            </h3>
            <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
              Why should you opt for next-generation FUE over traditional strip grafting (FUT)? Below is a detailed clinical comparison.
            </p>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-55 border-b border-slate-200">
                  <th className="p-5 font-headline font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-500 w-[20%]">Clinical Feature</th>
                  <th className="p-5 font-headline font-bold text-xs sm:text-sm uppercase tracking-wider text-brandBlue bg-brandBlue/5 w-[40%]">FUE (Follicular Unit Extraction)</th>
                  <th className="p-5 font-headline font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-600 w-[40%]">Traditional FUT (Strip Method)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="p-5 font-headline font-bold text-xs sm:text-sm text-slate-800">{row.feature}</td>
                    <td className="p-5 text-xs sm:text-sm text-slate-700 bg-brandBlue/5/10 font-medium leading-relaxed">{row.fue}</td>
                    <td className="p-5 text-xs sm:text-sm text-slate-500 leading-relaxed">{row.fut}</td>
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
              Hair Transplant <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">FAQs</span>
            </h3>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Medical guidance and safety information concerning FUE hair transplant procedures.
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
        badgeText="Hair Transplant Surgeon"
        titlePrefix="Frustrated by Baldness or Receding"
        highlightWord="Hairline?"
        titleSuffix=""
        subtitle="Schedule a private clinical evaluation with our transplant surgeons to verify if FUE hair transplant is right for your donor profile and hair goals."
        primaryBtnText="Schedule Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call Clinic: +91 94891 60055"
        secondaryBtnPhone="+919489160055"
        doctorImage="/images/doctors/dr-bladbin-portrait.webp"
        doctorName="DR. A. BLADBIN"
        doctorRole="Hair Transplant Surgeon"
        doctorAlt="DR. A. BLADBIN - Jerush Dentofacial"
      />

      </div>
    </div>
  );
}
