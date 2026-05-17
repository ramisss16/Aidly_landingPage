import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";
import api from "../../service/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ClinicAdminDetails = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  // otp send -> verification
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

 const [formData, setFormData] =
  useState(() => {
    const savedData =
      sessionStorage.getItem(
        "clinicAdminForm"
      );

    return savedData
      ? JSON.parse(
          savedData
        )
      : {};
  });

 const handleChange = (e) => {
  const {
    name,
    value,
    files
  } = e.target;

  const updatedData = {
    ...formData,
    [name]:
      files &&
      files.length > 0
        ? files[0]
        : value,
  };

  setFormData(
    updatedData
  );

  sessionStorage.setItem(
    "clinicAdminForm",
    JSON.stringify(
      updatedData
    )
  );
};

  const handleSubmit = async () => {

    if (!otpVerified) {
  return alert("Please verify OTP first");
}

    if (formData.Createpassword !== formData.confirmPassword) {
      alert("Passwords do not match");

      return;
    }

    try {
      setLoading(true);

      const clinicId = sessionStorage.getItem("clinicId");

      if (!clinicId) {
        alert("Clinic not found");
        return;
      }

      const form = new FormData();

      form.append("adminName", formData.fullName);
      form.append("email", formData.email);
      form.append("phone", formData.phonenumber);
      form.append("password", formData.Createpassword);

      if (formData.idProof) {
        form.append("aadhaarDocument", formData.idProof);
      }

      const res = await api.put(`clinic/clinic/update/${clinicId}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("UPDATED:", res.data);

      alert("Clinic Details Updated Successfully");

      // clear saved form
sessionStorage.removeItem(
  "clinicAdminForm"
);

      navigate("/Clinic_termAndCondition");
    } catch (err) {
      console.log("API ERROR:", err.response?.data || err);

      alert(err.response?.data?.message || "Error updating clinic");
    } finally {
      setLoading(false);
    }
  };

  // send otp function
  const sendOTP = async () => {
    try {
      if (!formData.phonenumber) {
        return alert("Enter phone number");
      }

      setOtpLoading(true);

      const response = await api.post(
        "/otp/send",
        {
          phone: `+91${formData.phonenumber}`,
        }
      );

      alert(response.data.message);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to send OTP"
      );
    } finally {
      setOtpLoading(false);
    }
  };

 // verifiy otp function
  const verifyOTP = async () => {
    try {
      if (!formData.otp) {
        return alert("Enter OTP");
      }

      setOtpLoading(true);

      const response = await api.post(
        "/otp/verify",
        {
          phone: `+91${formData.phonenumber}`,
          otp: formData.otp,
        }
      );

      if (response.data.success) {
        setOtpVerified(true);
        alert("OTP Verified Successfully");
      }

    } catch (error) {
      console.log(error);

      setOtpVerified(false);

      alert(
        error.response?.data?.message ||
        "Invalid OTP"
      );
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-white border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A5F48] via-[#89C9CA] to-[#C6EBE8] p-4">
        <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6 md:p-8 border">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <ArrowLeftIcon onClick={()=>navigate(-1)} className="w-6 h-6 text-black cursor-pointer" />
            <h2 className="text-xl md:text-2xl font-bold mx-auto">
              Clinic Admin Detail
            </h2>
          </div>

          <div className="flex items-center md:gap-2 mb-5">
            <label className="text-sm sm:text-lg font-semibold w-28 sm:w-48 ml-2 sm:ml-10">
              Full Name
            </label>

            <input
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
              className="flex-1 min-w-0 bg-gray-200 p-2 rounded-md outline-none text-sm sm:text-base"
            />
          </div>

          <div className="flex items-center md:gap-2 mb-5">
            <label className="text-sm sm:text-lg font-semibold w-28 sm:w-48 ml-2 sm:ml-10">
              Email Address
            </label>

            <input
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="flex-1 min-w-0 bg-gray-200 p-2 rounded-md outline-none text-sm sm:text-base"
            />
          </div>

          <div className="flex items-start sm:items-center md:gap-2 mb-5">
            <label className="text-sm sm:text-lg font-semibold w-28 sm:w-48 ml-2 sm:ml-10">
              Phone Number
            </label>

            <div className="flex flex-col sm:flex-row flex-1 gap-2 sm:gap-5">
              <input
                name="phonenumber"
                value={formData.phonenumber || ""}
                onChange={handleChange}
                className="w-full sm:flex-1 min-w-0 bg-gray-200 p-2 rounded-md outline-none text-sm sm:text-base"
              />

              <button
                type="button"
                onClick={sendOTP}
                disabled={otpLoading}
                className="bg-blue-600 text-white px-3 sm:px-5 py-1 sm:py-2 rounded-md text-sm sm:text-base w-fit sm:w-auto hover:bg-blue-700"
              >
                {otpLoading ? "Sending..." : "Get OTP"}
              </button>
            </div>
          </div>

          <div className="flex flex-col items-start md:gap-2 mb-5">
            <label className="text-sm sm:text-lg font-semibold w-full ml-2 mb-2 sm:ml-10">
              Enter the OTP sent on your mobile number
            </label>

            <div className="flex flex-row flex-1 gap-3 sm:gap-5 sm:ml-[240px] ml-[120px]">
              <input
                name="otp"
                value={formData.otp || ""}
                onChange={handleChange}
                className="sm:w-full w-[80px] sm:flex-1 min-w-0 bg-gray-200 p-2 rounded-md outline-none text-sm sm:text-base"
              />

              <button
                type="button"
                onClick={verifyOTP}
                disabled={otpLoading}
                className={`text-white px-2 sm:px-5 py-1 sm:py-2 rounded-md text-sm sm:text-base w-fit sm:w-auto
  ${otpVerified
                    ? "bg-green-600"
                    : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {otpVerified ? "Verified" : "Verify"}
              </button>
            </div>
          </div>

          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Upload an ID Proof (Adhar or PAN)
          </h3>

          <div className="border-2 border-dashed border-blue-500 mx-auto rounded-lg flex flex-col items-center justify-center p-8 mb-2">
            <p className="text-gray-500 mb-4 text-center">DRAG FILE HERE OR</p>

            <input
              type="file"
              name="idProof"
              onChange={handleChange}
              className="hidden"
              id="idUpload"
            />

            <label
              htmlFor="idUpload"
              className="bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-blue-700"
            >
              Browse
            </label>

            {formData.idProof && (
              <p className="text-green-600 mt-2 text-sm">
                {formData.idProof.name}
              </p>
            )}
          </div>

          <p className="text-gray-500 text-center mb-8">
            Supported file types: .PDF .PNG .JPG
          </p>

          {["Doctor", "Manager", "Receptionist"].map((role) => (
            <div
              key={role}
              onClick={() => navigate(`/add-${role.toLowerCase()}`)}
              className="w-[250px] sm:w-[300px] flex items-center mx-auto gap-6 bg-gray-200 rounded-xl mb-3 cursor-pointer hover:bg-gray-300 transition"
            >
              <div className="w-12 h-12 sm:w-17 sm:h-17 border-2 border-dashed border-blue-500 flex items-center justify-center text-2xl text-blue-600 rounded-md">
                +
              </div>
              <span className="text-lg">Add an {role}</span>
            </div>
          ))}

          <div className="flex items-center md:gap-2 mb-5">
            <label className="text-sm sm:text-lg font-semibold w-30 sm:w-48 ml-2 sm:ml-10">
              Create password
            </label>

            <div className="relative flex-1">
              <input
                type={showPassword ? "text" : "password"}
                name="Createpassword"
                value={formData.Createpassword || ""}
                onChange={handleChange}
                className="w-full bg-gray-200 p-2 rounded-md outline-none text-sm sm:text-base pr-10"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="flex items-center md:gap-2 mb-5">
            <label className="text-sm sm:text-lg font-semibold w-30 sm:w-48 ml-2 sm:ml-10">
              Confirm Password
            </label>

            <div className="relative flex-1">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword || ""}
                onChange={handleChange}
                className="w-full bg-gray-200 p-2 rounded-md outline-none text-sm sm:text-base pr-10"
              />

              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-10 py-2 rounded-md text-lg shadow-md hover:bg-blue-700 flex items-center justify-center mx-auto"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default ClinicAdminDetails;