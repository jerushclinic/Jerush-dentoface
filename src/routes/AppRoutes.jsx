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
      <Route path="/treatments/metal-braces" element={<MetalBracesPage />} />
      <Route path="/dental-treatments/best-metal-orthodontic-braces" element={<MetalBracesPage />} />
      <Route path="/dental-treatments/best-metal-orthodontic-braces/" element={<MetalBracesPage />} />
      <Route path="/dental-treatments/metal-braces" element={<MetalBracesPage />} />
      <Route path="/metal-braces" element={<MetalBracesPage />} />
      <Route path="/treatments/clear-aligners" element={<Navigate to="/dental-treatments/top-quality-invisible-clear-aligners-jerushaligne" replace />} />
      <Route path="/dental-treatments/top-quality-invisible-clear-aligners-jerushaligne" element={<JerushalignePage />} />
      <Route path="/dental-treatments/top-quality-invisible-clear-aligners-jerushaligne/" element={<JerushalignePage />} />
      <Route path="/treatments/top-quality-invisible-clear-aligners-jerushaligne" element={<JerushalignePage />} />
      <Route path="/top-quality-invisible-clear-aligners-jerushaligne" element={<JerushalignePage />} />
      <Route path="/top-quality-invisible-clear-aligners-jerushaligne/" element={<JerushalignePage />} />
      <Route path="/jerushaligne-clear-aligners" element={<JerushalignePage />} />
      <Route path="/jerushaligne" element={<JerushalignePage />} />
      <Route path="/clear-aligners" element={<JerushalignePage />} />
      <Route path="/treatments/dental-crowns-bridges" element={<CrownsBridgesPage />} />
      <Route path="/treatments/jacket-crowns" element={<CrownsBridgesPage />} />
      <Route path="/treatments/fixed-partial-denture" element={<CrownsBridgesPage />} />
      <Route path="/dental-crowns-bridges" element={<CrownsBridgesPage />} />
      <Route path="/best-crowns-and-bridges-treatment" element={<CrownsBridgesPage />} />
      <Route path="/dental-treatments/best-crowns-and-bridges-treatment" element={<CrownsBridgesPage />} />
      <Route path="/treatments/:id" element={<TreatmentDetailPage />} />
      <Route path="/treatments/:id/" element={<TreatmentDetailPage />} />
      <Route path="/services" element={<Navigate to="/treatments" replace />} />
      <Route path="/services/:id" element={<TreatmentDetailPage />} />
      <Route path="/services/:id/" element={<TreatmentDetailPage />} />
      <Route path="/dental-implants" element={<DentalImplantsPage />} />
      <Route path="/dental-treatments/dental-implants-in-chennai" element={<Navigate to="/dental-implants" replace />} />
      <Route path="/dental-treatments/root-canal-treatment-in-tamilnadu" element={<RootCanalTreatmentPage />} />
      <Route path="/dental-treatments/oral-pathology-screening" element={<OralPathologyPage />} />
      <Route path="/cosmetic-dermatology-laser-treatments/fractional-co2-laser" element={<FractionalCo2LaserPage />} />
      <Route path="/hair-restoration-treatments/gfc-growth-factor-concentrate" element={<GfcHairPage />} />
      <Route path="/body-contouring-wellness/cryo-cool-sculpting" element={<CryoSculptingPage />} />
      <Route path="/cosmetic-dermatology-laser-treatments/cryo-cool-sculpting" element={<CryoSculptingPage />} />
      <Route path="/hair-restoration-treatments/hair-transplant" element={<HairTransplantPage />} />

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

