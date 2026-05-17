import { useState } from "react";
import { Link } from "react-router-dom";

const staffData = [
  { id: 101, name: "Dr. Sarah Mitchell", time: "8:00 AM" },
  { id: 102, name: "Nurse John Carter", time: "8:02 AM" },
  { id: 103, name: "Dr. Amit Sharma", time: "8:03 AM" },
  { id: 104, name: "Emily Ross", time: "8:05 AM" },
  { id: 105, name: "Dr. Lisa Wong", time: "8:07 AM" },
  { id: 106, name: "James Miller", time: "8:08 AM" },
  { id: 105, name: "Dr. Lisa Wong", time: "8:07 AM" },
  { id: 106, name: "James Miller", time: "8:08 AM" },
  { id: 105, name: "Dr. Lisa Wong", time: "8:07 AM" },
  { id: 106, name: "James Miller", time: "8:08 AM" },
  { id: 105, name: "Dr. Lisa Wong", time: "8:07 AM" },
  { id: 106, name: "James Miller", time: "8:08 AM" },
  { id: 105, name: "Dr. Lisa Wong", time: "8:07 AM" },
  { id: 106, name: "James Miller", time: "8:08 AM" },
  { id: 105, name: "Dr. Lisa Wong", time: "8:07 AM" },
  { id: 106, name: "James Miller", time: "8:08 AM" },
];

export default function AttendancePage() {
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState({});

  const handleChange = (id, value) => {
    setAttendance({
      ...attendance,
      [id]: value,
    });
  };

  const saveAttendance = () => {
    console.log("Saved Data:", attendance);
    alert("Attendance Saved");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A5F48] via-[#89C9CA] to-[#C6EBE8] ">


<div className="bg-gray-300 rounded-b-4xl py-22 relative  mb-1">

<div className="flex justify-center gap-4 absolute bottom-6 left-0 right-0">

<label>Select date:</label>

  <input
    type="date"
    value={date} 
    onChange={(e) => setDate(e.target.value)}
    className="border rounded px-3 py-1"
  />

<Link to="/dashboard/receptionist/staffsuccessful">
  <button onClick={saveAttendance} className="bg-green-500 text-white px-4 py-1 rounded-full">
    Save
  </button>
</Link>

</div>
  
  
      <div className="bg-white rounded-b-4xl p-6 text-center z-10 -mt-22  ">
  <h1 className="text-3xl font-bold">
    Update Staff Attendance
  </h1>
</div>

</div>
     

    


     

      {/* Table */}
      <div className=" max-w-5xl bg-white shadow rounded-lg p-4 mx-auto text-center">

        <table className="w-full border text-center">

          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Present</th>
              <th className="border p-2">Absent</th>
              <th className="border p-2">Leave</th>
              <th className="border p-2">Time</th>
            </tr>
          </thead>

          <tbody>
            {staffData.map((staff) => (
              <tr key={staff.id}>

                <td className="border p-2">{staff.id}</td>

                <td className="border p-2 text-left">
                  {staff.name}
                </td>

                <td className="border p-2">
                  <input
                    type="radio"
                    name={`status-${staff.id}`}
                    onChange={() => handleChange(staff.id, "Present")}
                  />
                </td>

                <td className="border p-2">
                  <input
                    type="radio"
                    name={`status-${staff.id}`}
                    onChange={() => handleChange(staff.id, "Absent")}
                  />
                </td>

                <td className="border p-2">
                  <input
                    type="radio"
                    name={`status-${staff.id}`}
                    onChange={() => handleChange(staff.id, "Leave")}
                  />
                </td>

                <td className="border p-2">{staff.time}</td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}