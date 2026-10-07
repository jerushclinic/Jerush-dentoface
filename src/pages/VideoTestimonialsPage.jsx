import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, X, Star, Sparkles, Smile, Activity, ShieldCheck,
  Search, Filter, CheckCircle2, Clock, MapPin, Calendar,
  Phone, ArrowRight, Share2, Youtube, Instagram, Eye,
  ChevronLeft, ChevronRight, Pause
} from 'lucide-react';
import { reviewService } from '../services/reviewService';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import TreatmentCtaBanner from '../components/common/TreatmentCtaBanner';

// Enhanced Video Testimonials Dataset
const STATIC_VIDEOS = [
  {
    id: 'static-1',
    type: 'video',
    category: 'dental',
    name: 'Ms. Lajona',
    location: 'Thuckalay',
    rating: 5,
    treatment: 'Clear Aligners (Jerushaligne)',
    procedure: 'Invisible Orthodontic Teeth Alignment',
    video_thumbnail: '/images/testimonials/lajona-clear-aligner-jerushaligne.webp',
    text: 'Braces vs Jerushaligne clear aligners experience. Lajona shares why she chose invisible aligners and her comfortable smile journey without pain or food restrictions.',
    video_url: 'https://www.youtube.com/watch?v=wDrLjQpwOf0',
    duration: '2:15 min',
    featured: true,
    views: '12.4K'
  },
  {
    id: 'static-2',
    type: 'video',
    category: 'hair',
    name: 'Mr. Arul',
    location: 'Kanyakumari',
    rating: 5,
    treatment: 'Micro-FUE Hair Transplant',
    procedure: '3,200 Grafts Hairline & Crown Density',
    video_thumbnail: '/images/testimonials/arul-hair-transplant.webp',
    text: 'Watch Arul share his hair transplant recovery journey and the stunning natural density results he achieved at Jerush with zero linear scarring.',
    video_url: 'https://www.youtube.com/watch?v=2Bo8CwRZ5XE',
    duration: '3:40 min',
    featured: true,
    views: '18.9K'
  },
  {
    id: 'static-3',
    type: 'video',
    category: 'skin',
    name: 'Mr. Austin',
    location: 'Thuckalay',
    rating: 5,
    treatment: 'Fractional CO2 Laser',
    procedure: 'Deep Acne Scar Resurfacing & Smoothing',
    video_thumbnail: '/images/testimonials/austin-skin-treatment.webp',
    text: 'Austin shares his 10/10 skin transformation review after advanced Fractional CO2 laser dermatology treatments for deep pitted scars.',
    video_url: 'https://www.youtube.com/watch?v=TTWuVlz3H8Y',
    duration: '1:55 min',
    featured: true,
    views: '9.8K'
  },
  {
    id: 'static-4',
    type: 'video',
    category: 'dental',
    name: 'Brylin Shijo',
    location: 'Thuckalay',
    rating: 5,
    treatment: 'Dental Crowns & Bridges',
    procedure: 'CAD/CAM Monolithic Zirconia Crown',
    video_thumbnail: '/images/testimonials/brylin-shijo-tooth-crown.webp',
    text: 'Brylin Shijo reviews the dental crown procedure and the expert care provided by our prosthodontics team with perfect color matching.',
    video_url: 'https://www.youtube.com/watch?v=21FlI7IDQdk',
    duration: '2:30 min',
    featured: true,
    views: '8.1K'
  },
  {
    id: 'static-5',
    type: 'video',
    category: 'hair',
    name: 'Hair Care Patient',
    location: 'Kanyakumari',
    rating: 5,
    treatment: 'Anti-Dandruff & Scalp Laser',
    procedure: 'Clinical Scalp Detox & Laser Phototherapy',
    video_thumbnail: '/images/testimonials/dandruff-treatment-patients.webp',
    text: 'The truth about stubborn hair fall and dandruff laser treatment. Watch this patient share her honest, transformative clinic experience.',
    video_url: 'https://www.youtube.com/watch?v=jAMgP_XeDWk',
    duration: '2:10 min',
    featured: false,
    views: '14.2K'
  },
  {
    id: 'static-6',
    type: 'video',
    category: 'dental',
    name: 'Mrs. Jeba Priya',
    location: 'Thuckalay',
    rating: 5,
    treatment: 'Single-Visit Root Canal',
    procedure: 'Rotary Endodontics & Apex Locator Therapy',
    video_thumbnail: '/images/testimonials/jeba-priya-root-canal.webp',
    text: 'Scared of root canals? Jeba Priya shares her painless single-visit root canal treatment experience at Jerush with zero post-op discomfort.',
    video_url: 'https://www.youtube.com/watch?v=3tOb9FVW4rM',
    duration: '3:05 min',
    featured: true,
    views: '11.5K'
  },
  {
    id: 'static-7',
    type: 'video',
    category: 'skin',
    name: 'Mrs. S. Renuka',
    location: 'Nagercoil',
    rating: 5,
    treatment: 'Pigmentation & Pico Laser',
    procedure: 'Sun Spot & Melasma Laser Tonality Care',
    video_thumbnail: '/images/testimonials/pigmentation-darkspots-review.webp',
    text: 'Advanced Hydrafacial & Pico laser treatment review. Watch this skincare patient share her glowing, even-toned results.',
    video_url: 'https://www.youtube.com/watch?v=bf2K2aBBR5c',
    duration: '1:45 min',
    featured: true,
    views: '7.6K'
  },
  {
    id: 'static-8',
    type: 'instagram',
    category: 'skin',
    name: 'Jerush Hospital Reel',
    location: 'Thuckalay Flagship',
    rating: 5,
    treatment: 'Hydrafacial Glow Up',
    procedure: '3-in-1 Vortex Hydration & Peeling',
    video_thumbnail: '/images/testimonials/hydrafacial-treatment.webp',
    text: 'Watch this Hydrafacial Glow Up reel on Instagram for instant visible skin hydration, deep pore purification, and luminous glow.',
    video_url: 'https://www.instagram.com/reel/DIV3FZZACMb/',
    duration: '0:45 min',
    featured: false,
    views: '24.1K'
  },
  {
    id: 'static-9',
    type: 'video',
    category: 'dental',
    name: 'Ms. Jerlin',
    location: 'Chennai',
    rating: 5,
    treatment: 'Jerushaligne Aligners',
    procedure: 'Overcrowding & Bite Alignment',
    video_thumbnail: '/images/testimonials/jerlin-jerushaligne.webp',
    text: 'Jerlin talks about her 8-month smile transformation journey using our custom in-house engineered Jerushaligne clear aligners.',
    video_url: 'https://www.youtube.com/watch?v=wDrLjQpwOf0',
    duration: '2:20 min',
    featured: false,
    views: '10.3K'
  },
  {
    id: 'static-10',
    type: 'video',
    category: 'hair',
    name: 'Mr. Julian',
    location: 'Trichy',
    rating: 5,
    treatment: 'GFC Hair Growth Therapy',
    procedure: 'Autologous Growth Factor Scalp Injections',
    video_thumbnail: '/images/testimonials/julian-hair-transplant.webp',
    text: 'Julian shares how Growth Factor Concentrate therapy halted active hair fall and promoted new follicular thickness within 3 months.',
    video_url: 'https://www.youtube.com/watch?v=2Bo8CwRZ5XE',
    duration: '2:50 min',
    featured: false,
    views: '15.7K'
  }
];

// Parser helper for URLs
const parseVideoLink = (url, type) => {
  if (!url) return null;
  if (type === 'video' || url.includes('youtube.com') || url.includes('youtu.be')) {
    const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(ytRegex);
    return match ? match[1] : null;
  } else if (type === 'instagram' || url.includes('instagram.com')) {
    const instaRegex = /instagram\.com\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/;
    const match = url.match(instaRegex);
    return match ? match[1] : null;
  }
  return null;
};

export default function VideoTestimonialsPage() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState(STATIC_VIDEOS);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  // Auto-sliding Carousel State for Featured Spotlight
  const [currentFeaturedIdx, setCurrentFeaturedIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);

  // Close video modal on Escape key press with continuous focus reclamation for iframes
  useEffect(() => {
    if (!activeVideo) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        setActiveVideo(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);

    // Continuous check to reclaim window focus from cross-origin iframe so ESC key always works
    const interval = setInterval(() => {
      if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
        window.focus();
      }
    }, 250);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      clearInterval(interval);
    };
  }, [activeVideo]);

  useEffect(() => {
    const fetchVideoReviews = async () => {
      setLoading(true);
      try {
        const dbReviews = await reviewService.getReviews();
        if (dbReviews && dbReviews.length > 0) {
          const dbVideos = dbReviews
            .filter(r => r.type === 'video' || r.type === 'instagram')
            .map(r => ({
              id: r.id,
              type: r.type,
              category: r.category || 'dental',
              name: r.name,
              location: r.location || 'Tamil Nadu',
              rating: r.rating || 5,
              treatment: r.treatment || 'Specialist Treatment',
              procedure: r.procedure || 'Clinical Care',
              video_thumbnail: r.video_thumbnail || r.image || '/images/placeholder-video.webp',
              text: r.text,
              video_url: r.video_url,
              duration: r.duration || '2:00 min',
              views: r.views || '5.2K',
              featured: r.featured || false
            }));

          const merged = [...dbVideos];
          STATIC_VIDEOS.forEach(staticItem => {
            const exists = merged.some(m => m.name?.toLowerCase() === staticItem.name?.toLowerCase() || m.video_url === staticItem.video_url);
            if (!exists) {
              merged.push(staticItem);
            }
          });
          setVideos(merged);
        } else {
          setVideos(STATIC_VIDEOS);
        }
      } catch (err) {
        console.warn("Failed to fetch dynamic video reviews, using static:", err);
        setVideos(STATIC_VIDEOS);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoReviews();
  }, []);

  // Filtered list for the main grid
  const filteredVideos = useMemo(() => {
    return videos.filter(v => {
      if (searchQuery.trim() === '') return true;
      const query = searchQuery.toLowerCase();
      return (
        v.name?.toLowerCase().includes(query) ||
        v.treatment?.toLowerCase().includes(query) ||
        v.location?.toLowerCase().includes(query) ||
        v.text?.toLowerCase().includes(query)
      );
    });
  }, [videos, searchQuery]);

  // Featured videos list for auto-sliding banner
  const featuredVideos = useMemo(() => {
    const list = videos.filter(v => v.featured);
    return list.length > 0 ? list : videos.slice(0, 6);
  }, [videos]);

  // 8-Second Auto Sliding Timer
  useEffect(() => {
    if (isPaused || featuredVideos.length <= 1) return;
    const timer = setInterval(() => {
      setSlideDirection(1);
      setCurrentFeaturedIdx((prev) => (prev + 1) % featuredVideos.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, featuredVideos.length, currentFeaturedIdx]);

  const handlePrevSlide = () => {
    setSlideDirection(-1);
    setCurrentFeaturedIdx((prev) => (prev - 1 + featuredVideos.length) % featuredVideos.length);
  };

  const handleNextSlide = () => {
    setSlideDirection(1);
    setCurrentFeaturedIdx((prev) => (prev + 1) % featuredVideos.length);
  };

  const handleSelectSlide = (idx) => {
    setSlideDirection(idx > currentFeaturedIdx ? 1 : -1);
    setCurrentFeaturedIdx(idx);
  };

  const currentFeatured = featuredVideos[currentFeaturedIdx] || featuredVideos[0];

  const handleBookClick = (e) => {
    e.preventDefault();
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPlayer = (video) => {
    const videoId = parseVideoLink(video.video_url, video.type);
    if (videoId) {
      setActiveVideo({ ...video, parsedId: videoId });
    } else {
      setActiveVideo({ ...video, parsedId: video.video_url });
    }
  };

  return (
    <div className="w-full bg-slate-950 text-white font-body text-left relative pt-0 pb-24 min-h-screen overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-brandBlue/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-brandSky/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ─── 2. HERO INTRO & STATS ─── */}
        <section className="text-center space-y-6 pt-16 pb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/90 border border-brandSky/30 rounded-full text-xs font-bold font-headline uppercase tracking-widest text-brandSky shadow-lg shadow-brandSky/5">
            <Sparkles className="w-4 h-4 text-brandSky" />
            Unfiltered Patient Experience
          </div>

          <h1 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Hear Real Stories from <span className="bg-gradient-to-r from-brandSky via-sky-300 to-white bg-clip-text text-transparent">Real Patients</span>
          </h1>

          <p className="text-slate-400 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Watch candid recorded reviews from patients who experienced transformative treatments across Dental Implants, Root Canals, Laser Dermatology and Hair Restoration at Jerush.
          </p>

          {/* Social Proof Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center backdrop-blur-md">
              <span className="font-headline font-black text-2xl sm:text-3xl text-brandSky block">80K+ Happy Patients</span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mt-1">In Video Stories</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center backdrop-blur-md">
              <span className="font-headline font-black text-2xl sm:text-3xl text-amber-400 block">4.9 Google Reviews</span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mt-1">Patient Ratings</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center backdrop-blur-md">
              <span className="font-headline font-black text-2xl sm:text-3xl text-emerald-400 block">100% Feedbacks</span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mt-1">Genuine Reviews</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-center backdrop-blur-md">
              <span className="font-headline font-black text-2xl sm:text-3xl text-brandSky block">4+ Branches</span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mt-1">Tamil Nadu & Global</span>
            </div>
          </div>
        </section>

        {/* ─── 3. FEATURED SPOTLIGHT AUTO-SLIDING CAROUSEL (8-SEC INTERVAL) ─── */}
        {featuredVideos.length > 0 && currentFeatured && (
          <section
            className="mb-14 select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="bg-gradient-to-r from-brandBlue/30 via-slate-900/90 to-brandSky/20 border border-brandSky/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">

              {/* Top Bar with Slide Counter, Timer Badge, and Prev/Next Navigation */}
              <div className="flex items-center justify-between gap-4 mb-6 border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brandSky/10 border border-brandSky/20 rounded-full text-[10px] sm:text-xs font-bold font-headline uppercase tracking-wider text-brandSky">
                    <Sparkles className="w-3.5 h-3.5 text-brandSky" />
                    Featured Spotlight ({currentFeaturedIdx + 1} of {featuredVideos.length})
                  </div>
                </div>

                {/* Arrow Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevSlide}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 hover:text-white hover:border-brandSky hover:bg-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-md"
                    title="Previous Featured Story"
                    aria-label="Previous Featured Story"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 hover:text-white hover:border-brandSky hover:bg-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-md"
                    title="Next Featured Story"
                    aria-label="Next Featured Story"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slide Content with Framer Motion AnimatePresence */}
              <div className="relative min-h-[320px] sm:min-h-[280px]">
                <AnimatePresence mode="wait" custom={slideDirection}>
                  <motion.div
                    key={currentFeatured.id}
                    custom={slideDirection}
                    initial={{ opacity: 0, x: slideDirection > 0 ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: slideDirection > 0 ? -50 : 50 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  >
                    {/* Video Player Card */}
                    <div
                      onClick={() => openPlayer(currentFeatured)}
                      className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 group cursor-pointer bg-slate-950"
                    >
                      <img
                        src={currentFeatured.video_thumbnail}
                        alt={currentFeatured.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="w-16 h-16 rounded-full bg-white text-brandBlue flex items-center justify-center shadow-2xl group-hover:scale-115 transition-transform duration-300">
                          <Play className="w-7 h-7 fill-current ml-1" />
                        </span>
                      </div>

                    </div>

                    {/* Video Description */}
                    <div className="lg:col-span-7 space-y-4 text-left">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-brandSky/20 text-brandSky border border-brandSky/30 text-xs font-headline font-bold uppercase tracking-wider">
                          {currentFeatured.treatment}
                        </span>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </div>

                      <h2 className="font-headline font-black text-xl sm:text-3xl text-white leading-snug">
                        "{currentFeatured.text}"
                      </h2>

                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                        Patient: <strong className="text-white">{currentFeatured.name}</strong> • Location: <strong className="text-white">{currentFeatured.location}</strong> • Procedure: <strong className="text-brandSky">{currentFeatured.procedure}</strong>
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-4">
                        <button
                          onClick={() => openPlayer(currentFeatured)}
                          className="px-6 py-3 bg-gradient-to-r from-brandBlue to-brandSky hover:brightness-110 text-white rounded-2xl font-headline font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brandBlue/30 transition-all cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          Watch Full Story
                        </button>
                        <button
                          onClick={handleBookClick}
                          className="px-6 py-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-2xl font-headline font-bold text-xs uppercase tracking-wider border border-slate-700 transition-all cursor-pointer"
                        >
                          Consult This Doctor
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Interactive Pagination Progress Bar and Dots */}
              <div className="mt-8 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {featuredVideos.map((item, idx) => {
                    const isActive = currentFeaturedIdx === idx;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectSlide(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer relative overflow-hidden ${isActive
                          ? 'w-10 sm:w-14 bg-slate-800'
                          : 'w-2.5 sm:w-3 bg-slate-800 hover:bg-slate-700'
                          }`}
                        title={`Go to ${item.name} (${item.treatment})`}
                      >
                        {isActive && (
                          <motion.div
                            key={`progress-${currentFeaturedIdx}-${isPaused}`}
                            initial={{ width: "0%" }}
                            animate={{ width: isPaused ? undefined : "100%" }}
                            transition={{ duration: isPaused ? 0 : 8, ease: "linear" }}
                            className="h-full bg-gradient-to-r from-brandBlue to-brandSky rounded-full"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="text-[11px] text-slate-400 font-headline font-semibold flex items-center gap-2">
                  <span>Showing story {currentFeaturedIdx + 1} of {featuredVideos.length}</span>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ─── 4. SECTION HEADER & SEARCH ─── */}
        <section className="mb-8 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            {/* Left: Clean Heading & Live Review Count */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brandSky/10 border border-brandSky/20 rounded-full text-[10px] sm:text-xs font-bold font-headline uppercase tracking-wider text-brandSky">
                <span className="w-1.5 h-1.5 rounded-full bg-brandSky animate-pulse" />
                Verified Patient Stories
              </div>
              <h2 className="font-headline font-black text-2xl sm:text-3xl text-white tracking-tight flex items-baseline gap-2.5">
                <span>All Patient Video Stories</span>
                <span className="text-xs font-semibold text-slate-400 font-body">
                  ({filteredVideos.length} {filteredVideos.length === 1 ? 'review' : 'reviews'})
                </span>
              </h2>
            </div>

            {/* Right: Sleek Search Bar */}
            <div className="relative w-full sm:w-80 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient, treatment, town..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-slate-900/90 border border-slate-800 hover:border-slate-700 focus:border-brandSky/60 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brandSky/30 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ─── 5. VIDEO REEL GRID ─── */}
        <section className="space-y-6 mb-20">
          {loading ? (
            <div className="py-20 flex justify-center items-center">
              <div className="w-10 h-10 border-4 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <Smile className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="font-headline font-bold text-lg text-white">No video testimonials found</h3>
              <p className="text-slate-400 text-xs">Try searching with a different name, procedure, or town.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white text-xs font-bold rounded-xl font-headline shadow-md hover:brightness-105 transition-all cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video, idx) => {
                const videoId = parseVideoLink(video.video_url, video.type);
                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    onClick={() => openPlayer(video)}
                    className="bg-slate-900/70 border border-slate-800/90 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-brandSky/60 transition-all duration-300 flex flex-col p-3 group cursor-pointer backdrop-blur-sm"
                  >
                    {/* Video Thumbnail (Reels 9:16 Aspect Ratio) */}
                    <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-950 rounded-2xl border border-slate-800">
                      <img
                        src={video.video_thumbnail}
                        alt={video.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Top Gradient Overlay */}
                      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 to-transparent pointer-events-none"></div>

                      {/* Bottom Gradient Overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-brandSky border border-white/10 uppercase tracking-wider font-headline">
                          {video.treatment}
                        </span>

                        {video.type === 'video' ? (
                          <div className="w-6 h-6 rounded-lg bg-[#FF0000] flex items-center justify-center shadow-md">
                            <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.516 3.5 12 3.5 12 3.5s-7.516 0-9.387.555A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.484 20.5 12 20.5 12 20.5s7.516 0 9.387-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center shadow-md">
                            <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="w-13 h-13 rounded-full bg-white/95 text-brandBlue flex items-center justify-center shadow-xl group-hover:scale-115 transition-transform duration-300">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </span>
                      </div>

                      {/* In-Video Bottom Overlay Info */}
                      <div className="absolute bottom-3 left-3 right-3 z-10 text-left space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-headline font-extrabold text-sm text-white drop-shadow">
                            {video.name}
                          </h4>
                          <div className="flex text-amber-400">
                            {[...Array(video.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-300 font-semibold flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-brandSky" />
                          {video.location}
                        </p>
                      </div>
                    </div>

                    {/* Card Body Snippet */}
                    <div className="p-3 text-left space-y-2 flex-grow flex flex-col justify-between">
                      <p className="text-slate-400 text-xs leading-relaxed italic line-clamp-2">
                        "{video.text}"
                      </p>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                        <span className="text-brandSky flex items-center gap-1">
                          <Play className="w-2.5 h-2.5 fill-current" />
                          Watch Video
                        </span>
                        <span className="text-slate-500 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Verified Story
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* ─── 6. VIDEO MODAL PLAYER (Smartphone / Cinema Frame) ─── */}
        <AnimatePresence>
          {activeVideo && (
            <div
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
                  setActiveVideo(null);
                }
              }}
              onMouseEnter={() => window.focus()}
              onMouseMove={() => {
                if (document.activeElement?.tagName === 'IFRAME') {
                  window.focus();
                }
              }}
              className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl focus:outline-none"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 cursor-pointer"
                onClick={() => setActiveVideo(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.25 }}
                className="bg-slate-900 w-full max-w-[380px] sm:w-[400px] aspect-[9/16] max-h-[88vh] relative border-[6px] border-slate-800 rounded-[2.5rem] shadow-2xl z-10 flex flex-col justify-between overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-black/80 border border-white/20 text-white hover:text-brandSky hover:scale-110 flex items-center justify-center shadow-lg transition-all cursor-pointer"
                  aria-label="Close video player"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Video Stream Area */}
                <div className="w-full h-full rounded-[2rem] overflow-hidden bg-black relative">
                  {activeVideo.type === 'video' ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${activeVideo.parsedId}?autoplay=1&rel=0`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="YouTube video player"
                    ></iframe>
                  ) : (
                    <iframe
                      src={`https://www.instagram.com/reel/${activeVideo.parsedId}/embed/`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                      title="Instagram Reel Player"
                    ></iframe>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ─── 7. BOTTOM CTA BANNER (New Dark Navy Aesthetic) ─── */}
        <TreatmentCtaBanner
          badgeText="Founder & Chief Surgeon"
          titlePrefix="Ready to Experience Exceptional"
          highlightWord="Dental & Aesthetic Care?"
          titleSuffix=""
          subtitle="Join thousands of smiling, satisfied patients across Tamil Nadu and abroad. Schedule your digital consultation with Dr. Bladbin and our specialist team today."
          primaryBtnText="Book Free Consultation"
          onPrimaryClick={handleBookClick}
          secondaryBtnText="Call +91 94891 60055"
          secondaryBtnPhone="+919489160055"
          doctorImage="/images/doctors/dr-bladbin-portrait.webp"
          doctorName="DR. A. BLADBIN LLB, MDS, PhD"
          doctorRole="Founder & Chief Surgeon"
          doctorAlt="DR. A. BLADBIN - Founder & Chief Surgeon"
        />

      </div>
    </div>
  );
}
