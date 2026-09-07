import { apiClient } from "./api";

// Static default event photo collections
const allJerushaligneOpeningPhotos = [
  { id: 101, image_url: '/images/events/jerushaligne-opening-event/jerushaligne-manufacturing-units-open.webp', aspect: 'landscape' },
  { id: 102, image_url: '/images/events/jerushaligne-opening-event/jerushaligne-clear-aligners-unit-open.webp', aspect: 'landscape' },
  { id: 103, image_url: '/images/events/jerushaligne-opening-event/jerushaligne-opening-banner.webp', aspect: 'landscape' },
  { id: 104, image_url: '/images/events/jerushaligne-opening-event/baldbin-jaja-with-ex-ias.webp', aspect: 'landscape' },
  { id: 105, image_url: '/images/events/jerushaligne-opening-event/binbila-and-bladbin.webp', aspect: 'landscape' },
  { id: 106, image_url: '/images/events/jerushaligne-opening-event/binila-artboard-sign.webp', aspect: 'landscape' },
  { id: 107, image_url: '/images/events/jerushaligne-opening-event/binila-bladbin-children.webp', aspect: 'landscape' },
  { id: 108, image_url: '/images/events/jerushaligne-opening-event/binila-daughter-artboard-sign.webp', aspect: 'portrait' },
  { id: 109, image_url: '/images/events/jerushaligne-opening-event/binila-lighhtening-lamp.webp', aspect: 'portrait' },
  { id: 110, image_url: '/images/events/jerushaligne-opening-event/bladbin-ceo-family-with-jaja-china.webp', aspect: 'landscape' },
  { id: 111, image_url: '/images/events/jerushaligne-opening-event/bladbin-father-artboard-sign.webp', aspect: 'landscape' },
  { id: 112, image_url: '/images/events/jerushaligne-opening-event/bladbin-jerush-family.webp', aspect: 'landscape' },
  { id: 113, image_url: '/images/events/jerushaligne-opening-event/bladbin-with-guests.webp', aspect: 'landscape' },
  { id: 114, image_url: '/images/events/jerushaligne-opening-event/ceramic-teeth-manufacturing-unit.webp', aspect: 'landscape' },
  { id: 115, image_url: '/images/events/jerushaligne-opening-event/ceramic-teeth-unit.webp', aspect: 'landscape' },
  { id: 116, image_url: '/images/events/jerushaligne-opening-event/ceramic-unit-2.webp', aspect: 'landscape' },
  { id: 117, image_url: '/images/events/jerushaligne-opening-event/ceramic-unit.webp', aspect: 'landscape' },
  { id: 118, image_url: '/images/events/jerushaligne-opening-event/cief-gusets-and-bladbin.webp', aspect: 'landscape' },
  { id: 119, image_url: '/images/events/jerushaligne-opening-event/clear-aligner-jerushaligne-drilling-unit.webp', aspect: 'landscape' },
  { id: 120, image_url: '/images/events/jerushaligne-opening-event/clear-aligner-sheet-printing-unit.webp', aspect: 'landscape' },
  { id: 121, image_url: '/images/events/jerushaligne-opening-event/clear-aligner-thermo-unit.webp', aspect: 'landscape' },
  { id: 122, image_url: '/images/events/jerushaligne-opening-event/clear-aligner-unit.webp', aspect: 'landscape' },
  { id: 123, image_url: '/images/events/jerushaligne-opening-event/dental-ceramic-unit.webp', aspect: 'landscape' },
  { id: 124, image_url: '/images/events/jerushaligne-opening-event/jaja-clear-aligner-ceo-china-prismlab.webp', aspect: 'landscape' },
  { id: 125, image_url: '/images/events/jerushaligne-opening-event/jerush-chairman-family.webp', aspect: 'landscape' },
  { id: 126, image_url: '/images/events/jerushaligne-opening-event/jerush-chapel.webp', aspect: 'landscape' },
  { id: 127, image_url: '/images/events/jerushaligne-opening-event/jerush-doctors-ceo.webp', aspect: 'landscape' },
  { id: 128, image_url: '/images/events/jerushaligne-opening-event/jerush-doctors-trichy.webp', aspect: 'landscape' },
  { id: 129, image_url: '/images/events/jerushaligne-opening-event/jerush-escalator.webp', aspect: 'landscape' },
  { id: 130, image_url: '/images/events/jerushaligne-opening-event/jerush-ground-floor.webp', aspect: 'landscape' },
  { id: 131, image_url: '/images/events/jerushaligne-opening-event/jerush-lightings.webp', aspect: 'landscape' },
  { id: 132, image_url: '/images/events/jerushaligne-opening-event/jerush-outdoor.webp', aspect: 'landscape' },
  { id: 133, image_url: '/images/events/jerushaligne-opening-event/jerush-patient-waiting-area.webp', aspect: 'landscape' },
  { id: 134, image_url: '/images/events/jerushaligne-opening-event/jerush-second-floor.webp', aspect: 'landscape' },
  { id: 135, image_url: '/images/events/jerushaligne-opening-event/jerush-thuckaly-entrance.webp', aspect: 'landscape' },
  { id: 136, image_url: '/images/events/jerushaligne-opening-event/jerush-wooden-arts.webp', aspect: 'landscape' },
  { id: 137, image_url: '/images/events/jerushaligne-opening-event/prabin-ceo-family-jerush.webp', aspect: 'landscape' }
];

const allDrBladbinBirthdayPhotos = [
  { id: 201, image_url: '/images/events/dr-bladbin-birthday/bladbin-birthday-cover.webp', aspect: 'landscape' },
  { id: 202, image_url: '/images/events/dr-bladbin-birthday/accounts-aligner-reception-jerush.webp', aspect: 'landscape' },
  { id: 203, image_url: '/images/events/dr-bladbin-birthday/aishwarya-with-binila-priya-doctor.webp', aspect: 'landscape' },
  { id: 204, image_url: '/images/events/dr-bladbin-birthday/binila-gift--to-bladbin.webp', aspect: 'landscape' },
  { id: 205, image_url: '/images/events/dr-bladbin-birthday/binila-with-bladbin-cute-moments.webp', aspect: 'landscape' },
  { id: 206, image_url: '/images/events/dr-bladbin-birthday/binila-with-bladbin-soulful-gift.webp', aspect: 'landscape' },
  { id: 207, image_url: '/images/events/dr-bladbin-birthday/birthday-cake-jerush-bladbin.webp', aspect: 'landscape' },
  { id: 208, image_url: '/images/events/dr-bladbin-birthday/bladbin-birthday-cake.webp', aspect: 'landscape' },
  { id: 209, image_url: '/images/events/dr-bladbin-birthday/bladbin-family-portrait.webp', aspect: 'landscape' },
  { id: 210, image_url: '/images/events/dr-bladbin-birthday/cake-cutting-bladbin.webp', aspect: 'landscape' },
  { id: 211, image_url: '/images/events/dr-bladbin-birthday/ceo-with-doctors-team.webp', aspect: 'landscape' },
  { id: 212, image_url: '/images/events/dr-bladbin-birthday/ceo-with-selfie-doctors.webp', aspect: 'landscape' },
  { id: 213, image_url: '/images/events/dr-bladbin-birthday/chief-bladbin-cake-cutting.webp', aspect: 'landscape' },
  { id: 214, image_url: '/images/events/dr-bladbin-birthday/chief-guest-with-bladbin-binila.webp', aspect: 'landscape' },
  { id: 215, image_url: '/images/events/dr-bladbin-birthday/chief-guest-with-doctors.webp', aspect: 'landscape' },
  { id: 216, image_url: '/images/events/dr-bladbin-birthday/dental-assistants-gift-to-bladbin.webp', aspect: 'landscape' },
  { id: 217, image_url: '/images/events/dr-bladbin-birthday/dental-assistants-to-bladbin.webp', aspect: 'landscape' },
  { id: 218, image_url: '/images/events/dr-bladbin-birthday/doctors-jerush-thuckalay-charming-moments.webp', aspect: 'landscape' },
  { id: 219, image_url: '/images/events/dr-bladbin-birthday/doctors-presenting-gifts-bladbin.webp', aspect: 'landscape' },
  { id: 220, image_url: '/images/events/dr-bladbin-birthday/dr-ajay-shalu-vijayalaksmnigift-to-bladbin.webp', aspect: 'landscape' },
  { id: 221, image_url: '/images/events/dr-bladbin-birthday/dr-priya-dharshini-gift-to-bladbin.webp', aspect: 'landscape' },
  { id: 222, image_url: '/images/events/dr-bladbin-birthday/dr-ranisha-ameega-jolly-gift-to-bladbin.webp', aspect: 'landscape' },
  { id: 223, image_url: '/images/events/dr-bladbin-birthday/dr-suryambika-aahina-gift-to-bladbin.webp', aspect: 'landscape' },
  { id: 224, image_url: '/images/events/dr-bladbin-birthday/group-of-doctors-showing-graceful.webp', aspect: 'landscape' },
  { id: 225, image_url: '/images/events/dr-bladbin-birthday/jerush-all-team-thuckalay.webp', aspect: 'landscape' },
  { id: 226, image_url: '/images/events/dr-bladbin-birthday/jerush-all-team-with0fun-overloaded.webp', aspect: 'landscape' },
  { id: 227, image_url: '/images/events/dr-bladbin-birthday/jerush-assistants-gift-bladbin.webp', aspect: 'landscape' },
  { id: 228, image_url: '/images/events/dr-bladbin-birthday/jerush-dental-cosmetic-doctors.webp', aspect: 'landscape' },
  { id: 229, image_url: '/images/events/dr-bladbin-birthday/jerush-doctors-gift-bladbin.webp', aspect: 'landscape' },
  { id: 230, image_url: '/images/events/dr-bladbin-birthday/jerush-doctors-to-bladbin.webp', aspect: 'landscape' },
  { id: 231, image_url: '/images/events/dr-bladbin-birthday/jerush-medical-rep-gift-to-bladbin.webp', aspect: 'landscape' },
  { id: 232, image_url: '/images/events/dr-bladbin-birthday/jerush-thuckalay-doctors.webp', aspect: 'landscape' },
  { id: 233, image_url: '/images/events/dr-bladbin-birthday/jerush-thuckalay-team.webp', aspect: 'landscape' },
  { id: 234, image_url: '/images/events/dr-bladbin-birthday/jerush-thuckaly-doctors-selfies.webp', aspect: 'landscape' },
  { id: 235, image_url: '/images/events/dr-bladbin-birthday/looking-aweful-gift-bladbin.webp', aspect: 'landscape' },
  { id: 236, image_url: '/images/events/dr-bladbin-birthday/looking-the-gifts.webp', aspect: 'landscape' },
  { id: 237, image_url: '/images/events/dr-bladbin-birthday/memories-with-frames.webp', aspect: 'landscape' },
  { id: 238, image_url: '/images/events/dr-bladbin-birthday/prabin-sharing-cake-bladbin-with-love.webp', aspect: 'landscape' },
  { id: 239, image_url: '/images/events/dr-bladbin-birthday/prabin-sharing-cake-bladbin.webp', aspect: 'landscape' },
  { id: 240, image_url: '/images/events/dr-bladbin-birthday/pro-receptionsit-with-binila.webp', aspect: 'landscape' },
  { id: 241, image_url: '/images/events/dr-bladbin-birthday/reception-pro-jerush-thuckalay.webp', aspect: 'landscape' },
  { id: 242, image_url: '/images/events/dr-bladbin-birthday/sharing-cake-binila-bladbin.webp', aspect: 'landscape' },
  { id: 243, image_url: '/images/events/dr-bladbin-birthday/sharing-happy-moments.webp', aspect: 'landscape' },
  { id: 244, image_url: '/images/events/dr-bladbin-birthday/special-edition-cake-landscape.webp', aspect: 'landscape' },
  { id: 245, image_url: '/images/events/dr-bladbin-birthday/special-edition-cake-portrait.webp', aspect: 'portrait' },
  { id: 246, image_url: '/images/events/dr-bladbin-birthday/team-thuckalay-jerush.webp', aspect: 'landscape' },
  { id: 247, image_url: '/images/events/dr-bladbin-birthday/three-gift-frames-in-a-row.webp', aspect: 'landscape' }
];

const allOnamPhotos = [
  { id: 301, image_url: '/images/events/onam-2025/jerush-thuckalay-all-doctors-group-shoot.webp', aspect: 'landscape' },
  { id: 302, image_url: '/images/events/onam-2025/pookolam-by-doctors.webp', aspect: 'landscape' },
  { id: 303, image_url: '/images/events/onam-2025/all-doctors-shoot.webp', aspect: 'landscape' },
  { id: 304, image_url: '/images/events/onam-2025/baldbin-binila-casual-look.webp', aspect: 'landscape' },
  { id: 305, image_url: '/images/events/onam-2025/binila-candid-shot.webp', aspect: 'landscape' },
  { id: 306, image_url: '/images/events/onam-2025/binila-portrait-casual-shot.webp', aspect: 'portrait' },
  { id: 307, image_url: '/images/events/onam-2025/binila-with-dental-doctors-pookolam.webp', aspect: 'landscape' },
  { id: 308, image_url: '/images/events/onam-2025/bladbin-binila-onam-shoot.webp', aspect: 'landscape' },
  { id: 309, image_url: '/images/events/onam-2025/bladbin-binila.webp', aspect: 'landscape' },
  { id: 310, image_url: '/images/events/onam-2025/ceo-with-bladbin.webp', aspect: 'landscape' },
  { id: 311, image_url: '/images/events/onam-2025/cosmetic-assistants-dance-performance.webp', aspect: 'landscape' },
  { id: 312, image_url: '/images/events/onam-2025/cosmetic-assistants.webp', aspect: 'landscape' },
  { id: 313, image_url: '/images/events/onam-2025/dental-assistants.webp', aspect: 'landscape' },
  { id: 314, image_url: '/images/events/onam-2025/desntal-ssistants-group.webp', aspect: 'landscape' },
  { id: 315, image_url: '/images/events/onam-2025/dr-binila-casusal.webp', aspect: 'portrait' },
  { id: 316, image_url: '/images/events/onam-2025/dr-bladbin-fiona-binila.webp', aspect: 'landscape' },
  { id: 317, image_url: '/images/events/onam-2025/dr-bladbin-with-all-doctors-shoot.webp', aspect: 'landscape' },
  { id: 318, image_url: '/images/events/onam-2025/dr-bladbin-with-his-assistants.webp', aspect: 'landscape' },
  { id: 319, image_url: '/images/events/onam-2025/jerush-family-group-shoot.webp', aspect: 'landscape' },
  { id: 320, image_url: '/images/events/onam-2025/pookalam-by-cosmetic-assistants.webp', aspect: 'landscape' },
  { id: 321, image_url: '/images/events/onam-2025/pookolam-by-cosmetic.webp', aspect: 'landscape' },
  { id: 322, image_url: '/images/events/onam-2025/r-binila-portrait.webp', aspect: 'portrait' }
];

const allMedicalCampPhotos = [
  { id: 401, image_url: '/images/events/medical-camp/jerush-medical-camp-group-photo.webp', aspect: 'landscape' },
  { id: 402, image_url: '/images/events/medical-camp/free-community-medical-camp-group-photo.webp', aspect: 'landscape' },
  { id: 403, image_url: '/images/events/medical-camp/bladbin-inaugurating-medical-camp-jerush.webp', aspect: 'landscape' },
  { id: 404, image_url: '/images/events/medical-camp/bladbin-stalin-visiting-medical-camp.webp', aspect: 'landscape' },
  { id: 405, image_url: '/images/events/medical-camp/doctors-providing-health-consultation-medical-camp.webp', aspect: 'landscape' },
  { id: 406, image_url: '/images/events/medical-camp/dr-ranisha-appreciation-award-medical-camp.webp', aspect: 'landscape' },
  { id: 407, image_url: '/images/events/medical-camp/dr-stalin-dr-bladbin-jerush-stage.webp', aspect: 'landscape' },
  { id: 408, image_url: '/images/events/medical-camp/dr-stalin-medical-camp-press-meet.webp', aspect: 'landscape' },
  { id: 409, image_url: '/images/events/medical-camp/dr-vijayalaksmi-appreciation-award-medical-camp.webp', aspect: 'landscape' },
  { id: 410, image_url: '/images/events/medical-camp/free-medical-checkup-community-health-camp.webp', aspect: 'landscape' },
  { id: 411, image_url: '/images/events/medical-camp/jerush-medical-camp-chief-guest-welcome.webp', aspect: 'landscape' },
  { id: 412, image_url: '/images/events/medical-camp/medical-awareness-rally-police-department.webp', aspect: 'landscape' },
  { id: 413, image_url: '/images/events/medical-camp/medical-camp-group-photo-with-police.webp', aspect: 'landscape' },
  { id: 414, image_url: '/images/events/medical-camp/medical-camp-health-screening-patient-care.webp', aspect: 'landscape' }
];

const mockEvents = [
  {
    id: 8,
    title: 'Jerushaligne and Advanced Technology Units Opening Celebration 2k26',
    description: 'Moments from the grand opening celebration of Jerushaligne Clear Aligners Manufacturing and our new Advanced Technology Units. A memorable day celebrating innovation, advanced patient care and our growing clinical family.',
    event_date: 'May 30, 2026',
    cover_image: '/images/events/jerushaligne-opening-event/jerushaligne-opening-banner.webp',
    status: 'published',
    photo_count: allJerushaligneOpeningPhotos.length,
    photos: allJerushaligneOpeningPhotos
  },
  {
    id: 7,
    title: "Bladbin's Birthday Celebration",
    description: 'Jerush Dentofacial & Cosmetic Laser Centre, Thuckalay, proudly celebrated the birthday of our Founder and Chairman, Dr. A. Bladbin, with great enthusiasm and gratitude. The occasion brought together our doctors, staff, well-wishers and patients to honour his inspiring leadership, dedication to excellence and unwavering commitment to delivering quality healthcare.',
    event_date: 'February 28, 2026',
    cover_image: '/images/events/dr-bladbin-birthday/bladbin-birthday-cover.webp',
    status: 'published',
    photo_count: allDrBladbinBirthdayPhotos.length,
    photos: allDrBladbinBirthdayPhotos
  },
  {
    id: 11,
    title: 'ONAM VIBEZ 2K25',
    description: 'Jerush Hospital, Thuckalay, celebrated the spirit of Onam with joy, togetherness and vibrant festive energy on September 5, 2025. A colourful Pookalam added to the festive atmosphere, with our team coming together to create a beautiful traditional design.',
    event_date: 'September 05, 2025',
    cover_image: '/images/events/onam-2025/pookolam-by-doctors.webp',
    status: 'published',
    photo_count: allOnamPhotos.length,
    photos: allOnamPhotos
  },
  {
    id: 12,
    title: 'Free Community Health & Medical Screening Camp',
    description: 'Jerush Healthcare organized a comprehensive Free Medical & Dental Screening Camp serving over 500 local residents with free consultations, oral health kits, diagnostic tests and specialist care.',
    event_date: 'August 18, 2025',
    cover_image: '/images/events/medical-camp/jerush-medical-camp-group-photo.webp',
    status: 'published',
    photo_count: allMedicalCampPhotos.length,
    photos: allMedicalCampPhotos
  },
  {
    id: 9,
    title: 'CRESCITA - 23rd Jerush Anniversary',
    description: 'Celebrating 23 remarkable years of clinical excellence, growth and trust, Jerush Dentofacial & Cosmetic Laser Centre, Thuckalay, hosted "CRESCITA 2025" to mark its milestone anniversary.',
    event_date: 'September 05, 2025',
    cover_image: '/images/events/dr-bladbin-birthday/team-thuckalay-jerush.webp',
    status: 'published',
    photo_count: 0,
    photos: []
  },
  {
    id: 10,
    title: 'ESTRELLA 25 – The Star of Bethlehem',
    description: "Every Christmas is a reminder of God's greatest gift to humanity, the birth of Jesus Christ, the Prince of Peace. ESTRELLA '25 was a beautiful celebration organized by the Jerush Family, bringing together staff, families, friends and well-wishers to share the joy of the season in an atmosphere filled with love, gratitude and fellowship.",
    event_date: 'December 24, 2025',
    cover_image: '/images/events/jerushaligne-opening-event/jerush-chapel.webp',
    status: 'published',
    photo_count: 0,
    photos: []
  }
];

// Helper to normalize image URLs cleanly
export const normalizeImageUrl = (url, title = '', isCover = false, index = 0) => {
  if (!url || typeof url !== 'string') {
    return '';
  }

  // Fix folder name mismatch if stored in database as jerushaligne-events
  url = url.replace('/images/events/jerushaligne-events/', '/images/events/jerushaligne-opening-event/');

  // Return base64, static images, uploads, or http URLs directly as-is
  if (url.startsWith('data:image') || url.startsWith('/images/') || url.startsWith('/uploads/') || url.startsWith('http')) {
    return url;
  }

  return url;
};

// Sanitize event URLs and attach real photo collections for built-in events
const sanitizeEvent = (event) => {
  if (!event) return event;
  const title = event.title || '';
  const idStr = String(event.id);
  const titleLower = title.toLowerCase();

  // If this is a known event, ensure it uses its real static photo collection and cover
  if (idStr === '8' || titleLower.includes('jerushaligne') || titleLower.includes('advanced technology')) {
    return {
      ...event,
      cover_image: '/images/events/jerushaligne-opening-event/jerushaligne-opening-banner.webp',
      photos: allJerushaligneOpeningPhotos,
      photo_count: allJerushaligneOpeningPhotos.length
    };
  }

  if (idStr === '7' || titleLower.includes('bladbin') || titleLower.includes('birthday')) {
    return {
      ...event,
      cover_image: '/images/events/dr-bladbin-birthday/bladbin-birthday-cover.webp',
      photos: allDrBladbinBirthdayPhotos,
      photo_count: allDrBladbinBirthdayPhotos.length
    };
  }

  if (idStr === '11' || titleLower.includes('onam')) {
    return {
      ...event,
      cover_image: '/images/events/onam-2025/pookolam-by-doctors.webp',
      photos: allOnamPhotos,
      photo_count: allOnamPhotos.length
    };
  }

  if (idStr === '12' || titleLower.includes('medical camp') || titleLower.includes('community health')) {
    return {
      ...event,
      cover_image: '/images/events/medical-camp/jerush-medical-camp-group-photo.webp',
      photos: allMedicalCampPhotos,
      photo_count: allMedicalCampPhotos.length
    };
  }

  if (idStr === '10' || titleLower.includes('estrella') || titleLower.includes('bethlehem') || titleLower.includes('christmas')) {
    return {
      ...event,
      cover_image: event.cover_image && !event.cover_image.includes('/uploads/') ? event.cover_image : '/images/events/jerushaligne-opening-event/jerush-chapel.webp',
      photos: Array.isArray(event.photos) && event.photos.length > 0 ? event.photos : [],
      photo_count: Array.isArray(event.photos) ? event.photos.length : 0
    };
  }

  if (idStr === '9' || titleLower.includes('crescita') || titleLower.includes('anniversary')) {
    return {
      ...event,
      cover_image: event.cover_image && !event.cover_image.includes('/uploads/') ? event.cover_image : '/images/events/dr-bladbin-birthday/team-thuckalay-jerush.webp',
      photos: Array.isArray(event.photos) && event.photos.length > 0 ? event.photos : [],
      photo_count: Array.isArray(event.photos) ? event.photos.length : 0
    };
  }

  let photos = event.photos;
  if (Array.isArray(photos)) {
    photos = photos.map((p, idx) => {
      const originalUrl = typeof p === 'object' ? (p.image_url || p.cleanPath || p.url) : p;
      const cleanUrl = normalizeImageUrl(originalUrl, title, false, idx);
      return typeof p === 'object'
        ? { ...p, image_url: cleanUrl }
        : { id: idx + 1, image_url: cleanUrl };
    });
  }

  return {
    ...event,
    cover_image: normalizeImageUrl(event.cover_image, title, true, 0),
    photos: photos || [],
    photo_count: photos ? photos.length : (event.photo_count || 0)
  };
};

const getLocalEvents = () => {
  const local = localStorage.getItem('jerush_gallery_events');
  if (local !== null) {
    try {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(sanitizeEvent);
      }
    } catch (e) {
      return mockEvents.map(sanitizeEvent);
    }
  }
  return mockEvents.map(sanitizeEvent);
};

const saveLocalEvents = (list) => {
  try {
    localStorage.setItem('jerush_gallery_events', JSON.stringify(list));
  } catch (e) {
    console.warn("localStorage quota exceeded, skipping local sync:", e);
  }
};

export const galleryService = {
  getEvents: async () => {
    try {
      const data = await apiClient.get('/gallery_events.php');
      if (Array.isArray(data) && data.length > 0) {
        const sanitized = data.map(ev => sanitizeEvent(ev));
        saveLocalEvents(sanitized);
        return sanitized;
      }
      return getLocalEvents();
    } catch (e) {
      console.warn("API failed, falling back to localStorage gallery events:", e);
      return getLocalEvents();
    }
  },

  getEventById: async (id) => {
    try {
      const data = await apiClient.get(`/gallery_events.php?id=${id}`);
      if (data && data.id) {
        return sanitizeEvent(data);
      }
      const localList = getLocalEvents();
      const event = localList.find(ev => String(ev.id) === String(id)) || mockEvents.find(ev => String(ev.id) === String(id));
      if (!event) throw new Error("Event not found");
      return sanitizeEvent(event);
    } catch (e) {
      console.warn(`API failed, falling back to localStorage event id ${id}:`, e);
      const localList = getLocalEvents();
      const event = localList.find(ev => String(ev.id) === String(id)) || mockEvents.find(ev => String(ev.id) === String(id));
      if (!event) throw new Error("Event not found");
      return sanitizeEvent(event);
    }
  },

  addEvent: async (data) => {
    const cleanPhotos = (data.photos || []).map(p => {
      if (typeof p === 'string') return p;
      if (typeof p === 'object' && p !== null) {
        return {
          name: p.name || p.title || '',
          url: p.cleanPath || p.url || p.image_url || ''
        };
      }
      return String(p);
    });

    const payload = { ...data, photos: cleanPhotos };

    try {
      const res = await apiClient.post('/gallery_events.php', payload);
      const list = getLocalEvents();
      const newItem = {
        ...payload,
        id: res.id || Date.now(),
        photo_count: cleanPhotos.length,
        photos: cleanPhotos.map((p, idx) => ({ id: Date.now() + idx, image_url: p }))
      };
      list.unshift(newItem);
      saveLocalEvents(list);
      return res;
    } catch (e) {
      console.warn("API failed, performing addEvent in localStorage:", e);
      const list = getLocalEvents();
      const newItem = {
        ...payload,
        id: Date.now(),
        photo_count: cleanPhotos.length,
        photos: cleanPhotos.map((p, idx) => ({ id: Date.now() + idx, image_url: p }))
      };
      list.unshift(newItem);
      saveLocalEvents(list);
      return { success: true, id: newItem.id };
    }
  },

  updateEvent: async (id, data) => {
    try {
      const res = await apiClient.put(`/gallery_events.php?id=${id}`, data);
      const list = getLocalEvents();
      const idx = list.findIndex(ev => String(ev.id) === String(id));
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...data };
        saveLocalEvents(list);
      }
      return res;
    } catch (e) {
      console.warn("API failed, performing updateEvent in localStorage:", e);
      const list = getLocalEvents();
      const idx = list.findIndex(ev => String(ev.id) === String(id));
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...data };
        saveLocalEvents(list);
        return { success: true };
      }
      throw new Error("Event not found");
    }
  },

  deleteEvent: async (id) => {
    try {
      await apiClient.delete(`/gallery_events.php?id=${id}`);
    } catch (e) {
      console.warn("API failed, performing deleteEvent in localStorage:", e);
    }
    const list = getLocalEvents();
    const filtered = list.filter(ev => String(ev.id) !== String(id));
    saveLocalEvents(filtered);
    return { success: true };
  },

  addPhotosToEvent: async (eventId, photos) => {
    const cleanPhotos = (photos || []).map(p => {
      if (typeof p === 'string') return p;
      if (typeof p === 'object' && p !== null) {
        return {
          name: p.name || p.title || '',
          url: p.cleanPath || p.url || p.image_url || ''
        };
      }
      return String(p);
    });

    try {
      const res = await apiClient.post('/gallery_events.php?action=add_photos', { event_id: eventId, photos: cleanPhotos });
      const list = getLocalEvents();
      const idx = list.findIndex(ev => String(ev.id) === String(eventId));
      if (idx !== -1) {
        const currentPhotos = list[idx].photos || [];
        const newPhotoObjects = cleanPhotos.map((p, index) => ({ id: Date.now() + index, image_url: p }));
        list[idx].photos = [...currentPhotos, ...newPhotoObjects];
        list[idx].photo_count = list[idx].photos.length;
        saveLocalEvents(list);
      }
      return res;
    } catch (e) {
      console.warn("API failed, performing addPhotosToEvent in localStorage:", e);
      const list = getLocalEvents();
      const idx = list.findIndex(ev => String(ev.id) === String(eventId));
      if (idx !== -1) {
        const currentPhotos = list[idx].photos || [];
        const newPhotoObjects = cleanPhotos.map((p, index) => ({ id: Date.now() + index, image_url: p }));
        list[idx].photos = [...currentPhotos, ...newPhotoObjects];
        list[idx].photo_count = list[idx].photos.length;
        saveLocalEvents(list);
        return { success: true };
      }
      throw new Error("Event not found");
    }
  },

  deletePhotoFromEvent: async (photoId, eventId) => {
    try {
      await apiClient.delete(`/gallery_events.php?action=delete_photo&photo_id=${photoId}`);
    } catch (e) {
      console.warn("API failed, performing deletePhotoFromEvent in localStorage:", e);
    }
    const list = getLocalEvents();
    if (eventId) {
      const idx = list.findIndex(ev => String(ev.id) === String(eventId));
      if (idx !== -1) {
        list[idx].photos = (list[idx].photos || []).filter(p => String(p.id) !== String(photoId));
        list[idx].photo_count = list[idx].photos.length;
        saveLocalEvents(list);
      }
    } else {
      for (let ev of list) {
        if (ev.photos && ev.photos.some(p => String(p.id) === String(photoId))) {
          ev.photos = ev.photos.filter(p => String(p.id) !== String(photoId));
          ev.photo_count = ev.photos.length;
          break;
        }
      }
      saveLocalEvents(list);
    }
    return { success: true };
  }
};


