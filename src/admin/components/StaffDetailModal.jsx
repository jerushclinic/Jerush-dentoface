import React, { useState, useEffect } from 'react';
import { 
  X, Printer, Copy, Check, Phone, MapPin, Calendar, 
  Heart, Shield, User, Edit, Building2, GraduationCap,
  Sparkles, FileText
} from 'lucide-react';

function calculateAge(dobString) {
  if (!dobString) return null;
  const birth = new Date(dobString);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return isNaN(age) || age < 0 ? null : age;
}

function formatDate(dateString) {
  if (!dateString) return '—';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function StaffDetailModal({ staff, open, onClose, onEdit, departments = [] }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Lock background scroll when modal is open to eliminate page glitching
  useEffect(() => {
    if (open) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [open]);

  if (!open || !staff) return null;

  const currentDept = departments.find(d => d.id === staff.department) || {
    label: staff.department || 'General Staff',
    code: 'STF',
    color: 'from-brandSky to-brandBlue',
    badgeColor: 'bg-brandSky/15 text-brandBlue dark:text-sky-300 border-brandSky/30'
  };

  const age = calculateAge(staff.dob);

  const handleCopyDetails = () => {
    const text = `
Jerush Dentofacial & Cosmetic Laser Centre
Staff Identity Credential
------------------------------------
Name: ${staff.name}
Emp Code: ${staff.empCode}
Department: ${currentDept.label}
Designation: ${staff.role}
Branch / Centre: ${staff.branch || 'Jerush Head Clinic – Thuckalay'}
DOB: ${formatDate(staff.dob)} (Age: ${age || '—'})
Gender: ${staff.gender}
Blood Group: ${staff.bloodGroup}
Date of Joining: ${formatDate(staff.dateOfJoining)}
Phone: ${staff.phone}
Address: ${staff.address}
Status: ${staff.status}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const initials = staff.name
    ? staff.name.split(' ').filter(Boolean).slice(-2).map(n => n[0]).join('').toUpperCase()
    : 'JD';

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto overscroll-contain animate-fadeIn"
    >
      {/* Container / Card */}
      <div 
        id="jerush-staff-id-badge"
        className="w-full max-w-2xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative my-auto"
      >
        {/* Holographic Top Banner (Pinned) */}
        <div className="relative bg-gradient-to-r from-[#071324] via-[#0E2752] to-[#071324] p-5 sm:p-6 text-white overflow-hidden shrink-0">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brandSky/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-brandBlue/20 rounded-full blur-2xl pointer-events-none" />

          {/* Header Controls */}
          <div className="flex items-center justify-between relative z-10 mb-4">
            <div className="flex items-center gap-2.5">
              <img 
                src="/images/logo/jerush-logo.webp" 
                alt="Jerush Logo" 
                className="h-7 w-auto object-contain brightness-0 invert" 
              />
              <div className="text-left border-l border-white/20 pl-2.5">
                <span className="text-[10px] font-extrabold tracking-widest uppercase text-brandSky block font-headline">
                  JERUSH HOSPITALS
                </span>
                <span className="text-[8px] text-slate-300 uppercase tracking-wider block">
                  Staff Identity Credential
                </span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-1.5 no-print">
              <button
                type="button"
                onClick={handleCopyDetails}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold backdrop-blur-md transition-colors cursor-pointer"
                title="Copy details to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brandSky/20 hover:bg-brandSky/30 text-brandSky text-[11px] font-bold border border-brandSky/30 backdrop-blur-md transition-colors cursor-pointer"
                title="Print Staff Badge"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print ID</span>
              </button>

              {onEdit && (
                <button
                  type="button"
                  onClick={() => { onClose(); onEdit(staff); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold backdrop-blur-md transition-colors cursor-pointer"
                  title="Edit Staff Member"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/25 text-slate-300 hover:text-white transition-colors ml-1 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Profile Hero Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 relative z-10">
            {/* Avatar Photo Frame with Holographic Rim */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 min-w-[96px] min-h-[96px] rounded-2xl overflow-hidden border-2 border-white/40 shadow-xl bg-gradient-to-br from-brandBlue to-brandSky relative flex items-center justify-center p-0.5 shrink-0">
                {staff.image ? (
                  <img
                    src={staff.image}
                    alt={staff.name}
                    className="w-full h-full object-cover object-top rounded-[14px]"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <span className="font-headline font-black text-2xl sm:text-3xl text-white tracking-tight">
                    {initials}
                  </span>
                )}
              </div>

              {/* Status Dot */}
              <div 
                className={`absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border shadow-md flex items-center gap-1 ${
                  staff.status === 'Active' 
                    ? 'bg-emerald-500 text-white border-emerald-400' 
                    : staff.status === 'On Leave'
                    ? 'bg-amber-500 text-white border-amber-400'
                    : 'bg-slate-600 text-slate-200 border-slate-500'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {staff.status}
              </div>
            </div>

            {/* Name, Code, Designation */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-brandSky/25 text-brandSky border border-brandSky/30 font-mono text-xs font-black tracking-wider shadow-sm">
                  {staff.empCode || 'JDT-STAFF'}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-white/90 text-[10px] font-bold uppercase tracking-wider">
                  {currentDept.label}
                </span>
              </div>

              <h2 className="font-headline font-black text-xl sm:text-2xl text-white tracking-tight leading-tight">
                {staff.name}
              </h2>

              <p className="text-brandSky font-bold text-xs sm:text-sm mt-0.5">
                {staff.role || 'Staff Professional'}
              </p>

              {staff.branch && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-slate-300 text-xs mt-2">
                  <MapPin className="w-3.5 h-3.5 text-brandSky shrink-0" />
                  <span className="truncate">{staff.branch}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Barcode & Verified Credential Strip (Pinned) */}
        <div className="bg-slate-100/70 dark:bg-slate-950/60 px-6 py-2.5 flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-brandSky" />
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
              VERIFIED EMPLOYEE RECORD
            </span>
          </div>

          {/* Barcode Accent */}
          <div className="flex items-center gap-0.5">
            <div className="w-0.5 h-4 bg-slate-700 dark:bg-slate-300" />
            <div className="w-1.5 h-4 bg-slate-700 dark:bg-slate-300" />
            <div className="w-0.5 h-4 bg-slate-700 dark:bg-slate-300" />
            <div className="w-1 h-4 bg-slate-700 dark:bg-slate-300" />
            <div className="w-0.5 h-4 bg-slate-700 dark:bg-slate-300" />
            <div className="w-2 h-4 bg-slate-700 dark:bg-slate-300" />
            <div className="w-0.5 h-4 bg-slate-700 dark:bg-slate-300" />
            <div className="w-1.5 h-4 bg-slate-700 dark:bg-slate-300" />
            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 font-bold ml-1.5">
              {staff.empCode}
            </span>
          </div>
        </div>

        {/* Modal Body: Scrollable, non-trapped content area */}
        <div className="p-5 sm:p-6 text-left text-slate-800 dark:text-slate-100 flex-1 overflow-y-auto overscroll-contain space-y-5 scrollbar-thin">
          {/* Quick Metrics Bar: 4 Executive Cards with Full Visibility (No Truncation) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {/* Blood Group */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-rose-500/10 via-red-500/5 to-transparent dark:from-rose-500/15 dark:via-red-500/10 dark:to-transparent border border-red-500/20 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-500/90 dark:text-red-400 font-headline">
                  Blood Group
                </span>
                <div className="w-6 h-6 rounded-lg bg-red-500/15 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
              <p className="font-headline font-black text-base sm:text-lg text-red-600 dark:text-red-400 leading-none">
                {staff.bloodGroup || '—'}
              </p>
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-1">
                Donor Type
              </span>
            </div>

            {/* Date of Birth & Age */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-brandSky/10 via-blue-500/5 to-transparent dark:from-brandSky/15 dark:via-blue-500/10 dark:to-transparent border border-brandSky/25 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brandBlue dark:text-brandSky font-headline">
                  DOB & Age
                </span>
                <div className="w-6 h-6 rounded-lg bg-brandSky/20 text-brandBlue dark:text-brandSky flex items-center justify-center shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="font-headline font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                {formatDate(staff.dob)}
              </p>
              <span className="text-[10px] font-bold text-brandSky dark:text-brandSky/90 mt-1">
                {age ? `${age} Years Old` : 'Age not recorded'}
              </span>
            </div>

            {/* Gender */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-purple-500/10 via-fuchsia-500/5 to-transparent dark:from-purple-500/15 dark:via-fuchsia-500/10 dark:to-transparent border border-purple-500/20 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 font-headline">
                  Gender
                </span>
                <div className="w-6 h-6 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="font-headline font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                {staff.gender || '—'}
              </p>
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-1">
                Staff Identity
              </span>
            </div>

            {/* Date of Joining */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent dark:from-emerald-500/15 dark:via-teal-500/10 dark:to-transparent border border-emerald-500/20 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-headline">
                  Joining Date
                </span>
                <div className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="font-headline font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                {formatDate(staff.dateOfJoining)}
              </p>
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-1">
                Tenure Record
              </span>
            </div>
          </div>

          {/* Seamless Specification List (Divided rows instead of floating boxes) */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-slate-50/40 dark:bg-slate-950/30 divide-y divide-slate-100 dark:divide-slate-800/80">
            {/* Department Row */}
            <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0">
                Department
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border w-fit ${currentDept.badgeColor}`}>
                {currentDept.label}
              </span>
            </div>

            {/* Centre / Branch Row */}
            <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0">
                Hospital Centre
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brandSky shrink-0" />
                {staff.branch || 'Jerush Head Clinic – Thuckalay'}
              </span>
            </div>

            {/* Primary Phone Row */}
            <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0">
                Contact Phone
              </span>
              <a 
                href={`tel:${staff.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brandBlue dark:text-brandSky hover:underline w-fit"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                {staff.phone || '—'}
              </a>
            </div>

            {/* Duty Status Row */}
            <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0">
                Duty Status
              </span>
              <span className="text-xs font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                <span className={`w-2 h-2 rounded-full ${
                  staff.status === 'Active' ? 'bg-emerald-500' : staff.status === 'On Leave' ? 'bg-amber-500' : 'bg-slate-400'
                }`} />
                {staff.status}
              </span>
            </div>

            {/* Qualification (if available) */}
            {staff.qualification && (
              <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0">
                  Qualification
                </span>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200 text-left sm:text-right">
                  {staff.qualification}
                </span>
              </div>
            )}
          </div>

          {/* Residential Address Panel */}
          <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
              Residential / Communication Address
            </span>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>{staff.address || 'Address not listed'}</span>
            </p>
          </div>

          {/* Administrative Notes (if available) */}
          {staff.notes && (
            <div className="p-3.5 rounded-2xl bg-brandBlue/5 dark:bg-brandBlue/10 border border-brandBlue/10 dark:border-brandBlue/20 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brandBlue dark:text-brandSky block mb-0.5">
                Specialty / Admin Notes
              </span>
              <p className="text-slate-600 dark:text-slate-300 italic text-[11px] leading-relaxed">
                "{staff.notes}"
              </p>
            </div>
          )}
        </div>

        {/* Footer (Pinned) */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 no-print shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brandSky" />
            <span>Jerush Dentofacial Staff Profile</span>
          </div>

          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                type="button"
                onClick={() => { onClose(); onEdit(staff); }}
                className="px-4 py-2 rounded-xl bg-brandBlue/10 dark:bg-brandBlue/20 text-brandBlue dark:text-brandSky font-bold hover:bg-brandBlue/20 transition-colors cursor-pointer"
              >
                Edit Details
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
