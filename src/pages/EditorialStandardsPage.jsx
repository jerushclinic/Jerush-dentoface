import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  ExternalLink 
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';

const TOC_ITEMS = [
  { id: 'sec-1', label: '1. Executive Statement & Scope' },
  { id: 'sec-2', label: '2. Core Principles of Medical Publishing' },
  { id: 'sec-3', label: '3. Clinical Specialties & Oversight' },
  { id: 'sec-4', label: '4. Six-Stage Editorial Lifecycle' },
  { id: 'sec-5', label: '5. Medical Review Board Governance' },
  { id: 'sec-6', label: '6. Photographic & Radiographic Integrity' },
  { id: 'sec-7', label: '7. Medical Claims & Ethical Boundaries' },
  { id: 'sec-8', label: '8. Artificial Intelligence (AI) Policy' },
  { id: 'sec-9', label: '9. Corrections, User Feedback & SLA' },
  { id: 'sec-10', label: '10. Emergency Maxillofacial Protocol' },
  { id: 'sec-11', label: '11. Document Administration & Approvals' },
];

export default function EditorialStandardsPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(TOC_ITEMS[0].id);
  const isManualScrollingRef = useRef(false);
  const manualTimeoutRef = useRef(null);

  // Dynamic Scroll Spy: Detect whichever section is currently at the top of the viewport
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isManualScrollingRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const triggerThreshold = 140; // Pixels from viewport top
          let currentSectionId = TOC_ITEMS[0].id;

          for (let i = 0; i < TOC_ITEMS.length; i++) {
            const el = document.getElementById(TOC_ITEMS[i].id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= triggerThreshold) {
                currentSectionId = TOC_ITEMS[i].id;
              }
            }
          }

          // If reached near bottom of page (footer / CTA area), activate last tab
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 180) {
            currentSectionId = TOC_ITEMS[TOC_ITEMS.length - 1].id;
          }

          setActiveSection(prev => (prev !== currentSectionId ? currentSectionId : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    };
  }, []);

  const handleBookClick = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTo = (id) => {
    setActiveSection(id);
    isManualScrollingRef.current = true;
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    manualTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 800);

    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] font-body text-slate-800 text-left relative pt-0">
      {/* ─── Breadcrumb Hero ─── */}
      <PageBreadcrumbHero 
        title="Clinical Editorial & Medical Publishing Standards" 
        breadcrumbs={[
          { label: 'About Jerush', path: '/about' },
          { label: 'Editorial Standards', active: true }
        ]} 
      />

      {/* ─── Main Document Canvas ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

        {/* ─── Document Header Sheet ─── */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 mb-8">
          <div className="pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brandBlue mb-1 font-headline">
                <Building2 className="w-4 h-4 text-brandSky" />
                <span>Jerush Groups and Hospitals</span>
              </div>
              <h1 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
                Clinical Editorial & Medical Publishing Standards
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Official Clinical Content Governance, Medical Fact-Checking & Integrity Protocols
              </p>
            </div>
          </div>

          {/* Document Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-xs">
            <div className="space-y-0.5">
              <span className="text-slate-400 uppercase tracking-wider font-semibold block text-[10px]">Doc Reference</span>
              <span className="font-mono font-bold text-slate-800">JER-CLIN-PUB-2026</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 uppercase tracking-wider font-semibold block text-[10px]">Effective Date</span>
              <span className="font-semibold text-slate-800">28 September 2026</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 uppercase tracking-wider font-semibold block text-[10px]">Review Frequency</span>
              <span className="font-semibold text-slate-800">Annual Audit (Bi-Yearly Checks)</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 uppercase tracking-wider font-semibold block text-[10px]">Inquiries & Escalation</span>
              <a href="mailto:enquiry@jerushdentoface.com" className="font-semibold text-brandBlue hover:underline break-all sm:break-normal">
                enquiry@jerushdentoface.com
              </a>
            </div>
          </div>
        </div>

        {/* ─── Document Layout (Sidebar TOC + Document Body) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Sticky Left Sidebar: Table of Contents */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 text-xs">
            <h3 className="font-headline font-bold text-slate-900 uppercase tracking-wider text-xs mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Document Index</span>
              <span className="text-slate-400 text-[10px] lowercase font-normal">11 sections</span>
            </h3>
            <nav className="space-y-1">
              {TOC_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all duration-150 leading-snug flex items-center justify-between group ${
                    activeSection === item.id
                      ? 'bg-brandBlue/10 text-brandBlue font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  <span className={`text-[10px] transition-transform ${activeSection === item.id ? 'text-brandBlue font-bold' : 'text-slate-300 group-hover:text-slate-400'}`}>
                    &rarr;
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Hospital Policy</span>
              </div>
              <p className="leading-relaxed">
                Governed by the Medical & Surgical Review Committee across Jerush Regional Centres in Tamil Nadu and the UAE.
              </p>
            </div>
          </aside>

          {/* Main Document Body */}
          <main className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12 space-y-12 leading-relaxed text-slate-700 text-sm sm:text-[15px]">

            {/* ─── SECTION 1 ─── */}
            <section id="sec-1" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Section 1</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  1. Executive Statement & Purpose
                </h2>
              </div>
              <p>
                At <strong>Jerush Groups and Hospitals</strong> (operating as Jerush Dentofacial & Cosmetic Laser Centre across Tamil Nadu, India, and Dubai, UAE), we hold that patient-facing medical information must reflect the exact same rigorous scientific discipline and ethical responsibility practiced in our operating suites and clinical rooms.
              </p>
              <p>
                The primary purpose of this Editorial Policy is to formalize the strict clinical methodologies, peer-review mechanisms, photographic authenticity standards, and ethical publishing safeguards governing all health content published across our digital properties, patient guides, educational brochures, and procedure roadmaps.
              </p>
              <div className="p-4 bg-slate-50 border-l-4 border-brandBlue rounded-r-xl text-xs sm:text-sm text-slate-700 space-y-1">
                <p className="font-semibold text-slate-900">1.1 Scope of Policy Application</p>
                <p>
                  This policy applies to all clinical descriptions of oral and maxillofacial surgeries, dental implant procedures, orthodontics (including Jerushaligne clear aligners), cosmetic laser resurfacing, hair restoration (GFC/PRP), facial trauma care, post-operative guides, cost estimates, and doctor profile publications across all Jerush branches.
                </p>
              </div>
            </section>

            {/* ─── SECTION 2 ─── */}
            <section id="sec-2" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Section 2</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  2. Core Principles of Medical Publishing
                </h2>
              </div>
              <p>
                Every published article, procedural breakdown, and educational video is developed and maintained in strict compliance with six core tenets:
              </p>
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <strong>Specialist Clinical Authorship & Peer-Review:</strong> No health guidance is authored or published anonymously. Every clinical claim is evaluated by a board-certified specialist doctor whose active clinical scope encompasses the topic.
                </li>
                <li>
                  <strong>Evidence-Based Practice Grounding:</strong> Content is sourced from recognized medical and dental guidelines, indexed peer-reviewed scientific literature (PubMed, British Dental Journal, Journal of Oral & Maxillofacial Surgery, JAAD), and regulatory bodies including the Dental Council of India (DCI), CDSCO, and UAE Ministry of Health and Prevention (MOHAP).
                </li>
                <li>
                  <strong>Ethical Realism over Commercial Exaggeration:</strong> We prohibit misleading or sensational claims. We transparently outline realistic recovery timetables, post-surgical swelling patterns, biological healing variables, and clinical limitations.
                </li>
                <li>
                  <strong>Patient Autonomy & Informed Decision-Making:</strong> Content is designed to empower meaningful patient-clinician conversations. Information presented never replaces an in-person clinical examination, 3D CBCT diagnostic imaging, or vital medical history evaluation.
                </li>
                <li>
                  <strong>Complete Commercial Neutrality:</strong> Recommendations, surgical materials, and equipment discussions are driven solely by clinical indications. No pharmaceutical company, dental implant manufacturer, or laser device vendor is permitted to dictate our content.
                </li>
                <li>
                  <strong>Proactive Surveillance & Timely Revision:</strong> As surgical protocols, pharmacology, and medical technology evolve, our digital library undergoes scheduled reviews with public timestamping.
                </li>
              </ol>
            </section>

            {/* ─── SECTION 3 ─── */}
            <section id="sec-3" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Section 3</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  3. Clinical Specialties & Editorial Oversight
                </h2>
              </div>
              <p>
                Jerush Groups operates specialized Centres of Excellence. Our editorial standards are categorized into specialized clinical divisions with designated departmental reviewers:
              </p>
              <ul className="space-y-3 pl-2">
                <li className="p-3 bg-slate-50/80 rounded-xl border border-slate-150">
                  <strong className="text-slate-900 block font-headline text-sm">Oral & Maxillofacial Surgery:</strong>
                  <span className="text-xs text-slate-600 block mt-0.5">
                    Covers orthognathic corrective jaw surgery, facial trauma reconstruction, TMJ management, cyst and tumour pathology, and surgical impactions. Reviewed by board-certified Maxillofacial Surgeons (MDS).
                  </span>
                </li>
                <li className="p-3 bg-slate-50/80 rounded-xl border border-slate-150">
                  <strong className="text-slate-900 block font-headline text-sm">Advanced Dental Implantology:</strong>
                  <span className="text-xs text-slate-600 block mt-0.5">
                    Covers immediate loading basal and cortical implants, zygomatic and pterygoid solutions, full-mouth All-on-4/All-on-6 rehabilitations, and guided bone regeneration. Reviewed by Senior Implantologists.
                  </span>
                </li>
                <li className="p-3 bg-slate-50/80 rounded-xl border border-slate-150">
                  <strong className="text-slate-900 block font-headline text-sm">Orthodontics & Clear Aligners:</strong>
                  <span className="text-xs text-slate-600 block mt-0.5">
                    Covers Jerushaligne digital clear aligner biomechanics, self-ligating braces, and interceptive orthodontic protocols. Reviewed by Consultant Orthodontists.
                  </span>
                </li>
                <li className="p-3 bg-slate-50/80 rounded-xl border border-slate-150">
                  <strong className="text-slate-900 block font-headline text-sm">Cosmetic Dermatology & Laser Medicine:</strong>
                  <span className="text-xs text-slate-600 block mt-0.5">
                    Covers fractional CO₂ laser skin resurfacing, acne scar subcision, Q-switched Nd:YAG laser toning, and non-surgical facial aesthetics. Reviewed by Cosmetic Laser Specialists & Dermatologists.
                  </span>
                </li>
                <li className="p-3 bg-slate-50/80 rounded-xl border border-slate-150">
                  <strong className="text-slate-900 block font-headline text-sm">Regenerative Medicine & Hair Restoration:</strong>
                  <span className="text-xs text-slate-600 block mt-0.5">
                    Covers autologous Growth Factor Concentrate (GFC) therapy, Bio-FUE transplantation techniques, and scalp biostimulation. Reviewed by Regenerative Medicine Faculty.
                  </span>
                </li>
              </ul>
            </section>

            {/* ─── SECTION 4 ─── */}
            <section id="sec-4" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Section 4</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  4. The Six-Stage Editorial Lifecycle
                </h2>
              </div>
              <p>
                To maintain clinical fidelity, all patient guides and published literature follow a sequential six-stage verification lifecycle before receiving digital clearance:
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 items-start">
                  <span className="w-7 h-7 rounded-lg bg-brandBlue text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 font-headline">1</span>
                  <div>
                    <strong className="text-slate-900 text-sm block">Clinical Need Identification:</strong>
                    <span className="text-xs text-slate-600">Topics are prioritized based on frequent patient consultation questions, emerging surgical innovations, and public misconceptions regarding facial procedures.</span>
                  </div>
                </div>
                <div className="flex gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 items-start">
                  <span className="w-7 h-7 rounded-lg bg-brandBlue text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 font-headline">2</span>
                  <div>
                    <strong className="text-slate-900 text-sm block">Literature Review & Evidence Synthesis:</strong>
                    <span className="text-xs text-slate-600">Medical literature is analyzed from indexed clinical repositories. Low-powered, unverified, or commercially funded single-study claims are systematically excluded.</span>
                  </div>
                </div>
                <div className="flex gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 items-start">
                  <span className="w-7 h-7 rounded-lg bg-brandBlue text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 font-headline">3</span>
                  <div>
                    <strong className="text-slate-900 text-sm block">Structured Medical Drafting:</strong>
                    <span className="text-xs text-slate-600">Information is drafted in clear, dignified, and patient-comprehensible language without diluting surgical precision or glossing over safety warnings.</span>
                  </div>
                </div>
                <div className="flex gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 items-start">
                  <span className="w-7 h-7 rounded-lg bg-brandBlue text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 font-headline">4</span>
                  <div>
                    <strong className="text-slate-900 text-sm block">Consultant Peer-Review & Clinical Sign-Off:</strong>
                    <span className="text-xs text-slate-600">A qualified consultant physician or surgeon verifies technical statements, candidacy criteria, contraindications, anesthesia safety, and regional healthcare nuances.</span>
                  </div>
                </div>
                <div className="flex gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 items-start">
                  <span className="w-7 h-7 rounded-lg bg-brandBlue text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 font-headline">5</span>
                  <div>
                    <strong className="text-slate-900 text-sm block">Regulatory & Accessibility Verification:</strong>
                    <span className="text-xs text-slate-600">Ensures full alignment with Indian Medical Council / Dental Council ethical guidelines, patient privacy provisions, and web accessibility standards.</span>
                  </div>
                </div>
                <div className="flex gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 items-start">
                  <span className="w-7 h-7 rounded-lg bg-brandBlue text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 font-headline">6</span>
                  <div>
                    <strong className="text-slate-900 text-sm block">Post-Publication Surveillance & Timestamping:</strong>
                    <span className="text-xs text-slate-600">Articles are placed into scheduled annual review cycles. Significant clinical breakthroughs or revised pharmacovigilance alerts trigger immediate expedited updates.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── SECTION 5 ─── */}
            <section id="sec-5" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Section 5</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  5. Medical Review Board Governance & Bylines
                </h2>
              </div>
              <p>
                Transparency of authorship is fundamental to health communication trust. All clinically substantive content published on Jerush platforms displays verified contributor details:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li><strong>Reviewing Clinician Name & Designation:</strong> Clearly naming the specialist doctor responsible for clinical accuracy.</li>
                <li><strong>Medical Qualifications & Board Affiliations:</strong> Detailing relevant postgraduate degrees (e.g. MDS, Fellowship in Implantology, DNB) and regulatory registrations.</li>
                <li><strong>Date of Last Medical Review:</strong> Transparently showing when the medical content was last audited against current clinical guidelines.</li>
              </ul>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <em>Note on Authorship Accountability:</em> A medical review stamp signifies that the content has undergone thorough clinical scrutiny. It does not establish a formal doctor-patient relationship, nor does it guarantee that a specific surgical intervention is universally suitable for every reader.
              </div>
            </section>

            {/* ─── SECTION 6 ─── */}
            <section id="sec-6" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Section 6</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  6. Photographic & Radiographic Integrity
                </h2>
              </div>
              <p>
                Visual documentation is central to patient education in dentistry and aesthetic laser medicine. Jerush enforces strict forensic rules across all before-and-after cases and radiological displays:
              </p>
              <div className="space-y-3 text-xs sm:text-sm">
                <p>
                  <strong>6.1 Zero Digital Manipulation:</strong> We explicitly prohibit skin-smoothing filters, Photoshop touch-ups, digital tooth whitening, or lighting adjustments designed to artificially enhance clinical outcomes. What you see is authentic clinical documentation.
                </p>
                <p>
                  <strong>6.2 Documented Patient Authorization:</strong> Every clinical image, smile transformation photo, or video testimonial is published exclusively after obtaining signed, informed, voluntary patient consent in compliance with healthcare data privacy laws.
                </p>
                <p>
                  <strong>6.3 Standardized Photographic Parameters:</strong> Comparative clinical imagery must maintain standardized patient head positioning, uniform intra-oral cross-polarized lighting, and identical focal lengths between pre-operative and post-operative records.
                </p>
              </div>
            </section>

            {/* ─── SECTION 7 ─── */}
            <section id="sec-7" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Section 7</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  7. Medical Claims & Ethical Boundaries
                </h2>
              </div>
              <p>
                Biological healing and surgical outcomes vary based on bone density, systemic wellness, smoking habits, and oral hygiene adherence. Jerush firmly repudiates commercial healthcare gimmickry:
              </p>
              <div className="p-4 bg-rose-50/80 border border-rose-200 rounded-xl space-y-2">
                <h4 className="font-headline font-bold text-rose-900 text-xs sm:text-sm uppercase tracking-wide">
                  Prohibited Marketing Superlatives
                </h4>
                <ul className="list-disc pl-5 text-xs text-rose-800 space-y-1">
                  <li>"100% Guaranteed Success" or "Zero-Failure Implant Guarantee"</li>
                  <li>"Completely Pain-Free Surgery with No Discomfort"</li>
                  <li>"Permanent Instant Cure for Scarring or Alopecia"</li>
                  <li>"Zero Downtime Surgical Results"</li>
                </ul>
              </div>
              <p className="text-xs sm:text-sm">
                In contrast, Jerush editorial content mandates proactive explanations of anticipated recovery timelines (e.g. 5–7 days of peeling following deep fractional CO₂ laser), known biological risks (e.g. temporary nerve tingling, post-operative oedema), and realistic alternative care pathways.
              </p>
            </section>

            {/* ─── SECTION 8 ─── */}
            <section id="sec-8" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Section 8</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  8. Artificial Intelligence (AI) Policy & Human Accountability
                </h2>
              </div>
              <p>
                While digital research and assistive computing tools may support administrative structuring, human clinical accountability remains absolute across Jerush Groups:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li><strong>No AI Authorship:</strong> Generative AI tools are never listed as authors, co-authors, or reviewers. A named, licensed physician is solely responsible for every clinical sentence published.</li>
                <li><strong>Manual Citation Authentication:</strong> All scientific studies, drug dosage references, and pharmacological warnings generated during drafting are manually checked against original peer-reviewed indices to eliminate synthetic hallucinations.</li>
                <li><strong>Confidentiality Protection:</strong> Patient identifiable information or private clinical scans are never input into public AI models or non-HIPAA/non-secure third-party tools.</li>
              </ul>
            </section>

            {/* ─── SECTION 9 ─── */}
            <section id="sec-9" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Section 9</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  9. Public Corrections, User Feedback & 48-Hour SLA
                </h2>
              </div>
              <p>
                We welcome scholarly critique and public vigilance. If you identify a factual discrepancy, ambiguous explanation, or outdated guideline reference on our website, we guarantee a swift, transparent review:
              </p>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-2">
                <p className="font-bold text-slate-900">Our 48-Hour Fact-Check SLA Protocol:</p>
                <ol className="list-decimal pl-5 space-y-1 text-slate-600">
                  <li><strong>Triage within 12 Hours:</strong> The submission is logged with the Clinical Governance Secretariat.</li>
                  <li><strong>Specialist Audit within 36 Hours:</strong> The reviewing consultant cross-examines the flagged claim against active peer-reviewed evidence.</li>
                  <li><strong>Public Rectification within 48 Hours:</strong> If validated, the article is amended immediately with an explicit, timestamped revision note.</li>
                </ol>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-1.5 mt-4">
                <p className="font-bold text-slate-900">How to Submit an Editorial Inaccuracy or Feedback Report:</p>
                <p className="text-slate-600">
                  To report a factual discrepancy, citation clarification, or medical ambiguity, please contact our Clinical Governance Secretariat directly:
                </p>
                <div className="space-y-1 pt-1 text-slate-700">
                  <p>
                    <strong>Official Email:</strong>{' '}
                    <a href="mailto:enquiry@jerushdentoface.com" className="text-brandBlue font-semibold hover:underline">
                      enquiry@jerushdentoface.com
                    </a>
                  </p>
                  <p>
                    <strong>Helpline Desk:</strong>{' '}
                    <a href="tel:+919489160055" className="text-brandBlue font-semibold hover:underline">
                      +91 94891 60055
                    </a>{' '}
                    /{' '}
                    <a href="tel:+919489160000" className="text-brandBlue font-semibold hover:underline">
                      +91 94891 60000
                    </a>
                  </p>
                </div>
                <p className="text-slate-500 text-[11px] pt-1">
                  Please cite the article URL and the specific passage requiring clinical audit. All submissions receive priority review within our 48-hour SLA protocol.
                </p>
              </div>
            </section>

            {/* ─── SECTION 10 ─── */}
            <section id="sec-10" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 font-headline">Section 10</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  10. Emergency Maxillofacial & Dental Advisory
                </h2>
              </div>
              <div className="p-4 bg-rose-50 border-l-4 border-rose-600 rounded-r-xl space-y-2 text-xs sm:text-sm text-rose-950">
                <p className="font-bold flex items-center gap-1.5 text-rose-900">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  DO NOT USE WEBSITE GUIDES FOR ACUTE SURGICAL EMERGENCIES
                </p>
                <p>
                  If you or a patient in your care is experiencing acute facial bone fractures, severe uncontrolled oral bleeding, airway compromise, or deep facial space infections (such as Ludwig's angina), immediately seek in-person emergency hospital care.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-rose-900">
                  <span>24/7 Emergency Trauma Desk: <a href="tel:+919489160055" className="underline font-bold text-rose-700">+91 94891 60055</a></span>
                  <span>•</span>
                  <span>Headquarters Centre: Thuckalay, Kanyakumari District, Tamil Nadu</span>
                </div>
              </div>
            </section>

            {/* ─── SECTION 11 ─── */}
            <section id="sec-11" className="scroll-mt-28 space-y-4 pt-6 border-t border-slate-200">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Section 11</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  11. Document Administration & Approvals
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                This document represents the official published policy of Jerush Groups and Hospitals and supersedes all prior editorial guidelines.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Executive Review</span>
                  <span className="font-bold text-slate-900 block">Dr. A. Prabin</span>
                  <span className="text-slate-600 text-[11px] block">Chief Executive Officer</span>
                  <span className="text-slate-500 text-[10px] block mt-1">Jerush Groups and Hospitals</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Clinical Governance</span>
                  <span className="font-bold text-slate-900 block">Dr. A. Bladbin, MDS</span>
                  <span className="text-slate-600 text-[11px] block">Chairman & Senior Maxillofacial Surgeon</span>
                  <span className="text-slate-500 text-[10px] block mt-1">Jerush Dentofacial & Cosmetic Laser Centre</span>
                </div>
              </div>

              <div className="pt-4 text-center text-xs text-slate-400">
                For administrative inquiries: <a href="mailto:enquiry@jerushdentoface.com" className="text-brandBlue font-semibold hover:underline">enquiry@jerushdentoface.com</a> • Thuckalay • Chennai • Trichy • Dubai
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* ─── BOTTOM CTA BANNER (Unified Dark Navy Format) ─── */}
      <TreatmentCtaBanner
        badgeText="Chief Executive Officer"
        titlePrefix="Committed to"
        highlightWord="Clinical Transparency"
        titleSuffix="& Honest Care"
        subtitle="Have questions regarding our medical guidelines, diagnostic scans, or individualized treatment plans? Our clinical coordinators are here to assist."
        primaryBtnText="Consult a Specialist"
        onPrimaryClick={handleBookClick}
        secondaryBtnText="Call Support Helpline"
        secondaryBtnPhone="+919489160055"
        doctorImage="/images/adminstration/prabin-chief-executive-officer.webp"
        doctorName="DR. A. PRABIN"
        doctorRole="Chief Executive Officer"
        doctorAlt="DR. A. PRABIN - Chief Executive Officer, Jerush Groups"
        imageFit="cover"
      />
    </div>
  );
}
