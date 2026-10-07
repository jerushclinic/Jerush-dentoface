import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, List } from 'lucide-react';
import { blogService } from '../services/blogService';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import { doctors } from '../data/doctors';

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeId, setActiveId] = useState('');
  const [tocOpen, setTocOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const authorDoc = useMemo(() => {
    if (!post || !post.author) return null;
    return doctors.find(
      (d) => d.name.toLowerCase().trim() === post.author.name.toLowerCase().trim()
    );
  }, [post]);

  const handleAuthorImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300"; // Fallback doctor image
  };

  // Load blog post, related posts, and recent posts dynamically
  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        const targetSlug = slug || 'clear-aligners-perfect-smile';
        const fetchedPost = await blogService.getBlogBySlug(targetSlug);
        
        if (fetchedPost) {
          setPost(fetchedPost);
          const [related, recent] = await Promise.all([
            blogService.getRelatedBlogs(fetchedPost.slug, fetchedPost.category, 3),
            blogService.getRecentBlogs(3)
          ]);
          setRelatedPosts(related);
          setRecentPosts(recent);
        } else {
          setPost(null);
        }
      } catch (err) {
        console.error("Failed to load blog data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPostData();
    setOpenFaqIndex(null);
  }, [slug]);

  // Dynamic SEO and Meta Tags for Crawlers
  useEffect(() => {
    if (post) {
      document.title = post.seoTitle || `${post.title} | Jerush Dentoface`;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = post.seoDescription || post.excerpt || '';

      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      const kvs = [];
      if (post.focusKeywords) kvs.push(post.focusKeywords);
      if (post.secondaryKeywords) kvs.push(post.secondaryKeywords);
      if (kvs.length > 0) {
        metaKeywords.content = kvs.join(', ');
      } else {
        metaKeywords.content = `${post.category}, Jerush Dentoface, Dental Clinic`;
      }
    }
  }, [post]);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parse HTML content dynamically to extract FAQs and compile TOC
  const parsedContentAndFaqs = useMemo(() => {
    if (!post || !post.content) return { cleanContent: '', faqs: [], headings: [] };

    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, 'text/html');
    
    // Find the FAQ h2 element
    const faqHeading = doc.querySelector('h2#faq, h2#faqs') || Array.from(doc.querySelectorAll('h2')).find(h2 => h2.textContent.toLowerCase().includes('frequently asked questions') || h2.textContent.toLowerCase() === 'faq' || h2.textContent.toLowerCase() === 'faqs');
    
    const faqs = [];
    if (faqHeading) {
      let currentEl = faqHeading.nextElementSibling;
      
      // Collect h3 (question) and follow-up sibling p's (answer)
      while (currentEl) {
        if (currentEl.tagName.toLowerCase() === 'h3') {
          const question = currentEl.innerHTML;
          let answer = '';
          let nextEl = currentEl.nextElementSibling;
          
          // Accumulate following elements until we hit another h3 or h2 or end of sibling list
          while (nextEl && nextEl.tagName.toLowerCase() !== 'h3' && nextEl.tagName.toLowerCase() !== 'h2') {
            answer += nextEl.outerHTML;
            nextEl = nextEl.nextElementSibling;
          }
          faqs.push({ question, answer });
        }
        currentEl = currentEl.nextElementSibling;
      }

      // Remove the FAQ heading and everything after it from the DOM
      let removeEl = faqHeading;
      while (removeEl) {
        const nextToRemove = removeEl.nextElementSibling;
        removeEl.remove();
        removeEl = nextToRemove;
      }
    }

    // Extract headings from the remaining cleaned content
    const headingElements = Array.from(doc.querySelectorAll('h2, h3'));
    const headings = headingElements.map((el) => {
      const text = el.textContent || '';
      const id = el.id || text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      el.id = id;
      return {
        id,
        text,
        level: el.tagName.toLowerCase()
      };
    });

    // Normalize and sanitize links in content
    doc.querySelectorAll('a').forEach((link) => {
      let href = link.getAttribute('href');
      if (href) {
        href = href.trim();
        if (href.startsWith('www.')) {
          href = `https://${href}`;
          link.setAttribute('href', href);
        }
        if (href.startsWith('http://') || href.startsWith('https://')) {
          try {
            const urlObj = new URL(href, window.location.origin);
            const isInternal = 
              urlObj.hostname === window.location.hostname ||
              urlObj.hostname.includes('jerushdentoface.com');
            if (!isInternal) {
              link.setAttribute('target', '_blank');
              link.setAttribute('rel', 'noopener noreferrer');
            }
          } catch (e) {}
        }
      }
    });

    return {
      cleanContent: doc.body.innerHTML,
      faqs,
      headings
    };
  }, [post]);

  const { cleanContent, faqs, headings } = parsedContentAndFaqs;

  // Intercept clicks on links inside the blog content to support SPA navigation and proper external handling
  const handleContentClick = (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    let href = link.getAttribute('href');
    if (!href) return;

    href = href.trim();

    // Hash links
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        const offset = 120;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
      return;
    }

    // Relative internal link
    if (href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Full URL check (internal vs external)
    try {
      const url = new URL(href, window.location.origin);
      const isInternal = 
        url.hostname === window.location.hostname ||
        url.hostname.includes('jerushdentoface.com');

      if (isInternal) {
        e.preventDefault();
        const internalPath = url.pathname + url.search + url.hash;
        navigate(internalPath);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    } catch (err) {}

    // External link or bare www.
    if (href.startsWith('www.')) {
      e.preventDefault();
      window.open(`https://${href}`, '_blank', 'noopener,noreferrer');
      return;
    }
  };

  // Active section highlights on scroll using a robust scroll listener
  useEffect(() => {
    if (!post) return;

    // Dynamically assign IDs to the rendered content headings first
    const headingElements = document.querySelectorAll('.blog-content-area h2, .blog-content-area h3');
    headingElements.forEach((el) => {
      if (!el.id) {
        const text = el.textContent || '';
        const generatedId = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        el.id = generatedId;
      }
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140; // 140px offset for sticky header
      let currentActiveId = '';

      for (let i = 0; i < headingElements.length; i++) {
        const el = headingElements[i];
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= scrollPosition) {
          currentActiveId = el.id;
        } else {
          break; // Headings are in order, we can stop
        }
      }

      if (currentActiveId && currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially to set the active ID
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [post, activeId]);

  // Scroll to section click handler
  const handleTocClick = (id, e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navbarOffset = 110;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarOffset,
        behavior: 'smooth'
      });
      setActiveId(id);
      setTocOpen(false);
    }
  };

  const handleBookClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center pt-[120px] font-body text-slate-800">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-brandBlue border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest font-headline">Loading Article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center pt-[120px] font-body text-slate-800">
        <div className="text-center space-y-6 max-w-md px-6">
          <h2 className="font-headline font-extrabold text-3xl text-primary">Article Not Found</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            The article you are looking for does not exist or has been relocated. Browse our latest publications instead.
          </p>
          <Link 
            to="/blog" 
            className="inline-block px-6 py-3 bg-[#2853A4] hover:bg-[#1A3C7A] text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white font-body text-left relative pt-0">
      
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[4px] bg-gradient-to-r from-brandBlue to-brandSky z-[10001] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Unified Premium Editorial Header Section */}
      <section className="w-full bg-gradient-to-r from-brandBlue via-[#1b4393] to-brandSky pt-[140px] sm:pt-[144px] lg:pt-[148px] pb-12 sm:pb-16 px-5 sm:px-6 text-white border-b border-white/10 relative overflow-hidden">
        {/* Subtle abstract background lines */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: Metadata, Title & Excerpt */}
          <div className="space-y-5 sm:space-y-6 text-left">
            {/* Breadcrumbs */}
            <nav className="text-white/80 text-xs font-bold uppercase tracking-wider flex flex-wrap items-center gap-2 font-headline pt-1" aria-label="Breadcrumbs">
              <Link to="/" className="text-white/75 hover:text-white transition-colors">Home</Link>
              <span className="text-white/40 text-xs font-normal">/</span>
              <Link to="/blog" className="text-white/75 hover:text-white transition-colors">Medical Insights</Link>
              <span className="text-white/40 text-xs font-normal">/</span>
              <span className="text-brandSky font-bold">{post.category}</span>
            </nav>

            {/* Category Badge */}
            <div>
              <span className="inline-block bg-white/15 text-white border border-white/25 px-4 sm:px-5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider font-headline shadow-sm">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-base sm:text-lg leading-relaxed text-white/85 font-medium">
              {post.excerpt}
            </p>

            {/* Author / Date Info Bar */}
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/15 p-3.5 pr-6 rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 shrink-0 shadow-sm border border-white/30">
                <img src={post.author.image} alt={post.author.name} className="w-full h-full object-cover" onError={handleAuthorImageError} />
              </div>
              <div className="text-left font-headline">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/60 block">
                  Written By
                </span>
                <span className="text-white text-sm font-extrabold block leading-tight">
                  {post.author.name}
                </span>
                <span className="text-[10px] text-white/70 font-semibold block mt-0.5 uppercase tracking-wider">
                  {post.publishedDate} &bull; {post.readingTime}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Image */}
          <div className="w-full aspect-[16/10] overflow-hidden rounded-3xl shadow-xl border border-white/20">
            <img 
              src={post.featuredImage} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </div>

        </div>
      </section>

      {/* Main Grid Content Area */}
      <section className="w-full px-6 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
          
          {/* Left Column: Sidebar (TOC, Doctor Author, Share, CTA) */}
          <aside className="hidden lg:block space-y-8 self-start sticky top-28 pr-1">
            {/* Desktop Table of Contents */}
            {headings.length > 0 && (
              <div className="border border-slate-200 bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4 font-headline font-extrabold text-sm text-slate-800 pb-3 border-b border-slate-100">
                  <svg className="w-5 h-5 text-brandBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                  Table of Contents
                </div>
                <ul className="space-y-0.5 max-h-[400px] overflow-y-auto">
                  {headings.map((item) => (
                    <li 
                      key={item.id}
                      className={item.level === 'h3' ? 'pl-4' : ''}
                    >
                      <a 
                        href={`#${item.id}`}
                        onClick={(e) => handleTocClick(item.id, e)}
                        className={`text-[13px] leading-snug block font-headline py-2.5 px-3 transition-all duration-200 ${
                          activeId === item.id 
                            ? 'border-l-4 border-brandBlue bg-brandBlue/5 text-brandBlue font-bold pl-2.5 rounded-r-lg' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-brandBlue pl-3 font-medium border-l-4 border-transparent'
                        }`}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Doctor Author Card (Desktop only) */}
            <div className="hidden lg:block border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-sm">
              {/* Author image - full bleed container */}
              <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                <span className="absolute top-3 right-3 z-20 bg-brandBlue/90 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold flex items-center gap-1 shadow-sm">
                  ★ 4.9
                </span>
                <img 
                  src={post.author.image} 
                  alt={post.author.name} 
                  className="w-full h-full object-cover" 
                  onError={handleAuthorImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-10"></div>
              </div>
              {/* Author info */}
              <div className="p-5 text-center">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-brandBlue block mb-2">
                  Meet Our Expert
                </span>
                <h4 className="font-headline font-extrabold text-base text-slate-900 leading-tight">
                  {post.author.name}
                </h4>
                <p className="text-[10px] text-slate-500 font-semibold mt-1">
                  {post.author.qualification}
                </p>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-2 text-center border-t border-b border-slate-100 py-2">
                  {post.author.specialization} &bull; Director of Jerush Groups
                </p>

                {/* Stats Box */}
                <div className="grid grid-cols-2 gap-2 mt-4 bg-brandBlue/5 p-3 rounded-xl border border-brandBlue/10">
                  <div className="text-center">
                    <span className="block text-xs font-black text-brandBlue leading-tight">3L+</span>
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">Patients Treated</span>
                  </div>
                  <div className="text-center border-l border-brandBlue/20">
                    <span className="block text-xs font-black text-brandBlue leading-tight">
                      {authorDoc?.experience?.split(' ')[0] || '20+ Yrs'}
                    </span>
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">Experience</span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-[11px] text-slate-500 italic mt-4 px-2 leading-relaxed border-l-2 border-brandBlue/30 text-left">
                  "Every smile is unique — we craft treatment plans as individual as you are."
                </blockquote>

                <button 
                  onClick={handleBookClick}
                  className="w-full mt-5 py-2.5 rounded-xl bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs uppercase tracking-wider hover:shadow-md transition-all shadow-sm border-none cursor-pointer"
                >
                  Book a Consultation →
                </button>
              </div>
            </div>

            {/* Share This Article Card */}
            <div className="hidden lg:block border border-slate-200/80 bg-[#F8FAFC] rounded-2xl p-5 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3 text-center">
                SHARE THIS ARTICLE
              </span>
              <div className="flex flex-col gap-2.5">
                <button 
                  onClick={() => {
                    const shareUrl = encodeURIComponent(window.location.href);
                    const shareText = encodeURIComponent(post.title);
                    window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`, '_blank');
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all shadow-sm w-full cursor-pointer animate-fadeIn"
                >
                  <svg className="w-4 h-4 text-slate-800 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Twitter / X
                </button>
                <button 
                  onClick={() => {
                    const shareUrl = encodeURIComponent(window.location.href);
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all shadow-sm w-full cursor-pointer animate-fadeIn"
                >
                  <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </button>
                <button 
                  onClick={() => {
                    const shareUrl = encodeURIComponent(window.location.href);
                    const shareText = encodeURIComponent(post.title);
                    window.open(`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`, '_blank');
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all shadow-sm w-full cursor-pointer animate-fadeIn"
                >
                  <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopySuccess(true);
                    setTimeout(() => setCopySuccess(false), 2000);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all shadow-sm w-full cursor-pointer animate-fadeIn"
                >
                  <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>
                  {copySuccess ? 'Link Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>

            {/* Ready for your perfect smile CTA card */}
            <div className="hidden lg:block border border-brandBlue/10 bg-brandBlue/[0.02] p-5 rounded-2xl text-left space-y-4 shadow-sm">
              <h5 className="font-headline font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                ✨ Ready for your perfect smile?
              </h5>
              <button 
                onClick={handleBookClick}
                className="w-full py-2.5 rounded-xl bg-brandBlue text-white font-headline font-bold text-xs uppercase tracking-wider hover:bg-brandSky transition-all text-center shadow-sm"
              >
                Book a Free Scan
              </button>
            </div>
          </aside>

          {/* Right Column: Main Article Body Area */}
          <div className="flex flex-col min-w-0">
            {/* Mobile TOC Accordion — FAQ-style with Framer Motion */}
            {headings.length > 0 && (
              <div 
                className={`lg:hidden w-full border rounded-2xl bg-white mb-8 transition-all duration-300 ${
                  tocOpen 
                    ? 'border-brandBlue shadow-md shadow-brandBlue/5' 
                    : 'border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                <button 
                  onClick={() => setTocOpen(!tocOpen)}
                  className="flex items-center justify-between w-full p-5 text-left font-headline font-bold text-sm sm:text-base text-slate-800 focus:outline-none"
                >
                  <span className="flex items-center gap-3 pr-4">
                    <List className={`w-4 h-4 shrink-0 transition-colors ${tocOpen ? 'text-brandBlue' : 'text-slate-400'}`} />
                    Table of Contents
                  </span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    tocOpen ? 'bg-brandBlue text-white rotate-180' : 'bg-slate-50 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {tocOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 border-t border-slate-50">
                        <ul className="space-y-0.5 pt-3">
                          {headings.map((item) => (
                            <li 
                              key={item.id}
                              className={item.level === 'h3' ? 'pl-4' : ''}
                            >
                              <a 
                                href={`#${item.id}`}
                                onClick={(e) => handleTocClick(item.id, e)}
                                className={`text-[13px] leading-snug block font-headline py-2.5 px-3 transition-all duration-200 ${
                                  activeId === item.id 
                                    ? 'border-l-4 border-brandBlue bg-brandBlue/5 text-brandBlue font-bold pl-2.5 rounded-r-lg' 
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-brandBlue pl-3 font-medium border-l-4 border-transparent'
                                }`}
                              >
                                {item.text}
                              </a>
                            </li>
                          ))}
                        </ul>

                        {/* Doctor Author Card (Inside Mobile TOC Accordion) */}
                        <div className="pt-4 mt-4 border-t border-slate-200/60">
                          <div className="border border-slate-200/80 bg-white rounded-2xl p-4 flex gap-4 items-center">
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-sm">
                              <img 
                                src={post.author.image} 
                                alt={post.author.name} 
                                className="w-full h-full object-cover" 
                                onError={handleAuthorImageError}
                              />
                            </div>
                            <div className="text-left flex-1 min-w-0">
                              <span className="inline-block bg-brandBlue/10 text-brandBlue text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded mb-1">
                                Blog Author
                              </span>
                              <h5 className="font-headline font-extrabold text-xs text-slate-900 truncate">
                                {post.author.name}
                              </h5>
                              <p className="text-[10px] text-slate-400 font-semibold truncate">
                                {post.author.qualification}
                              </p>
                              <p className="text-[10px] text-slate-500 font-medium">
                                {authorDoc?.experience || '12+ Years Experience'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Blog Text Content */}
            <div className="flex-grow max-w-[840px]">
              <div 
                className="blog-content-area text-slate-700 text-left"
                dangerouslySetInnerHTML={{ __html: cleanContent }}
                onClick={handleContentClick}
              />
              
              {/* Collapsible Bluish Accordion FAQ Section */}
              {faqs.length > 0 && (
                <div className="mt-12 space-y-4 border-t border-slate-200 pt-10">
                  <h2 className="font-headline font-extrabold text-2xl text-slate-900 mb-6 relative pb-3">
                    Frequently Asked Questions
                    <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-gradient-to-r from-brandBlue to-brandSky"></span>
                  </h2>
                  <div className="space-y-3.5">
                    {faqs.map((faq, index) => {
                      const isOpen = openFaqIndex === index;
                      return (
                        <div 
                          key={index}
                          className="border border-brandSky/20 rounded-2xl overflow-hidden bg-sky-50/20 hover:border-brandSky/40 transition-all duration-300 shadow-sm"
                        >
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                            className="flex items-center justify-between w-full p-5 text-left font-headline font-bold text-slate-900 focus:outline-none hover:text-brandBlue transition-colors"
                            aria-expanded={isOpen}
                          >
                            <span className="pr-4 text-[15px]" dangerouslySetInnerHTML={{ __html: faq.question }}></span>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                              isOpen ? 'bg-brandBlue text-white rotate-180' : 'bg-slate-100 text-slate-500'
                            }`}>
                              <ChevronDown className="w-4 h-4" />
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div 
                                  className="px-5 pb-5 pt-0 text-slate-650 text-sm leading-relaxed border-t border-brandSky/5 blog-faq-answer"
                                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile Doctor Author Card (At the bottom of content) */}
            <div className="lg:hidden mt-12 border border-slate-200 bg-[#F8FAFC] rounded-3xl p-6 flex flex-col sm:flex-row gap-5 items-center">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-sm">
                <img src={post.author.image} alt={post.author.name} className="w-full h-full object-cover" onError={handleAuthorImageError} />
              </div>
              <div className="text-center sm:text-left flex-1">
                <span className="inline-block bg-brandBlue/10 text-brandBlue text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded mb-1.5">
                  Meet Our Expert &bull; Blog Author
                </span>
                <h4 className="font-headline font-extrabold text-base text-slate-900 leading-tight">
                  {post.author.name}
                </h4>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1">
                  {post.author.qualification} &bull; {authorDoc?.experience || '12+ Years Experience'}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed mt-2 font-medium">
                  {post.author.bio}
                </p>
              </div>
            </div>

            {/* Start Your Smile Journey Today banner (Full Width of Content) */}
            <div className="mt-10 bg-brandBlue/5 border border-brandBlue/10 text-slate-900 p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
              <div className="text-left space-y-1">
                <h4 className="font-headline font-black text-xl leading-tight text-brandBlue">
                  Start Your Smile Journey Today
                </h4>
                <p className="text-xs font-semibold text-slate-650 leading-relaxed max-w-md">
                  Get a free scan and consultation with our clinical specialists to find the perfect treatment plan for you.
                </p>
              </div>
              <button 
                onClick={handleBookClick}
                className="px-6 py-3 bg-brandBlue text-white hover:bg-brandSky rounded-xl font-headline font-extrabold text-xs uppercase tracking-widest transition-all shadow-md shrink-0 border-none"
              >
                Book Free Scan →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="w-full bg-[#F8FAFC] py-20 px-6 border-t border-slate-100">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <h2 className="font-headline font-extrabold text-2xl md:text-3xl text-slate-900 text-center">
              You May Also Like
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((rp) => (
                <div 
                  key={rp.slug} 
                  onClick={() => { navigate(`/blog/${rp.slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="blog-related-card bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-50">
                    <img 
                      src={rp.featuredImage} 
                      alt={rp.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                  </div>
                  <div className="p-6 space-y-3 flex-grow flex flex-col justify-between text-left">
                    <span className="text-[10px] font-extrabold text-brandBlue uppercase tracking-wider block">
                      {rp.category}
                    </span>
                    <h4 className="font-headline font-extrabold text-sm sm:text-base text-slate-850 line-clamp-2 hover:text-brandBlue transition-colors">
                      {rp.title}
                    </h4>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-2 border-t border-slate-50 mt-auto">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <span>{rp.readingTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}



      {/* Mobile Sticky CTA Panel (Shown on Mobile viewport only) */}
      <div 
        className="fixed bottom-[16px] left-[16px] right-[16px] z-[1000] lg:hidden flex gap-2.5"
        style={{
          boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.3)'
        }}
      >
        <a 
          href="tel:+919489160055"
          className="flex-1 text-center py-2.5 bg-slate-900 text-white font-headline font-bold text-[11px] uppercase tracking-wider rounded-xl shadow-md border border-slate-800 transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a20.373 20.373 0 0 1-7.443-7.443c-.155-.44.01-.928.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
          Call Now
        </a>
        <a 
          href="#"
          onClick={handleBookClick}
          className="flex-1 text-center py-2.5 bg-brandBlue text-white font-headline font-bold text-[11px] uppercase tracking-wider rounded-xl shadow-md hover:bg-brandBlue/90 transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
          </svg>
          Book Now
        </a>
      </div>
    </div>
  );
}
