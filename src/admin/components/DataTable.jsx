import React, { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DataTable({
  columns,        // [{ key, label, render?, sortable?, width? }]
  data,           // array of row objects
  searchKeys,     // array of keys to search within
  actions,        // (row) => JSX — renders action buttons
  pageSize = 8,
  emptyMessage = 'No records found.'
}) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(0);

  // Filter
  const filtered = useMemo(() => {
    if (!search.trim() || !searchKeys?.length) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      searchKeys.some((key) => {
        const val = row[key];
        if (typeof val === 'string') return val.toLowerCase().includes(q);
        if (Array.isArray(val)) return val.some((v) => String(v).toLowerCase().includes(q));
        return false;
      })
    );
  }, [data, search, searchKeys]);

  // Sort
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey] ?? '';
      const bVal = b[sortKey] ?? '';
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safeP = Math.min(page, totalPages - 1);
  const paged = sorted.slice(safeP * pageSize, (safeP + 1) * pageSize);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };  return (
    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-800/80 rounded-2xl shadow-xl overflow-hidden relative z-10">
      {/* Toolbar */}
      {searchKeys?.length > 0 && (
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/60">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              placeholder="Search records..."
              className="w-full pl-9 pr-4 py-2.5 bg-white/50 dark:bg-slate-950/45 border border-slate-200/60 dark:border-slate-800/60 rounded-xl text-xs text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-brandSky focus:bg-white/80 dark:focus:bg-slate-950/80 focus:ring-2 focus:ring-brandSky/15 transition-all"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100/40 dark:bg-slate-950/30 border-b border-slate-200/50 dark:border-slate-800/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3.5 text-[10px] font-headline font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap ${col.sortable !== false ? 'cursor-pointer select-none hover:text-slate-800 dark:hover:text-slate-200' : ''}`}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable !== false && sortKey === col.key && (
                      sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="px-4 py-3.5 text-[10px] font-headline font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-[100px]">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paged.length > 0 ? paged.map((row, ri) => (
              <tr key={row.id || ri} className="border-b border-slate-100/60 dark:border-slate-800/30 hover:bg-slate-100/30 dark:hover:bg-slate-800/15 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-xs text-slate-650 dark:text-slate-300 font-medium">
                    {col.render ? col.render(row) : (row[col.key] ?? '—')}
                  </td>
                ))}
                {actions && <td className="px-4 py-3">{actions(row)}</td>}
              </tr>
            )) : (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-4 py-12 text-center text-sm text-slate-400 dark:text-slate-500 font-medium"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 dark:border-slate-800/60">
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
            Showing {safeP * pageSize + 1}–{Math.min((safeP + 1) * pageSize, sorted.length)} of {sorted.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled={safeP === 0}
              onClick={() => setPage(safeP - 1)}
              className="p-1.5 rounded-lg text-slate-450 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer border-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-7 h-7 rounded-lg text-[10px] font-bold transition-all cursor-pointer border-none ${safeP === i ? 'bg-brandBlue text-white shadow-sm shadow-brandBlue/20' : 'text-slate-550 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={safeP >= totalPages - 1}
              onClick={() => setPage(safeP + 1)}
              className="p-1.5 rounded-lg text-slate-450 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer border-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
