// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const DeleteSuccess = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #1A5F48 0%, #4FA391 100%)' }}>
//       <div className="bg-white rounded-[40px] shadow-2xl p-16 text-center max-w-2xl w-full">
//         <h2 className="text-4xl font-bold text-black mb-2">
//           This Record Has Been
//         </h2>
//         <h2 className="text-4xl font-bold text-[#55E16D] mb-10">
//           Successfully Deleted
//         </h2>
        
//         <div className="flex justify-center mb-12">
//           <div className="w-40 h-40 bg-[#55E16D] rounded-full flex items-center justify-center shadow-lg relative">
//              <div className="absolute inset-0 bg-[#55E16D]/20 rounded-full animate-ping"></div>
//              {/* Simple Checkmark SVG */}
//              <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M10 30L30 50L70 10" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
//              </svg>
//           </div>
//         </div>
        
//         <button
//           onClick={() => navigate('/admin/dashboard')}
//           className="bg-[#1D7AFC] text-white font-bold py-4 px-12 rounded-full text-xl hover:bg-blue-600 transition-all shadow-lg"
//         >
//           Back to Dashboard
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DeleteSuccess;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DeleteSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const entityType = location.state?.entityType || "dashboard";

  const handleBack = () => {
    navigate(`/admin/entities/${entityType}`);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background:
          "linear-gradient(180deg, #1A5F48 0%, #4FA391 100%)",
      }}
    >
      <div className="bg-white rounded-[40px] shadow-2xl p-16 text-center max-w-2xl w-full">
        <h2 className="text-4xl font-bold text-black mb-2">
          This Record Has Been
        </h2>

        <h2 className="text-4xl font-bold text-[#55E16D] mb-10">
          Successfully Deleted
        </h2>

        <div className="flex justify-center mb-12">
          <div className="w-40 h-40 bg-[#55E16D] rounded-full flex items-center justify-center shadow-lg relative">
            <div className="absolute inset-0 bg-[#55E16D]/20 rounded-full animate-ping"></div>

            <svg
              width="80"
              height="60"
              viewBox="0 0 80 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 30L30 50L70 10"
                stroke="white"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <button
          onClick={handleBack}
          className="bg-[#1D7AFC] text-white font-bold py-4 px-12 rounded-full text-xl hover:bg-blue-600 transition-all shadow-lg"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default DeleteSuccess;