import successIcon from "../../assets/success.png";
import { Link } from "react-router-dom";

export default function Patientsuccess() {

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#1A5F48] via-[#6FAFB0] to-[#C6EBE8]">

      {/* Card */}
      <div className="bg-gray-100 rounded-3xl shadow-xl px-14 py-10 text-center w-[700px]">

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">
          Your Record Has Been
        </h1>

        <h2 className="text-3xl font-bold text-green-500 mb-6">
          Successfully Saved
        </h2>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <img
            src={successIcon}
            alt="success"
            className="w-40"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          
          <Link to="/viewpatients">
          <button className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800">
            view records
          </button>
          </Link>

           <Link to="/addpatient">
          <button className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600">
            Update Another Record
          </button>
          </Link>

          <Link to="/dashboard/receptionist">
          <button className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800">
            Back to Dashboard
          </button>
           </Link>

        </div>
      </div>
    </div>
  );
}