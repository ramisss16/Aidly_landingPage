import React, { useState } from "react";
import { Link } from "react-router-dom";
import chart from "../../../assets/chart.png.jpg";
import Myapointment from "../../../assets/Myapointment.png";
import Mypatient from "../../../assets/Mypatient.png";
import satisfaction from "../../../assets/patient_satisfaction.jpg";
import profile from "../../../assets/apolohos.png";

const Doctordas = () => {
  const [open, setOpen] = useState("");

  const toggle = (section) => {
    setOpen(open === section ? "" : section);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gradient-to-b from-[#1A5F48] via-[#89C9CA] to-[#C6EBE8] shadow p-2 md:p-1">
        
        <Link to="/dashboard/doctor/today'sappointmment">
          <div className="font-semibold text-lg bg-white p-3 px-4 md:px-8 mb-2 text-center md:text-left">
            Today's Schedule
          </div>
        </Link>

        <Link to="/dashboard/doctor/mypatient">
          <div className="font-semibold text-lg bg-white p-3 px-4 md:px-8 mb-2 text-center md:text-left">
            My Patient
          </div>
        </Link>

        <Link to="/dashboard/doctor/today'sappointmment">
          <div className="font-semibold text-lg bg-white p-3 px-4 md:px-8 mb-2 text-center md:text-left">
            Appointments
          </div>
        </Link>

        {/* Lab Results with View/Update buttons */}
        <div
          onClick={() => toggle("LabResults")}
          className="font-semibold text-lg bg-white p-3 px-4 md:px-8 mb-2 cursor-pointer"
        >
          Lab Results
          {open === "LabResults" && (
            <div className="flex gap-2 mt-2 justify-center md:justify-start">
              <button className="bg-blue-300 px-3 py-1 rounded-full text-sm">
                Update
              </button>
              <button className="bg-green-300 px-3 py-1 rounded-full text-sm">
                View
              </button>
            </div>
          )}
        </div>

        {/* Medical Records with View/Update buttons */}
        <div
          onClick={() => toggle("medicalRecords")}
          className="font-semibold text-lg bg-white p-3 px-4 md:px-8 mb-2 cursor-pointer"
        >
          Medical Records
          {open === "medicalRecords" && (
            <div className="flex gap-2 mt-2 justify-center md:justify-start">
              <button className="bg-blue-300 px-3 py-1 rounded-full text-sm">
                Update
              </button>
              <button className="bg-green-300 px-3 py-1 rounded-full text-sm">
                View
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1 p-2 md:p-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:justify-end items-center gap-4 md:gap-7 mb-4">
          <div className="text-right w-full md:w-auto">
            <h1 className="text-xl font-bold">Apollo Hospital</h1>
            <p>Bhopal M.P</p>
            <p>Pin code - 462026</p>
          </div>
          <img 
            src={profile} 
            alt="profile" 
            className="w-12 h-12 md:w-16 md:h-16 object-contain border"
          />
        </div>

        {/* Graph + Satisfaction */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="col-span-1 md:col-span-3 bg-white p-3 md:p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Patient Trends</h3>
            <img src={chart} className="w-full h-auto" alt="Patient Trends" />
          </div>
          <div className="col-span-1 bg-white rounded-xl shadow">
            <h3 className="font-semibold mb-3">Patient Satisfaction</h3>
            <img src={satisfaction} className="w-full h-auto" alt="Patient Satisfaction" />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white p-3 md:p-4 rounded-xl shadow text-center">
            <h2 className="text-xl md:text-2xl font-bold">405</h2>
            <p>Total Patients</p>
          </div>
          <div className="bg-white p-3 md:p-4 rounded-xl shadow text-center">
            <h2 className="text-xl md:text-2xl font-bold">₹15.5L</h2>
            <p>Operational Costs</p>
          </div>
          <div className="bg-white p-4 md:p-5 rounded-xl shadow text-center">
            <h2 className="text-xl md:text-2xl font-bold">18</h2>
            <p>Doctors Available</p>
          </div>
          <div className="bg-white p-4 md:p-5 rounded-xl shadow text-center">
            <h2 className="text-xl md:text-2xl font-bold">87/112</h2>
            <p>Beds Available</p>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <img src={Mypatient} className="w-24 md:w-34 mx-auto" alt="My Patient" />
            <h3 className="font-semibold">My Patient</h3>
            <div className="flex justify-center mt-2">
              <Link to="/dashboard/doctor/mypatient">
                <button className="bg-green-300 py-2 px-4 rounded-full text-sm md:text-base">
                  View List
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <img src={Myapointment} className="w-24 md:w-34 mx-auto" alt="My Appointment" />
            <h3 className="font-semibold">My Appointment</h3>
            <div className="flex justify-center mt-2">
              <Link to="/dashboard/doctor/today'sappointmment">
                <button className="bg-green-300 py-2 px-4 rounded-full text-sm md:text-base">
                  View List
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-purple-100 p-4 rounded-xl shadow text-center">
            <h1 className="font-semibold text-xl mb-6">Quick Actions</h1>
            <div className="flex flex-wrap justify-center gap-3 mb-6 mt-2">
              <Link to={'/addpatient'}>
                <button className="bg-white py-3 px-4 rounded-full text-sm md:text-base">
                  Add Patient
                </button>
              </Link>
              <button className="bg-white py-3 px-4 rounded-full text-sm md:text-base">
                Write Prescription
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              <button className="bg-white py-3 px-4 rounded-full text-sm md:text-base">
                View Lab Records
              </button>
              <button className="bg-white py-3 px-4 rounded-full text-sm md:text-base">
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctordas;