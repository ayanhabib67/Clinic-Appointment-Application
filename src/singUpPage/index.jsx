import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Building2, ArrowRight, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    if (field === 'name') setName(value);
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    else if (name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters';

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signUp = async () => {
    try {
      setIsSubmitting(true);

      const payload = {
        name,
        email,
        password,
        userId: email.split('@')[0],
        role: "patient"
      };

      const response = await axios.post("http://localhost:5000/api/signup", payload);

      console.log('Signup successful:', response.data);
      alert('Account created successfully! Welcome to HealthCare Clinic!');
      setName('');
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) signUp();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left info panel */}
        <div className="hidden md:block space-y-6">
          <div className="flex items-center space-x-3">
            <Building2 className="w-12 h-12 text-blue-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              HealthCare Clinic
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Join Our Healthcare Community
          </h1>
          <p className="text-xl text-gray-600">
            Create your account and get access to expert medical care, easy appointment booking, and digital health records.
          </p>
          <div className="space-y-4 pt-4">
            {[
              'Book appointments with specialist doctors',
              'Access your medical history anytime',
              'Get personalized healthcare recommendations',
              'Secure and private health data'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Signup panel */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Fill in your details to get started</p>
          </div>

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                />
              </div>
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Create a strong password"
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" /> : <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              <p className="mt-2 text-xs text-gray-500">Must be at least 6 characters long</p>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <span>Creating Account...</span> : <> <span>Sign Up</span> <ArrowRight className="w-5 h-5" /> </>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
