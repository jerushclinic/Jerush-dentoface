import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { Search, Calendar, Clock } from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';

export default function BlogsPage() {
  const navigate = useNavigate();
  const [blogsList, setBlogsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await blogService.getBlogs();
        setBlogsList(data);
      } catch (err) {
        console.error("Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = ['all', ...new Set(blogsList.map((b) => b.category))];

  const filteredBlogs = blogsList.filter((blog) => {
    const matchesStatus = blog.status === 'published';
    const matchesCategory = activeCategory === 'all' || blog.category === activeCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const handlePostClick = (slug) => {
    navigate(`/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-slate-50 font-body text-left relative pt-0 pb-24 min-h-screen">
      {/* Page Header */}
      <PageBreadcrumbHero 
        title="Dental & Facial Aesthetic Medical Insights" 
        breadcrumbs={[{ label: 'Medical Insights', active: true }]} 
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Search and Category Filters */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl font-headline font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-brandBlue to-brandSky text-white shadow-md'
                    : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100'
                }`}
              >
                {cat === 'all' ? 'All Publications' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:max-w-xs shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 text-slate-800 rounded-xl placeholder-slate-400 focus:outline-none focus:border-brandSky transition-colors text-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.slug}
                onClick={() => handlePostClick(blog.slug)}
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm cursor-pointer hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-50 relative">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg bg-brandBlue/90 text-white">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-headline font-extrabold text-base sm:text-lg text-slate-800 line-clamp-2 group-hover:text-brandBlue transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 leading-relaxed font-medium">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-4 border-t border-slate-50">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {blog.publishedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readingTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredBlogs.length === 0 && !loading && (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-2xl">
            <p className="text-slate-500 font-headline font-bold text-lg">No articles found.</p>
            <p className="text-slate-400 text-xs mt-1">Try adjusting your filters or query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
