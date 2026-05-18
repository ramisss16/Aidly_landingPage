// import React from "react";
// import { useNavigate } from "react-router-dom";
// import AidlyLogo from "../../../assets/Aidly.jpg";

// const Header = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("user");
//     localStorage.removeItem("adminToken");
//     navigate("/");
//   };

//   return (
//     <header className="relative w-full z-20">
//       <div
//         className="h-[80px] flex items-center justify-between px-6"
//         style={{
//           background: "linear-gradient(180deg, #0D402F 0%, #1A5F48 100%)",
//         }}
//       >
//         <div className="flex items-center gap-4">
//           <img
//             src={AidlyLogo}
//             alt="logo"
//             className="w-[70px] h-[70px] object-contain"
//             style={{ opacity: 1 }}
//           />

//           <h1
//             className="text-white text-3xl font-medium italic tracking-tight leading-none"
//             style={{ fontFamily: "'Inria Serif', serif" }}
//           >
//             Aidly Corporate
//           </h1>
//         </div>

//         <button
//           onClick={handleLogout}
//           className="px-6 py-2.5 bg-white text-[#1A5F48] font-bold rounded-md hover:bg-gray-100 transition-colors text-sm"
//         >
//           Logout
//         </button>
//       </div>
//       <div className="h-[1px] w-full bg-white/20"></div>
//     </header>
//   );
// };

// export default Header;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AidlyLogo from "../../../assets/Aidly.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("hospitalToken");

  const handleLogout = () => {
    localStorage.removeItem("hospitalToken");
    navigate("/login");
  };

  return (
    <nav
      className="w-full text-white border-b border-white/100"
      style={{
        background: "linear-gradient(180deg, #1A5F48 0%, #18765A 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10 py-5">
        
        {/* Left - Logo + Title */}
        <div className="flex items-center gap-3 md:gap-4">
          <img
            src={AidlyLogo}
            alt="logo"
            className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] object-contain"
            style={{ opacity: 1 }}
          />

          <h1
            className="text-2xl md:text-5xl font-semibold"
            style={{
              fontFamily: "Inria Serif, serif",
            }}
          >
            Aidly Corporate
          </h1>
        </div>

        {/* Right - Menu */}
   
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-white/20 bg-[#1A5F48]/95">
          <ul className="flex flex-col py-4">
            <li className="px-4 py-3 hover:bg-white/10 cursor-pointer transition">
              Home
            </li>
            <li className="px-4 py-3 hover:bg-white/10 cursor-pointer transition">
              About
            </li>
            <li className="px-4 py-3 hover:bg-white/10 cursor-pointer transition">
              Services
            </li>
            <li className="px-4 py-3 hover:bg-white/10 cursor-pointer transition">
              Contact
            </li>
            
            {/* 🔐 Logout (only when logged in) */}
            {token && (
              <li className="px-4 py-3">
                <button
                  onClick={handleLogout}
                  className="w-full text-left hover:bg-white/10 text-white px-4 py-2 rounded-md transition"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
