
// import React, { useState } from "react";
// import { Link, Outlet } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import chart from "../../../assets/chart.png.jpg"

// import diagnosis from "../../../assets/diagonosis.png.jpg"
// import doctor from "../../../assets/doctormanagement.png.jpg"
// import expenses from "../../../assets/expenses.png.jpg"
// import patient from "../../../assets/patienapointment.png.jpg"
// import satisfaction from "../../../assets/patient_satisfaction.jpg"
// import treatment from "../../../assets/treatment.png.jpg"
// import profile from "../../../assets/apolohos.png"


// const Receptionist = () => {

//   const {role} = useParams();

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

// <Link to="/dashboard/receptionist/staffattendance">
// <button className="bg-blue-300 px-3 py-1 rounded-full">
// Update
// </button>
// </Link>

// <Link to="/dashboard/receptionist/viewattendance">
// <button className="bg-green-300 px-3 py-1 rounded-full">
// View
// </button>
// </Link>

// </div>

// )}

// </div>



// {/* Bed Availibility */}
// <div
// onClick={() => toggle("BedAvailibility")}
// className="font-semibold text-lg bg-white p-3 px-8 mb-2"
// >

// Bed Availibility

// {open === "BedAvailibility" && (

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


// {/* Staff Schedule */}
// <div
// onClick={() => toggle("StaffSchedule")}
// className="font-semibold text-lg bg-white p-3 px-8  mb-2"
// >

//  Staff Schedule

// {open === "StaffSchedule" && (

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

// <div className="grid grid-cols-3 gap-4">

// {/* Patient */}

// <div className="bg-white p-4 rounded-xl shadow text-center">

// <img
// src={patient}
// className="w-24 mx-auto"
// />

// <h3 className="font-semibold">
// Patient Management
// </h3>

//             <div className="flex justify-center gap-2 mt-2">
              
// <Link to="/addpatient">
// <button className="bg-blue-300 px-3 rounded-full">
// Update
// </button>
// </Link>

// <Link to="/viewpatients">
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





// </div>

// </div>
// </div>

// )
// }

//  export default Receptionist;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  IndianRupee,
  Stethoscope,
  Bed,
  Menu,
  X,
  RefreshCw,
  Plus,
  Eye,
  HeartPulse,
  Bell,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

import api from "../../../service/api";
import { useOutletContext } from "react-router-dom";
import diagnosis from "../../../assets/diagonosis.png.jpg";
import doctor from "../../../assets/doctormanagement.png.jpg";
import expenses from "../../../assets/expenses.png.jpg";
import patient from "../../../assets/patienapointment.png.jpg";
import satisfactionImg from "../../../assets/patient_satisfaction.jpg";
import Ambulance from "../../../assets/AmbulanceImage.png";
import profile from "../../../assets/apolohos.png";

const ReceptionDas = () => {
  const role = localStorage.getItem("role");
  const [open, setopen] = useState("StaffAttendence");
  const { sidebarOpen, setSidebarOpen } = useOutletContext();
  const [clinic, setClinic] = useState({});

  const [queueData] = useState([
    {
      token: "T001",
      name: "Rahul Sharma",
      age: "34 / Male",
      status: "Waiting",
      time: "09:15 AM",
      statusColor: "text-emerald-600",
    },
    {
      token: "T002",
      name: "Priya Verma",
      age: "28 / Female",
      status: "In Consultation",
      time: "09:17 AM",
      statusColor: "text-blue-600",
    },
    {
      token: "T003",
      name: "Amit Singh",
      age: "45 / Male",
      status: "Waiting",
      time: "09:05 AM",
      statusColor: "text-emerald-600",
    },
    {
      token: "T004",
      name: "Neha Gupta",
      age: "32 / Female",
      status: "Completed",
      time: "09:20 AM",
      statusColor: "text-green-700",
    },
    {
      token: "T005",
      name: "Sanjay Patel",
      age: "50 / Male",
      status: "Waiting",
      time: "08:50 AM",
      statusColor: "text-emerald-600",
    },
  ]);

  const satisfactionData = [
    { name: "Excellent", value: 52 },
    { name: "Okay", value: 35 },
    { name: "Poor", value: 13 },
  ];

  const COLORS = ["#2C7A7B", "#F59E0B", "#A8DADC"];

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

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gradient-to-b
             from-[#1A5F48]
             via-[#89C9CA]
             to-[#C6EBE8]">
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
             className="font-semibold text-lg bg-white p-3 md:px-4 lg:px-8 mb-2 cursor-pointer rounded mx-2 mt-2"
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
             Bed Avalability
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
             onClick={() => toggle("AppointmentSchedule")}
             className="font-semibold text-lg bg-white p-3 px-4 lg:px-8 mb-2 cursor-pointer rounded mx-2"
           >
             Appointment Schedule
             {open === "AppointmentSchedule" && (
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
   
           
         </div>

      <div className="flex-1 h-screen overflow-y-auto overflow-x-hidden p-3">
      {/* <div className="lg:hidden sticky top-0 z-30 inline-flex items-center  bg-[#1A5F48] text-white px-4 py-3 rounded-xl shadow-md mb-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-md hover:bg-white/10"
                >
                  <Menu size={28} />
                </button>
      
                 </div> */}

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

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-2xl shadow p-4 flex items-center justify-center gap-3 min-h-[220px]">
            <div className="text-center">
              <img
                src={patient}
                alt="Patient Management"
                className="w-36 h-36 object-contain mx-auto"
              />
              <h3 className="font-bold text-xl mt-2">Patient Management</h3>
              <div className="flex justify-center gap-2 mt-3">
                <button className="bg-blue-400 text-white px-4 py-1 rounded-full font-semibold">
                  Update
                </button>
                <button className="bg-emerald-400 text-white px-4 py-1 rounded-full font-semibold">
                  View
                </button>
              </div>
            </div>

            <div className="text-center">
              <img
                src={doctor}
                alt="Doctor Management"
                className="w-36 h-36 object-contain mx-auto"
              />
              <h3 className="font-bold text-xl mt-2">Doctor Appointment Management</h3>
              <div className="flex justify-center gap-2 mt-3">
                <button className="bg-blue-400 text-white px-4 py-1 rounded-full font-semibold">
                  Update
                </button>
                <button className="bg-emerald-400 text-white px-4 py-1 rounded-full font-semibold">
                  View
                </button>
              </div>
            </div>
          </div>

          <div className="xl:col-span-2 bg-white rounded-2xl shadow p-4 border border-[#dfeceb]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm md:text-lg font-bold text-gray-900">
                Patient Check-in & Queue
              </h2>
              <div className="flex items-center gap-2">
                <button className="bg-emerald-500 text-white text-sm px-2 md:px-4 py-1 md:py-2 rounded-lg flex items-center ">
                  <Plus size={16} />
                  Add New Patient
                </button>
                <button className="text-gray-600 text-sm flex items-center gap-1">
                  <RefreshCw size={14} />
                  Refresh
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-[#eef8f2] rounded-xl p-3 text-center">
                <p className="text-sm text-gray-600">Waiting</p>
                <h3 className="text-2xl font-bold text-gray-900">12</h3>
              </div>
              <div className="bg-[#edf4ff] rounded-xl p-3 text-center">
                <p className="text-sm text-gray-600">In Consultation</p>
                <h3 className="text-2xl font-bold text-gray-900">5</h3>
              </div>
              <div className="bg-[#eef8ef] rounded-xl p-3 text-center">
                <p className="text-sm text-gray-600">Completed</p>
                <h3 className="text-2xl font-bold text-gray-900">18</h3>
              </div>
              <div className="bg-[#fdeff1] rounded-xl p-3 text-center">
                <p className="text-sm text-gray-600">Cancelled</p>
                <h3 className="text-2xl font-bold text-gray-900">2</h3>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-3">Token No.</th>
                    <th className="py-3">Patient Name</th>
                    <th className="py-3">Age / Gender</th>
                    <th className="py-3">Status</th>
                    <th className="py-3">Time</th>
                    <th className="py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {queueData.map((item) => (
                    <tr key={item.token} className="border-b last:border-b-0">
                      <td className="py-3 font-medium">{item.token}</td>
                      <td className="py-3">{item.name}</td>
                      <td className="py-3">{item.age}</td>
                      <td className={`py-3 font-medium ${item.statusColor}`}>
                        {item.status}
                      </td>
                      <td className="py-3">{item.time}</td>
                      <td className="py-3">
                        <button className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center text-emerald-700 font-medium mt-3">
              View Full Queue →
            </div>
          </div>
        </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
  <div className="bg-[#fff5f5] rounded-2xl shadow border border-red-100 p-4 flex flex-col">
    <div className="flex items-center gap-2 mb-3 text-red-600 font-semibold text-sm">
      <Bell size={16} />
      Emergency Handling
    </div>

    <div className="text-sm text-gray-700 space-y-3">
      <div className="flex justify-between items-center">
        <span>Active Emergency Cases</span>
        <span className="text-2xl font-bold text-red-600">1</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-gray-500">Patient Name</p>
          <p>Rajesh Kumar</p>
        </div>

        <div>
          <p className="text-gray-500">Age / Gender</p>
          <p>60 / Male</p>
        </div>

        <div>
          <p className="text-gray-500">Condition</p>
          <p>Chest Pain</p>
        </div>

        <div>
          <p className="text-gray-500">Admitted At</p>
          <p>08:55 AM</p>
        </div>
      </div>

      <div className="flex justify-end">
        <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
          Under Observation
        </span>
      </div>
    </div>

    <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold">
      Open Emergency Panel
    </button>
  </div>

  <div className="bg-[#e0f3df] rounded-2xl shadow border border-green-100 p-4 flex flex-col">
    <h3 className="font-bold text-lg text-center mb-5">
      Patient History Quick View
    </h3>

    <div>
      <label className="text-sm font-semibold">Patient Name / ID</label>
      <input
        type="text"
        placeholder="Enter Patient Name or ID"
        className="w-full mt-2 px-4 py-3 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>

    <button className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-full font-semibold">
      View
    </button>
  </div>

  <div className="bg-[#dbe5ff] rounded-2xl shadow border border-blue-100 p-4 flex flex-col">
    <h3 className="font-bold text-lg text-center mb-4">
      Notes Section
      <br />
      (Per Patient)
    </h3>

    <div className="space-y-3">
      <div>
        <label className="text-sm font-semibold">Patient Name</label>
        <input
          type="text"
          className="w-full mt-1 px-4 py-3 rounded-full border border-gray-300 outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-semibold">Add Note</label>
        <textarea
          rows={4}
          className="w-full mt-1 px-4 py-3 rounded-2xl border border-gray-300 resize-none outline-none"
        />
      </div>
    </div>

    <div className="mt-4 space-y-2">
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full font-semibold">
        Save Note
      </button>

      <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-full font-semibold">
        View Saved Note
      </button>
    </div>
  </div>

  <div className="bg-white rounded-2xl shadow border border-gray-100 p-4 flex flex-col">
    <h3 className="font-bold text-lg text-center mb-4">
      Patient Satisfaction
    </h3>

    <div className="w-full h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={satisfactionData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            dataKey="value"
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
</div>
</div>
    </div>
  );
};

export default ReceptionDas;