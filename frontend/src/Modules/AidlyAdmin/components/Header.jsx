import React from "react";
import { useNavigate } from "react-router-dom";
import AidlyLogo from "../../../assets/Aidly.jpg";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <header className="relative w-full z-20">
      <div
        className="h-[80px] flex items-center justify-between px-6"
        style={{
          background: "linear-gradient(180deg, #0D402F 0%, #1A5F48 100%)",
        }}
      >
        <div className="flex items-center gap-4">
          <img
            src={AidlyLogo}
            alt="logo"
            className="w-[70px] h-[70px] object-contain"
            style={{ opacity: 1 }}
          />

          <h1
            className="text-white text-3xl font-medium italic tracking-tight leading-none"
            style={{ fontFamily: "'Inria Serif', serif" }}
          >
            Aidly Corporate
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="px-6 py-2.5 bg-white text-[#1A5F48] font-bold rounded-md hover:bg-gray-100 transition-colors text-sm"
        >
          Logout
        </button>
      </div>
      <div className="h-[1px] w-full bg-white/20"></div>
    </header>
  );
};

export default Header;
