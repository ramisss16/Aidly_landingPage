import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";
import api from "../../service/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const OnlineDoctorForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

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

      const form = new FormData();

      form.append("name", formData.fullName);
      form.append("email", formData.email);
      form.append("phone", formData.phonenumber);
      form.append("password", formData.Createpassword);
      form.append("specialization", formData.specialization);
      form.append("consultationFee", formData.fee);
      form.append("availableSlots", `${formData.fromTime} - ${formData.toTime}`);

      if (formData.photo) form.append("photo", formData.photo);
      if (formData.aadhaarDocument) form.append("aadhaarDocument", formData.aadhaarDocument);
      if (formData.experienceCertificate) form.append("experienceCertificate", formData.experienceCertificate);
      if (formData.licenseCertificate) form.append("licenseCertificate", formData.licenseCertificate);

      const response = await api.post("/online-doctor/register", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      alert("Doctor Registered Successfully");

      sessionStorage.setItem("doctorId", response.data.doctorId);

      navigate("/Doctor-TermAndCondition");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Error saving doctor");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!formData.fullName || !formData.email || !formData.phonenumber) {
      alert("Fill all required fields");
      return;
    }

    if (formData.Createpassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setStep(2);
      setLoading(false);
    }, 1000);
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
          <div className="flex items-center gap-3 mb-8">
            <ArrowLeftIcon
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                if (step === 2) {
                  setStep(1);
                } else {
                  navigate("/loginoption");
                }
              }}
            />
            <h2 className="text-xl md:text-2xl font-bold mx-auto">
              {step === 1 ? "Online Doctor Signup" : "Verification Details"}
            </h2>
          </div>

          {step === 1 && (
            <>
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
                    className={`bg-blue-600 text-white px-2 sm:px-5 py-1 sm:py-2 rounded-md text-sm sm:text-base w-fit sm:w-auto hover:bg-blue-700 ${
                      otpVerified ? "bg-green-600 hover:bg-green-700" : ""
                    }`}
                  >
                    {otpVerified ? "Verified" : "Verify"}
                  </button>
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Upload Your Photo
              </h3>

              <div className="border-2 border-dashed border-blue-500 flex flex-col items-center justify-center mx-auto p-8 mb-2">
                <p className="text-lg text-gray-500 mb-3">DRAG FILE HERE OR</p>

                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  className="hidden"
                  id="photoUpload"
                />

                <label
                  htmlFor="photoUpload"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full mb-4 cursor-pointer hover:bg-blue-700"
                >
                  Browse
                </label>

                {formData.photo && (
                  <p className="text-green-600 mt-2 text-sm">{formData.photo.name}</p>
                )}
              </div>

              <p className="text-gray-500 text-center mb-8">
                Supported file types: .PDF .PNG .JPG
              </p>

              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Upload an ID Proof (Adhar or PAN)
              </h3>

              <div className="border-2 border-dashed border-blue-500 flex flex-col items-center justify-center mx-auto p-8 mb-2">
                <p className="text-lg text-gray-500 mb-3">DRAG FILE HERE OR</p>

                <input
                  type="file"
                  name="aadhaarDocument"
                  onChange={handleChange}
                  className="hidden"
                  id="aadhaarUpload"
                />

                <label
                  htmlFor="aadhaarUpload"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full mb-4 cursor-pointer hover:bg-blue-700"
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

              <div className="flex justify-center mt-8">
                <button
                  onClick={handleNext}
                  className="bg-blue-600 text-white px-10 py-2 rounded-md text-lg shadow-md hover:bg-blue-700"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="sm:w-1/3 font-medium">Specialization</label>
                  <input
                    name="specialization"
                    value={formData.specialization || ""}
                    onChange={handleChange}
                    type="text"
                    className="w-full sm:w-2/3 border rounded-md p-2 bg-gray-100"
                  />
                </div>

                <h3 className="text-lg md:text-xl font-semibold mb-4">
                  Upload Your Experience Certificate
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
                  Upload Your License Certificate
                </h3>

                <div className="border-2 border-dashed border-blue-500 mx-auto rounded-lg flex flex-col items-center justify-center p-8 mb-2">
                  <p className="text-gray-500 mb-4 text-center">DRAG FILE HERE OR</p>
                  <input
                    type="file"
                    name="licenseCertificate"
                    onChange={handleChange}
                    className="hidden"
                    id="licenseUpload"
                  />
                  <label
                    htmlFor="licenseUpload"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-blue-700"
                  >
                    Browse
                  </label>
                  {formData.licenseCertificate && (
                    <p className="text-green-600 mt-2 text-sm">
                      {formData.licenseCertificate.name}
                    </p>
                  )}
                </div>

                <p className="text-gray-500 text-center mb-8">
                  Supported file types: .PDF .PNG .JPG
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="sm:w-1/3 font-medium">Consultation Fee</label>
                  <input
                    name="fee"
                    value={formData.fee || ""}
                    onChange={handleChange}
                    type="number"
                    className="w-full sm:w-2/3 border rounded-md p-2 bg-gray-100"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="sm:w-1/3 font-medium">Available Time Slot</label>
                  <div className="flex gap-2 w-full sm:w-2/3">
                    <input
                      name="fromTime"
                      value={formData.fromTime || ""}
                      onChange={handleChange}
                      type="time"
                      className="w-1/2 border rounded-md p-2 bg-gray-100"
                    />
                    <input
                      name="toTime"
                      value={formData.toTime || ""}
                      onChange={handleChange}
                      type="time"
                      className="w-1/2 border rounded-md p-2 bg-gray-100"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <label className="sm:w-1/3 font-medium">Address</label>
                  <textarea
                    rows="3"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    className="w-full sm:w-2/3 border rounded-md p-2 bg-gray-100"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <label className="sm:w-1/3 font-medium">
                    Contact Number (Official)
                  </label>
                  <input
                    name="officialPhone"
                    value={formData.officialPhone || ""}
                    onChange={handleChange}
                    type="text"
                    className="w-full sm:w-2/3 border rounded-md p-2 bg-gray-100"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <label className="sm:w-1/3 font-medium">
                    Email Address (Official)
                  </label>
                  <input
                    name="officialEmail"
                    value={formData.officialEmail || ""}
                    onChange={handleChange}
                    type="email"
                    className="w-full sm:w-2/3 border rounded-md p-2 bg-gray-100"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="sm:w-[200px] w-[100px] bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition mx-auto flex justify-center items-center text-center"
                >
                  Continue
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OnlineDoctorForm;