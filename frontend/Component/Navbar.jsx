
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
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import AidlyLogo from "../src/assets/Aidly.png";
import { User } from "lucide-react";

const NAV_HEIGHT = 80;

const Navbar = () => {
  const location = useLocation();

  const isActive = (item) => {
  const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
  return location.pathname === path;
};

  const navigate = useNavigate();
  const navRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("hospitalToken");

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -120,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("hospitalToken");
    setIsOpen(false);
    navigate("/login");
  };

  const handleNavClick = (item, path) => {
  setIsOpen(false);
  if (path) navigate(path);
};

  return (
    <nav
      ref={navRef}
      className="bg-transparent fixed top-0 left-0 w-full z-50"
      style={{ height: NAV_HEIGHT }}
      aria-label="Main navigation"
    >
      <div
        className="w-full h-full rounded-b-3xl shadow-md flex items-center justify-between px-4 md:px-8"
        style={{
          background: "linear-gradient(180deg, #1A5F48 0%, #18765A 100%)",
        }}
      >
        <div className="flex items-center gap-3">
          <img
            src={AidlyLogo}
            alt="Aidly logo"
            className="h-15 md:h-20 w-auto object-contain"
          />
        </div>

        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-8 text-lg md:text-xl font-semibold">
            {["Home", "About", "Services", "Contact"].map((item) => (
              <li
                key={item}
                onClick={() =>
                  handleNavClick(item, item === "Home" ? "/" : `/${item.toLowerCase()}`)
                }
               className={`cursor-pointer transition ${
  isActive(item)
    ? "text-black font-bold"
    : "text-white hover:text-gray-200"
}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleNavClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>

          {token ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                 
                  handleLogout();
                }}
                className="bg-white text-[#1A5F48] px-3 py-1 md:px-4 md:py-2 rounded-lg font-semibold text-sm md:text-base flex items-center gap-2"
                aria-label="Logout"
              >
                <User size={20} className="text-black shrink-0" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                 
                  setIsOpen(false);
                  navigate("/login");
                }}
                className="bg-white text-[#1A5F48] px-3 py-1 md:px-4 md:py-2 rounded-lg font-semibold text-sm md:text-base flex items-center gap-2"
                aria-label="Login"
              >
                <User size={20} className="text-black shrink-0" />
                Login
              </button>
            </div>
          )}

          <button
            onClick={() => setIsOpen((s) => !s)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300"
            aria-expanded={isOpen}
            aria-label="Toggle mobile menu"
          >
            <span
              className={`absolute w-6 h-[3px] bg-white rounded-full transition-all duration-500 ease-in-out ${
                isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute w-6 h-[3px] bg-white rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
              }`}
            />
            <span
              className={`absolute w-6 h-[3px] bg-white rounded-full transition-all duration-500 ease-in-out ${
                isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`md:hidden backdrop-blur-xl bg-[#37B3BB]/90 text-white rounded-b-2xl px-4 overflow-hidden transform transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[360px] opacity-100 translate-y-0 py-4" : "max-h-0 opacity-0 -translate-y-4 py-0"
        }`}
      >
        <ul className="space-y-3 font-medium">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <li
              key={item}
              onClick={() =>
                handleNavClick(item, item === "Home" ? "/" : `/${item.toLowerCase()}`)
              }
             className={`py-2 cursor-pointer transition ${
  isActive(item) ? "text-black font-bold" : "text-white"
}`}
            >
              {item}
            </li>
          ))}

        
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;