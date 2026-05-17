
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import AidlyLogo from "../src/assets/Aidly.jpg";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("hospitalToken");

//   const handleLogout = () => {
//     localStorage.removeItem("hospitalToken");
//     navigate("/login");
//   };

//   return (
//     <nav
//       className="w-full text-white border-b border-white/100"
//       style={{
//         background: "linear-gradient(180deg, #1A5F48 0%, #18765A 100%)",
//       }}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-5">

//         {/* Left - Logo + Title */}
//         <div className="flex items-center gap-4">
//           <img
//             src={AidlyLogo}
//             alt="logo"
//             className="w-[70px] h-[70px] object-contain"
//             style={{ opacity: 1 }}
//           />

//           <h1
//             className="text-5xl font-semibold"
//             style={{
//               fontFamily: "Inria Serif, serif",
//             }}
//           >
//             Aidly Corporate
//           </h1>
//         </div>

//         {/* Right - Menu */}
//         <ul className="flex items-center gap-10 text-lg font-medium">
//           <li className="hover:text-gray-200 cursor-pointer transition">
//             Home
//           </li>
//           <li className="hover:text-gray-200 cursor-pointer transition">
//             About
//           </li>
//           <li className="hover:text-gray-200 cursor-pointer transition">
//             Services
//           </li>
//           <li className="hover:text-gray-200 cursor-pointer transition">
//             Contact
//           </li>

//           {/* 🔐 Logout (only when logged in) */}
//           {token && (
//             <li>
//               <button
//                 onClick={handleLogout}
//                 className="bg-500 hover:bg-600 text-white px-3 py-2 rounded-md transition"
//               >
//                 Logout
//               </button>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AidlyLogo from "../src/assets/Aidly.jpg";

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
        <div className="flex items-center gap-4 md:gap-10">
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10 text-lg font-medium">
            <li className="hover:text-gray-200 cursor-pointer transition">
              Home
            </li>
            <li className="hover:text-gray-200 cursor-pointer transition">
              About
            </li>
            <li className="hover:text-gray-200 cursor-pointer transition">
              Services
            </li>
            <li className="hover:text-gray-200 cursor-pointer transition">
              Contact
            </li>

            {/* 🔐 Logout (only when logged in) */}
            {token && (
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-transparent hover:bg-white/20 text-white px-4 py-2 rounded-md transition"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          >
            <span className="w-7 h-0.5 bg-white transition"></span>
            <span className="w-7 h-0.5 bg-white transition"></span>
            <span className="w-7 h-0.5 bg-white transition"></span>
          </button>
        </div>
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
