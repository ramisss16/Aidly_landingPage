import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../../service/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Clinic_Receptionist_Details = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [formData, setFormData] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const sendOTP = async () => {
    try {
      if (!formData.phonenumber) {
        return alert("Enter phone number");
      }

      setOtpLoading(true);

      const response = await api.post("/otp/send", {
        phone: `+91${formData.phonenumber}`,
      });

      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOTP = async () => {
    try {
      if (!formData.otp) {
        return alert("Enter OTP");
      }

      setOtpLoading(true);

      const response = await api.post("/otp/verify", {
        phone: `+91${formData.phonenumber}`,
        otp: formData.otp,
      });

      if (response.data.success) {
        setOtpVerified(true);
        alert("OTP Verified Successfully");
      }
    } catch (error) {
      console.log(error);
      setOtpVerified(false);
      alert(error.response?.data?.message || "Invalid OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async () => {
   
         if (!otpVerified) {
  return alert("Please verify OTP first");

}
    try {
      setLoading(true);

      if (formData.Createpassword !== formData.confirmPassword) {
        alert("Passwords do not match");
        setLoading(false);
        return;
      }

      const clinicId = sessionStorage.getItem("clinicId");

      if (!clinicId) {
        alert("Clinic not found");
        setLoading(false);
        return;
      }

      const form = new FormData();

      form.append("clinicId", clinicId);
      form.append("name", formData.fullName);
      form.append("email", formData.email);
      form.append("phone", formData.phonenumber);
      form.append("password", formData.Createpassword);
      form.append("specialization", formData.specialization);

      if (formData.photo) {
        form.append("photo", formData.photo);
      }

      if (formData.aadhaarDocument) {
        form.append("aadhaarDocument", formData.aadhaarDocument);
      }

      if (formData.experienceCertificate) {
        form.append("experienceCertificate", formData.experienceCertificate);
      }

      const response = await api.post("/clinic/receptionist/register", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      alert("Receptionist Added Successfully");

      sessionStorage.setItem("receptionistId", response.data.data.receptionistId);

      console.log(response.data.data.receptionistId);

      navigate("/Clinicrec_TermAndCondition");
    } catch (err) {
      console.log(err.response?.data);

      alert(err.response?.data?.message || "Error adding Receptionist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

    <form 
      onSubmit={async(e) => {
      e.preventDefault();
      await handleSubmit();
    }}>
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-white border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A5F48] via-[#89C9CA] to-[#C6EBE8] p-4">
        <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6 md:p-8 border">
          <div className="flex items-center gap-3 mb-8">
            <ArrowLeftIcon
              className="w-6 h-6 text-black cursor-pointer"
              onClick={() => navigate("/clinic_Admin_Details")}
            />
            <h2 className="text-xl md:text-2xl font-bold mx-auto">
              Clinic Receptionist Detail
            </h2>
          </div>

          <div className="flex items-center md:gap-2 mb-5">
            <label className="text-sm sm:text-lg font-semibold w-28 sm:w-48 ml-2 sm:ml-10">
              Full Name <span className="px-2 text-red-600">*</span>
            </label>
            <input
              required
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
              className="flex-1 min-w-0 bg-gray-200 p-2 rounded-md outline-none text-sm sm:text-base"
            />
          </div>

          <div className="flex items-center md:gap-2 mb-5">
            <label className="text-sm sm:text-lg font-semibold w-28 sm:w-48 ml-2 sm:ml-10">
              Email Address <span className="px-2 text-red-600">*</span>
            </label>
            <input
              required
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
                className={`text-white px-2 sm:px-5 py-1 sm:py-2 rounded-md text-sm sm:text-base w-fit sm:w-auto ${
                  otpVerified ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {otpVerified ? "Verified" : "Verify"}
              </button>
            </div>
          </div>

          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Upload Photo
          </h3>

          <div className="border-2 border-dashed border-blue-500 mx-auto rounded-lg flex flex-col items-center justify-center p-8 mb-2">
            <p className="text-gray-500 mb-4 text-center">DRAG FILE HERE OR</p>

            <input
              type="file"
              name="photo"
              onChange={handleChange}
              className="hidden"
              id="photoUpload"
            />

            <label
              htmlFor="photoUpload"
              className="bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-blue-700"
            >
              Browse
            </label>

            {formData.photo && (
              <p className="text-green-600 mt-2 text-sm">
                {formData.photo.name}
              </p>
            )}
          </div>

          <p className="text-gray-500 text-center mb-8">
            Supported file types: .PDF .PNG .JPG
          </p>

          <div className="flex items-center md:gap-2 mb-5">
            <label className="text-sm sm:text-lg font-semibold w-28 sm:w-48 ml-2 sm:ml-10">
              Employee ID
            </label>
            <input
              name="specialization"
              value={formData.specialization || ""}
              onChange={handleChange}
              className="flex-1 min-w-0 bg-gray-200 p-2 rounded-md outline-none text-sm sm:text-base"
            />
          </div>

          <div className="flex items-center md:gap-2 mb-5">
            <label className="text-sm sm:text-lg font-semibold w-28 sm:w-48 ml-2 sm:ml-10">
              Admin Name (Working Under)
            </label>
            <input
              name="Adminname"
              value={formData.Adminname || ""}
              onChange={handleChange}
              className="flex-1 min-w-0 bg-gray-200 p-2 rounded-md outline-none text-sm sm:text-base"
            />
          </div>

          <div className="flex items-center md:gap-2 mb-5">
            <label className="text-sm sm:text-lg font-semibold w-28 sm:w-48 ml-2 sm:ml-10">
              Admin ID
            </label>
            <input
              name="AdminID"
              value={formData.AdminID || ""}
              onChange={handleChange}
              className="flex-1 min-w-0 bg-gray-200 p-2 rounded-md outline-none text-sm sm:text-base"
            />
          </div>

          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Upload an ID Experience Certificate
          </h3>

          <div className="border-2 border-dashed border-blue-500 mx-auto rounded-lg flex flex-col items-center justify-center p-8 mb-2">
            <p className="text-gray-500 mb-4 text-center">DRAG FILE HERE OR</p>

            <input
              type="file"
              name="experienceCertificate"
              onChange={handleChange}
              className="hidden"
              id="experienceUpload"
            />

            <label
              htmlFor="experienceUpload"
              className="bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-blue-700"
            >
              Browse
            </label>

            {formData.experienceCertificate && (
              <p className="text-green-600 mt-2 text-sm">
                {formData.experienceCertificate.name}
              </p>
            )}
          </div>

          <p className="text-gray-500 text-center mb-8">
            Supported file types: .PDF .PNG .JPG
          </p>

          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Upload an ID Proof (Aadhar or PAN) <span className="px-2 text-red-600">*</span>
          </h3>

          <div className="border-2 border-dashed border-blue-500 mx-auto rounded-lg flex flex-col items-center justify-center p-8 mb-2">
            <p className="text-gray-500 mb-4 text-center">DRAG FILE HERE OR</p>

            <input
              required
              type="file"
              name="aadhaarDocument"
              id="aadhaarUpload"
              onChange={handleChange}
              className="hidden"
            />

            <label
              htmlFor="aadhaarUpload"
              className="bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-blue-700"
            >
              Browse
            </label>

            {formData.aadhaarDocument && (
              <p className="text-green-600 mt-2 text-sm">
                {formData.aadhaarDocument.name}
              </p>
            )}
          </div>

          <p className="text-gray-500 text-center mb-8">
            Supported file types: .PDF .PNG .JPG
          </p>

          <div className="flex items-center md:gap-2 mb-5">
            <label className="text-sm sm:text-lg font-semibold w-30 sm:w-48 ml-2 sm:ml-10">
              Create password
            </label>
            <div className="relative flex-1">
              <input
                required
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
                required
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

          <div className="flex justify-center mt-8">
            <button
             
              type="submit"
              className="bg-blue-600 text-white px-10 py-2 rounded-md text-lg shadow-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      </form>
    </>
  );
};

export default Clinic_Receptionist_Details;