import React, { useState } from 'react';
import { Calendar, Clock, Users, Shield, Activity, CheckCircle, Menu, X, ArrowRight, Stethoscope, Building2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ClinicLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Easy Appointment Booking",
      description: "Book appointments with your preferred doctor in just a few clicks. View real-time availability."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-Specialty Care",
      description: "Access to General Physicians, Orthopedics, ENT specialists, Dentists, and more."
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Digital Case History",
      description: "Your complete medical history stored digitally for easy access anytime, anywhere."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your medical records are encrypted and protected with enterprise-grade security."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Smart Scheduling",
      description: "Intelligent scheduling system prevents double bookings and optimizes your time."
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Doctor Dashboard",
      description: "Doctors can manage schedules, view patient details, and record consultation notes."
    }
  ];

  const specialties = [
    "General Physician",
    "Orthopedic",
    "ENT Specialist",
    "Dentist",
    "Cardiologist",
    "Dermatologist"
  ];

  const stats = [
    { number: "4", label: "Consultation Rooms" },
    { number: "10+", label: "Specialist Doctors" },
    { number: "1000+", label: "Happy Patients" },
    { number: "24/7", label: "Support Available" }
  ];



let navigate = useNavigate()



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                HealthCare Clinic
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
              <a href="#specialties" className="text-gray-700 hover:text-blue-600 transition">Specialties</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition">About</a>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3">
              <a href="#features" className="block text-gray-700 hover:text-blue-600 transition">Features</a>
              <a href="#specialties" className="block text-gray-700 hover:text-blue-600 transition">Specialties</a>
              <a href="#about" className="block text-gray-700 hover:text-blue-600 transition">About</a>
              <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              Digital Healthcare Management
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Your Health,
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Simplified</span>
            </h1>
            <p className="text-xl text-gray-600">
              Book appointments, manage your health records, and connect with specialist doctors all in one place. Experience healthcare the modern way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button  onClick={()=>navigate("/AllDoctorsPage")}   className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2 text-lg font-semibold shadow-lg hover:shadow-xl">
                <span>Book Appointment</span>
                <Calendar className="w-5 h-5" />
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition text-lg font-semibold">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition duration-300">
              <div className="bg-white rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-semibold">Clinic Hours</span>
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">10:00 AM - 8:00 PM</div>
                <div className="text-gray-600">Open Every Day</div>
                <div className="border-t pt-4 space-y-2">
                  {['Dr. Ahmed Khan - Orthopedic', 'Dr. Sarah Ali - General Physician', 'Dr. Hassan Raza - ENT'].map((doc, i) => (
                    <div key={i} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience modern healthcare management with features designed for your convenience
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group hover:-translate-y-2 duration-300"
            >
              <div className="text-blue-600 mb-4 group-hover:scale-110 transition">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specialties Section */}
      <section id="specialties" className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Specialties</h2>
            <p className="text-xl text-gray-600">
              Expert doctors across multiple medical specializations
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {specialties.map((specialty, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-between group cursor-pointer"
              >
                <span className="text-gray-800 font-semibold">{specialty}</span>
                <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-2 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust us with their healthcare. Book your appointment today and experience the difference.
          </p>
          <button onClick={()=>navigate("/AllDoctorsPage")}  className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition text-lg font-semibold shadow-lg inline-flex items-center space-x-2">
            <span>Book Your Appointment</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold text-white">HealthCare Clinic</span>
              </div>
              <p className="text-sm">Modern healthcare management for a healthier tomorrow.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Services</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Doctors</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Karachi, Pakistan</li>
                <li>Phone: +92 300 1234567</li>
                <li>Email: info@healthcareclinic.pk</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 HealthCare Clinic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}