import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../../services/blogService';
import { ArrowRight, Clock, Calendar, BookOpen, Sparkles, User, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogPreviewSection({ blogs }) {
  const navigate = useNavigate();
  const [localBlogs, setLocalBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setLocalBlogs(blogs);
      setLoading(false);
    } else {
      setLoading(true);
      blogService.getBlogs()
        .then((data) => {
          setLocalBlogs(data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch blog previews:", err);
          setLoading(false);
        });
    }
  }, [blogs]);

  const handleBlogClick = (slug) => {
    navigate(`/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllClick = () => {
    navigate('/blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Derive categories
  const categories = ['All', ...Array.from(new Set(localBlogs.map(b => b.category).filter(Boolean)))].slice(0, 5);

  const filteredBlogs = (activeCategory === 'All'
    ? localBlogs
    : localBlogs.filter(b => b.category === activeCategory)
  ).slice(0, 3);

  if (loading) {
    return (
      <section className="w-full py-16 bg-slate-50/50 text-slate-800 font-body relative overflow-hidden text-left flex items-center justify-center min-h-[380px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brandSky border-t-brandBlue rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-headline">Loading Articles...</span>
        </div>
      </section>
    );
  }

  if (localBlogs.length === 0) {
    return null;
  }

  return (
    <section id="blog-preview" className="w-full py-20 lg:py-28 bg-gradient-to-b from-slate-50/60 via-white to-slate-50/40 text-slate-800 font-body relative overflow-hidden text-left">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brandSky/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-brandBlue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-brandSky/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brandSky/10 border border-brandSky/25 text-brandSky mb-4 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brandSky"></span>
              </span>
              <BookOpen className="w-3.5 h-3.5 text-brandSky" />
              <span className="text-[10px] sm:text-[11px] font-headline font-extrabold uppercase tracking-widest">
                Clinical Journal & Insights
              </span>
            </div>

            {/* Headline with Gradient Text Accent */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-headline text-slate-900 leading-[1.15] tracking-tight">
              Expert Knowledge for Your{' '}
              <span className="bg-gradient-to-r from-brandBlue via-[#198BC8] to-brandSky bg-clip-text text-transparent">
                Smile & Skin Health
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-500 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              Evidence-based clinical guides, oral health breakthroughs, and cosmetic dermatological insights authored directly by our board-certified specialists.
            </p>
          </div>

          {/* Desktop Top-Right Action Button */}
          <div className="hidden md:flex flex-col items-end gap-3 shrink-0">
            <button
              onClick={handleViewAllClick}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white hover:bg-brandBlue text-slate-700 hover:text-white border border-slate-200/80 hover:border-brandBlue shadow-sm hover:shadow-lg hover:shadow-brandBlue/15 font-headline font-bold text-xs uppercase tracking-wider transition-all duration-300 group"
            >
              <span>Explore All Articles</span>
              <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Category Filters (Modern Segmented Pill Dock) */}
        {categories.length > 1 && (
          <div className="flex items-center mb-10 overflow-x-auto no-scrollbar scroll-smooth">
            <div className="inline-flex max-w-full overflow-x-auto no-scrollbar p-1.5 bg-slate-100/90 backdrop-blur-xl rounded-full border border-slate-200/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] items-center gap-1.5 sm:gap-2">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`group relative flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-bold font-headline transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer select-none ${
                      isSelected
                        ? 'bg-gradient-to-r from-brandBlue via-[#198BC8] to-brandSky text-white shadow-lg shadow-brandSky/25 scale-[1.02]'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                    }`}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
                    )}
                    <span>{cat === 'All' ? 'All Insights' : cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBlogs.map((blog, idx) => {
            const authorName = blog.author?.name || (typeof blog.author === 'string' ? blog.author : 'Jerush Specialist');
            const authorImg = blog.author?.image || '/images/doctors/dr-bladbin-cutout.webp';
            const authorSpec = blog.author?.specialization || blog.author?.qualification || 'Medical Team';
            const publishedDate = blog.publishedDate || 'Recent Update';
            const readingTime = blog.readingTime || '5 min read';
            const category = blog.category || 'Clinical Care';
            const featuredImage = blog.featuredImage || '/images/jerush-banner1.webp';

            return (
              <motion.article
                key={blog.slug || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                onClick={() => handleBlogClick(blog.slug)}
                className="bg-white rounded-3xl border border-slate-200/80 hover:border-slate-300/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06),0_10px_25px_-5px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-8px_rgba(15,23,42,0.12),0_8px_16px_-4px_rgba(15,23,42,0.06)] overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-400 group relative"
              >
                <div>
                  {/* Image Container with Floating Badges */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-950">
                    <img
                      src={featuredImage}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      onError={(e) => {
                        e.target.src = '/images/jerush-banner1.webp';
                      }}
                    />

                    {/* Gradient Overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Top Floating Glassmorphism Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      {/* Category Pill */}
                      <span className="px-3 py-1 rounded-full bg-slate-950/65 backdrop-blur-md border border-white/20 text-white font-headline font-bold text-[10px] sm:text-[11px] uppercase tracking-wider shadow-md">
                        {category}
                      </span>

                      {/* Reading Time */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 font-headline font-bold text-[10px] sm:text-[11px] shadow-md">
                        <Clock className="w-3 h-3 text-brandSky" />
                        <span>{readingTime}</span>
                      </span>
                    </div>

                    {/* Bottom Date Overlay */}
                    <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-white/90 text-xs font-medium drop-shadow-sm pointer-events-none">
                      <Calendar className="w-3.5 h-3.5 text-brandSky" />
                      <span>{publishedDate}</span>
                    </div>

                    {/* Floating Center Action Button on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-brandSky/90 backdrop-blur-md text-white flex items-center justify-center shadow-xl shadow-brandSky/40 scale-75 group-hover:scale-100 transition-transform duration-300">
                        <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-5 sm:p-6 text-left">
                    <h3 className="font-headline font-black text-lg sm:text-xl text-slate-900 leading-snug tracking-tight line-clamp-2 group-hover:text-brandBlue transition-colors duration-300 mb-2.5">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-[13.5px] leading-relaxed line-clamp-2 font-normal">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Doctor Info & Read More Button */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-left">
                  {/* Doctor Info */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <img
                        src={authorImg}
                        alt={authorName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-headline font-bold text-xs text-slate-800 truncate group-hover:text-brandSky transition-colors">
                        {authorName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium truncate">
                        {authorSpec}
                      </span>
                    </div>
                  </div>

                  {/* Read Link */}
                  <div className="inline-flex items-center gap-1.5 text-xs font-headline font-bold text-brandBlue group-hover:text-brandSky transition-colors shrink-0">
                    <span className="hidden xs:inline sm:inline">Read</span>
                    <div className="w-6 h-6 rounded-full bg-brandBlue/5 group-hover:bg-brandSky group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Mobile Bottom Explore Button */}
        <div className="flex flex-col items-center justify-center mt-12 md:hidden">
          <button
            onClick={handleViewAllClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-brandBlue via-[#198BC8] to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider shadow-lg shadow-brandSky/25 active:scale-95 transition-all"
          >
            <span>Browse All Articles & Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
