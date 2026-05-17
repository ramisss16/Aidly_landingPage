import React, {useState} from "react";
import { ArrowLeft, Search } from "lucide-react";

const patients = [
  {
    name: "Ms. Pooja Singh",
    id: "PAT0001",
    phone: "+5722-1112",
    age: 28,
    gender: "Female",
    visit: "Today, 9:45 AM",
    status: "Admitted",
  },
  {
    name: "Mr. Suresh Thakur",
    id: "PAT0002",
    phone: "+6722-4112",
    age: 62,
    gender: "Female",
    visit: "Today, 9:40 AM",
    status: "In Treatment",
  },
  {
    name: "Mrs. Neeta Sharma",
    id: "PAT0003",
    phone: "+5722-7812",
    age: 50,
    gender: "Female",
    visit: "Today, 9:10 AM",
    status: "Recovering",
  },
  {
    name: "Master Rohan Gupta",
    id: "PAT0004",
    phone: "+6722-6112",
    age: 12,
    gender: "Male",
    visit: "Yesterday, 5:30 PM",
    status: "Under Observation",
  },
  {
    name: "Mr. Vikram Patel",
    id: "PAT0005",
    phone: "+6722-9812",
    age: 41,
    gender: "Male",
    visit: "Yesterday, 4:00 PM",
    status: "Discharged",
  },
];

const statusColor = {
  Admitted: "bg-green-100 text-green-700",
  "In Treatment": "bg-teal-100 text-teal-700",
  Recovering: "bg-green-200 text-green-700",
  "Under Observation": "bg-cyan-100 text-cyan-700",
  Discharged: "bg-gray-200 text-gray-600",
};

export default function MyPatients() {

  const [search, setsearch] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const FilterPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.toLowerCase().includes(search.toLowerCase()) ||
    p.age.toString().includes(search) ||
    p.gender.toLowerCase().includes(search.toLowerCase()) ||
    p.status.toLowerCase().includes(search.toLowerCase())
  );

  // pagination logic
  const visiblePatients = FilterPatients.slice(0, rowsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#7ab5b1] to-[#b8e2df] ">

<div className="bg-white p-6 mb-2 rounded-b-4xl">
  <div className="flex items-center justify-center relative mb-6">
    <ArrowLeft className="absolute left-0 cursor-pointer" size={28} />
    <h1 className="text-3xl font-bold">My Patients</h1>
  </div>
</div>

<div className="bg-white rounded-3xl shadow-lg p-6 max-w-7xl mx-auto ">

{/* Search */}
<div className="flex items-center border rounded-lg px-3 py-2 w-full md:w-96 mb-4">
  <Search size={18} className="text-gray-400" />
  <input
    type="text"
    placeholder="Search by name, phone, or ID..."
    className="outline-none ml-2 w-full"
    value={search}
    onChange={(e)=>setsearch(e.target.value)}
  />
</div>

{/* Table */}
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">

<thead className="bg-gray-100 text-gray-600">
<tr>
<th className="p-3">Patient Name</th>
<th className="p-3">Phone / ID</th>
<th className="p-3">Age</th>
<th className="p-3">Gender</th>
<th className="p-3">Last Visit</th>
<th className="p-3">Status</th>
<th className="p-3">Actions</th>
</tr>
</thead>

<tbody>

{visiblePatients.map((p, index) => (
<tr key={index} className="border-b hover:bg-gray-50 transition">

<td className="p-3">
<div className="font-semibold">{p.name}</div>
<div className="text-sm text-gray-400">{p.id}</div>
</td>

<td className="p-3">
<div>{p.phone}</div>
<div className="text-sm text-gray-400">{p.id}</div>
</td>

<td className="p-3">{p.age}</td>

<td className="p-3">{p.gender}</td>

<td className="p-3">{p.visit}</td>

<td className="p-3">
<span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[p.status]}`}>
{p.status}
</span>
</td>

<td className="p-3">
<button className="bg-teal-500 text-white px-4 py-1 rounded-md">
View
</button>
</td>

</tr>
))}

</tbody>

</table>
</div>

{/* Footer */}
<div className="flex justify-between items-center mt-6 text-sm">

<p className="text-gray-500">
Showing {visiblePatients.length} out of {FilterPatients.length} patients
</p>

<div className="flex items-center gap-2">

<select
className="border px-2 py-1 rounded"
value={rowsPerPage}
onChange={(e)=>setRowsPerPage(Number(e.target.value))}
>

{Array.from({length: FilterPatients.length}, (_,i)=>(
<option key={i} value={i+1}>
{i+1}
</option>
))}

</select>

<button className="px-3 py-1 border rounded bg-teal-500 text-white">
1
</button>

<button className="px-3 py-1 border rounded">2</button>
<button className="px-3 py-1 border rounded">3</button>

<button className="px-3 py-1 border rounded">
Next
</button>

</div>
</div>

</div>
</div>
);
}