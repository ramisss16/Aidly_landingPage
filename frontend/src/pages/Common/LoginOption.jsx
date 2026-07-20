import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginOptions = () => {


  return (
     <div className="relative min-h-screen overflow-x-hidden">
    <div className="fixed inset-0 -z-10 bg-[linear-gradient(0deg,_#FFFFFF_0%,_#C6EBE8_39.9%,_#89C9CA_75.48%,_#1A5F48_100%)]" />
    <div className="w-full min-h-screen flex flex-col items-center justify-start  pt-6 sm:pt-10">

      {/* Main Card */}
      <div className="mt-26 bg-white/80 backdrop-blur-md p-5 sm:p-8 md:p-10 shadow-lg w-[90%] max-w-[600px] min-h-[420px] rounded-lg">

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 ">
          Select Login Type
        </h2>

        {/* Clinic */}
        <div className="w-full bg-white border border-transparent rounded-2xl mb-2 p-3 border-1 hover:border-gray-500">

          <Link to="/clinic_form">
          <button
         className="w-full text-base sm:text-lg"
          >
            Clinic
          </button>
          </Link>

        </div>

        {/* online  doctor */}
        <div className="w-full bg-white border border-transparent rounded-2xl mb-2 p-3 border-1 hover:border-gray-500">

          <Link to="/Doctor-Signup">
          <button
         className="w-full text-base sm:text-lg"
          >
            Online Doctor
          </button>
          </Link>

        </div>

        {/* Ambulance */}
        <div className="w-full bg-white border border-transparent rounded-2xl mb-2 p-3 border-1 hover:border-gray-500">

          <Link to="/Ambulancelogintype">
          <button
          className="w-full text-base sm:text-lg"
          >
            Ambulance
          </button>
          </Link>

        </div>

        {/* Medical */}
        <div className="w-full bg-white border border-transparent rounded-2xl mb-2 p-3 border-1 hover:border-gray-500">

          <Link to="#">
          <button className="w-full text-base sm:text-lg">
            Medical Store
          </button>
          </Link>

        </div>

      </div>
    </div>
    </div>
  );
};

export default LoginOptions;