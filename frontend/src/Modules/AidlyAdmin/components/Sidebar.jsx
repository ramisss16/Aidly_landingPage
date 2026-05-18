import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Clinic/Hospital Data", path: "/admin/entities/clinics-hospitals" },
    { name: "Online Doctor Data", path: "/admin/entities/online-doctors" },
    { name: "Ambulance Data", path: "/admin/entities/ambulances" },
    { name: "Medical Store Data", path: "/admin/entities/medical-stores" },
  ];

  return (
    <div className="w-[220px] bg-[#E2F0EC] min-h-screen flex flex-col pt-8 border-r border-white/20">
      <div className="px-6 mb-8 text-center">
        <h2 className="text-[#1A5F48] text-[14px] font-extrabold uppercase tracking-widest border-b border-[#1A5F48]/30 pb-4">
          Select Database type
        </h2>
      </div>

      <nav className="flex flex-col">
        {menuItems.map((item) => (
          <React.Fragment key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block w-full py-5 px-4 text-center text-[15px] font-bold transition-colors ${
                  isActive
                    ? "bg-[#B2E0D4] text-[#1A5F48]"
                    : "bg-transparent text-[#1A5F48]/70 hover:bg-[#D4EAE5]"
                }`
              }
            >
              {item.name}
            </NavLink>
            <div className="h-[1px] w-full bg-white"></div>
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
