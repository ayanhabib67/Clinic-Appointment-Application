import React, { useState, useEffect } from 'react';
import { Search, Filter, User, Clock, Calendar, Star, MapPin, Phone, Mail, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllDoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [loading, setLoading] = useState(false);

  const specialties = [
    'All',
    'General Physician',
    'Orthopedic',
    'ENT',
    'Dentist',
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Neurologist'
  ];

  const navigate = useNavigate();


  const getDoctor = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/getDoctor');
      console.log('Doctors:', response.data.data);
      setDoctors(response.data.data);
      setFilteredDoctors(response.data.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);


  

  useEffect(() => {
    let filtered = doctors;
  
    if (selectedSpecialty !== 'All') {
      filtered = filtered.filter(doc => doc.specialty === selectedSpecialty);
    }
  
    if (searchQuery) {
      filtered = filtered.filter(doc =>
        doc.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialization?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    setFilteredDoctors(filtered);
  }, [searchQuery, selectedSpecialty, doctors]);
  

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Our Doctors</h1>
          <p className="text-gray-600 mt-1">
            Find and book appointments with our experienced medical professionals
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
           
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

         
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>

         
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredDoctors.length}</span> doctors
              {selectedSpecialty !== 'All' && (
                <span> in <span className="font-semibold text-blue-600">{selectedSpecialty}</span></span>
              )}
            </p>
          </div>
        </div>

      
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500"></div>
            <p className="text-gray-600 mt-4">Loading doctors...</p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div key={doctor._id} className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden">
            
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                      {doctor.name ? doctor.name.split(' ').map(n => n[0]).join('') : '?'}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{doctor.name}</h3>
                      <p className="text-blue-100 text-sm">{doctor.specialization}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                  
                  </div>
                </div>

                
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 uppercase font-semibold">Qualification</p>
                      <p className="text-sm text-gray-900 font-medium">{doctor.qualification || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 uppercase font-semibold">Experience</p>
                      <p className="text-sm text-gray-900 font-medium">{doctor.Experience || 'Not available'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 uppercase font-semibold">Schedule</p>
                      <p className="text-sm text-gray-900">{doctor.availability || 'Not mentioned'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 uppercase font-semibold">Consultation Room</p>
                      <p className="text-sm text-gray-900 font-medium">{doctor.roomNumber || 'Not assigned'}</p>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 space-y-2">
                 


<button
  onClick={() => navigate(`/AppointmentPage/${doctor._id}`)}
  className="w-full px-4 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
>
  Book Appointment
</button>

                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      <Phone className="w-4 h-4" />
                      Call
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                      <Mail className="w-4 h-4" />
                      Email
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDoctorsPage;
