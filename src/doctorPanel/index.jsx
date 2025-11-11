import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  FileText,
  CheckCircle,
  XCircle,
  Bell,
  LogOut,
  Menu,
  Activity,
  Users,
  ClipboardList,
} from 'lucide-react';
import axios from 'axios';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [doctorInfo, setDoctorInfo] = useState({});

  const doctorId = localStorage.getItem("userId");

  const getDoctor = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/getSingleDoctor",
        { id: doctorId }
      );
      console.log(response.data.data);
      setDoctorInfo(response.data.data || {});
    } catch (err) {
      console.error("Error fetching doctor:", err);
      setDoctorInfo({});
    }
  };

  const getAppointments = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/getAllAppointments');
      console.log('Appointments fetched:', response.data.data);
      setAppointments(response.data.data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
    getDoctor();
  }, []);

  const stats = [
    { label: "Today's Patients", value: '8', icon: Users, color: 'bg-blue-500' },
    { label: 'Checked In', value: '1', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Completed', value: '1', icon: ClipboardList, color: 'bg-purple-500' },
    { label: 'Pending', value: '6', icon: Clock, color: 'bg-orange-500' },
  ];

  const notifications = [
    { id: 1, message: 'New appointment scheduled for 2:00 PM', time: '5 mins ago' },
    { id: 2, message: 'Patient John Doe has checked in', time: '10 mins ago' },
    { id: 3, message: 'Lab results available for Emily Smith', time: '1 hour ago' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'checked-in':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-purple-100 text-purple-700';
      case 'booked':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddNotes = (appointment) => {
    setSelectedPatient(appointment);
  };

  const handleSaveNotes = () => {
    alert('Notes saved successfully!');
    setSelectedPatient(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Menu className="w-6 h-6 text-gray-600 cursor-pointer" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {doctorInfo?.name || 'Loading...'}
              </h1>
              <p className="text-sm text-gray-500">{doctorInfo.specialization || 'Specialty not set'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right mr-4">
              <p className="text-sm font-medium text-gray-700">{doctorInfo?.roomNumber || 'Room N/A'}</p>
              <p className="text-xs text-gray-500">{doctorInfo?.shift || 'Shift N/A'}</p>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-full"
              >
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="p-4 border-b border-gray-100 hover:bg-gray-50"
                      >
                        <p className="text-sm text-gray-800">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-full">
              <LogOut className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Appointment Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('today')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'today'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Today's Schedule
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Patient History
              </button>
            </nav>
          </div>

          {/* Appointment List */}
          <div className="p-6">
            {loading ? (
              <div className="text-center py-10 text-gray-500">Loading appointments...</div>
            ) : activeTab === 'today' ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Today's Appointments</h2>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Tuesday, November 11, 2025
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {appointments.length > 0 ? (
                    appointments.map((appointment, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="bg-blue-100 p-3 rounded-full">
                              <User className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-800">
                                  {appointment.patientName}
                                </h3>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    appointment.status
                                  )}`}
                                >
                                  {appointment.status?.replace('-', ' ').toUpperCase()}
                                </span>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock className="w-4 h-4 mr-2" />
                                  {appointment.time}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Activity className="w-4 h-4 mr-2" />
                                  Age: {appointment.age} years
                                </div>
                                <p className="text-sm text-gray-700 mt-2">
                                  <span className="font-medium">Reason:</span> {appointment.reason}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{appointment.history}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2 ml-4">
                            <button
                              onClick={() => handleAddNotes(appointment)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                            >
                              <FileText className="w-4 h-4 inline mr-1" />
                              Add Notes
                            </button>

                            {appointment.status === 'booked' && (
                              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
                                <CheckCircle className="w-4 h-4 inline mr-1" />
                                Check In
                              </button>
                            )}

                            {appointment.status === 'checked-in' && (
                              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
                                Complete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-10">
                      No appointments found.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Select a patient from today's schedule to view their complete medical history
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

   
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">Add Consultation Notes</h2>
              <p className="text-sm text-gray-600 mt-1">
                Patient: {selectedPatient.patientName}
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diagnosis / Observations
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder="Enter diagnosis and observations..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prescription
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter prescription details..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Follow-up Instructions
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="2"
                  placeholder="Enter follow-up instructions..."
                ></textarea>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedPatient(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save & Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
