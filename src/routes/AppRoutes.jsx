import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import MilestonesLegacyPage from '../pages/MilestonesLegacyPage.jsx';
import ClinicalExcellencePage from '../pages/ClinicalExcellencePage.jsx';
import EthicalHealthcarePage from '../pages/EthicalHealthcarePage.jsx';
import DoctorsPage from '../pages/DoctorsPage.jsx';
import TreatmentsPage from '../pages/TreatmentsPage.jsx';
import OralPathologyPage from '../pages/OralPathologyPage.jsx';
import FractionalCo2LaserPage from '../pages/FractionalCo2LaserPage.jsx';
import GfcHairPage from '../pages/GfcHairPage.jsx';
import CryoSculptingPage from '../pages/CryoSculptingPage.jsx';
import HairTransplantPage from '../pages/HairTransplantPage.jsx';
import EventsPage from '../pages/EventsPage.jsx';
import BlogsPage from '../pages/BlogsPage.jsx';
import BlogDetailsPage from '../pages/BlogDetailsPage.jsx';
import ReviewsPage from '../pages/ReviewsPage.jsx';
import VideoTestimonialsPage from '../pages/VideoTestimonialsPage.jsx';
import CareersPage from '../pages/CareersPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import DrBladbinPage from '../pages/leadership/DrBladbinPage.jsx';
import DrBinilaPage from '../pages/leadership/DrBinilaPage.jsx';
import DrPrabinPage from '../pages/leadership/DrPrabinPage.jsx';
import TreatmentDetailPage from '../pages/TreatmentDetailPage.jsx';
import DentalImplantsPage from '../pages/DentalImplantsPage.jsx';
import RootCanalTreatmentPage from '../pages/RootCanalTreatmentPage.jsx';
import TeamPage from '../pages/TeamPage.jsx';

import CrownsBridgesPage from '../pages/CrownsBridgesPage.jsx';
import SmileStoriesPage from '../pages/SmileStoriesPage.jsx';
import SmileTransformationsPage from '../pages/SmileTransformationsPage.jsx';
import CosmeticResurfacingPage from '../pages/CosmeticResurfacingPage.jsx';
import HairRegrowthResultsPage from '../pages/HairRegrowthResultsPage.jsx';
import BodyContouringCasesPage from '../pages/BodyContouringCasesPage.jsx';
import DentalCampsPage from '../pages/DentalCampsPage.jsx';
import JerushalignePage from '../pages/JerushalignePage.jsx';
import MetalBracesPage from '../pages/MetalBracesPage.jsx';
import AdminStaffProfiles from '../admin/pages/AdminStaffProfiles.jsx';
import EditorialStandardsPage from '../pages/EditorialStandardsPage.jsx';
import TermsConditionsPage from '../pages/TermsConditionsPage.jsx';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage.jsx';
import TechnologiesPage from '../pages/TechnologiesPage.jsx';
import RemovablePartialDenturesPage from '../pages/RemovablePartialDenturesPage.jsx';
import PediatricDentalCarePage from '../pages/PediatricDentalCarePage.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/about/milestones-legacy" element={<MilestonesLegacyPage />} />
      <Route path="/about/clinical-excellence" element={<ClinicalExcellencePage />} />
      <Route path="/about/ethical-healthcare" element={<EthicalHealthcarePage />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/technologies" element={<TechnologiesPage />} />
      <Route path="/advanced-technologies" element={<Navigate to="/technologies" replace />} />
      <Route path="/about/technologies" element={<Navigate to="/technologies" replace />} />
      <Route path="/treatments" element={<TreatmentsPage />} />

      {/* ─── DENTAL CARE HIERARCHICAL ROUTES ─── */}
      {/* Kids Dentistry / Pediatric Dental Care */}
      <Route path="/dental-care/kids-dentistry/pediatric-dental-care" element={<PediatricDentalCarePage />} />
      <Route path="/dental-care/kids-dentistry/pediatric-dental-care/" element={<PediatricDentalCarePage />} />
      <Route path="/dental-care/kids-dentistry" element={<Navigate to="/dental-care/kids-dentistry/pediatric-dental-care" replace />} />
      <Route path="/dental-care/kids-dentistry/" element={<Navigate to="/dental-care/kids-dentistry/pediatric-dental-care" replace />} />
      <Route path="/dental-care/pedodontics/pediatric-dental-care" element={<PediatricDentalCarePage />} />
      <Route path="/dental-care/pedodontics/pediatric-dental-care/" element={<PediatricDentalCarePage />} />
      <Route path="/dental-care/pediatric-dental-care" element={<PediatricDentalCarePage />} />
      <Route path="/dental-care/pediatric-dental-care/" element={<PediatricDentalCarePage />} />
      <Route path="/treatments/pediatric-dental-care" element={<Navigate to="/dental-care/kids-dentistry/pediatric-dental-care" replace />} />
      <Route path="/treatments/pediatric-dentistry" element={<Navigate to="/dental-care/kids-dentistry/pediatric-dental-care" replace />} />
      <Route path="/treatments/kids-dentistry" element={<Navigate to="/dental-care/kids-dentistry/pediatric-dental-care" replace />} />
      <Route path="/dental-treatments/pediatric-dental-care" element={<Navigate to="/dental-care/kids-dentistry/pediatric-dental-care" replace />} />
      <Route path="/pediatric-dental-care" element={<Navigate to="/dental-care/kids-dentistry/pediatric-dental-care" replace />} />
      <Route path="/pediatric-dentistry" element={<Navigate to="/dental-care/kids-dentistry/pediatric-dental-care" replace />} />

      {/* Dental Implants */}
      <Route path="/dental-care/implantology/dental-implants" element={<DentalImplantsPage />} />
      <Route path="/dental-care/implantology/dental-implants/" element={<DentalImplantsPage />} />
      <Route path="/dental-care/prosthodontic-care/dental-implants" element={<DentalImplantsPage />} />
      <Route path="/dental-implants" element={<Navigate to="/dental-care/implantology/dental-implants" replace />} />
      <Route path="/dental-treatments/dental-implants-in-chennai" element={<Navigate to="/dental-care/implantology/dental-implants" replace />} />

      {/* Crowns & Bridges */}
      <Route path="/dental-care/prosthodontic-care/dental-crowns-bridges" element={<CrownsBridgesPage />} />
      <Route path="/dental-care/prosthodontic-care/dental-crowns-bridges/" element={<CrownsBridgesPage />} />
      <Route path="/dental-care/prosthodontic-care/crowns-bridges" element={<CrownsBridgesPage />} />
      <Route path="/treatments/dental-crowns-bridges" element={<Navigate to="/dental-care/prosthodontic-care/dental-crowns-bridges" replace />} />
      <Route path="/treatments/jacket-crowns" element={<Navigate to="/dental-care/prosthodontic-care/dental-crowns-bridges" replace />} />
      <Route path="/treatments/fixed-partial-denture" element={<Navigate to="/dental-care/prosthodontic-care/dental-crowns-bridges" replace />} />
      <Route path="/dental-crowns-bridges" element={<Navigate to="/dental-care/prosthodontic-care/dental-crowns-bridges" replace />} />
      <Route path="/best-crowns-and-bridges-treatment" element={<Navigate to="/dental-care/prosthodontic-care/dental-crowns-bridges" replace />} />
      <Route path="/dental-treatments/best-crowns-and-bridges-treatment" element={<Navigate to="/dental-care/prosthodontic-care/dental-crowns-bridges" replace />} />

      {/* Removable Partial Dentures */}
      <Route path="/dental-care/prosthodontic-care/removable-partial-dentures" element={<RemovablePartialDenturesPage />} />
      <Route path="/dental-care/prosthodontic-care/removable-partial-dentures/" element={<RemovablePartialDenturesPage />} />
      <Route path="/treatments/removable-partial-dentures" element={<Navigate to="/dental-care/prosthodontic-care/removable-partial-dentures" replace />} />
      <Route path="/treatments/dentures" element={<Navigate to="/dental-care/prosthodontic-care/removable-partial-dentures" replace />} />
      <Route path="/dental-treatments/removable-partial-dentures" element={<Navigate to="/dental-care/prosthodontic-care/removable-partial-dentures" replace />} />
      <Route path="/dental-treatments/removable-partial-dentures/" element={<Navigate to="/dental-care/prosthodontic-care/removable-partial-dentures" replace />} />
      <Route path="/removable-partial-dentures" element={<Navigate to="/dental-care/prosthodontic-care/removable-partial-dentures" replace />} />

      {/* Root Canal Treatment */}
      <Route path="/dental-care/endodontic-care/root-canal-treatment" element={<RootCanalTreatmentPage />} />
      <Route path="/dental-care/endodontic-care/root-canal-treatment/" element={<RootCanalTreatmentPage />} />
      <Route path="/dental-care/endodontic-care/root-canal-treatment-in-tamilnadu" element={<RootCanalTreatmentPage />} />
      <Route path="/dental-treatments/root-canal-treatment-in-tamilnadu" element={<Navigate to="/dental-care/endodontic-care/root-canal-treatment" replace />} />
      <Route path="/root-canal-treatment-in-tamilnadu" element={<Navigate to="/dental-care/endodontic-care/root-canal-treatment" replace />} />

      {/* Metal Braces */}
      <Route path="/dental-care/orthodontic-care/metal-braces" element={<MetalBracesPage />} />
      <Route path="/dental-care/orthodontic-care/metal-braces/" element={<MetalBracesPage />} />
      <Route path="/treatments/metal-braces" element={<Navigate to="/dental-care/orthodontic-care/metal-braces" replace />} />
      <Route path="/dental-treatments/best-metal-orthodontic-braces" element={<Navigate to="/dental-care/orthodontic-care/metal-braces" replace />} />
      <Route path="/dental-treatments/best-metal-orthodontic-braces/" element={<Navigate to="/dental-care/orthodontic-care/metal-braces" replace />} />
      <Route path="/dental-treatments/metal-braces" element={<Navigate to="/dental-care/orthodontic-care/metal-braces" replace />} />
      <Route path="/metal-braces" element={<Navigate to="/dental-care/orthodontic-care/metal-braces" replace />} />

      {/* Jerushaligne Clear Aligners */}
      <Route path="/dental-care/orthodontic-care/clear-aligners-jerushaligne" element={<JerushalignePage />} />
      <Route path="/dental-care/orthodontic-care/clear-aligners-jerushaligne/" element={<JerushalignePage />} />
      <Route path="/dental-care/orthodontic-care/top-quality-invisible-clear-aligners-jerushaligne" element={<JerushalignePage />} />
      <Route path="/treatments/clear-aligners" element={<Navigate to="/dental-care/orthodontic-care/clear-aligners-jerushaligne" replace />} />
      <Route path="/dental-treatments/top-quality-invisible-clear-aligners-jerushaligne" element={<Navigate to="/dental-care/orthodontic-care/clear-aligners-jerushaligne" replace />} />
      <Route path="/dental-treatments/top-quality-invisible-clear-aligners-jerushaligne/" element={<Navigate to="/dental-care/orthodontic-care/clear-aligners-jerushaligne" replace />} />
      <Route path="/treatments/top-quality-invisible-clear-aligners-jerushaligne" element={<Navigate to="/dental-care/orthodontic-care/clear-aligners-jerushaligne" replace />} />
      <Route path="/top-quality-invisible-clear-aligners-jerushaligne" element={<Navigate to="/dental-care/orthodontic-care/clear-aligners-jerushaligne" replace />} />
      <Route path="/top-quality-invisible-clear-aligners-jerushaligne/" element={<Navigate to="/dental-care/orthodontic-care/clear-aligners-jerushaligne" replace />} />
      <Route path="/jerushaligne-clear-aligners" element={<Navigate to="/dental-care/orthodontic-care/clear-aligners-jerushaligne" replace />} />
      <Route path="/jerushaligne" element={<Navigate to="/dental-care/orthodontic-care/clear-aligners-jerushaligne" replace />} />
      <Route path="/clear-aligners" element={<Navigate to="/dental-care/orthodontic-care/clear-aligners-jerushaligne" replace />} />

      {/* Oral Pathology Screening */}
      <Route path="/dental-care/oral-pathology/oral-pathology-screening" element={<OralPathologyPage />} />
      <Route path="/dental-care/oral-pathology/oral-pathology-screening/" element={<OralPathologyPage />} />
      <Route path="/dental-treatments/oral-pathology-screening" element={<Navigate to="/dental-care/oral-pathology/oral-pathology-screening" replace />} />

      {/* ─── SKIN CARE HIERARCHICAL ROUTES ─── */}
      <Route path="/skin-care/laser-treatments/fractional-co2-laser" element={<FractionalCo2LaserPage />} />
      <Route path="/skin-care/laser-treatments/fractional-co2-laser/" element={<FractionalCo2LaserPage />} />
      <Route path="/skin-care/acne-scar-revision/fractional-co2-laser" element={<FractionalCo2LaserPage />} />
      <Route path="/cosmetic-care/laser-treatments/fractional-co2-laser" element={<FractionalCo2LaserPage />} />
      <Route path="/cosmetic-dermatology-laser-treatments/fractional-co2-laser" element={<Navigate to="/skin-care/laser-treatments/fractional-co2-laser" replace />} />
      <Route path="/fractional-co2-laser" element={<Navigate to="/skin-care/laser-treatments/fractional-co2-laser" replace />} />

      {/* ─── HAIR CARE HIERARCHICAL ROUTES ─── */}
      <Route path="/hair-care/growth-factor-therapy/gfc-hair" element={<GfcHairPage />} />
      <Route path="/hair-care/growth-factor-therapy/gfc-hair/" element={<GfcHairPage />} />
      <Route path="/hair-care/growth-factor-therapy/gfc-growth-factor-concentrate" element={<GfcHairPage />} />
      <Route path="/hair-restoration-treatments/gfc-growth-factor-concentrate" element={<Navigate to="/hair-care/growth-factor-therapy/gfc-hair" replace />} />
      <Route path="/gfc-hair" element={<Navigate to="/hair-care/growth-factor-therapy/gfc-hair" replace />} />

      <Route path="/hair-care/hair-transplant/fue-hair-transplant" element={<HairTransplantPage />} />
      <Route path="/hair-care/hair-transplant/fue-hair-transplant/" element={<HairTransplantPage />} />
      <Route path="/hair-care/hair-transplant/hair-transplant" element={<HairTransplantPage />} />
      <Route path="/hair-restoration-treatments/hair-transplant" element={<Navigate to="/hair-care/hair-transplant/fue-hair-transplant" replace />} />
      <Route path="/hair-transplant" element={<Navigate to="/hair-care/hair-transplant/fue-hair-transplant" replace />} />

      {/* ─── BODY CONTOURING HIERARCHICAL ROUTES ─── */}
      <Route path="/body-contouring/cryo-sculpting/cool-sculpting" element={<CryoSculptingPage />} />
      <Route path="/body-contouring/cryo-sculpting/cool-sculpting/" element={<CryoSculptingPage />} />
      <Route path="/body-contouring/cryo-sculpting/cryo-cool-sculpting" element={<CryoSculptingPage />} />
      <Route path="/body-contouring-wellness/cryo-cool-sculpting" element={<Navigate to="/body-contouring/cryo-sculpting/cool-sculpting" replace />} />
      <Route path="/cosmetic-dermatology-laser-treatments/cryo-cool-sculpting" element={<Navigate to="/body-contouring/cryo-sculpting/cool-sculpting" replace />} />
      <Route path="/cryo-sculpting" element={<Navigate to="/body-contouring/cryo-sculpting/cool-sculpting" replace />} />

      {/* Dynamic Departmental Category Routes */}
      <Route path="/dental-care/:subcategory/:id" element={<TreatmentDetailPage />} />
      <Route path="/skin-care/:subcategory/:id" element={<TreatmentDetailPage />} />
      <Route path="/hair-care/:subcategory/:id" element={<TreatmentDetailPage />} />
      <Route path="/body-contouring/:subcategory/:id" element={<TreatmentDetailPage />} />
      <Route path="/cosmetic-care/:subcategory/:id" element={<TreatmentDetailPage />} />

      {/* Generic Catalog Routes */}
      <Route path="/treatments/:id" element={<TreatmentDetailPage />} />
      <Route path="/treatments/:id/" element={<TreatmentDetailPage />} />
      <Route path="/services" element={<Navigate to="/treatments" replace />} />
      <Route path="/services/:id" element={<TreatmentDetailPage />} />
      <Route path="/services/:id/" element={<TreatmentDetailPage />} />

      <Route path="/leadership/dr-a-bladbin-chairman-founder" element={<DrBladbinPage />} />
      <Route path="/leadership/dr-c-binila-bladbin-managing-director" element={<DrBinilaPage />} />
      <Route path="/leadership/dr-a-prabin-chief-executive-officer" element={<DrPrabinPage />} />

      {/* Dedicated Transformations Pages */}
      <Route path="/smile-transformations" element={<SmileTransformationsPage />} />
      <Route path="/transformations/smile" element={<Navigate to="/smile-transformations" replace />} />

      <Route path="/cosmetic-resurfacing" element={<CosmeticResurfacingPage />} />
      <Route path="/transformations/cosmetic-resurfacing" element={<Navigate to="/cosmetic-resurfacing" replace />} />
      <Route path="/transformations/skin" element={<Navigate to="/cosmetic-resurfacing" replace />} />

      <Route path="/hair-regrowth-results" element={<HairRegrowthResultsPage />} />
      <Route path="/transformations/hair-regrowth" element={<Navigate to="/hair-regrowth-results" replace />} />
      <Route path="/transformations/hair" element={<Navigate to="/hair-regrowth-results" replace />} />

      <Route path="/body-contouring-cases" element={<BodyContouringCasesPage />} />
      <Route path="/transformations/body-contouring" element={<Navigate to="/body-contouring-cases" replace />} />
      <Route path="/transformations/body" element={<Navigate to="/body-contouring-cases" replace />} />

      <Route path="/smile-stories" element={<SmileStoriesPage />} />
      <Route path="/transformations" element={<Navigate to="/smile-transformations" replace />} />
      <Route path="/before-after" element={<Navigate to="/smile-transformations" replace />} />
      <Route path="/gallery" element={<Navigate to="/smile-transformations" replace />} />
      <Route path="/camps" element={<DentalCampsPage />} />
      <Route path="/dental-camps" element={<DentalCampsPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/video-testimonials" element={<VideoTestimonialsPage />} />
      <Route path="/blog" element={<BlogsPage />} />
      <Route path="/blog/:slug" element={<BlogDetailsPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/meet-our-team" element={<TeamPage />} />
      <Route path="/team" element={<Navigate to="/meet-our-team" replace />} />
      <Route path="/staff-profiles" element={<AdminStaffProfiles standalone={true} />} />
      <Route path="/staff" element={<Navigate to="/staff-profiles" replace />} />
      <Route path="/editorial-standards" element={<EditorialStandardsPage />} />
      <Route path="/clinical-editorial-standards" element={<Navigate to="/editorial-standards" replace />} />
      <Route path="/medical-editorial-policy" element={<Navigate to="/editorial-standards" replace />} />
      <Route path="/editorial-policy" element={<Navigate to="/editorial-standards" replace />} />
      <Route path="/terms-conditions" element={<TermsConditionsPage />} />
      <Route path="/terms-of-use" element={<Navigate to="/terms-conditions" replace />} />
      <Route path="/terms" element={<Navigate to="/terms-conditions" replace />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

