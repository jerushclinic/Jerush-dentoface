import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Phone, CheckCircle2, Clock, MapPin,
  ChevronDown, ArrowRight, ShieldCheck, Sparkles,
  Activity, AlertCircle, Check, Shield,
  Layers, Info, Sparkle, Award
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';
import TreatmentSectionNav from '../components/common/TreatmentSectionNav';
import TreatmentAppointmentForm from '../components/common/TreatmentAppointmentForm';
import useTreatmentScrollSpy from '../hooks/useTreatmentScrollSpy';

// Signature Counter & Key Stats Bar Data
const KEY_STATS = [
  { value: '18,000+', label: 'Periodontal & Graft Procedures' },
  { value: '98.4%', label: 'Bone Integration Success Rate' },
  { value: 'Micro-Precision', label: 'Membrane & Suture-Guided' },
  { value: '4 Regional Centres', label: 'Centres of Excellence in TN & UAE' }
];

// Sticky Sub-Navigation Tabs
const NAVIGATION_TABS = [
  { id: 'appointment', label: 'Consultation' },
  { id: 'why-bone-loss', label: 'Why Bone Loss Matters' },
  { id: 'materials', label: 'Graft Materials' },
  { id: 'types', label: 'Grafting Types' },
  { id: 'treatment-journey', label: 'Treatment Journey' },
  { id: 'recovery', label: 'Recovery Guide' },
  { id: 'regional-centres', label: 'Our Centres' },
  { id: 'faqs', label: 'FAQs' }
];

// Section: Why Bone Loss Matters (Exact 4 Situations from PDF Pages 1 & 2 - 768x768 Square Images)
const BONE_LOSS_SITUATIONS = [
  {
    title: 'Periodontal Bone Defects',
    subtitle: 'Damage from Advanced Gum Disease',
    desc: 'Bone has been damaged by advanced gum disease (periodontitis), creating deep infra-bony pockets that compromise natural tooth stability and biological attachment.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/periodontal-bone-defects.webp',
    alt: 'Periodontal bone defects requiring dental bone grafting',
    badge: 'Gum Disease Care',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    title: 'After Tooth Extraction',
    subtitle: 'Socket Preservation Therapy',
    desc: 'Following tooth removal, the alveolar socket naturally undergoes bone resorption. Placing a graft immediately preserves the ridge contour, height, and bone volume for future treatments.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/after-tooth-extraction.webp',
    alt: 'Socket preservation after tooth extraction at Jerush',
    badge: 'Socket Preservation',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    title: 'Before Dental Implants',
    subtitle: 'Foundational Ridge Augmentation',
    desc: 'Permanent titanium dental implants require adequate bone width, height, and mineral density. Additional bone grafting creates the robust foundation necessary for long-term implant integration.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/before-dental-implants.webp',
    alt: 'Bone augmentation before dental implant placement',
    badge: 'Implant Readiness',
    badgeColor: 'bg-sky-50 text-brandSky border-sky-200'
  },
  {
    title: 'Localised Bone Damage',
    subtitle: 'Injury, Trauma & Cysts',
    desc: 'Physical facial trauma, dental abscesses, cysts, or past surgical interventions can leave isolated defects in the jawbone that require structured osteoconductive scaffold rebuilding.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/localised-bone-damage.webp',
    alt: 'Localised jawbone damage restored with bone graft',
    badge: 'Structural Repair',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
  }
];

// Section: What Goes Into a Dental Bone Graft? (Exact 4 Materials from PDF Page 2 - 768x768 Square Images)
const GRAFT_MATERIALS = [
  {
    id: 'autograft',
    title: 'Autograft',
    origin: "Patient's Own Body",
    tag: 'Gold Standard Bio-Match',
    desc: 'Bone harvested safely from another intra-oral site (such as the chin, ramus, or maxillary tuberosity) of the patient. Contains living osteoblasts and growth factors for optimal natural cellular bone regeneration.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/autograft.webp',
    alt: 'Autograft bone taken from patient body',
    benefits: [
      '100% biocompatible with zero rejection risk',
      'Contains living cells and active osteogenic proteins',
      'Accelerated biological healing and remodelling'
    ]
  },
  {
    id: 'allograft',
    title: 'Allograft',
    origin: 'Processed Human Donor Bone',
    tag: 'Certified Donor Matrix',
    desc: 'Carefully processed bone material obtained from rigorously screened, accredited human tissue donor banks. Extensively sterilized, tested, and freeze-dried to deliver a safe, sterile osteoconductive collagen scaffold.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/allograft.webp',
    alt: 'Allograft processed human donor bone material',
    benefits: [
      'Eliminates need for a second surgical harvest site',
      'Excellent biocompatibility and natural remodelling profile',
      'Readily available in customized particle sizes and volumes'
    ]
  },
  {
    id: 'xenograft',
    title: 'Xenograft',
    origin: 'Specially Processed Animal Source',
    tag: 'Slow-Resorbing Scaffold',
    desc: 'Highly refined, non-organic mineral bone matrix derived from a certified animal source (typically bovine). All organic components are extracted, leaving an unyielding porous mineral framework that holds space exceptionally well.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/xenograft.webp',
    alt: 'Xenograft specially processed animal bone matrix',
    benefits: [
      'Extremely slow resorption maintains jaw ridge volume over years',
      'Porous mineral architecture matches human trabecular bone',
      'Ideal for maxillary sinus lifts and implant socket sites'
    ]
  },
  {
    id: 'synthetic',
    title: 'Synthetic Graft Material',
    origin: 'Engineered Bio-Ceramics',
    tag: '100% Non-Biological',
    desc: 'Purely manufactured alloplastic biomaterials, including medical-grade calcium phosphate, beta-tricalcium phosphate (β-TCP), and bioactive glass. Engineered to mimic bone mineral without any biological origin.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/synthetic-graft-material.webp',
    alt: 'Synthetic manufactured bone graft material',
    benefits: [
      'Zero biological risk or disease transmission potential',
      'Customized porosity, resorption rates, and crystal structure',
      'Stimulates host osteoblasts through osteoconduction'
    ]
  }
];

// Section: Choosing the Right Type of Bone Grafting (Exact 3 Types from PDF Page 3 - 768x768 Square Images)
const GRAFTING_TYPES = [
  {
    title: 'Periodontal Bone Grafting',
    subtitle: 'Targeted Gum & Tooth Foundation Repair',
    desc: 'Used in selected cases to treat deep infra-bony defects associated with advanced gum disease. Often combined with regenerative flap surgery and enamel matrix derivatives to restore supporting alveolar bone and stabilize loose teeth.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/periodontal-bone-grafting.webp',
    alt: 'Periodontal bone grafting procedure at Jerush',
    features: [
      'Targets localized deep vertical bone pockets',
      'Rebuilds biological support around compromised natural teeth',
      'May be combined with regenerative membrane barriers'
    ]
  },
  {
    title: 'Socket Preservation',
    subtitle: 'Post-Extraction Ridge Volume Maintenance',
    desc: 'Graft material is gently condensed into an extraction socket immediately after a tooth is removed. This critical preventive step limits alveolar ridge collapse, preserving natural gum contours and vital bone volume while the site heals.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/socket-preservation.webp',
    alt: 'Socket preservation bone grafting procedure',
    features: [
      'Prevents up to 50% natural jaw shrinkage post-extraction',
      'Maintains natural gum contour and aesthetic facial profile',
      'Prepares a pristine, well-healed site for future implants'
    ]
  },
  {
    title: 'Bone Augmentation for Implants',
    subtitle: '3D Height & Width Expansion for Dental Implants',
    desc: 'When the jawbone has diminished over time or where the maxillary sinus has expanded, additional bone grafting is placed to create suitable width, height, and 3D conditions for permanent dental implant anchor stability.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/bone-augmentation-for-implants.webp',
    alt: 'Bone augmentation for dental implants at Jerush',
    features: [
      'Includes lateral ridge augmentation and sinus floor lifts',
      'Ensures solid primary stability for titanium implant fixtures',
      'Prevents implant thread exposure and long-term complications'
    ]
  }
];

// Section: Treatment Journey Steps (Exact 4 Steps from PDF Page 3)
const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Before Treatment',
    timeframe: 'Diagnostic Assessment',
    desc: 'The dentist examines the gums and teeth and may recommend digital dental X-rays or a 3D CBCT scan, depending on the case. Medical history, oral hygiene, gum health, and the precise amount of available bone are thoroughly evaluated.'
  },
  {
    step: '02',
    title: 'During the Procedure',
    timeframe: 'Precision Graft Placement',
    desc: 'Local anaesthesia is commonly used to ensure complete procedural comfort. The affected bone area is accessed, sanitized, and carefully filled with the selected graft material. A protective membrane and micro-stitches are placed when required.'
  },
  {
    step: '03',
    title: 'During Healing',
    timeframe: 'Biological Remodelling (3-6 Months)',
    desc: 'The grafted area is protected while your body heals and remodels the material into living native bone. Healing and maturation take time; duration varies with the procedure type, defect size, and individual biological circumstances.'
  },
  {
    step: '04',
    title: 'At Follow-Up',
    timeframe: 'Restorative Readiness',
    desc: 'The dentist checks the surgical site, monitors radiographic bone density, and assesses whether the area is ready for the next treatment stage, such as crown fabrication or permanent dental implant placement.'
  }
];

// Section: Recovery Guidelines (Exact 6 Items from PDF Page 4 - 768x768 Square Images)
const RECOVERY_GUIDELINES = [
  {
    title: 'Choose Soft Foods Initially',
    desc: 'Stick to soft, lukewarm foods (smoothies, yoghurt, broths) and strictly avoid chewing on the surgical side to prevent mechanical displacement of the graft material.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/choose-soft-foods.webp',
    alt: 'Soft foods diet during bone graft recovery'
  },
  {
    title: 'Follow Brushing Instructions',
    desc: 'Brush remaining teeth gently while carefully avoiding the immediate surgical site. Use prescribed antiseptic mouth-rinses without vigorous swishing or spitting.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/follow-the-recommended-brushing.webp',
    alt: 'Gentle dental brushing during recovery'
  },
  {
    title: 'Take Prescribed Medication',
    desc: 'Take prescribed antibiotics, anti-inflammatory pain relievers, and antiseptic medications exactly as directed to prevent infection and manage swelling.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/take-prescribed-medication.webp',
    alt: 'Prescribed medication for dental recovery'
  },
  {
    title: 'Avoid Smoking & Tobacco',
    desc: 'Strictly avoid smoking, vaping, or chewing tobacco products. Nicotine constricts blood vessels and dramatically increases graft failure and infection risk.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/avoid-smoking-or-tobacco.webp',
    alt: 'Avoid smoking during bone graft healing'
  },
  {
    title: 'Do Not Disturb the Graft Site',
    desc: 'Do not touch or probe the surgical site, stitches, or protective dressing with fingers or tongue. Avoid using straws, as suction can dislodge the stabilizing clot.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/do-not-touch-dental-graft.webp',
    alt: 'Do not touch or disturb dental graft site'
  },
  {
    title: 'Attend Follow-Up Appointments',
    desc: 'Attend all scheduled post-operative reviews so your periodontist can monitor soft tissue closure, suture absorption, and early bone integration progress.',
    image: '/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/attend-follow-up.webp',
    alt: 'Attend dental follow-up appointments at Jerush'
  }
];

// Section: Frequently Asked Questions (Exact 7 FAQs from PDF Page 5)
const FAQS = [
  {
    q: 'Is bone grafting always needed before a dental implant?',
    a: 'No. Some patients already have enough suitable bone for implant placement. A clinical assessment and appropriate 3D CBCT imaging help determine whether grafting is needed in your individual case.'
  },
  {
    q: 'Does bone grafting hurt?',
    a: 'Local anaesthesia is generally used during the procedure to ensure you feel no pain. Mild tenderness and swelling may occur afterwards and can usually be comfortably managed according to your dentist’s instructions and prescribed medications.'
  },
  {
    q: 'How long does a dental bone graft take to heal?',
    a: 'Healing varies with the graft type, the size and location of the defect, and individual health factors. While soft tissues heal within 1 to 2 weeks, mature biological bone remodelling typically requires several months before the next stage of treatment.'
  },
  {
    q: 'Is the graft material safe?',
    a: 'Dental graft materials are thoroughly sterilized and selected for their intended clinical use according to international medical standards. Your dentist will explain the material being proposed, its source, and the potential benefits relevant to your case.'
  },
  {
    q: 'Can bone grafting help with bone loss caused by gum disease?',
    a: 'It may help treat selected periodontal bone defects, particularly when the defect has features favourable for regeneration (such as deep 2- or 3-walled infra-bony pockets). It cannot reliably restore all generalized bone lost through advanced gum disease.'
  },
  {
    q: 'What happens if I do not get a recommended bone graft?',
    a: 'The consequences depend on why grafting was recommended. Without it, some treatment plans—particularly certain implant procedures—may need to be modified or may not be viable. Ask your dentist about the alternatives and risks of delaying treatment.'
  },
  {
    q: 'Can a dental implant be placed on the same day as a bone graft?',
    a: 'In selected cases where sufficient primary stability can be achieved, grafting and implant placement can be performed together. In other cases, the graft area needs to heal first. The decision depends on the amount and quality of available bone.'
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

// Related Periodontal & Implant Treatments
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
    title: 'Dental Implants & All-on-4',
    desc: 'Permanent titanium tooth root anchors planned with 3D CBCT guidance for natural lifelong function.',
    image: '/images/medical-services/dental_implants.png',
    alt: 'Dental implants and All-on-4 at Jerush',
    link: '/dental-care/prosthodontic-care/dental-implants',
    badge: 'Permanent Replacement',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
  }
];

export default function BoneGraftingPage() {
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
    document.title = 'Dental Bone Grafting for Bone Loss | Jerush';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Learn about dental bone grafting for periodontal bone defects, socket preservation and dental implant preparation. Explore treatment options and recovery at Jerush.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* ─── Breadcrumb Hero Strip ─── */}
      <PageBreadcrumbHero
        breadcrumbs={[
          { label: 'Dental Care', path: '/dental-care' },
          { label: 'Periodontal Care', path: '/dental-care/periodontal-gum-care' },
          { label: 'Bone Grafting', active: true }
        ]}
        title="Bone Grafting"
      />

      {/* ─── HERO SECTION (1st Section) ─── */}
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
                  Bone Grafting:{' '}
                  <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                    Rebuilding the Foundation That Supports Your Teeth
                  </span>
                </h1>
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  The bone surrounding your teeth plays an important role in keeping them stable.
                  Gum disease, injury and certain dental conditions can lead to bone loss, affecting
                  the support available to natural teeth.
                </p>
                <p>
                  Bone grafting is a dental procedure that uses specialised grafting material to help
                  rebuild or preserve bone in a selected area. Depending on the reason for treatment, it
                  may be recommended to address certain defects caused by periodontal disease or to
                  prepare an area for future dental implant placement.
                </p>
                <p>
                  The aim is to create a healthier, more supportive foundation where possible. The type
                  of graft, expected outcome and healing period depend on the location and extent of bone loss.
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
                  <span>Bio-Compatible Graft Framework</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brandSky shrink-0" />
                  <span>3D CBCT Guided Assessment</span>
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
                    src="/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/dental-foundation-at-jerush.webp"
                    alt="Dental bone grafting to support bone regeneration around teeth or prepare for dental implants"
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
        treatmentName="Dental Bone Grafting"
        title="Book a Bone Grafting Consultation"
        highlightWord="For Restoring Your Jaw Foundation"
        subtitle="Evaluate bone density with 3D imaging, discuss biocompatible scaffold options, and receive a personalized treatment plan from our periodontal specialists across Tamil Nadu & UAE."
        features={[
          {
            icon: ShieldCheck,
            title: 'Specialist Periodontic Care',
            desc: 'Expert clinical assessments and regenerative surgeries led by experienced periodontists.'
          },
          {
            icon: Activity,
            title: '3D CBCT Bone Diagnostics',
            desc: 'High-definition digital volumetric tomography accurately mapping defect height and width.'
          },
          {
            icon: Sparkles,
            title: 'Bio-Compatible Scaffolds',
            desc: 'Certified autograft, allograft, xenograft, and synthetic matrix frameworks for optimal healing.'
          },
          {
            icon: MapPin,
            title: '4 Regional Centres',
            desc: 'World-class hospital care available across Thuckalay, Trichy, Chennai, and UAE.'
          }
        ]}
      />

      {/* ─── 3RD SECTION: SIGNATURE COUNTER & KEY STATS BAR ─── */}
      <section className="bg-gradient-to-r from-[#0F172A] via-[#2852A3] to-[#0F172A] py-10 sm:py-12 px-4 sm:px-6 text-white shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/10 via-transparent to-transparent pointer-events-none"></div>
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

      {/* ─── SECTION: Why Does Dental Bone Loss Matter? ─── */}
      <section id="why-bone-loss" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 scroll-mt-28 sm:scroll-mt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline">
              Understanding Bone Resorption &amp; Stability
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Why Does Dental Bone Loss Matter?{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Protecting Your Foundation
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Bone loss can develop gradually, and you may not notice it in the early stages.
              As the supporting bone changes, teeth can become less stable or the jawbone may no
              longer have the shape or volume needed for a planned dental restoration.
            </p>
          </div>

          {/* 4 Clinical Situations Grid with 1:1 Aspect-Square Uncropped Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BONE_LOSS_SITUATIONS.map((sit, idx) => (
              <motion.div
                key={sit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-slate-50/80 rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-brandSky/40 transition-all flex flex-col justify-between p-4 sm:p-5 space-y-4"
              >
                {/* 1:1 Aspect Square Container ensures 768x768 images display 100% full view without cropping */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-inner">
                  <img
                    src={sit.image}
                    alt={sit.alt}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border inline-block ${sit.badgeColor}`}>
                      {sit.badge}
                    </span>
                    <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900 leading-snug">
                      {sit.title}
                    </h3>
                    <p className="text-xs font-semibold text-brandBlue uppercase tracking-wide">
                      {sit.subtitle}
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {sit.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Clinical Diagnostic Notice */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-3xl bg-sky-50/80 border border-brandSky/30 flex items-start gap-4 text-slate-700 text-sm sm:text-base leading-relaxed"
          >
            <Info className="w-5 h-5 text-brandBlue shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-900 font-headline">Clinical Evaluation First:</strong> Bone
              grafting is not necessary for every missing tooth or every case of gum disease. A comprehensive
              dental examination and appropriate 3D CBCT digital imaging at Jerush help determine whether grafting
              is genuinely likely to benefit your long-term oral health.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION: What Goes Into a Dental Bone Graft? ─── */}
      <section id="materials" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80 scroll-mt-28 sm:scroll-mt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline">
              Biological Scaffolds &amp; Regenerative Matrices
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              What Goes Into a Dental Bone Graft?{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Bio-Compatible Materials
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Bone grafting materials are selected according to the treatment goal, the size of the defect,
              and the patient's clinical needs. The material acts as an osteoconductive framework that supports
              the body's healing process; in some cases, it is gradually remodelled as new native bone forms.
            </p>
          </div>

          {/* 4 Graft Material Cards Grid - 1:1 Aspect-Square Uncropped Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GRAFT_MATERIALS.map((mat, idx) => (
              <motion.div
                key={mat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-brandSky/40 transition-all flex flex-col justify-between p-4 sm:p-5 space-y-4"
              >
                {/* 1:1 Aspect Square Container ensures full 768x768 image is displayed completely */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 shadow-inner">
                  <img
                    src={mat.image}
                    alt={mat.alt}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-brandSky/10 text-brandBlue text-[11px] font-bold uppercase tracking-wider border border-brandSky/20">
                        {mat.tag}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-lg text-slate-900 leading-snug">
                        {mat.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Origin: {mat.origin}
                      </p>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {mat.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-700">
                    {mat.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brandSky shrink-0 mt-0.5" />
                        <span className="leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Protective Barrier Membrane Card (GBR) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-700 shadow-xl relative overflow-hidden"
          >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandSky/20 border border-brandSky/30 text-brandSky text-xs font-bold uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Guided Bone Regeneration (GBR)</span>
                </div>
                <h3 className="font-headline font-bold text-xl sm:text-2xl text-white">
                  Protective Barrier Membranes in Bone Healing
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Fast-growing soft gum tissue naturally migrates into surgical pockets faster than slow-growing
                  bone cells. In selected procedures, a protective resorbable collagen membrane is placed over the
                  graft material to act as a cellular barrier, allowing bone osteoblasts to regenerate undisturbed.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-end">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-xs text-slate-200 space-y-1.5 w-full">
                  <div className="font-headline font-bold text-brandSky uppercase tracking-wider text-[11px]">
                    Membrane Options
                  </div>
                  <div>• Resorbable Porcine/Bovine Collagen</div>
                  <div>• Non-resorbable High-Density PTFE</div>
                  <div>• Complete Soft Tissue Exclusion</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION: Choosing the Right Type of Bone Grafting ─── */}
      <section id="types" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 scroll-mt-28 sm:scroll-mt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline">
              Customized Treatment Strategies
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Choosing the Right Type of Bone Grafting:{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                Tailored Approaches
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Bone grafting is not a single procedure for every situation. The approach depends on where
              bone is missing and what the treatment needs to achieve. The dentist will explain which approach,
              if any, is appropriate after assessing the area and discussing your treatment goals.
            </p>
          </div>

          {/* 3 Core Approaches Grid with 1:1 Aspect-Square Uncropped Images */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {GRAFTING_TYPES.map((type, idx) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-slate-50/80 rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-brandSky/40 transition-all flex flex-col justify-between p-5 space-y-4"
              >
                {/* 1:1 Aspect Square Container ensures full 768x768 image visibility */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-inner">
                  <img
                    src={type.image}
                    alt={type.alt}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-headline font-bold text-brandBlue uppercase tracking-wider block mb-1">
                      Approach 0{idx + 1}
                    </span>
                    <h3 className="font-headline font-bold text-lg sm:text-xl text-slate-900">
                      {type.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {type.subtitle}
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                      {type.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 space-y-1.5">
                    {type.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-brandSky shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION: Your Treatment Journey: From Assessment to Healing ─── */}
      <section id="treatment-journey" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80 scroll-mt-28 sm:scroll-mt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline">
              Step-by-Step Clinical Experience
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Your Treatment Journey:{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                From Assessment to Healing
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every bone grafting procedure at Jerush follows a meticulous, evidence-based protocol designed to
              maximize patient comfort, surgical precision, and long-term biological success.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Journey Image Card (16:9 Landscape - Perfect for 1024x576 treatment-journey.webp) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="w-full max-w-md aspect-[16/10] sm:aspect-[16/9] rounded-3xl bg-white p-3 shadow-xl border border-slate-200/90 overflow-hidden">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src="/images/medical-services/dental-care/periodontal-gum-care/bone-grafting/treatment-journey.webp"
                    alt="Dental bone grafting treatment journey at Jerush"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right: Step-by-Step Timeline Cards */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              {JOURNEY_STEPS.map((st, idx) => (
                <motion.div
                  key={st.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex items-start gap-4 hover:border-brandSky/50 transition-colors"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-brandBlue to-brandSky text-white flex items-center justify-center font-headline font-black text-sm sm:text-base shrink-0 shadow-md shadow-brandBlue/20">
                    {st.step}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-headline font-bold text-base sm:text-lg text-slate-900">
                        {st.title}
                      </h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-50 text-brandBlue font-semibold border border-sky-100">
                        {st.timeframe}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION: Recovery: What Should You Expect? ─── */}
      <section id="recovery" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 scroll-mt-28 sm:scroll-mt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-bold text-brandBlue uppercase tracking-wider block font-headline">
              Post-Surgical Care &amp; Healing Guide
            </span>
            <h2
              className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-[1.4]"
              style={{ lineHeight: 1.4 }}
            >
              Recovery:{' '}
              <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent">
                What Should You Expect?
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Some tenderness, swelling, bruising or minor bleeding may occur after surgery. Your dentist
              will give you precise post-operative instructions tailored to the grafting procedure and the specific area treated.
            </p>
          </div>

          {/* 6 Recovery Guidelines Grid with 1:1 Aspect-Square Uncropped Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECOVERY_GUIDELINES.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-slate-50/80 rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between p-4 sm:p-5 space-y-4"
              >
                {/* 1:1 Aspect Square Container ensures full 768x768 recovery image is visible without top/bottom cropping */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-inner">
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
          </div>

          {/* Emergency Warning & Realistic Outcome Notice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl bg-rose-50/80 border border-rose-200 text-rose-900 text-xs sm:text-sm leading-relaxed space-y-2"
            >
              <div className="flex items-center gap-2 font-headline font-bold text-rose-800 text-sm sm:text-base">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>When to Contact Your Dentist</span>
              </div>
              <p>
                Contact your dentist immediately if you experience worsening pain after day 3,
                increasing swelling, persistent bleeding, fever, or unexpected movement or exposure
                of the graft material or barrier membrane.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed space-y-2"
            >
              <div className="flex items-center gap-2 font-headline font-bold text-amber-800 text-sm sm:text-base">
                <Info className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Important Clinical Reality</span>
              </div>
              <p>
                Bone grafting does not guarantee 100% complete bone regeneration or future implant suitability
                in every patient. The final biological outcome depends on the original defect anatomy, the surgical technique,
                individual host healing capacity, and rigorous ongoing oral hygiene.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION: Accessible Care Across 4 Regional Centres ─── */}
      <section id="regional-centres" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 scroll-mt-28 sm:scroll-mt-36">
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
              Advanced periodontal assessments, bone grafting procedures, and dental implant foundation
              reconstructions available across Tamil Nadu &amp; UAE.
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
                className="bg-slate-50/80 rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-lg hover:border-brandSky/40 transition-all flex flex-col justify-between space-y-4"
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

      {/* ─── SECTION: Related Treatments ─── */}
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
                  Implant Treatments
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
                About Dental Bone Grafting
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Find transparent, evidence-based answers to common questions about bone graft safety, healing time, and surgical necessity.
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

      {/* ─── Final Bottom CTA Banner (Dr. I. Ajaishalu & Exact Content from PDF Page 6) ─── */}
      <TreatmentCtaBanner
        badgeText="PERIODONTIST & GUM SURGERY SPECIALIST"
        titlePrefix="Restore Your"
        highlightWord="Dental Foundation"
        titleSuffix="at Jerush"
        subtitle="Bone loss does not automatically mean that a tooth or future dental restoration is beyond treatment. Understanding the condition of the jawbone can help you make informed decisions about preserving teeth and planning appropriate restorative care. At Jerush Dentofacial & Cosmetic Laser Centre, a dental assessment can help identify the cause of bone loss and determine whether bone grafting or another treatment option may be suitable."
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
