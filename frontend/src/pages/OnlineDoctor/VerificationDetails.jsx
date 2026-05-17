import React from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const OnlineDocVerificationDetails = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A5F48] via-[#89C9CA] to-[#C6EBE8] p-4">

      {/* Card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-5 sm:p-8">

        {/* Header */}
        <div className="flex items-center mb-6">
          <ArrowLeft className="w-5 h-5 cursor-pointer" />
          <h2 className="flex-1 text-center text-xl sm:text-2xl font-semibold">
            Verification Details
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-5">

          {/* Specialization */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="sm:w-1/3 font-medium">Specialization</label>
            <input
              type="text"
              className="w-full sm:w-2/3 border rounded-md p-2 bg-gray-100"
            />
          </div>

          {/* Experience Certificate */}
          <div>
            <h3 className="font-semibold mb-2">
              Upload Your Experience Certificate
            </h3>

            <div className="border-2 border-dashed border-blue-500 rounded-lg p-6 text-center">
              <p className="text-gray-500 mb-3">DRAG FILE HERE OR</p>

              <button className="bg-blue-600 text-white px-6 py-2 rounded-full">
                Browse
              </button>

              <p className="text-sm text-gray-500 mt-3">
                Supported file types: .PDF .PNG .JPG
              </p>
            </div>
          </div>

          {/* License Certificate */}
          <div>
            <h3 className="font-semibold mb-2">
              Upload Your License Certificate
            </h3>

            <div className="border-2 border-dashed border-blue-500 rounded-lg p-6 text-center">
              <p className="text-gray-500 mb-3">DRAG FILE HERE OR</p>

              <button className="bg-blue-600 text-white px-6 py-2 rounded-full">
                Browse
              </button>
            </div>
          </div>

          {/* Consultation Fee */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="sm:w-1/3 font-medium">Consultation Fee</label>
            <input
              type="number"
              className="w-full sm:w-2/3 border rounded-md p-2 bg-gray-100"
            />
          </div>

          {/* Available Time Slot */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="sm:w-1/3 font-medium">Available Time Slot</label>
            <div className="flex gap-2 w-full sm:w-2/3">
              <input
                type="time"
                className="w-1/2 border rounded-md p-2 bg-gray-100"
              />
              <input
                type="time"
                className="w-1/2 border rounded-md p-2 bg-gray-100"
              />
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col sm:flex-row gap-2">
            <label className="sm:w-1/3 font-medium">Address</label>
            <textarea
              rows="3"
              className="w-full sm:w-2/3 border rounded-md p-2 bg-gray-100"
            />
          </div>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row gap-2">
            <label className="sm:w-1/3 font-medium">
              Contact Number (Official)
            </label>
            <input
              type="text"
              className="w-full sm:w-2/3 border rounded-md p-2 bg-gray-100"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row gap-2">
            <label className="sm:w-1/3 font-medium">
              Email Address (Official)
            </label>
            <input
              type="email"
              className="w-full sm:w-2/3 border rounded-md p-2 bg-gray-100"
            />
          </div>

         

          {/* Button */}
          <Link to="/Doctor-TermAndCondition">
        <button className="sm:w-[200px] w-[100px] bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition mx-auto flex justify-center items-center text-center">
  Continue
</button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default OnlineDocVerificationDetails;