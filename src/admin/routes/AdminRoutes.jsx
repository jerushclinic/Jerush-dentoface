import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import AdminLayout from '../layouts/AdminLayout';
import AdminLoginPage from '../pages/AdminLoginPage';
import Dashboard from '../pages/Dashboard';
import AdminDoctors from '../pages/AdminDoctors';
import AdminTreatments from '../pages/AdminTreatments';
import AdminBlogs from '../pages/AdminBlogs';
import BlogFormPage from '../pages/BlogFormPage';
import AdminReviews from '../pages/AdminReviews';
import AdminGallery from '../pages/AdminGallery';
import AdminSettings from '../pages/AdminSettings';
import AdminCareers from '../pages/AdminCareers';
import AdminTeam from '../pages/AdminTeam';
import AdminEvents from '../pages/AdminEvents';
import AdminCamps from '../pages/AdminCamps';
import AdminMarquee from '../pages/AdminMarquee';
import AdminStaffProfiles from '../pages/AdminStaffProfiles';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="marquee" element={<AdminMarquee />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="camps" element={<AdminCamps />} />
        <Route path="staff-profiles" element={<AdminStaffProfiles />} />
        <Route path="staff" element={<Navigate to="/admin/staff-profiles" replace />} />
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="treatments" element={<AdminTreatments />} />
        <Route path="blog" element={<AdminBlogs />} />
        <Route path="blog/new" element={<BlogFormPage />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="highlights" element={<Navigate to="/admin/events" replace />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="careers" element={<AdminCareers />} />
        <Route path="team" element={<AdminTeam />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
