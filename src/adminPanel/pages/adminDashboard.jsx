import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const iconMap = {
  Admin: "🧑‍💼",
  Doctor: "👨‍⚕️",
  Staff: "👷",
  Patient: "🧑‍🤝‍🧑",
};

const Dashboard = () => {
  const [staff, setStaff] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [patients, setPatients] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/getStaff");
        const allData = response.data.data;

        setStaff(allData.filter((p) => p.role === "staff"));
        setDoctors(allData.filter((p) => p.role === "doctor"));
        setAdmins(allData.filter((p) => p.role === "admin"));
        setPatients(allData.filter((p) => p.role === "patient"));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    window.location.href = "/";
  };


  const handleDeleteDoctor = async (id) => {
    try {
      await axios.delete("http://localhost:5000/api/deleteDoctor", {
        data: { doctorId: id }  
      });
      
      setDoctors(doctors.filter(d => d.doctorId !== id));
      alert("Doctor deleted successfully!");
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Failed to delete doctor.");
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <Sidebar
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <main className="flex-1 p-5 md:p-10 transition-all duration-300">
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200">
          <button
            className="md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            {activePage}
          </h2>
        </div>

        
        {activePage === "Dashboard" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
             
              <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-green-500 text-center hover:scale-[1.02] transform transition-all duration-300 cursor-pointer hover:ring-4 ring-green-200">
                <div className="text-4xl mb-3 text-green-600">🧑‍💼</div>
                <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider">Total Admins</h3>
                <p className="text-4xl font-extrabold mt-2 text-green-800">{admins.length}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-indigo-500 text-center hover:scale-[1.02] transform transition-all duration-300 cursor-pointer hover:ring-4 ring-indigo-200">
                <div className="text-4xl mb-3 text-indigo-600">👨‍⚕️</div>
                <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider">Total Doctors</h3>
                <p className="text-4xl font-extrabold mt-2 text-indigo-800">{doctors.length}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-purple-500 text-center hover:scale-[1.02] transform transition-all duration-300 cursor-pointer hover:ring-4 ring-purple-200">
                <div className="text-4xl mb-3 text-purple-600">👷</div>
                <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider">Total Staff</h3>
                <p className="text-4xl font-extrabold mt-2 text-purple-800">{staff.length}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-pink-500 text-center hover:scale-[1.02] transform transition-all duration-300 cursor-pointer hover:ring-4 ring-pink-200">
                <div className="text-4xl mb-3 text-pink-600">🧑‍🤝‍🧑</div>
                <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider">Total Patients</h3>
                <p className="text-4xl font-extrabold mt-2 text-pink-800">{patients.length}</p>
              </div>
            </div>

          
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100">
                <h4 className="text-xl font-bold text-indigo-700 mb-6 flex items-center">
                  <span className="mr-2 text-2xl">👨‍⚕️</span> Top Doctors
                </h4>
                <ul className="space-y-4">
                  {isLoading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                  ) : doctors.length > 0 ? (
                    doctors.slice(0, 3).map((d) => (
                      <li
                        key={d._id}
                        className="p-3 bg-indigo-50 rounded-xl flex justify-between items-center shadow-sm hover:shadow-md transition duration-200"
                      >
                        <span className="font-medium text-gray-800">{d.name || "N/A"}</span>
                        <span className="text-sm text-indigo-600 font-semibold bg-indigo-100 px-3 py-1 rounded-full">
                          {d.specialization || "General"}
                        </span>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No doctors found</p>
                  )}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100">
                <h4 className="text-xl font-bold text-pink-700 mb-6 flex items-center">
                  <span className="mr-2 text-2xl">🧑‍🤝‍🧑</span> Recent Patients
                </h4>
                <ul className="space-y-4">
                  {isLoading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                  ) : patients.length > 0 ? (
                    patients.slice(0, 3).map((p) => (
                      <li
                        key={p._id}
                        className="p-3 bg-pink-50 rounded-xl flex justify-between items-center shadow-sm hover:shadow-md transition duration-200"
                      >
                        <span className="font-medium text-gray-800">{p.name || "N/A"}</span>
                        <span className="text-sm text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                          {p.email || "No Email"}
                        </span>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No recent patients found</p>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}

       
        {activePage === "Doctors" && (
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8 overflow-x-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3 text-3xl text-blue-600">👨‍⚕️</span> Doctors Directory
            </h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Specialization</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Delete</th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {doctors.map((d, i) => (
                  <tr key={d._id} className={i % 2 === 0 ? "bg-white hover:bg-blue-50" : "bg-gray-50 hover:bg-blue-50"}>
                    <td className="px-6 py-4 text-sm text-gray-800">{d.name || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{d.email || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{d.specialization || "General"}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{d.specialization || "General"}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">
  <button
    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
    onClick={() => handleDeleteDoctor(d.doctorId)}
  >
    Delete
  </button>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        
        {activePage === "Staff" && (
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8 overflow-x-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3 text-3xl text-blue-600">👷</span> Staff Directory
            </h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Availability</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Joining Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {staff.map((s, i) => (
                  <tr key={s._id} className={i % 2 === 0 ? "bg-white hover:bg-blue-50" : "bg-gray-50 hover:bg-blue-50"}>
                    <td className="px-6 py-4 text-sm text-gray-800">{s.name || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{s.email || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{s.availability || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{s.joiningdate || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

       
        {activePage === "Patients" && (
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8 overflow-x-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3 text-3xl text-blue-600">🧑‍🤝‍🧑</span> Patient Records
            </h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">Age</th>
                  
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {patients.map((p, i) => (
                  <tr key={p._id} className={i % 2 === 0 ? "bg-white hover:bg-blue-50" : "bg-gray-50 hover:bg-blue-50"}>
                    <td className="px-6 py-4 text-sm text-gray-800">{p.name || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{p.email || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{p.phone || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{p.age || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

    
        {activePage === "Appointments" && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 text-center text-gray-500 border-2 border-dashed border-gray-200">
            <h3 className="text-2xl font-bold text-gray-700 mb-4 flex items-center justify-center">
              <span className="mr-2 text-3xl">🧾</span> Appointments
            </h3>
            <p className="text-lg">Appointments management feature coming soon!</p>
            <p className="text-sm mt-2">No appointment data is currently available.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
