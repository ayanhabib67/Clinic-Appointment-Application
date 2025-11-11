import axios from 'axios'
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
let [email , setEmail] = useState("")
let [password , setPassword] = useState("")


    const loginApi = async () => {
        try {
          const body = {
            email: email  , 
            password: password,         
          };
      
          const response = await axios.post(
            "http://localhost:5000/api/adminlogin",
            body
          );
      
          console.log("Login Response:", response.data);


          if (response.data.status) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.userrole);
            localStorage.setItem("userId", response.data.userId);
      
            alert("Login Successful!");
      
          } else {
            alert(response.data.message);
          }


          let navigate = useNavigate()

          if (response.data.role === "admin") {
            navigate("/adminDashboard");
          } else if (response.data.role === "patient") {
            navigate("/patientDashboard");
          }
          



        } catch (error) {
          console.error("Login Error:", error.response?.data || error.message);
        }
      };
   



      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 p-4">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg grid md:grid-cols-2 overflow-hidden">
    
            {/* Left side with image */}
            <div className="bg-blue-600 text-white flex flex-col justify-center items-center p-8">
              <img
                src="https://img.freepik.com/free-photo/portrait-smiling-handsome-male-doctor-man_171337-5055.jpg"
                alt="Doctor"
                className="w-52 h-52 rounded-full object-cover mb-4 shadow-md"
              />
              <h2 className="text-2xl font-semibold mb-2">Welcome to Invision</h2>
              <p className="text-center text-sm opacity-90">
                Cloud Based Streamlined Hospital Management System with centralized user-friendly interface.
              </p>
            </div>
    
            {/* Right side with form */}
            <div className="p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
    
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
    
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
    
                <button
                  onClick={loginApi}
                  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Login
                </button>
    
                <div className="text-right">
                  <a href="#" className="text-blue-600 text-sm hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </div>
    
              <p className="text-center text-sm text-gray-600 mt-6">
                Don’t have an account?{" "}
                <a href="#" className="text-blue-600 font-medium hover:underline">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      );
}

export default LoginPage
