
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ClinicMan_TermsCondition = () => {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A5F48] via-[#89C9CA] to-[#C6EBE8] p-4">
      {/* Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-5 sm:p-8 -mt-15">
        
        {/* Header */}
        <div className="flex items-center mb-4">
          <ArrowLeft onClick={()=>navigate(-1)} className="w-5 h-5 cursor-pointer" />
          <h2 className="flex-1 text-center text-lg sm:text-xl font-semibold">
            Terms and Conditions
          </h2>
        </div>

        {/* Content */}
        <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-4">
          <p>
            By signing up as a Clinic Administrator, you agree to provide
            accurate information, keep your account credentials secure, and use
            the platform only for authorized clinic management purposes. You
            must comply with applicable healthcare and data protection laws.
            The system may suspend or terminate accounts in case of misuse or
            policy violations. By continuing, you accept these terms and
            conditions.
          </p>

          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Data Privacy Consent
            </h3>
            <p>
              By signing up, you consent to the collection, storage, and
              processing of your personal and clinic-related data for system
              operations and service improvement. All data is handled securely
              and in compliance with applicable data protection laws. Your
              information will not be shared with third parties without consent,
              except where required by law. By continuing, you agree to this
              data privacy policy.
            </p>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-start gap-2 mt-5">
          <input
            type="checkbox"
            id="terms"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1 h-4 w-4 accent-blue-600 cursor-pointer"
          />
          <label
            htmlFor="terms"
            className="text-sm text-gray-700 cursor-pointer"
          >
            I have read and agree to the{" "}
            <span className="font-medium text-blue-600">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="font-medium text-blue-600">
              Privacy Policy
            </span>.
          </label>
        </div>

        {/* Button */}
        {accepted ? (
          <Link to="/succesful-add-manager">
            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-lg font-medium shadow-md">
              Accept and Continue
            </button>
          </Link>
        ) : (
          <button
            disabled
            className="mt-6 w-full bg-gray-400 cursor-not-allowed text-white py-2.5 rounded-lg font-medium shadow-md"
          >
            Accept and Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default ClinicMan_TermsCondition;