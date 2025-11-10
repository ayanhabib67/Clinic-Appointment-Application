import React, { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  Clock,
  BedDouble,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import axios from "axios";

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [doctors, setDoctors] = useState([]);
  const [docterLength, setDocterLength] = useState(0);

  // New doctor states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [about, setAbout] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [timeslots, setTimeslots] = useState([]);
  const [availability, setAvailability] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [experience, setExperience] = useState("");
  const [qualification, setQualification] = useState("");
  const [doctorId, setDoctorId] = useState("");

  // Stats
  const stats = [
    {
      label: "Today's Appointments",
      value: "24",
      icon: Calendar,
      color: "bg-blue-500",
    },
    {
      label: "Active Doctors",
      value: docterLength,
      icon: Users,
      color: "bg-green-500",
    },
    {
      label: "Available Rooms",
      value: "2/4",
      icon: BedDouble,
      color: "bg-purple-500",
    },
    {
      label: "Pending Check-ins",
      value: "5",
      icon: Clock,
      color: "bg-orange-500",
    },
  ];

  const appointmentsData = [
    {
      patient: "Ahmed Khan",
      doctor: "Dr. Sarah Ali",
      specialty: "General Physician",
      time: "10:00 AM",
      room: "Room 1",
      status: "Booked",
    },
    {
      patient: "Fatima Noor",
      doctor: "Dr. Hassan Ahmed",
      specialty: "Orthopedic",
      time: "10:30 AM",
      room: "Room 2",
      status: "Checked-In",
    },
    {
      patient: "Ali Raza",
      doctor: "Dr. Sarah Ali",
      specialty: "General Physician",
      time: "11:00 AM",
      room: "Room 1",
      status: "Booked",
    },
    {
      patient: "Ayesha Malik",
      doctor: "Dr. Zainab Hussain",
      specialty: "ENT",
      time: "11:30 AM",
      room: "Room 3",
      status: "Completed",
    },
    {
      patient: "Bilal Ahmed",
      doctor: "Dr. Omar Farooq",
      specialty: "Dentist",
      time: "12:00 PM",
      room: "Room 4",
      status: "Booked",
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "booked":
        return "bg-blue-100 text-blue-800";
      case "checked-in":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDoctors = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/getStaff");
      const staffList = response.data.data;
      const doctors = staffList.filter((person) => person.role === "doctor");
      setDoctors(doctors);
      setDocterLength(doctors.length);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const addDoctor = async (e) => {
    e.preventDefault();
    try {
      const doctorData = {
        name,
        email,
        password,
        specialization,
        roomNumber,
        about,
        joiningDate,
        timeslots,
        availability,
        appointments,
        experience,
        qualification,
        doctorId,
        role: "doctor",
      };

      const response = await axios.post(
        "http://localhost:5000/api/addDoctor",
        doctorData
      );
      console.log("Doctor added successfully:", response.data);

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setSpecialization("");
      setRoomNumber("");
      setAbout("");
      setJoiningDate("");
      setTimeslots([]);
      setAvailability("");
      setAppointments([]);
      setExperience("");
      setQualification("");
      setDoctorId("");

      // Refresh doctor list
      getDoctors();
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Staff Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Multi-Specialty Clinic Management
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                Muhammad Hassan
              </p>
              <p className="text-xs text-gray-500">Clinic Staff</p>
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              MH
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {["overview", "rooms", "doctors", "addDoctor"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab === "overview"
                    ? "Appointments"
                    : tab === "rooms"
                    ? "Room Management"
                    : tab === "doctors"
                    ? "Doctor Schedules"
                    : "Add Doctor"}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Appointments Tab */}
            {activeTab === "overview" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Today's Appointments
                  </h2>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
                    + New Appointment
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          "Time",
                          "Patient",
                          "Doctor",
                          "Specialty",
                          "Room",
                          "Status",
                          "Actions",
                        ].map((header) => (
                          <th
                            key={header}
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {appointmentsData.map((apt, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {apt.time}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {apt.patient}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {apt.doctor}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {apt.specialty}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {apt.room}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                apt.status
                              )}`}
                            >
                              {apt.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                                <XCircle className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Doctor Schedules */}
            {activeTab === "doctors" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Doctor Schedules
                  </h2>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
                    + Assign Doctor
                  </button>
                </div>
                <div className="space-y-4">
                  {doctors.length === 0 ? (
                    <p className="text-gray-500 text-sm">No doctors found.</p>
                  ) : (
                    doctors.map((doctor, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold"></div>
                            <div>
                              <h3 className="text-base font-bold text-gray-900">
                                {doctor.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {doctor.specialization}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {doctor.patients || 0} patients today
                            </p>
                            <p className="text-xs text-gray-500">
                              Room Number :{doctor.roomNumber || "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>
                            {doctor.timeslots && doctor.timeslots.length > 0
                              ? doctor.timeslots.join(", ")
                              : "No schedule provided"}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Add Doctor Form */}
            {activeTab === "addDoctor" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Add New Doctor
                </h2>
                <form className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="doctor@clinic.com"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Minimum 6 characters"
                    />
                  </div>

                  {/* About */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      About *
                    </label>
                    <input
                      type="text"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="About"
                    />
                  </div>

                  {/* Specialty */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialty *
                    </label>
                    <select
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="">Select Specialty</option>
                      <option value="General Physician">General Physician</option>
                      <option value="Orthopedic">Orthopedic</option>
                      <option value="ENT">ENT Specialist</option>
                      <option value="Dentist">Dentist</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Pediatrician">Pediatrician</option>
                      <option value="Gynecologist">Gynecologist</option>
                      <option value="Neurologist">Neurologist</option>
                    </select>
                  </div>

                  {/* Room Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room Number *
                    </label>
                    <input
                      type="text"
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Room Number"
                    />
                  </div>

                  {/* Joining Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Joining Date *
                    </label>
                    <input
                      type="text"
                      value={joiningDate}
                      onChange={(e) => setJoiningDate(e.target.value)}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="22-Aug-2025"
                    />
                  </div>

                  {/* Timeslots */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeslots *
                    </label>
                    <input
                      type="text"
                      placeholder="12:00, 04:00"
                      value={timeslots.join(",")}
                      onChange={(e) => setTimeslots(e.target.value.split(","))}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Availability *
                    </label>
                    <input
                      type="text"
                      placeholder="Mon, Tues"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  {/* Appointments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Appointments *
                    </label>
                    <input
                      type="text"
                      placeholder="2,1"
                      value={appointments.join(",")}
                      onChange={(e) => setAppointments(e.target.value.split(","))}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience *
                    </label>
                    <input
                      type="text"
                      placeholder="10 Years"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  {/* Qualification */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Qualification *
                    </label>
                    <input
                      type="text"
                      placeholder="MBBS"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  {/* Doctor ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Doctor ID *
                    </label>
                    <input
                      type="text"
                      placeholder="Unique ID"
                      value={doctorId}
                      onChange={(e) => setDoctorId(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="md:col-span-2 flex gap-3 mt-4">
                    <button
                      type="submit"
                      onClick={addDoctor}
                      className="px-6 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      ✅ Add Doctor
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setName(""); setEmail(""); setPassword("");
                        setSpecialization(""); setRoomNumber(""); setAbout("");
                        setJoiningDate(""); setTimeslots([]); setAvailability("");
                        setAppointments([]); setExperience(""); setQualification("");
                        setDoctorId("");
                      }}
                      className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      🔄 Reset Form
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
