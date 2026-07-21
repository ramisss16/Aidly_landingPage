
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

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import AidlyLogo from "../src/assets/Aidly.png";
import { User } from "lucide-react";

const NAV_HEIGHT = 90;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("hospitalToken");

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -120,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  const isActive = (item) => {
    const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
    return location.pathname === path;
  };

  const handleNavClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("hospitalToken");
    setIsOpen(false);
    navigate("/login");
  };

  const navItems = ["Home", "About", "Services", "Contact"];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[#1A5F48] to-[#89C9CA] rounded-b-2xl shadow-xl"
      style={{ height: NAV_HEIGHT }}
    >
      <div
        className="w-full h-full flex items-center justify-between rounded-b-3xl shadow-md px-5 md:px-5 lg:px-14"
       
      >
        {/* Logo */}
        <div
          className="cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={AidlyLogo}
            alt="Aidly Logo"
            className="h-30 sm:h-35 md:h-40 w-auto object-contain"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden  md:flex items-center gap-8">
          <ul className="flex items-center gap-8 text-lg lg:text-xl font-semibold">
            {navItems.map((item) => (
              <li
                key={item}
                onClick={() =>
                  handleNavClick(item === "Home" ? "/" : `/${item.toLowerCase()}`)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleNavClick(
                    item === "Home" ? "/" : `/${item.toLowerCase()}`
                  )
                }
                tabIndex={0}
                role="button"
                className={`cursor-pointer transition-colors duration-300 ${
                  isActive(item)
                    ? "text-black font-bold"
                    : "text-white hover:text-gray-200"
                }`}
              >
                {item}
              </li>
            ))}

            {!token ? (
              <li
                onClick={() => handleNavClick("/login")}
                className={`cursor-pointer transition-colors duration-300 ${
                  isActive("Login")
                    ? "text-black font-bold"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Login
              </li>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/profile")}
                  className="text-white hover:text-gray-200 transition"
                >
                  <User size={26} />
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-white text-[#1A5F48] px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </ul>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
        >
          <span
            className={`absolute w-6 h-[3px] bg-white rounded transition-all duration-300 ${
              isOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />

          <span
            className={`absolute w-6 h-[3px] bg-white rounded transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />

          <span
            className={`absolute w-6 h-[3px] bg-white rounded transition-all duration-300 ${
              isOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden bg-gradient-to-b from-[#1A5F48] to-[#89C9CA]  border border-white/50  shadow-xl rounded-b-2xl transition-all duration-300 ${
          isOpen
            ? "max-h-[450px] opacity-100 py-4"
            : "max-h-0 opacity-0 py-0"
        }`}
      >
        <ul className="space-y-3 px-5 font-medium">
          {navItems.map((item) => (
            <li
              key={item}
              onClick={() =>
                handleNavClick(item === "Home" ? "/" : `/${item.toLowerCase()}`)
              }
              className={`cursor-pointer py-2 transition ${
                isActive(item)
                  ? "text-black font-bold"
                  : "text-white"
              }`}
            >
              {item}
            </li>
          ))}

          {!token ? (
            <li
              onClick={() => handleNavClick("/login")}
              className={`cursor-pointer py-2 ${
                isActive("Login")
                  ? "text-black font-bold"
                  : "text-white"
              }`}
            >
              Login
            </li>
          ) : (
            <>
              <li
                onClick={() => handleNavClick("/profile")}
                className="flex items-center gap-2 py-2 text-white cursor-pointer"
              >
                <User size={20} />
                Profile
              </li>

              <li
                onClick={handleLogout}
                className="py-2 text-white cursor-pointer"
              >
                Logout
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;