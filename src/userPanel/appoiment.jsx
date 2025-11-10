import React, { useEffect, useState } from "react";
import {
  Calendar,
  User,
  Stethoscope,
  FileText,
  Activity,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const Section = ({ title, icon, children }) => (
  <div className="border-t pt-8">
    <div className="flex items-center mb-6">
      {icon}
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
    <div className="grid md:grid-cols-2 gap-5">{children}</div>
  </div>
);
function timeToMinutes(time) {
  var parts = time.split(":");
  var hours = parseInt(parts[0]);
  var minutes = parseInt(parts[1]);
  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes) {
  var hours = Math.floor(totalMinutes / 60);
  var minutes = totalMinutes % 60;
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  return hours + ":" + minutes;
}

function splitTimeSlot(slot, parts) {
  if (!parts) parts = 5; // default 5 parts

  var times = slot.split("to");
  var start = times[0].trim();
  var end = times[1].trim();

  var startParts = start.split(":");
  var endParts = end.split(":");

  var startH = parseInt(startParts[0]);
  var startM = parseInt(startParts[1]);
  var endH = parseInt(endParts[0]);
  var endM = parseInt(endParts[1]);

  if (endH < startH) endH += 12; // handle if time crosses noon

  var startMinutes = startH * 60 + startM;
  var endMinutes = endH * 60 + endM;
  var interval = (endMinutes - startMinutes) / parts;

  var result = [];
  for (var i = 0; i < parts; i++) {
    var slotStart = minutesToTime(Math.round(startMinutes + i * interval));
    var slotEnd = minutesToTime(Math.round(startMinutes + (i + 1) * interval));
    result.push(slotStart + " - " + slotEnd);
  }

  return result;
}


export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    disease: "",
    symptoms: "",
    bloodGroup: "",
    allergies: "",
    currentMedications: "",
    previousIllness: "",
    appointmentDate: "",
    timeSlot: "",
    appointmentType: "first-visit",
    additionalNotes: "",
  });

  const [timeSlots, setTimeSlots] = useState([]);
  const [singleDoctor, setSingleDoctor] = useState(null);
  const [isDateLocked, setIsDateLocked] = useState(false);
  const param = useParams();
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const getSingleDoctor = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/getSingleDoctor",
          { id: param.id }
        );

        if (response.data.status) {
          const doctorData = response.data.data;
          setSingleDoctor(doctorData);

          let slots = doctorData.timeslots;
          if (typeof slots === "string") {
            slots = slots.split(",").map((s) => s.trim());
          }

          const dividedSlots = slots.flatMap((slot) => splitTimeSlot(slot, 5));
          setTimeSlots(dividedSlots);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getSingleDoctor();
  }, [param.id]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "appointmentDate" && singleDoctor) {
      const availableDays = singleDoctor.availability
        .split(",")
        .map((day) => day.trim().toLowerCase());

      const selectedDate = new Date(value);
      const dayName = selectedDate
        .toLocaleDateString("en-US", { weekday: "short" })
        .toLowerCase();

      const mapDays = {
        sun: "sun",
        mon: "mon",
        tue: "tues",
        wed: "wed",
        thu: "thurs",
        fri: "fri",
        sat: "sat",
      };

      if (!availableDays.some((d) => d.startsWith(mapDays[dayName]))) {
        alert(`Doctor is not available on ${dayName.toUpperCase()}`);
        setFormData({ ...formData, [name]: "" });
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };


  let navigate = useNavigate()

 
  const createUserAppointment = async () => {
    const requiredFields = [
      "patientName",
      "email",
      "phone",
      "age",
      "gender",
      "address",
      "disease",
      "appointmentDate",
      "timeSlot",
    ];
  
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in ${field}`);
        return;
      }
    }
  
    // Get logged-in user ID from localStorage (no JSON.parse needed)
    const userId = localStorage.getItem("userId");
  
    if (!userId) {
      alert("User not logged in!");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/CreateAppointment", {
        userId, // include userId here
        doctorId: singleDoctor._id,
        doctorName: singleDoctor.name,
        doctorEmail: singleDoctor.email,
        doctorPhone: singleDoctor.phone || "",
        doctorSpecialization: singleDoctor.specialization,
        patientName: formData.patientName,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        gender: formData.gender,
        address: formData.address,
        disease: formData.disease,
        symptoms: formData.symptoms,
        bloodGroup: formData.bloodGroup,
        allergies: formData.allergies,
        currentMedications: formData.currentMedications,
        previousIllness: formData.previousIllness,
        specialization: singleDoctor.specialization,
        appointmentDate: formData.appointmentDate,
        timeSlot: formData.timeSlot,
        appointmentType: formData.appointmentType,
        additionalNotes: formData.additionalNotes,
      });
  
      alert("Appointment successfully created!");
      console.log(response.data);
  
      setFormData({
        patientName: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        address: "",
        disease: "",
        symptoms: "",
        bloodGroup: "",
        allergies: "",
        currentMedications: "",
        previousIllness: "",
        appointmentDate: "",
        timeSlot: "",
        appointmentType: "first-visit",
        additionalNotes: "",
      });
      setIsDateLocked(false);
  
      navigate("/PatientDashboard");
    } catch (error) {
      console.error(error.response?.data || error);
      alert("Failed to create appointment. Check console for details.");
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Book Appointment
          </h1>
          <p className="text-gray-600">
            Fill in the details below to schedule your consultation
          </p>
        </div>

        {/* Doctor Info */}
        {singleDoctor ? (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <div className="flex items-center mb-4">
              <Stethoscope className="w-7 h-7 text-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">
                Doctor Information
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-800">{singleDoctor.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Specialization</p>
                <p className="font-semibold text-gray-800">
                  {singleDoctor.specialization}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-800">{singleDoctor.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-800">{singleDoctor.email}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Original Timeslots</p>
                <p className="font-semibold text-gray-800">
                  {singleDoctor.timeslots}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-10">
            Loading doctor info...
          </p>
        )}

        {/* Appointment Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createUserAppointment();
          }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-8"
        >
          {/* Personal Info */}
          <Section
            title="Personal Information"
            icon={<User className="w-7 h-7 text-blue-500 mr-3" />}
          >
            <input
              type="text"
              name="patientName"
              placeholder="Full Name"
              value={formData.patientName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg md:col-span-2"
            />
          </Section>

          {/* Medical Info */}
          <Section
            title="Medical Information"
            icon={<Activity className="w-7 h-7 text-red-500 mr-3" />}
          >
            <input
              type="text"
              name="disease"
              placeholder="Disease/Chief Complaint"
              value={formData.disease}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="symptoms"
              placeholder="Symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="allergies"
              placeholder="Allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="currentMedications"
              placeholder="Current Medications"
              value={formData.currentMedications}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="previousIllness"
              placeholder="Previous Illness/Medical History"
              value={formData.previousIllness}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg md:col-span-2"
            />
          </Section>

          {/* Appointment Details */}
          <Section
            title="Appointment Details"
            icon={<Calendar className="w-7 h-7 text-green-500 mr-3" />}
          >
            <select
              name="appointmentType"
              value={formData.appointmentType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            >
              <option value="first-visit">First Visit</option>
              <option value="follow-up">Follow Up</option>
            </select>

            <input
              type="text"
              readOnly
              value={singleDoctor?.specialization || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
              placeholder="Doctor Specialization"
            />
            <input
              type="text"
              readOnly
              value={singleDoctor?.name || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
              placeholder="Doctor Name"
            />

            {/* Date Field */}
            <div className="flex flex-col">
              <input
                type="date"
                min={today}
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                disabled={isDateLocked}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                  isDateLocked ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />

              {isDateLocked && (
                <button
                  type="button"
                  onClick={() => {
                    setIsDateLocked(false);
                    setFormData({ ...formData, timeSlot: "" });
                  }}
                  className="text-blue-600 underline text-sm mt-2"
                >
                  Change Date
                </button>
              )}
            </div>

            {/* Time Slots */}
            <div className="md:col-span-2 flex flex-wrap gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => {
                    if (!formData.appointmentDate) {
                      alert("Please select appointment date first.");
                      return;
                    }
                    setFormData({ ...formData, timeSlot: slot });
                    setIsDateLocked(true);
                  }}
                  className={`px-4 py-2 rounded-lg border ${
                    formData.timeSlot === slot
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </Section>

          {/* Additional Notes */}
          <Section
            title="Additional Notes"
            icon={<FileText className="w-7 h-7 text-purple-500 mr-3" />}
          >
            <textarea
              name="additionalNotes"
              placeholder="Any additional information..."
              rows="3"
              value={formData.additionalNotes}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg md:col-span-2"
            />
          </Section>

          <div className="border-t pt-8">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
