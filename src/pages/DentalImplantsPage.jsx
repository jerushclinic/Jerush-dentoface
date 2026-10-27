import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Star, ChevronDown, Calendar, Phone, MapPin,
  CheckCircle2, ArrowRight, Clock, Users, Award, Heart,
  Sparkles, Check, Shield, Layers, HelpCircle, Activity,
  Stethoscope, Building2, Zap, ArrowUpRight
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

const STATS = [
  { value: '188K+', label: 'Happy Patients' },
  { value: '52K+', label: 'Implants Placed' },
  { value: '90K+', label: 'Braces & Aligners' },
  { value: '44K+', label: 'Facial Surgeries' },
  { value: '4', label: 'Regional Centres' },
  { value: '4.9/5', label: 'Google Rating' },
];

const COST_FACTORS = [
  {
    title: '1. Types of Dental Implants',
    desc: 'Whether you require a single tooth implant, multiple adjacent replacements, or an advanced All-on-4 / All-on-6 full arch restoration determines the surgical complexity and total cost.',
    img: '/images/medical-services/dental-care/dental-implants/implant-types.webp',
    tag: 'Configuration',
    color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20'
  },
  {
    title: '2. Biocompatible Materials Used',
    desc: 'Medical-grade Titanium vs metal-free Zirconia implants. Titanium provides unmatched load-bearing strength, while Zirconia delivers peak aesthetics for visible front teeth.',
    img: '/images/medical-services/dental-care/dental-implants/materials-used.webp',
    tag: 'Material Choice',
    color: 'from-brandBlue/10 to-cyan-500/10 border-brandBlue/20'
  },
  {
    title: '3. Digital 3D Technology & Guided Surgery',
    desc: 'Advanced CBCT 3D volumetric scanning, computer-guided surgical templates, and digital CAD/CAM impressions ensure millimeter accuracy and faster healing.',
    img: '/images/medical-services/dental-care/dental-implants/technology.webp',
    tag: '3D Precision',
    color: 'from-brandSky/10 to-blue-500/10 border-brandSky/20'
  },
  {
    title: '4. Custom Crown & Prosthetic Type',
    desc: 'Your final restoration choice — monolithic Zirconia crowns, aesthetic ceramic bridges, or porcelain-fused restorations — tailored for natural aesthetics and bite strength.',
    img: '/images/medical-services/dental-care/dental-implants/crown-types.webp',
    tag: 'Prosthetics',
    color: 'from-purple-500/10 to-indigo-500/10 border-purple-500/20'
  },
  {
    title: '5. Pre-Implant Additional Procedures',
    desc: 'If bone volume is depleted, preparatory procedures such as bone grafting, sinus lift elevation, or tooth extraction ensure a rock-solid foundation for the implant.',
    img: '/images/medical-services/dental-care/dental-implants/additional-procedures.webp',
    tag: 'Preparatory Care',
    color: 'from-amber-500/10 to-orange-500/10 border-amber-500/20'
  },
  {
    title: '6. Chennai Clinic Advantage & Pricing',
    desc: 'Jerush Dentofacial in Chennai provides direct hospital-level pricing with 0% interest EMI options and complete cost transparency without hidden clinic overheads.',
    img: '/images/medical-services/dental-care/dental-implants/price-location.webp',
    tag: 'Transparent EMI',
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20'
  }
];

const TYPES = [
  {
    title: 'Single Tooth Implant',
    desc: 'Ideal for replacing one missing tooth without altering or shaving down neighboring healthy teeth. A titanium post replaces the root with a custom crown on top.',
    img: '/images/medical-services/dental-care/dental-implants/single-tooth-implant.webp',
    badge: 'Single Unit',
    points: ['100% preserves adjacent teeth', 'Natural look and chewing feel', 'Permanent, lifetime bond']
  },
  {
    title: 'Multiple Teeth Implants',
    desc: 'Replaces several consecutive missing teeth using strategically spaced implant posts supporting an implant-supported fixed bridge.',
    img: '/images/medical-services/dental-care/dental-implants/multiple-teeth-implants.webp',
    badge: 'Multi-Unit Bridge',
    points: ['Eliminates partial dentures', 'Prevents bone collapse across gap', 'High bite-force capacity']
  },
  {
    title: 'All-on-4 / All-on-6 Full Arch',
    desc: 'Complete upper or lower arch restoration anchored by 4 or 6 tilted titanium implants for permanent, non-removable full smile transformation.',
    img: '/images/medical-services/dental-care/dental-implants/all-on-4-full-arch.webp',
    badge: 'Full Arch Restoration',
    points: ['Fixed alternative to loose dentures', 'Same-week smile makeover', 'Maximum stability and confidence']
  },
];

const PROCEDURE_STEPS = [
  {
    step: '01',
    title: '3D Diagnostics & Digital Treatment Planning',
    desc: 'Comprehensive oral evaluation with low-radiation 3D CBCT imaging to map bone density, nerve pathways, and precise 3D implant positioning.',
    img: '/images/medical-services/dental-care/dental-implants/treatment-plan.webp',
    highlight: 'CBCT 3D Scan',
    details: 'Digital virtual simulation ensures maximum accuracy before the procedure starts.'
  },
  {
    step: '02',
    title: 'Computer-Guided Implant Placement Surgery',
    desc: 'Under gentle local anesthesia, the sterile medical-grade titanium post is accurately placed into the jawbone with micro-surgical precision.',
    img: '/images/medical-services/dental-care/dental-implants/implant-surgery.webp',
    highlight: 'Minimally Invasive',
    details: 'Painless procedure lasting 30–45 minutes per implant with rapid same-day recovery.'
  },
  {
    step: '03',
    title: 'Osseointegration (Natural Healing Phase)',
    desc: 'Over 3–6 months, the jawbone cells fuse directly with the biocompatible titanium surface (osseointegration), forming an unbreakable permanent anchor.',
    img: '/images/medical-services/dental-care/dental-implants/healing-time.webp',
    highlight: '3–6 Months Fusion',
    details: 'A temporary aesthetic crown can be worn during healing so your smile remains complete.'
  },
  {
    step: '04',
    title: 'Custom Zirconia Crown Placement',
    desc: 'A custom-shaded, computer-milled monolithic Zirconia or ceramic crown is securely attached to the abutment, perfectly matching your natural teeth.',
    img: '/images/medical-services/dental-care/dental-implants/crown-placeement.webp',
    highlight: 'CAD/CAM Zirconia',
    details: 'Crafted in our advanced dental laboratory for exact bite alignment and lifelike aesthetics.'
  },
  {
    step: '05',
    title: 'Routine Follow-Up & Lifetime Maintenance',
    desc: 'Periodic check-ups and professional preventive cleanings ensure healthy gum tissue and lifetime stability for your new smile.',
    img: '/images/medical-services/dental-care/dental-implants/followup-care.webp',
    highlight: 'Long-Term Success',
    details: 'Regular check-ups at any of our regional centres in Chennai, Trichy, or Thuckalay.'
  },
];

const BENEFITS = [
  {
    title: 'Natural Look & Full Chewing Power',
    desc: 'Restores 100% of natural chewing force so you can enjoy crunchy fruits, meats, and your favorite foods without hesitation.'
  },
  {
    title: 'Prevents Bone Deterioration',
    desc: 'Implants stimulate bone cell growth like natural tooth roots, preventing the sunken facial aging caused by tooth loss.'
  },
  {
    title: 'Decades of Lasting Durability',
    desc: 'Unlike dentures or bridges that need replacement every 5–7 years, dental implants can last a lifetime with proper care.'
  },
  {
    title: 'Zero Slipping or Irritation',
    desc: 'Securely anchored in the jawbone — no messy adhesives, no speech impediment, and zero embarrassing slippage.'
  },
  {
    title: 'Protects Healthy Neighboring Teeth',
    desc: 'Unlike traditional bridges that require grinding down adjacent healthy teeth, implants stand independently.'
  },
  {
    title: 'Biocompatible & Safe',
    desc: 'Manufactured with international medical-grade Titanium and Zirconia with a global clinical success rate above 98%.'
  }
];

const CONDITIONS = [
  {
    title: 'Missing Single or Multiple Teeth',
    desc: 'Restore gaps caused by tooth decay, sports trauma, or extraction with permanent tooth replacements.',
    img: '/images/medical-services/dental-care/dental-implants/missing-teeth.webp',
    tag: 'Gap Restoration'
  },
  {
    title: 'Jawbone Loss Issues',
    desc: 'Halt progressive bone resorption after tooth extraction and preserve your natural facial contour.',
    img: '/images/medical-services/dental-care/dental-implants/bone-loss-issues.webp',
    tag: 'Bone Preservation'
  },
  {
    title: 'Struggling with Loose Dentures',
    desc: 'Eliminate painful friction, clicking sounds, and messy adhesive pastes with fixed implant-anchored teeth.',
    img: '/images/medical-services/dental-care/dental-implants/unmanaged-dentures.webp',
    tag: 'Denture Alternative'
  },
  {
    title: 'Affordable Tooth Replacement',
    desc: 'Accessible pricing, transparent payment schemes, and zero-interest EMI options for every patient.',
    img: '/images/medical-services/dental-care/dental-implants/affordable-dental-implants.webp',
    tag: 'Accessible Care'
  },
  {
    title: 'Full Dental Implant Packages',
    desc: 'Complete arch rehabilitations (All-on-4 / All-on-6) for patients requiring comprehensive whole-mouth restoration.',
    img: '/images/medical-services/dental-care/dental-implants/full-dental-implant-packages.webp',
    tag: 'Full Arch Makeover'
  },
];

const CLINIC_TIPS = [
  {
    title: 'Experienced Implant Specialists & Oral Surgeons',
    desc: 'Ensure the procedure is performed by qualified maxillofacial surgeons with proven track records in complex implantology.'
  },
  {
    title: 'Modern 3D Digital Diagnostic Equipment',
    desc: 'Verify the clinic utilizes in-house CBCT 3D scanning and computer-guided surgery for micro-precision.'
  },
  {
    title: '100% Transparent Cost Transparency',
    desc: 'Look for upfront pricing with no hidden charges for abutments, surgical guides, or final zirconia crowns.'
  },
  {
    title: 'Genuine Patient Reviews & Before/After Proof',
    desc: 'Inspect real case transformations and verified video reviews from actual treated patients.'
  },
  {
    title: '24/7 Dental Emergency & Post-Op Support',
    desc: 'Ensure the hospital offers dedicated round-the-clock on-call care for uninterrupted patient safety.'
  }
];

const CARE_TIPS = [
  {
    title: 'Brush & Floss Diligently',
    desc: 'Brush twice daily with a soft-bristle toothbrush and use interdental brushes or a water flosser around the implant.'
  },
  {
    title: 'Regular Dental Check-Ups',
    desc: 'Visit your dentist every 6 months for professional implant cleaning, bite verification, and gum evaluation.'
  },
  {
    title: 'Avoid Smoking & Tobacco',
    desc: 'Nicotine impairs blood circulation and bone healing, significantly increasing the risk of implant failure.'
  },
  {
    title: 'Soft Diet During Initial Healing',
    desc: 'Eat nutritious, soft foods for the first 1–2 weeks to avoid putting excess mechanical pressure on the implant.'
  },
  {
    title: 'Participate in Scheduled Follow-Ups',
    desc: 'Attend all milestone reviews at our clinic so our implant team can monitor osseointegration progress.'
  }
];

const WHY_CHOOSE = [
  {
    icon: Users,
    title: 'Master Implantologists & Maxillofacial Surgeons',
    desc: 'Our surgical team brings 22+ years of clinical excellence, successfully placing over 52,000+ implants with precision.'
  },
  {
    icon: ShieldCheck,
    title: 'Affordable Pricing & Flexible 0% EMI',
    desc: 'Transparent packages with no hidden costs and flexible EMI schemes to make world-class implantology accessible.'
  },
  {
    icon: Award,
    title: 'Advanced 3D CBCT & Guided Surgery',
    desc: 'In-house digital 3D scanning, AI planning, and surgical stents minimize recovery time and maximize longevity.'
  },
  {
    icon: Star,
    title: 'Custom In-House Monolithic Zirconia Crowns',
    desc: 'Milled directly in our digital lab for unmatched shade matching, natural translucency, and exceptional durability.'
  },
  {
    icon: Clock,
    title: '24/7 Emergency Dental & Surgical Support',
    desc: 'Dedicated emergency teams on duty across our 4 regional centres in Chennai, Trichy, and Thuckalay.'
  },
  {
    icon: Heart,
    title: '4 Regional Centres of Excellence',
    desc: 'Convenient clinical presence across Tamil Nadu and Dubai, allowing seamless follow-up wherever you are.'
  },
];

const TESTIMONIALS = [
  {
    name: 'Prathab G',
    location: 'Thuckalay Centre',
    rating: 5,
    text: 'I recently visited Jerush Hospital for dental treatment which included a root canal and zirconia crown fitting, and I\'m truly happy with the entire experience. I give Jerush Hospital a full 10/10 rating and highly recommend it to anyone looking for professional and caring dental treatment.',
  },
  {
    name: 'Anisha Beullah',
    location: 'Chennai Centre',
    rating: 5,
    text: 'One of the best dental clinics in town. Having all advanced forms of treatment available, the result is perfect and worth every single penny! Highly recommend everyone to visit the clinic at least once.',
  },
  {
    name: 'Sathya Priya',
    location: 'Trichy Centre',
    rating: 5,
    text: 'I have been undertaking dental treatment here for 2 years. The service is good. Treatment results are satisfying and the staff tries to give their service at the best level. The hospital environment is very clean with a good ambience. Thank you Jerush.',
  },
  {
    name: 'Gulamrasool Noohu',
    location: 'Australia / Overseas Patient',
    rating: 5,
    text: 'I visited Jerush from Australia after my wife recommended this practice. The dental treatment was very affordable comparatively. I had time constraints and they managed to finish the procedure in time as promised. I am very happy with the end result.',
  },
];

const FAQS = [
  {
    q: 'How painful is the dental implant procedure?',
    a: 'With modern computer-guided 3D techniques, local anesthesia, and micro-surgical protocols, dental implant placement is virtually painless during surgery. Most patients report feeling only light vibration or pressure. Any mild post-procedure soreness or minor swelling over the next 2 to 3 days is easily managed with routine pain medication and cold compression.'
  },
  {
    q: 'Will dental implants last a lifetime?',
    a: 'Yes. When maintained with proper daily oral hygiene (regular brushing, flossing, or water flossing) and routine biannual check-ups, the medical-grade titanium fixture fuses permanently with the jawbone (osseointegration) and can last for decades or a lifetime. The custom monolithic zirconia crown on top typically lasts 15 to 25+ years.'
  },
  {
    q: 'How many teeth can be replaced with dental implants?',
    a: 'Dental implants are completely scalable: a single implant fixture replaces one isolated missing tooth without touching neighboring healthy teeth; two or three implants can support a fixed multi-unit dental bridge; and 4 to 6 strategically angled implants (All-on-4 / All-on-6 protocols) can permanently anchor an entire full upper or lower arch.'
  },
  {
    q: 'Which is safer: dental implants or a traditional dental bridge?',
    a: 'Dental implants are clinically safer, longer-lasting, and far more conservative than traditional bridges. A traditional bridge requires permanently grinding down and shaving healthy enamel off adjacent teeth to act as abutments, and it does not stop jawbone loss under the empty gap. Implants stand independently, stimulate natural bone growth, and preserve 100% of adjacent natural teeth.'
  },
  {
    q: 'What is the cost of dental implants in Chennai at Jerush?',
    a: 'The total cost of dental implants in Chennai depends on the number of teeth, chosen implant fixture brand (Titanium vs Zirconia), final restoration type (CAD/CAM monolithic Zirconia or ceramic), and whether preparatory procedures like bone grafting or sinus lifts are required. Jerush Dentofacial provides hospital-level transparent pricing with 0% interest EMI options to make world-class implantology accessible.'
  },
  {
    q: 'How long does the entire dental implant process take?',
    a: 'The surgical implant placement takes just 30 to 45 minutes per implant. Following placement, the osseointegration (natural bone fusion) phase lasts approximately 3 to 6 months to guarantee immovable biological anchorage before fitting the permanent custom zirconia crown. In select patients with high bone density, immediate-load temporary crowns can even be fitted on the same day.'
  },
  {
    q: 'Am I a suitable candidate for dental implants if I have bone loss or diabetes?',
    a: 'Yes! Even if you have experienced progressive bone loss after tooth extraction, advanced preparatory techniques like bone grafting, ridge augmentation, and sinus elevation can rebuild an ideal bone foundation. Patients with well-managed diabetes or controlled systemic health conditions are also successfully treated with high success rates under our maxillofacial surgical protocols.'
  },
  {
    q: 'What is the difference between Titanium and Zirconia dental implants?',
    a: 'Medical-grade Titanium is the international gold standard in implantology with over 50 years of clinical evidence and a 98%+ success rate, making it ideal for molars and heavy bite forces. Zirconia is 100% metal-free, ceramic, and tooth-colored, making it an excellent aesthetic choice for patients with thin gum tissue in the front smile zone or those with metal sensitivities.'
  }
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'cost-factors', label: 'Cost Factors' },
  { id: 'types', label: 'Implant Types' },
  { id: 'procedure', label: '5-Step Procedure' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'conditions', label: 'Who Needs It' },
  { id: 'clinic-guide', label: 'Choosing Clinic' },
  { id: 'care', label: 'Aftercare' },
  { id: 'why-choose', label: 'Why Jerush' },
  { id: 'reviews', label: 'Patient Reviews' },
  { id: 'faqs', label: 'FAQs' }
];

export default function DentalImplantsPage() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const { activeSection, scrollToSection } = useTreatmentScrollSpy(
    TABS.map(tab => tab.id),
    138
  );

  useEffect(() => {
    document.title = 'Dental Implants in Chennai — Cost, Procedure & Specialists | Jerush Dentofacial';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
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

  return (
    <div className="w-full bg-slate-50 font-body text-left relative min-h-screen">
      
      {/* Page Hero Breadcrumbs */}
      <PageBreadcrumbHero
        title="Dental Implants in Chennai — Cost, Benefits & Procedure"
        breadcrumbs={[
          { label: 'Dental Care', path: '/treatments' },
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
            <span className="inline-block text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
              Advanced Implantology & Full-Mouth Rehabilitation
            </span>
            <h1
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-3xl sm:text-4xl text-slate-900 leading-[1.4]"
            >
              Permanent Dental Implants at{' '}
              <span className="text-gradient bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Jerush Dentofacial Centre
              </span>
              {' '}Chennai
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Missing teeth can affect your smile, chewing ability, and overall dental health. At Jerush Dentofacial & Cosmetic Laser Centre, Chennai, we provide advanced dental implant treatments that restore your confidence and give you a permanent, natural-looking solution to tooth loss.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Whether you are looking for a single tooth replacement or full dental implants (All-on-4 / All-on-6), our expert implantologists provide inexpensive, reliable, and long-lasting results backed by 22+ years of surgical mastery.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleBookClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md hover:shadow-lg hover:brightness-105 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Book Free Consultation
              </button>
              <a
                href="tel:+919751010107"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-headline font-bold text-xs uppercase tracking-wider rounded-2xl shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
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
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-white p-3 flex items-center justify-center">
              <img
                src="/images/medical-services/dental-care/dental-implants/anatomy-of-healthy-teeth-and-tooth-dental-implant.webp"
                alt="Anatomy of healthy teeth and dental implant - Jerush Chennai"
                className="w-full h-auto max-h-[400px] object-contain rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl rounded-2xl p-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Clinical Success</p>
                <p className="font-headline font-black text-lg text-slate-900">98%+ Long-Term</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Top Appointment Consultation Section ─── */}
      <TreatmentAppointmentForm
        treatmentName="Dental Implants"
        treatmentCategory="dental"
        title="Book a Dental Implant Consultation"
        highlightWord="Near You"
        subtitle="Get personalised guidance from Jerush Dentofacial & Cosmetic Laser Centre's leading maxillofacial surgeons and implantologists."
        features={[
          {
            icon: ShieldCheck,
            title: '52,000+ Implants Placed',
            desc: 'Over 22+ years of surgical precision led by Dr. A. Bladbin and senior oral implantologists.'
          },
          {
            icon: Award,
            title: '3D CBCT Guided Surgery',
            desc: 'Millimeter-accurate computer guided stent placement for painless healing and high success.'
          },
          {
            icon: Sparkles,
            title: 'Lifetime Titanium & Zirconia',
            desc: 'FDA & CE approved biocompatible implants backed by comprehensive long-term warranty.'
          },
          {
            icon: MapPin,
            title: '4 Regional Centres',
            desc: 'World-class surgical suites and express dental clinics across Tamil Nadu.'
          }
        ]}
      />

      {/* ─── Key Stats Bar ─── */}
      <section className="bg-gradient-to-r from-[#0F172A] via-[#2852A3] to-[#0F172A] py-10 sm:py-12 px-4 sm:px-6 text-white shadow-inner relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center text-white relative z-10">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
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

      {/* Sticky Tab Navigation */}
      <TreatmentSectionNav
        tabs={TABS}
        activeSection={activeSection}
        onTabClick={scrollToSection}
      />

      {/* ─── SECTION 1: WHAT IS A DENTAL IMPLANT (OVERVIEW) ─── */}
      <section id="overview" className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden border border-slate-100 shadow-xl bg-white p-3 flex items-center justify-center"
          >
            <img
              src="/images/medical-services/dental-care/dental-implants/wmremove-transformed.webp"
              alt="What is a dental implant at Jerush Dentofacial"
              className="w-full h-auto max-h-[380px] object-contain rounded-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <span className="inline-block text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
              Permanent Artificial Root
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-2xl sm:text-3xl text-slate-900 leading-[1.4]"
            >
              What Is a{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Dental Implant?
              </span>
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              A dental implant is a titanium post surgically anchored into the jawbone to serve as the sturdy root for an artificial tooth. Once integrated with your natural bone tissue, a custom-crafted Zirconia crown, bridge, or denture is attached on top.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Unlike removable dentures that slip and irritate gums, dental implants feel, look, and perform just like natural teeth. They are widely recognized as one of the best dental treatments in India because they are safe, long-lasting, and protect facial bone structure.
            </p>
            <div className="bg-brandSky/8 border border-brandSky/20 rounded-2xl p-4">
              <p className="text-brandBlue font-semibold text-xs sm:text-sm">
                💡 <strong>Bone Preservation Advantage:</strong> Tooth loss causes gradual jawbone shrinkage over time. Dental implants stimulate jawbone cellular regeneration, preventing premature facial wrinkling and structural collapse.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: DENTAL IMPLANT COST FACTORS IN CHENNAI ─── */}
      <section id="cost-factors" className="bg-white py-16 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
              Cost Transparency
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-2xl sm:text-3xl text-slate-900 leading-[1.4]"
            >
              Professional Insights on{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Dental Implant Cost
              </span>{' '}
              in Chennai
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto">
              On average, the dental implants cost per tooth in Chennai is highly affordable and depends on the case complexity, material selection, and required preparatory care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COST_FACTORS.map((factor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`bg-slate-50 border rounded-3xl p-5 space-y-4 hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${factor.color}`}
              >
                <div className="space-y-3">
                  <div className="h-52 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-50 to-white shadow-sm border border-slate-100 relative p-3 flex items-center justify-center">
                    <img src={factor.img} alt={factor.title} className="w-full h-full object-contain" />
                    <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-brandSky text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/15">
                      {factor.tag}
                    </span>
                  </div>
                  <h3 className="font-headline font-extrabold text-base text-slate-900">
                    {factor.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {factor.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: TYPES OF DENTAL IMPLANTS ─── */}
      <section id="types" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12 space-y-2">
          <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
            Solutions Tailored For You
          </span>
          <h2
            style={{ lineHeight: 1.4 }}
            className="font-headline font-black text-2xl sm:text-3xl text-slate-900 leading-[1.4]"
          >
            Types of{' '}
            <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
              Dental Implants
            </span>{' '}
            We Offer
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
            From single tooth gaps to comprehensive full-arch smile restorations, our specialists provide exact, lasting solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TYPES.map((type, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="h-56 rounded-2xl overflow-hidden bg-slate-900/5 relative shadow-inner border border-slate-100 group">
                  <img
                    src={type.img}
                    alt={type.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-brandBlue/90 backdrop-blur-md text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md border border-white/20">
                    {type.badge}
                  </span>
                </div>
                <h3 className="font-headline font-extrabold text-lg text-slate-900">
                  {type.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {type.desc}
                </p>
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  {type.points.map((pt, pi) => (
                    <div key={pi} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleBookClick}
                className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-brandBlue hover:text-white text-slate-700 font-headline font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-200 cursor-pointer"
              >
                <span>Consult for {type.title.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 4: STEP-BY-STEP PROCEDURE TIMELINE ─── */}
      <section id="procedure" className="bg-slate-950 text-white py-20 px-6 border-y border-slate-900 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brandSky/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-brandBlue/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/10 px-3.5 py-1.5 rounded-full border border-brandSky/20">
              Surgical Roadmap
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-2xl sm:text-3xl text-white leading-[1.4]"
            >
              Step-by-Step{' '}
              <span className="bg-gradient-to-r from-brandSky via-sky-300 to-white bg-clip-text text-transparent">
                Dental Implants Procedure
              </span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              Our 5-phase guided implant workflow guarantees comfort, predictable bone integration, and rapid healing.
            </p>
          </div>

          {/* Stepper Wizard Bar */}
          <div className="relative mb-12 max-w-4xl mx-auto">
            <div className="absolute top-1/2 left-6 right-6 h-1 bg-slate-800 -translate-y-1/2 rounded-full z-0 hidden sm:block">
              <div
                className="h-full bg-gradient-to-r from-brandSky to-brandBlue transition-all duration-500 rounded-full"
                style={{ width: `${(activeStep / (PROCEDURE_STEPS.length - 1)) * 100}%` }}
              />
            </div>

            <div className="relative z-10 flex gap-2 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 justify-between items-center scrollbar-none">
              {PROCEDURE_STEPS.map((step, idx) => {
                const isSelected = activeStep === idx;
                const isCompleted = idx < activeStep;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className="flex flex-col items-center gap-2 group shrink-0 focus:outline-none cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-headline font-black text-xs sm:text-sm border-4 transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-r from-brandSky to-brandBlue text-white border-slate-950 ring-4 ring-brandSky/30 scale-110 shadow-lg shadow-brandSky/20'
                          : isCompleted
                          ? 'bg-brandBlue text-white border-slate-900 shadow-sm'
                          : 'bg-slate-900 text-slate-500 border-slate-800 hover:border-brandSky'
                      }`}
                    >
                      {step.step}
                    </div>
                    <span
                      className={`text-[9px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 hidden md:block max-w-[110px] text-center ${
                        isSelected ? 'text-brandSky font-extrabold' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    >
                      {step.title.split(' ')[0]} {step.title.split(' ')[1]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stepper Details Card Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-10 items-center max-w-5xl mx-auto text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/90 p-4 shadow-2xl flex items-center justify-center min-h-[300px] sm:min-h-[360px]"
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
                  className="w-full h-auto max-h-[320px] object-contain rounded-2xl drop-shadow-md"
                />
              </AnimatePresence>
            </motion.div>

            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between gap-6"
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

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {PROCEDURE_STEPS[activeStep].desc}
                    </p>

                    <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-xs text-brandSky font-medium">
                      ✓ {PROCEDURE_STEPS[activeStep].details}
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-slate-800 pt-5">
                    <button
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep(prev => prev - 1)}
                      className={`px-4 py-2 rounded-xl font-headline font-bold text-xs uppercase tracking-wider transition-all border cursor-pointer ${
                        activeStep === 0
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
                      className={`px-4 py-2 rounded-xl font-headline font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        activeStep === PROCEDURE_STEPS.length - 1
                          ? 'text-slate-600 border border-slate-800 cursor-not-allowed bg-slate-900/20'
                          : 'bg-gradient-to-r from-brandSky to-brandBlue text-white hover:brightness-110 shadow-md'
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

      {/* ─── SECTION 5: BENEFITS OF DENTAL IMPLANTS ─── */}
      <section id="benefits" className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-6">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
              Life-Changing Advantages
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-2xl sm:text-3xl text-slate-900 leading-[1.4]"
            >
              The Benefits of{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Dental Implants
              </span>{' '}
              Extend Far Beyond Just Replacing Teeth
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Dental implants restore your chewing efficiency, protect facial bone health, and dramatically boost self-confidence with results that last decades.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {BENEFITS.map((benefit, i) => (
                <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:border-brandSky/50 transition-colors space-y-1">
                  <div className="flex items-center gap-2 text-brandBlue font-headline font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{benefit.title}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed pl-6">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-2xl bg-white p-3 flex items-center justify-center">
            <img
              src="/images/medical-services/dental-care/dental-implants/patient-checking-his-teeth-mirror.webp"
              alt="Happy patient checking smile results in mirror - Jerush Chennai"
              className="w-full h-auto max-h-[420px] object-contain rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: CONDITIONS TREATED / WHO NEEDS IMPLANTS ─── */}
      <section id="conditions" className="bg-white py-16 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
              Patient Eligibility
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-2xl sm:text-3xl text-slate-900 leading-[1.4]"
            >
              What Conditions Are Treated with{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Dental Implants?
              </span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
              Whether you have lost a single tooth or struggle with unmanaged dentures, our implant protocols are tailored for your specific condition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {CONDITIONS.map((cond, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-slate-50 border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden relative bg-gradient-to-b from-slate-50 to-white p-3 flex items-center justify-center border-b border-slate-100">
                    <img src={cond.img} alt={cond.title} className="w-full h-full object-contain" />
                    <span className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md">
                      {cond.tag}
                    </span>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h3 className="font-headline font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                      {cond.title}
                    </h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      {cond.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: CHOOSING THE RIGHT CLINIC ─── */}
      <section id="clinic-guide" className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-2xl bg-white p-3 flex items-center justify-center">
            <img
              src="/images/medical-services/dental-care/dental-implants/choosing-right-clinic.webp"
              alt="Choosing the right dental implant clinic in Chennai"
              className="w-full h-auto max-h-[420px] object-contain rounded-2xl"
            />
          </div>

          <div className="space-y-6">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
              Clinic Selection Guide
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-2xl sm:text-3xl text-slate-900 leading-[1.4]"
            >
              Tips for Choosing the{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Right Dental Clinic
              </span>{' '}
              for Implants in Chennai
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              When searching for a trusted dental implant clinic near you, keep these essential criteria in mind to guarantee safe, permanent surgical outcomes:
            </p>
            <div className="space-y-3">
              {CLINIC_TIPS.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs">
                  <div className="w-7 h-7 rounded-xl bg-brandBlue/10 text-brandBlue flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-xs text-slate-900">{tip.title}</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: POST-IMPLANT CARE TIPS ─── */}
      <section id="care" className="bg-slate-50 py-16 px-6 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-6">
              <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
                Long-Term Maintenance
              </span>
              <h2
                style={{ lineHeight: 1.4 }}
                className="font-headline font-black text-2xl sm:text-3xl text-slate-900 leading-[1.4]"
              >
                Post-Implant Care Tips to Make{' '}
                <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                  Implants Last a Lifetime
                </span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dental implants have a 98%+ clinical success rate. Adhering to these practical aftercare recommendations ensures flawless, lifelong smile health:
              </p>
              <div className="space-y-3">
                {CARE_TIPS.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-headline font-bold text-xs text-slate-900">{tip.title}</h4>
                      <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-2xl bg-white p-3 flex items-center justify-center">
              <img
                src="/images/medical-services/dental-care/dental-implants/post-dental-implant-treatment.webp"
                alt="Post dental implant care instructions - Jerush Chennai"
                className="w-full h-auto max-h-[420px] object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: WHY CHOOSE JERUSH DENTOFACIAL ─── */}
      <section id="why-choose" className="bg-white py-16 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
              Excellence in Implantology
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-2xl sm:text-3xl text-slate-900 leading-[1.4]"
            >
              Why Choose{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Jerush Dentofacial
              </span>{' '}
              & Cosmetic Laser Centre?
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto">
              At Jerush Dentofacial in Chennai, Trichy, and Thuckalay, our mission is to deliver world-class, ethically driven implantology supported by digital technology and 24/7 care.
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
                  className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-xl hover:bg-white transition-all space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brandBlue to-brandSky text-white flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-headline font-bold text-slate-900 text-base">{item.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 10: PATIENT TESTIMONIALS ─── */}
      <section id="reviews" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12 space-y-2">
          <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-brandSky/8 px-3.5 py-1.5 rounded-full border border-brandSky/15">
            Verified Reviews
          </span>
          <h2
            style={{ lineHeight: 1.4 }}
            className="font-headline font-black text-2xl sm:text-3xl text-slate-900 leading-[1.4]"
          >
            Happy Clients for{' '}
            <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
              Dental Implant Treatments
            </span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
            Read firsthand experiences from local and international patients treated at Jerush Dentofacial centres.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brandBlue to-brandSky text-white font-bold text-sm flex items-center justify-center shadow-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-headline font-bold text-slate-900 text-xs sm:text-sm">{t.name}</p>
                  <p className="text-slate-400 text-[11px] flex items-center gap-1 font-medium">
                    <MapPin className="w-3 h-3 text-brandSky" />
                    {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 11: FAQS ─── */}
      <section id="faqs" className="bg-slate-50/70 py-16 lg:py-20 px-6 border-t border-slate-200/80">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[10px] font-bold text-brandSky uppercase tracking-widest bg-gradient-to-r from-brandSky/10 to-brandBlue/10 px-3.5 py-1.5 rounded-full border border-brandSky/20">
              Answers & Clarifications
            </span>
            <h2
              style={{ lineHeight: 1.4 }}
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-[1.4]"
            >
              Frequently Asked Questions About{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Dental Implants in Chennai
              </span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
              Common questions about implant safety, costs, recovery timeline, and procedure details answered by our specialists.
            </p>
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
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                    isExpanded
                      ? 'bg-gradient-to-r from-white via-blue-50/50 to-sky-50/40 border border-brandSky/40 shadow-md ring-1 ring-brandSky/20'
                      : 'bg-white border border-slate-200/80 hover:border-brandSky/40 hover:shadow-md'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isExpanded ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-headline font-bold text-slate-900 text-sm sm:text-base hover:text-brandBlue transition-colors group cursor-pointer"
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
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-gradient-to-br from-white/40 via-blue-50/20 to-slate-50/50 font-body">
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

      {/* ─── Bottom CTA Banner (Standard Unified Dark Navy Format) ─── */}
      <TreatmentCtaBanner
        badgeText="Dental Implants Specialist"
        titlePrefix="Ready to Restore Your Tooth & Smile —"
        highlightWord="Pain-Free?"
        titleSuffix=""
        subtitle="Book your consultation today at Jerush Dentofacial & Cosmetic Laser Centre — Chennai | Trichy | Kanyakumari | Dubai."
        primaryBtnText="Book Consultation"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call +91 97510 10107"
        secondaryBtnPhone="+919751010107"
        doctorImage="/images/doctors/dr-bladbin-portrait.webp"
        doctorName="DR. A. BLADBIN"
        doctorRole="Chief Dental & Implant Specialist"
        doctorAlt="DR. A. BLADBIN - Jerush Dentofacial"
      />
    </div>
  );
}

