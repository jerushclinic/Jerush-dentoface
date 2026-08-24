import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, ShieldAlert, Award, Calendar, Phone, CheckCircle2, 
  ChevronDown, Flame, Thermometer, Box, Droplet, Sun, Trash2 
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';

export default function ClinicalExcellencePage() {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState('implants');
  const [expandedStage, setExpandedStage] = useState(null);

  const handleBookClick = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const specialties = [
    {
      id: 'implants',
      name: 'Dental Implants',
      desc: 'Guided implant surgery utilising computer-assisted navigation and 3D intraoral printing for micrometre precision placement.',
      tech: 'German Implant Systems • 3D CBCT Scans'
    },
    {
      id: 'hair',
      name: 'Hair Transplant',
      desc: 'Motorized graft extraction with graft survival optimization, achieving high density without visible donor-site scarring.',
      tech: 'DHI Motorized Extraction • Safe-Graft Solution'
    },
    {
      id: 'laser',
      name: 'Laser Aesthetics',
      desc: 'Skin resurfacing and pigmentation correction using US-FDA approved fractional laser configurations for minimum recovery time.',
      tech: 'Fractional CO₂ Laser • Q-Switched Nd:YAG'
    },
    {
      id: 'ortho',
      name: 'Orthodontics',
      desc: 'Advanced digital orthodontic simulations providing custom-fit transparent clear aligners designed in our in-house lab.',
      tech: 'Jerushaligne 3D Modeling • 3D Scanners'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Digital 3D Diagnostics & Mapping',
      desc: 'We perform high-definition 3D CBCT scans, digital intraoral scanning, and facial aesthetic mapping to obtain 100% diagnostic precision before starting.',
      badge: 'Zero Guesswork'
    },
    {
      num: '02',
      title: 'Multi-Disciplinary Case Planning',
      desc: 'Surgeons, implantologists, and aesthetic experts collaboratively design a personalized treatment plan tailored to your bone density and facial structure.',
      badge: 'Bespoke Mapping'
    },
    {
      num: '03',
      title: 'Micro-Surgical Laser Execution',
      desc: 'Using laser diagnostics and surgical tools, procedures are minimally invasive. This minimizes bleeding, tissue trauma, and procedural discomfort.',
      badge: 'Painless Execution'
    },
    {
      num: '04',
      title: 'Structured Recovery Monitoring',
      desc: 'Standardized healing checklists and scheduled follow-up diagnostics ensure long-term clinical outcome stability with zero complications.',
      badge: 'Guided Recovery'
    }
  ];

  const sterilizationStages = [
    {
      id: 1,
      title: 'Stage 1: Ultrasonic Decontamination Bath',
      desc: 'Chemical micro-cleaning that removes organic residue and micro-particles at the microscopic level.',
      icon: <Droplet className="w-5 h-5 text-blue-500" />
    },
    {
      id: 2,
      title: 'Stage 2: Thermal Disinfection',
      desc: 'High-temperature automated medical washing that eliminates the vast majority of surface bacteria.',
      icon: <Thermometer className="w-5 h-5 text-red-500" />
    },
    {
      id: 3,
      title: 'Stage 3: Hermetic Pouch Packaging',
      desc: 'Sealing of cleaned instruments in medical-grade pouches equipped with thermal sterilization indicators.',
      icon: <Box className="w-5 h-5 text-indigo-500" />
    },
    {
      id: 4,
      title: 'Stage 4: Class-B Vacuum Autoclaving',
      desc: 'Autoclaving at 134°C under high vacuum pressure, destroying 100% of bacterial spores and micro-organisms.',
      icon: <Flame className="w-5 h-5 text-amber-500" />
    },
    {
      id: 5,
      title: 'Stage 5: UV-C Sanitized Storage',
      desc: 'Pouches are placed in UV-C cabinets and kept completely sterile. They are opened only in front of the patient.',
      icon: <Sun className="w-5 h-5 text-yellow-500" />
    },
    {
      id: 6,
      title: 'Stage 6: 100% Single-Use Disposables',
      desc: 'All syringes, drapes, suction tips, and protective gowns are fresh and disposed of immediately after treatment.',
      icon: <Trash2 className="w-5 h-5 text-emerald-500" />
    }
  ];

  const caseStudies = [
    {
      caseId: 'Case #1024',
      treatment: 'Full Mouth Dental Implants',
      duration: '3 Days',
      outcome: 'Restored complete masticatory function & natural aesthetic.'
    },
    {
      caseId: 'Case #2051',
      treatment: 'Bio-FUE Hair Transplant (3500 Grafts)',
      duration: '1 Day',
      outcome: 'High-density natural hairline with invisible donor scarring.'
    },
    {
      caseId: 'Case #3089',
      treatment: 'Laser Skin Rejuvenation & Aligners',
      duration: '4 Months',
      outcome: 'Corrected alignment and removed deep pigmentation.'
    }
  ];

  return (
    <div className="w-full bg-white font-body text-left relative pt-0 overflow-hidden">
      <PageBreadcrumbHero 
        title="Clinical Excellence" 
        breadcrumbs={[
          { label: 'About Jerush', path: '/about' },
          { label: 'Clinical Excellence', active: true }
        ]} 
      />

      {/* ─── 1. SURGICAL-CLEAN BLUEPRINT HERO ─── */}
      <section className="w-full py-20 lg:py-24 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brandBlue/3 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brandBlue/5 border border-brandBlue/10 text-brandBlue text-[10px] font-bold uppercase tracking-wider font-headline">
              <Activity className="w-3.5 h-3.5" /> Clinical Standards
            </span>
            <h1 className="font-headline font-black text-3xl sm:text-5xl text-slate-900 leading-tight">
              Medical Precision, Scientific Rigor, Zero Compromise
            </h1>
            <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Driven by evidence-based clinical protocols, US-FDA approved technologies, and Class-B hospital sterilization directives.
            </p>
          </div>

          {/* Interactive Specialty Filter Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-6">
              {specialties.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSpecialty(spec.id)}
                  className={`px-5 py-2.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider transition-all ${
                    selectedSpecialty === spec.id
                      ? 'bg-brandBlue text-white shadow-sm'
                      : 'bg-white text-slate-650 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {spec.name}
                </button>
              ))}
            </div>

            {/* Filter Content */}
            <div className="mt-8 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm text-left max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                {specialties.map((spec) => {
                  if (spec.id !== selectedSpecialty) return null;
                  return (
                    <motion.div
                      key={spec.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <h4 className="font-headline font-black text-lg text-slate-900">{spec.name} Standards</h4>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{spec.desc}</p>
                      <div className="flex items-center gap-2 text-brandBlue text-xs font-bold pt-2">
                        <span className="px-2.5 py-1 rounded bg-brandBlue/5 uppercase tracking-wider">{spec.tech}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. VERTICAL STEPPER: 4-STEP WORKFLOW ─── */}
      <section className="max-w-4xl mx-auto px-6 py-20 lg:py-24">
        <div className="text-center mb-16 space-y-2">
          <span className="text-[10px] font-black text-brandBlue uppercase tracking-wider font-headline">Clinical Protocol</span>
          <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900">4-Step Standard of Care</h2>
        </div>

        {/* Steps track */}
        <div className="relative border-l border-slate-200/80 ml-4 sm:ml-6 pl-8 sm:pl-12 space-y-12 text-left">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Numeric indicator absolute */}
              <span className="absolute -left-[53px] sm:-left-[69px] top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-brandBlue flex items-center justify-center font-headline font-black text-sm text-brandBlue group-hover:bg-brandBlue group-hover:text-white transition-colors duration-300 shadow-sm">
                {step.num}
              </span>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="font-headline font-black text-base sm:text-lg text-slate-900">{step.title}</h4>
                  <span className="px-2 py-0.5 rounded bg-brandSky/10 text-brandSky text-[8px] font-black uppercase tracking-wider">
                    {step.badge}
                  </span>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. 6-STAGE INFECTION CONTROL ACCORDION ─── */}
      <section className="w-full py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandBlue/5 border border-brandBlue/10 text-brandBlue font-headline font-bold text-[10px] uppercase tracking-wider">
              Safety First
            </span>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900">
              6-Stage Infection Control Standard
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              We employ automated Class-B vacuum sterilization procedures to ensure absolute clinical safety.
            </p>
          </div>

          {/* Accordion container */}
          <div className="space-y-3 text-left">
            {sterilizationStages.map((stage) => {
              const isOpen = expandedStage === stage.id;
              return (
                <div 
                  key={stage.id}
                  className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:border-brandSky/15 transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedStage(isOpen ? null : stage.id)}
                    className="w-full px-6 py-5 flex items-center justify-between font-headline font-bold text-sm sm:text-base text-slate-800 hover:text-brandBlue transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {stage.icon}
                      <span>{stage.title}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-brandBlue' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-50 bg-slate-50/30">
                          {stage.desc}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 4. BEFORE & AFTER CLINICAL OUTCOMES TABLE ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20 lg:py-24">
        <div className="text-center mb-16 space-y-2">
          <span className="text-[10px] font-black text-brandBlue uppercase tracking-wider font-headline">Clinical Case Studies</span>
          <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900">Proven Clinical Outcomes</h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">A structured view of our recent successful patient rehabilitations.</p>
        </div>

        {/* Responsive Table wrapper */}
        <div className="overflow-x-auto border border-slate-100 rounded-3xl shadow-sm bg-white">
          <table className="w-full min-w-[600px] border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 font-headline font-bold text-slate-700 uppercase tracking-wider">
                <th className="px-6 py-4.5">Case Study</th>
                <th className="px-6 py-4.5">Treatment Provided</th>
                <th className="px-6 py-4.5">Duration</th>
                <th className="px-6 py-4.5">Key Clinical Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-body text-slate-650">
              {caseStudies.map((cs, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4.5 font-bold text-slate-900">{cs.caseId}</td>
                  <td className="px-6 py-4.5">{cs.treatment}</td>
                  <td className="px-6 py-4.5 text-brandBlue font-semibold">{cs.duration}</td>
                  <td className="px-6 py-4.5 text-slate-500">{cs.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── 5. BOTTOM CALL TO ACTION (New Dark Navy Aesthetic) ─── */}
      <TreatmentCtaBanner
        badgeText="Root Canal Specialist"
        titlePrefix="Consult Our"
        highlightWord="Medical Specialists"
        titleSuffix=""
        subtitle="Experience clinical precision healthcare tailored to your unique requirements. Schedule your clinical assessment today."
        primaryBtnText="Schedule Clinical Assessment"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call Helpline"
        secondaryBtnPhone="+919489160055"
        doctorImage="/images/doctors/sherine2.webp"
        doctorName="DR. SHERINE PONRAJ"
        doctorRole="Root Canal Specialist"
        doctorAlt="DR. SHERINE PONRAJ - Root Canal Specialist"
      />
    </div>
  );
}
