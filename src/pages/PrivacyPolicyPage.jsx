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
  Lock,
  Eye,
  Server
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';

const TOC_ITEMS = [
  { id: 'sec-1', label: '1. Executive Privacy Commitment' },
  { id: 'sec-2', label: '2. Personal & Health Data Collected' },
  { id: 'sec-3', label: '3. Methods of Data Collection' },
  { id: 'sec-4', label: '4. Purposes & Legal Grounds' },
  { id: 'sec-5', label: '5. Inter-Centre & Third-Party Sharing' },
  { id: 'sec-6', label: '6. Hospital-Grade Data Security' },
  { id: 'sec-7', label: '7. Cookies & Web Telemetry' },
  { id: 'sec-8', label: '8. Record Retention & Archiving' },
  { id: 'sec-9', label: '9. Your Statutory Privacy Rights' },
  { id: 'sec-10', label: '10. Data Protection Officer & Redressal' },
  { id: 'sec-11', label: '11. Policy Revisions & Governance' },
];

export default function PrivacyPolicyPage() {
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
        title="Privacy Policy: Patient Data Protection & Digital Integrity" 
        breadcrumbs={[
          { label: 'About Jerush', path: '/about' },
          { label: 'Privacy Policy', active: true }
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
                Patient Data Protection & Digital Privacy Policy
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Adhering to the Digital Personal Data Protection Act, 2023 (India) and UAE Healthcare Data Confidentiality Standards
              </p>
            </div>
          </div>

          {/* Document Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-xs">
            <div className="space-y-0.5">
              <span className="text-slate-400 uppercase tracking-wider font-semibold block text-[10px]">Document Ref</span>
              <span className="font-mono font-bold text-slate-800">JER-LEGAL-PRIV-2026</span>
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
              <span className="text-slate-400 uppercase tracking-wider font-semibold block text-[10px]">Privacy Help Desk</span>
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
              <span>Policy Index</span>
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
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Statutory Compliance</span>
              </div>
              <p className="leading-relaxed">
                Formulated pursuant to the DPDP Act (India), statutory state health regulations, and UAE healthcare data confidentiality mandates.
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
                  1. Executive Privacy Commitment
                </h2>
              </div>
              <p>
                <strong>Jerush Groups and Hospitals</strong> (encompassing Jerush Dentofacial & Cosmetic Laser Centre across our regional centres in Tamil Nadu and Dubai) recognizes patient privacy as a sacred ethical trust. When you share confidential health records, diagnostic scans, or personal contact details with us, we protect that information with the highest institutional standards.
              </p>
              <p>
                This Privacy Policy establishes how Jerush Groups collects, maintains, processes, and safeguards personal information obtained through our clinical facilities, telephone consultation lines, digital appointment booking portals, and official web property (<a href="https://www.jerushdentoface.com" className="text-brandBlue underline">www.jerushdentoface.com</a>).
              </p>
            </section>

            {/* ─── CLAUSE 2 ─── */}
            <section id="sec-2" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 2</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  2. Categories of Personal & Health Data Collected
                </h2>
              </div>
              <p>
                To provide comprehensive surgical, dental, orthodontic, and dermatological care, we collect specific categories of data:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li><strong>Patient Identification & Demographics:</strong> Full legal name, date of birth, age, gender, national identity details (for surgical verification/insurance), and language preferences;</li>
                <li><strong>Contact Coordinates:</strong> Mobile number, WhatsApp phone, personal email, postal address, and emergency caregiver/attender contact info;</li>
                <li><strong>Clinical & Diagnostic Histories:</strong> Medical conditions (e.g. cardiac history, diabetic indices, bleeding tendencies), dental histories, previous hospital admissions, known pharmaceutical allergies, prescription records, and physician referral notes;</li>
                <li><strong>High-Resolution Diagnostic Imaging:</strong> 3D Cone Beam Computed Tomography (CBCT) DICOM datasets, digital Orthopantomograms (OPG), intra-oral optical scans (e.g. for Jerushaligne clear aligners), and standardized clinical photographs;</li>
                <li><strong>Financial & Billing Information:</strong> Payment mode identifiers, transaction references, itemized treatment cost authorizations, and health insurance pre-approval documents (note: full debit/credit card credentials are never processed or held on Jerush servers);</li>
                <li><strong>Web & Technical Telemetry:</strong> Anonymized IP addresses, device identifiers, browser types, and operational session cookies.</li>
              </ul>
            </section>

            {/* ─── CLAUSE 3 ─── */}
            <section id="sec-3" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 3</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  3. Methods of Data Collection
                </h2>
              </div>
              <p className="text-xs sm:text-sm">
                Data is acquired through transparent, direct interactions:
              </p>
              <div className="space-y-3 text-xs sm:text-sm">
                <p>
                  <strong>3.1 Direct Clinical Intake:</strong> Physical or digital intake questionnaires completed upon registration at our Thuckalay, Chennai, Trichy, or Dubai centres.
                </p>
                <p>
                  <strong>3.2 Diagnostic Suites:</strong> Automated acquisition of 3D radiographs and intra-oral scans directly from calibrated medical equipment during diagnostic appointments.
                </p>
                <p>
                  <strong>3.3 Digital Portals & Tele-Consultation:</strong> Appointment inquiry forms, consultation requests, and document uploads submitted via www.jerushdentoface.com or our official WhatsApp business desk.
                </p>
              </div>
            </section>

            {/* ─── CLAUSE 4 ─── */}
            <section id="sec-4" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 4</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  4. Purposes and Legal Basis for Processing
                </h2>
              </div>
              <p className="text-xs sm:text-sm">
                Your data is processed strictly for legitimate clinical, legal, and operational purposes:
              </p>
              <div className="p-4 bg-slate-50 border-l-4 border-brandBlue rounded-r-xl space-y-1.5 text-xs sm:text-sm">
                <p className="font-bold text-slate-900">Lawful Grounds for Processing:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>Delivery of Healthcare Services:</strong> Formulating surgical implant plans, executing cosmetic laser treatments, evaluating jaw symmetry, and monitoring post-operative healing;</li>
                  <li><strong>Electronic Health Record (EHR) Continuity:</strong> Maintaining unified clinical records accessible to specialist doctors across all Jerush branches;</li>
                  <li><strong>Patient Care Alerts:</strong> Dispatching appointment confirmations, milestone countdowns, post-procedure instructions, and critical emergency notices;</li>
                  <li><strong>Pharmacovigilance & Patient Safety:</strong> Preventing adverse drug interactions, anaesthesia emergencies, and procedural contraindications;</li>
                  <li><strong>Statutory Health Compliance:</strong> Fulfilling mandatory reporting mandates under Indian healthcare laws and UAE Ministry of Health and Prevention (MOHAP) directives.</li>
                </ul>
              </div>
            </section>

            {/* ─── CLAUSE 5 ─── */}
            <section id="sec-5" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 5</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  5. Inter-Centre Collaboration & Third-Party Sharing Safeguards
                </h2>
              </div>
              <p className="text-xs sm:text-sm">
                Jerush Groups operates multiple regional facilities. We maintain strict boundaries regarding information sharing:
              </p>
              <div className="space-y-3 text-xs sm:text-sm">
                <p>
                  <strong>5.1 Zero Commercial Monetization:</strong> We never sell, rent, trade, or commercially monetize patient health data to third-party advertising companies, insurance brokers, or pharmaceutical marketers.
                </p>
                <p>
                  <strong>5.2 Certified Medical Laboratory Partners:</strong> Diagnostic models and optical scans may be transferred to accredited dental laboratories (for custom CAD/CAM prosthetics or surgical guides) under strict legally binding confidentiality agreements.
                </p>
                <p>
                  <strong>5.3 Inter-Centre Portability:</strong> When a patient transfers care between Tamil Nadu and Dubai, clinical records are securely routed using encrypted hospital communication channels with patient consent.
                </p>
              </div>
            </section>

            {/* ─── CLAUSE 6 ─── */}
            <section id="sec-6" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 6</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  6. Hospital-Grade Data Security & Encryption
                </h2>
              </div>
              <p className="text-xs sm:text-sm">
                Jerush employs multi-layered technical, physical, and administrative safeguards:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>End-to-end Transport Layer Security (TLS 1.3) cryptographic protocols for all website data transmissions;</li>
                <li>256-bit AES encryption for electronic health records, diagnostic CBCT scans, and clinical databases;</li>
                <li>Granular role-based access controls ensuring only licensed treating doctors and authorized clinical coordinators can access medical charts;</li>
                <li>Air-gapped, encrypted daily off-site backups to prevent accidental data loss or unauthorized tampering.</li>
              </ul>
            </section>

            {/* ─── CLAUSE 7 ─── */}
            <section id="sec-7" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 7</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  7. Cookies & Web Telemetry Policy
                </h2>
              </div>
              <p className="text-xs sm:text-sm">
                Our web property uses limited session and performance cookies strictly to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                <li>Maintain secure session states during online appointment requests;</li>
                <li>Remember chosen clinic locations for improved browsing speeds;</li>
                <li>Analyze aggregated, non-personally identifiable traffic metrics to enhance website accessibility.</li>
              </ul>
              <p className="text-xs text-slate-500">
                You may disable cookies through your web browser preferences; however, doing so may disable certain interactive features such as online appointment booking calendars.
              </p>
            </section>

            {/* ─── CLAUSE 8 ─── */}
            <section id="sec-8" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 8</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  8. Record Retention & Archiving
                </h2>
              </div>
              <p className="text-xs sm:text-sm">
                Clinical records and diagnostic radiographs are retained in strict alignment with hospital council directives (a minimum of 7 years for adult clinical files). Non-clinical web inquiry data is retained only as long as necessary to address the patient's inquiry, after which it is securely purged.
              </p>
            </section>

            {/* ─── CLAUSE 9 ─── */}
            <section id="sec-9" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 9</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  9. Your Statutory Patient Rights
                </h2>
              </div>
              <p className="text-xs sm:text-sm">
                Under applicable Indian and UAE data protection standards, you have the right to:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm">
                <li><strong>Right of Access & Portability:</strong> Request certified digital copies of your diagnostic scans, treatment notes, and invoices;</li>
                <li><strong>Right to Rectification:</strong> Request prompt correction of inaccurate personal or demographic details;</li>
                <li><strong>Right to Withdraw Consent:</strong> Opt out of non-clinical communications, health newsletters, or educational alerts at any time;</li>
                <li><strong>Right to Clinical Media Privacy:</strong> Demand that clinical before-and-after imagery be withheld from educational publications, or published exclusively with de-identification.</li>
              </ol>
            </section>

            {/* ─── CLAUSE 10 ─── */}
            <section id="sec-10" className="scroll-mt-28 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 10</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  10. Data Protection Officer & Grievance Redressal
                </h2>
              </div>
              <p className="text-xs sm:text-sm">
                For questions regarding this policy, data rights requests, or formal privacy concerns, please contact our designated Data Protection Desk:
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-1.5">
                <p className="font-bold text-slate-900">Data Protection & Grievance Desk</p>
                <p className="text-slate-600">Jerush Groups and Hospitals (Jerush Dentofacial & Cosmetic Laser Centre)</p>
                <p className="text-slate-600">Official Inquiries: <a href="mailto:enquiry@jerushdentoface.com" className="text-brandBlue font-semibold hover:underline">enquiry@jerushdentoface.com</a></p>
                <p className="text-slate-600">Helpline: <a href="tel:+919489160055" className="text-brandBlue font-semibold hover:underline">+91 94891 60055</a> / <a href="tel:+919489160000" className="text-brandBlue font-semibold hover:underline">+91 94891 60000</a></p>
                <p className="text-slate-600">Headquarters Address: Near Bus Stand, Brammapuram South, Thuckalay, Tamil Nadu – 629175, India.</p>
              </div>
              <p className="text-xs text-slate-500 pt-1">
                All data privacy requests receive a formal acknowledgment within 24 hours and a detailed resolution within 15 business days.
              </p>
            </section>

            {/* ─── CLAUSE 11 ─── */}
            <section id="sec-11" className="scroll-mt-28 space-y-4 pt-6 border-t border-slate-200">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brandSky font-headline">Clause 11</span>
                <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                  11. Policy Revisions & Governance
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-700">
                Jerush Groups and Hospitals reserves the right to amend this Privacy Policy to reflect advancements in clinical technology, medical council guidelines, or statutory data regulations. Any amendments will be reflected on this page with an updated "Effective Date". Continued interaction with our clinical centres or web platforms represents acceptance of the amended terms.
              </p>
              <div className="pt-4 text-center text-xs text-slate-400">
                Jerush Groups and Hospitals • All rights reserved • Document Ref: JER-LEGAL-PRIV-2026
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* ─── BOTTOM CTA BANNER (Unified Dark Navy Format) ─── */}
      <TreatmentCtaBanner
        badgeText="Chief Executive Officer"
        titlePrefix="Committed to"
        highlightWord="Patient Privacy"
        titleSuffix="& Secure Care"
        subtitle="Have questions regarding how your diagnostic scans or clinical records are protected? Our patient data coordinators are available to assist."
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
