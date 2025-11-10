// import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = ({ onLogout, isOpen, setIsOpen, activePage, setActivePage }) => {
  const menuItems = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Doctors", icon: "👨‍⚕️" },
    { name: "Patients", icon: "🧑‍🤝‍🧑" },
    { name: "Appointments", icon: "🧾" },
    { name: "Staff", icon: "👷" },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto bg-white/90 backdrop-blur-lg shadow-2xl flex flex-col rounded-r-3xl overflow-hidden transform transition-all duration-500 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{ width: "18rem" }}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700 tracking-wide hidden md:block">
            🏥 Invision Admin
          </h1>
          <button
            className="md:hidden text-blue-700"
            onClick={() => setIsOpen(false)}
          >
            <X size={26} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActivePage(item.name);
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                activePage === item.name
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-600 hover:text-white text-gray-700"
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-2 rounded-lg font-medium"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
