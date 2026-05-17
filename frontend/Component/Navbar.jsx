
import React from "react";
import { useNavigate } from "react-router-dom";
import AidlyLogo from "../src/assets/Aidly.jpg";

const Navbar = () => {
  const navigate = useNavigate();
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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-5">

        {/* Left - Logo + Title */}
        <div className="flex items-center gap-4">
          <img
            src={AidlyLogo}
            alt="logo"
            className="w-[70px] h-[70px] object-contain"
            style={{ opacity: 1 }}
          />

          <h1
            className="text-5xl font-semibold"
            style={{
              fontFamily: "Inria Serif, serif",
            }}
          >
            Aidly Corporate
          </h1>
        </div>

        {/* Right - Menu */}
        <ul className="flex items-center gap-10 text-lg font-medium">
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
                className="bg-500 hover:bg-600 text-white px-3 py-2 rounded-md transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
