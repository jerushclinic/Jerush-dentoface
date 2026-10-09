import React, { useState, useEffect } from 'react';
import { doctorService } from '../services/doctorService';
import { Search } from 'lucide-react';
import PageBreadcrumbHero from '../components/common/PageBreadcrumbHero';
import DoctorProfileModal from '../components/common/DoctorProfileModal';
import DoctorCard from '../components/common/DoctorCard';

export default function DoctorsPage() {
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const data = await doctorService.getDoctors();
        setDoctorsList(data);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();

    const handleUpdated = (e) => {
      if (e.detail && Array.isArray(e.detail) && e.detail.length > 0) {
        setDoctorsList(e.detail);
      }
    };
    window.addEventListener('jerush_doctors_updated', handleUpdated);
    return () => window.removeEventListener('jerush_doctors_updated', handleUpdated);
  }, []);



  const filteredDoctors = doctorsList.filter((doc) => {
    const query = searchQuery.toLowerCase();
    return (
      doc.name.toLowerCase().includes(query) ||
      doc.role.toLowerCase().includes(query) ||
      doc.qualification.toLowerCase().includes(query) ||
      doc.specialties.some(spec => spec.toLowerCase().includes(query))
    );
  });

  return (
    <div className="w-full bg-slate-50 font-body text-left relative pt-0 pb-24 min-h-screen">
      {/* Page Header */}
      <PageBreadcrumbHero 
        title="Our Specialists" 
        breadcrumbs={[{ label: 'Doctors', active: true }]} 
      />

      <div className="jerush-container pt-12">
        {/* Search Bar */}
        <div className="flex justify-end mb-10">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search specialists by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 text-slate-800 rounded-xl placeholder-slate-400 focus:outline-none focus:border-brandSky transition-colors text-sm shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredDoctors.map((doc) => (
              <DoctorCard
                key={doc.id}
                doctor={doc}
                onClick={() => setSelectedDoctor(doc)}
                className="w-full max-w-[300px] sm:max-w-none mx-auto"
              />
            ))}
          </div>
        )}

        {filteredDoctors.length === 0 && !loading && (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-2xl">
            <p className="text-slate-500 font-headline font-bold text-lg">No specialists found.</p>
            <p className="text-slate-400 text-xs mt-1">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <DoctorProfileModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}
