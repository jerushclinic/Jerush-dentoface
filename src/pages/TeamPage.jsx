import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Users2,
  Award,
  Search,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Heart,
  Monitor,
  Calculator,
  Layers,
  Scan,
  Phone,
  Wrench,
  Home,
  Megaphone,
  LayoutGrid,
  List,
  Building2,
  X,
  PhoneCall,
  Calendar,
  Briefcase,
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import { teamService } from '../services/teamService';
import { teamDepartments } from '../data/team';

// Department visual configurations with authentic healthcare palette
const DEPT_CONFIG = {
  management: {
    code: 'MGT',
    label: 'Management',
    icon: Award,
    gradient: 'from-[#002B66] via-brandBlue to-brandSky',
    badgeBg: 'bg-blue-50 text-brandBlue border-blue-200/80',
    lightBg: 'bg-blue-500/10 text-brandBlue',
    desc: 'Hospital administration, executive directors and operational leadership.'
  },
  pro: {
    code: 'PRO',
    label: 'Public Relations',
    icon: Megaphone,
    gradient: 'from-[#007A87] via-[#0098A6] to-brandSky',
    badgeBg: 'bg-teal-50 text-teal-700 border-teal-200/80',
    lightBg: 'bg-teal-500/10 text-teal-600',
    desc: 'Patient relationship management, hospitality coordination and counseling.'
  },
  accounts: {
    code: 'ACC',
    label: 'Accounts',
    icon: Calculator,
    gradient: 'from-emerald-600 via-teal-600 to-teal-700',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    lightBg: 'bg-emerald-500/10 text-emerald-600',
    desc: 'Financial administration, hospital billing, audits and insurance clearing.'
  },
  aligners: {
    code: 'ALN',
    label: 'Clear Aligners & Crown Mfg',
    icon: Layers,
    gradient: 'from-[#002B66] via-brandBlue to-brandSky',
    badgeBg: 'bg-cyan-50 text-brandBlue border-cyan-200/80',
    lightBg: 'bg-cyan-500/10 text-brandBlue',
    desc: 'In-house CAD/CAM 3D clear aligners and ceramic crown manufacturing lab.'
  },
  radiology: {
    code: 'RAD',
    label: 'Radiographic Services',
    icon: Scan,
    gradient: 'from-indigo-600 via-purple-600 to-brandBlue',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    lightBg: 'bg-indigo-500/10 text-indigo-600',
    desc: '3D CBCT, panoramic OPG and advanced digital diagnostic imaging.'
  },
  it: {
    code: 'DTE',
    label: 'IT & Digital Services',
    icon: Monitor,
    gradient: 'from-[#071324] via-[#0E2752] to-brandBlue',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/80',
    lightBg: 'bg-blue-500/10 text-blue-600',
    desc: 'Digital platforms, telemedicine software, web development and communications.'
  },
  dental_assistants: {
    code: 'DA',
    label: 'Dental Assistants',
    icon: Heart,
    gradient: 'from-rose-500 via-pink-500 to-rose-400',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200/80',
    lightBg: 'bg-rose-500/10 text-rose-600',
    desc: 'Chairside dental assisting, sterile surgery preparation and nursing care.'
  },
  cosmetic_assistants: {
    code: 'CA',
    label: 'Cosmetic Assistants',
    icon: Sparkles,
    gradient: 'from-fuchsia-600 via-purple-500 to-pink-500',
    badgeBg: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/80',
    lightBg: 'bg-fuchsia-500/10 text-fuchsia-600',
    desc: 'Laser procedural support, cosmetology nursing, and aesthetic procedure prep.'
  },
  front_desk: {
    code: 'FO',
    label: 'Front Desk',
    icon: Phone,
    gradient: 'from-amber-500 via-orange-500 to-amber-600',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
    lightBg: 'bg-amber-500/10 text-amber-600',
    desc: 'Patient reception, OPD scheduling, emergency appointments and telephone helpdesk.'
  },
  maintenance: {
    code: 'MNT',
    label: 'Maintenance',
    icon: Wrench,
    gradient: 'from-slate-600 via-slate-700 to-slate-800',
    badgeBg: 'bg-slate-100 text-slate-700 border-slate-300/80',
    lightBg: 'bg-slate-500/10 text-slate-600',
    desc: 'Hospital biomedical equipment calibration, power systems and clinic upkeep.'
  },
  housekeeping: {
    code: 'HSK',
    label: 'Housekeeping',
    icon: Home,
    gradient: 'from-emerald-500 via-green-600 to-teal-600',
    badgeBg: 'bg-green-50 text-green-700 border-green-200/80',
    lightBg: 'bg-green-500/10 text-green-600',
    desc: 'Hospital ward sanitization, hygienic room upkeep and infection control protocols.'
  },
  security: {
    code: 'SEC',
    label: 'Security Services',
    icon: Shield,
    gradient: 'from-slate-800 via-slate-900 to-slate-950',
    badgeBg: 'bg-slate-100 text-slate-700 border-slate-300/80',
    lightBg: 'bg-slate-500/10 text-slate-600',
    desc: '24/7 campus security, patient safety monitoring and round-the-clock surveillance.'
  }
};

const LOCAL_IMAGE_MAP = {
  'Mr. Rajesh Kumar Pius': '/images/team/management/rajesh-kumar.webp',
  'Miss. Monika': '/images/team/pro/monika.webp',
  'Mrs. Renisha': '/images/team/pro/renisha.webp',
  'Mrs. Suja': '/images/team/accounts/suja.webp',
  'Miss. Anishka': '/images/team/accounts/anishka.webp',
  'Miss. Ashika': '/images/team/accounts/ashika.webp',
  'Mrs. Praveena': '/images/team/accounts/praveena.webp',
  'Miss. Jenisha': '/images/team/accounts/jenisha.webp',
  'Mr. Sukustel Martin': '/images/team/aligner-dept/martin.webp',
  'Mrs. Kalpana': '/images/team/house-keeping/kalpana.webp'
};

const BRANCH_CONFIG = {
  'Jerush Head Clinic – Thuckalay': {
    cleanName: 'Thuckalay Centre',
    badgeClass: 'bg-brandBlue/8 text-brandBlue border-brandBlue/20',
    dotClass: 'bg-brandSky'
  },
  'Jerush Chennai Branch': {
    cleanName: 'Chennai Branch',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotClass: 'bg-emerald-500'
  },
  'Jerush Trichy Branch': {
    cleanName: 'Trichy Branch',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    dotClass: 'bg-amber-500'
  },
  'Jerush Groups': {
    cleanName: 'Jerush Groups HQ',
    badgeClass: 'bg-violet-50 text-violet-700 border-violet-200',
    dotClass: 'bg-violet-500'
  }
};

function getInitials(name) {
  if (!name) return 'JT';
  const clean = name.replace(/^(Mr\.|Mrs\.|Miss\.|Dr\.)\s*/i, '').trim();
  const parts = clean.split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function TeamPage() {
  const navigate = useNavigate();
  const [allMembers, setAllMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDept, setActiveDept] = useState('all');
  const [activeBranch, setActiveBranch] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    teamService.getTeamMembers()
      .then(data => { setAllMembers(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const deptCounts = useMemo(() => {
    return teamDepartments.reduce((acc, d) => {
      acc[d.id] = allMembers.filter(m => m.department === d.id).length;
      return acc;
    }, {});
  }, [allMembers]);

  const filteredMembers = useMemo(() => {
    return allMembers.filter(m => {
      const matchesDept = activeDept === 'all' || m.department === activeDept;
      const matchesBranch = activeBranch === 'all' || m.branch === activeBranch;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        (m.branch || '').toLowerCase().includes(q) ||
        (DEPT_CONFIG[m.department]?.label || '').toLowerCase().includes(q);
      return matchesDept && matchesBranch && matchesSearch;
    });
  }, [allMembers, activeDept, activeBranch, searchQuery]);

  // Group filtered results by department
  const groupedDepartments = useMemo(() => {
    return teamDepartments
      .filter(d => activeDept === 'all' ? deptCounts[d.id] > 0 : d.id === activeDept)
      .map(d => ({
        ...d,
        config: DEPT_CONFIG[d.id] || DEPT_CONFIG.management,
        members: filteredMembers.filter(m => m.department === d.id)
      }))
      .filter(d => d.members.length > 0);
  }, [filteredMembers, activeDept, deptCounts]);

  const handleBookClick = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#F8FAFC] font-body text-left relative min-h-screen pb-20">
      <PageBreadcrumbHero
        title="Our Team"
        breadcrumbs={[{ label: 'Our Team', active: true }]}
      />

      {/* Decorative ambient background lighting */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-brandSky/6 rounded-full blur-3xl pointer-events-none transform-gpu" />
      <div className="absolute top-2/3 -left-40 w-[600px] h-[600px] bg-brandBlue/6 rounded-full blur-3xl pointer-events-none transform-gpu" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 sm:pt-12">

        {/* Customer-Centric Welcome & Trust Banner */}
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/15 mb-3.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-brandSky relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brandSky"></span>
            </span>
            <span className="text-[11px] font-bold text-brandBlue uppercase tracking-wider font-headline">
              Centres of Clinical Excellence & Patient Care
            </span>
          </div>

          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight tracking-tight">
            The Caring Team Behind{' '}
            <span className="bg-gradient-to-r from-brandBlue via-[#1685C5] to-brandSky bg-clip-text text-transparent">
              Your Smile & Comfort
            </span>
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm md:text-[15px] mt-3 leading-relaxed max-w-2xl mx-auto">
            From personal patient coordinators and chairside nursing assistants to in-house master ceramists, our dedicated staff ensures every visit to Jerush is gentle, welcoming, and world-class.
          </p>

          {/* Customer Trust Highlights - Clean 4-col on desktop, compact on mobile */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-7 text-left">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-brandSky/40 transition-all flex flex-col justify-between">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-2.5 shrink-0">
                <Users2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-headline font-bold text-xs sm:text-[13px] text-slate-800 leading-snug">Personal Care PROs</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Dedicated hospital guides for smooth OPD & visits</p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-brandSky/40 transition-all flex flex-col justify-between">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-2.5 shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-headline font-bold text-xs sm:text-[13px] text-slate-800 leading-snug">Chairside Nursing</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Certified sterile dental & cosmetic procedure care</p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-brandSky/40 transition-all flex flex-col justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-brandBlue flex items-center justify-center mb-2.5 shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-headline font-bold text-xs sm:text-[13px] text-slate-800 leading-snug">In-House 3D Lab</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Custom clear aligners & single-day ceramic crowns</p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-brandSky/40 transition-all flex flex-col justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-brandBlue flex items-center justify-center mb-2.5 shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-headline font-bold text-xs sm:text-[13px] text-slate-800 leading-snug">4 Regional Centres</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Thuckalay Flagship, Chennai, and Trichy branches</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Search & Filter Hub */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm shadow-slate-200/50 p-3 sm:p-5 mb-8 sm:mb-12">
          
          {/* MOBILE VIEW: Ultra-compact, clean 2-row layout (no 13 stacked buttons!) */}
          <div className="sm:hidden space-y-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brandSky shrink-0" />
              <input
                type="text"
                placeholder="Search staff by name, role..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brandSky/20 focus:border-brandSky transition-all text-xs font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 2-Column Compact Dropdowns */}
            <div className="grid grid-cols-2 gap-2">
              {/* Department Dropdown */}
              <div className="relative">
                <select
                  value={activeDept}
                  onChange={e => setActiveDept(e.target.value)}
                  className="w-full pl-2.5 pr-6 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 font-headline uppercase tracking-wider appearance-none focus:outline-none focus:border-brandSky truncate"
                >
                  <option value="all">All Departments ({allMembers.length})</option>
                  {teamDepartments.filter(d => deptCounts[d.id] > 0).map(d => (
                    <option key={d.id} value={d.id}>
                      {d.label} ({deptCounts[d.id]})
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>

              {/* Centre Dropdown */}
              <div className="relative">
                <select
                  value={activeBranch}
                  onChange={e => setActiveBranch(e.target.value)}
                  className="w-full pl-2.5 pr-6 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 font-headline uppercase tracking-wider appearance-none focus:outline-none focus:border-brandSky truncate"
                >
                  <option value="all">All Centres</option>
                  <option value="Jerush Head Clinic – Thuckalay">Thuckalay</option>
                  <option value="Jerush Chennai Branch">Chennai</option>
                  <option value="Jerush Trichy Branch">Trichy</option>
                  <option value="Jerush Groups">HQ</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP / TABLET VIEW: Search Input + Centre Dropdown + Clean Pills */}
          <div className="hidden sm:block">
            {/* Top Row: Search + Regional Centre */}
            <div className="flex flex-row items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brandSky shrink-0" />
                <input
                  type="text"
                  placeholder="Search staff by name, role, department or branch..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brandSky/20 focus:border-brandSky transition-all text-sm font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Regional Centre Selector */}
              <div className="relative shrink-0 w-60">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brandBlue pointer-events-none" />
                <select
                  value={activeBranch}
                  onChange={e => setActiveBranch(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 font-headline uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-brandSky/20 focus:border-brandSky cursor-pointer appearance-none transition-all"
                >
                  <option value="all">All Regional Centres</option>
                  <option value="Jerush Head Clinic – Thuckalay">Thuckalay Flagship</option>
                  <option value="Jerush Chennai Branch">Chennai Branch</option>
                  <option value="Jerush Trichy Branch">Trichy Branch</option>
                  <option value="Jerush Groups">Jerush Groups HQ</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Department Pills */}
            <div className="pt-3.5 mt-3.5 border-t border-slate-100">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-headline">
                  Filter by Care Department
                </span>
                {(activeDept !== 'all' || activeBranch !== 'all' || searchQuery) && (
                  <button
                    onClick={() => { setActiveDept('all'); setActiveBranch('all'); setSearchQuery(''); }}
                    className="text-xs font-bold text-brandBlue hover:text-brandSky flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                    <span>Reset All</span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <button
                  onClick={() => setActiveDept('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-headline uppercase tracking-wider transition-all duration-200 cursor-pointer select-none ${
                    activeDept === 'all'
                      ? 'bg-gradient-to-r from-brandBlue via-[#198BC8] to-brandSky text-white shadow-md shadow-brandBlue/20 scale-[1.01]'
                      : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  All Care Teams ({allMembers.length})
                </button>

                {teamDepartments.filter(d => deptCounts[d.id] > 0).map(d => {
                  const cfg = DEPT_CONFIG[d.id] || DEPT_CONFIG.management;
                  const IconComp = cfg.icon;
                  const isActive = activeDept === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setActiveDept(d.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-headline uppercase tracking-wider transition-all duration-200 cursor-pointer select-none ${
                        isActive
                          ? 'bg-gradient-to-r from-brandBlue via-[#198BC8] to-brandSky text-white shadow-md shadow-brandBlue/20 scale-[1.01]'
                          : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                      }`}
                    >
                      <IconComp className={`w-3 h-3 shrink-0 ${isActive ? 'text-white' : 'text-brandBlue'}`} />
                      <span>{d.label}</span>
                      <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full shrink-0 ${
                        isActive ? 'bg-white/25 text-white' : 'bg-white text-slate-500 border border-slate-200'
                      }`}>
                        {deptCounts[d.id]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Filter Results Counter & Mobile Reset */}
          <div className="flex items-center justify-between text-xs text-slate-500 mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100 font-medium">
            <span>
              Showing <strong className="text-slate-900 font-bold">{filteredMembers.length}</strong> staff members
              {activeDept !== 'all' && ` in ${DEPT_CONFIG[activeDept]?.label || activeDept}`}
              {activeBranch !== 'all' && ` at ${BRANCH_CONFIG[activeBranch]?.cleanName || activeBranch}`}
            </span>
            {(activeDept !== 'all' || activeBranch !== 'all' || searchQuery) && (
              <button
                onClick={() => { setActiveDept('all'); setActiveBranch('all'); setSearchQuery(''); }}
                className="text-xs font-bold text-brandBlue hover:text-brandSky flex items-center gap-1 transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-24 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400 font-bold font-headline uppercase tracking-wider mt-4">
              Loading Jerush Healthcare Team...
            </p>
          </div>
        )}

        {/* Department Sections */}
        {!loading && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDept + activeBranch + searchQuery}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-14 sm:space-y-16"
            >
              {groupedDepartments.map((dept, di) => {
                const config = dept.config;
                const DeptIcon = config.icon;

                return (
                  <motion.div
                    key={dept.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: di * 0.04 }}
                    className="relative"
                  >
                    {/* Department Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-slate-200/80">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-sm text-white shrink-0`}>
                          <DeptIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="font-headline font-extrabold text-lg sm:text-xl text-slate-900 leading-tight">
                              {dept.label}
                            </h2>
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                              {config.code}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-0.5 max-w-xl">
                            {config.desc}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <span className="text-xs font-bold font-headline text-brandBlue bg-brandBlue/5 border border-brandBlue/15 px-3 py-1 rounded-full">
                          {dept.members.length} {dept.members.length === 1 ? 'Specialist' : 'Specialists'}
                        </span>
                      </div>
                    </div>

                    {/* NEW CARD DESIGN: LARGE, PROMINENT EXECUTIVE PORTRAITS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-6">
                      {dept.members.map((member, mi) => {
                        const memberImg = member.image || LOCAL_IMAGE_MAP[member.name];
                        const branchInfo = BRANCH_CONFIG[member.branch] || {
                          cleanName: (member.branch || 'Jerush Centre').replace('Jerush ', '').replace(' – Thuckalay', ''),
                          badgeClass: 'bg-slate-50 text-slate-600 border-slate-200',
                          dotClass: 'bg-slate-400'
                        };

                        return (
                          <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: mi * 0.04 }}
                            onClick={() => setSelectedMember({ ...member, image: memberImg, deptConfig: config, branchInfo })}
                            className="group relative bg-white border border-slate-200/90 hover:border-brandSky/60 rounded-3xl p-3 shadow-sm hover:shadow-2xl hover:shadow-brandBlue/15 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer select-none"
                          >
                            {/* Ambient Glow Accent on Hover */}
                            <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-brandSky/5 group-hover:scale-150 group-hover:bg-gradient-to-bl group-hover:from-brandSky/20 group-hover:to-transparent transition-all duration-500 pointer-events-none -mr-12 -mt-12" />

                            {/* LARGE PORTRAIT PHOTO CONTAINER */}
                            <div className="relative w-full aspect-[3.4/4.3] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200/60 mb-3.5">
                              {memberImg ? (
                                <img
                                  src={memberImg}
                                  alt={member.name}
                                  loading="lazy"
                                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-108"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    if (e.target.nextElementSibling) {
                                      e.target.nextElementSibling.style.display = 'flex';
                                    }
                                  }}
                                />
                              ) : null}

                              {/* Graceful Fallback if image is absent or errors */}
                              <div
                                style={{ display: memberImg ? 'none' : 'flex' }}
                                className={`w-full h-full bg-gradient-to-br ${config.gradient} flex flex-col items-center justify-center relative p-5 text-white select-none`}
                              >
                                {/* Subtle Background Watermark Icon */}
                                <DeptIcon className="w-28 h-28 text-white/10 absolute -bottom-5 -right-5 pointer-events-none" />
                                
                                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md ring-4 ring-white/30 flex items-center justify-center text-white font-headline font-black text-2xl shadow-xl mb-3">
                                  {getInitials(member.name)}
                                </div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 font-headline bg-white/15 px-3 py-1 rounded-full border border-white/25">
                                  {config.code} Division
                                </span>
                              </div>

                              {/* Floating Bottom Quick Action on Hover */}
                              <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-brandBlue to-brandSky text-white flex items-center justify-center shadow-lg shadow-brandBlue/35 group-hover:scale-110 transition-transform">
                                  <ArrowRight className="w-4 h-4" />
                                </div>
                              </div>

                              {/* Subtle Bottom Vignette Gradient */}
                              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/30 to-transparent pointer-events-none" />
                            </div>

                            {/* CARD DETAILS BODY */}
                            <div className="px-2 pb-2 text-left">
                              <h3 className="font-headline font-extrabold text-[16px] sm:text-[17px] text-slate-900 group-hover:text-brandBlue transition-colors leading-snug line-clamp-1">
                                {member.name}
                              </h3>

                              <div className="mt-1 flex items-center justify-between gap-2">
                                <span className="text-brandSky font-bold text-xs uppercase tracking-wider truncate">
                                  {member.role}
                                </span>
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 shrink-0">
                                  <MapPin className="w-2.5 h-2.5 text-brandBlue shrink-0" />
                                  <span>{branchInfo.cleanName}</span>
                                </span>
                              </div>

                              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                                <span className="truncate max-w-[130px]">{dept.label}</span>
                                <span className="font-bold text-brandBlue group-hover:text-brandSky transition-colors flex items-center gap-0.5 shrink-0">
                                  <span>View Profile</span>
                                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </span>
                              </div>
                            </div>

                          </motion.div>
                        );
                      })}
                    </div>

                  </motion.div>
                );
              })}

              {/* Empty State */}
              {groupedDepartments.length === 0 && (
                <div className="text-center py-20 bg-white border border-slate-200/80 rounded-3xl p-8 max-w-md mx-auto shadow-xs">
                  <div className="w-14 h-14 rounded-2xl bg-brandBlue/5 text-brandBlue flex items-center justify-center mx-auto mb-4 border border-brandBlue/15">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="font-headline font-bold text-lg text-slate-900">No staff members found</h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
                    We could not find any team members matching your selected search query or department filters.
                  </p>
                  <button
                    onClick={() => { setActiveDept('all'); setActiveBranch('all'); setSearchQuery(''); }}
                    className="mt-5 px-5 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white font-bold text-xs uppercase font-headline rounded-full shadow-md cursor-pointer hover:shadow-lg transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Dedicated Jerush Team Appointment & Consultation Banner */}
        <div className="mt-16 sm:mt-20 relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#071324] via-[#0E2752] to-[#071324] p-8 sm:p-12 text-white text-left border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-brandSky/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brandBlue/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brandSky/15 border border-brandSky/30 text-brandSky text-[11px] font-bold uppercase tracking-wider font-headline mb-4">
              <Users2 className="w-3.5 h-3.5" />
              <span>Centres of Clinical Excellence</span>
            </span>

            <h2 className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
              Experience Care Powered by Our{' '}
              <span className="bg-gradient-to-r from-brandSky to-[#38BDF8] bg-clip-text text-transparent">
                Exceptional Team
              </span>
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm md:text-[15px] mt-3.5 leading-relaxed font-normal">
              Whether you are scheduling your first orthodontic aligner evaluation, planning facial aesthetic laser sessions, or requiring dental surgery, our compassionate staff is here to assist you at every step across 4 Regional Centres.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 mt-6 sm:mt-8">
              <button
                onClick={handleBookClick}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-brandSky via-[#198BC8] to-brandBlue text-white font-headline font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg shadow-brandSky/25 hover:shadow-brandSky/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Book an Appointment</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => { navigate('/doctors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-headline font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full border border-white/20 transition-all cursor-pointer hover:border-white/40"
              >
                <span>Meet Our Doctors</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="text-center text-xs text-slate-400 mt-12">
          This directory features verified active clinical and administrative team members of Jerush Dentofacial & Cosmetic Laser Centre across Thuckalay, Chennai, Trichy and Groups.
        </p>

      </div>

      {/* Interactive Staff Profile Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedMember(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 text-left animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header Banner */}
            <div className={`relative h-28 bg-gradient-to-r ${selectedMember.deptConfig.gradient} p-5 flex justify-between items-start text-white`}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider font-headline">
                <selectedMember.deptConfig.icon className="w-3 h-3 text-white" />
                <span>{selectedMember.deptConfig.label}</span>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Avatar Overlap */}
            <div className="relative px-6 pt-0 pb-6">
              <div className="flex items-end justify-between -mt-12 mb-4">
                <div className={`w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 ring-4 ring-white shadow-xl flex items-center justify-center`}>
                  {selectedMember.image ? (
                    <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${selectedMember.deptConfig.gradient} flex items-center justify-center text-white font-headline font-black text-2xl`}>
                      {getInitials(selectedMember.name)}
                    </div>
                  )}
                </div>

                <div className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full border ${selectedMember.branchInfo.badgeClass}`}>
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{selectedMember.branchInfo.cleanName}</span>
                </div>
              </div>

              {/* Name & Designation */}
              <h3 className="font-headline font-extrabold text-xl text-slate-900 leading-tight">
                {selectedMember.name}
              </h3>
              <p className="text-brandSky font-bold text-sm mt-0.5">
                {selectedMember.role}
              </p>

              {/* Department Bio & Details */}
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 font-headline uppercase tracking-wider mb-1">
                    <Building2 className="w-3.5 h-3.5 text-brandBlue" />
                    <span>Department Role</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {selectedMember.deptConfig.desc}
                  </p>
                </div>

                <div className="bg-brandBlue/5 p-3.5 rounded-xl border border-brandBlue/15">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brandBlue font-headline uppercase tracking-wider mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brandSky" />
                    <span>Verified Hospital Staff</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Jerush Dentofacial & Cosmetic Laser Centre • Registered Team Member #{selectedMember.deptConfig.code}-{String(selectedMember.id).padStart(2, '0')}
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => { setSelectedMember(null); handleBookClick(); }}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-brandBlue via-[#198BC8] to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-brandBlue/20 hover:shadow-lg transition-all cursor-pointer text-center"
                >
                  Contact Clinic
                </button>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
