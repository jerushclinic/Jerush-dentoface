import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Star, ChevronDown, Calendar, Phone, CheckCircle2,
  Clock, Award, Heart, Shield, Activity, Smile, Sparkles, ArrowRight,
  Info, Globe, Plane, Check, Cpu, Layers, X, Zap, Target, Eye, Sparkle
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

const STATS = [
  { value: '15K+', label: 'Crowns & Bridges Restored' },
  { value: '99.4%', label: 'Clinical Precision' },
  { value: '3-5 Days', label: 'Express Turnaround' },
  { value: '60-70%', label: 'Global Cost Savings' }
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'transformations', label: 'Real Patient Results' },
  { id: 'symptoms', label: 'Symptoms & Indications' },
  { id: 'procedure', label: 'Procedure' },
  { id: 'advantage', label: 'Why Jerush' },
  { id: 'tourism', label: 'Dental Tourism' },
  { id: 'faqs', label: 'FAQs' }
];

const BADGES = [
  {
    title: 'ISO Certified',
    desc: 'International Quality Standards',
    img: '/images/medical-services/dental-care/crowns-bridges/iso-badge.webp'
  },
  {
    title: 'CAD/CAM Digital Dentistry',
    desc: 'Precision Digital Milling',
    img: '/images/medical-services/dental-care/crowns-bridges/cad-cam-badge.webp'
  },
  {
    title: 'Best in Class Treatment',
    desc: 'World-Class Ceramics',
    img: '/images/medical-services/dental-care/crowns-bridges/best-in-class-badge.webp'
  }
];

const MATERIALS = [
  {
    name: 'Monolithic Zirconia',
    badge: 'Maximum Strength',
    img: '/images/medical-services/dental-care/crowns-bridges/Monolithic-zirconia.webp',
    desc: 'Delivers maximum mechanical strength for molars subject to heavy biting forces.',
    features: ['1200+ MPa mechanical strength', 'Ideal for heavy biting forces', 'Metal-free bio-compatibility', 'Long-term durability'],
    popularFor: 'Molars & Heavy Biting Restorations'
  },
  {
    name: 'E-Max (Lithium Disilicate)',
    badge: 'Superior Aesthetics',
    img: '/images/medical-services/dental-care/crowns-bridges/e-max-lithium-disilicate.webp',
    desc: 'Premium all-ceramic choice offering superior translucency and unmatched aesthetic beauty for front teeth.',
    features: ['Superior enamel translucency', 'Unmatched aesthetic beauty', 'High edge strength', 'Stain-resistant ceramic finish'],
    popularFor: 'Front Teeth & Cosmetic Restorations'
  },
  {
    name: 'Layered Zirconia',
    badge: 'Hybrid Excellence',
    img: '/images/medical-services/dental-care/crowns-bridges/layered-zirconia.webp',
    desc: 'Combines the high structural strength of a Zirconia core with a natural, tooth-colored porcelain exterior.',
    features: ['High structural Zirconia core', 'Natural porcelain exterior', 'Lifelike depth & translucency', 'Ideal for visible smile zones'],
    popularFor: 'Anterior Teeth & Complex Bridges'
  }
];

const BENEFITS = [
  {
    title: 'Restored Chewing & Function',
    desc: 'Eat, bite and speak naturally without pain, discomfort or hesitation.',
    img: '/images/medical-services/dental-care/crowns-bridges/restored-chewing-function.webp'
  },
  {
    title: 'Seamless Natural Aesthetics',
    desc: 'Precision digital shade-matching matches the color, gradient and translucency of neighboring teeth.',
    img: '/images/medical-services/dental-care/crowns-bridges/seamless-natural-aesthetics.webp'
  },
  {
    title: 'Long-Term Tooth Protection',
    desc: 'Shields weakened or post-root canal teeth from future fractures and wear.',
    img: '/images/medical-services/dental-care/crowns-bridges/long-term-tooth-protection.webp'
  },
  {
    title: 'Prevents Tooth Shifting',
    desc: 'Dental bridges prevent remaining natural teeth from drifting into open gaps, preserving proper jaw alignment.',
    img: '/images/medical-services/dental-care/crowns-bridges/prevents-tooth-shifting.webp'
  }
];

const CLINICAL_TRANSFORMATIONS = [
  {
    patientName: 'Anitha S.',
    title: 'Anterior Tooth Fracture & Crown Repair',
    tag: 'Monolithic Zirconia Crown',
    duration: '2 Sittings (3 Days)',
    beforeImg: '/images/before-after/dental/crowns-bridges/anitha-before.webp',
    afterImg: '/images/before-after/dental/crowns-bridges/aniitha-after.webp',
    highlight: 'Restored Enamel Contour & Strength'
  },
  {
    patientName: 'Farhana M.',
    title: 'Front Incisor Discoloration & Gap Closure',
    tag: 'E-Max Ceramic Jacket Crown',
    duration: 'Single Visit (2 Days)',
    beforeImg: '/images/before-after/dental/crowns-bridges/farhana-before.webp',
    afterImg: '/images/before-after/dental/crowns-bridges/farhana-after.webp',
    highlight: 'Natural Enamel Translucency'
  },
  {
    patientName: 'Helen R.',
    title: 'Missing Tooth Gap & Fixed Bridge',
    tag: '3-Unit Zirconia Fixed Bridge',
    duration: '3 Days Express CAD/CAM',
    beforeImg: '/images/before-after/dental/crowns-bridges/helen-before.webp',
    afterImg: '/images/before-after/dental/crowns-bridges/helen-after.webp',
    highlight: '100% Biting Force Restored'
  },
  {
    patientName: 'Kavin P.',
    title: 'Post-Root Canal Tooth Reinforcement',
    tag: 'High-Strength Zirconia Crown',
    duration: '2 Days',
    beforeImg: '/images/before-after/dental/crowns-bridges/kavin-before.webp',
    afterImg: '/images/before-after/dental/crowns-bridges/kavin-after.webp',
    highlight: 'Fracture-Proof Structural Seal'
  },
  {
    patientName: 'Kavya K.',
    title: 'Severe Enamel Erosion & Aesthetic Makeover',
    tag: 'E-Max Aesthetic Crown Restorations',
    duration: '4 Days',
    beforeImg: '/images/before-after/dental/crowns-bridges/kavya-before.webp',
    afterImg: '/images/before-after/dental/crowns-bridges/kavya-after.webp',
    highlight: 'Flawless Shade Harmony'
  },
  {
    patientName: 'Raguram T.',
    title: 'Multi-Tooth Loss & Complex Bridge',
    tag: '4-Unit Multi-Unit Bridge',
    duration: '4 Days',
    beforeImg: '/images/before-after/dental/crowns-bridges/raguram-before.webp',
    afterImg: '/images/before-after/dental/crowns-bridges/raguram-after.webp',
    highlight: 'Complete Arch Alignment'
  },
  {
    patientName: 'Vincent K.',
    title: 'Full Arch Functional Restorative Bridge',
    tag: 'Full Arch Ceramic Bridge',
    duration: '5 Days CAD/CAM',
    beforeImg: '/images/before-after/dental/crowns-bridges/vincent-before.webp',
    afterImg: '/images/before-after/dental/crowns-bridges/vincent-after.webp',
    highlight: 'Full Smile Transformation'
  }
];

const CROWN_INDICATIONS = [
  {
    title: 'Post-Root Canal Treatment (RCT)',
    desc: 'Weakened, fragile tooth structure following a Root Canal Treatment (RCT).'
  },
  {
    title: 'Fractured, Cracked or Chipped Teeth',
    desc: 'Severely fractured, cracked or chipped teeth requiring structural restoration.'
  },
  {
    title: 'Large, Failing Fillings',
    desc: 'Large, failing fillings with minimal natural tooth structure remaining.'
  },
  {
    title: 'Intrinsic Discoloration & Misshapen Teeth',
    desc: 'Deep intrinsic discoloration or misshapen tooth structures.'
  }
];

const BRIDGE_INDICATIONS = [
  {
    title: 'Missing Contiguous Teeth',
    desc: 'One or more missing contiguous teeth creating visible gaps in your smile.'
  },
  {
    title: 'Chewing & Bite Discomfort',
    desc: 'Difficulty chewing food comfortably or noticeable changes in your bite pattern.'
  },
  {
    title: 'Facial Sagging & Jaw Stress',
    desc: 'Facial sagging or jaw stress caused by long-standing tooth loss.'
  },
  {
    title: 'Adjacent Teeth Drifting & Misalignment',
    desc: 'Preventing neighboring natural teeth from shifting or tilting into empty spaces.'
  }
];

const PROCEDURE_STEPS = [
  {
    step: '01',
    title: 'Digital Consultation & 3D Scanning',
    shortTitle: '3D Scanning',
    desc: 'Comprehensive clinical assessment, digital X-rays and 3D intraoral scanning for sub-millimeter precision.',
    highlight: 'Comprehensive Assessment & 3D Scans',
    img: '/images/medical-services/dental-care/crowns-bridges/step-1-digital-scanning.webp'
  },
  {
    step: '02',
    title: 'Tooth Preparation',
    shortTitle: 'Tooth Preparation',
    desc: 'Precise, conservative shaping of abutment teeth under painless local anesthesia.',
    highlight: 'Painless Local Anesthesia',
    img: '/images/medical-services/dental-care/crowns-bridges/step-2-tooth-preparation.webp'
  },
  {
    step: '03',
    title: 'CAD/CAM Laboratory Milling',
    shortTitle: 'CAD/CAM Milling',
    desc: 'High-precision digital crafting of your custom ceramic or zirconia restoration in our specialized lab.',
    highlight: 'Digital Lab Precision Milling',
    img: '/images/medical-services/dental-care/crowns-bridges/step-3-laboratory-milling.webp'
  },
  {
    step: '04',
    title: 'Permanent Placement & Fitting',
    shortTitle: 'Placement & Fitting',
    desc: 'Final cementation with medical-grade adhesive, bite calibration, and aesthetic verification.',
    highlight: 'Bite Calibration & Permanent Bond',
    img: '/images/medical-services/dental-care/crowns-bridges/step-4-placement-and-fitting.webp'
  }
];

const COMPARISON_ITEMS = [
  {
    feature: 'Impression & Diagnostic Technique',
    jerush: 'Comfortable 3D Intraoral Digital Scanning (Zero mess, sub-millimeter accuracy)',
    others: 'Messy physical putty impressions causing gagging and inaccuracies'
  },
  {
    feature: 'Restorative Materials Used',
    jerush: '100% Bio-compatible Monolithic Zirconia & E-Max (Zero Metal)',
    others: 'Traditional PFM (Porcelain-Fused-to-Metal) prone to chipping'
  },
  {
    feature: 'Gum Margin Appearance',
    jerush: 'Natural gum line harmony with zero dark lines or black margins',
    others: 'Dark grey or black metallic lines visible along the gum line over time'
  },
  {
    feature: 'Turnaround Time',
    jerush: '3 to 5 Days Express CAD/CAM Laboratory Milling',
    others: '2 to 3 weeks waiting time with multiple uncomfortable sittings'
  },
  {
    feature: 'Global Standards & Warranty',
    jerush: 'ISO Certified Quality with International Patient Warranty Support',
    others: 'Variable local lab quality without documented material certification'
  },
  {
    feature: 'Cost Savings for Tourism Patients',
    jerush: 'Up to 60% - 70% lower cost than US/UK/EU rates with premium materials',
    others: 'High Western pricing with long waiting lists and expensive procedures'
  }
];

const FAQS = [
  {
    q: 'What is the difference between a Crown, a Bridge and a Dental Implant and which is best for me?',
    a: (
      <div className="space-y-3">
        <p>Here is how the three restorative options differ:</p>
        <ul className="space-y-1.5 list-disc pl-5">
          <li><strong>Dental Crown:</strong> Covers and protects a single damaged or root-canal-treated tooth when the root is still healthy and intact.</li>
          <li><strong>Dental Bridge:</strong> Suspends a custom replacement tooth across a missing space, anchored by adjacent natural teeth.</li>
          <li><strong>Dental Implant:</strong> Surgically replaces a missing tooth root directly in the jawbone without modifying neighboring healthy teeth.</li>
        </ul>
        <p className="italic text-brandBlue font-medium">At Jerush Dentofacial & Cosmetic Laser Centre, our prosthodontic specialists evaluate your 3D digital scans to recommend the ideal long-term treatment plan for your specific case.</p>
      </div>
    )
  },
  {
    q: 'How long do Zirconia and Ceramic crowns or bridges last?',
    a: 'When crafted with high-grade materials like Monolithic Zirconia or E-Max ceramic, restorations typically last 10 to 15+ years—and often a lifetime with proper oral hygiene and regular checkups.'
  },
  {
    q: 'How many days will international patients need to stay for treatment?',
    a: 'Thanks to our digital CAD/CAM workflows and in-house laboratory processing, most crown and bridge treatments are completed in 3 to 5 business days.'
  },
  {
    q: 'Will my new crown or bridge look natural alongside my existing teeth?',
    a: 'Yes. We utilize advanced digital shade-matching technology to match the exact shade, texture and translucency of your adjacent teeth for a completely natural look.'
  },
  {
    q: 'Is getting a crown or bridge painful?',
    a: 'No. Tooth preparation is performed under local anesthesia to ensure complete comfort. Post-treatment sensitivity is minimal and resolves within 24 to 48 hours.'
  },
  {
    q: 'Why is restorative dental care at Jerush cost-effective for global patients?',
    a: 'By leveraging in-house CAD/CAM technology and expert surgical teams, Jerush Dentofacial provides international-standard restorative care at up to 60%–70% lower costs compared to US/UK/EU rates, without compromising quality or safety.'
  }
];

export default function CrownsBridgesPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    TABS.map(tab => tab.id),
    138
  );

  const handleBookClick = () => {
    const el = document.getElementById('treatment-appointment-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const nameInput = document.getElementById('treatment-form-name');
      if (nameInput) nameInput.focus();
    } else {
      navigate('/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-slate-50 font-body text-left relative min-h-screen text-slate-800">
      {/* Page Hero Banner */}
      <PageBreadcrumbHero
        title="Dental Crowns & Bridges"
        breadcrumbs={[
          { label: 'Dental Care', path: '/treatments' },
          { label: 'Dental Crowns & Bridges', active: true }
        ]}
      />

      {/* ─── Hero Section (Above the Fold) ─── */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <span className="inline-block text-[11px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
              Jerush Dentofacial & Cosmetic Laser Centre
            </span>
            <h1
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.4]"
            >
              <span className="bg-gradient-to-r from-brandBlue via-brandSky to-blue-600 bg-clip-text text-transparent">
                World-Class Dental Crowns & Bridges
              </span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Restore missing or damaged teeth with precision CAD/CAM Zirconia and Ceramic restorations crafted to international standards.
            </p>

            {/* Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {BADGES.map((b, i) => (
                <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-3 shadow-sm flex flex-col items-center text-center space-y-1.5 hover:border-brandSky/40 transition-all">
                  <img src={b.img} alt={b.title} className="w-9 h-9 object-contain" />
                  <span className="font-headline font-bold text-xs text-slate-900 leading-tight">{b.title}</span>
                  <span className="text-[10px] text-slate-500 leading-tight">{b.desc}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
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
                Request a Call
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
                src="/images/medical-services/dental-care/crowns-bridges/dental-bridge.webp"
                alt="World-Class Dental Crowns & Bridges"
                className="w-full h-[380px] object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white border border-slate-100 shadow-lg rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Durability</p>
                <p className="font-headline font-black text-lg text-slate-900">10 to 15+ Years</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Top Appointment Consultation Section ─── */}
      <TreatmentAppointmentForm
        treatmentName="Dental Crowns & Bridges"
        treatmentCategory="dental"
        title="Book a Dental Crowns & Bridges Consultation"
        highlightWord="Near You"
        subtitle="Consult with experienced prosthodontic and restorative dental specialists at Jerush Dentofacial & Cosmetic Laser Centre."
        features={[
          {
            icon: ShieldCheck,
            title: '15,000+ Teeth Restored',
            desc: 'Over two decades of precision crowns, jacket restorations, and fixed partial bridges.'
          },
          {
            icon: Cpu,
            title: 'In-House CAD/CAM Milling',
            desc: 'Sub-millimeter 3D intraoral digital impressions with 3 to 5 business day delivery.'
          },
          {
            icon: Sparkles,
            title: 'Monolithic Zirconia & E-Max',
            desc: '100% metal-free biocompatible restorations with lifelike natural shade match.'
          },
          {
            icon: Globe,
            title: 'Global Standards & Tourism',
            desc: 'Save 60-70% on international restorative costs with comprehensive treatment warranty.'
          }
        ]}
      />

      {/* ─── Key Stats Bar ─── */}
      <section className="bg-gradient-to-r from-[#0F172A] via-[#2852A3] to-[#0F172A] py-10 sm:py-12 px-4 sm:px-6 text-white shadow-inner relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white relative z-10">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="space-y-1"
            >
              <p className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                {s.value}
              </p>
              <p className="text-brandSky text-xs sm:text-sm font-bold uppercase tracking-wider mt-1">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Sticky Tab Navigation (Cute, Compact Capsule Pills) ─── */}
      <TreatmentSectionNav
        tabs={TABS}
        activeSection={activeSection}
        onTabClick={scrollToSection}
      />

      {/* ─── Overview Section ─── */}
      <section id="overview" className="max-w-7xl mx-auto px-6 py-20">
        <div className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <span className="text-[11px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">Educational Overview</span>
              <h2 className="font-headline font-black text-2xl sm:text-4xl text-slate-900 mt-2">
                <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                  Comprehensive Overview of Crowns & Bridges
                </span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                Dental crowns and bridges are fixed prosthodontic restorations engineered to rebuild both the function and natural aesthetics of your smile.
              </p>

              <div className="space-y-4 pt-2">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 hover:border-brandSky/50 transition-all">
                  <h3 className="font-headline font-bold text-base text-brandBlue flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-brandSky" />
                    Dental Crown (Tooth Cap)
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    A custom-fitted cap designed to cover, protect and strengthen a single damaged, cracked or root-canal-treated tooth. It preserves your natural root structure while fully restoring chewing ability and shape.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 hover:border-brandSky/50 transition-all">
                  <h3 className="font-headline font-bold text-base text-brandBlue flex items-center gap-2">
                    <Layers className="w-5 h-5 text-brandSky" />
                    Dental Bridge
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    A fixed prosthetic appliance used to replace one or multiple missing teeth in a row. It bridges the gap by anchoring securely onto neighboring natural teeth or dental implants.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl overflow-hidden border border-slate-100 shadow-md bg-white p-2"
            >
              <img
                src="/images/medical-services/fixed_partial_denture.png"
                alt="Dental Crown and Bridge overview"
                className="w-full h-[380px] object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Advanced Materials Offered Section (Alternating bg-slate-50/70) ─── */}
      <section className="bg-slate-50/70 py-20 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">Prosthodontic Materials</span>
            <h3 className="font-headline font-black text-2xl sm:text-4xl text-slate-900">
              <span className="bg-gradient-to-r from-brandBlue via-brandSky to-blue-600 bg-clip-text text-transparent">
                Advanced Materials Offered
              </span>
            </h3>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">We use precision CAD/CAM materials tailored to functional and aesthetic requirements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MATERIALS.map((mat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between text-left space-y-6 group hover:border-brandSky"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-brandSky/10 text-brandBlue border border-brandSky/20 uppercase font-headline inline-block">
                      {mat.badge}
                    </span>
                  </div>

                  {/* Material Visual Image */}
                  <div className="w-full h-[200px] sm:h-[220px] rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-100 shadow-sm transition-all group-hover:border-brandSky/40">
                    <img
                      src={mat.img}
                      alt={mat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h4 className="font-headline font-black text-xl text-slate-900 pt-1">
                    {mat.name}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {mat.desc}
                  </p>

                  <div className="pt-2 space-y-2 border-t border-slate-100">
                    {mat.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recommended For</span>
                  <span className="text-xs font-headline font-bold text-brandBlue mt-0.5 block">
                    {mat.popularFor}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Benefits Section (Uncropped Images) ─── */}
      <section id="benefits" className="w-full bg-white py-20 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[11px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">Clinical Advantages</span>
            <h2 className="font-headline font-black text-2xl sm:text-4xl text-slate-900">
              <span className="bg-gradient-to-r from-brandBlue via-brandSky to-blue-600 bg-clip-text text-transparent">
                Key Benefits of Crowns & Bridges
              </span>
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">Explore the key benefits of restoring your smile with crowns and bridges.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white border border-slate-200/80 rounded-3xl p-4 shadow-sm hover:shadow-md hover:border-brandSky/30 transition-all flex flex-col justify-between"
              >
                {/* Image Container with object-contain to display FULL UNCROPPED image */}
                <div className="w-full h-[200px] bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center p-3">
                  <img
                    src={b.img}
                    alt={b.title}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="pt-5 pb-2 px-2 space-y-2 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline font-black text-base text-slate-900">{b.title}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-2">{b.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REAL PATIENT TRANSFORMATIONS (SEPARATE BEFORE & AFTER DESIGN) ─── */}
      <section id="transformations" className="w-full bg-slate-50/70 py-20 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center space-y-3">
            <span className="text-[11px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">Verified Patient Transformations</span>
            <h2 className="font-headline font-black text-2xl sm:text-4xl text-slate-900">
              <span className="bg-gradient-to-r from-brandBlue via-brandSky to-blue-600 bg-clip-text text-transparent">
                Real Patient Before & After Results
              </span>
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto">
              Browse authentic documented clinical outcomes treated at Jerush Dentofacial & Cosmetic Laser Centre. Compare the separate before and after photos side by side.
            </p>
          </div>

          {/* Grid of Patient Transformations with Separate Before/After Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CLINICAL_TRANSFORMATIONS.map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-50 border border-slate-200/90 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:border-brandSky transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                {/* Header Information */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline font-black text-lg text-slate-900">{c.patientName}</h3>
                    <span className="text-[10px] font-bold text-brandBlue bg-brandSky/15 px-2.5 py-1 rounded-full border border-brandSky/20">
                      {c.tag}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-600">{c.title}</p>
                  <p className="text-[11px] text-slate-400 font-medium">Treatment Time: {c.duration}</p>
                </div>

                {/* Separate Before & After Side-by-Side Images */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {/* BEFORE CARD */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group-hover:border-amber-400/50 transition-all">
                    <div className="absolute top-2 left-2 z-10 bg-amber-500/90 text-white text-[9px] font-headline font-black px-2 py-0.5 rounded shadow-md tracking-wider uppercase">
                      BEFORE
                    </div>
                    <img
                      src={c.beforeImg}
                      alt={`${c.patientName} Before Crown & Bridge Treatment`}
                      className="w-full h-[170px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* AFTER CARD */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group-hover:border-emerald-500/50 transition-all">
                    <div className="absolute top-2 left-2 z-10 bg-emerald-500/90 text-white text-[9px] font-headline font-black px-2 py-0.5 rounded shadow-md tracking-wider uppercase">
                      AFTER
                    </div>
                    <img
                      src={c.afterImg}
                      alt={`${c.patientName} After Crown & Bridge Treatment`}
                      className="w-full h-[170px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Bottom Highlight */}
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    {c.highlight}
                  </span>
                  <button
                    onClick={handleBookClick}
                    className="text-[10px] font-headline font-bold text-brandBlue hover:text-brandSky uppercase tracking-wider flex items-center gap-1"
                  >
                    <span>Consult</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Symptoms & Indications Section (bg-white) ─── */}
      <section id="symptoms" className="w-full bg-white py-20 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[11px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">Symptom & Need Checker</span>
            <h2 className="font-headline font-black text-2xl sm:text-4xl text-slate-900">
              <span className="bg-gradient-to-r from-brandBlue via-brandSky to-blue-600 bg-clip-text text-transparent">
                Symptoms & Clinical Indications
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-medium">
              You may require a dental crown or bridge if you experience any of the following conditions:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {/* Crowns Indications Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 hover:shadow-xl hover:border-brandSky/50 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="flex items-center gap-3.5 border-b border-slate-100 pb-5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brandBlue to-brandSky text-white flex items-center justify-center font-headline font-black text-base shadow-md shrink-0">
                    1
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest block">Single Tooth Protection</span>
                    <h3 className="font-headline font-black text-xl text-slate-900">Indications for Dental Crowns</h3>
                  </div>
                </div>

                {/* Indication Visual Diagram */}
                <div className="w-full aspect-[16/10.5] rounded-2xl border border-slate-200/80 overflow-hidden bg-white shadow-sm flex items-center justify-center transition-all duration-300 group-hover:border-brandSky/40">
                  <img
                    src="/images/medical-services/dental-care/crowns-bridges/dental-crown-indication.webp"
                    alt="Indications for Dental Crowns"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-3 pt-1">
                  {CROWN_INDICATIONS.map((item, idx) => (
                    <div key={idx} className="flex gap-3.5 items-start bg-slate-50/90 hover:bg-blue-50/40 p-4 rounded-2xl border border-slate-200/70 transition-all">
                      <div className="w-6 h-6 rounded-full bg-brandBlue/10 text-brandBlue border border-brandBlue/20 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        <Check className="w-3.5 h-3.5 text-brandBlue" />
                      </div>
                      <div>
                        <h4 className="font-headline font-black text-sm text-slate-900">{item.title}</h4>
                        <p className="text-slate-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bridges Indications Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 hover:shadow-xl hover:border-brandSky/50 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="flex items-center gap-3.5 border-b border-slate-100 pb-5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brandSky to-blue-600 text-white flex items-center justify-center font-headline font-black text-base shadow-md shrink-0">
                    2
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest block">Missing Teeth Restoration</span>
                    <h3 className="font-headline font-black text-xl text-slate-900">Indications for Dental Bridges</h3>
                  </div>
                </div>

                {/* Indication Visual Diagram */}
                <div className="w-full aspect-[16/10.5] rounded-2xl border border-slate-200/80 overflow-hidden bg-white shadow-sm flex items-center justify-center transition-all duration-300 group-hover:border-brandSky/40">
                  <img
                    src="/images/medical-services/dental-care/crowns-bridges/dental-bridge-indication.webp"
                    alt="Indications for Dental Bridges"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-3 pt-1">
                  {BRIDGE_INDICATIONS.map((item, idx) => (
                    <div key={idx} className="flex gap-3.5 items-start bg-slate-50/90 hover:bg-blue-50/40 p-4 rounded-2xl border border-slate-200/70 transition-all">
                      <div className="w-6 h-6 rounded-full bg-brandSky/15 text-brandBlue border border-brandSky/30 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        <Check className="w-3.5 h-3.5 text-brandBlue" />
                      </div>
                      <div>
                        <h4 className="font-headline font-black text-sm text-slate-900">{item.title}</h4>
                        <p className="text-slate-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Procedure Section (bg-slate-50/70) ─── */}
      <section id="procedure" className="w-full bg-slate-50/70 border-t border-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center space-y-3">
            <span className="text-[11px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">CAD/CAM Restorative Process</span>
            <h2 className="font-headline font-black text-2xl sm:text-4xl text-slate-900">
              <span className="bg-gradient-to-r from-brandBlue via-brandSky to-blue-600 bg-clip-text text-transparent">
                Our 4-Step Treatment Procedure
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Our streamlined 4-step CAD/CAM restorative process ensures precision fit, speed and comfort:
            </p>
          </div>

          {/* Redesigned 4-Grid Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCEDURE_STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:border-brandSky transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Step Image */}
                  <div className="w-full h-[180px] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 p-2 flex items-center justify-center">
                    <img
                      src={step.img}
                      alt={step.title}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Header & Step Number */}
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-black text-xs flex items-center justify-center shadow-sm">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                      {step.highlight}
                    </span>
                  </div>

                  <h3 className="font-headline font-black text-lg text-slate-900 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-slate-500 text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Competitive Advantage Section (bg-white) ─── */}
      <section id="advantage" className="w-full bg-white py-20 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[11px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">Competitive Edge</span>
            <h2 className="font-headline font-black text-2xl sm:text-4xl text-slate-900">
              <span className="bg-gradient-to-r from-brandBlue via-brandSky to-blue-600 bg-clip-text text-transparent">
                Why Choose Jerush for Crowns & Bridges?
              </span>
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto">Compare how our advanced CAD/CAM digital workflows outperform conventional dental treatments.</p>
          </div>

          <div className="overflow-x-auto bg-slate-50/60 rounded-3xl border border-slate-200/80 p-4 sm:p-6 shadow-sm">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-900 font-headline font-black text-sm">
                  <th className="py-4 px-4 w-[25%]">Feature / Clinical Standard</th>
                  <th className="py-4 px-4 w-[40%] bg-brandBlue/5 text-brandBlue rounded-t-xl">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brandSky" />
                      <span>Jerush Dentofacial (CAD/CAM Zirconia)</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 w-[35%] text-slate-500 font-bold">Conventional Dental Clinics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 text-xs sm:text-sm">
                {COMPARISON_ITEMS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white transition-colors">
                    <td className="py-4 px-4 font-headline font-bold text-slate-900">
                      {item.feature}
                    </td>
                    <td className="py-4 px-4 bg-brandBlue/5 font-semibold text-slate-800">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item.jerush}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-500">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{item.others}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Dental Tourism Support Section (bg-slate-50/70) ─── */}
      <section id="tourism" className="w-full bg-slate-50/70 py-20 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 via-brandBlue to-[#1b4393] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="text-xs font-bold text-brandSky uppercase tracking-widest bg-brandSky/10 px-3 py-1 rounded-full border border-brandSky/20 inline-block">
                  International Standard Restorative Care
                </span>
                <h2
                  style={{ lineHeight: 1.4 }}
                  className="font-headline font-black text-2xl sm:text-4xl text-white leading-[1.4]"
                >
                  <span className="bg-gradient-to-r from-white via-slate-100 to-brandSky bg-clip-text text-transparent">
                    Dental Tourism Support
                  </span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Jerush Dentofacial welcomes international patients for high-grade restorative dental care at up to 60%–70% lower costs compared to Western rates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-left space-y-3 hover:bg-white/15 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-brandSky/20 text-brandSky flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="font-headline font-bold text-base text-white">Virtual Consultation</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Pre-travel treatment planning and instant cost estimates via digital X-ray review.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-left space-y-3 hover:bg-white/15 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-brandSky/20 text-brandSky flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-headline font-bold text-base text-white">Express Turnaround</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Prioritized lab milling for international itineraries (3 to 5 business days).
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-left space-y-3 hover:bg-white/15 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-brandSky/20 text-brandSky flex items-center justify-center">
                    <Plane className="w-5 h-5" />
                  </div>
                  <h3 className="font-headline font-bold text-base text-white">Patient Assistance</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Complete guidance on local stay, local transport and post-procedure care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Frequently Asked Questions (FAQs) Section (bg-white) ─── */}
      <section id="faqs" className="w-full bg-white py-20 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold text-brandSky uppercase tracking-widest bg-gradient-to-r from-brandSky/10 to-brandBlue/10 px-3.5 py-1.5 rounded-full border border-brandSky/20">Patient Knowledge Base</span>
          <h2 className="font-headline font-black text-2xl sm:text-4xl text-slate-900 mt-4">
            <span className="bg-gradient-to-r from-brandBlue via-brandSky to-blue-600 bg-clip-text text-transparent">
              Frequently Asked Questions (FAQs)
            </span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">Clear answers to your dental crown and bridge questions.</p>
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
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded
                    ? 'bg-gradient-to-r from-white via-blue-50/50 to-sky-50/40 border border-brandSky/40 shadow-md ring-1 ring-brandSky/20'
                    : 'bg-gradient-to-r from-white via-slate-50/60 to-blue-50/20 border border-slate-200/70 hover:border-brandSky/40 hover:shadow-md hover:from-white hover:to-blue-50/40'
                  }`}
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-headline font-black text-sm sm:text-base text-slate-900 hover:text-brandBlue transition-colors group"
                >
                  <span className="pr-4">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isExpanded
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
      </div>
    </section>

      {/* ─── Bottom CTA Banner (New Dark Navy Aesthetic) ─── */}
      <TreatmentCtaBanner
        badgeText="Restorative Dental Specialist"
        titlePrefix="Ready to Restore Your Smile with Precision"
        highlightWord="Crowns & Bridges?"
        titleSuffix=""
        subtitle="Consult with our experienced prosthodontic and restorative dental experts at Jerush Dentofacial & Cosmetic Laser Centre. Schedule your visit today for world-class dental restorations."
        primaryBtnText="Book Appointment"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Request a Call"
        secondaryBtnPhone="+919489160055"
        doctorImage="/images/doctors/sherine2.webp"
        doctorName="DR. SHERINE PONRAJ"
        doctorRole="Restorative Dental Specialist"
        doctorAlt="DR. SHERINE PONRAJ - Jerush Dentofacial"
      />
    </div>
  );
}

