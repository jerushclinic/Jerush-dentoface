import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Phone, CheckCircle2, Clock, MapPin,
  ChevronDown, ArrowRight, ShieldCheck, Sparkles,
  Activity, AlertCircle, Check, Shield, Info,
  Scissors, Heart, Sparkle, Award, FileText
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

// Signature Counter & Key Stats Bar Data
const KEY_STATS = [
  { value: '12,500+', label: 'Gum & Crown Lengthening Surgeries' },
  { value: '99.4%', label: 'Biological Width Retention Rate' },
  { value: 'Micro-Incision', label: 'Conservative & Suture-Guided Care' },
  { value: '4 Regional Centres', label: 'Centres of Excellence in TN & UAE' }
];

// Sticky Sub-Navigation Tabs
const NAVIGATION_TABS = [
  { id: 'appointment', label: 'Consultation' },
  { id: 'two-reasons', label: 'Indications' },
  { id: 'procedure', label: 'Procedure Steps' },
  { id: 'how-it-helps', label: 'How It Helps' },
  { id: 'recovery', label: 'Recovery Guide' },
  { id: 'before-after', label: 'Before & After' },
  { id: 'regional-centres', label: 'Our Centres' },
  { id: 'faqs', label: 'FAQs' }
];

// Section: Two Reasons Crown Lengthening May Be Recommended (PDF Page 1 & 2 - 1024x576 16:9 Images)
const TWO_REASONS = [
  {
    id: 'restorative',
    title: 'Restorative Crown Lengthening',
    subtitle: 'Exposing Sound Tooth Structure for Restoration',
    tag: 'Functional Tooth Salvage',
    desc: 'When decay, a fracture or an existing restoration extends close to the gum line, crown lengthening exposes more sound tooth structure so the dentist can plan a durable, well-fitting crown or filling.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/restorative-crown.webp',
    alt: 'Restorative crown lengthening exposing sound tooth structure',
    benefits: [
      'Establishes essential 2mm biological ferrule for permanent crown retention',
      'Moves restoration margins safely above the biological width of gums',
      'Eliminates chronic subgingival food impaction, decay, and bleeding'
    ]
  },
  {
    id: 'aesthetic',
    title: 'Aesthetic Crown Lengthening',
    subtitle: 'Harmonising Gummy Smiles & Uneven Gum Contours',
    tag: 'Smile Line Aesthetics',
    desc: 'When excess gum tissue makes the teeth appear short or creates an uneven smile line, reshaping the gum tissue establishes a more balanced, natural tooth-to-gum proportion. Bone contouring may be performed in selected cases based on underlying anatomy.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/aesthetic-crown-lengthening.webp',
    alt: 'Aesthetic crown lengthening for gummy smile correction',
    benefits: [
      'Exposes natural anatomical tooth length and symmetrical smile curves',
      'Corrects gummy smiles caused by altered passive tooth eruption',
      'Comprehensive clinical diagnosis accounting for lip mobility and bone anatomy'
    ]
  }
];

// Section: What Happens During the Procedure? (Exact 4 Steps from PDF Page 2 - 768x768 Square Images)
const PROCEDURE_STEPS = [
  {
    step: '01',
    title: 'Planning the New Gum Line',
    desc: 'The dentist examines the tooth, gums, and bite. Digital dental X-rays are taken to accurately assess root length, biological width, and surrounding bone architecture before starting.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/planning-the-new-gum-line.webp',
    alt: 'Dentist planning the new gum line with digital dental X-rays',
    highlight: 'Digital Diagnostics'
  },
  {
    step: '02',
    title: 'Reshaping the Gum Tissue',
    desc: 'Local anaesthesia is administered to ensure complete comfort. The periodontal clinician gently sculpts and repositions the excess gum tissue to expose more of the natural tooth crown.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/reshaping-the-gum-tissue.webp',
    alt: 'Gentle reshaping of the gum tissue under local anaesthesia',
    highlight: 'Painless Micro-Contouring'
  },
  {
    step: '03',
    title: 'Adjusting the Supporting Bone',
    desc: 'In selected cases where bone sits too close to the future crown margin, a tiny amount of bone is conservatively reshaped to preserve a healthy biological attachment between gum, bone, and tooth.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/adjusting-the-supporting-bone.webp',
    alt: 'Adjusting supporting alveolar bone to maintain biological width',
    highlight: 'Biological Width Preservation'
  },
  {
    step: '04',
    title: 'Healing & Restorative Planning',
    desc: 'The treated area is sutured and allowed to heal. If crown lengthening was performed for a crown or bridge, the dentist verifies tissue maturation before taking final precision impressions.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/healing-and-restorative-planning.webp',
    alt: 'Healing and restorative planning for final dental crown',
    highlight: 'Restorative Precision'
  }
];

// Section: How Can Crown Lengthening Help? (Exact 4 Benefits from PDF Page 2 & 3 - 768x768 Square Images)
const HOW_IT_HELPS = [
  {
    title: 'Expose Natural Tooth Structure',
    subtitle: 'Foundation for Fillings & Crowns',
    desc: 'Exposes more sound tooth structure above the gum line, providing adequate clinical surface area for strong adhesive bonding and durable crown retention.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/natural-tooth-structure.webp',
    alt: 'Exposing natural tooth structure for filling or crown',
    badge: 'Restorative Anchor',
    badgeColor: 'bg-sky-50 text-brandBlue border-sky-200'
  },
  {
    title: 'Improve Access to Damaged Areas',
    subtitle: 'Subgingival Decay & Fractures',
    desc: 'Allows direct visual and clinical access to deep cavities or fractures close to the gum line, ensuring thorough decay removal and clean impression margins.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/improve-access-to-damaged-areas.webp',
    alt: 'Improved access to damaged tooth areas extending close to the gum line',
    badge: 'Clinical Clearance',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    title: 'Create a Balanced Gum Line',
    subtitle: 'Symmetrical Smile Aesthetics',
    desc: 'Levels uneven gingival heights across the smile zone in suitable cosmetic cases, turning a gummy or asymmetrical display into an attractive, proportionate smile.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/balanced-gum-line.webp',
    alt: 'Balanced gum line creation for aesthetic harmony',
    badge: 'Aesthetic Harmony',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    title: 'Support Restorative Planning',
    subtitle: 'Long-Term Periodontal Health',
    desc: 'Provides the accessible tooth structure needed for restorative dentistry without impinging on the periodontal biological seal, preventing chronic gum inflammation.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/restorative-planning.webp',
    alt: 'Support restorative planning for long-term tooth preservation',
    badge: 'Tissue Longevity',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
  }
];

// Section: Recovery and the Final Result (Exact 5 Guidelines from PDF Page 3 & 4 - 768x768 Square Images)
const RECOVERY_GUIDELINES = [
  {
    title: 'Eat Soft Foods Initially',
    desc: 'Consume soft, cool foods during the first few days (yogurt, soups, smoothies, soft rice) and avoid hard, crunchy, or hot foods that might irritate the surgical area.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/eat-soft-foods.webp',
    alt: 'Eat soft foods during crown lengthening recovery'
  },
  {
    title: 'Follow Prescribed Medication',
    desc: 'Take prescribed analgesics and antimicrobial mouth rinses as directed to manage mild post-operative discomfort, control swelling, and keep the surgical site clean.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/follow-your-prescribed-medication.webp',
    alt: 'Follow prescribed medication and oral hygiene instructions'
  },
  {
    title: 'Avoid Disturbing the Area',
    desc: 'Do not probe, poke, or pull at any stitches or protective surgical dressing with fingers, tongue, or toothpicks. Brush other teeth normally while gently rinsing the operated area.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/avoid-disturbing.webp',
    alt: 'Avoid disturbing surgical stitches or dressing'
  },
  {
    title: 'Attend Follow-Up Appointments',
    desc: 'Visit our hospital clinic as scheduled so our periodontal team can examine the healing tissue, assess gum margin stability, and safely remove any remaining sutures.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/follow-up-appointments.webp',
    alt: 'Attend clinical follow-up appointments to monitor gum healing'
  },
  {
    title: "Wait for Your Dentist's Advice",
    desc: 'Allow the gum line adequate time to fully mature and stabilise (typically 4–8 weeks for posterior teeth, and up to 3 months in aesthetic front zones) before fabricating the final crown.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/dentist-advice-before-proceeding.webp',
    alt: 'Wait for dentist advice before proceeding with final crown fabrication'
  }
];

// 4 Regional Centres Data (British English Spelling Convention)
const REGIONAL_CENTRES = [
  {
    city: 'Thuckalay (HQ)',
    name: 'Jerush Dentofacial & Cosmetic Laser Centre',
    phones: ['+91 94891 60055', '+91 94891 60000', '+91 94891 50011'],
    timing: 'Mon - Sat: 9:00 AM - 8:30 PM',
    address: 'Near Bus Stand, Brammapuram South, Thuckalay, Tamil Nadu - 629175',
    badge: 'Flagship Hospital & Apex Centre'
  },
  {
    city: 'Chennai (Adyar)',
    name: 'Jerush Dentofacial & Cosmetic Laser Centre',
    phones: ['+91 97510 10107'],
    timing: 'Mon - Sat: 9:30 AM - 8:00 PM',
    address: 'Chandhini Apartment, 29, Mahatma Gandhi Rd, Near SBI, Shastri Nagar, Adyar, Chennai - 600020',
    badge: 'Cosmetic & Aesthetic Care'
  },
  {
    city: 'Trichy (Thenur)',
    name: 'Jerush Dentofacial & Cosmetic Laser Centre',
    phones: ['+91 94891 60033', '+91 94891 60011'],
    timing: 'Mon - Sat: 9:30 AM - 7:30 PM',
    address: 'No. 72, Second Floor, Pattabiraman Pillai Road, Thenur, Trichy - 620017',
    badge: 'Advanced Restorative Wing'
  },
  {
    city: 'Fujairah (UAE)',
    name: 'Jerush Dental and Aesthetic Laser Clinic LLC',
    phones: ['+971 50 725 3105'],
    timing: 'Mon - Sat: 10:00 AM - 8:00 PM',
    address: 'Flat 101 & 102, First Floor, Fahad Building, Near Talal Market, Fujairah - UAE',
    badge: 'International Aesthetic Centre'
  }
];

// Related Periodontal Treatments
const RELATED_TREATMENTS = [
  {
    title: 'Deep Scaling & Curettage',
    desc: 'Ultrasonic sub-gingival calculus removal and root surface debridement that eliminates deep bacterial pockets.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/scaling-curettage/healthier-gums-professional-cleaning.webp',
    alt: 'Deep scaling and curettage at Jerush',
    link: '/dental-care/periodontal-gum-care/scaling-and-curettage',
    badge: 'Non-Surgical Gum Care',
    badgeColor: 'bg-sky-50 text-brandBlue border-brandSky/20'
  },
  {
    title: 'Regenerative Flap Surgery',
    desc: 'Specialist micro-surgical gum reflection providing direct visual access to clean contaminated root anatomy.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/flap-surgery/advanced-gum-treatment.webp',
    alt: 'Regenerative flap surgery at Jerush',
    link: '/dental-care/periodontal-gum-care/flap-surgery',
    badge: 'Advanced Periodontics',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    title: 'Bone & Tissue Grafting',
    desc: 'Bio-compatible scaffold rebuilding jawbone and structural foundations damaged by periodontal disease.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/dental-foundation-at-jerush.webp',
    alt: 'Dental bone grafting at Jerush',
    link: '/dental-care/periodontal-gum-care/bone-tissue-grafting',
    badge: 'Bone Regeneration',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
  }
];

// FAQs (Exact 7 FAQs from PDF Page 4 & 5)
const FAQS = [
  {
    q: 'Is crown lengthening only for cosmetic purposes?',
    a: 'No. Crown lengthening is frequently performed for functional restorative reasons—such as exposing sound tooth structure when a tooth is severely broken, decayed below the gum line, or too short to securely hold a dental crown or filling. In other cases, it is chosen for aesthetic smile design to correct a gummy smile.'
  },
  {
    q: 'Is crown lengthening painful?',
    a: 'Local anaesthesia is carefully administered before starting, so the procedure itself is pain-free. Mild tenderness, swelling, or sensitivity can occur during initial healing, but this is typically mild and easily controlled with routine pain-relief medications prescribed by your periodontist.'
  },
  {
    q: 'Does crown lengthening always involve removing bone?',
    a: 'No. Some patients require only soft gum tissue recontouring (gingivectomy), while others also need minor bone contouring to establish an anatomically healthy biological width (the critical 2mm space between bone and restoration margin). The approach depends on your tooth anatomy, bone levels, and treatment goal.'
  },
  {
    q: 'Will my teeth look longer after treatment?',
    a: 'The treated teeth will appear naturally longer because more of their sound anatomical structure is exposed from beneath excess gum tissue. The degree of exposure is carefully planned with digital diagnostics to ensure natural, harmonious proportions aligned with your facial smile line.'
  },
  {
    q: 'How long does crown lengthening take to heal?',
    a: 'Initial soft tissue healing occurs within 1 to 2 weeks, allowing sutures to be removed and normal daily routines to resume. However, complete biological tissue maturation and gum-line stabilisation typically takes 4 to 8 weeks for back teeth, and up to 3 months for front teeth before final cosmetic crown fabrication.'
  },
  {
    q: 'Will I need a dental crown afterwards?',
    a: 'Not always. If crown lengthening was performed to salvage a fractured or heavily decayed tooth, a crown is usually essential to protect and rebuild the remaining structure. However, if the procedure was performed solely for aesthetic smile recontouring, a crown may not be required at all.'
  },
  {
    q: 'Are there any risks with crown lengthening?',
    a: 'Possible temporary effects include mild root sensitivity to temperature, transient gum swelling, or minor bleeding. Removing excessive supporting bone could potentially compromise tooth stability, which is why the procedure at Jerush is planned with high-precision digital X-rays and performed by specialist periodontists.'
  }
];

export default function CrownLengtheningPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  // Sticky subnav scroll spy with exact header offset
  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    NAVIGATION_TABS.map((t) => t.id),
    140
  );

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleBookClick = () => {
    const el = document.getElementById('appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/contact');
    }
  };

  // SEO metadata setup
  useEffect(() => {
    document.title = 'Crown Lengthening Treatment | Periodontal Care at Jerush';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Discover how crown lengthening can expose more tooth structure for dental restorations or improve the gum line. Learn about treatment, healing and aftercare at Jerush.'
      );
    }
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* ─── Breadcrumb Hero Strip ─── */}
      <PageBreadcrumbHero
        breadcrumbs={[
          { label: 'Dental Care', path: '/dental-care' },
          { label: 'Periodontal Care', path: '/dental-care/periodontal-gum-care' },
          { label: 'Crown Lengthening', active: true }
        ]}
        title="Crown Lengthening"
      />

      {/* ─── 1ST SECTION: HERO SECTION ─── */}
      <section className="relative pt-6 pb-12 sm:pb-16 bg-gradient-to-b from-sky-50/50 via-white to-slate-50 overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline">
                  JERUSH DENTOFACIAL &amp; COSMETIC LASER CENTRE
                </span>
                <h1
                  className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
                  style={{ lineHeight: 1.4 }}
                >
                  Crown Lengthening:{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Creating the Right Foundation for a Dental Crown
                  </span>
                </h1>
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Sometimes, a tooth may be too short or too damaged above the gum line for a dental crown
                  or filling to be placed properly. In other cases, excess gum tissue covers more of the tooth
                  than desired, affecting its appearance.
                </p>
                <p>
                  Crown lengthening is a dental procedure that exposes more of the natural tooth by reshaping
                  the gum tissue and, when necessary, the supporting bone. It can help create enough accessible
                  tooth structure for a restoration or improve the balance between the teeth and gums.
                </p>
                <p>
                  The procedure is planned according to the tooth's condition, the surrounding tissues and the
                  final restorative or cosmetic goal.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3 sm:gap-4 items-center">
                <button
                  onClick={handleBookClick}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue text-white font-headline font-bold text-sm sm:text-base shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK CONSULTATION</span>
                </button>
                <a
                  href="tel:+919489160000"
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-white border border-slate-200 text-slate-700 font-headline font-bold text-sm sm:text-base hover:bg-slate-50 hover:border-slate-300 hover:text-brandBlue shadow-sm transition-all"
                >
                  <Phone className="w-4 h-4 text-brandBlue" />
                  <span>CALL +91 94891 60000</span>
                </a>
              </div>

              {/* Trust Indicators / Badges */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                  <span>Specialist Periodontic Care</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                  <span>Restorative &amp; Aesthetic Precision</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                  <span>Conservative Tissue Contouring</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Aspect-Square Clean Hero Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="w-full max-w-md aspect-square rounded-3xl bg-white p-3 shadow-2xl shadow-sky-950/10 border border-slate-100 relative group overflow-hidden">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src="/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/crown-lengthening.webp"
                    alt="Crown lengthening procedure to expose more natural tooth structure by reshaping gum tissue"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2ND SECTION: BOOK A CONSULTATION (Clean 2x2 Feature Cards + Dark Form) ─── */}
      <TreatmentAppointmentForm
        id="appointment"
        treatmentName="Crown Lengthening"
        title="Book a Crown Lengthening Consultation"
        highlightWord="For Restoring Your Tooth & Smile"
        subtitle="Evaluate clinical tooth structure, discuss restorative or aesthetic gum contouring options, and receive a personalised treatment plan from our periodontal specialists across Tamil Nadu & UAE."
        features={[
          {
            icon: ShieldCheck,
            title: 'Specialist-Led Periodontics',
            desc: 'Clinical evaluations and surgical contouring supervised by hospital periodontic surgeons.'
          },
          {
            icon: Activity,
            title: 'Digital X-Ray Diagnostics',
            desc: 'High-definition digital assessment of tooth root length and supporting alveolar bone height.'
          },
          {
            icon: Sparkles,
            title: 'Dual Functional & Aesthetic Care',
            desc: 'Creating sound biological ferrule for crown retention or balancing gummy smile proportions.'
          },
          {
            icon: MapPin,
            title: '4 Regional Centres',
            desc: 'World-class hospital care available across Thuckalay, Chennai, Trichy, and UAE.'
          }
        ]}
      />

      {/* ─── 3RD SECTION: SIGNATURE COUNTER & KEY STATS BAR ─── */}
      <section className="bg-gradient-to-r from-[#0F172A] via-[#2852A3] to-[#0F172A] py-10 sm:py-12 px-4 sm:px-6 text-white shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {KEY_STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`flex flex-col items-center justify-center ${idx > 0 && idx % 2 === 0 ? 'pt-6 lg:pt-0' : ''}`}
              >
                <div className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-brandSky text-xs sm:text-sm font-bold uppercase tracking-wider mt-1.5">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STICKY SUB-NAVIGATION TABS (PILL BAR) ─── */}
      <TreatmentSectionNav
        tabs={NAVIGATION_TABS}
        activeSection={activeSection}
        onTabClick={scrollToSection}
      />

      {/* ─── SECTION: Two Reasons Crown Lengthening May Be Recommended ─── */}
      <section id="two-reasons" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 scroll-mt-28 sm:scroll-mt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline">
              Clinical Applications
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Two Reasons Crown Lengthening{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                May Be Recommended
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Crown lengthening is not only a cosmetic procedure. It may also be required to establish
              essential tooth structure needed to support and secure a long-lasting restorative crown.
            </p>
          </div>

          {/* 2 Primary Reasons Grid (16:9 / 16:10 Container for 1024x576 images) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {TWO_REASONS.map((reason, idx) => (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-slate-50/80 rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-brandSky/40 transition-all flex flex-col justify-between p-6 sm:p-7 space-y-5"
              >
                {/* 16:10 / 16:9 Aspect Ratio Container for 1024x576 panoramic visual */}
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-inner">
                  <img
                    src={reason.image}
                    alt={reason.alt}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded-full bg-brandSky/10 text-brandBlue text-xs font-bold uppercase tracking-wider border border-brandSky/20 inline-block font-headline">
                      {reason.tag}
                    </span>
                    <h3 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 leading-snug">
                      {reason.title}
                    </h3>
                    <p className="text-xs font-semibold text-brandBlue uppercase tracking-wide">
                      {reason.subtitle}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 space-y-2 text-xs sm:text-sm text-slate-700">
                    {reason.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0 mt-0.5" />
                        <span className="leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Diagnostic Note from PDF Page 2 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-3xl bg-sky-50/80 border border-brandSky/30 flex items-start gap-4 text-slate-700 text-sm sm:text-base leading-relaxed"
          >
            <Info className="w-5 h-5 text-brandBlue shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-900 font-headline">Diagnostic Verification First:</strong> Not
              everyone with short-looking teeth or a gummy smile needs crown lengthening. A comprehensive dental
              examination helps identify whether the cause is excess gum tissue, tooth position, lip movement,
              or skeletal development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION: What Happens During the Procedure? ─── */}
      <section id="procedure" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80 scroll-mt-28 sm:scroll-mt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline">
              Step-by-Step Clinical Protocol
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              What Happens During{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                the Procedure?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The treatment depends on how much tooth structure needs to be exposed and whether the
              supporting bone must also be reshaped to preserve biological width.
            </p>
          </div>

          {/* 4 Procedure Steps Grid with 1:1 Aspect-Square Uncropped Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCEDURE_STEPS.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-brandSky/40 transition-all flex flex-col justify-between p-4 sm:p-5 space-y-4"
              >
                {/* 1:1 Aspect-Square Container ensures 768x768 images display 100% full view without cropping */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 shadow-inner">
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brandBlue to-brandSky text-white flex items-center justify-center font-headline font-black text-xs shadow-sm">
                        {step.step}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brandBlue px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-100">
                        {step.highlight}
                      </span>
                    </div>
                    <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION: How Can Crown Lengthening Help? ─── */}
      <section id="how-it-helps" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 scroll-mt-28 sm:scroll-mt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline">
              Functional &amp; Aesthetic Advantages
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              How Can Crown Lengthening Help?{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Proven Clinical Benefits
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Depending on the clinical reason for treatment, crown lengthening addresses both practical restorative challenges and aesthetic smile concerns.
            </p>
          </div>

          {/* 4 Benefits Grid with 1:1 Aspect-Square Uncropped Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_HELPS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-slate-50/80 rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-brandSky/40 transition-all flex flex-col justify-between p-4 sm:p-5 space-y-4"
              >
                {/* 1:1 Aspect-Square Container ensures full 768x768 visibility */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-inner">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border inline-block ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-brandBlue uppercase tracking-wide">
                      {item.subtitle}
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Biological Reality Notice from PDF Page 3 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-700 shadow-xl relative overflow-hidden"
          >
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-brandSky/20 border border-brandSky/30 flex items-center justify-center shrink-0 text-brandSky">
                <Shield className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-headline font-bold text-lg sm:text-xl text-white">
                  Important Anatomical Reality
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  The procedure does not make the root itself longer. The amount of tooth exposed, the final
                  appearance, and the suitability of a restoration depend strictly on the tooth's anatomy and supporting periodontal tissues.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION: Recovery and the Final Result ─── */}
      <section id="recovery" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80 scroll-mt-28 sm:scroll-mt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline">
              Post-Surgical Care &amp; Healing Guide
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Recovery and the{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Final Result
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Crown lengthening involves gum surgery, so healing and follow-up are important parts of
              treatment. During recovery, you may notice temporary tenderness, swelling, or sensitivity.
            </p>
          </div>

          {/* 5 Recovery Guidelines Grid with 1:1 Aspect-Square Uncropped Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECOVERY_GUIDELINES.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between p-4 sm:p-5 space-y-4"
              >
                {/* 1:1 Aspect-Square Container ensures full 768x768 recovery image is visible without top/bottom cropping */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 shadow-inner">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h3 className="font-headline font-bold text-base text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Restorative Timeline Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.4 }}
              className="bg-gradient-to-br from-sky-50 to-blue-50/50 rounded-3xl border border-brandSky/30 p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brandBlue text-white flex items-center justify-center shadow-md shadow-brandBlue/20">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-bold text-lg text-slate-900">
                  Tissue Stabilisation Timeline
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Healing time varies. In restorative cases, the dentist may allow additional time
                  for the gum line to stabilise before making the final restoration, particularly
                  when visible front teeth are involved.
                </p>
              </div>
              <div className="pt-3 border-t border-sky-200/80 text-xs font-semibold text-brandBlue flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brandSky" />
                <span>Optimal Long-Term Biological Integration</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION: Before and After: Exposing More of the Tooth ─── */}
      <section id="before-after" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 scroll-mt-28 sm:scroll-mt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline">
              Visual Transformation
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Before and After:{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Exposing More of the Tooth
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Comparison illustrating how clinical crown lengthening exposes sound tooth structure and restores harmonious gum contours.
            </p>
          </div>

          {/* 2-Card Before & After Display with 1:1 Aspect-Square Uncropped Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Before Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-slate-50/80 rounded-3xl border border-slate-200/90 p-5 space-y-4 shadow-sm"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-inner">
                <img
                  src="/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/before-treatment.webp"
                  alt="Before treatment: limited visible tooth structure or excess gum coverage"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider border border-rose-200">
                    Before Treatment
                  </span>
                </div>
                <h3 className="font-headline font-bold text-lg text-slate-900">
                  Limited Tooth Structure or Excess Gum Coverage
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Limited visible tooth structure or excess gum coverage may affect restorative treatment or appearance.
                </p>
              </div>
            </motion.div>

            {/* After Healing Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-slate-50/80 rounded-3xl border border-slate-200/90 p-5 space-y-4 shadow-sm"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-inner">
                <img
                  src="/images/medical-services/dental-care/periodontal-gum-care/crown-lengthening/after-treatment.webp"
                  alt="After healing: more tooth structure visible, creating access for restoration"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                    After Healing
                  </span>
                </div>
                <h3 className="font-headline font-bold text-lg text-slate-900">
                  Enhanced Clinical Exposure &amp; Symmetrical Gum Line
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  More tooth structure is visible, creating clean access for a secure restoration or a balanced gum-line appearance.
                </p>
              </div>
            </motion.div>
          </div>

          <p className="text-center text-xs text-slate-500 max-w-xl mx-auto italic">
            *These images are illustrative, not actual patient results. Clinical outcomes depend on individual tooth anatomy, periodontal biotype, and surgical planning.
          </p>
        </div>
      </section>

      {/* ─── SECTION: Accessible Care Across 4 Regional Centres ─── */}
      <section id="regional-centres" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80 scroll-mt-28 sm:scroll-mt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline">
              CENTRES OF EXCELLENCE
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Accessible Care Across{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                4 Regional Centres
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Advanced periodontal assessments, aesthetic gum recontouring, and restorative crown lengthening
              procedures available across Tamil Nadu &amp; UAE.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REGIONAL_CENTRES.map((centre, idx) => (
              <motion.div
                key={centre.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-lg hover:border-brandSky/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-brandSky shrink-0" />
                    <span className="text-xs font-bold font-headline text-brandBlue uppercase tracking-wider">
                      {centre.city}
                    </span>
                  </div>
                  <h3 className="font-bold font-headline text-base text-slate-900 leading-snug">
                    {centre.name}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {centre.address}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
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

      {/* ─── SECTION: Related Periodontal Treatments ─── */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline">
                Comprehensive Periodontal &amp; Restorative Care
              </span>
              <h2
                className="font-headline font-black text-2xl sm:text-3xl text-slate-900 tracking-tight leading-[1.4]"
                style={{ lineHeight: 1.4 }}
              >
                Related Periodontal &amp;{' '}
                <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                  Restorative Treatments
                </span>
              </h2>
            </div>
            <button
              onClick={() => navigate('/dental-care/periodontal-gum-care')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-headline font-bold text-brandBlue hover:text-brandSky transition-colors shrink-0"
            >
              <span>Explore All Periodontal Treatments</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RELATED_TREATMENTS.map((rel, idx) => (
              <motion.div
                key={rel.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => navigate(rel.link)}
                className="cursor-pointer bg-slate-50/80 rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-brandSky/40 transition-all flex flex-col justify-between p-4 space-y-4"
              >
                <div className="w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 shadow-inner">
                  <img
                    src={rel.image}
                    alt={rel.alt}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border inline-block ${rel.badgeColor}`}>
                      {rel.badge}
                    </span>
                    <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900">
                      {rel.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {rel.desc}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-1 text-xs font-headline font-bold text-brandBlue group-hover:text-brandSky">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION: Frequently Asked Questions ─── */}
      <section id="faqs" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80 scroll-mt-28 sm:scroll-mt-36">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline">
              Clear Answers for Patients
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Frequently Asked Questions{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                About Crown Lengthening
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Find transparent, evidence-based answers to common questions about surgical comfort, recovery time, and crown necessity.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:border-slate-300 transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 font-headline font-bold text-slate-900 text-sm sm:text-base hover:text-brandBlue transition-colors"
                >
                  <span className="leading-snug">
                    {idx + 1}. {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180 text-brandBlue' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 sm:px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL BOTTOM CTA BANNER (Dr. I. Ajaishalu & Exact Content from PDF Page 5) ─── */}
      <TreatmentCtaBanner
        badgeText="PERIODONTIST & GUM SURGERY SPECIALIST"
        titlePrefix="Plan Your Gum &"
        highlightWord="Restorative Care"
        titleSuffix="at Jerush"
        subtitle="Whether the goal is to restore a damaged tooth or improve the balance of your smile, crown lengthening should be planned around your dental health and long-term needs. At Jerush Dentofacial & Cosmetic Laser Centre, a dental assessment can help determine whether crown lengthening is suitable and whether gum reshaping alone or additional bone contouring may be required. Have a tooth that is difficult to restore or concerns about excess gum coverage? Arrange a consultation to explore your treatment options."
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

