import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../service/api";

const ClinicDocSignup = () => {
  const navigate = useNavigate();

  const [step, setstep] = useState(1);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // otp send->verify
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] =
  useState(() => {
    const savedData =
      sessionStorage.getItem(
        "clinicDocForm"
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
    "clinicDocForm",
    JSON.stringify(
      updatedData
    )
  );
};


  const handleSubmit = async () => {
    try {
      setLoading(true);

      const clinicId = sessionStorage.getItem("clinicId");

      if (!clinicId) {
        alert("Clinic not found");
        setLoading(false);
        return;
      }

      if (!otpVerified) {
  return alert("Please verify OTP first");
  setLoading(false);
}

      const form = new FormData();

      form.append("clinicId", clinicId);

      form.append("adminName", formData.fullName);
      form.append("email", formData.email);
      form.append("phone", formData.phonenumber);
      form.append("password", formData.Createpassword);

      form.append("specialization", formData.specialization);
      form.append("consultationFee", formData.consultationFee || "");
      form.append(
        "availableSlots",
        `${formData.fromTime || ""} - ${formData.toTime || ""}`
      );
      form.append("officialAddress", formData.officialAddress || "");
      form.append("officialContact", formData.officialContact || "");
      form.append("officialEmail", formData.officialEmail || "");

      if (formData.photo) {
        form.append("photo", formData.photo);
      }

      if (formData.licenseDocument) {
        form.append("licenseDocument", formData.licenseDocument);
      }

      if (formData.experienceCertificate) {
        form.append("experienceCertificate", formData.experienceCertificate);
      }

      const response = await api.put(`clinic/update/${clinicId}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Doctor Added Successfully");

      sessionStorage.setItem("clinicId", response.data.data.clinicId);
      sessionStorage.setItem("adminId", response.data.data.adminId);

           // clear saved form
sessionStorage.removeItem(
  "clinicDocForm"
);

      navigate("/Clinic-Doctor-TermAndCondition");
    } catch (err) {
      console.log(err.response?.data);

      alert(err.response?.data?.message || "Error adding doctor");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phonenumber) {
      alert("Fill all required fields");
      return;
    }

    if (formData.Createpassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);

    // 1 sec loading
    setTimeout(() => {
      setstep(2);
      setLoading(false);
    }, 1000);

  };

  // otp send 
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

  // verify otp
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
            <ArrowLeftIcon
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                if (step === 2) {
                  setstep(1);
                } else {
                  navigate(-1);
                }
              }}
            />
            <h2 className="text-xl md:text-2xl font-bold mx-auto">
              {step === 1 ? "Clinic Doctor Signup" : "Verification Details"}
            </h2>
          </div>

          {/* doctor details */}
          {step == 1 && (
            <>
              <div className="flex items-center md:gap-2 mb-5">
                <label className="text-sm sm:text-lg font-semibold w-28 sm:w-48 ml-2 sm:ml-10">
                  Full Name
                </label>

                <input
                  name="fullName"
                  type="text"
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
                  type="email"
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
                    type="number"
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
                Upload Your Photo
              </h3>

              <div className="border-2 border-dashed border-blue-500 mx-auto rounded-lg flex flex-col items-center justify-center p-8 mb-2">
                <p className="text-gray-500 mb-4 text-center">
                  DRAG FILE HERE OR
                </p>

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
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
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

          {/* verification details */}
          {step == 2 && (
            <>
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="sm:w-1/3 font-medium">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization || ""}
                    onChange={handleChange}
                    className="w-full sm:w-2/3 border rounded-md p-2 bg-gray-100"
                  />
                </div>

                <h3 className="text-lg md:text-xl font-semibold mb-4">
                  Upload an ID Experience Certificate
                </h3>

                <div className="border-2 border-dashed border-blue-500 mx-auto rounded-lg flex flex-col items-center justify-center p-8 mb-2">
                  <p className="text-gray-500 mb-4 text-center">
                    DRAG FILE HERE OR
                  </p>

                  <input
                    type="file"
                    name="experienceCertificate"
                    id="experienceUpload"
                    onChange={handleChange}
                    className="hidden"
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
                  Upload Document Your License Certificate
                </h3>

                <div className="border-2 border-dashed border-blue-500 mx-auto rounded-lg flex flex-col items-center justify-center p-8 mb-2">
                  <p className="text-gray-500 mb-4 text-center">
                    DRAG FILE HERE OR
                  </p>

                  <input
                    type="file"
                    name="licenseDocument"
                    onChange={handleChange}
                    className="hidden"
                    id="licenseupload"
                  />

                  <label
                    htmlFor="licenseupload"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-blue-700"
                  >
                    Browse
                  </label>

                  {formData.licenseDocument && (
                    <p className="text-green-600 mt-2 text-sm">
                      {formData.licenseDocument.name}
                    </p>
                  )}
                </div>

                <p className="text-gray-500 text-center mb-8">
                  Supported file types: .PDF .PNG .JPG
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="sm:w-1/3 font-medium">Consultation Fee</label>
                  <input
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee || ""}
                    onChange={handleChange}
                    className="w-full sm:w-2/3 border rounded-md p-2 bg-gray-100"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="sm:w-1/3 font-medium">Available Time Slot</label>
                  <div className="flex gap-2 w-full sm:w-2/3">
                    <input
                      type="time"
                      name="fromTime"
                      value={formData.fromTime || ""}
                      onChange={handleChange}
                      className="w-1/2 border rounded-md p-2 bg-gray-100"
                    />
                    <input
                      type="time"
                      name="toTime"
                      value={formData.toTime || ""}
                      onChange={handleChange}
                      className="w-1/2 border rounded-md p-2 bg-gray-100"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <label className="sm:w-1/3 font-medium">Address</label>
                  <textarea
                    type="text"
                    name="officialAddress"
                    value={formData.officialAddress || ""}
                    onChange={handleChange}
                    rows="3"
                    className="w-full sm:w-2/3 border rounded-md p-2 bg-gray-100"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <label className="sm:w-1/3 font-medium">
                    Contact Number (Official)
                  </label>
                  <input
                    type="number"
                    name="officialContact"
                    value={formData.officialContact || ""}
                    onChange={handleChange}
                    className="w-full sm:w-2/3 border rounded-md p-2 bg-gray-100"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <label className="sm:w-1/3 font-medium">
                    Email Address (Official)
                  </label>
                  <input
                    type="email"
                    name="officialEmail"
                    value={formData.officialEmail || ""}
                    onChange={handleChange}
                    className="w-full sm:w-2/3 border rounded-md p-2 bg-gray-100"
                  />
                </div>

                <div
                  onClick={() => navigate("/ClinicDoc-add-receptionist")}
                  className="w-[250px] sm:w-[300px] flex items-center mx-auto gap-6 bg-gray-200 rounded-xl mb-3 cursor-pointer hover:bg-gray-300 transition"
                >
                  <div className="w-12 h-12 sm:w-17 sm:h-17 border-2 border-dashed border-blue-500 flex items-center justify-center text-2xl text-blue-600 rounded-md">
                    +
                  </div>
                  <span className="text-lg">Add an Receptionist</span>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition"
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

export default ClinicDocSignup;