export default function AttendenceReacordPage() {

  const printAttendance = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A5F48] via-[#89C9CA] to-[#C6EBE8]">

      <div className="bg-gray-300 rounded-b-3xl py-22 relative mb-1">

        <div className="flex justify-center gap-4 absolute bottom-6 left-0 right-0">

          <label>Select month:</label>

          <input
            type="month"
            className="border rounded px-3 py-1"
          />

          <button
            onClick={printAttendance}
            className="bg-green-500 text-white px-4 py-1 rounded-full ml-12"
          >
            Print
          </button>

        </div>

        <div className="bg-white rounded-b-3xl p-6 text-center z-10 -mt-22">

          <h1 className="text-3xl font-bold">
            Attendance Record
          </h1>

        </div>

      </div>

    </div>
  );
}