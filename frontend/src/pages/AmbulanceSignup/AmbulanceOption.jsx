import React, { useState } from "react";
import { Link } from "react-router-dom";

const AmbulanceLoginoption = () => {



  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#1A5F48] via-[#89C9CA] to-[#C6EBE8] pt-6 sm:pt-10">

      {/* Main Card */}
      <div className="mt-6 sm:mt-10 bg-white/80 backdrop-blur-md p-5 sm:p-8 md:p-10 shadow-lg w-[90%] max-w-[600px] min-h-[420px] rounded-lg ">

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 ">
          Select Any One
        </h2>

      <div className="mt-2 sm:mt-5 bg-white backdrop-blur-md p-2 sm:p-5 md:p-6 shadow-lg w-[90%] max-w-[400px] min-h-[180px] mx-auto ">
          <p className="flex items-center justify-center font-semibold text-md sm:text-lg md:text-xl">Ambulance</p>
          <Link to="/Hospital-Ambulance-Signup">
          <button className="flex items-center justify-center font-semibold mx-auto mt-3 p-3 py-1 rounded-lg bg-blue-400">Hospital Ambulance</button>
          </Link>

          <Link to="/Private-Ambulance-Signup">
          <button className="flex items-center justify-center font-semibold mx-auto mt-2 p-4 py-1 rounded-lg bg-blue-400">Private Ambulance</button>
          </Link>

      </div>

      </div>
    </div>
  );
};

export default AmbulanceLoginoption;