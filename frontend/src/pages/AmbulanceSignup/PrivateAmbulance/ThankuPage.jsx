import React from "react";
import { Link } from "react-router-dom";
import success from "../../../assets/success.png"

function PrivateAmbulance_thankupage() {

  const privateAmbulanceId = sessionStorage.getItem("privateAmbulanceId");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A5F48] via-[#89C9CA] to-[#C6EBE8] p-4">

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl text-center p-6 sm:p-10 -mt-15">

        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src={success}  
            alt="success"
            className="w-24 sm:w-32 md:w-36"
          />
        </div>

        {/* Heading */}
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-3 leading-snug">
         Thank you for Sign up With
         <p className="text-green-400">Aidly</p>
        </h2>

        {/* Sub Text */}
        <p className="text-sm sm:text-base text-gray-700 mb-2">
          Generated User ID is <span className="font-semibold">{privateAmbulanceId}</span>
        </p>

        <p className="text-sm sm:text-base text-gray-700 mb-6">
          use it for further Log in
        </p>

        {/* Button */}
        <Link to="#">
          <button className="bg-blue-600 text-white px-6 sm:px-10 py-2 sm:py-3 rounded-md text-sm sm:text-lg shadow-md hover:bg-blue-700 transition">
            Go To Dashboard
          </button>
        </Link>

      </div>
    </div>
  );
}

export default PrivateAmbulance_thankupage;