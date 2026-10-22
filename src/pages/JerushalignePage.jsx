import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Star, ChevronDown, Calendar, Phone, MapPin,
  CheckCircle2, ArrowRight, Clock, Users, Award, Heart, Sparkles,
  ExternalLink, Play, Zap, RefreshCw, Smile, FileText, Check, Shield
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

const STATS = [
  { value: '5,000+', label: 'Sets Crafted In-House' },
  { value: '2 Days', label: 'Kit Delivery Time' },
  { value: '100%', label: 'Invisible & Custom Fit' },
  { value: '50%', label: 'Savings vs Import Brands' },
];

const BENEFITS = [
  {
    title: '100% In-House Precision',
    desc: 'Manufactured directly in our advanced digital lab under expert orthodontist supervision to ensure maximum quality control and perfect custom fitting.',
    img: '/images/medical-services/dental-care/jerushaligne/in-house-precision.webp',
    icon: Sparkles,
    tag: '3D CAD/CAM Tech'
  },
  {
    title: 'Virtually Invisible Aesthetics',
    desc: 'Crystal-clear, medical-grade thermoplastic trays that align teeth discreetly without metal brackets or ugly wires.',
    img: '/images/medical-services/dental-care/jerushaligne/virtually-invisible.webp',
    icon: ShieldCheck,
    tag: 'Clear Thermoplastic'
  },
  {
    title: '100% Removable & Convenient',
    desc: 'Remove your aligners effortlessly while eating your favorite meals, drinking hot beverages, or during daily oral hygiene routines.',
    img: '/images/medical-services/dental-care/jerushaligne/removable.webp',
    icon: RefreshCw,
    tag: 'Total Convenience'
  },
  {
    title: '2-Days Aligner Kit Delivery',
    desc: 'Get your complete custom-molded Jerushaligne clear aligner kit in just 2 days after your intraoral 3D scan.',
    img: '/images/medical-services/dental-care/jerushaligne/aligner-kit-delivery.webp',
    icon: Clock,
    tag: 'Record Speed'
  },
  {
    title: 'Direct Cost Savings',
    desc: 'In-house production eliminates middleman markups, giving you world-class aligner therapy at up to 50% lower costs than imported brands.',
    img: '/images/medical-services/dental-care/jerushaligne/cost-savings.webp',
    icon: Award,
    tag: 'Direct Lab Pricing'
  }
];

const CONDITIONS = [
  {
    title: 'Crowded Teeth',
    desc: 'Fixes space shortages to guide squeezed, overlapping teeth into proper linear alignment.',
    img: '/images/medical-services/dental-care/jerushaligne/crowded-teeth.webp'
  },
  {
    title: 'Overlapping Teeth',
    desc: 'Straightens twisted or overlapping teeth for easier cleaning and superior oral hygiene.',
    img: '/images/medical-services/dental-care/jerushaligne/overlap.webp'
  },
  {
    title: 'Teeth Gaps (Diastema)',
    desc: 'Closes unwanted spaces between front or side teeth cleanly and predictably.',
    img: '/images/medical-services/dental-care/jerushaligne/diastema-teeth-gaps.webp'
  },
  {
    title: 'Overbite Alignment',
    desc: 'Reduces excessive upper front tooth overlap over lower teeth for balanced jaw alignment.',
    img: '/images/medical-services/dental-care/jerushaligne/over-bite.webp'
  },
  {
    title: 'Underbite Correction',
    desc: 'Realigns lower teeth that project outward past upper front teeth.',
    img: '/images/medical-services/dental-care/jerushaligne/under-bite.webp'
  },
  {
    title: 'Crossbite Adjustment',
    desc: 'Fixes upper teeth that sit inside lower teeth when biting, preventing abnormal wear.',
    img: '/images/medical-services/dental-care/jerushaligne/cross-bite.webp'
  },
  {
    title: 'Open Bite Gap',
    desc: 'Closes the vertical gap when upper and lower front teeth fail to meet upon biting.',
    img: '/images/medical-services/dental-care/jerushaligne/open-bite.webp'
  },
  {
    title: 'Orthodontic Relapse',
    desc: 'Realigns teeth that shifted back years after wearing traditional metal braces.',
    img: '/images/medical-services/dental-care/jerushaligne/orthodontic-relapse.webp'
  }
];

const PROCEDURE_STEPS = [
  {
    step: '01',
    title: 'Digital Impression & Consultation',
    desc: 'A fast, comfortable 3D intraoral scan captures every micro-detail of your teeth without messy traditional impression pastes.',
    img: '/images/medical-services/dental-care/jerushaligne/digital-impression-consultation.webp',
    badge: '3D Intraoral Scan'
  },
  {
    step: '02',
    title: '3D CAD Movement Planning',
    desc: 'Our orthodontists map precise micro-movements and generate a 3D digital simulation previewing your smile transformation.',
    img: '/images/medical-services/dental-care/jerushaligne/3d-post-result.webp',
    badge: 'AI CAD Simulation'
  },
  {
    step: '03',
    title: 'In-House 3D Printing & Laser Finishing',
    desc: 'Your custom Jerushaligne trays are 3D-printed and laser-finished in our dedicated digital lab—ready in just 2 days!',
    img: '/images/medical-services/dental-care/jerushaligne/3d-printing-thermoform.webp',
    badge: 'Ready in 2 Days'
  },
  {
    step: '04',
    title: 'Wear & Smile Transformation',
    desc: 'Wear your trays 20–22 hours daily, switching sets as guided while tracking your progress via www.jerushaligne.com.',
    img: '/images/medical-services/dental-care/jerushaligne/wear-smile.webp',
    badge: '20-22 Hours Daily'
  }
];

const REMOTE_FEATURES = [
  {
    title: 'Express Digital Impressions',
    desc: 'Complete your 3D scan during a single short clinic visit and receive your complete custom aligner series within 2 days.',
    img: '/images/medical-services/dental-care/jerushaligne/express-digital-impression.webp',
    tag: 'Fast Scan'
  },
  {
    title: 'No Doctor Needed for Follow-ups',
    desc: 'With custom pre-planned aligner series and digital tracking, enjoy total convenience without constant physical clinic visits.',
    img: '/images/medical-services/dental-care/jerushaligne/no-doctor-need.webp',
    tag: 'Remote Friendly'
  },
  {
    title: 'International Patient Care',
    desc: 'Overseas patients can complete intraoral scanning and receive their full aligner kit before returning home.',
    img: '/images/medical-services/dental-care/jerushaligne/international-care.webp',
    tag: 'Global Patients'
  }
];

const FAQS = [
  {
    q: 'What makes Jerushaligne different from brands like Invisalign or Toothsi?',
    a: 'Most aligner brands require sending scans to third-party providers, causing 3 to 4 weeks of waiting time and high markup fees. Jerushaligne is manufactured directly in our own digital dental lab. With just a digital impression, your aligners are ready in just 2 days at up to 50% lower costs.'
  },
  {
    q: 'How fast can I get my Jerushaligne clear aligners after my scan?',
    a: 'Thanks to our in-house 3D printing and CAD/CAM setup, your aligners are manufactured and ready for fitting in just 2 days following your initial 3D digital impression.'
  },
  {
    q: 'Where can I learn more about Jerushaligne?',
    a: 'You can explore detailed treatment info, view patient transformation galleries, and request virtual consultations directly on our dedicated brand website: www.jerushaligne.com.'
  },
  {
    q: 'How many aligner sets have been manufactured at Jerush Dentofacial?',
    a: 'Our in-house dental laboratory has successfully crafted over 5,000+ custom Jerushaligne sets for patients seeking rapid, invisible tooth alignment.'
  },
  {
    q: 'How many hours a day should I wear my Jerushaligne trays?',
    a: 'To achieve optimal results in the predicted timeframe, you should wear your Jerushaligne trays for 20 to 22 hours per day, removing them only while eating, drinking hot/colored beverages, and brushing or flossing.'
  }
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'video-demo', label: '3D Video Demo' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'conditions', label: 'Bite Conditions' },
  { id: 'procedure', label: 'Procedure' },
  { id: 'remote-care', label: 'Global Care' },
  { id: 'faqs', label: 'FAQs' }
];

export default function JerushalignePage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);

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
    <div className="w-full bg-slate-50 font-body text-left relative min-h-screen">
      
      {/* Page Hero Breadcrumbs */}
      <PageBreadcrumbHero
        title="Top-Quality Invisible Clear Aligners (Jerushaligne)"
        breadcrumbs={[
          { label: 'Dental Care', path: '/treatments' },
          { label: 'Jerushaligne Clear Aligners', active: true }
        ]}
      />

      {/* ─── Hero Intro Section ─── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <span className="inline-block text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3 py-1.5 rounded-full border border-brandSky/15">
              Proprietary In-House 3D CAD/CAM System
            </span>
            <h1
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-3xl sm:text-4xl text-slate-900 leading-[1.4]"
            >
              Jerushaligne — Top-Quality{' '}
              <span className="text-gradient bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Invisible Clear Aligners
              </span>
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Transform your smile discreetly with custom-manufactured clear aligners. Designed specifically for patients who want a straight smile without the aesthetic drawback of traditional metal or ceramic braces.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Just a digital impression, and your custom Jerushaligne clear aligners are <strong className="text-brandBlue font-semibold">ready within 2 days!</strong> Learn more on our dedicated brand site at <a href="https://jerushaligne.com/best-invisible-aligners" target="_blank" rel="noopener noreferrer" className="text-brandBlue underline font-semibold hover:text-brandSky">www.jerushaligne.com</a>.
            </p>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                'In-House 3D Lab',
                'Ready in 2 Days',
                'Zero Metal Brackets',
                '5,000+ Sets Crafted'
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-100 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                  <span className="text-xs font-bold text-slate-700">{badge}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleBookClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md hover:shadow-lg hover:brightness-105 transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book 3D Digital Scan
              </button>
              <a
                href="https://www.jerushaligne.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-headline font-bold text-xs uppercase tracking-wider rounded-2xl shadow-sm hover:bg-slate-50 transition-all"
              >
                <ExternalLink className="w-4 h-4 text-brandBlue" />
                Visit www.jerushaligne.com
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-white p-2 flex items-center justify-center">
              <img
                src="/images/medical-services/dental-care/jerushaligne/girl.webp"
                alt="Jerushaligne Clear Aligners Patient"
                className="w-full h-auto max-h-[420px] object-contain rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white border border-slate-100 shadow-lg rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">In-House Production</p>
                <p className="font-headline font-black text-lg text-slate-900">5,000+ Sets Crafted</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Top Appointment Consultation Section ─── */}
      <TreatmentAppointmentForm
        treatmentName="Jerushaligne Clear Aligners"
        treatmentCategory="dental"
        title="Book a Jerushaligne 3D Digital Scan"
        highlightWord="Near You"
        subtitle="Experience next-generation invisible teeth alignment manufactured directly in our high-precision digital orthodontics lab."
        features={[
          {
            icon: ShieldCheck,
            title: '5,000+ Clear Aligners Crafted',
            desc: 'Custom engineered in-house under senior orthodontist supervision for optimal biomechanical tooth movement.'
          },
          {
            icon: Clock,
            title: 'Express 2-Day Kit Delivery',
            desc: 'Digital intraoral 3D scanning allows instant manufacturing without multi-week overseas waiting.'
          },
          {
            icon: Sparkles,
            title: '100% Invisible & Removable',
            desc: 'Crystal-clear medical polymer trays you can remove comfortably while eating and brushing.'
          },
          {
            icon: MapPin,
            title: '4 Regional Centres & Global Remote Care',
            desc: 'Digital check-in appointments and direct specialist support across Tamil Nadu and worldwide.'
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

      {/* ─── Sticky Tab Navigation ─── */}
      <TreatmentSectionNav
        tabs={TABS}
        activeSection={activeSection}
        onTabClick={scrollToSection}
      />

      {/* ─── SECTION 1: OVERVIEW & IN-HOUSE ADVANTAGE ─── */}
      <section id="overview" className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
              Overview & Clinical Advantage
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-2xl sm:text-3xl text-slate-900 leading-[1.4]"
            >
              What Makes <span className="text-gradient bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">Jerushaligne</span> Special?
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              <strong>Jerushaligne</strong> is our proprietary, in-house manufactured clear aligner system. Designed specifically for patients who want a straight smile without the aesthetic drawback of traditional metal or ceramic braces, Jerushaligne combines high-precision 3D dentistry with speed and comfort.
            </p>

            {/* Feature Highlight Rows */}
            <div className="space-y-4 pt-2">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 text-brandBlue flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-brandBlue" />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-base text-slate-900">The In-House Advantage: Ready Within 2 Days!</h4>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    Unlike clinics that take physical molds and send them to outside providers—causing weeks of delay—Jerush Dentofacial operates its own advanced AI Technology lab. <strong>Just a digital impression, and your clear aligners are ready in 2 days!</strong>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 text-brandSky flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-brandSky" />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-base text-slate-900">Proven Clinical Success</h4>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    Because we manage the entire fabrication workflow in our dedicated digital lab under expert orthodontist supervision, we have successfully crafted over <strong>5,000+ custom aligner sets</strong> for our patients.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Image Showcase */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-white p-2 flex items-center justify-center group">
              <img
                src="/images/medical-services/dental-care/jerushaligne/jerushaligne-overview.webp"
                alt="Jerushaligne Overview - In-house aligner crafting"
                className="w-full h-auto max-h-[380px] object-contain transform-gpu group-hover:scale-105 transition-transform duration-700 rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: VIDEO SHOWCASE ─── */}
      <section id="video-demo" className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-slate-900 text-white rounded-3xl p-8 lg:p-14 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="inline-block text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/10 px-3.5 py-1.5 rounded-full border border-brandSky/20">
              Official Video Showcase
            </span>
            <h2 className="font-headline font-black text-3xl sm:text-4xl text-white">
              Experience <span className="bg-gradient-to-r from-brandBlue via-brandSky to-sky-300 bg-clip-text text-transparent">3D Digital Precision</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Watch how our state-of-the-art intraoral digital scan and in-house thermoforming lab craft crystal-clear aligners with zero delay.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800">
              <video
                controls
                autoPlay
                muted
                loop
                playsInline
                src="/videos/jerushaligne-video.mp4"
                className="w-full h-auto max-h-[560px] object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: BENEFITS FEATURE GRID ─── */}
      <section id="benefits" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-block text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
            Key Advantages
          </span>
          <h2 className="font-headline font-black text-3xl sm:text-4xl text-slate-900">
            Why Patients Choose <span className="text-gradient bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">Jerushaligne</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Designed for maximum comfort, invisibility and unmatched speed without middleman markups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((b, idx) => {
            const IconComponent = b.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-brandSky/40 transition-all duration-300 transform-gpu flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-brandBlue to-brandSky flex items-center justify-center text-white shadow-md">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-brandBlue text-[10px] font-bold uppercase tracking-wider">
                      {b.tag}
                    </span>
                  </div>

                  <div className="rounded-2xl overflow-hidden h-44 bg-slate-50 p-2 flex items-center justify-center border border-slate-100">
                    <img
                      src={b.img}
                      alt={b.title}
                      className="w-full h-full object-contain transform-gpu group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div>
                    <h3 className="font-headline font-bold text-lg text-slate-900 group-hover:text-brandBlue transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2 font-body">
                      {b.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center text-xs font-headline font-bold text-brandBlue group-hover:translate-x-1 transition-transform">
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── SECTION 4: SYMPTOMS & 8 BITE CONDITIONS ─── */}
      <section id="conditions" className="bg-slate-100/70 border-y border-slate-200/70 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
              Orthodontic Indications
            </span>
            <h2 className="font-headline font-black text-3xl sm:text-4xl text-slate-900">
              Conditions Corrected by <span className="text-gradient bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">Jerushaligne</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Jerushaligne effectively treats mild, moderate and complex orthodontic alignments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONDITIONS.map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-brandSky/40 transition-all duration-300 transform-gpu group"
              >
                <div className="rounded-2xl overflow-hidden h-44 mb-4 bg-slate-50 p-2 flex items-center justify-center border border-slate-100">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-contain transform-gpu group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-headline font-bold text-base text-slate-900 group-hover:text-brandBlue transition-colors">
                  {c.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mt-2 font-body">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: 4-STEP PROCEDURE FLOW (ALL 4 STEPS SHOWN TOGETHER IN A GRID) ─── */}
      <section id="procedure" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-block text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
            Ultra-Fast Treatment Journey
          </span>
          <h2 className="font-headline font-black text-3xl sm:text-4xl text-slate-900">
            Our 4-Step <span className="text-gradient bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">Digital Procedure</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From 3D intraoral scan to tray delivery in just 2 days:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCEDURE_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-lg hover:border-brandSky/40 transition-all duration-300 transform-gpu flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-12 h-12 rounded-2xl bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-black text-lg flex items-center justify-center shadow-xs">
                    {step.step}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-sky-50 text-brandBlue text-[10px] font-bold uppercase border border-sky-100">
                    {step.badge}
                  </span>
                </div>

                <div className="rounded-2xl overflow-hidden h-44 mb-4 bg-slate-50 p-2 flex items-center justify-center border border-slate-100">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-contain transform-gpu group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-headline font-bold text-base text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed font-body">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 6: GLOBAL & REMOTE PATIENT SUPPORT ─── */}
      <section id="remote-care" className="bg-slate-100/70 border-y border-slate-200/70 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
              Global & Remote Care
            </span>
            <h2 className="font-headline font-black text-3xl sm:text-4xl text-slate-900">
              Designed for <span className="text-gradient bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">Local & International Patients</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Get your entire treatment kit conveniently crafted during your short visit to Tamil Nadu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {REMOTE_FEATURES.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform-gpu space-y-5 group">
                <div className="rounded-2xl overflow-hidden h-52 bg-slate-50 p-3 flex items-center justify-center border border-slate-100">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-contain transform-gpu group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-brandSky/10 border border-brandSky/20 text-brandBlue text-xs font-bold uppercase tracking-wider">
                  {item.tag}
                </span>
                <h3 className="font-headline font-bold text-lg text-slate-900">{item.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQS) ─── */}
      <section id="faqs" className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-14 space-y-3">
          <span className="inline-block text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
            Got Questions?
          </span>
          <h2 className="font-headline font-black text-3xl sm:text-4xl text-slate-900">
            Frequently Asked <span className="text-gradient bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full px-7 py-5 flex items-center justify-between text-left font-headline font-bold text-base text-slate-900 hover:text-brandBlue transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isExpanded 
                      ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white rotate-180 shadow-xs' 
                      : 'bg-sky-50 text-brandBlue group-hover:bg-brandBlue group-hover:text-white'
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
                      <div className="px-7 pb-6 pt-2 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-sky-50/20 font-body">
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

      {/* ─── SECTION 8: BOTTOM CTA BANNER (New Dark Navy Aesthetic) ─── */}
      <TreatmentCtaBanner
        badgeText="Clear Aligner Specialist"
        titlePrefix="Ready to Straighten Your Teeth in Just"
        highlightWord="2 Days?"
        titleSuffix=""
        subtitle="Book your 3D digital intraoral scan at Jerush Dentofacial. Experience world-class in-house clear aligners custom manufactured under the supervision of Dr. A. Bladbin and our digital orthodontics team."
        primaryBtnText="Book 3D Digital Scan"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Visit www.jerushaligne.com"
        secondaryBtnLink="https://www.jerushaligne.com"
        doctorImage="/images/doctors/dr-bladbin-portrait.webp"
        doctorName="DR. A. BLADBIN"
        doctorRole="Clear Aligner Specialist"
        doctorAlt="DR. A. BLADBIN - Jerush Dentofacial"
      />
    </div>
  );
}

