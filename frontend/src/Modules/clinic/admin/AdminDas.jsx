import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, IndianRupee, Stethoscope, Bed } from "lucide-react";

import api from "../../../service/api";

import chart from "../../../assets/chart.png.jpg";
import diagnosis from "../../../assets/diagonosis.png.jpg";
import doctor from "../../../assets/doctormanagement.png.jpg";
import expenses from "../../../assets/expenses.png.jpg";
import patient from "../../../assets/patienapointment.png.jpg";
import satisfaction from "../../../assets/patient_satisfaction.jpg";
import treatment from "../../../assets/treatment.png.jpg";
import profile from "../../../assets/apolohos.png";

const AdminDas = () => {
  const role = localStorage.getItem("role");
  const [open, setopen] = useState("StaffAttendence");

  const toggle = (name) => {
    if (open === name) {
      setopen("");
    } else {
      setopen(name);
    }
  };

  const [clinic, setClinic] = useState({});

  useEffect(() => {

  const fetchClinic = async () => {

    try {

      const clinicId = localStorage.getItem("clinicId");

      const res = await api.get(`/clinic/${clinicId}`);

      setClinic(res.data.data);

    } catch (err) {

      console.log(err);

    }

  };

  fetchClinic();

}, []);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-gradient-to-b from-[#1A5F48] via-[#89C9CA] to-[#C6EBE8] shadow p-2 lg:p-1">
        <div
          onClick={() => toggle("StaffAttendence")}
          className="font-semibold text-lg bg-white p-3 px-4 lg:px-8 mb-2 cursor-pointer rounded"
        >
          Staff Attendance
          {open === "StaffAttendence" && (
            <div className="flex flex-wrap gap-2 mt-2">
              {/* <Link to={`/dashboard/${role}/staffattendance`}> */}
                <button className="bg-blue-300 px-3 py-1 rounded-full">
                  Update
                </button>
              {/* </Link> */}
              {/* <Link to={`/dashboard/${role}/viewattendance`}> */}
                <button className="bg-green-300 px-3 py-1 rounded-full">
                  View
                </button>
              {/* </Link> */}
            </div>
          )}
        </div>

        <div
          onClick={() => toggle("BedManagement")}
          className="font-semibold text-lg bg-white p-3 px-4 lg:px-8 mb-2 cursor-pointer rounded"
        >
          Bed Management
          {open === "BedManagement" && (
            <div className="flex flex-wrap gap-2 mt-2">
              <button className="bg-blue-300 px-3 py-1 rounded-full">Update</button>
              <button className="bg-green-300 px-3 py-1 rounded-full">View</button>
            </div>
          )}
        </div>

        <div
          onClick={() => toggle("StaffScheduling")}
          className="font-semibold text-lg bg-white p-3 px-4 lg:px-8 mb-2 cursor-pointer rounded"
        >
          Staff Scheduling
          {open === "StaffScheduling" && (
            <div className="flex flex-wrap gap-2 mt-2">
              <button className="bg-blue-300 px-3 py-1 rounded-full">Update</button>
              <button className="bg-green-300 px-3 py-1 rounded-full">View</button>
            </div>
          )}
        </div>

        <div
          onClick={() => toggle("BillingRecords")}
          className="font-semibold text-lg bg-white p-3 px-4 lg:px-8 mb-2 cursor-pointer rounded"
        >
          Billing Records
          {open === "BillingRecords" && (
            <div className="flex flex-wrap gap-2 mt-2">
              <button className="bg-blue-300 px-3 py-1 rounded-full">Update</button>
              <button className="bg-green-300 px-3 py-1 rounded-full">View</button>
            </div>
          )}
        </div>

        <div
          onClick={() => toggle("PaymentRecords")}
          className="font-semibold text-lg bg-white p-3 px-4 lg:px-8 mb-2 cursor-pointer rounded"
        >
          Payment Records
          {open === "PaymentRecords" && (
            <div className="flex flex-wrap gap-2 mt-2">
              <button className="bg-blue-300 px-3 py-1 rounded-full">Update</button>
              <button className="bg-green-300 px-3 py-1 rounded-full">View</button>
            </div>
          )}
        </div>

        <div
          onClick={() => toggle("StaffSalary")}
          className="font-semibold text-lg bg-white p-3 px-4 lg:px-8 mb-2 cursor-pointer rounded"
        >
          Staff Salary
          {open === "StaffSalary" && (
            <div className="flex flex-wrap gap-2 mt-2">
              <button className="bg-blue-300 px-3 py-1 rounded-full">Update</button>
              <button className="bg-green-300 px-3 py-1 rounded-full">View</button>
            </div>
          )}
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1 p-3 lg:p-4">
       <div className="flex justify-end items-center gap-4 mb-4">
  <div className="text-right">
  <h1 className="text-xl font-bold">
{clinic.clinicName} 
</h1>

<p>
{clinic.city}, {clinic.state}
</p>

<p>
Pin code - {clinic.pincode}
</p>
  </div>

  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
    <img
      // src={profile}
      alt="profile"
      className="w-full h-full object-cover"
    />
  </div>
</div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-4">
          <div className="xl:col-span-3 bg-white p-3 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Patient Trends</h3>
            <img src={chart} alt="Patient Trends" className="w-full h-60 object-contain" />
          </div>

          <div className="bg-white rounded-xl shadow p-3">
            <h3 className="font-semibold mb-3">Patient Satisfaction</h3>
            <img
              src={satisfaction}
              alt="Patient Satisfaction"
              className="w-full h-60 object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <Users/>
            <h2 className="text-xl font-bold">405</h2>
            <p>Total Patients</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h2 className="text-xl font-bold">₹15.5L</h2>
            <p>Operational Costs</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h2 className="text-2xl font-bold">18</h2>
            <p>Doctors Available</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h2 className="text-2xl font-bold">87/112</h2>
            <p>Beds Available</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <img src={patient} alt="Patient Management" className="w-24 mx-auto" />
            <h3 className="font-semibold">Patient Management</h3>
            <div className="flex justify-center gap-2 mt-2">
              <Link to={`/dashboard/${role}/addpatient`}>
                <button className="bg-blue-300 px-3 rounded-full">Update</button>
              </Link>
              <Link to={`/dashboard/${role}/viewpatient`}>
                <button className="bg-green-300 px-3 rounded-full">View</button>
              </Link>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <img src={doctor} alt="Doctor Management" className="w-24 mx-auto" />
            <h3 className="font-semibold">Doctor Management</h3>
            <div className="flex justify-center gap-2 mt-2">
              <button className="bg-blue-300 px-3 rounded-full">Update</button>
              <button className="bg-green-300 px-3 rounded-full">View</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <img src={diagnosis} alt="Diagnosis Management" className="w-24 mx-auto" />
            <h3 className="font-semibold">Diagnosis Management</h3>
            <div className="flex justify-center gap-2 mt-2">
              <button className="bg-blue-300 px-3 rounded-full">Update</button>
              <button className="bg-green-300 px-3 rounded-full">View</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <img src={treatment} alt="Treatment Management" className="w-24 mx-auto" />
            <h3 className="font-semibold">Treatment Management</h3>
            <div className="flex justify-center gap-2 mt-2">
              <button className="bg-blue-300 px-3 rounded-full">Update</button>
              <button className="bg-green-300 px-3 rounded-full">View</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <img src={expenses} alt="Expense Management" className="w-24 mx-auto" />
            <h3 className="font-semibold">Expense Management</h3>
            <div className="flex justify-center gap-2 mt-2">
              <button className="bg-blue-300 px-3 rounded-full">Update</button>
              <button className="bg-green-300 px-3 rounded-full">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDas;