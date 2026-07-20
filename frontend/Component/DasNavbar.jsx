import React, { useState, useRef, useEffect } from "react";
import AidlyLogo from "../src/assets/Aidly (2).png";
import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardNav = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("clinicId");
    localStorage.removeItem("user");
    localStorage.removeItem("hospitalToken");

    navigate("/login");
  };

  return (
    <nav
      className="w-full text-white border-b-2 border-white relative"
      style={{
        background: "linear-gradient(180deg, #1A5F48 0%, #18765A 100%)",
      }}
    >
      <div className="w-full flex items-center justify-between px-3 sm:px-5 md:px-6 py-2">
        
        {/* Left */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img
            src={AidlyLogo}
            alt="logo"
            className="w-[55px] h-[55px] sm:w-[70px] sm:h-[70px] md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px] object-contain flex-shrink-0"
          />

          <h1
            className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-semibold whitespace-nowrap leading-none"
            style={{ fontFamily: "Inria Serif, serif" }}
          >
            Aidly Corporate
          </h1>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 sm:gap-5 md:gap-6 relative flex-shrink-0">

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <User
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 cursor-pointer"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
            />

            {showProfile && (
              <div className="absolute right-0 top-10 sm:top-12 bg-white text-black rounded-md shadow-lg w-44 sm:w-52 z-50 overflow-hidden">

                <button className="w-full py-2 sm:py-3 text-base sm:text-xl md:text-2xl font-semibold hover:bg-gray-100 transition">
                  My Profile
                </button>

                <div className="border-t border-gray-300"></div>

                <button
                  onClick={handleLogout}
                  className="w-full py-2 sm:py-3 text-base sm:text-xl md:text-2xl font-semibold text-red-500 hover:bg-red-50 transition"
                >
                  Logout
                </button>

              </div>
            )}
          </div>

          {/* Notification */}
          <div className="relative" ref={notificationRef}>
            <Bell
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 cursor-pointer"
              // onClick={() => {
              //   setShowNotifications(!showNotifications);
              //   setShowProfile(false);
              // }}
            />

            {/* {showNotifications && (
              <div className="absolute right-0 top-10 sm:top-12 bg-white text-black rounded-md shadow-lg w-64 sm:w-72 z-50 overflow-hidden">

                <div className="px-4 py-3 border-b font-semibold text-base sm:text-lg flex justify-between">
                  <span>🔴 Test Result</span>
                  <span className="text-gray-500">2</span>
                </div>

                <div className="px-4 py-3 border-b font-semibold text-base sm:text-lg flex justify-between">
                  <span>🔴 Pending Approvals</span>
                  <span className="text-gray-500">3</span>
                </div>

                <div className="px-4 py-3 font-semibold text-base sm:text-lg flex justify-between">
                  <span>🔴 Patient Emergency</span>
                  <span className="text-gray-500">1</span>
                </div>

              </div>
            )} */}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;