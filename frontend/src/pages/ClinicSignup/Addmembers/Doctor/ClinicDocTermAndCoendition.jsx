import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ClinicDoc_TermsCondition = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A5F48] via-[#89C9CA] to-[#C6EBE8] p-4">
      
      {/* Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-5 sm:p-8 -mt-15">
        
        {/* Header */}
        <div className="flex items-center mb-4">
          <ArrowLeft className="w-5 h-5 cursor-pointer" />
          <h2 className="flex-1 text-center text-lg sm:text-xl font-semibold">
            Terms and Condition
          </h2>
        </div>

        {/* Content */}
        <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-4">
          
          <p>
            By signing up as a Clinic Administrator, you agree to provide accurate
            information, keep your account credentials secure, and use the platform
            only for authorized clinic management purposes. You must comply with
            applicable healthcare and data protection laws. The system may suspend
            or terminate accounts in case of misuse or policy violations. By
            continuing, you accept these terms and conditions.
          </p>

          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Data Privacy Consent
            </h3>
            <p>
              By signing up, you consent to the collection, storage, and processing
              of your personal and clinic-related data for system operations and
              service improvement. All data is handled securely and in compliance
              with applicable data protection laws. Your information will not be
              shared with third parties without consent, except where required by
              law. By continuing, you agree to this data privacy policy.
            </p>
          </div>
        </div>

        {/* Button */}
        <Link to = "/succesful-add-doctor">
        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-lg font-medium shadow-md">
          Accept and Continue
        </button>
        </Link>
      </div>
    </div>
  );
};

export default ClinicDoc_TermsCondition;