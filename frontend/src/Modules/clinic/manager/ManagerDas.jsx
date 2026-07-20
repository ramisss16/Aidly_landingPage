// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import chart from "../../../assets/chart.png.jpg"

// import diagnosis from "../../../assets/diagonosis.png.jpg"
// import doctor from "../../../assets/doctormanagement.png.jpg"
// import expenses from "../../../assets/expenses.png.jpg"
// import patient from "../../../assets/patienapointment.png.jpg"
// import satisfaction from "../../../assets/patient_satisfaction.jpg"
// import treatment from "../../../assets/treatment.png.jpg"
// import profile from "../../../assets/apolohos.png"
// import { use } from "react";


// const managerDas = () => {

// const role = localStorage.getItem("role");

//   const[open, setopen] = useState("StaffAttendence");

//   const toggle = (name) => {
//     if(open === name){
//       setopen("")
//     }else{
//       setopen(name)
//     }
//   }

//   return (


// <div className="flex min-h-screen">

// {/* Sidebar */}

// <div className="w-64  bg-gradient-to-b from-[#1A5F48] via-[#89C9CA] to-[#C6EBE8] shadow p-1">

// {/* Staff Attendance */}
// <div
// onClick={() => toggle("StaffAttendence")}
// className="font-semibold text-lg bg-white p-3 px-8  mb-2"
// >

// Staff Attendance

// {open === "StaffAttendence" && (

// <div className="flex gap-2 mt-2">

// <Link to={`/dashboard/${role}/staffattendance`}>
// <button className="bg-blue-300 px-3 py-1 rounded-full">
// Update
// </button>
// </Link>

// <Link to={`/dashboard/${role}/viewattendance`}>
// <button className="bg-green-300 px-3 py-1 rounded-full">
// View
// </button>
// </Link>

// </div>

// )}

// </div>



// {/* Bed Management */}
// <div
// onClick={() => toggle("BedManagement")}
// className="font-semibold text-lg bg-white p-3 px-8 mb-2"
// >

// Bed Management

// {open === "BedManagement" && (

// <div className="flex gap-2 mt-2">

// <button className="bg-blue-300 px-3 py-1 rounded-full">
// Update
// </button>

// <button className="bg-green-300 px-3 py-1 rounded-full">
// View
// </button>

// </div>

// )}

// </div>



// {/* Staff Scheduling */}
// <div
// onClick={() => toggle("StaffScheduling")}
// className="font-semibold text-lg bg-white p-3 px-8  mb-2"
// >

// Staff Scheduling

// {open === "StaffScheduling" && (

// <div className="flex gap-2 mt-2">

// <button className="bg-blue-300 px-3 py-1 rounded-full">
// Update
// </button>

// <button className="bg-green-300 px-3 py-1 rounded-full">
// View
// </button>

// </div>

// )}

// </div>


// {/* Billing Records */}
// <div
// onClick={() => toggle("BillingRecords")}
// className="font-semibold text-lg bg-white p-3 px-8  mb-2"
// >

//  Billing Records 

// {open === "BillingRecords" && (

// <div className="flex gap-2 mt-2">

// <button className="bg-blue-300 px-3 py-1 rounded-full">
// Update
// </button>

// <button className="bg-green-300 px-3 py-1 rounded-full">
// View
// </button>

// </div>

// )}

// </div>


// {/* Payment Records */}
// <div
// onClick={() => toggle("PaymentRecords")}
// className="font-semibold text-lg bg-white p-3 px-8  mb-2"
// >

//  Payment Records 

// {open === "PaymentRecords" && (

// <div className="flex gap-2 mt-2">

// <button className="bg-blue-300 px-3 py-1 rounded-full">
// Update
// </button>

// <button className="bg-green-300 px-3 py-1 rounded-full">
// View
// </button>

// </div>

// )}

// </div>




// </div>

// {/* Main Section */}

// <div className="flex-2 p-2">

// {/* Header */}

// <div className="flex justify-end items-center gap-7 mb-2">

//   {/* Text Section */}
//   <div className="text-right">
//     <h1 className="text-xl font-bold">
//       Apollo Hospital
//     </h1>

//     <p>Bhopal M.P</p>
//     <p>Pin code - 462026</p>
//   </div>

//   {/* Image */}
//   <img 
//     src={profile} 
//     alt="profile" 
//     className="w-16 h-16 object-contain border "
//   />

// </div>

// {/* Graph + Satisfaction */}

// <div className="grid grid-cols-4 gap-4 mb-2">

// {/* Graph */}

// <div className="col-span-3 bg-white p-1 rounded-xl shadow">

// <h3 className="font-semibold mb-2">
// Patient Trends
// </h3>

// <img
// src={chart}
// className="w-100% h -60"
// />

// </div>

// {/* Satisfaction */}

// <div className="bg-white  rounded-xl shadow">

// <h3 className="font-semibold mb-3">
// Patient Satisfaction
// </h3>

// <img
// src={satisfaction}
// className="w-80 h-90"
// />

// </div>

// </div>

// {/* Stats Row */}

// <div className="grid grid-cols-4 gap-4 mb-4">

// <div className="bg-white p-2 rounded-xl shadow text-center">

// <h2 className="text-xl font-bold">
// 405
// </h2>

// <p>Total Patients</p>

// </div>

// <div className="bg-white p-2 rounded-xl shadow text-center">

// <h2 className="text-xl font-bold">
// ₹15.5L
// </h2>

// <p>Operational Costs</p>

// </div>

// <div className="bg-white p-5 rounded-xl shadow text-center">

// <h2 className="text-2xl font-bold">
// 18
// </h2>

// <p>Doctors Available</p>

// </div>

// <div className="bg-white p-5 rounded-xl shadow text-center">

// <h2 className="text-2xl font-bold">
// 87/112
// </h2>

// <p>Beds Available</p>

// </div>

// </div>

// {/* Management Cards */}

// <div className="grid grid-cols-4 gap-4">

// {/* Patient */}

// <div className="bg-white p-4 rounded-xl shadow text-center">

// <img
// src={patient}
// className="w-24 mx-auto"
// />

// <h3 className="font-semibold">
// Patient Management
// </h3>

// <div className="flex justify-center gap-2 mt-2">

// <Link to={`/dashboard/${role}/addpatient`}>
// <button className="bg-blue-300 px-3 rounded-full">
// Update
// </button>
// </Link>

// <Link to={`/dashboard/${role}/viewpatient`}>
// <button className="bg-green-300 px-3 rounded-full">
// View
// </button>
// </Link>

// </div>

// </div>

// {/* Doctor */}

// <div className="bg-white p-4 rounded-xl shadow text-center">

// <img
// src={doctor}
// className="w-24 mx-auto"
// />

// <h3 className="font-semibold">
// Doctor Management
// </h3>

// <div className="flex justify-center gap-2 mt-2">

// <button className="bg-blue-300 px-3 rounded-full">
// Update
// </button>

// <button className="bg-green-300 px-3 rounded-full">
// View
// </button>

// </div>

// </div>

// {/* Diagnosis */}

// <div className="bg-white p-4 rounded-xl shadow text-center">

// <img
// src={diagnosis}
// className="w-24 mx-auto"
// />

// <h3 className="font-semibold">
// Diagnosis Management
// </h3>

// <div className="flex justify-center gap-2 mt-2">

// <button className="bg-blue-300 px-3 rounded-full">
// Update
// </button>

// <button className="bg-green-300 px-3 rounded-full">
// View
// </button>

// </div>

// </div>

// {/* Treatment */}

// <div className="bg-white p-4 rounded-xl shadow text-center">

// <img
// src={treatment}
// className="w-24 mx-auto"
// />

// <h3 className="font-semibold">
// Treatment Management
// </h3>

// <div className="flex justify-center gap-2 mt-2">

// <button className="bg-blue-300 px-3 rounded-full">
// Update
// </button>

// <button className="bg-green-300 px-3 rounded-full">
// View
// </button>

// </div>

// </div>


// </div>

// </div>

// </div>

// )
// }

//  export default managerDas;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  IndianRupee,
  Stethoscope,
  Bed,
  Menu,
  X,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import api from "../../../service/api";

import chart from "../../../assets/chart.png.jpg";
import diagnosis from "../../../assets/diagonosis.png.jpg";
import doctor from "../../../assets/doctormanagement.png.jpg";
import expenses from "../../../assets/expenses.png.jpg";
import patient from "../../../assets/patienapointment.png.jpg";
import satisfaction from "../../../assets/patient_satisfaction.jpg";
import treatment from "../../../assets/treatment.png.jpg";
import profile from "../../../assets/apolohos.png";

const ManagerDas = () => {
  const role = localStorage.getItem("role");
  const [open, setopen] = useState("StaffAttendence");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clinic, setClinic] = useState({});

  const toggle = (name) => {
    if (open === name) {
      setopen("");
    } else {
      setopen(name);
    }
  };

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

  const patientTrendData = [
    { day: "7 Days Ago", patients: 0 },
    { day: "6 Days Ago", patients: 0 },
    { day: "5 Days Ago", patients: 0 },
    { day: "4 Days Ago", patients: 0 },
    { day: "3 Days Ago", patients: 0 },
    { day: "2 Days Ago", patients: 0 },
    { day: "Today", patients: 0 },
  ];

  const satisfactionData = [
    { name: "Excellent", value: 65 },
    { name: "Okay", value: 25 },
    { name: "Poor", value: 10 },
  ];

  const COLORS = ["#0F7A89", "#FF9800", "#A5D6E6"];

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gradient-to-b from-[#1A5F48] via-[#89C9CA] to-[#C6EBE8]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed lg:static
          top-0 left-0
          h-screen
          w-64
          bg-gradient-to-b
          from-[#1A5F48]
          via-[#89C9CA]
          to-[#C6EBE8]
          shadow-lg
          z-50
          transform
          transition-transform
          duration-300
          overflow-y-auto
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="lg:hidden flex items-center justify-between p-4 bg-[#1A5F48] text-white">
          <h1 className="text-lg font-bold"></h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md hover:bg-white/10"
          >
            <X size={26} />
          </button>
        </div>

        <div
          onClick={() => toggle("StaffAttendence")}
          className="font-semibold text-sm md:text-lg bg-white p-3 md:px-4 lg:px-8 mb-2 cursor-pointer rounded mx-2 mt-2"
        >
          Staff Attendance
          {open === "StaffAttendence" && (
            <div className="flex flex-wrap gap-2 mt-2">
              <button className="bg-blue-300 px-3 py-1 rounded-full">
                Update
              </button>
              <button className="bg-green-300 px-3 py-1 rounded-full">
                View
              </button>
            </div>
          )}
        </div>

        <div
          onClick={() => toggle("BedManagement")}
          className="font-semibold text-lg bg-white p-3 px-4 lg:px-8 mb-2 cursor-pointer rounded mx-2"
        >
          Bed Management
          {open === "BedManagement" && (
            <div className="flex flex-wrap gap-2 mt-2">
              <button className="bg-blue-300 px-3 py-1 rounded-full">
                Update
              </button>
              <button className="bg-green-300 px-3 py-1 rounded-full">
                View
              </button>
            </div>
          )}
        </div>

        <div
          onClick={() => toggle("StaffScheduling")}
          className="font-semibold text-lg bg-white p-3 px-4 lg:px-8 mb-2 cursor-pointer rounded mx-2"
        >
          Staff Scheduling
          {open === "StaffScheduling" && (
            <div className="flex flex-wrap gap-2 mt-2">
              <button className="bg-blue-300 px-3 py-1 rounded-full">
                Update
              </button>
              <button className="bg-green-300 px-3 py-1 rounded-full">
                View
              </button>
            </div>
          )}
        </div>

        <div
          onClick={() => toggle("BillingRecords")}
          className="font-semibold text-lg bg-white p-3 px-4 lg:px-8 mb-2 cursor-pointer rounded mx-2"
        >
          Billing Records
          {open === "BillingRecords" && (
            <div className="flex flex-wrap gap-2 mt-2">
              <button className="bg-blue-300 px-3 py-1 rounded-full">
                Update
              </button>
              <button className="bg-green-300 px-3 py-1 rounded-full">
                View
              </button>
            </div>
          )}
        </div>

        <div
          onClick={() => toggle("PaymentRecords")}
          className="font-semibold text-lg bg-white p-3 px-4 lg:px-8 mb-2 cursor-pointer rounded mx-2"
        >
          Payment Records
          {open === "PaymentRecords" && (
            <div className="flex flex-wrap gap-2 mt-2">
              <button className="bg-blue-300 px-3 py-1 rounded-full">
                Update
              </button>
              <button className="bg-green-300 px-3 py-1 rounded-full">
                View
              </button>
            </div>
          )}
        </div>

        <div
          onClick={() => toggle("StaffSalary")}
          className="font-semibold text-lg bg-white p-3 px-4 lg:px-8 mb-2 cursor-pointer rounded mx-2"
        >
          Staff Salary
          {open === "StaffSalary" && (
            <div className="flex flex-wrap gap-2 mt-2">
              <button className="bg-blue-300 px-3 py-1 rounded-full">
                Update
              </button>
              <button className="bg-green-300 px-3 py-1 rounded-full">
                View
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 h-screen overflow-y-auto overflow-x-hidden p-3">
        <div className="lg:hidden sticky top-0 z-30 inline-flex items-center  bg-[#1A5F48] text-white px-4 py-3 rounded-xl shadow-md mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-white/10"
          >
            <Menu size={28} />
          </button>

           </div>

        <div className="flex justify-end items-center bg-white p-4 gap-4 mb-4 rounded-2xl shadow-sm border border-[#d7ece9]">
                 <div className="text-right">
                   <h1 className="text-2xl font-bold text-gray-900">
                     {clinic.clinicName || " Hospital name"}
                   </h1>
                   <p className="text-gray-700">
                     {clinic.city || "City"}, {clinic.state || "State"}
                   </p>
                   <p className="text-gray-700">
                     Pin code- {clinic.pincode }
                   </p>
                 </div>
       
                 <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
                   <img
                     src={profile}
                     alt="profile"
                     className="w-full h-full object-cover"
                   />
                 </div>
               </div>

        {/* <div className="lg:hidden bg-white p-4 rounded-xl shadow mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">{clinic.clinicName}</h1>
            <p className="text-sm text-gray-600">
              {clinic.city}, {clinic.state}
            </p>
            <p className="text-sm text-gray-600">Pin code - {clinic.pincode}</p>
          </div>

          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              src={profile}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div> */}

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-4">
          <div className="xl:col-span-3 bg-white rounded-2xl shadow p-5">
            <h2 className="text-2xl font-bold mb-4">Patient Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={patientTrendData}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2B8C99" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#2B8C99" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="patients"
                  stroke="#2B8C99"
                  strokeWidth={4}
                  fill="url(#colorPatients)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow p-4 h-[390px]">
            <h3 className="text-2xl font-bold mb-1">Patient Satisfaction</h3>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={satisfactionData}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {satisfactionData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
            <Users className="w-10 h-10 text-teal-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">0</h2>
              <p className="text-gray-500 text-lg">Total Patients</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
            <IndianRupee className="w-10 h-10 text-orange-500" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">₹0</h2>
              <p className="text-gray-500 text-lg">Operational Costs</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
            <Stethoscope className="w-10 h-10 text-orange-500" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">0</h2>
              <p className="text-gray-500 text-lg">Doctors Available</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
            <Bed className="w-10 h-10 text-teal-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">0</h2>
              <p className="text-gray-500 text-lg">Beds Available</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow text-center flex flex-col">
            <div className="h-28 flex items-center justify-center">
              <img src={patient} alt="Patient Management" className="max-h-24 object-contain" />
            </div>
            <h3 className="font-semibold mt-2">Patient Management</h3>
            <div className="flex justify-center gap-2 mt-auto pt-3">
              <button className="bg-blue-300 px-3 rounded-full">Update</button>
              <button className="bg-green-300 px-3 rounded-full">View</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center flex flex-col">
            <div className="h-28 flex items-center justify-center">
              <img src={doctor} alt="Doctor Management" className="max-h-24 object-contain" />
            </div>
            <h3 className="font-semibold mt-2">Doctor Management</h3>
            <div className="flex justify-center gap-2 mt-auto pt-3">
              <button className="bg-blue-300 px-3 rounded-full">Update</button>
              <button className="bg-green-300 px-3 rounded-full">View</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center flex flex-col">
            <div className="h-28 flex items-center justify-center">
              <img src={diagnosis} alt="Diagnosis Management" className="max-h-24 object-contain" />
            </div>
            <h3 className="font-semibold mt-2">Diagnosis Management</h3>
            <div className="flex justify-center gap-2 mt-auto pt-3">
              <button className="bg-blue-300 px-3 rounded-full">Update</button>
              <button className="bg-green-300 px-3 rounded-full">View</button>
            </div>
          </div>

       

          <div className="bg-white p-4 rounded-xl shadow text-center flex flex-col">
            <div className="h-28 flex items-center justify-center">
              <img src={treatment} alt="Treatment Management" className="max-h-24 object-contain" />
            </div>
            <h3 className="font-semibold mt-2">Treatment Management</h3>
            <div className="flex justify-center gap-2 mt-auto pt-3">
              <button className="bg-blue-300 px-3 rounded-full">Update</button>
              <button className="bg-green-300 px-3 rounded-full">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDas;