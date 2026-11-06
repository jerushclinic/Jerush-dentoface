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
  { value: '15,000+', label: 'Periodontal Surgeries Completed' },
  { value: '18+ Years', label: 'Advanced Periodontal Excellence' },
  { value: 'Micro-Incision', label: 'Conservative & Suture-Guided Care' },
  { value: '4 Regional Centres', label: 'Centres of Excellence in TN & UAE' }
];

// Sticky Sub-Navigation Tabs
const NAVIGATION_TABS = [
  { id: 'what-is-it', label: 'What It Is' },
  { id: 'when-recommended', label: 'When Recommended' },
  { id: 'clinical-procedure', label: 'How It Is Done' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'recovery-aftercare', label: 'Aftercare' },
  { id: 'before-after', label: 'Before & After' },
  { id: 'regional-centres', label: 'Our Locations' },
  { id: 'faqs', label: 'FAQs' }
];

// Section 2: When Might Flap Surgery Be Recommended? (Exact 5 Indications from PDF Page 2)
const RECOMMENDATION_SIGNS = [
  {
    title: 'Deep gum pockets',
    desc: 'Spaces between the teeth and gums where bacteria accumulate.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/deep-gum-pockets.webp',
    alt: 'Deep gum pockets where bacteria accumulate beneath the gum line'
  },
  {
    title: 'Persistent gum inflammation',
    desc: 'Swelling or bleeding that continues despite appropriate cleaning.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/persistent-gum-inflammation.webp',
    alt: 'Persistent gum inflammation with swelling or bleeding around teeth'
  },
  {
    title: 'Supporting bone loss',
    desc: 'Damage to the bone surrounding the teeth due to periodontal disease.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/supporting-bone-loss.webp',
    alt: 'Supporting alveolar bone loss surrounding teeth due to periodontal disease'
  },
  {
    title: 'Persistent deposits below the gum line',
    desc: 'Areas that are difficult to access with routine cleaning.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/persistent-deposits.webp',
    alt: 'Persistent calculus and bacterial deposits situated deep below the gum line'
  },
  {
    title: 'Advanced periodontal disease',
    desc: 'Cases where direct access is needed for effective treatment.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/advanced-periodontal-disease.webp',
    alt: 'Advanced periodontal disease requiring direct surgical access'
  }
];

// Section 3: How Is Flap Surgery Performed? (Exact 4 Steps from PDF Page 3)
const SURGICAL_STEPS = [
  {
    step: '01',
    title: 'Gum assessment and preparation',
    description: 'The dentist evaluates gum pockets, bone support and oral hygiene. Local anaesthesia is used to keep the procedure comfortable.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/gum-assessment.webp',
    alt: 'Comprehensive periodontal examination and local anaesthesia preparation'
  },
  {
    step: '02',
    title: 'Accessing the affected area',
    description: 'A small incision allows the gum tissue to be lifted carefully, exposing the root surfaces and supporting tissues beneath it.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/accessing-the-affected-area.webp',
    alt: 'Conservative incision gently lifting gum tissue to access root surfaces'
  },
  {
    step: '03',
    title: 'Deep cleaning and treatment',
    description: 'Plaque, tartar and diseased deposits are removed from the exposed root surfaces. Additional treatment may be performed if the bone or other supporting tissues require it.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/deep-cleaning-and-treatment.webp',
    alt: 'Meticulous debridement and ultrasonic root smoothing of exposed teeth'
  },
  {
    step: '04',
    title: 'Repositioning the gums',
    description: 'The gum tissue is placed back into position and secured with sutures. Follow-up visits help the dentist monitor healing and remove stitches when appropriate.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/repositioning-the-gums.webp',
    alt: 'Gum tissue repositioned cleanly against teeth and secured with delicate sutures'
  }
];

// Section 4: Benefits of Flap Surgery (Exact 5 Benefits from PDF Pages 3 & 4)
const BENEFITS_LIST = [
  {
    title: 'Better access for deep cleaning',
    desc: 'Helps remove deposits from root surfaces beneath the gums.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/better-access-for-deep-cleaning.webp',
    alt: 'Better clinical visibility and direct access for thorough root debridement'
  },
  {
    title: 'Improved periodontal health',
    desc: 'Can help reduce inflammation and periodontal pocket depth.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/improved-periodontal-health.webp',
    alt: 'Noticeable reduction in pocket depth and firmer, healthier periodontal tissue'
  },
  {
    title: 'Support for natural teeth',
    desc: 'Helps manage disease that threatens the supporting tissues of the teeth.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/support-for-natural-teeth.webp',
    alt: 'Preserving natural tooth stability and protecting surrounding jawbone'
  },
  {
    title: 'Treatment of selected bone defects',
    desc: 'Additional procedures may be possible when indicated by the bone condition.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/treatment-of-selected-bone-defects.webp',
    alt: 'Targeted regenerative procedures for selected alveolar bone defects'
  },
  {
    title: 'Easier long-term maintenance',
    desc: 'In suitable cases, treatment can make certain areas more manageable during ongoing periodontal care.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/easier-long-term-maintenance.webp',
    alt: 'Reduced pocket depth allowing easier daily brushing and interdental hygiene'
  }
];

// Section 5: Recovery and Aftercare (Exact 6 Recommendations from PDF Pages 4 & 5)
const AFTERCARE_ITEMS = [
  {
    id: '01',
    text: "Follow your dentist's instructions for medication and oral hygiene.",
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/follow-your-dentist.webp',
    alt: 'Taking prescribed medications and adhering strictly to oral care advice'
  },
  {
    id: '02',
    text: 'Eat soft foods initially and avoid chewing directly on the treated area.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/soft-foods-smart-choices.webp',
    alt: 'Nutritious soft foods and avoiding chewing directly on the surgical site'
  },
  {
    id: '03',
    text: 'Avoid smoking or tobacco products during healing.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/avoid-smoking-and-tobacco.webp',
    alt: 'Avoiding tobacco and smoking to support vascular micro-healing'
  },
  {
    id: '04',
    text: 'Do not disturb the surgical site or sutures.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/do-not-disturb.webp',
    alt: 'Keeping the surgical site undisturbed for optimal suture stability'
  },
  {
    id: '05',
    text: 'Use any prescribed mouth rinse only as directed.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/prescribed-mouth-rinse.webp',
    alt: 'Using prescribed antibacterial mouth rinse gently without vigorous swishing'
  },
  {
    id: '06',
    text: 'Attend follow-up appointments to monitor healing and periodontal health.',
    img: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/attend-follow-up-appointments.webp',
    alt: 'Attending scheduled periodontal review appointments for suture assessment'
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
    q: '1. Is flap surgery necessary for gum disease?',
    a: 'No. Many patients can manage gum disease with non-surgical periodontal treatment and good home care. Surgery may be recommended when deeper areas need additional treatment.'
  },
  {
    q: '2. Is flap surgery painful?',
    a: 'Local anaesthesia is used during the procedure. Some tenderness or swelling may occur afterwards, and your dentist can advise you on suitable pain relief.'
  },
  {
    q: '3. How long does flap surgery take?',
    a: 'The duration depends on the number of teeth and the extent of the affected area. Your dentist can provide an estimate after examining your gums.'
  },
  {
    q: '4. How long does it take for gums to heal?',
    a: "Initial healing usually takes days to weeks, while complete tissue healing and assessment of the treatment result may take longer. Follow your dentist's recovery instructions."
  },
  {
    q: '5. Will flap surgery stop gum disease permanently?',
    a: 'It can help control periodontal disease, but it does not eliminate the need for ongoing care. Daily cleaning and regular professional maintenance remain important.'
  },
  {
    q: '6. Can flap surgery save loose teeth?',
    a: "It may help manage the disease affecting a tooth's supporting tissues, but the outcome depends on how much bone support remains and other clinical factors. Severely compromised teeth may have a limited prognosis."
  },
  {
    q: '7. Will I need stitches after surgery?',
    a: 'Sutures are commonly used to reposition the gum tissue. Depending on the type, they may dissolve on their own or need to be removed at a follow-up appointment.'
  }
];

export default function FlapSurgeryPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  // ScrollSpy for Sub-Navigation Tabs
  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
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
    document.title = 'Flap Surgery for Gum Disease | Periodontal Care at Jerush';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Learn how periodontal flap surgery helps treat deep gum pockets and manage advanced gum disease. Explore the procedure, recovery and aftercare at Jerush.';

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'Flap surgery, Periodontal flap surgery, gum surgery, advanced gum disease treatment, deep gum pocket treatment, periodontal care';

    // Inject FAQ Schema
    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.id = 'faq-schema-flap-surgery';
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
      const existingScript = document.getElementById('faq-schema-flap-surgery');
      if (existingScript) existingScript.remove();
    };
  }, []);

  return (
    <div className="w-full font-body text-left relative min-h-screen text-slate-800 bg-white">
      {/* ─── Breadcrumb Hero ─── */}
      <PageBreadcrumbHero
        title="Flap Surgery"
        breadcrumbs={[
          { label: 'Dental Care', path: '/dental-care' },
          { label: 'Periodontal Care', path: '/dental-care/periodontal-gum-care' },
          { label: 'Flap Surgery', active: true }
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
                  Flap Surgery:{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Advanced Gum Treatment to Help Protect Your Teeth
                  </span>
                </h1>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
                  When gum disease progresses, plaque and tartar can collect deep beneath the gum line, damaging the tissues and bone that support your teeth. In these situations, routine cleaning alone may not be enough to manage the problem.
                </p>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-3">
                  Flap surgery is a periodontal procedure in which the dentist or periodontist gently lifts back a section of gum tissue to access the deeper areas around the teeth. This allows thorough cleaning of the tooth roots and, when needed, treatment of damaged supporting tissues before the gums are repositioned.
                </p>

                <div className="mt-4 p-4.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-sm">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    The goal is to help control periodontal disease, make affected areas easier to clean and preserve the natural teeth where possible.
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
                  <span>Direct Deep Pocket Access</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Regenerative Bone Support</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-brandBlue shrink-0" />
                  <span>Periodontist-Supervised Care</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Graphic - Clean Frame, Aspect-Square Ratio */}
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
                    src="/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/advanced-gum-treatment.webp"
                    alt="Periodontal flap surgery to access and clean deep gum pockets around teeth"
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
        treatmentName="Flap Surgery"
        title="Book a Periodontal Flap Surgery Consultation"
        highlightWord="At Jerush"
        subtitle="Consult with experienced periodontal surgical specialists at Jerush Dentofacial & Cosmetic Laser Centre across our Tamil Nadu and UAE centres."
        features={[
          {
            icon: ShieldCheck,
            title: 'Direct Root Debridement',
            desc: 'Gentle, visual removal of hardened subgingival calculus and bacterial biofilms.'
          },
          {
            icon: Activity,
            title: 'Pocket Depth Reduction',
            desc: 'Effective clinical reduction of deep pockets to protect supporting alveolar bone.'
          },
          {
            icon: Sparkles,
            title: 'Regenerative Support',
            desc: 'Targeted bone recontouring or regenerative biomaterials when clinically indicated.'
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
        onTabClick={scrollToSection}
      />

      {/* ─── Section 1: What Is Periodontal Flap Surgery? (Exact Content from PDF Page 1) ─── */}
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
                <span>Periodontal Clinical Overview</span>
              </div>
              <h2
                style={{ lineHeight: 1.4 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-headline tracking-tight text-slate-900 leading-[1.4]"
              >
                What Is{' '}
                <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                  Periodontal Flap Surgery?
                </span>
              </h2>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                Flap surgery is a type of gum surgery used to treat selected cases of moderate to advanced periodontal disease. After the gum tissue is carefully lifted, the dentist can see and access areas that may be difficult to clean with non-surgical treatment alone.
              </p>

              {/* Exact Bullets from PDF Page 1 */}
              <div className="space-y-3 pt-2">
                <p className="text-slate-800 text-sm sm:text-base font-semibold">
                  Depending on the condition of the gums and bone, treatment may involve:
                </p>
                <div className="space-y-2.5">
                  {[
                    'Removing plaque and hardened tartar from deep periodontal pockets.',
                    'Cleaning contaminated root surfaces.',
                    'Addressing certain irregularities in the supporting bone, when indicated.',
                    'Repositioning and securing the gum tissue to support healing.'
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80"
                    >
                      <div className="w-5 h-5 rounded-full bg-brandSky/20 text-brandBlue flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Exact Closing Note from PDF Page 1 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-4.5 rounded-2xl bg-sky-50/60 border border-sky-100"
              >
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Flap surgery is not necessary for everyone with gum disease. A periodontal examination helps determine whether deeper cleaning, surgery or another treatment is appropriate.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Image Column - Clean, Unobstructed Frame */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xl p-2.5 sm:p-3 group">
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-[16/10] sm:aspect-[16/9]">
                  <img
                    src="/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/periodontal-flap-surgery.webp"
                    alt="Clinical representation of periodontal flap surgery procedure"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Visual Model: Normal Tooth vs Periodontitis */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-md p-2 group cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden bg-slate-50 aspect-[16/9]">
                  <img
                    src="/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/normal-tooth-vs-periodontitis.webp"
                    alt="Comparison of normal healthy tooth versus periodontitis with bone loss"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── Section 2: When Might Flap Surgery Be Recommended? (Exact Content from PDF Page 2) ─── */}
      <section id="when-recommended" className="py-16 sm:py-20 bg-slate-50/70 scroll-mt-24 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <span className="text-xs font-headline font-bold text-brandSky tracking-widest uppercase bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
              Clinical Indications
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight mt-3 leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              When Might Flap Surgery{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Be Recommended?
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
              A dentist may consider flap surgery when gum disease has affected the deeper tissues supporting the teeth, particularly if non-surgical periodontal treatment has not adequately controlled the condition.
            </p>
          </motion.div>

          {/* 5 Clinical Cards with Exact Images & Headings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {RECOMMENDATION_SIGNS.map((item, idx) => (
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
                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-brandSky mt-1.5 shrink-0" />
                      <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900 leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed pl-5">
                      {item.desc}
                    </p>
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
              A clinical examination, periodontal pocket measurements and dental X-rays help the dentist assess the extent of the disease and plan treatment.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ─── Section 3: How Is Flap Surgery Performed? (Exact Content from PDF Pages 2 & 3) ─── */}
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
              Surgical Pathway
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight mt-3 leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              How Is Flap Surgery{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Performed?
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
              The procedure is planned according to your gum condition and the areas that need treatment.
            </p>
          </motion.div>

          {/* 4 Step-by-Step Procedure Cards with Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {SURGICAL_STEPS.map((stepItem, idx) => (
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

      {/* ─── Section 4: Benefits of Flap Surgery (Exact Content from PDF Pages 3 & 4) ─── */}
      <section id="benefits" className="py-16 sm:py-20 bg-slate-50/70 scroll-mt-24 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <span className="text-xs font-headline font-bold text-brandSky tracking-widest uppercase bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
              Treatment Outcomes
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight mt-3 leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Benefits of{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Flap Surgery
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
              When recommended for the right patient, flap surgery can provide better access to areas affected by periodontal disease. Potential benefits include:
            </p>
          </motion.div>

          {/* 5 Benefits Cards with Clean Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {BENEFITS_LIST.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brandSky/60 transition-all flex flex-col group cursor-pointer"
              >
                {/* Clean Image Card */}
                <div className="p-3 bg-white">
                  <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-100">
                    <img
                      src={benefit.img}
                      alt={benefit.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900 leading-snug">
                        {benefit.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed pl-7">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Exact Concluding Note from PDF Page 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm max-w-3xl mx-auto text-center space-y-2"
          >
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              The results depend on the severity of gum disease, the amount of existing bone loss, healing and daily oral hygiene. Flap surgery cannot guarantee that lost bone or gum tissue will grow back.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ─── Section 5: Recovery and Aftercare (Exact Content from PDF Pages 4 & 5) ─── */}
      <section id="recovery-aftercare" className="py-16 sm:py-20 bg-white scroll-mt-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <span className="text-xs font-headline font-bold text-brandSky tracking-widest uppercase bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
              Healing Guidelines
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight mt-3 leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Recovery and{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Aftercare
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
              Healing takes time, and the dentist will provide instructions tailored to the surgical area. Mild swelling, tenderness or bleeding can occur during the early recovery period.
            </p>
          </motion.div>

          {/* 6 Aftercare Cards with Clean Images */}
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

          {/* Exact Follow-up Note from PDF Page 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-sky-50/50 p-6 sm:p-8 rounded-3xl border border-sky-100 shadow-sm max-w-3xl mx-auto text-center space-y-3"
          >
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Contact your dentist if you experience uncontrolled bleeding, increasing swelling, worsening pain, fever or other concerning symptoms.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-sky-100 pt-3">
              Even after successful surgery, gum disease can return without consistent home care and professional periodontal maintenance.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ─── Section 6: Before and After: Treating Deep Gum Pockets (Exact Content from PDF Page 5) ─── */}
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
                Treating Deep Gum Pockets
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
              Visualizing the clinical impact of surgical access, root debridement, and periodontal pocket healing.
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
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-100 mb-4">
                <img
                  src="/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/before-treatment.webp"
                  alt="Clinical presentation before flap surgery showing deep periodontal pockets and subgingival deposits"
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
                  Deep periodontal pockets and deposits can affect the tissues supporting the teeth.
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
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-100 mb-4">
                <img
                  src="/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/after-treatment.webp"
                  alt="Clinical presentation after flap surgery showing healed, firm gum tissue adapted to teeth"
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
                  The treated gum tissue heals around the teeth, with continued monitoring needed.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Exact Disclaimer from PDF Page 5 */}
          <div className="mt-8 text-center max-w-3xl mx-auto">
            <p className="text-slate-500 text-xs sm:text-sm italic">
              These images are illustrative, not actual patient results. For the Jerush website, use genuine clinical photographs or X-rays only with appropriate patient consent, and avoid promising identical results for every patient.
            </p>
          </div>

        </div>
      </section>

      {/* ─── Section 7: Regional Centres of Excellence (Genuine Locations) ─── */}
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
              Specialist periodontal assessments, pocket management, and microsurgical gum care available across Tamil Nadu &amp; UAE.
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
              Essential questions and clinical guidance about periodontal flap surgery.
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
        badgeText="PERIODONTIST & GUM SURGERY SPECIALIST"
        titlePrefix="Take a Step Towards"
        highlightWord="Healthier Gums"
        titleSuffix="at Jerush"
        subtitle="Persistent gum bleeding, deep gum pockets and changes in tooth stability should not be ignored. A periodontal assessment can help identify the extent of gum disease and determine whether non-surgical treatment or flap surgery is appropriate. At Jerush Dentofacial & Cosmetic Laser Centre, your treatment options should be based on your gum health, supporting bone and long-term oral care needs. Concerned about advanced gum disease? Book a dental consultation to discuss suitable periodontal treatment options."
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
