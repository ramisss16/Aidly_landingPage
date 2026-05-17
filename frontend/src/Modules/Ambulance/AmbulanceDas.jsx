import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Ambulancedas  = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#1A5F48] via-[#89C9CA] to-[#C6EBE8]">
      
      {/* Sidebar */}
      <div className="w-64 bg-slate-700 text-white">
        <p className="font-semibold px-8 py-4">Navigation</p>

        <ul className="mt-4 text-md space-y-3">

          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block px-4 py-2 cursor-pointer hover:bg-slate-600
                ${isActive ? "bg-slate-600" : ""}`
              }
            >
              🟦 Dashboard
            </NavLink>
          </li>

          <li>

           
            <NavLink
              to="/Ambulance"
              className={({ isActive }) =>
                `block px-4 py-2 cursor-pointer hover:bg-slate-600
                ${isActive ? "bg-slate-600" : ""}`
              }
            >
              🚑 Ambulance
            </NavLink>
            
          </li>
         

          <li>
            <NavLink
              to="/appointment"
              className={({ isActive }) =>
                `block px-4 py-2 cursor-pointer hover:bg-slate-600
                ${isActive ? "bg-slate-600" : ""}`
              }
            >
              📅 Appointment
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/salary"
              className={({ isActive }) =>
                `block px-4 py-2 cursor-pointer hover:bg-slate-600
                ${isActive ? "bg-slate-600" : ""}`
              }
            >
              💰 Salary Payout
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/revenue"
              className={({ isActive }) =>
                `block px-4 py-2 cursor-pointer hover:bg-slate-600
                ${isActive ? "bg-slate-600" : ""}`
              }
            >
              📊 Revenue Stats
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `block px-4 py-2 cursor-pointer hover:bg-slate-600
                ${isActive ? "bg-slate-600" : ""}`
              }
            >
              🕘 History
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/employee"
              className={({ isActive }) =>
                `block px-4 py-2 cursor-pointer hover:bg-slate-600
                ${isActive ? "bg-slate-600" : ""}`
              }
            >
              👤 Employee
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/help"
              className={({ isActive }) =>
                `block px-4 py-2 cursor-pointer hover:bg-slate-600
                ${isActive ? "bg-slate-600" : ""}`
              }
            >
              ❓ Help Center
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/feedback"
              className={({ isActive }) =>
                `block px-4 py-2 cursor-pointer hover:bg-slate-600
                ${isActive ? "bg-slate-600" : ""}`
              }
            >
              📝 Feedback & Report
            </NavLink>
          </li>

        </ul>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Ambulancedas;