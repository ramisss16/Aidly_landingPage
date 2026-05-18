// // 


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import profile from "../../../assets/apolohos.png"
// import patient from "../../../assets/patienapointment.png.jpg"
// import doctor from "../../../assets/doctormanagement.png.jpg"

// const ReceptionDash = () => {
//   const [openMenu, setOpenMenu] = useState("");

//   const toggleMenu = (name) => {
//     setOpenMenu(openMenu === name ? "" : name);
//   };

//   return (
//     <div className="min-h-screen bg-[#eef7f6] flex">
//       {/* Left Sidebar */}
//       <aside className="w-[230px] bg-white border-r-4 border-cyan-300 shadow-sm">
//         {/* <div className="bg-gradient-to-r from-[#1a5f48] to-[#3d7f68] text-white flex items-center gap-3 px-4 py-4 border-b-4 border-cyan-300">
//           <div className="w-11 h-11 bg-white rounded-sm flex items-center justify-center overflow-hidden">
//             <img
//               src="/logo.png"
//               alt="Aidly Logo"
//               className="w-full h-full object-contain"
//             />
//           </div>
//           <h1 className="text-4xl font-serif leading-none">Aidly Corporate</h1>
//         </div> */}

//         <div className="flex flex-col">
//           {["Staff Attendance", "Bed Availability", "Appointment Schedule", "Billing Records", "Payment Records"].map(
//             (item, index) => (
//               <div
//                 key={index}
//                 className="border-b-4 border-cyan-300 px-4 py-4 text-xl font-semibold bg-white hover:bg-cyan-50 transition"
//               >
//                 {item}
//               </div>
//             )
//           )}
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1">
//         {/* Top Bar */}
//         {/* <div className="bg-gradient-to-r from-[#1a5f48] to-[#3d7f68] text-white flex items-center justify-between px-6 py-4 border-b-4 border-cyan-300">
//           <div className="flex items-center gap-4">
//             <div className="text-5xl font-serif">Aidly Corporate</div>
//           </div>
//           <div className="flex items-center gap-5 text-2xl">
//             <span>👤</span>
//             <span>🔔</span>
//           </div>
//         </div> */}

//         {/* Hospital Header */}
//         <div className="bg-white px-6 py-3 border-b-2 border-gray-300 flex justify-end items-center">
//           <div className="text-right font-semibold leading-tight">
//             <div className="text-xl">Apollo Hospital</div>
//             <div className="text-xl">Bhopal M.P.</div>
//             <div className="text-lg">Pin code - 462026</div>
//           </div>
//           <img
//             src={profile}
//             alt="profile"
//             className="w-16 h-16 object-contain ml-4"
//           />
//         </div>

//         {/* Cards Area */}
//         <div className="p-4 grid grid-cols-1 xl:grid-cols-2 gap-4">
//           {/* Left Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-white rounded-2xl shadow p-4 text-center">
//               <div className="w-28 h-28 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-3">
//                 <img
//                   src={patient}
//                   alt="Patient"
//                   className="w-24 h-24 object-contain"
//                 />
//               </div>
//               <h3 className="text-xl font-bold mb-2">Patient Management</h3>
//               <div className="flex justify-center gap-2">
//                 <button className="bg-blue-300 hover:bg-blue-400 px-4 py-2 rounded-full font-semibold">
//                   Update
//                 </button>
//                 <button className="bg-green-300 hover:bg-green-400 px-4 py-2 rounded-full font-semibold">
//                   View
//                 </button>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow p-4 text-center">
//               <div className="w-28 h-28 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-3">
//                 <img
//                   src={doctor}
//                   alt="Doctor"
//                   className="w-24 h-24 object-contain"
//                 />
//               </div>
//               <h3 className="text-xl font-bold mb-2">Doctor Appointment Management</h3>
//               <div className="flex justify-center gap-2">
//                 <button className="bg-blue-300 hover:bg-blue-400 px-4 py-2 rounded-full font-semibold">
//                   Update
//                 </button>
//                 <button className="bg-green-300 hover:bg-green-400 px-4 py-2 rounded-full font-semibold">
//                   View
//                 </button>
//               </div>
//             </div>

//             <div className="bg-red-50 rounded-2xl shadow p-4">
//               <h3 className="font-bold text-red-700 mb-3">Emergency Handling</h3>
//               <div className="text-sm space-y-2">
//                 <div className="flex justify-between">
//                   <span>Active Emergency Cases</span>
//                   <span className="font-bold text-red-600">1</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Patient Name</span>
//                   <span>Rajesh Kumar</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Age / Gender</span>
//                   <span>60 / Male</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Condition</span>
//                   <span>Chest Pain</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Admitted At</span>
//                   <span>08:35 AM</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Status</span>
//                   <span className="text-red-600 font-semibold">Under Observation</span>
//                 </div>
//               </div>
//               <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-md font-semibold">
//                 Open Emergency Panel
//               </button>
//             </div>

//             <div className="bg-green-100 rounded-2xl shadow p-4 text-center">
//               <h3 className="text-xl font-bold mb-3">Patient History Quick View</h3>
//               <input
//                 type="text"
//                 placeholder="Patient Name/ID"
//                 className="w-full rounded-full px-4 py-2 mb-4 outline-none"
//               />
//               <button className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold">
//                 View
//               </button>
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="grid grid-cols-1 gap-4">
//             <div className="bg-white rounded-2xl shadow p-4">
//               <div className="flex justify-between items-center mb-3">
//                 <h3 className="font-semibold">Patient Check-in & Queue</h3>
//                 <div className="flex gap-2">
//                   <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
//                     + Add New Patient
//                   </button>
//                   <button className="bg-gray-200 px-3 py-1 rounded-md text-sm">
//                     Refresh
//                   </button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-4 gap-3 mb-4 text-center text-sm">
//                 <div className="bg-green-50 rounded-xl p-3">
//                   <div>Waiting</div>
//                   <div className="text-2xl font-bold">12</div>
//                 </div>
//                 <div className="bg-blue-50 rounded-xl p-3">
//                   <div>In Consultation</div>
//                   <div className="text-2xl font-bold">5</div>
//                 </div>
//                 <div className="bg-purple-50 rounded-xl p-3">
//                   <div>Completed</div>
//                   <div className="text-2xl font-bold">18</div>
//                 </div>
//                 <div className="bg-red-50 rounded-xl p-3">
//                   <div>Cancelled</div>
//                   <div className="text-2xl font-bold">2</div>
//                 </div>
//               </div>

//               <div className="overflow-hidden rounded-xl border">
//                 <table className="w-full text-sm">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="p-2 text-left">Token No.</th>
//                       <th className="p-2 text-left">Patient Name</th>
//                       <th className="p-2 text-left">Age / Gender</th>
//                       <th className="p-2 text-left">Status</th>
//                       <th className="p-2 text-left">Time</th>
//                       <th className="p-2 text-left">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {[
//                       ["T001", "Rahul Sharma", "34 / Male", "Waiting", "09:15 AM"],
//                       ["T002", "Priya Verma", "28 / Female", "Waiting", "09:17 AM"],
//                       ["T003", "Amit Singh", "45 / Male", "In Consultation", "09:06 AM"],
//                       ["T004", "Neha Gupta", "32 / Female", "Waiting", "09:20 AM"],
//                       ["T005", "Sanjay Patel", "50 / Male", "Completed", "08:50 AM"],
//                     ].map((row, i) => (
//                       <tr key={i} className="border-t">
//                         <td className="p-2">{row[0]}</td>
//                         <td className="p-2">{row[1]}</td>
//                         <td className="p-2">{row[2]}</td>
//                         <td className="p-2">{row[3]}</td>
//                         <td className="p-2">{row[4]}</td>
//                         <td className="p-2">
//                           <button className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="text-center mt-2 text-green-700 text-sm">
//                 View Full Queue →
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="bg-white rounded-2xl shadow p-4">
//                 <div className="flex items-center gap-2 text-red-600 font-semibold mb-2">
//                   ⚠ Emergency Handling
//                 </div>
//                 <div className="text-sm space-y-2">
//                   <div className="flex justify-between">
//                     <span>Active Emergency Cases</span>
//                     <span className="font-bold text-red-600">1</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Patient Name/ID</span>
//                     <span>Rajesh Kumar</span>
//                   </div>
//                 </div>
//                 <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-md">
//                   Open Emergency Panel
//                 </button>
//               </div>

//               <div className="bg-green-100 rounded-2xl shadow p-4 text-center">
//                 <h3 className="font-bold text-lg mb-3">Patient History Quick View</h3>
//                 <input
//                   type="text"
//                   placeholder="Patient Name/ID"
//                   className="w-full rounded-full px-4 py-2 mb-4 outline-none"
//                 />
//                 <button className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold">
//                   View
//                 </button>
//               </div>

//               <div className="bg-blue-100 rounded-2xl shadow p-4 text-center">
//                 <h3 className="font-bold text-lg mb-2">Notes section (Per patient)</h3>
//                 <input
//                   type="text"
//                   placeholder="Patient Name"
//                   className="w-full rounded-full px-4 py-2 mb-2 outline-none"
//                 />
//                 <textarea
//                   placeholder="Add Note"
//                   className="w-full rounded-xl px-4 py-2 h-20 outline-none resize-none mb-3"
//                 />
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold mb-2">
//                   Save Note
//                 </button>
//                 <button className="bg-indigo-500 text-white px-4 py-2 rounded-full font-semibold">
//                   View Saved Note
//                 </button>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow p-4 text-center">
//               <h3 className="font-bold text-lg mb-3">Patient Satisfaction</h3>
//               <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-orange-300 via-yellow-200 to-teal-400 flex items-center justify-center text-2xl font-bold text-white">
//                 52%
//               </div>
//               <div className="mt-3 text-sm flex justify-center gap-4">
//                 <span>Excellent 52%</span>
//                 <span>Okay 35%</span>
//                 <span>Poor 13%</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ReceptionDash;

import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import chart from "../../../assets/chart.png.jpg"

import diagnosis from "../../../assets/diagonosis.png.jpg"
import doctor from "../../../assets/doctormanagement.png.jpg"
import expenses from "../../../assets/expenses.png.jpg"
import patient from "../../../assets/patienapointment.png.jpg"
import satisfaction from "../../../assets/patient_satisfaction.jpg"
import treatment from "../../../assets/treatment.png.jpg"
import profile from "../../../assets/apolohos.png"


const Receptionist = () => {

  const {role} = useParams();

  const[open, setopen] = useState("StaffAttendence");

  const toggle = (name) => {
    if(open === name){
      setopen("")
    }else{
      setopen(name)
    }
  }

  return (


<div className="flex min-h-screen">

{/* Sidebar */}

<div className="w-64  bg-gradient-to-b from-[#1A5F48] via-[#89C9CA] to-[#C6EBE8] shadow p-1">

{/* Staff Attendance */}
<div
onClick={() => toggle("StaffAttendence")}
className="font-semibold text-lg bg-white p-3 px-8  mb-2"
>

Staff Attendance

{open === "StaffAttendence" && (

<div className="flex gap-2 mt-2">

<Link to={'/dashboard/${role}/staffattendence'}>
<button className="bg-blue-300 px-3 py-1 rounded-full">
Update
</button>
</Link>

<Link to={'/dashboard/${role}/viewAttendence'}>
<button className="bg-green-300 px-3 py-1 rounded-full">
View
</button>
</Link>

</div>

)}

</div>



{/* Bed Availibility */}
<div
onClick={() => toggle("BedAvailibility")}
className="font-semibold text-lg bg-white p-3 px-8 mb-2"
>

Bed Availibility

{open === "BedAvailibility" && (

<div className="flex gap-2 mt-2">

<button className="bg-blue-300 px-3 py-1 rounded-full">
Update
</button>

<button className="bg-green-300 px-3 py-1 rounded-full">
View
</button>

</div>

)}

</div>


{/* Staff Schedule */}
<div
onClick={() => toggle("StaffSchedule")}
className="font-semibold text-lg bg-white p-3 px-8  mb-2"
>

 Staff Schedule

{open === "StaffSchedule" && (

<div className="flex gap-2 mt-2">

<button className="bg-blue-300 px-3 py-1 rounded-full">
Update
</button>

<button className="bg-green-300 px-3 py-1 rounded-full">
View
</button>

</div>

)}

</div>





{/* Billing Records */}
<div
onClick={() => toggle("BillingRecords")}
className="font-semibold text-lg bg-white p-3 px-8  mb-2"
>

 Billing Records 

{open === "BillingRecords" && (

<div className="flex gap-2 mt-2">

<button className="bg-blue-300 px-3 py-1 rounded-full">
Update
</button>

<button className="bg-green-300 px-3 py-1 rounded-full">
View
</button>

</div>

)}

</div>


{/* Payment Records */}
<div
onClick={() => toggle("PaymentRecords")}
className="font-semibold text-lg bg-white p-3 px-8  mb-2"
>

 Payment Records 

{open === "PaymentRecords" && (

<div className="flex gap-2 mt-2">

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

{/* Main Section */}

<div className="flex-2 p-2">

{/* Header */}

<div className="flex justify-end items-center gap-7 mb-2">

  {/* Text Section */}
  <div className="text-right">
    <h1 className="text-xl font-bold">
      Apollo Hospital
    </h1>

    <p>Bhopal M.P</p>
    <p>Pin code - 462026</p>
  </div>

  {/* Image */}
  <img 
    src={profile} 
    alt="profile" 
    className="w-16 h-16 object-contain border "
  />

</div>

{/* Graph + Satisfaction */}

<div className="grid grid-cols-4 gap-4 mb-2">

{/* Graph */}

<div className="col-span-3 bg-white p-1 rounded-xl shadow">

<h3 className="font-semibold mb-2">
Patient Trends
</h3>

<img
src={chart}
className="w-100% h -60"
/>

</div>

{/* Satisfaction */}

<div className="bg-white  rounded-xl shadow">

<h3 className="font-semibold mb-3">
Patient Satisfaction
</h3>

<img
src={satisfaction}
className="w-80 h-90"
/>

</div>

</div>

{/* Stats Row */}

<div className="grid grid-cols-4 gap-4 mb-4">

<div className="bg-white p-2 rounded-xl shadow text-center">

<h2 className="text-xl font-bold">
405
</h2>

<p>Total Patients</p>

</div>

<div className="bg-white p-2 rounded-xl shadow text-center">

<h2 className="text-xl font-bold">
₹15.5L
</h2>

<p>Operational Costs</p>

</div>

<div className="bg-white p-5 rounded-xl shadow text-center">

<h2 className="text-2xl font-bold">
18
</h2>

<p>Doctors Available</p>

</div>

<div className="bg-white p-5 rounded-xl shadow text-center">

<h2 className="text-2xl font-bold">
87/112
</h2>

<p>Beds Available</p>

</div>

</div>

{/* Management Cards */}

<div className="grid grid-cols-3 gap-4">

{/* Patient */}

<div className="bg-white p-4 rounded-xl shadow text-center">

<img
src={patient}
className="w-24 mx-auto"
/>

<h3 className="font-semibold">
Patient Management
</h3>

<div className="flex justify-center gap-2 mt-2">

<Link to={'/dashboard/${role}/addpatient'}>
<button className="bg-blue-300 px-3 rounded-full">
Update
</button>
</Link>

<Link to={'/dashboard/${role}/viewpatient'}>
<button className="bg-green-300 px-3 rounded-full">
View
</button>
</Link>

</div>

</div>

{/* Doctor */}

<div className="bg-white p-4 rounded-xl shadow text-center">

<img
src={doctor}
className="w-24 mx-auto"
/>

<h3 className="font-semibold">
Doctor Management
</h3>

<div className="flex justify-center gap-2 mt-2">

<button className="bg-blue-300 px-3 rounded-full">
Update
</button>

<button className="bg-green-300 px-3 rounded-full">
View
</button>

</div>

</div>

{/* Diagnosis */}

<div className="bg-white p-4 rounded-xl shadow text-center">

<img
src={diagnosis}
className="w-24 mx-auto"
/>

<h3 className="font-semibold">
Diagnosis Management
</h3>

<div className="flex justify-center gap-2 mt-2">

<button className="bg-blue-300 px-3 rounded-full">
Update
</button>

<button className="bg-green-300 px-3 rounded-full">
View
</button>

</div>

</div>





</div>

</div>

</div>

)
}

 export default Receptionist;
