import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Phone, CheckCircle2, Clock, MapPin,
  ChevronDown, ArrowRight, AlertCircle, ShieldCheck
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

// Signature Counter & Key Stats Bar Data
const KEY_STATS = [
  { value: '188K+', label: 'Patients Screened & Protected' },
  { value: '18+ Years', label: 'Maxillofacial & Pathology Care' },
  { value: '< 15 Mins', label: 'Painless Visual Clinical Exam' },
  { value: '4 Regional Centres', label: 'Centres of Excellence in TN' }
];

// Sticky Sub-Navigation Tabs
const NAVIGATION_TABS = [
  { id: 'what-we-check', label: 'What It Checks' },
  { id: 'who-should-consider', label: 'Who Should Consider' },
  { id: 'clinical-process', label: 'Screening Process' },
  { id: 'screening-diagnosis-prevention', label: 'Screening vs Diagnosis' },
  { id: 'regional-centres', label: 'Regional Centres' },
  { id: 'faqs', label: 'FAQs' }
];

// Section 1: What Does an Oral Cancer Screening Check? (PDF Pages 1 & 2)
const TISSUE_CHECKS = [
  {
    id: 'white-red-patches',
    title: 'White or red patches',
    description: 'Unusual patches on the tongue, cheeks, gums or other areas of the mouth may need further evaluation, especially when they persist or cannot be explained by a clear cause.',
    img: '/images/medical-services/dental-care/community-dentistry/oral-cancer-screening/red-patches.webp',
    alt: 'White or red patches on oral tissues requiring clinical evaluation'
  },
  {
    id: 'persistent-sores-ulcers',
    title: 'Persistent sores or ulcers',
    description: 'An ulcer that does not heal, bleeds without a clear cause or gradually changes in appearance should be examined by a qualified clinician.',
    img: '/images/medical-services/dental-care/community-dentistry/oral-cancer-screening/persistent-sore.webp',
    alt: 'Persistent sores or non-healing ulcers inside the mouth'
  },
  {
    id: 'changes-in-tongue',
    title: 'Changes in the tongue and oral tissues',
    description: 'The clinician checks for unexplained lumps, thickened areas, restricted tongue movement and other changes that may require further assessment.',
    img: '/images/medical-services/dental-care/community-dentistry/oral-cancer-screening/changes-in-tongue.webp',
    alt: 'Examination of changes in the tongue and oral tissues'
  },
  {
    id: 'head-and-neck',
    title: 'The surrounding head and neck area',
    description: 'Depending on the clinical findings, the examination may include checking the neck for unusual lumps or enlarged lymph nodes.',
    img: '/images/medical-services/dental-care/community-dentistry/oral-cancer-screening/head-and-neck.webp',
    alt: 'Clinical examination of the surrounding head and neck area'
  }
];

// Section 2: Who Should Consider Oral Cancer Screening? (PDF Page 2)
const RISK_INDICATIONS = [
  'Use cigarettes, bidis, smokeless tobacco or other tobacco products.',
  'Chew areca nut, betel nut, gutka or betel quid.',
  'Have a history of potentially malignant oral lesions.',
  'Notice persistent ulcers, unexplained patches or lumps inside the mouth.',
  'Experience progressive difficulty opening the mouth or swallowing.',
  'Have a previous history of oral cancer or require ongoing specialist surveillance.'
];

// Section 3: What Happens During the Screening? (PDF Pages 2 & 3)
const SCREENING_STEPS = [
  {
    step: '01',
    title: 'Discussing your history',
    description: 'The clinician asks about symptoms, tobacco or areca nut use, previous oral lesions and relevant medical history.',
    img: '/images/medical-services/dental-care/community-dentistry/oral-cancer-screening/discussing-your-history.webp',
    alt: 'Clinician discussing medical history, symptoms, and lifestyle habits'
  },
  {
    step: '02',
    title: 'Examining the mouth',
    description: 'The lips, cheeks, gums, tongue, floor of the mouth, palate and other accessible tissues are checked for suspicious changes.',
    img: '/images/medical-services/dental-care/community-dentistry/oral-cancer-screening/dental-examination.webp',
    alt: 'Comprehensive examination of the lips, cheeks, gums, tongue, and palate'
  },
  {
    step: '03',
    title: 'Checking additional areas',
    description: 'The clinician may examine or gently feel parts of the mouth and neck when indicated.',
    img: '/images/medical-services/dental-care/community-dentistry/oral-cancer-screening/additional-imaging.webp',
    alt: 'Clinician gently checking and palpating parts of the mouth and neck'
  },
  {
    step: '04',
    title: 'Recommending further investigation',
    description: 'If an abnormal area is identified, you may be referred for specialist evaluation, a biopsy or other appropriate tests.',
    img: '/images/medical-services/dental-care/community-dentistry/oral-cancer-screening/further-investigation.webp',
    alt: 'Clinician recommending specialist evaluation or biopsy if an abnormal area is found'
  },
  {
    step: '05',
    title: 'Planning follow-up',
    description: 'Depending on the findings, the clinician explains whether routine review, closer monitoring or further diagnostic care is needed.',
    img: '/images/medical-services/dental-care/community-dentistry/oral-cancer-screening/follow-up.webp',
    alt: 'Clinician explaining follow-up care, routine review, or closer monitoring'
  }
];

// Section 4: Screening, Diagnosis and Prevention Table (PDF Page 3)
const CARE_TABLE = [
  {
    stage: 'Oral cancer screening',
    purpose: 'Looks for suspicious changes that need attention'
  },
  {
    stage: 'Diagnostic evaluation',
    purpose: 'Investigates an abnormal finding; a biopsy may be required'
  },
  {
    stage: 'Follow-up and prevention',
    purpose: 'Monitors relevant lesions and addresses risk factors'
  }
];

// Section 5: Regional Centres
const REGIONAL_CENTRES = [
  {
    city: 'Thuckalay (HQ)',
    name: 'Jerush Dentofacial & Cosmetic Laser Centre',
    phone: '+91 94891 60000',
    timing: 'Mon - Sat: 9:00 AM - 8:30 PM',
    address: 'Near Old Bus Stand, Thuckalay, Kanyakumari District'
  },
  {
    city: 'Nagercoil',
    name: 'Jerush Dental & Facial Aesthetics Centre',
    phone: '+91 94431 70000',
    timing: 'Mon - Sat: 9:30 AM - 8:00 PM',
    address: 'Court Road, WCC Junction, Nagercoil'
  },
  {
    city: 'Tirunelveli',
    name: 'Jerush Dentofacial Regional Clinic',
    phone: '+91 94891 60000',
    timing: 'Mon - Sat: 10:00 AM - 7:30 PM',
    address: 'South Bypass Road, Vannarpettai, Tirunelveli'
  },
  {
    city: 'Trichy',
    name: 'Jerush Dental & Maxillofacial Centre',
    phone: '+91 94431 70000',
    timing: 'Mon - Sat: 9:30 AM - 7:00 PM',
    address: 'Thillai Nagar Main Road, Tiruchirappalli'
  }
];

// Section 6: Frequently Asked Questions (PDF Page 4)
const FAQS = [
  {
    q: '1. Is oral cancer screening painful?',
    a: 'A routine visual examination is generally painless. Some areas may be gently touched or examined, which can cause mild discomfort if the tissues are already sore.'
  },
  {
    q: '2. Can screening confirm whether I have oral cancer?',
    a: 'No. Screening identifies areas that may need further investigation. A biopsy and histopathological examination are often required to establish a diagnosis when cancer is suspected.'
  },
  {
    q: '3. How often should I have oral cancer screening?',
    a: 'There is no single screening interval suitable for everyone. Your clinician can advise on the need for examination and follow-up based on your symptoms, risk factors and previous findings.'
  },
  {
    q: '4. Can oral cancer occur without tobacco use?',
    a: 'Yes. Tobacco is an important risk factor, but oral cancer can also occur in people who do not use tobacco. Persistent or unexplained changes should still be evaluated.'
  },
  {
    q: '5. Does every white or red patch indicate cancer?',
    a: 'No. Many oral patches have non-cancerous causes. However, persistent or unexplained patches should be examined because appearance alone cannot reliably establish the diagnosis.'
  },
  {
    q: '6. When should I seek an oral examination?',
    a: 'Arrange an appointment for an unexplained mouth lump, persistent red or white patch, or ulcer that has not healed within three weeks. Seek prompt evaluation sooner if symptoms are worsening or accompanied by difficulty swallowing or a neck lump.'
  },
  {
    q: '7. What happens if the clinician finds a suspicious area?',
    a: 'You may be referred for further examination and a biopsy if indicated. The next step depends on the appearance, location and clinical findings.'
  }
];

export default function OralCancerScreeningPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    NAVIGATION_TABS.map(t => t.id),
    138
  );

  const handleBookClick = () => {
    const el = document.getElementById('consultation-form');
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
    <div className="w-full bg-white font-body text-slate-800 antialiased selection:bg-brandSky/20 selection:text-brandBlue">
      {/* ─── Breadcrumb Hero ─── */}
      <PageBreadcrumbHero
        title="Oral Cancer Screening"
        breadcrumbs={[
          { label: 'Dental Care', path: '/dental-care' },
          { label: 'Community Dentistry', path: '/dental-care/community-dentistry' },
          { label: 'Oral Cancer Screening', active: true }
        ]}
      />

      {/* ─── Page Hero Banner (Exact Content from PDF Page 1) ─── */}
      <section className="relative pt-10 sm:pt-14 pb-14 sm:pb-20 bg-gradient-to-b from-sky-50/60 via-white to-slate-50 border-b border-slate-200/70 overflow-hidden">
        {/* Soft Ambient Radial Lights */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brandSky/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-brandBlue/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-5"
            >
              {/* Category Subtitle */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandBlue/10 border border-brandBlue/20 text-brandBlue text-xs font-headline font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-brandSky" />
                <span>Community Dentistry</span>
              </div>

              {/* Title Enforcing 1.40 Line-Height & Two-Color Convention */}
              <h1
                className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-[1.4]"
                style={{ lineHeight: 1.4 }}
              >
                Oral Cancer{' '}
                <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                  Screening
                </span>
              </h1>

              {/* Exact Paragraphs from PDF Page 1 */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                Oral cancer screening is a clinical examination that looks for unusual changes in the mouth, lips and surrounding oral tissues that may require further investigation. It can help identify suspicious areas early, allowing patients to receive appropriate diagnostic evaluation without unnecessary delay.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                Screening is particularly important for people who use tobacco, chew betel nut or areca nut, or have other relevant risk factors. However, oral cancer can also occur in people without these risk factors, so unexplained changes inside the mouth should never be ignored.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                At Jerush Dentofacial & Cosmetic Laser Centre, oral cancer screening can support awareness, early recognition of suspicious changes and referral for further investigation when needed.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={handleBookClick}
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue text-white font-headline font-bold text-xs uppercase tracking-wider shadow-lg shadow-brandSky/25 hover:shadow-xl hover:shadow-brandSky/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Screening Consultation</span>
                </button>

                <a
                  href="tel:+919489160000"
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-headline font-bold text-xs uppercase tracking-wider shadow-xs hover:border-slate-400 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-brandBlue" />
                  <span>Call +91 94891 60000</span>
                </a>
              </div>
            </motion.div>

            {/* Right Hero Image Column (Exact Image from PDF Page 1 - Aspect Square Ratio matching Pediatric Dental Care) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              {/* Ambient Radiant Glow Blur */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-brandSky/20 via-brandBlue/15 to-transparent rounded-3xl blur-2xl -z-10" />

              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-2xl p-2.5 sm:p-3 group">
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square">
                  <img
                    src="/images/medical-services/dental-care/community-dentistry/oral-cancer-screening/cancer-screening.webp"
                    alt="Dentist examining the tongue and oral tissues during an oral cancer screening - Jerush Dentofacial"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── Top Second Section: Consultation Appointment Form ─── */}
      <section id="consultation-form" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/80 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TreatmentAppointmentForm
            treatmentName="Oral Cancer Screening"
            treatmentCategory="dental"
            title="Book an Oral"
            highlightWord="Examination"
            subtitle="Book an oral examination if you have persistent changes inside your mouth or would like to discuss your oral health risk factors."
            features={[
              {
                icon: ShieldCheck,
                title: 'Comprehensive Mucosal Scan',
                desc: 'Careful visual inspection of the tongue, gums, cheeks, floor of the mouth, and palate.'
              },
              {
                icon: CheckCircle2,
                title: 'Early Recognition',
                desc: 'Early identification of suspicious areas allowing prompt diagnostic evaluation.'
              },
              {
                icon: ArrowRight,
                title: 'Prompt Specialist Referral',
                desc: 'Referral for specialist evaluation, biopsy, or further appropriate investigation when needed.'
              },
              {
                icon: MapPin,
                title: '4 Regional Centres',
                desc: 'Accessible hospital care across Thuckalay, Nagercoil, Tirunelveli, and Trichy.'
              }
            ]}
          />
        </div>
      </section>

      {/* ─── Signature Counter & Key Stats Bar ─── */}
      <section className="bg-gradient-to-r from-[#0F172A] via-[#2852A3] to-[#0F172A] py-10 sm:py-12 px-4 sm:px-6 text-white shadow-inner relative overflow-hidden">
        {/* Subtle geometric light pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {KEY_STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-1.5"
              >
                <div className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-brandSky text-xs sm:text-sm font-bold uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sticky Sub-Navigation Bar ─── */}
      <TreatmentSectionNav
        tabs={NAVIGATION_TABS}
        activeSection={activeSection}
        onTabClick={scrollToSection}
      />

      {/* ─── Section 1: What Does an Oral Cancer Screening Check? (PDF Pages 1 & 2) ─── */}
      <section id="what-we-check" className="py-16 sm:py-20 bg-white scroll-mt-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              What Does an Oral Cancer{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Screening Check?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              During the examination, the clinician looks for changes in the oral tissues that may need closer attention.
            </p>
          </div>

          {/* 4 Cards with Exact Content & Exact Images from PDF Pages 1 & 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TISSUE_CHECKS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Clean Frame Image Container - Zero Text Inside Image */}
                <div className="relative aspect-[4/3] w-full bg-slate-50 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Text Content */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 space-y-2.5">
                  <h3 className="font-headline font-bold text-xl text-slate-900 group-hover:text-brandBlue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Section 2: Who Should Consider Oral Cancer Screening? (PDF Page 2) ─── */}
      <section id="who-should-consider" className="py-16 sm:py-20 bg-slate-50 scroll-mt-24 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2
                  className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
                  style={{ lineHeight: 1.4 }}
                >
                  Who Should Consider{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Oral Cancer Screening?
                  </span>
                </h2>
                <p className="text-slate-700 text-sm sm:text-base mt-3 leading-relaxed">
                  An oral examination may be especially important for people who:
                </p>
              </div>

              {/* Exact 6 Bullets from PDF Page 2 */}
              <ul className="space-y-3.5">
                {RISK_INDICATIONS.map((point, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="flex items-start gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-brandSky shrink-0 mt-2" />
                    <span className="text-slate-700 text-sm font-medium leading-relaxed">
                      {point}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Exact Callout Paragraph Below Image from PDF Page 2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  People without recognised risk factors can also develop oral cancer. Screening and examination should therefore be guided by symptoms, clinical findings and individual risk rather than assuming that only high-risk individuals need attention.
                </p>
              </div>
            </div>

            {/* Right Image Column (Exact Image from PDF Page 2) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl p-2.5 sm:p-3 group">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                  <img
                    src="/images/medical-services/dental-care/community-dentistry/oral-cancer-screening/who-should-consider.webp"
                    alt="Who should consider oral cancer screening"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── Section 3: What Happens During the Screening? (PDF Pages 2 & 3) ─── */}
      <section id="clinical-process" className="py-16 sm:py-20 bg-white scroll-mt-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              What Happens During the{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Screening?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              An oral cancer screening is generally a visual and physical examination. It does not, by itself, confirm or exclude cancer.
            </p>
          </div>

          {/* Stepper Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {SCREENING_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-headline font-bold transition-all cursor-pointer flex items-center gap-2 ${activeStep === idx
                  ? 'bg-brandBlue text-white shadow-md shadow-brandBlue/20 scale-[1.02]'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${activeStep === idx ? 'bg-white/20 text-white' : 'bg-slate-300 text-slate-700'}`}>
                  {step.step}
                </span>
                <span>{step.title}</span>
              </button>
            ))}
          </div>

          {/* Active Step Display Card with Exact Content & Images from PDF Pages 2 & 3 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Step Description */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-brandBlue uppercase tracking-wider bg-brandBlue/10 px-3 py-1 rounded-md">
                    <span>Step {SCREENING_STEPS[activeStep].step} of 05</span>
                  </div>

                  <h3 className="font-headline font-black text-2xl sm:text-3xl text-slate-900">
                    {SCREENING_STEPS[activeStep].step}. {SCREENING_STEPS[activeStep].title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {SCREENING_STEPS[activeStep].description}
                  </p>

                  {/* Step Navigation Controls */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                      disabled={activeStep === 0}
                      className="px-4 py-2 rounded-xl text-xs font-headline font-bold border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                    >
                      Previous Step
                    </button>
                    <button
                      onClick={() => setActiveStep(prev => Math.min(SCREENING_STEPS.length - 1, prev + 1))}
                      disabled={activeStep === SCREENING_STEPS.length - 1}
                      className="px-4 py-2 rounded-xl text-xs font-headline font-bold bg-brandBlue text-white hover:bg-brandBlue/90 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Step Image - Zero Content Inside Image */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-md">
                    <img
                      src={SCREENING_STEPS[activeStep].img}
                      alt={SCREENING_STEPS[activeStep].alt}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ─── Section 4: Screening, Diagnosis and Prevention (PDF Page 3) ─── */}
      <section id="screening-diagnosis-prevention" className="py-16 sm:py-20 bg-slate-50 scroll-mt-24 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Screening, Diagnosis and{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Prevention
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              These are related but different parts of oral cancer care.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
            
            {/* Visual Clean Frame Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg p-2.5 sm:p-3 group">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                  <img
                    src="/images/medical-services/dental-care/community-dentistry/oral-cancer-screening/screening-diagnosis.webp"
                    alt="Screening, diagnosis and prevention clinical examination - Jerush Dentofacial"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Exact Table from PDF Page 3 */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="grid grid-cols-12 bg-slate-100 p-4 font-headline font-bold text-xs uppercase tracking-wider text-slate-700 border-b border-slate-200">
                  <div className="col-span-5">Stage</div>
                  <div className="col-span-7">Purpose</div>
                </div>

                <div className="divide-y divide-slate-100">
                  {CARE_TABLE.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-slate-50/70 transition-colors">
                      <div className="col-span-5 font-headline font-bold text-sm text-slate-900 pr-3">
                        {row.stage}
                      </div>
                      <div className="col-span-7 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {row.purpose}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Exact Follow-Up Paragraphs from PDF Page 3 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-3.5 max-w-4xl mx-auto">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              A normal screening result does not guarantee that cancer is absent or will never develop. If symptoms persist or change after a screening, arrange another clinical review.
            </p>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Reducing risk is also important. Avoid tobacco and areca nut products, limit alcohol consumption and seek professional advice about any persistent oral changes.
            </p>
          </div>

        </div>
      </section>

      {/* ─── Section 5: Regional Centres of Excellence ─── */}
      <section id="regional-centres" className="py-16 sm:py-20 bg-white scroll-mt-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-headline font-bold text-brandSky tracking-widest uppercase bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
              Centres of Excellence
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight mt-3 leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Accessible Care Across{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                4 Regional Centres
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
              World-class screening, biopsy coordination, and maxillofacial specialist consultations available across South Tamil Nadu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REGIONAL_CENTRES.map((centre, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-brandSky/60 hover:shadow-lg transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brandBlue uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-brandSky" />
                    <span>{centre.city}</span>
                  </div>
                  <h4 className="font-headline font-bold text-sm text-slate-900">
                    {centre.name}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {centre.address}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-brandSky" />
                    <span>{centre.timing}</span>
                  </div>
                  <a
                    href={`tel:${centre.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-1.5 text-xs font-headline font-bold text-brandBlue hover:text-brandSky transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{centre.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Section 6: Frequently Asked Questions (Exact 7 FAQs from PDF Page 4) ─── */}
      <section id="faqs" className="py-16 sm:py-20 bg-slate-50 scroll-mt-24 border-b border-slate-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-headline font-bold text-sm sm:text-base text-slate-900 hover:text-brandBlue transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-brandSky shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                          {faq.a}
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

      {/* ─── Bottom CTA Banner (Dr. A. Bladbin & Exact Content from PDF Page 5) ─── */}
      <TreatmentCtaBanner
        badgeText="CHIEF SURGEON & SENIOR DENTAL DIRECTOR"
        titlePrefix="Make Oral Health Awareness a"
        highlightWord="Priority"
        titleSuffix="at Jerush"
        subtitle="Recognising suspicious oral changes and arranging timely evaluation can help prevent delays in diagnosis. At Jerush Dentofacial & Cosmetic Laser Centre, oral cancer screening supports awareness and helps guide patients towards appropriate further care when needed. Book an oral examination if you have persistent changes inside your mouth or would like to discuss your oral health risk factors."
        primaryBtnText="Book Screening Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/dr-bladbin-portrait.webp"
        doctorName="DR. A. BLADBIN"
        doctorRole="Founder & Chief Medical Director"
        doctorAlt="DR. A. BLADBIN - Founder & Chief Medical Director at Jerush Dentofacial"
      />
    </div>
  );
}
