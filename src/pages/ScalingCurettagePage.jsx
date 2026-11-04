import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Phone, CheckCircle2, Clock, MapPin,
  ChevronDown, ArrowRight, ShieldCheck, Sparkles,
  Activity, AlertCircle, HeartPulse, Check
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

// Signature Counter & Key Stats Bar Data
const KEY_STATS = [
  { value: '25,000+', label: 'Periodontal Cleanings Completed' },
  { value: '18+ Years', label: 'Gum Health & Periodontal Care' },
  { value: '100% Gentle', label: 'Ultrasonic & Painless Local Care' },
  { value: '4 Regional Centres', label: 'Centres of Excellence in TN & UAE' }
];

// Sticky Sub-Navigation Tabs
const NAVIGATION_TABS = [
  { id: 'what-is-it', label: 'What It Is' },
  { id: 'when-needed', label: 'When You Need It' },
  { id: 'clinical-procedure', label: 'How It Is Done' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'aftercare', label: 'Aftercare' },
  { id: 'before-after', label: 'Before & After' },
  { id: 'regional-centres', label: 'Our Locations' },
  { id: 'faqs', label: 'FAQs' }
];

// Section 2: When Might You Need This Treatment? (Exact 6 Items from PDF Page 2)
const SYMPTOMS_INDICATIONS = [
  {
    title: 'Bleeding gums while brushing or flossing',
    img: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/bleeding-gums.webp',
    alt: 'Bleeding gums while brushing or flossing indicating early gum inflammation'
  },
  {
    title: 'Redness or swelling around the teeth',
    img: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/redness-or-swelling.webp',
    alt: 'Redness or swelling around the teeth requiring periodontal evaluation'
  },
  {
    title: 'Persistent bad breath despite regular oral hygiene',
    img: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/persistent-bad-breath.webp',
    alt: 'Persistent bad breath despite regular daily oral hygiene'
  },
  {
    title: 'Tartar deposits that cannot be removed with a toothbrush',
    img: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/tartar-deposits.webp',
    alt: 'Hardened tartar and calculus deposits on tooth surfaces'
  },
  {
    title: 'Gum pockets where plaque and bacteria collect below the gum line',
    img: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/gum-pockets.webp',
    alt: 'Deep gum pockets where plaque and bacteria accumulate beneath the gum line'
  },
  {
    title: 'Early signs of gum disease that require professional cleaning and monitoring',
    img: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/early-signs.webp',
    alt: 'Early signs of gum disease requiring professional cleaning and ongoing monitoring'
  }
];

// Section 3: How Is Scaling and Curettage Performed? (Exact 4 Steps from PDF Page 3)
const TREATMENT_STEPS = [
  {
    step: '01',
    title: 'Gum examination',
    description: 'The dentist checks your gums, measures periodontal pockets when needed and identifies areas with plaque, tartar or inflammation.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/gum-examination.webp',
    alt: 'Dentist checking gums and measuring periodontal pockets during examination'
  },
  {
    step: '02',
    title: 'Scaling and deposit removal',
    description: 'Specialised dental instruments remove hardened deposits from the tooth surfaces. If required, deeper cleaning is performed around the roots beneath the gum line.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/scaling-and-deposit-removal.webp',
    alt: 'Specialised instruments removing hardened deposits and tartar from tooth and root surfaces'
  },
  {
    step: '03',
    title: 'Additional gum treatment, if indicated',
    description: 'In selected cases, the dentist may perform curettage or another periodontal procedure to address diseased tissue. This is not necessary for every patient.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/additional-gum-treatment.webp',
    alt: 'Periodontal curettage or specific procedure to address diseased pocket tissue'
  },
  {
    step: '04',
    title: 'Healing and review',
    description: 'You receive guidance on brushing, interdental cleaning and follow-up care. The dentist reviews gum health and recommends further treatment if needed.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/healing-and-review.webp',
    alt: 'Guidance on interdental cleaning and scheduled follow-up review for gum health'
  }
];

// Section 4: Benefits of Professional Gum Treatment (Exact Bullets from PDF Page 4)
const BENEFITS_LIST = [
  'Reduce plaque and tartar buildup.',
  'Improve gum inflammation and bleeding associated with deposits.',
  'Reduce bacterial deposits beneath the gum line.',
  'Support better oral hygiene and gum health.',
  'Help manage gum disease and reduce the risk of further progression when combined with ongoing care.'
];

// Section 5: Aftercare: Keeping Your Gums Healthy (Exact 6 Points from PDF Pages 4 & 5)
const AFTERCARE_ITEMS = [
  {
    id: '01',
    text: 'Brush twice daily using a soft-bristled toothbrush.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/brush-twice.webp',
    alt: 'Brushing twice daily with a soft-bristled toothbrush'
  },
  {
    id: '02',
    text: 'Clean between your teeth daily with suitable interdental aids.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/clean-between-your-teeth.webp',
    alt: 'Cleaning between teeth daily with interdental brushes or floss'
  },
  {
    id: '03',
    text: 'Avoid smoking, which can negatively affect gum health and healing.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/avoid-smoking.webp',
    alt: 'Avoiding smoking to support gum healing and long-term oral health'
  },
  {
    id: '04',
    text: 'Follow any prescribed medication or mouth-rinse instructions.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/follow-any-prescribed.webp',
    alt: 'Following prescribed medication and antimicrobial mouth-rinse instructions'
  },
  {
    id: '05',
    text: 'Attend follow-up appointments to monitor gum pockets and inflammation.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/attend-follow-up-appointments.webp',
    alt: 'Attending regular follow-up appointments to assess gum pockets'
  },
  {
    id: '06',
    text: 'Contact your dentist if you develop severe or increasing pain, swelling or persistent bleeding.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/contact-your-dentist.webp',
    alt: 'Contacting your dentist promptly if severe pain, swelling or bleeding develops'
  }
];

// Section 7: Regional Centres (Exact genuine details from Home Page Footer)
const REGIONAL_CENTRES = [
  {
    city: 'Thuckalay (HQ)',
    name: 'Jerush Dentofacial & Cosmetic Laser Centre',
    phones: ['+91 94891 60055', '+91 94891 60000', '+91 94891 50011'],
    timing: 'Mon - Sat: 9:00 AM - 8:30 PM',
    address: 'Near Bus Stand, Brammapuram South, Thuckalay, Tamil Nadu - 629175'
  },
  {
    city: 'Chennai (Adyar)',
    name: 'Jerush Dentofacial & Cosmetic Laser Centre',
    phones: ['+91 97510 10107'],
    timing: 'Mon - Sat: 9:30 AM - 8:00 PM',
    address: 'Chandhini Apartment, 29, Mahatma Gandhi Rd, Near SBI, Shastri Nagar, Adyar, Chennai - 600020'
  },
  {
    city: 'Trichy (Thenur)',
    name: 'Jerush Dentofacial & Cosmetic Laser Centre',
    phones: ['+91 94891 60033', '+91 94891 60011'],
    timing: 'Mon - Sat: 9:30 AM - 7:30 PM',
    address: 'No. 72, Second Floor, Pattabiraman Pillai Road, Thenur, Trichy - 620017'
  },
  {
    city: 'Fujairah (UAE)',
    name: 'Jerush Dental and Aesthetic Laser Clinic LLC',
    phones: ['+971 50 725 3105'],
    timing: 'Sat - Thu: 9:00 AM - 9:00 PM',
    address: 'Flat 101 & 102, First Floor, Fahad Building, Near Talal Market, Fujairah - UAE'
  }
];

// Section 8: Frequently Asked Questions (Exact 7 FAQs from PDF Pages 5 & 6)
const FAQS = [
  {
    q: '1. What is the difference between scaling and curettage?',
    a: 'Scaling removes plaque and tartar from tooth surfaces. Curettage traditionally involves removing diseased or inflamed tissue from a gum pocket. Curettage is not required for every scaling procedure.'
  },
  {
    q: '2. Is scaling and curettage painful?',
    a: 'You may experience mild discomfort or gum sensitivity. Local anaesthesia can be used for deeper cleaning or when needed, depending on the procedure and your comfort.'
  },
  {
    q: '3. Will my gums bleed after treatment?',
    a: 'Some bleeding or tenderness can occur, particularly when the gums are inflamed. If bleeding is heavy, persistent or worsening, contact your dentist.'
  },
  {
    q: '4. How many sessions are needed?',
    a: 'This depends on the amount of tartar, the number of affected areas and the severity of gum disease. Some patients need one cleaning appointment, while others may require treatment over multiple visits.'
  },
  {
    q: '5. Can scaling and curettage cure gum disease permanently?',
    a: 'Treatment can help control gum disease, but it does not guarantee that the condition will never return. Daily oral hygiene and regular periodontal maintenance are essential.'
  },
  {
    q: '6. Will my teeth become loose after scaling?',
    a: 'Scaling does not normally cause healthy teeth to become loose. However, advanced gum disease may already have damaged the supporting tissues, and existing mobility may become more noticeable after deposits are removed.'
  },
  {
    q: '7. How often should I get my teeth cleaned?',
    a: 'The interval depends on your oral health and gum condition. Your dentist may recommend routine cleaning or more frequent periodontal maintenance if you have a history of gum disease.'
  }
];

export default function ScalingCurettagePage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  // ScrollSpy for Sub-Navigation Tabs
  const activeSection = useTreatmentScrollSpy(
    NAVIGATION_TABS.map(tab => tab.id),
    140
  );

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleTabClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -110;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

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

  useEffect(() => {
    // Inject dynamic SEO Meta Tags from PDF Page 6
    document.title = 'Scaling & Curettage Treatment for Gum Disease | Jerush';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Learn how scaling and curettage help manage plaque, tartar and gum inflammation. Explore periodontal treatment and gum-care options at Jerush.';

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'Scaling and curettage, Periodontal scaling, gum disease treatment, deep dental cleaning, tartar removal, periodontal care';

    // Inject FAQ Schema
    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.id = 'faq-schema-scaling-curettage';
    faqSchemaScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQS.map(faq => ({
        '@type': 'Question',
        'name': faq.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.a
        }
      }))
    });
    document.head.appendChild(faqSchemaScript);

    return () => {
      const existingScript = document.getElementById('faq-schema-scaling-curettage');
      if (existingScript) existingScript.remove();
    };
  }, []);

  return (
    <div className="w-full font-body text-left relative min-h-screen text-slate-800 bg-white">
      {/* ─── Breadcrumb Hero ─── */}
      <PageBreadcrumbHero
        title="Scaling & Curettage"
        breadcrumbs={[
          { label: 'Dental Care', path: '/dental-care' },
          { label: 'Periodontal Care', path: '/dental-care/periodontal-gum-care' },
          { label: 'Scaling & Curettage', active: true }
        ]}
      />

      {/* ─── Hero Section (Exact Content from PDF Page 1, 1.40 Line-Height Convention) ─── */}
      <section className="w-full bg-gradient-to-b from-white via-sky-50/25 to-slate-50/60 py-12 lg:py-18 relative overflow-hidden border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Clinic Branding, Headline & Exact Text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-5"
            >
              <div>
                <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline mb-2.5">
                  Jerush Dentofacial &amp; Cosmetic Laser Centre
                </span>
                <h1
                  style={{ lineHeight: 1.4 }}
                  className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-extrabold font-headline tracking-tight leading-[1.4] text-slate-900"
                >
                  Scaling &amp; Curettage:{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Healthier Gums Start with Professional Cleaning
                  </span>
                </h1>
                
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
                  Bleeding gums, persistent bad breath and redness around the teeth can be signs of gum inflammation. When plaque and hardened tartar build up around or below the gum line, routine brushing alone may not be enough to keep the area clean.
                </p>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-3">
                  Scaling and curettage refers to periodontal procedures used to remove deposits from the teeth and, when indicated, treat diseased tissue in the gum pockets. The exact treatment depends on the severity of gum disease and the findings during a dental examination.
                </p>

                <div className="mt-4 p-4.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-sm">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    At <strong className="text-slate-900 font-semibold">Jerush Dentofacial &amp; Cosmetic Laser Centre</strong>, a gum assessment helps determine whether routine scaling, deeper periodontal cleaning or additional gum treatment is appropriate.
                  </p>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleBookClick}
                  className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue text-white font-headline font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-brandSky/25 hover:shadow-brandSky/40 hover:scale-[1.02] active:scale-[0.98] transition-all group cursor-pointer border-none"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Book Consultation</span>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </button>

                <a
                  href="tel:+919489160000"
                  className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-full border border-slate-300 hover:border-brandSky bg-white hover:bg-slate-50 text-slate-800 font-headline font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all group"
                >
                  <Phone className="w-4 h-4 text-brandBlue group-hover:rotate-12 transition-transform" />
                  <span>Call +91 94891 60000</span>
                </a>
              </div>

              {/* Clinical Trust Checkpoints */}
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Ultrasonic Tartar Removal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Deep Periodontal Assessment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Periodontist-Supervised Care</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Graphic - Clean Frame, Aspect-Square Ratio matching Pediatric reference */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-brandSky/20 via-brandBlue/15 to-transparent rounded-3xl blur-2xl -z-10" />

              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-2xl p-2.5 sm:p-3 group">
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square">
                  <img
                    src="/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/healthier-gums-professional-cleaning.webp"
                    alt="Professional scaling and curettage for periodontal and gum care at Jerush"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── Top Appointment Consultation Section ─── */}
      <TreatmentAppointmentForm
        treatmentName="Scaling & Curettage"
        title="Book a Periodontal Gum Care Consultation"
        highlightWord="At Jerush"
        subtitle="Take the first step toward firmer, healthier gums and fresh breath. Consult our qualified periodontal care clinicians across South Tamil Nadu."
        features={[
          {
            icon: ShieldCheck,
            title: 'Ultrasonic & Precision Scaling',
            desc: 'Gentle, vibration-controlled removal of hardened plaque and tartar deposits.'
          },
          {
            icon: Activity,
            title: 'Periodontal Pocket Evaluation',
            desc: 'Comprehensive evaluation of gum attachment levels and periodontal pocket depths.'
          },
          {
            icon: Sparkles,
            title: 'Personalised Gum Maintenance',
            desc: 'Tailored interdental hygiene guidance and long-term preventive gum care.'
          }
        ]}
      />

      {/* ─── Signature Counter & Key Stats Bar (Animated Staggered Counter Strip) ─── */}
      <section className="bg-gradient-to-r from-[#0F172A] via-[#2852A3] to-[#0F172A] py-10 sm:py-12 px-4 sm:px-6 text-white shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brandSky/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-700/50">
            {KEY_STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={idx > 1 ? 'pt-6 md:pt-0' : idx % 2 === 1 ? 'pt-0' : ''}
              >
                <div className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-brandSky text-xs sm:text-sm font-bold uppercase tracking-wider mt-1">
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
        onTabClick={handleTabClick}
      />

      {/* ─── Section 1: What Are Scaling and Curettage? (Exact Content from PDF Page 1) ─── */}
      <section id="what-is-it" className="py-16 sm:py-20 bg-white scroll-mt-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-brandBlue text-xs font-bold uppercase tracking-wider font-headline">
                <ShieldCheck className="w-3.5 h-3.5 text-brandSky" />
                <span>Periodontal Clinical Definitions</span>
              </div>
              <h2
                style={{ lineHeight: 1.4 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline tracking-tight text-slate-900 leading-[1.4]"
              >
                What Are{' '}
                <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                  Scaling and Curettage?
                </span>
              </h2>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                Scaling removes plaque and hardened deposits, known as calculus or tartar, from tooth surfaces. When gum disease has developed below the gum line, the dentist may recommend deeper cleaning to remove deposits from the root surfaces.
              </p>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                Curettage traditionally refers to removing diseased or inflamed tissue from the gum pocket. It is a more specific procedure and is not automatically required whenever scaling is performed. Its use depends on the clinical findings and the treatment approach selected by the dentist.
              </p>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90">
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                  These procedures aim to control the bacterial deposits associated with gum disease and help create healthier conditions around the teeth.
                </p>
              </div>

              {/* Informative Comparison Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2"
                >
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brandBlue uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-brandSky" />
                    <span>Scaling (Teeth &amp; Roots)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Removes plaque, bacterial films, and hardened calculus above and below the gum margin.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2"
                >
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brandBlue uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-brandSky" />
                    <span>Curettage (Selected Cases)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Addresses inflamed pocket lining in specific cases based on clinical evaluation and findings.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Image Column - Clean, Unobstructed Frame */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xl p-2.5 sm:p-3 group">
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10] sm:aspect-[16/9]">
                  <img
                    src="/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/scaling-and-curettage.webp"
                    alt="Clinical representation of scaling and curettage periodontal procedures"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── Section 2: When Might You Need This Treatment? (Exact Content from PDF Page 2) ─── */}
      <section id="when-needed" className="py-16 sm:py-20 bg-slate-50/70 scroll-mt-24 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <span className="text-xs font-headline font-bold text-brandSky tracking-widest uppercase bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
              Signs &amp; Symptoms
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight mt-3 leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              When Might You Need{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                This Treatment?
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
              Your dentist may recommend periodontal cleaning if you notice symptoms such as:
            </p>
          </motion.div>

          {/* 6 Clinical Cards with Exact Images & Headings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SYMPTOMS_INDICATIONS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brandSky/60 transition-all flex flex-col group cursor-pointer"
              >
                {/* 100% Clean Image Card */}
                <div className="p-3 bg-white">
                  <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-100">
                    <img
                      src={item.img}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-brandSky mt-1.5 shrink-0" />
                    <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Exact Follow-up Note from PDF Page 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm max-w-3xl mx-auto text-center space-y-2"
          >
            <div className="w-10 h-10 rounded-full bg-sky-50 text-brandBlue flex items-center justify-center mx-auto mb-2">
              <AlertCircle className="w-5 h-5 text-brandSky" />
            </div>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Gum disease can sometimes progress without obvious pain. If you notice bleeding or changes in your gums, a dental assessment can help identify the cause before the condition becomes more advanced.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ─── Section 3: How Is Scaling and Curettage Performed? (Exact Content from PDF Page 3) ─── */}
      <section id="clinical-procedure" className="py-16 sm:py-20 bg-white scroll-mt-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <span className="text-xs font-headline font-bold text-brandSky tracking-widest uppercase bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
              Clinical Protocol
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight mt-3 leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              How Is Scaling and Curettage{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Performed?
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
              The treatment is planned according to the condition of your gums and the amount of deposits present.
            </p>
          </motion.div>

          {/* 4 Step-by-Step Procedure Cards with Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {TREATMENT_STEPS.map((stepItem, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-slate-50/60 rounded-3xl p-5 sm:p-7 border border-slate-200/90 hover:border-brandSky/60 hover:bg-white hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Clean Image Card */}
                  <div className="rounded-2xl overflow-hidden aspect-square bg-white border border-slate-200/80">
                    <img
                      src={stepItem.img}
                      alt={stepItem.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Header with Step Number */}
                  <div className="flex items-center gap-3 pt-2">
                    <span className="w-8 h-8 rounded-full bg-brandBlue text-white font-headline font-bold text-xs flex items-center justify-center shrink-0">
                      {stepItem.step}
                    </span>
                    <h3 className="font-headline font-bold text-lg sm:text-xl text-slate-900">
                      {stepItem.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed pl-11">
                    {stepItem.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Section 4: Benefits of Professional Gum Treatment (Exact Content from PDF Page 4) ─── */}
      <section id="benefits" className="py-16 sm:py-20 bg-slate-50/70 scroll-mt-24 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div>
                <span className="text-xs font-headline font-bold text-brandSky tracking-widest uppercase bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
                  Treatment Value
                </span>
                <h2
                  style={{ lineHeight: 1.4 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline tracking-tight text-slate-900 mt-3 leading-[1.4]"
                >
                  Benefits of{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Professional Gum Treatment
                  </span>
                </h2>
                <p className="text-slate-600 text-base sm:text-lg mt-3">
                  Appropriate periodontal cleaning can help:
                </p>
              </div>

              {/* Exact Bullets from PDF Page 4 */}
              <div className="space-y-3.5">
                {BENEFITS_LIST.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-brandSky/40 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Concluding Paragraph from PDF Page 4 */}
              <div className="p-4.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Results depend on the severity of gum disease, home-care habits and regular periodontal maintenance. Advanced gum disease may require additional treatment beyond scaling and curettage.
                </p>
              </div>
            </motion.div>

            {/* Right Graphic Column - Clean, Unobstructed Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xl p-2.5 sm:p-3 group">
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square">
                  <img
                    src="/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/benefits-of-professional-gum.webp"
                    alt="Benefits of professional gum cleaning and periodontal therapy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── Section 5: Aftercare: Keeping Your Gums Healthy (Exact Content from PDF Pages 4 & 5) ─── */}
      <section id="aftercare" className="py-16 sm:py-20 bg-white scroll-mt-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <span className="text-xs font-headline font-bold text-brandSky tracking-widest uppercase bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
              Post-Cleaning Protocol
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight mt-3 leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Aftercare:{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Keeping Your Gums Healthy
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
              Your gums may feel tender or bleed slightly after deeper cleaning, particularly if they were already inflamed. Follow the instructions provided by your dentist.
            </p>
          </motion.div>

          {/* 6 Aftercare Cards with Exact Images & Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {AFTERCARE_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brandSky/60 transition-all flex flex-col group cursor-pointer"
              >
                {/* Clean Image Card */}
                <div className="p-3 bg-white">
                  <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-100">
                    <img
                      src={item.img}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-brandSky/15 text-brandBlue font-headline font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {item.id}
                    </span>
                    <p className="font-headline font-semibold text-sm sm:text-base text-slate-800 leading-snug">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing Paragraph from PDF Page 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-sky-50/50 p-6 sm:p-8 rounded-3xl border border-sky-100 shadow-sm max-w-3xl mx-auto text-center space-y-2"
          >
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Professional cleaning removes existing deposits, but plaque can build up again. Consistent daily cleaning and periodic dental reviews are important for maintaining the results.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ─── Section 6: Before and After: Improving Gum Health (Exact Content from PDF Page 5) ─── */}
      <section id="before-after" className="py-16 sm:py-20 bg-slate-50/70 scroll-mt-24 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <span className="text-xs font-headline font-bold text-brandSky tracking-widest uppercase bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
              Clinical Progression
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight mt-3 leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Before and After:{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Improving Gum Health
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
              Visualizing the impact of thorough scaling and periodontal healing.
            </p>
          </motion.div>

          {/* Comparison Cards: Before vs After */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before Treatment Card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md p-4 sm:p-5 flex flex-col group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100 mb-4">
                <img
                  src="/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/before-treatment.webp"
                  alt="Clinical presentation before scaling treatment showing plaque and tartar deposits"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold font-headline uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
                  Before Treatment
                </span>
                <h3 className="font-headline font-bold text-lg text-slate-900">
                  Before treatment
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Plaque, tartar and inflamed gum tissue may contribute to bleeding and discomfort.
                </p>
              </div>
            </motion.div>

            {/* After Treatment Card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md p-4 sm:p-5 flex flex-col group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100 mb-4">
                <img
                  src="/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/after-treatment.webp"
                  alt="Clinical presentation after treatment and healing showing healthy pink gums"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold font-headline uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  After Treatment &amp; Healing
                </span>
                <h3 className="font-headline font-bold text-lg text-slate-900">
                  After treatment and healing
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  With appropriate treatment and home care, gum inflammation may improve.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Exact Disclaimer from PDF Page 5 */}
          <div className="mt-8 text-center max-w-3xl mx-auto">
            <p className="text-slate-500 text-xs sm:text-sm italic">
              These are illustrative images, not actual patient results. Use genuine, consented clinical photographs if showing real treatment outcomes on the Jerush website.
            </p>
          </div>

        </div>
      </section>

      {/* ─── Section 7: Regional Centres of Excellence ─── */}
      <section id="regional-centres" className="py-16 sm:py-20 bg-white scroll-mt-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
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
              Advanced periodontal assessments, ultrasonic cleaning, and specialist gum care available across Tamil Nadu &amp; UAE.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REGIONAL_CENTRES.map((centre, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-brandSky/60 hover:shadow-lg hover:bg-white transition-all space-y-3 flex flex-col justify-between"
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
                  <div className="flex flex-col gap-1.5">
                    {centre.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                        className="inline-flex items-center gap-1.5 text-xs font-headline font-bold text-brandBlue hover:text-brandSky transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{phone}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Section 8: Frequently Asked Questions (Exact 7 FAQs from PDF Pages 5 & 6) ─── */}
      <section id="faqs" className="py-16 sm:py-20 bg-slate-50/70 scroll-mt-24 border-b border-slate-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-xs font-headline font-bold text-brandSky tracking-widest uppercase bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
              Clear Answers
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight mt-3 leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Essential questions and clinical guidance about scaling and curettage.
            </p>
          </motion.div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-headline font-bold text-slate-900 hover:text-brandBlue transition-colors focus:outline-none"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'bg-brandBlue text-white rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Bottom CTA Banner (Dr. I. Ajaishalu & Exact Content from PDF Page 6) ─── */}
      <TreatmentCtaBanner
        badgeText="PERIODONTIST & GUM CARE SPECIALIST"
        titlePrefix="Give Your Gums the"
        highlightWord="Care They Need"
        titleSuffix="at Jerush"
        subtitle="Healthy gums are an important part of maintaining your natural teeth. If you experience bleeding gums, persistent bad breath or visible tartar, a professional assessment can help you understand the cause and choose the right treatment. At Jerush Dentofacial & Cosmetic Laser Centre, periodontal care begins with evaluating your gum health and recommending treatment suited to your needs. Concerned about bleeding or swollen gums? Book a dental consultation to explore suitable gum-care options."
        primaryBtnText="Book Periodontal Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 94891 60000"
        secondaryBtnPhone="+919489160000"
        doctorImage="/images/doctors/dr-ajaishalu-periodontologist.webp"
        doctorName="DR. I. AJAISHALU"
        doctorRole="Periodontist & Gum Care Specialist"
        doctorAlt="Dr. I. Ajaishalu, BDS, MDS - Periodontist & Gum Care Specialist at Jerush Dentofacial"
      />
    </div>
  );
}
