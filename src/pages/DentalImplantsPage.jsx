import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Star, ChevronDown, Calendar, Phone, MapPin,
  CheckCircle2, ArrowRight, Clock, Users, Award, Heart
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';

const STATS = [
  { value: '188K+', label: 'Happy Patients' },
  { value: '52K+', label: 'Implants Placed' },
  { value: '98%', label: 'Success Rate' },
  { value: '4+', label: 'Clinics' },
];

const TYPES = [
  {
    title: 'Single Tooth Implant',
    desc: 'Ideal for replacing one missing tooth without affecting neighboring teeth. A titanium post is anchored in the jawbone with a custom crown on top.',
    img: '/images/blog/dental-implants-blog/implant-types.webp',
    color: 'from-blue-50 to-sky-50 border-sky-200',
    badge: 'Most Common'
  },
  {
    title: 'Multiple Implants',
    desc: 'Used for replacing several adjacent missing teeth. Multiple posts support individual crowns or an implant-supported bridge.',
    img: '/images/blog/dental-implants-blog/materials-used.webp',
    color: 'from-emerald-50 to-teal-50 border-emerald-200',
    badge: 'Restorative'
  },
  {
    title: 'All-on-4 / All-on-6',
    desc: 'Complete full-mouth restoration using 4 or 6 strategically placed implants to support a full arch of teeth — a permanent alternative to dentures.',
    img: '/images/blog/dental-implants-blog/wmremove-transformed.webp',
    color: 'from-violet-50 to-purple-50 border-violet-200',
    badge: 'Full Arch'
  },
];

const PROCEDURE_STEPS = [
  {
    step: '01',
    title: 'Digital Consultation & 3D Planning',
    desc: 'X-rays and CBCT 3D scans are taken for accurate implant placement planning. Our specialists review bone density, gum health, and adjacent teeth.',
    img: '/images/blog/dental-implants-blog/treatment-plan.webp',
    highlight: 'CBCT-Guided Precision'
  },
  {
    step: '02',
    title: 'Implant Placement Surgery',
    desc: 'The titanium post is gently placed into the jawbone under local anesthesia. Modern techniques make this virtually painless with minimal recovery time.',
    img: '/images/blog/dental-implants-blog/implant-surgery.webp',
    highlight: 'Minimally Invasive'
  },
  {
    step: '03',
    title: 'Osseointegration (Healing Phase)',
    desc: 'Over 3–6 months, the jawbone naturally fuses with the titanium post. During this period, a temporary crown may be placed for aesthetics and function.',
    img: '/images/blog/dental-implants-blog/healing-time.webp',
    highlight: '3–6 Month Healing'
  },
  {
    step: '04',
    title: 'Crown Placement & Restoration',
    desc: 'A custom zirconia or ceramic crown is precisely attached to the abutment, completing your new tooth — designed to match your natural teeth perfectly.',
    img: '/images/blog/dental-implants-blog/crown-placeement.webp',
    highlight: 'Zirconia Crown'
  },
  {
    step: '05',
    title: 'Follow-up & Long-term Care',
    desc: 'Regular follow-up visits monitor healing, bite alignment, and long-term integration. Our team supports you at every stage of your implant journey.',
    img: '/images/blog/dental-implants-blog/followup-care.webp',
    highlight: 'Lifetime Support'
  },
];

const BENEFITS = [
  'Restore natural smiles and full chewing function',
  'Prevents jawbone deterioration after tooth loss',
  'Lasts decades — often a lifetime with proper care',
  'Improves speech, confidence, and facial structure',
  'Zero slipping or discomfort — fixed like a natural tooth',
  'No damage to adjacent healthy teeth',
  'Easy maintenance — brush and floss like normal',
  'Safe biocompatible titanium materials',
];

const CONDITIONS = [
  {
    title: 'Missing One or More Teeth',
    desc: 'Whether due to decay, trauma, or extraction, dental implants restore the missing gap permanently.',
    icon: Heart,
    img: '/images/blog/dental-implants-blog/missing-teeth.webp'
  },
  {
    title: 'Bone Loss After Extraction',
    desc: 'Implants stimulate jawbone growth, preventing the facial collapse that occurs with bone loss.',
    icon: ShieldCheck,
    img: '/images/blog/dental-implants-blog/post-dental-implant-treatment.webp'
  },
  {
    title: 'Struggling With Loose Dentures',
    desc: 'Implant-supported dentures eliminate the embarrassment of loose, slipping removable appliances.',
    icon: Award,
    img: '/images/blog/dental-implants-blog/unmanaged-dentures.webp'
  },
  {
    title: 'Looking for Affordable Restoration',
    desc: 'Transparent, competitive dental implant pricing in Chennai with flexible payment options available.',
    icon: Star,
    img: '/images/blog/dental-implants-blog/price-location.webp'
  },
];

const WHY_CHOOSE = [
  {
    icon: Users,
    title: 'Experienced Implantologists',
    desc: 'Our specialist surgeons bring decades of combined expertise in CBCT-guided implant surgery.'
  },
  {
    icon: ShieldCheck,
    title: 'Affordable Transparent Pricing',
    desc: 'Cost-effective treatment with complete pricing transparency and flexible EMI options.'
  },
  {
    icon: Award,
    title: 'Advanced 3D Technology',
    desc: 'From digital impressions to guided robotic surgery — we use the latest implant techniques.'
  },
  {
    icon: Star,
    title: 'Premium Crown Restorations',
    desc: 'Top-tier zirconia and ceramic crown restorations for a completely natural-looking finish.'
  },
  {
    icon: Clock,
    title: '24/7 Emergency Support',
    desc: 'Round-the-clock dental support across all branches in Chennai, Trichy, and Kanyakumari.'
  },
  {
    icon: Heart,
    title: 'Patient-First Approach',
    desc: 'Compassionate care from consultation to follow-up — your comfort is our top priority.'
  },
];

const TESTIMONIALS = [
  {
    name: 'Prathab G',
    location: 'Thuckalay',
    rating: 5,
    text: 'I recently visited Jerush Hospital for dental treatment which included a root canal and zirconia crown fitting, and I\'m truly happy with the entire experience. I give Jerush Hospital a full 10/10 rating and highly recommend it.',
  },
  {
    name: 'Anisha Beullah',
    location: 'Chennai',
    rating: 5,
    text: 'One of the best dental clinics in the town. Having all advanced forms of treatment available, the result is perfect and worth every single penny! Highly recommend everyone to visit the clinic at least once.',
  },
  {
    name: 'Sathya Priya',
    location: 'Trichy',
    rating: 5,
    text: 'I have been undertaking dental treatment here for 2 years. The service is good. Treatment results are satisfying and the staff tries to give their service at the best level. The hospital environment is very clean with a good ambience.',
  },
  {
    name: 'Gulamrasool Noohu',
    location: 'Australia',
    rating: 5,
    text: 'I visited Jerush from Australia after my wife recommended this practice. The dental treatment was very affordable comparatively. They managed to finish the procedure in time as promised. I am very happy with the end result.',
  },
];

const FAQS = [
  {
    q: 'How painful are dental implants?',
    a: 'With modern anesthesia and advanced minimally invasive surgical techniques, dental implant placement is virtually painless during the procedure. There may be mild soreness or swelling for 2–3 days post-surgery, which is easily managed with prescribed medication.'
  },
  {
    q: 'Will dental implants last a lifetime?',
    a: 'Yes. With proper oral hygiene and regular dental check-ups, dental implants can last for decades — often a lifetime. The titanium post fuses permanently with your jawbone, while the crown may need replacement after 10–15 years depending on wear.'
  },
  {
    q: 'How many teeth can be replaced with implants?',
    a: 'A single implant can replace one tooth. Multiple implants can support individual crowns or bridges for several missing teeth. For full-mouth restoration, All-on-4 or All-on-6 implant solutions use just 4 to 6 posts to support a complete arch of teeth.'
  },
  {
    q: 'Are dental implants safe?',
    a: 'Dental implants are one of the safest and most researched dental procedures with a global success rate of over 98%. The titanium used is biocompatible and accepted by the human body naturally through a process called osseointegration.'
  },
  {
    q: 'What is the cost of dental implants in Chennai?',
    a: 'The cost of dental implants in Chennai at Jerush Dentofacial varies based on the number of implants, crown type (zirconia, ceramic), and any additional procedures needed (bone grafting, sinus lift). We provide completely transparent pricing with affordable EMI options. Contact us for a personalized consultation and cost estimate.'
  },
  {
    q: 'How long does the entire dental implant process take?',
    a: 'The complete treatment typically spans 3–6 months from implant placement to final crown fitting, allowing adequate time for osseointegration (bone fusion). In cases of good bone density, single-day or same-week implant solutions may be available.'
  },
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'types', label: 'Implant Types' },
  { id: 'procedure', label: 'Procedure' },
  { id: 'benefits', label: 'Benefits & Care' },
  { id: 'why-choose', label: 'Why Choose Us' },
  { id: 'story', label: 'Patient Stories' },
  { id: 'faqs', label: 'FAQs' }
];

export default function DentalImplantsPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-120px 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sectionIds = ['overview', 'types', 'procedure', 'benefits', 'why-choose', 'story', 'faqs'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 138; // 80px main sticky header + 58px sticky sub-nav
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBookClick = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-slate-50 font-body text-left relative min-h-screen">
      {/* SEO Meta via Helmet would go here in a real app */}

      {/* Page Hero */}
      <PageBreadcrumbHero
        title="Dental Implants in Chennai"
        breadcrumbs={[
          { label: 'Tooth Replacement & Implants', path: '/treatments' },
          { label: 'Dental Implants in Chennai', active: true }
        ]}
      />

      {/* ─── Intro Section ─── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <span className="inline-block text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3 py-1.5 rounded-full border border-brandSky/15">
              Advanced Dental Implantology
            </span>
            <h1 className="font-headline font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
              Permanent Tooth Replacement at{' '}
              <span className="text-gradient bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Jerush Dentofacial
              </span>
              {' '}Chennai
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Missing teeth can affect your smile, chewing ability, and overall dental health. At Jerush Dentofacial and Cosmetic Laser Center, Chennai, we provide advanced dental implants treatment that restores your confidence and gives you a permanent solution to tooth loss.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Whether you're looking for a single tooth replacement or full dental implants, our expert implantologists provide reliable, affordable, and long-lasting results using CBCT-guided precision technology.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleBookClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md hover:shadow-lg hover:brightness-105 transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book Free Consultation
              </button>
              <a
                href="tel:+919751010107"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-headline font-bold text-xs uppercase tracking-wider rounded-2xl shadow-sm hover:bg-slate-50 transition-all"
              >
                <Phone className="w-4 h-4 text-brandBlue" />
                Call Chennai Clinic
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
                src="/images/blog/dental-implants-blog/anatomy-of-healthy-teeth-and-tooth-dental-implant.webp"
                alt="Anatomy of dental implant - Jerush Chennai"
                className="w-full h-[380px] object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white border border-slate-100 shadow-lg rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Success Rate</p>
                <p className="font-headline font-black text-lg text-slate-900">98% Globally</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="bg-gradient-to-r from-brandBlue to-[#1b4393] py-10 px-6">
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
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sticky Tab Navigation (Oliva-Style Button Pills, Jerush Colors) */}
      <div className="jerush-sticky-subnav bg-slate-50/90 backdrop-blur-md border-y border-slate-200/50 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 text-xs font-headline font-bold uppercase tracking-wider">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-6 py-2.5 rounded-full border transition-all duration-300 whitespace-nowrap ${activeSection === tab.id
                  ? 'bg-brandSky border-brandSky text-white shadow-md shadow-brandSky/15 scale-105'
                  : 'bg-white border-brandSky/30 text-brandBlue hover:bg-brandSky/5 hover:border-brandSky/60'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── What Is a Dental Implant ─── */}
      <section id="overview" className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden border border-slate-100 shadow-md bg-white p-2"
          >
            <img
              src="/images/blog/dental-implants-blog/wmremove-transformed.webp"
              alt="What is a dental implant"
              className="w-full h-[340px] object-cover rounded-2xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900">
              What Is a Dental Implant?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              A dental implant is a small titanium post surgically placed into the jawbone that serves as an artificial tooth root. Once integrated with the bone through a natural process called <strong>osseointegration</strong>, a custom-made crown, bridge, or denture is attached on top — giving you natural-looking, fully functional teeth.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Unlike removable dentures, implants do not slip, cause discomfort, or require adhesives. They are considered one of the best and most permanent dental treatments in India.
            </p>
            <div className="bg-brandSky/5 border border-brandSky/20 rounded-2xl p-4">
              <p className="text-brandBlue font-semibold text-sm italic">
                💡 Dental implants not only replace missing teeth — they preserve your jawbone and facial structure, preventing the "sunken face" appearance that occurs with long-term tooth loss.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Types of Implants ─── */}
      <section id="types" className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3 py-1.5 rounded-full border border-brandSky/15">Our Solutions</span>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 mt-4">Types of Dental Implants We Offer</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">From single-tooth replacement to full-arch restoration — we have a solution for every need and budget.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TYPES.map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`rounded-3xl border p-6 space-y-4 bg-gradient-to-br ${type.color}`}
              >
                <div className="relative h-44 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <img src={type.img} alt={type.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-white/90 text-brandBlue text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    {type.badge}
                  </span>
                </div>
                <h3 className="font-headline font-extrabold text-lg text-slate-900">{type.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{type.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Materials ─── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-6">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3 py-1.5 rounded-full border border-brandSky/15">Materials</span>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900">
              Biocompatible Materials Used
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We use only premium, internationally certified implant materials that fuse naturally with your bone for the highest success rates.
            </p>
            <div className="space-y-4">
              <div className="bg-white border border-slate-100 rounded-2xl p-5 flex gap-4 items-start shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-slate-900">Titanium Implants</h4>
                  <p className="text-slate-500 text-sm mt-1">The industry gold standard — highly durable, biocompatible, and accepted by 98% of patients. Ideal for molars and back teeth requiring maximum load-bearing capacity.</p>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-5 flex gap-4 items-start shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-violet-500" />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-slate-900">Zirconia Implants</h4>
                  <p className="text-slate-500 text-sm mt-1">Premium metal-free ceramic implants offering superior aesthetics for visible front teeth. Perfect for patients with metal sensitivities or aesthetic requirements.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-md bg-white p-2">
            <img
              src="/images/blog/dental-implants-blog/materials-used.webp"
              alt="Dental implant materials - Titanium vs Zirconia"
              className="w-full h-[360px] object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* ─── Step-by-Step Procedure Timeline (Redesigned with Process Indicator Stepper) ─── */}
      <section id="procedure" className="bg-slate-950 text-white py-20 px-6 border-t border-slate-900 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/10 px-3 py-1.5 rounded-full border border-brandSky/20">Our Process</span>
            <h2 className="font-headline font-black text-2xl sm:text-3xl mt-4">
              Step-by-Step{' '}
              <span className="bg-gradient-to-r from-brandSky to-brandBlue bg-clip-text text-transparent">
                Dental Implant Procedure
              </span>
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">Understanding what to expect helps you prepare for a smooth, confident implant journey.</p>
          </div>

          {/* Stepper Wizard Bar */}
          <div className="relative mb-12 max-w-4xl mx-auto">
            {/* Connecting line background */}
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-800 -translate-y-1/2 rounded-full z-0 hidden sm:block">
              {/* Dynamic progress fill line */}
              <div
                className="h-full bg-gradient-to-r from-brandSky to-brandBlue transition-all duration-500 rounded-full"
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
                        ? 'bg-gradient-to-r from-brandSky to-brandBlue text-white border-slate-950 ring-4 ring-brandSky/30 scale-110 shadow-lg shadow-brandSky/20'
                        : isCompleted
                          ? 'bg-brandBlue text-white border-slate-900 hover:brightness-110 shadow-sm'
                          : 'bg-slate-900 text-slate-500 border-slate-800 hover:border-brandSky hover:text-slate-350 shadow-sm'
                        }`}
                    >
                      {step.step}
                    </div>
                    <span
                      className={`text-[9px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 hidden md:block max-w-[120px] text-center ${isSelected ? 'text-brandSky font-extrabold' : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                    >
                      {step.title.split(' & ')[0].split(' (')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stepper Details Card Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-12 items-stretch max-w-6xl mx-auto text-left">
            {/* Visual Panel Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/40 p-2 shadow-xl flex items-center"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStep}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  src={PROCEDURE_STEPS[activeStep].img}
                  alt={PROCEDURE_STEPS[activeStep].title}
                  className="w-full h-[280px] sm:h-[340px] object-cover rounded-2xl"
                />
              </AnimatePresence>
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
                  className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex-grow flex flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-headline font-black text-brandSky bg-brandSky/10 px-3.5 py-1 rounded-full border border-brandSky/20">
                        Step {PROCEDURE_STEPS[activeStep].step}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20">
                        {PROCEDURE_STEPS[activeStep].highlight}
                      </span>
                    </div>

                    <h3 className="font-headline font-black text-xl sm:text-2xl text-white leading-tight">
                      {PROCEDURE_STEPS[activeStep].title}
                    </h3>

                    <p className="text-slate-350 text-sm sm:text-base leading-relaxed">
                      {PROCEDURE_STEPS[activeStep].desc}
                    </p>
                  </div>

                  {/* Navigation controls */}
                  <div className="flex justify-between items-center border-t border-slate-800 pt-6">
                    <button
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep(prev => prev - 1)}
                      className={`px-5 py-2.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider transition-all border ${activeStep === 0
                        ? 'text-slate-600 border-slate-800 cursor-not-allowed bg-slate-900/20'
                        : 'text-slate-300 border-slate-700 bg-slate-800 hover:bg-slate-750'
                        }`}
                    >
                      ← Previous
                    </button>
                    <span className="text-xs font-semibold text-slate-500 font-headline uppercase tracking-wider">
                      {activeStep + 1} of {PROCEDURE_STEPS.length}
                    </span>
                    <button
                      disabled={activeStep === PROCEDURE_STEPS.length - 1}
                      onClick={() => setActiveStep(prev => prev + 1)}
                      className={`px-5 py-2.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider transition-all ${activeStep === PROCEDURE_STEPS.length - 1
                        ? 'text-slate-600 border border-slate-800 cursor-not-allowed bg-slate-900/20'
                        : 'bg-gradient-to-r from-brandSky to-brandBlue text-white hover:brightness-110 hover:shadow-lg hover:shadow-brandSky/15'
                        }`}
                    >
                      Next →
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section id="benefits" className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-6">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3 py-1.5 rounded-full border border-brandSky/15">Benefits</span>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900">
              Benefits of Dental Implants Go Beyond a Better Smile
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Dental implants offer comprehensive health, functional, and aesthetic advantages that go far beyond simply filling a gap in your teeth.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BENEFITS.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-xs font-semibold leading-snug">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-md bg-white p-2">
            <img
              src="/images/blog/dental-implants-blog/patient-checking-his-teeth-mirror.webp"
              alt="Patient happy with dental implants result"
              className="w-full h-[380px] object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* ─── Who Needs Implants ─── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3 py-1.5 rounded-full border border-brandSky/15">Conditions</span>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 mt-4">Who Can Benefit from Dental Implants?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONDITIONS.map((cond, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-40 overflow-hidden">
                  <img src={cond.img} alt={cond.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-headline font-bold text-slate-900 text-sm">{cond.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{cond.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Post-Implant Care ─── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-md bg-white p-2">
            <img
              src="/images/blog/dental-implants-blog/post-dental-implant-treatment.webp"
              alt="Post dental implant care tips"
              className="w-full h-[340px] object-cover rounded-2xl"
            />
          </div>
          <div className="space-y-6">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3 py-1.5 rounded-full border border-brandSky/15">Aftercare</span>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900">Post-Implant Care Tips</h2>
            <p className="text-slate-600 leading-relaxed">Following these simple care guidelines ensures your implants last a lifetime:</p>
            <ul className="space-y-3">
              {[
                'Maintain regular brushing (twice daily) and flossing habits',
                'Use a soft-bristle toothbrush around the implant site',
                'Visit your dentist every 6 months for professional check-ups',
                'Avoid smoking — it significantly reduces implant success rates',
                'Reduce alcohol consumption during the healing phase',
                'Follow a soft diet for the first few weeks post-surgery',
                'Attend all scheduled follow-up appointments at our clinic',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brandSky/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-brandSky" />
                  </div>
                  <span className="text-slate-600 text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Jerush ─── */}
      <section id="why-choose" className="bg-slate-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3 py-1.5 rounded-full border border-brandSky/15">Why Jerush</span>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 mt-4">
              Why Choose Jerush Dentofacial for Dental Implants in Chennai?
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-2xl mx-auto">
              We combine advanced technology, clinical expertise, and a patient-first philosophy to deliver premium implant outcomes that last a lifetime.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brandBlue/5 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brandBlue" />
                  </div>
                  <h3 className="font-headline font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="story" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3 py-1.5 rounded-full border border-brandSky/15">Patient Stories</span>
          <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 mt-4">What Our Patients Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4"
            >
              <div className="flex">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed italic">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brandBlue to-brandSky flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-headline font-bold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section id="faqs" className="bg-slate-50/50 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-gradient-to-r from-brandSky/10 to-brandBlue/10 px-3.5 py-1.5 rounded-full border border-brandSky/20">FAQ</span>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 mt-4">
              Frequently Asked Questions — <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">Dental Implants</span>
            </h2>
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
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                    isExpanded
                      ? 'bg-gradient-to-r from-white via-blue-50/50 to-sky-50/40 border border-brandSky/40 shadow-md ring-1 ring-brandSky/20'
                      : 'bg-gradient-to-r from-white via-slate-50/60 to-blue-50/20 border border-slate-200/70 hover:border-brandSky/40 hover:shadow-md hover:from-white hover:to-blue-50/40'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-headline font-bold text-slate-900 text-sm sm:text-base transition-colors group"
                  >
                    <span>{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isExpanded 
                        ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white rotate-180 shadow-sm' 
                        : 'bg-gradient-to-br from-brandBlue/10 to-brandSky/10 text-brandBlue group-hover:bg-brandBlue group-hover:text-white'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
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
        badgeText="Dental Implants Specialist"
        titlePrefix="Ready to Restore Your Smile —"
        highlightWord="Pain-Free?"
        titleSuffix=""
        subtitle="Book your free consultation today at Jerush Dentofacial — Chennai | Trichy | Kanyakumari | Dubai. Our expert implantologists will design a personalized treatment plan for your smile."
        primaryBtnText="Book Free Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 97510 10107"
        secondaryBtnPhone="+919751010107"
        doctorImage="/images/doctors/dr-bladbin-portrait.webp"
        doctorName="DR. A. BLADBIN"
        doctorRole="Implant Specialist"
        doctorAlt="DR. A. BLADBIN - Jerush Dentofacial"
      />
    </div>
  );
}
