import React, { useState, useEffect } from 'react';
import { Play, Star, X } from 'lucide-react';

const ROW_1_CARDS = [
  {
    id: 1,
    type: 'text',
    name: 'D.N. Hari Kiran Prasad',
    location: 'Kanyakumari District',
    rating: 5,
    treatment: 'Cosmetic Laser Treatment',
    image: '/images/testimonials/hari-kiran-prasad.webp',
    text: 'Jerush Dentofacial Cosmetic Laser Centre is the top cosmetic centre in the district – known for its world-class treatments and beautiful results. Dr. Bladbin is not only a highly talented professional but also a very close personal and family friend. The environment at Jerush is unique—it doesn\'t feel like a hospital at all.'
  },
  {
    id: 2,
    type: 'video',
    name: 'Lajona',
    treatment: 'Clear Aligners (Jerushaligne)',
    thumbnail: '/images/testimonials/lajona-clear-aligner-jerushaligne.webp',
    title: "Lajona's Honest Review",
    subtitle: 'Braces vs Jerushaligne',
    videoId: 'wDrLjQpwOf0'
  },
  {
    id: 3,
    type: 'text',
    name: 'Mr. Hewon Park',
    location: 'South Korea',
    rating: 5,
    treatment: 'Dental Implant Treatment',
    image: '/images/testimonials/hewon.webp',
    text: 'I am very happy with the treatment from Jerush Dental Centre. During my implant treatment, all staff were very kind and supportive, especially Dr. Bladbin had explained all treatment well so that I could understand how my teeth is getting better.'
  },
  {
    id: 4,
    type: 'video',
    name: 'Mr. Arul',
    treatment: 'Hair Transplant',
    thumbnail: '/images/testimonials/arul-hair-transplant.webp',
    title: "Arul's Hair Transplant",
    subtitle: 'Why He Chose Jerush',
    videoId: '2Bo8CwRZ5XE'
  },
  {
    id: 5,
    type: 'text',
    name: 'Shri. George Genner IFS',
    location: 'Thuckalay',
    rating: 5,
    treatment: 'Dental and Facial Corrective Care',
    image: '/images/testimonials/george.webp',
    text: 'Everyone is pleasant and helpful. First class Doctors, Nurses and other supporting staff. We are very grateful for the professionalism, kindness and the <span class="text-brandSky font-semibold">real human touch</span> they gave.'
  },
  {
    id: 6,
    type: 'video',
    name: 'Austin Leo',
    treatment: 'Cosmetic Dermatology',
    thumbnail: '/images/testimonials/austin-skin-treatment.webp',
    title: "Austin's Skin Treatment",
    subtitle: '10/10 Skin Transformation',
    videoId: 'TTWuVlz3H8Y'
  }
];

const ROW_2_CARDS = [
  {
    id: 7,
    type: 'text',
    name: 'Mrs. Madhu Mala., MA, MPhil',
    location: 'Thuckalay',
    rating: 5,
    treatment: 'Dental & Facial Corrective Care',
    image: '/images/testimonials/madhu.webp',
    text: 'Jerush Dental & Facial Corrective Centre is, undoubtedly, one of the most recognised names in dental care in Tamil Nadu. Whenever I visited them, I received extremely personalised care. The facilities are top-notch.'
  },
  {
    id: 8,
    type: 'video',
    name: 'Brylin Shijo',
    treatment: 'Dental Crown',
    thumbnail: '/images/testimonials/brylin-shijo-tooth-crown.webp',
    title: "Brylin Shijo's Review",
    subtitle: 'Bespoke Tooth Crowns',
    videoId: '21FlI7IDQdk'
  },
  {
    id: 9,
    type: 'text',
    name: 'Shri. Abash Kumar., IPS, DGP',
    location: 'Thuckalay',
    rating: 5,
    treatment: 'Dental & Aesthetic Care',
    image: '/images/testimonials/abash-kumar-ips.webp',
    text: 'Jerush Dental Hospital, KK district has etched its name among the best health care institutions in the state. The top notch and up to date equipments coupled with highly trained staff makes it the natural choice.'
  },
  {
    id: 10,
    type: 'video',
    name: 'Hair Care Patient',
    treatment: 'Dandruff & Hair Care',
    thumbnail: '/images/testimonials/dandruff-treatment-patients.webp',
    title: 'The Truth About Hair Fall',
    subtitle: 'Dandruff Treatment Review',
    videoId: 'jAMgP_XeDWk'
  },
  {
    id: 11,
    type: 'text',
    name: 'Shri. Arunachalam., District judge',
    location: 'Tamilnadu',
    rating: 5,
    treatment: 'Clear Aligners (Jerushaligne)',
    image: '/images/testimonials/arunachalam.webp',
    text: 'I had long avoided dental work but always had insecurity about my tooth. I finally decided to try the aligners. The comfortable and convenient process has allowed me to embrace my smile.'
  },
  {
    id: 12,
    type: 'video',
    name: 'Jeba Priya',
    treatment: 'Root Canal Treatment',
    thumbnail: '/images/testimonials/jeba-priya-root-canal.webp',
    title: 'Scared of Root Canals?',
    subtitle: "Jeba Priya's Experience",
    videoId: '3tOb9FVW4rM'
  },
  {
    id: 13,
    type: 'text',
    name: 'Mrs. Prabha',
    location: 'Malaysia',
    rating: 5,
    treatment: 'Braces Treatment',
    image: '/images/testimonials/prabha.webp',
    text: 'Really good dental hospital to look through. My daughter had braces over there. The price is very reasonable. The services are very good. Even the doctors and nurses are really friendly.'
  },
  {
    id: 14,
    type: 'video',
    name: 'Skincare Patient',
    treatment: 'Cosmetic Skincare',
    thumbnail: '/images/testimonials/pigmentation-darkspots-review.webp',
    title: 'Hydrafacial Experience',
    subtitle: 'Sleek Skincare Review',
    videoId: 'bf2K2aBBR5c'
  },
  {
    id: 15,
    type: 'instagram',
    name: 'Jerush Hospital',
    treatment: 'Hydrafacial Treatment',
    thumbnail: '/images/testimonials/hydrafacial-treatment.webp',
    title: 'Hydrafacial Glow Up',
    subtitle: 'Watch on Instagram',
    reelId: 'DIV3FZZACMb'
  }
];

const parseVideoLink = (url, type) => {
  if (!url) return null;
  if (type === 'video') {
    const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(ytRegex);
    return match ? match[1] : null;
  } else if (type === 'instagram') {
    const instaRegex = /instagram\.com\/(?:reel|p)\/([A-Za-z0-9_-]+)/;
    const match = url.match(instaRegex);
    return match ? match[1] : null;
  }
  return null;
};

export default function Testimonials({ reviews = [] }) {
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [activeInstaReelId, setActiveInstaReelId] = useState(null);

  const openVideo = (videoId) => {
    setActiveVideoId(videoId);
    setActiveInstaReelId(null);
  };

  const openInstaReel = (reelId) => {
    setActiveInstaReelId(reelId);
    setActiveVideoId(null);
  };

  const closeVideo = () => {
    setActiveVideoId(null);
    setActiveInstaReelId(null);
  };

  // Close active modal on Escape key press with continuous focus reclamation for iframes
  useEffect(() => {
    if (!activeVideoId && !activeInstaReelId) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        closeVideo();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);

    const interval = setInterval(() => {
      if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
        window.focus();
      }
    }, 250);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      clearInterval(interval);
    };
  }, [activeVideoId, activeInstaReelId]);

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5 text-amber-400">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-current" />
        ))}
      </div>
    );
  };

  // Merge static cards with dynamic database reviews (matching by normalized name)
  const getMergedCards = (staticCards) => {
    return staticCards.map((card) => {
      if (card.type !== 'text') return card;

      const dbReview = reviews.find((r) => {
        const cleanName = (name) => name.toLowerCase()
          .replace(/^(shri\.|mr\.|mrs\.|dr\.)\s+/gi, '')
          .replace(/[^a-z0-9]/gi, '');
        const cardClean = cleanName(card.name);
        const dbClean = cleanName(r.name);
        return cardClean.includes(dbClean) || dbClean.includes(cardClean);
      });

      if (dbReview) {
        return {
          ...card,
          name: dbReview.name,
          location: dbReview.location,
          rating: dbReview.rating,
          treatment: dbReview.treatment,
          image: dbReview.image || card.image || null,
          text: dbReview.text
        };
      }
      return card;
    });
  };

  // Get all video/instagram reviews from database
  const dbVideoCards = (reviews || [])
    .filter(r => (r.type === 'video' || r.type === 'instagram') && r.video_url)
    .map(r => {
      const parsedId = parseVideoLink(r.video_url, r.type);
      return {
        id: r.id,
        type: r.type,
        name: r.name,
        treatment: r.treatment,
        thumbnail: r.video_thumbnail || r.image || '/images/placeholder-video.webp',
        title: `${r.name}'s ${r.type === 'video' ? 'Review' : 'Reel'}`,
        subtitle: r.treatment,
        videoId: r.type === 'video' ? parsedId : undefined,
        reelId: r.type === 'instagram' ? parsedId : undefined
      };
    })
    .filter(v => v.videoId || v.reelId);

  const baseRow1 = getMergedCards(ROW_1_CARDS);
  const baseRow2 = getMergedCards(ROW_2_CARDS);

  const mergedRow1Cards = [...baseRow1];
  const mergedRow2Cards = [...baseRow2];

  dbVideoCards.forEach((card, idx) => {
    const isDup = [...ROW_1_CARDS, ...ROW_2_CARDS].some(s => s.name.toLowerCase() === card.name.toLowerCase());
    if (!isDup) {
      if (idx % 2 === 0) {
        mergedRow1Cards.push(card);
      } else {
        mergedRow2Cards.push(card);
      }
    }
  });

  const renderCard = (card, prefix = 'card') => {
    const uniqueKey = `${prefix}-${card.id}`;
    if (card.type === 'text') {
      return (
        <div key={uniqueKey} className="w-[230px] h-[400px] bg-gradient-to-br from-[#f0f7ff] via-[#e8f4fd] to-[#dbeeff] border border-brandSky/15 hover:border-brandSky/35 rounded-2xl p-5 shrink-0 flex flex-col justify-between shadow-[0_8px_30px_-10px_rgba(14,165,233,0.15)] hover:shadow-[0_15px_40px_-8px_rgba(14,165,233,0.25)] transition-all duration-300 relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-brandSky/8 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex-grow flex flex-col justify-between h-full relative z-10">
            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-white bg-slate-100 shrink-0 select-none shadow-sm">
                  {card.image ? (
                    <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-brandBlue to-brandSky flex items-center justify-center text-white text-xs font-extrabold font-headline">
                      {card.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="text-left overflow-hidden">
                  <h4 className="font-headline font-extrabold text-[12px] text-slate-800 leading-snug truncate">{card.name}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 truncate">{card.location}</p>
                </div>
              </div>
              {renderStars(card.rating)}
              <p
                className="text-slate-600 text-[12px] leading-relaxed italic mt-3 font-medium text-left line-clamp-[8]"
                dangerouslySetInnerHTML={{ __html: `"${card.text}"` }}
              />
            </div>
            <div className="border-t border-brandSky/15 mt-3 pt-2 text-left shrink-0">
              <span className="text-[9px] text-brandBlue font-extrabold uppercase tracking-wider block truncate">{card.treatment}</span>
            </div>
          </div>
        </div>
      );
    }

    if (card.type === 'video' || card.type === 'instagram') {
      const isInsta = card.type === 'instagram';
      const badgeBg = isInsta
        ? "bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737]"
        : "bg-[#FF0000]";
      const clickHandler = isInsta
        ? () => openInstaReel(card.reelId)
        : () => openVideo(card.videoId);

      return (
        <div
          key={uniqueKey}
          onClick={clickHandler}
          className="w-[230px] h-[400px] bg-gradient-to-br from-[#dbeafe] via-[#eff6ff] to-[#bae6fd] border border-blue-200/40 hover:border-blue-300/60 rounded-2xl overflow-hidden shrink-0 shadow-sm transition-all group relative cursor-pointer flex flex-col p-1.5"
        >
          {/* Badge */}
          <div className={`absolute top-3.5 right-3.5 z-20 w-6 h-6 rounded-md ${badgeBg} flex items-center justify-center shadow-md`}>
            {isInsta ? (
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.516 3.5 12 3.5 12 3.5s-7.516 0-9.387.555A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.484 20.5 12 20.5 12 20.5s7.516 0 9.387-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            )}
          </div>

          {/* Portrait Video/Image Container */}
          <div className="flex-grow w-full overflow-hidden bg-slate-950 relative rounded-xl border border-blue-100/10">
            <img src={card.thumbnail} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/30 transition-colors duration-300 flex items-center justify-center">
              <span className="w-11 h-11 rounded-full bg-white/95 text-brandBlue flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300">
                <Play className="w-4.5 h-4.5 fill-current ml-0.5" />
              </span>
            </div>
            {/* Gradient Overlay at the bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent z-10 pointer-events-none"></div>

            {/* Title & subtitle inside the image container, at the bottom */}
            <div className="absolute bottom-2.5 inset-x-3.5 z-20 text-left pointer-events-none">
              <h4 className="font-headline font-extrabold text-[12px] sm:text-[13px] text-white leading-tight line-clamp-1">{card.title}</h4>
              <p className="text-brandSky font-bold text-[10px] sm:text-[11px] mt-0.5 line-clamp-1">{card.subtitle}</p>
            </div>
          </div>
        </div>
      );
    }

    if (card.type === 'photo') {
      return (
        <div key={uniqueKey} className="w-[230px] h-[400px] bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden shrink-0 flex flex-col justify-between shadow-sm transition-all group p-1.5">
          <div className="flex-grow w-full overflow-hidden relative rounded-xl shrink-0">
            <img src={card.image} alt={card.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent z-10"></div>
            <div className="absolute bottom-2.5 inset-x-3 z-20 text-left">
              <span className="text-[8px] text-brandSky font-extrabold uppercase tracking-widest block">{card.treatment}</span>
              <h4 className="font-headline font-extrabold text-[11px] text-white leading-snug mt-0.5 line-clamp-2">{card.title}</h4>
            </div>
          </div>
          <div className="p-2.5 text-left">
            <p className="text-slate-400 text-[10px] leading-relaxed line-clamp-3 italic">"{card.text}"</p>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider border-t border-slate-900 pt-1.5 mt-1.5">&mdash; {card.name}</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <section id="testimonials" className="w-full py-16 lg:py-20 bg-slate-50 text-slate-800 font-body relative overflow-hidden text-left border-t border-slate-100">
      {/* Decorative glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brandSky/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brandBlue/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brandBlue/5 border border-brandBlue/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-brandSky relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandSky opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brandSky"></span>
            </span>
            <span className="text-[10px] font-bold text-brandBlue uppercase tracking-wider font-headline">
              Patient Voices
            </span>
          </div>
          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-primary mt-2">
            Stories of Smiles{' '}
            <span className="bg-gradient-to-r from-brandBlue to-brandSky bg-clip-text text-transparent font-extrabold">
              Voices of Healing
            </span>
          </h2>
          <p className="text-secondary text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Read and watch how <span className="text-brandSky font-bold">they shared their experience</span> and the <span className="text-brandSky font-bold">real human touch</span> they received through clinical transformations and recovery testimonials.
          </p>
        </div>

        {/* Infinite Scrolling Marquee Container */}
        <div className="space-y-6 overflow-hidden py-4 select-none">
          {/* Row 1: Right to Left */}
          <div className="marquee-row-1 relative flex overflow-hidden">
            <div className="animate-marquee-left flex gap-6 pr-6">
              {mergedRow1Cards.map((card) => renderCard(card, 'orig'))}
              {mergedRow1Cards.map((card) => renderCard(card, 'dup'))} {/* Double rendering for loop */}
            </div>
          </div>

          {/* Row 2: Left to Right */}
          <div className="marquee-row-2 relative flex overflow-hidden">
            <div className="animate-marquee-right flex gap-6 pr-6">
              {mergedRow2Cards.map((card) => renderCard(card, 'orig'))}
              {mergedRow2Cards.map((card) => renderCard(card, 'dup'))} {/* Double rendering for loop */}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Player (YouTube) */}
      {activeVideoId && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-950 w-full max-w-[360px] sm:w-[380px] aspect-[9/16] max-h-[85vh] relative border-[8px] border-white rounded-[2.5rem] shadow-2xl transition-all duration-300">
            <button
              onClick={closeVideo}
              className="absolute -top-3 -right-3 z-50 w-9 h-9 rounded-full bg-black border border-white/10 text-brandSky hover:text-brandSky/85 hover:scale-110 flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full h-full rounded-[2rem] overflow-hidden bg-black relative">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Instagram Reel Modal Player */}
      {activeInstaReelId && (
        <div
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
              closeVideo();
            }
          }}
          onMouseEnter={() => window.focus()}
          onMouseMove={() => {
            if (document.activeElement?.tagName === 'IFRAME') {
              window.focus();
            }
          }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md focus:outline-none"
        >
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={closeVideo}
          />
          <div className="bg-white w-full max-w-[360px] sm:w-[380px] aspect-[9/16] max-h-[85vh] relative border-[8px] border-white rounded-[2.5rem] shadow-2xl transition-all duration-300 z-10">
            <button
              onClick={closeVideo}
              className="absolute -top-3 -right-3 z-50 w-9 h-9 rounded-full bg-black border border-white/10 text-pink-400 hover:text-pink-300 hover:scale-110 flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer"
              aria-label="Close Instagram reel"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white relative">
              <iframe
                src={`https://www.instagram.com/reel/${activeInstaReelId}/embed/`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                title="Instagram Reel Player"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
