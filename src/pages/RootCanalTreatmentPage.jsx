import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Star, ChevronDown, Calendar, Phone,
  CheckCircle2, Clock, Award, Heart, Shield, Activity, Smile
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

const STATS = [
  { value: '15K+', label: 'Root Canals Saved' },
  { value: '99%', label: 'Success Rate' },
  { value: '1 Visit', label: 'Painless Procedure' },
  { value: '0%', label: 'Pain & Anxiety' }
];

const SYMPTOMS = [
  {
    title: 'Persistent Pain',
    desc: 'Severe, spontaneous toothache when chewing, applying pressure, or even at rest.',
    img: '/images/medical-services/dental-care/rct/persistent-pain.webp',
  },
  {
    title: 'Temperature Sensitivity',
    desc: 'Lingering sensitivity or sharp pain when consuming hot or cold foods and drinks.',
    img: '/images/medical-services/dental-care/rct/temperature-sensitivity.webp',
  },
  {
    title: 'Tooth Injuries',
    desc: 'Cracked, chipped, or fractured teeth exposing the nerve and pulp to infection.',
    img: '/images/medical-services/dental-care/rct/tooth-cracks.webp',
  },
  {
    title: 'Severe Tooth Decay',
    desc: 'Untreated deep cavities that breach the dentin layer and damage the tooth pulp.',
    img: '/images/medical-services/dental-care/rct/enamel-decay.webp',
  },
  {
    title: 'Swelling & Abscess',
    desc: 'Gum swelling, localized tenderness, or an abscess discharging near the root.',
    img: '/images/medical-services/dental-care/rct/swell-near-the-root.webp',
  },
  {
    title: 'Tooth Preservation',
    desc: 'The desire to keep your natural tooth and avoid extraction, dentures, or implants.',
    img: '/images/medical-services/dental-care/rct/enamel-maintain.webp',
  }
];

const CONDITIONS = [
  {
    title: 'Deep Tooth Decay',
    desc: 'Removes advanced infected tissue to stop decay from destroying the root structure.',
  },
  {
    title: 'Dental Abscesses',
    desc: 'Safely drains and sterilizes severe bacterial infections causing acute pain and gum swelling.',
  },
  {
    title: 'Tooth Injury & Trauma',
    desc: 'Saves cracked, chipped, or traumatized teeth by securing the internal pulp chamber.',
  },
  {
    title: 'Severe Gum Disease',
    desc: 'Aids in restoring teeth weakened by deep-seated periodontal infections at the root.',
  }
];

const PROCEDURE_STEPS = [
  {
    step: '01',
    title: 'Diagnosis & Digital Imaging',
    desc: 'Our endodontists use high-resolution digital X-rays to assess the canal anatomy and infection severity.',
    highlight: 'Digital Precision'
  },
  {
    step: '02',
    title: 'Gentle Local Anesthesia',
    desc: 'We administer specialized local anesthesia to completely numb the area, ensuring a pain-free experience.',
    highlight: 'Virtually Painless'
  },
  {
    step: '03',
    title: 'Rubber Dam Isolation',
    desc: 'A sterile rubber dam isolates the tooth, maintaining an aseptic environment and keeping it completely dry.',
    highlight: 'Hygiene Standard'
  },
  {
    step: '04',
    title: 'Pulp Cleaning & Removal',
    desc: 'Advanced rotary instruments gently and quickly extract the inflamed pulp tissue, bacteria, and debris.',
    highlight: 'Advanced Rotary Tech'
  },
  {
    step: '05',
    title: 'Canal Disinfection',
    desc: 'Canals are flushed with therapeutic irrigants and antibacterial agents to completely sterilize the chambers.',
    highlight: 'Apex Locator Guided'
  },
  {
    step: '06',
    title: 'Biocompatible Sealing',
    desc: 'The disinfected canals are filled and hermetically sealed using biocompatible gutta-percha to prevent reinfection.',
    highlight: 'Hermetic Seal'
  },
  {
    step: '07',
    title: 'Final Restoration & Crown',
    desc: 'A permanent composite filling is applied. A custom ceramic or zirconia crown is fitted to restore full function.',
    highlight: 'Zirconia / Ceramic Crown'
  }
];

const FAQS = [
  {
    q: 'Is a root canal treatment painful?',
    a: 'No. With modern anesthesia and advanced rotary technology, getting a root canal at Jerush is as comfortable as getting a standard dental filling. The procedure actually eliminates the acute pain caused by the tooth infection.'
  },
  {
    q: 'What is a single-visit root canal treatment?',
    a: 'In a single-visit root canal, the entire procedure from cleaning to sealing is completed in a single session of 45-60 minutes. This is made possible by high-torque rotary files, digital imaging and electronic apex locators.'
  },
  {
    q: 'How long does a root canal last?',
    a: 'A root canal treated tooth can last a lifetime with proper oral hygiene and regular dental checkups. It is highly recommended to place a custom crown after the procedure to protect the tooth from fractures.'
  },
  {
    q: 'What is the cost of Root Canal Treatment at Jerush?',
    a: 'The cost of Root Canal Treatment (RCT) at Jerush depends on the complexity of the root canals and the type of dental crown selected. We offer treatment across all our branches in Thuckalay (Kanyakumari), Trichy and Chennai with complete pricing transparency and flexible EMI options.'
  },
  {
    q: 'Which Jerush branches offer Root Canal Treatment?',
    a: 'You can access our advanced, painless root canal treatment at any of our primary clinics in Tamil Nadu, located in Thuckalay (Kanyakumari), Trichy and Chennai. Each branch is fully equipped with advanced rotary instruments, digital imaging and specialist endodontists.'
  },
  {
    q: 'Can I eat immediately after the procedure?',
    a: 'We recommend waiting until the local anesthesia has completely worn off (usually 1-2 hours) to avoid biting your cheek or tongue. Try to eat soft foods and avoid chewing directly on the treated tooth until the final crown is placed.'
  }
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'symptoms', label: 'Symptoms' },
  { id: 'procedure', label: 'Procedure' },
  { id: 'faqs', label: 'FAQs' }
];

export default function RootCanalTreatmentPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    TABS.map(tab => tab.id),
    138
  );

  const handleBookClick = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-slate-50 font-body text-left relative min-h-screen text-slate-800">
      {/* Page Hero */}
      <PageBreadcrumbHero
        title="Root Canal Treatment"
        breadcrumbs={[
          { label: 'Root Canal & Tooth Repair', path: '/treatments' },
          { label: 'Root Canal Treatment', active: true }
        ]}
      />

      {/* ─── Intro Section ─── */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <span className="inline-block text-[11px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
              Advanced Endodontics
            </span>
            <h1
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-3xl sm:text-4xl text-slate-900 leading-[1.4]"
            >
              Painless Single-Visit{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Root Canal Treatment
              </span>
              {' '}in Tamil Nadu
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Do not let severe toothache affect your quality of life. At Jerush Dentofacial, we offer painless single-visit root canal treatments (RCT) designed to remove bacterial infection, save your natural tooth structure, and prevent any future reinfection.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Using state-of-the-art rotary instruments, apex locators, and advanced disinfection protocols, our expert endodontists deliver a highly efficient, virtually zero-pain treatment in under an hour.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={handleBookClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md hover:shadow-lg hover:brightness-105 transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </button>
              <a
                href="tel:+919489160055"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-headline font-bold text-xs uppercase tracking-wider rounded-2xl shadow-sm hover:bg-slate-50 transition-all"
              >
                <Phone className="w-4 h-4 text-brandBlue" />
                Call Now
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-white p-2">
              <img
                src="/images/medical-services/dental-care/rct/root-canal-treatment.webp"
                alt="Painless Root Canal Treatment in Tamil Nadu"
                className="w-full h-[380px] object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white border border-slate-100 shadow-lg rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Convenience</p>
                <p className="font-headline font-black text-lg text-slate-900">Single Visit Done</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="bg-gradient-to-r from-brandBlue to-[#1b4393] py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <p className="font-headline font-black text-3xl sm:text-4xl">{s.value}</p>
              <p className="text-white/70 text-xs sm:text-sm font-semibold uppercase tracking-wider mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sticky Tab Navigation (Cute, Compact Capsule Pills) */}
      <TreatmentSectionNav
        tabs={TABS}
        activeSection={activeSection}
        onTabClick={scrollToSection}
      />

      {/* ─── What Is Section ─── */}
      <section id="overview" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <span className="text-[11px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">Educational Guide</span>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 mt-2">
              What is{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Root Canal Treatment?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Root canal treatment focuses on doing away with micro organism from an inflamed teeth and preventing reinfection. When the pulp—the innermost part of the enamel that consists of nerves and blood vessels—becomes infected or damaged past repair, it must be removed.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The complete system of pulp elimination, cleansing, sealing, and restoring the enamel is called RCT (Root Canal Treatment). This conservative approach saves your herbal teeth, which are then reinforced with a filling or dental crown.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden border border-slate-100 shadow-md bg-white p-2"
          >
            <img
              src="/images/medical-services/dental-care/rct/root-canal-process.webp"
              alt="Anatomy description of Root Canal Treatment"
              className="w-full h-[360px] object-cover rounded-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── Benefits of Root Canal Care ─── */}
      <section id="benefits" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100 bg-slate-50/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden border border-slate-100 shadow-md bg-white p-2"
          >
            <img
              src="/images/medical-services/dental-care/rct/close-up-image-dentist-examining-female-s-teeth-dentistry.webp"
              alt="Benefits of root canal treatment"
              className="w-full h-[360px] object-cover rounded-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <span className="text-[11px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">Why Get RCT</span>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 mt-2">
              Key Benefits of{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Root Canal Treatment
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Root canal treatment is one of the most reliable dental techniques for saving healthy teeth. Here's why sufferers select it:
            </p>

            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 text-brandBlue flex items-center justify-center shrink-0 mt-1">
                  <span className="text-sm font-bold">♦</span>
                </div>
                <div>
                  <h4 className="font-headline font-extrabold text-sm sm:text-base text-slate-900">Preserves Natural Teeth</h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">Avoids extraction and maintains your real smile at the same time, as it shields the jawbone from shrinking.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 text-brandBlue flex items-center justify-center shrink-0 mt-1">
                  <span className="text-sm font-bold">♦</span>
                </div>
                <div>
                  <h4 className="font-headline font-extrabold text-sm sm:text-base text-slate-900">Eliminates Intense Pain</h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">Contrary to myths, modern-day RCT relieves pain instead of inflicting it by removing infected nerve roots.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 text-brandBlue flex items-center justify-center shrink-0 mt-1">
                  <span className="text-sm font-bold">♦</span>
                </div>
                <div>
                  <h4 className="font-headline font-extrabold text-sm sm:text-base text-slate-900">High Success Rate</h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">With advanced laser and ultrasonic techniques, the success rate is incredibly high, providing long-lasting effects.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Who Might Need a Root Canal Treatment (Symptoms) ─── */}
      <section id="symptoms" className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">Symptom Checker</span>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 mt-4">
              Who Might Need a{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Root Canal?
              </span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl mx-auto">Root canal treatment is suggested in case you are experiencing any of these common dental symptoms.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SYMPTOMS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:border-brandSky/20 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[4/3] w-full bg-slate-100 border-b border-slate-200 overflow-hidden flex items-center justify-center p-6">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-2 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline font-black text-base sm:text-lg text-slate-900 text-center">{s.title}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-2 text-center">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Conditions Root Canal Can Treat ─── */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">Treatable Conditions</span>
          <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 mt-4">
            Conditions We Can Treat With{' '}
            <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
              Root Canal Therapy
            </span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl mx-auto">RCT is versatile and powerful in treating numerous severe dental issues.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Column (Conditions 1 & 2) */}
          <div className="space-y-8">
            {CONDITIONS.slice(0, 2).map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex gap-4 items-start hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-brandBlue flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                  <span className="text-xs font-bold">♦</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-sm sm:text-base text-slate-900">{c.title}</h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-slate-100 bg-white p-2 shadow-md"
          >
            <img
              src="/images/medical-services/dental-care/rct/rct-conditions.webp"
              alt="Root Canal anatomy conditions diagram"
              className="w-full h-auto object-cover rounded-2xl"
            />
          </motion.div>

          {/* Right Column (Conditions 3 & 4) */}
          <div className="space-y-8">
            {CONDITIONS.slice(2, 4).map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex gap-4 items-start hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-brandBlue flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                  <span className="text-xs font-bold">♦</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-sm sm:text-base text-slate-900">{c.title}</h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Procedure Timeline (Redesigned Light Premium Background as Process Indicator) ─── */}
      <section id="procedure" className="bg-slate-50 border-t border-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">The Clinic Experience</span>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 mt-4">
              Our Step-by-Step{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Treatment Procedure
              </span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl mx-auto">At Jerush, we ensure a smooth, pain-free root canal experience across seven precise steps:</p>
          </div>

          {/* Stepper Wizard Bar */}
          <div className="relative mb-12 max-w-4xl mx-auto">
            {/* Connecting line background */}
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-200 -translate-y-1/2 rounded-full z-0 hidden sm:block">
              {/* Dynamic progress fill line */}
              <div
                className="h-full bg-gradient-to-r from-brandBlue to-brandSky transition-all duration-500 rounded-full"
                style={{ width: `${(activeStep / (PROCEDURE_STEPS.length - 1)) * 100}%` }}
              />
            </div>

            {/* Stepper Buttons Container */}
            <div className="relative z-10 flex gap-2 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 justify-between items-center scrollbar-none">
              {PROCEDURE_STEPS.map((step, idx) => {
                const isSelected = activeStep === idx;
                const isCompleted = idx < activeStep;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className="flex flex-col items-center gap-2 group shrink-0 focus:outline-none"
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-headline font-black text-sm sm:text-base border-4 transition-all duration-300 ${isSelected
                        ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white border-white ring-4 ring-brandSky/30 scale-110 shadow-lg'
                        : isCompleted
                          ? 'bg-brandBlue text-white border-slate-200 hover:brightness-110 shadow-sm'
                          : 'bg-white text-slate-400 border-slate-200 hover:border-brandSky hover:text-slate-700 shadow-sm'
                        }`}
                    >
                      {step.step}
                    </div>
                    <span
                      className={`text-[9px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 hidden md:block max-w-[100px] text-center ${isSelected ? 'text-brandBlue font-extrabold' : 'text-slate-400 group-hover:text-slate-700'
                        }`}
                    >
                      {step.title.split(' & ')[0].split(' - ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stepper Details Card Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 items-stretch max-w-6xl mx-auto">
            {/* Visual Panel Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl overflow-hidden border border-slate-200 bg-white p-2 shadow-sm flex items-center"
            >
              <img
                src="/images/medical-services/dental-care/rct/rct-procedure.webp"
                alt="Getting Root Canal Treatment procedure"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </motion.div>

            {/* Content Details Right */}
            <div className="flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex-grow flex flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-headline font-black text-brandSky bg-brandSky/10 px-3.5 py-1 rounded-full border border-brandSky/15">
                        Step {PROCEDURE_STEPS[activeStep].step}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded border border-emerald-100">
                        {PROCEDURE_STEPS[activeStep].highlight}
                      </span>
                    </div>

                    <h3 className="font-headline font-black text-xl sm:text-2xl text-slate-900 leading-tight">
                      {PROCEDURE_STEPS[activeStep].title}
                    </h3>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {PROCEDURE_STEPS[activeStep].desc}
                    </p>
                  </div>

                  {/* Navigation controls */}
                  <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                    <button
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep(prev => prev - 1)}
                      className={`px-5 py-2.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider transition-all border ${activeStep === 0
                        ? 'text-slate-300 border-slate-100 cursor-not-allowed bg-slate-50'
                        : 'text-slate-600 border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                    >
                      ← Previous
                    </button>
                    <span className="text-xs font-semibold text-slate-400 font-headline uppercase tracking-wider">
                      {activeStep + 1} of {PROCEDURE_STEPS.length}
                    </span>
                    <button
                      disabled={activeStep === PROCEDURE_STEPS.length - 1}
                      onClick={() => setActiveStep(prev => prev + 1)}
                      className={`px-5 py-2.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider transition-all ${activeStep === PROCEDURE_STEPS.length - 1
                        ? 'text-slate-300 border border-slate-100 cursor-not-allowed bg-slate-50'
                        : 'bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-sm hover:brightness-105 hover:shadow-md'
                        }`}
                    >
                      Next Step →
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Frequently Asked Questions (FAQ) ─── */}
      <section id="faqs" className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold text-brandSky uppercase tracking-widest bg-gradient-to-r from-brandSky/10 to-brandBlue/10 px-3.5 py-1.5 rounded-full border border-brandSky/20">Patient Knowledge Base</span>
          <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 mt-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-brandBlue via-brandSky to-blue-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">Get answers to the most common queries regarding Root Canal Treatment.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isExpanded = expandedFaq === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  isExpanded
                    ? 'bg-gradient-to-r from-white via-blue-50/50 to-sky-50/40 border border-brandSky/40 shadow-md ring-1 ring-brandSky/20'
                    : 'bg-gradient-to-r from-white via-slate-50/60 to-blue-50/20 border border-slate-200/70 hover:border-brandSky/40 hover:shadow-md hover:from-white hover:to-blue-50/40'
                }`}
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-headline font-black text-sm sm:text-base text-slate-900 hover:text-brandBlue transition-colors group"
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
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-3 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100/80 bg-gradient-to-br from-white/40 via-blue-50/20 to-slate-50/50 font-body">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── Bottom CTA Banner (New Dark Navy Aesthetic) ─── */}
      <TreatmentCtaBanner
        badgeText="Root Canal Specialist"
        titlePrefix="Ready to Restore Your Smile"
        highlightWord="Painlessly?"
        titleSuffix=""
        subtitle="Consult with our highly qualified endodontic experts in Tamil Nadu. Schedule your visit today and experience the professional, patient-first care at Jerush Dentofacial."
        primaryBtnText="Book Appointment"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/sherine2.webp"
        doctorName="DR. SHERINE PONRAJ"
        doctorRole="Root Canal Specialist"
        doctorAlt="DR. SHERINE PONRAJ - Jerush Dentofacial"
      />
    </div>
  );
}

