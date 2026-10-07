import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Radio, Check, X, Eye, EyeOff, Save, Sparkles, Sliders, ExternalLink } from 'lucide-react';
import DataTable from '../components/DataTable';
import { marqueeService } from '../../services/marqueeService';

export default function AdminMarquee() {
  const [items, setItems] = useState([]);
  const [settings, setSettings] = useState({
    enabled: false,
    speed: 'normal',
    pauseOnHover: true,
    theme: 'dark-gradient',
    showLiveBadge: true,
    liveBadgeText: 'LIVE UPDATES',
  });

  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    badge: 'NEW',
    badgeColor: 'bg-brandSky text-white',
    link: '',
    linkText: 'Learn More',
    isActive: true,
    priority: 1,
  });

  const badgePresets = [
    { label: 'NEW', color: 'bg-brandSky text-white' },
    { label: 'OFFER', color: 'bg-emerald-500 text-white' },
    { label: 'HELPLINE', color: 'bg-rose-500 text-white' },
    { label: 'DUBAI SPECIAL', color: 'bg-amber-500 text-slate-950 font-bold' },
    { label: 'ANNOUNCEMENT', color: 'bg-purple-500 text-white' },
    { label: 'URGENT', color: 'bg-red-600 text-white' },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const [fetchedItems, fetchedSettings] = await Promise.all([
        marqueeService.getItems(),
        marqueeService.getSettings(),
      ]);
      setItems(fetchedItems);
      setSettings(fetchedSettings);
    } catch (e) {
      console.error("Error fetching marquee news data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateSetting = async (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    try {
      await marqueeService.updateSettings(updated);
    } catch (e) {
      console.error("Failed to auto-save marquee setting:", e);
    }
  };

  const handleToggleMarquee = async () => {
    const nextEnabled = !settings.enabled;
    await handleUpdateSetting('enabled', nextEnabled);
  };

  const handleToggleItemActive = async (item) => {
    await marqueeService.toggleActive(item.id);
    fetchData();
  };

  const handleDeleteItem = async (item) => {
    if (confirm(`Delete marquee announcement: "${item.title}"?`)) {
      await marqueeService.deleteItem(item.id);
      fetchData();
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      badge: 'NEW',
      badgeColor: 'bg-brandSky text-white',
      link: '',
      linkText: 'Learn More',
      isActive: true,
      priority: items.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      badge: item.badge || '',
      badgeColor: item.badgeColor || 'bg-brandBlue text-white',
      link: item.link || '',
      linkText: item.linkText || 'Learn More',
      isActive: item.isActive !== undefined ? item.isActive : true,
      priority: item.priority || 1,
    });
    setModalOpen(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingItem) {
      await marqueeService.updateItem(editingItem.id, formData);
    } else {
      await marqueeService.addItem(formData);
    }

    setModalOpen(false);
    fetchData();
  };

  const columns = [
    {
      key: 'badge',
      label: 'Badge Tag',
      width: '120px',
      render: (row) => (
        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${row.badgeColor || 'bg-slate-700 text-white'}`}>
          {row.badge || 'NEWS'}
        </span>
      ),
    },
    {
      key: 'title',
      label: 'Announcement Title',
      render: (row) => (
        <div className="flex flex-col max-w-[320px]">
          <span className="font-bold text-slate-800 dark:text-white line-clamp-2">{row.title}</span>
          {row.link && (
            <span className="text-[11px] text-brandSky flex items-center gap-1 mt-0.5 font-medium">
              <ExternalLink className="w-3 h-3" /> {row.linkText || 'Link'}: <code className="text-slate-400 font-mono text-[10px]">{row.link}</code>
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      width: '110px',
      render: (row) => (
        <button
          onClick={() => handleToggleItemActive(row)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${row.isActive
              ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 hover:bg-emerald-500/20'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700 hover:bg-slate-300'
            }`}
        >
          {row.isActive ? <Eye className="w-3 h-3 text-emerald-500" /> : <EyeOff className="w-3 h-3" />}
          <span>{row.isActive ? 'Active' : 'Disabled'}</span>
        </button>
      ),
    },
  ];

  const inputCls = "w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:border-brandSky transition-colors";
  const labelCls = "text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative z-10 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brandBlue/10 text-brandBlue dark:text-brandSky">
              <Radio className="w-5 h-5 animate-pulse" />
            </span>
            <h1 className="font-headline font-extrabold text-xl text-slate-800 dark:text-white">
              Marquee Top News Bar
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Manage top announcement ticker news, special offers and helpline alerts running above the navigation bar
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Announcement
        </button>
      </div>

      {/* Marquee Configuration & Style Settings */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brandSky" />
            <h3 className="font-headline font-bold text-sm text-slate-800 dark:text-white">
              Global Display & Style Controls
            </h3>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Auto-Saves Instantly</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Master Enable/Disable Switch */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="font-headline font-bold text-xs text-slate-800 dark:text-white block">
                Marquee Status
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {settings.enabled ? 'Visible on site' : 'Hidden from site'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggleMarquee}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${settings.enabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${settings.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>

          {/* Theme Selector */}
          <div>
            <label className={labelCls}>Bar Theme Background</label>
            <select
              value={settings.theme}
              onChange={(e) => handleUpdateSetting('theme', e.target.value)}
              className={inputCls}
            >
              <option value="dark-gradient">Dark Royal Gradient (Default)</option>
              <option value="brand-blue">Brand Blue Solid</option>
              <option value="sky-glow">Vibrant Sky Blue</option>
              <option value="emerald-notice">Emerald Green Offer</option>
              <option value="amber-alert">Amber Emergency Alert</option>
            </select>
          </div>

          {/* Scrolling Speed Selector */}
          <div>
            <label className={labelCls}>Scroll Speed</label>
            <select
              value={settings.speed}
              onChange={(e) => handleUpdateSetting('speed', e.target.value)}
              className={inputCls}
            >
              <option value="slow">Slow & Relaxed (90s)</option>
              <option value="normal">Normal Smooth (60s)</option>
              <option value="fast">Fast Ticker (35s)</option>
            </select>
          </div>

          {/* Live Badge Text */}
          <div>
            <label className={labelCls}>Live Badge Tag</label>
            <input
              type="text"
              value={settings.liveBadgeText}
              onChange={(e) => handleUpdateSetting('liveBadgeText', e.target.value)}
              placeholder="e.g. LIVE UPDATES"
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* Announcements Table */}
      <DataTable
        columns={columns}
        data={items}
        searchKeys={['title', 'badge', 'link']}
        actions={(row) => (
          <div className="flex items-center gap-1">
            <button
              onClick={() => openEditModal(row)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-brandBlue hover:bg-brandBlue/5 transition-colors"
              title="Edit Announcement"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleDeleteItem(row)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Delete Announcement"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      />

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative overflow-hidden animate-fadeIn space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-headline font-extrabold text-lg text-slate-800 dark:text-white">
                {editingItem ? 'Edit Announcement' : 'Add New Announcement'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className={labelCls}>Announcement Text *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Free Dental Consultation Camp this weekend at Thuckalay branch!"
                  className={`${inputCls} resize-y`}
                />
              </div>

              {/* Badge & Color */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Badge Label</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. OFFER, NEW, HELPLINE"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Badge Color Style</label>
                  <select
                    value={formData.badgeColor}
                    onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })}
                    className={inputCls}
                  >
                    <option value="bg-brandSky text-white">Brand Sky (Blue)</option>
                    <option value="bg-emerald-500 text-white">Emerald Green (Offer)</option>
                    <option value="bg-rose-500 text-white">Rose Red (Emergency)</option>
                    <option value="bg-amber-500 text-slate-950 font-bold">Gold Amber (Special)</option>
                    <option value="bg-purple-500 text-white">Purple Accent</option>
                  </select>
                </div>
              </div>

              {/* Quick Badge Presets */}
              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Quick Badge Presets
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {badgePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, badge: preset.label, badgeColor: preset.color })}
                      className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase transition-all ${preset.color} hover:opacity-90`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Link & Button Text */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Action Link URL (Optional)</label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="/contact or tel:+91..."
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Button Text</label>
                  <input
                    type="text"
                    value={formData.linkText}
                    onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                    placeholder="e.g. Book Now"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-brandSky focus:ring-brandSky border-slate-300"
                />
                <label htmlFor="isActive" className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Enable and show this announcement immediately
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-headline font-bold text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  {editingItem ? 'Update' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
