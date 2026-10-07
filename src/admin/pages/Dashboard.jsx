import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Stethoscope, FileText, Star, Image, Plus, ArrowUpRight, Activity, Briefcase, BadgeCheck } from 'lucide-react';
import StatCard from '../components/StatCard';
import { doctorService } from '../../services/doctorService';
import { treatmentService } from '../../services/treatmentService';
import { blogService } from '../../services/blogService';
import { reviewService } from '../../services/reviewService';

function formatRelativeTime(dateString) {
  if (!dateString) return '';
  // Convert standard MySQL format (YYYY-MM-DD HH:MM:SS) to standard ISO format
  const date = new Date(dateString.replace(' ', 'T'));
  const now = new Date();
  const diffMs = now - date;
  if (isNaN(diffMs)) return dateString;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ doctors: 0, treatments: 0, blogs: 0, reviews: 0 });
  const [activities, setActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  useEffect(() => {
    // Fetch stats
    Promise.all([
      doctorService.getDoctors().catch(() => []),
      treatmentService.getTreatments().catch(() => []),
      blogService.getBlogs().catch(() => []),
      reviewService.getReviews().catch(() => [])
    ]).then(([docs, treats, blogsData, revs]) => {
      setStats({
        doctors: docs.length,
        treatments: treats.length,
        blogs: blogsData.length,
        reviews: revs.length
      });
    });

    // Fetch activities
    const fetchActivities = () => {
      fetch('/api/activities.php')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setActivities(data);
          }
          setLoadingActivities(false);
        })
        .catch(() => setLoadingActivities(false));
    };

    fetchActivities();

    // Poll for updates every 30 seconds
    const interval = setInterval(() => {
      fetchActivities();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    { label: 'Staff Profiles', icon: BadgeCheck, path: '/admin/staff-profiles', color: 'brandBlue' },
    { label: 'Add Doctor', icon: Users, path: '/admin/doctors', color: 'brandBlue' },
    { label: 'New Treatment', icon: Stethoscope, path: '/admin/treatments', color: 'emerald' },
    { label: 'Write Blog', icon: FileText, path: '/admin/blog/new', color: 'violet' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline font-extrabold text-xl text-slate-800 dark:text-white">Dashboard</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">Welcome back. Here's your clinic management overview.</p>
        </div>
        <button
          onClick={() => navigate('/admin/blog/new')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          New Blog Post
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Doctors" value={stats.doctors} trend="+1" trendUp color="brandBlue" />
        <StatCard icon={Stethoscope} label="Treatments" value={stats.treatments} trend="+3" trendUp color="emerald" />
        <StatCard icon={FileText} label="Blog Posts" value={stats.blogs} trend="+2" trendUp color="violet" />
        <StatCard icon={Star} label="Patient Reviews" value={stats.reviews} trend="+5" trendUp color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
          <h3 className="font-headline font-extrabold text-sm text-slate-800 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((qa) => {
              const colorClasses = {
                brandBlue: 'bg-brandBlue/5 text-brandBlue border-brandBlue/10 dark:bg-brandBlue/10 dark:text-brandSky dark:border-brandBlue/20 hover:bg-brandBlue/10',
                emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 hover:bg-emerald-100/50',
                violet: 'bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20 hover:bg-violet-100/50',
                amber: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20 hover:bg-amber-100/50',
              }[qa.color];

              return (
                <button
                  key={qa.label}
                  onClick={() => navigate(qa.path)}
                  className="flex flex-col items-center gap-2.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-brandSky/30 dark:hover:border-brandSky/30 hover:bg-brandSky/5 dark:hover:bg-brandSky/5 hover:shadow-md transition-all duration-200 group"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${colorClasses}`}>
                    <qa.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-headline font-bold text-slate-650 dark:text-slate-350 uppercase tracking-wider">{qa.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline font-extrabold text-sm text-slate-800 dark:text-white">Recent Activity</h3>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
              <Activity className="w-3 h-3 text-brandSky animate-pulse" /> Live Feed
            </span>
          </div>

          {loadingActivities ? (
            <div className="py-8 text-center text-xs text-slate-450 dark:text-slate-550">Loading activities...</div>
          ) : activities.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-450 dark:text-slate-550">No activities recorded yet.</div>
          ) : (
            <div className="space-y-1">
              {activities.map((item, idx) => (
                <div key={item.id || idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 dark:text-slate-500 shrink-0 mt-0.5 group-hover:bg-brandBlue/10 group-hover:text-brandBlue dark:group-hover:text-brandSky transition-colors">
                    {item.type === 'blog' && <FileText className="w-3.5 h-3.5" />}
                    {item.type === 'doctor' && <Users className="w-3.5 h-3.5" />}
                    {item.type === 'review' && <Star className="w-3.5 h-3.5" />}
                    {item.type === 'treatment' && <Stethoscope className="w-3.5 h-3.5" />}
                    {item.type === 'career' && <Briefcase className="w-3.5 h-3.5" />}
                    {item.type === 'gallery' && <Image className="w-3.5 h-3.5" />}
                    {item.type === 'system' && <Activity className="w-3.5 h-3.5" />}
                    {!['blog', 'doctor', 'review', 'treatment', 'career', 'gallery', 'system'].includes(item.type) && <Activity className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{item.action}</p>
                    <p className="text-[11px] text-slate-450 dark:text-slate-400 font-medium truncate">{item.detail}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-550 font-medium shrink-0 mt-0.5">
                    {formatRelativeTime(item.created_at)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
