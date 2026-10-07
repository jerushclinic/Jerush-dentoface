import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Phone, 
  Mail, 
  FileText,
  Scale
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';

const TOC_ITEMS = [
  { id: 'sec-1', label: '1. Patient Authorization & Consent' },
  { id: 'sec-2', label: '2. Diagnostic Imaging & Records' },
  { id: 'sec-3', label: '3. Inter-Centre Collaboration' },
  { id: 'sec-4', label: '4. Retention of Clinical Records' },
  { id: 'sec-5', label: '5. Financial Transparency & Costs' },
  { id: 'sec-6', label: '6. Appointments, Cancellations & Refunds' },
  { id: 'sec-7', label: '7. Patient Rights & Consent Revocation' },
  { id: 'sec-8', label: '8. Investigation Samples & Research' },
  { id: 'sec-9', label: '9. Digital Portals & Tele-Consultations' },
  { id: 'sec-10', label: '10. Grievance Redressal & Jurisdiction' },
  { id: 'sec-11', label: '11. Formal Acceptance of Terms' },
];

export default function TermsConditionsPage() {
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
        title="Terms & Conditions: Clinical Authorization & Service Agreement" 
        breadcrumbs={[
          { label: 'About Jerush', path: '/about' },
          { label: 'Terms & Conditions', active: true }
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
                Terms & Conditions: Clinical Authorization & Patient Agreement
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Authorizations for Medical Investigations, Surgical Procedures, Treatment Plans and Financial Settlements
              </p>
            </div>
          </div>

          {/* Document Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-xs">
            <div className="space-y-0.5">
              <span className="text-slate-400 uppercase tracking-wider font-semibold block text-[10px]">Document Ref</span>
              <span className="font-mono font-bold text-slate-800">JER-LEGAL-TC-2026</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 uppercase tracking-wider font-semibold block text-[10px]">Effective Date</span>
              <span className="font-semibold text-slate-800">28 September 2026</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 uppercase tracking-wider font-semibold block text-[10px]">Applicable Centres</span>
              <span className="font-semibold text-slate-800">Tamil Nadu (India) & Dubai (UAE)</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 uppercase tracking-wider font-semibold block text-[10px]">Patient Help Desk</span>
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
              <span>Agreement Index</span>
              <span className="text-slate-400 text-[10px] lowercase font-normal">11 clauses</span>
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
                <Scale className="w-3.5 h-3.5 text-brandBlue" />
                <span>Legal Enforceability</span>
              </div>
              <p className="leading-relaxed">
                Applies to all registered patients, legal guardians, and digital portal users of Jerush Groups and Hospitals.
              </p>
            </div>
          </aside>

          {/* Main Document Body */}
          <main className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12 space-y-12 leading-relaxed text-slate-700 text-sm sm:text-[15px]">

            {/* ─── CLAUSE 1 ─── */}
            <section id="sec-1" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 1</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  1. Patient Authorization & Informed Consent for Care
                </h2>
              </div>
              <p>
                I/We hereby authorize <strong>Jerush Groups and Hospitals</strong> (encompassing Jerush Dentofacial & Cosmetic Laser Centre, its subsidiary clinics, specialist surgeons, consultant physicians, anesthetists, and allied medical personnel) to collect, process, and retain relevant personal, medical, and diagnostic data necessary for delivering safe healthcare services.
              </p>
              <p>
                I understand that this information may encompass, but is not limited to: personal demographics, national identification details, emergency contacts, dental and medical histories, previous surgical records, systemic health parameters, known drug allergies, insurance coverage documentation, and financial transaction histories.
              </p>
              <div className="p-4 bg-slate-50 border-l-4 border-brandBlue rounded-r-xl text-xs sm:text-sm text-slate-700 space-y-1">
                <p className="font-semibold text-slate-900">Purposes of Data Processing:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 mt-1">
                  <li>Registration and unified Electronic Health Record (EHR) maintenance across all Jerush centres;</li>
                  <li>Formulation, execution, and monitoring of surgical, orthodontic, aesthetic, and dental treatment regimens;</li>
                  <li>Transmission of appointment schedules, treatment progress reminders, and critical post-operative home instructions;</li>
                  <li>Internal clinical audit, hospital accreditation adherence, and healthcare quality assurance;</li>
                  <li>Statutory compliance with health authorities in India (DCI/MoHFW) and the UAE (DHA/MOHAP).</li>
                </ul>
              </div>
            </section>

            {/* ─── CLAUSE 2 ─── */}
            <section id="sec-2" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 2</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  2. Diagnostic Investigations & 3D Imaging Records
                </h2>
              </div>
              <p>
                Precise diagnosis is foundational to maxillofacial surgery, advanced dental implantology, and cosmetic dermatology. I authorize Jerush clinicians to perform necessary clinical investigations, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li><strong>Radiographic & Digital Scans:</strong> 3D Cone Beam Computed Tomography (CBCT), Digital Orthopantomograms (OPG), Lateral Cephalometric radiographs, and intra-oral digital optical scans (e.g. for Jerushaligne clear aligners);</li>
                <li><strong>Clinical Diagnostic Photography:</strong> Standardized high-resolution pre-operative, intra-operative, and post-operative photographic documentation;</li>
                <li><strong>Laboratory Investigations:</strong> Complete blood profiles, coagulation screening, fasting glycemic panels, and tissue pathology biopsies where clinically indicated.</li>
              </ul>
              <p className="text-xs sm:text-sm">
                Diagnostic scans and radiographs remain a permanent component of the patient's hospital record. Certified digital copies can be obtained upon formal request through our Patient Care Desk.
              </p>
            </section>

            {/* ─── CLAUSE 3 ─── */}
            <section id="sec-3" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 3</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  3. Inter-Centre Collaboration & Authorized Data Sharing
                </h2>
              </div>
              <p>
                To deliver unified multi-specialty care, I consent to the secure transfer and review of my diagnostic data across Jerush regional centres:
              </p>
              <div className="space-y-3 text-xs sm:text-sm">
                <p>
                  <strong>3.1 Regional Centre Integration:</strong> Clinicians collaborating across our Thuckalay headquarters, Adyar (Chennai), Thenur (Trichy), and Fujairah/Dubai (UAE) centres are authorized to access unified clinical charts to ensure continuity of treatment.
                </p>
                <p>
                  <strong>3.2 Certified Dental & Pathology Laboratories:</strong> Authorized data may be transferred to accredited dental milling laboratories (for CAD/CAM custom zirconia abutments, prostheses, and 3D printed surgical guides) and pathology labs under strict non-disclosure obligations.
                </p>
                <p>
                  <strong>3.3 No Commercial Data Sale:</strong> Jerush Groups and Hospitals unconditionally affirms that patient records are never sold, rented, or leased to third-party commercial marketing entities or pharmaceutical agencies.
                </p>
              </div>
            </section>

            {/* ─── CLAUSE 4 ─── */}
            <section id="sec-4" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 4</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  4. Retention & Archiving of Clinical Records
                </h2>
              </div>
              <p>
                Jerush Groups and Hospitals retains patient health records in accordance with statutory medical guidelines:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>Adult clinical records, surgical operative logs, and diagnostic scans are preserved for a statutory minimum of 7 years from the last treatment encounter;</li>
                <li>Paediatric records are maintained until the patient attains 21 years of age, or for 7 years post-treatment, whichever is longer;</li>
                <li>Digital records are stored within ISO-compliant, 256-bit encrypted hospital servers equipped with multi-factor authentication and role-based staff permissions.</li>
              </ul>
            </section>

            {/* ─── CLAUSE 5 ─── */}
            <section id="sec-5" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 5</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  5. Financial Transparency, Estimates & Payment Protocols
                </h2>
              </div>
              <p>
                Jerush upholds absolute pricing integrity:
              </p>
              <div className="space-y-3 text-xs sm:text-sm">
                <p>
                  <strong>5.1 Written Treatment Estimates:</strong> Before initiating non-emergency elective procedures (such as dental implants, orthognathic surgery, full-mouth restorations, or laser resurfacing cycles), patients receive a comprehensive, itemized cost estimate.
                </p>
                <p>
                  <strong>5.2 Milestone-Based Payments:</strong> Multi-phase treatments adhere to scheduled payment milestones. Invoices reflect transparent breakdowns of professional surgical fees, biocompatible hardware costs, anaesthesia charges, and laboratory fabrication expenses.
                </p>
                <p>
                  <strong>5.3 Insurance Pre-Authorization:</strong> Where corporate health insurance or cashless dental plans apply, patients must present valid credentials prior to treatment initiation. Uncovered expenses remain the patient's responsibility.
                </p>
              </div>
            </section>

            {/* ─── CLAUSE 6 ─── */}
            <section id="sec-6" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 6</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  6. Appointments, Cancellations & Refund Rules
                </h2>
              </div>
              <p className="text-xs sm:text-sm">
                To respect surgical theatre scheduling and specialist doctor allocations, patients are requested to observe our cancellation policy:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li><strong>Rescheduling Notice:</strong> Routine consultations and minor procedures must be rescheduled at least 24 hours prior to the appointed time.</li>
                <li><strong>Major Surgical Procedures:</strong> Operating room reservations (e.g. general anaesthesia orthognathic surgery or full-arch implant rehabilitations) require at least 48 hours notice.</li>
                <li><strong>Advance Custom Prosthetics:</strong> Custom-fabricated hardware (e.g. personalized Jerushaligne aligner series or milled zirconia frameworks) that have entered laboratory fabrication are non-refundable once milling has commenced.</li>
              </ul>
            </section>

            {/* ─── CLAUSE 7 ─── */}
            <section id="sec-7" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 7</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  7. Patient Rights & Consent Revocation
                </h2>
              </div>
              <p className="text-xs sm:text-sm">
                As a patient of Jerush Groups and Hospitals, you are legally entitled to:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm">
                <li><strong>Right to Full Disclosure:</strong> Clear explanations regarding your clinical diagnosis, procedural alternatives, potential surgical risks, and recovery expectations in your preferred language;</li>
                <li><strong>Right to Second Opinions:</strong> Prompt provision of diagnostic CBCT scans and treatment notes for external consultation;</li>
                <li><strong>Right to Withhold Non-Essential Data:</strong> You may decline non-vital marketing notices or optional feedback surveys;</li>
                <li><strong>Consent Revocation:</strong> You may withdraw consent for data processing by written notice to our Patient Care Desk, subject to statutory medical retention obligations.</li>
              </ol>
            </section>

            {/* ─── CLAUSE 8 ─── */}
            <section id="sec-8" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 8</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  8. Investigation Samples & Academic Research
                </h2>
              </div>
              <p className="text-xs sm:text-sm">
                Diagnostic tissue specimens (e.g. biopsied oral lesions) are obtained strictly for pathological diagnosis. Any residual sample or anonymized radiographic series may be utilized by Jerush clinical faculty for academic education, surgical conferences, or scientific journals strictly in a de-identified format where personal identity is completely concealed.
              </p>
              <p className="text-xs sm:text-sm">
                Patients maintain the absolute right to opt out of academic/research use of de-identified data at any time without compromising their access to clinical care.
              </p>
            </section>

            {/* ─── CLAUSE 9 ─── */}
            <section id="sec-9" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 9</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  9. Digital Portals, Website Use & Tele-Consultations
                </h2>
              </div>
              <p className="text-xs sm:text-sm">
                When using www.jerushdentoface.com or our remote tele-consultation channels:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>Information provided via website inquiry forms must be accurate and truthful;</li>
                <li>Online preliminary evaluations represent advisory screenings and cannot substitute for an in-person physical clinical examination and tactile palpation;</li>
                <li>Jerush digital assets, articles, procedural graphics, and trademarked names (including Jerushaligne) are protected intellectual property and may not be reproduced without written permission.</li>
              </ul>
            </section>

            {/* ─── CLAUSE 10 ─── */}
            <section id="sec-10" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 10</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  10. Grievance Redressal, Governing Law & Jurisdiction
                </h2>
              </div>
              <p className="text-xs sm:text-sm">
                Inquiries, grievances, or formal concerns regarding clinical services, billing, or patient records should be directed to our designated Patient Grievance Officer:
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-1.5">
                <p className="font-bold text-slate-900">Patient Relations & Grievance Desk</p>
                <p className="text-slate-600">Jerush Groups and Hospitals (Jerush Dentofacial & Cosmetic Laser Centre)</p>
                <p className="text-slate-600">Central Inquiries: <a href="mailto:enquiry@jerushdentoface.com" className="text-brandBlue font-semibold hover:underline">enquiry@jerushdentoface.com</a></p>
                <p className="text-slate-600">Helpline: <a href="tel:+919489160055" className="text-brandBlue font-semibold hover:underline">+91 94891 60055</a> / <a href="tel:+919489160000" className="text-brandBlue font-semibold hover:underline">+91 94891 60000</a></p>
                <p className="text-slate-600">Headquarters Address: Near Bus Stand, Brammapuram South, Thuckalay, Tamil Nadu – 629175, India.</p>
              </div>
              <p className="text-xs text-slate-500 pt-1">
                Any legal dispute arising under this agreement shall be governed by the laws of India and subject to the exclusive jurisdiction of the competent courts in Kanyakumari District / Tamil Nadu. For UAE clinical operations, local health authority arbitration rules shall apply.
              </p>
            </section>

            {/* ─── CLAUSE 11 ─── */}
            <section id="sec-11" className="scroll-mt-28 space-y-4 pt-6 border-t border-slate-200">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 11</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  11. Formal Acceptance of Terms
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-700">
                By registering as a patient, booking a consultation online, signing a digital or physical clinical consent form, or entering any Jerush hospital facility, the patient (or authorized caregiver/legal guardian) confirms that they have read, understood, and consented to these Terms & Conditions.
              </p>
              <div className="pt-4 text-center text-xs text-slate-400">
                Jerush Groups and Hospitals • All rights reserved • Document Ref: JER-LEGAL-TC-2026
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
        titleSuffix="& Patient Rights"
        subtitle="Have questions regarding our hospital authorization terms, itemized estimates, or medical records? Contact our patient care team today."
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
