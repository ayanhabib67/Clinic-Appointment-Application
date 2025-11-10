import React, { useEffect, useState } from 'react';
import { 
  Calendar, Clock, User, FileText, Plus, History, LogOut, Bell, Settings, 
  Activity, Stethoscope, CalendarCheck, X 
} from 'lucide-react';
import axios from 'axios';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [userData, setUserData] = useState({});
  const [appointments, setAppointments] = useState([]);

  
  const getPatientDetail = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return console.log("No userId found in localStorage");

      const response = await axios.post(
        "http://localhost:5000/api/getRegisteredUsers",
        { userId } 
      );

      setUserData(response.data.data);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  
  const getPatientAppointments = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return console.log("No userId found in localStorage");

      const response = await axios.post(
        "http://localhost:5000/api/getAppointment",
        { userId }
      );

      if (response.data && response.data.data) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching patient appointments:", error);
    }
  };

  useEffect(() => {
    getPatientDetail();
    getPatientAppointments();
  }, []);

 
  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Clinic Portal</h1>
                <p className="text-sm text-gray-500">Patient Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
              <button className="flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome back, {userData.name}!</h2>
            </div>
            <button
              onClick={() => setShowBookingModal(true)}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-50 transition"
            >
              <Plus className="w-5 h-5" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <CalendarCheck className="w-4 h-4" />
                  <span>Overview</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === 'appointments'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Appointments</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === 'history'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <History className="w-4 h-4" />
                  <span>Medical History</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

       
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Upcoming Appointments</p>
                  <p className="text-3xl font-bold text-gray-900">{appointments.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Total Visits</p>
                  <p className="text-3xl font-bold text-gray-900">{appointments.length}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Next Appointment</p>
                  <p className="text-lg font-bold text-gray-900">
                    {appointments[0]?.appointmentDate || "N/A"}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

          
            <div className="lg:col-span-2 bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-bold text-gray-900">Upcoming Appointments</h3>
              </div>
              <div className="p-6 space-y-4">
                {appointments.map((apt) => (
                  <div key={apt._id || apt.id} className="border rounded-lg p-4 hover:border-blue-300 transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{apt.doctorName}</h4>
                        <p className="text-sm text-gray-600">{apt.doctorSpecialization}</p>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        apt.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{apt.appointmentDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{apt.timeSlot}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>📍 {apt.address}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

       
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">All Appointments</h3>
              <button
                onClick={() => setShowBookingModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Appointment</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              {appointments.map((apt) => (
                <div key={apt._id || apt.id} className="border rounded-lg p-6 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{apt.doctorName}</h4>
                        <p className="text-gray-600">{apt.doctorSpecialization}</p>
                      </div>
                    </div>
                    <span className={`bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full`}>
                      {apt.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Date</p>
                      <p className="font-semibold">{apt.appointmentDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Time</p>
                      <p className="font-semibold">{apt.timeSlot}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Location</p>
                      <p className="font-semibold">{apt.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

    
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold text-gray-900">Medical History</h3>
              <p className="text-sm text-gray-600 mt-1">Complete record of your visits and consultations</p>
            </div>
            <div className="p-6 space-y-6">
              {appointments.map((record) => (
                <div key={record._id || record.id} className="border-l-4 border-blue-600 bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{record.disease}</h4>
                      <p className="text-sm text-gray-600">{record.doctorName} - {record.doctorSpecialization}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{record.appointmentDate}</p>
                      <span className="inline-block mt-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        {record.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Symptoms:</p>
                      <p className="text-gray-600 text-sm">{record.symptoms}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Notes:</p>
                      <p className="text-gray-600 text-sm">{record.additionalNotes}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>Download Medical Report</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

 
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-900">Book New Appointment</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
           
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Specialty</label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => { setSelectedSpecialty(e.target.value); setSelectedDoctor(''); }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a specialty...</option>
                  {specialties.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

             
              {selectedSpecialty && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Doctor</label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a doctor...</option>
                    {doctors[selectedSpecialty]?.map(doc => (
                      <option key={doc.name} value={doc.name}>{doc.name}</option>
                    ))}
                  </select>
                </div>
              )}

            
              {selectedDoctor && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

      
              {selectedDate && selectedDoctor && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a time slot...</option>
                    {doctors[selectedSpecialty].find(doc => doc.name === selectedDoctor)?.slots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={handleBookAppointment}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
