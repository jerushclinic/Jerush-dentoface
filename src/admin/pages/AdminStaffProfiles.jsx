import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, Plus, Search, Filter, LayoutGrid, Table as TableIcon, 
  MapPin, Phone, Heart, Calendar, Shield, Sparkles, Building2, 
  Pencil, Trash2, BadgeCheck, ExternalLink, ArrowUpDown, ChevronRight,
  Download, RefreshCw, Layers
} from 'lucide-react';
import { staffService } from '../../services/staffService';
import StaffDetailModal from '../components/StaffDetailModal';
import StaffFormModal from '../components/StaffFormModal';
import DepartmentModal from '../components/DepartmentModal';

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

function formatDobBadge(dobString) {
  if (!dobString) return '—';
  const age = calculateAge(dobString);
  const d = new Date(dobString);
  if (isNaN(d.getTime())) return dobString;
  const day = d.getDate();
  const month = d.toLocaleDateString('en-GB', { month: 'short' });
  return age ? `${day} ${month} (${age}y)` : `${day} ${month}`;
}

export default function AdminStaffProfiles({ standalone = false }) {
  const [staffList, setStaffList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [sortKey, setSortKey] = useState('empCode');
  const [sortAsc, setSortAsc] = useState(true);

  // Modals
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [activeStaffForDetail, setActiveStaffForDetail] = useState(null);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const [deptModalOpen, setDeptModalOpen] = useState(false);

  // Load all initial data
  const loadData = async () => {
    setLoading(true);
    try {
      const [allStaff, allDepts, allBranches] = await Promise.all([
        staffService.getStaffProfiles(),
        staffService.getDepartments(),
        staffService.getBranches()
      ]);
      setStaffList(allStaff);
      setDepartments(allDepts);
      setBranches(allBranches);
    } catch (err) {
      console.error('Failed to load staff profiles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Department counts lookup
  const deptCounts = useMemo(() => {
    const counts = {};
    staffList.forEach((s) => {
      counts[s.department] = (counts[s.department] || 0) + 1;
    });
    return counts;
  }, [staffList]);

  // Filtered & Sorted staff
  const filteredStaff = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return staffList.filter((s) => {
      // Dept filter
      if (selectedDept !== 'all' && s.department !== selectedDept) return false;
      // Branch filter
      if (selectedBranch !== 'all' && s.branch !== selectedBranch) return false;
      // Status filter
      if (selectedStatus !== 'all' && s.status !== selectedStatus) return false;

      // Text search
      if (!q) return true;
      return (
        (s.name || '').toLowerCase().includes(q) ||
        (s.empCode || '').toLowerCase().includes(q) ||
        (s.role || '').toLowerCase().includes(q) ||
        (s.phone || '').toLowerCase().includes(q) ||
        (s.address || '').toLowerCase().includes(q) ||
        (s.bloodGroup || '').toLowerCase().includes(q) ||
        (s.department || '').toLowerCase().includes(q) ||
        (s.branch || '').toLowerCase().includes(q)
      );
    }).sort((a, b) => {
      const aVal = a[sortKey] || '';
      const bVal = b[sortKey] || '';
      const comp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortAsc ? comp : -comp;
    });
  }, [staffList, searchQuery, selectedDept, selectedBranch, selectedStatus, sortKey, sortAsc]);

  // Stats
  const totalStaff = staffList.length;
  const activeStaff = staffList.filter(s => s.status === 'Active').length;
  const totalDepartments = departments.length;
  const newJoiners = staffList.filter(s => {
    if (!s.dateOfJoining) return false;
    const joinYear = new Date(s.dateOfJoining).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - joinYear <= 2;
  }).length;

  // CRUD Handlers
  const handleAddStaff = () => {
    setEditingStaff(null);
    setFormModalOpen(true);
  };

  const handleEditStaff = (staff) => {
    setEditingStaff(staff);
    setFormModalOpen(true);
  };

  const handleDeleteStaff = async (staff) => {
    if (window.confirm(`Are you sure you want to delete ${staff.name} (${staff.empCode})?`)) {
      await staffService.deleteStaffProfile(staff.id);
      await loadData();
    }
  };

  const handleSaveStaff = async (formData) => {
    if (editingStaff) {
      await staffService.updateStaffProfile(editingStaff.id, formData);
    } else {
      await staffService.addStaffProfile(formData);
    }
    await loadData();
  };

  const handleSaveDepartment = async (newDept) => {
    await staffService.addDepartment(newDept);
    await loadData();
  };

  const handleCardClick = (staff) => {
    setActiveStaffForDetail(staff);
    setDetailModalOpen(true);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const getDeptObj = (deptId) => {
    return departments.find(d => d.id === deptId) || {
      label: deptId,
      code: 'STF',
      color: 'from-brandSky to-brandBlue',
      badgeColor: 'bg-brandSky/15 text-brandBlue dark:text-sky-300 border-brandSky/30'
    };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
        <div className="w-10 h-10 border-3 border-brandBlue border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Staff Profiles...</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${standalone ? 'max-w-7xl mx-auto p-4 sm:p-8 min-h-screen font-body' : ''}`}>
      {/* Top Banner / Hero */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-brandBlue/90 to-slate-900 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
        {/* Glow Blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brandSky/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brandSky text-[10px] font-extrabold uppercase tracking-widest font-headline">
            <Shield className="w-3 h-3" />
            Human Resources & Staff Administration
          </div>
          <h1 className="font-headline font-black text-2xl sm:text-3xl text-white tracking-tight">
            Jerush Staff Profiles
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Centralized directory & identity management across all 17 clinical, surgical, administrative, and lab departments.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="relative z-10 flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setDeptModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-headline font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-brandSky" />
            Add Department
          </button>

          <button
            onClick={handleAddStaff}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brandSky to-brandBlue hover:from-brandSky/90 hover:to-brandBlue/90 text-white font-headline font-bold text-xs uppercase tracking-wider shadow-lg shadow-brandBlue/30 hover:shadow-xl transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Staff Profile
          </button>
        </div>
      </div>

      {/* Overview Stat Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-headline font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Staff</p>
            <p className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-0.5">{totalStaff}</p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">Enrolled Employees</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-brandBlue/10 dark:bg-brandBlue/20 text-brandBlue dark:text-brandSky flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-headline font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Active On Duty</p>
            <p className="font-headline font-black text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400 mt-0.5">{activeStaff}</p>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Active Clinic Personnel</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-headline font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Departments</p>
            <p className="font-headline font-black text-2xl sm:text-3xl text-purple-600 dark:text-purple-400 mt-0.5">{totalDepartments}</p>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Clinical & Support Wings</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-headline font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Hospital Centres</p>
            <p className="font-headline font-black text-2xl sm:text-3xl text-brandSky mt-0.5">{branches.length}</p>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Regional Wings</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-brandSky/15 text-brandBlue flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-sm space-y-4">
        {/* Search & Top Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, Emp Code, designation, phone, or blood group..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-brandSky focus:ring-2 focus:ring-brandSky/15 transition-all shadow-inner"
            />
          </div>

          {/* Branch & Status Selectors + View Mode */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Branch Filter */}
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
            >
              <option value="all">All Centres ({staffList.length})</option>
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b.replace('Jerush ', '')}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-800 text-brandBlue dark:text-brandSky shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Grid Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-800 text-brandBlue dark:text-brandSky shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 17 Departments Horizontal Filter Tabs Carousel */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setSelectedDept('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                selectedDept === 'all'
                  ? 'bg-brandBlue text-white border-brandBlue shadow-md shadow-brandBlue/20'
                  : 'bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>All Wings</span>
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-extrabold ${
                selectedDept === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              }`}>
                {staffList.length}
              </span>
            </button>

            {departments.map((d) => {
              const count = deptCounts[d.id] || 0;
              const isActive = selectedDept === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDept(d.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-brandBlue text-white border-brandBlue shadow-md shadow-brandBlue/20'
                      : 'bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span>{d.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-extrabold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Result Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-1">
        <span>Showing {filteredStaff.length} of {staffList.length} staff records</span>
        {(searchQuery || selectedDept !== 'all' || selectedBranch !== 'all' || selectedStatus !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDept('all');
              setSelectedBranch('all');
              setSelectedStatus('all');
            }}
            className="text-brandSky hover:underline font-bold"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Main Content Area: Grid View or Table View */}
      {filteredStaff.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-headline font-bold text-base text-slate-800 dark:text-white">No staff records found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search terms or filter selection. You can also add a new staff member.
          </p>
          <button
            onClick={handleAddStaff}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brandBlue text-white text-xs font-bold shadow-md hover:bg-brandBlue/90 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Staff Member
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredStaff.map((staff) => {
            const deptObj = getDeptObj(staff.department);
            const initials = staff.name
              ? staff.name.split(' ').filter(Boolean).slice(-2).map(n => n[0]).join('').toUpperCase()
              : 'JD';

            return (
              <div
                key={staff.id}
                onClick={() => handleCardClick(staff)}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brandSky/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between text-left will-change-transform transform-gpu"
              >
                {/* Top Colored Banner based on Department */}
                <div className={`h-20 bg-gradient-to-r ${deptObj.color} relative p-3 flex items-start justify-between overflow-hidden shadow-inner`}>
                  {/* Subtle decorative mesh overlay */}
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />

                  {/* Left: Emp Code */}
                  <span className="relative z-10 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white font-mono text-[10px] font-black tracking-wider border border-white/20 shadow-sm">
                    {staff.empCode}
                  </span>

                  {/* Right: Duty Status */}
                  <span 
                    className={`relative z-10 inline-flex items-center gap-1 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-sm border ${
                      staff.status === 'Active'
                        ? 'bg-white/95 dark:bg-slate-900/95 text-emerald-600 border-emerald-300'
                        : staff.status === 'On Leave'
                        ? 'bg-white/95 dark:bg-slate-900/95 text-amber-600 border-amber-300'
                        : 'bg-white/95 dark:bg-slate-900/95 text-slate-500 border-slate-300'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${staff.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-current'}`} />
                    {staff.status}
                  </span>
                </div>

                {/* Card Body */}
                <div className="px-5 pb-5 pt-0 relative flex-1 flex flex-col justify-between">
                  <div>
                    {/* Floating Avatar (overlaps the banner) */}
                    <div className="flex items-end justify-between -mt-10 mb-3">
                      <div className="w-20 h-20 min-w-[5rem] min-h-[5rem] max-w-[5rem] max-h-[5rem] rounded-2xl p-1 bg-white dark:bg-slate-900 shadow-xl border-2 border-white dark:border-slate-900 shrink-0 group-hover:scale-105 transition-transform">
                        <div className="w-full h-full rounded-[12px] overflow-hidden bg-gradient-to-br from-brandBlue to-brandSky relative flex items-center justify-center">
                          {staff.image ? (
                            <img
                              src={staff.image}
                              alt={staff.name}
                              className="w-full h-full object-cover object-top block"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <span className="font-headline font-black text-base text-white tracking-tight">
                              {initials}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quick Edit/Delete Icons on top right of body */}
                      <div className="flex items-center gap-1 pb-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleEditStaff(staff)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-brandBlue hover:bg-brandBlue/10 transition-colors cursor-pointer"
                          title="Edit Profile"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteStaff(staff)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                          title="Delete Profile"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Staff Identity */}
                    <div className="space-y-1 mb-3.5">
                      <h3 className="font-headline font-black text-base text-slate-900 dark:text-white group-hover:text-brandBlue transition-colors leading-tight">
                        {staff.name}
                      </h3>
                      <p className="text-xs font-bold text-brandSky line-clamp-1">
                        {staff.role}
                      </p>
                      <div className="pt-0.5">
                        <span className={`inline-block text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-md border ${deptObj.badgeColor}`}>
                          {deptObj.label}
                        </span>
                      </div>
                    </div>

                    {/* Information Chips Matrix: Blood, DOB (Age), Centre, Phone */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                      {/* Blood Group Chip */}
                      <div className="px-2.5 py-1.5 rounded-xl bg-red-500/5 dark:bg-red-500/10 border border-red-500/15 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Blood</span>
                        <span className="font-black text-red-600 dark:text-red-400 flex items-center gap-1 text-[11px]">
                          <Heart className="w-3 h-3 fill-current" />
                          {staff.bloodGroup || '—'}
                        </span>
                      </div>

                      {/* DOB & Age Chip */}
                      <div className="px-2.5 py-1.5 rounded-xl bg-brandSky/5 dark:bg-brandSky/10 border border-brandSky/15 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">DOB</span>
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-[10px] sm:text-[11px] flex items-center gap-1 truncate" title={staff.dob ? `${staff.dob}` : ''}>
                          <Calendar className="w-3 h-3 text-brandSky shrink-0" />
                          <span className="truncate">{formatDobBadge(staff.dob)}</span>
                        </span>
                      </div>

                      {/* Centre / Location Chip */}
                      <div className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 truncate">
                        <MapPin className="w-3 h-3 text-brandSky shrink-0" />
                        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate">
                          {staff.branch ? staff.branch.replace('Jerush ', '').replace(' – Thuckalay', '') : 'Thuckalay'}
                        </span>
                      </div>

                      {/* Contact Phone Chip */}
                      <div className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between truncate">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
                          <Phone className="w-3 h-3 text-emerald-500 shrink-0" />
                        </span>
                        <span className="font-mono font-bold text-slate-700 dark:text-slate-200 text-[10px] sm:text-[11px] truncate">
                          {staff.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Button: View ID Badge */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => handleCardClick(staff)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-gradient-to-r group-hover:from-brandBlue group-hover:to-brandSky group-hover:text-white font-headline font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-sm group-hover:shadow-md cursor-pointer"
                    >
                      <BadgeCheck className="w-4 h-4 text-brandSky group-hover:text-white transition-colors" />
                      <span>View ID Badge</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden text-left">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-slate-950/60 border-b border-slate-200/60 dark:border-slate-800 text-[10px] font-headline font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-3.5">Photo</th>
                  <th 
                    className="px-4 py-3.5 cursor-pointer select-none hover:text-slate-700 dark:hover:text-white"
                    onClick={() => handleSort('empCode')}
                  >
                    <div className="flex items-center gap-1">
                      <span>Emp Code</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3.5 cursor-pointer select-none hover:text-slate-700 dark:hover:text-white"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      <span>Name</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-4 py-3.5">Department</th>
                  <th className="px-4 py-3.5">Designation</th>
                  <th className="px-4 py-3.5">Centre</th>
                  <th className="px-4 py-3.5">Blood Group</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredStaff.map((staff) => {
                  const deptObj = getDeptObj(staff.department);
                  const initials = staff.name
                    ? staff.name.split(' ').filter(Boolean).slice(-2).map(n => n[0]).join('').toUpperCase()
                    : 'JD';

                  return (
                    <tr 
                      key={staff.id}
                      onClick={() => handleCardClick(staff)}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-850/50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3">
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-brandBlue/10 p-0.5 shrink-0">
                          {staff.image ? (
                            <img src={staff.image} alt={staff.name} className="w-full h-full object-cover rounded-[10px]" />
                          ) : (
                            <div className="w-full h-full rounded-[10px] bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-[10px] text-brandBlue">
                              {initials}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3 font-mono font-bold text-slate-700 dark:text-slate-200">
                        {staff.empCode}
                      </td>

                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                        {staff.name}
                      </td>

                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${deptObj.badgeColor}`}>
                          {deptObj.label}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300 font-medium">
                        {staff.role}
                      </td>

                      <td className="px-4 py-3 text-slate-500 text-[11px]">
                        {staff.branch ? staff.branch.replace('Jerush ', '') : '—'}
                      </td>

                      <td className="px-4 py-3">
                        <span className="font-extrabold text-red-600 dark:text-red-400">
                          {staff.bloodGroup || '—'}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span 
                          className={`inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                            staff.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400'
                              : staff.status === 'On Leave'
                              ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400'
                              : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {staff.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleCardClick(staff)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-brandBlue hover:bg-brandBlue/10 transition-colors"
                            title="View ID Badge"
                          >
                            <BadgeCheck className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEditStaff(staff)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-brandBlue hover:bg-brandBlue/10 transition-colors"
                            title="Edit Staff"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteStaff(staff)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                            title="Delete Staff"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      <StaffDetailModal
        open={detailModalOpen}
        staff={activeStaffForDetail}
        departments={departments}
        onClose={() => setDetailModalOpen(false)}
        onEdit={(st) => handleEditStaff(st)}
      />

      <StaffFormModal
        open={formModalOpen}
        staff={editingStaff}
        departments={departments}
        branches={branches}
        onClose={() => setFormModalOpen(false)}
        onSave={handleSaveStaff}
        onOpenDepartmentModal={() => {
          setFormModalOpen(false);
          setDeptModalOpen(true);
        }}
      />

      <DepartmentModal
        open={deptModalOpen}
        onClose={() => setDeptModalOpen(false)}
        onSave={handleSaveDepartment}
      />
    </div>
  );
}
