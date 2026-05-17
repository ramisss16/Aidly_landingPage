import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../../service/api";

const PrivateAmbulaceSignup = () => {
  const navigate = useNavigate();
  const [step, setstep] = useState(1);
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
      if (!formData.phoneNumber) {
        return alert("Enter phone number");
      }

      setOtpLoading(true);

      const response = await api.post("/otp/send", {
        phone: `+91${formData.phoneNumber}`,
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
        phone: `+91${formData.phoneNumber}`,
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

      if (
        !formData.ownerName ||
        !formData.driverName ||
        !formData.phoneNumber ||
        !formData.ownerAddress ||
        !formData.ambulanceType ||
        !formData.vehicleNumber ||
        !formData.vehicleRegistrationLicenseNumber
      ) {
        alert("Please fill all required fields");
        setLoading(false);
        return;
      }

      const form = new FormData();
      form.append("ownerName", formData.ownerName);
      form.append("driverName", formData.driverName);
      form.append("phoneNumber", formData.phoneNumber);
      form.append("ownerAddress", formData.ownerAddress);
      form.append("ambulanceType", formData.ambulanceType);
      form.append("vehicleNumber", formData.vehicleNumber);
      form.append("vehicleRegistrationLicenseNumber", formData.vehicleRegistrationLicenseNumber);
      form.append("password", formData.password);

      if (formData.driverPhoto) form.append("driverPhoto", formData.driverPhoto);
      if (formData.driverIdProof) form.append("driverIdProof", formData.driverIdProof);
      if (formData.vehicleRegistrationCertificate) form.append("vehicleRegistrationCertificate", formData.vehicleRegistrationCertificate);
      if (formData.vehiclePhoto) form.append("vehiclePhoto", formData.vehiclePhoto);

      const response = await api.post("/private-ambulance/register", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Ambulance Registered Successfully");

      console.log(formData);

      sessionStorage.setItem(
        "privateAmbulanceId",
        response.data.ambulance.privateAmbulanceId
      );

      console.log(response.data.ambulance.privateAmbulanceId);

      navigate("/Private-Ambulance-TermAndCondition");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (
      !formData.ownerName ||
      !formData.driverName ||
      !formData.phoneNumber ||
      !formData.ownerAddress
    ) {
      alert("Please fill all required fields");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setstep(2);
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
                  setstep(1);
                } else {
                  navigate("/loginoption");
                }
              }}
            />
            <h2 className="text-xl md:text-2xl font-bold mx-auto">
              {step === 1 ? "Private Ambulance Sign Up" : " Vehical Details"}
            </h2>
          </div>

          {step === 1 && (
            <>
              <div className="flex items-center md:gap-2 mb-5">
                <label className="text-sm sm:text-lg font-semibold w-28 sm:w-48 ml-2 sm:ml-10">
                  Owner Name
                </label>
                <input
                  name="ownerName"
                  type="text"
                  onChange={handleChange}
                  value={formData.ownerName || ""}
                  className="flex-1 min-w-0 bg-gray-200 p-2 rounded-md outline-none text-sm sm:text-base"
                />
              </div>

              <div className="flex items-center md:gap-2 mb-5">
                <label className="text-sm sm:text-lg font-semibold w-28 sm:w-48 ml-2 sm:ml-10">
                  Driver Name
                </label>
                <input
                  name="driverName"
                  type="text"
                  value={formData.driverName || ""}
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
                    name="phoneNumber"
                    type="number"
                    value={formData.phoneNumber || ""}
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
                    className={`px-2 sm:px-5 py-1 sm:py-2 rounded-md text-sm sm:text-base w-fit sm:w-auto text-white ${
                      otpVerified ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {otpVerified ? "Verified" : "Verify"}
                  </button>
                </div>
              </div>

              <div className="flex items-center md:gap-2 mb-5">
                <label className="text-sm sm:text-lg font-semibold w-28 sm:w-48 ml-2 sm:ml-10">
                  Owner Address
                </label>
                <input
                  name="ownerAddress"
                  type="text"
                  value={formData.ownerAddress || ""}
                  onChange={handleChange}
                  className="flex-1 min-w-0 bg-gray-200 px-2 py-3 rounded-md outline-none text-sm sm:text-base"
                />
              </div>

              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Upload Driver's Photo
              </h3>

              <div className="border-2 border-dashed border-blue-500 mx-auto rounded-lg flex flex-col items-center justify-center p-8 mb-2">
                <p className="text-gray-500 mb-4 text-center">DRAG FILE HERE OR</p>
                <input
                  type="file"
                  name="driverPhoto"
                  id="driverPhotoUpload"
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor="driverPhotoUpload"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-blue-700"
                >
                  Browse
                </label>
                {formData.driverPhoto && (
                  <p className="text-green-600 mt-2 text-sm">
                    {formData.driverPhoto.name}
                  </p>
                )}
              </div>

              <p className="text-gray-500 text-center mb-8">
                Supported file types: .PDF .PNG .JPG
              </p>

              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Upload Driver's License Certificate
              </h3>

              <div className="border-2 border-dashed border-blue-500 mx-auto rounded-lg flex flex-col items-center justify-center p-8 mb-2">
                <p className="text-gray-500 mb-4 text-center">DRAG FILE HERE OR</p>
                <input
                  type="file"
                  name="driverLicense"
                  id="lisenceUpload"
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor="lisenceUpload"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-blue-700"
                >
                  Browse
                </label>
                {formData.driverLicense && (
                  <p className="text-green-600 mt-2 text-sm">
                    {formData.driverLicense.name}
                  </p>
                )}
              </div>

              <p className="text-gray-500 text-center mb-8">
                Supported file types: .PDF .PNG .JPG
              </p>

              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Upload an ID Proof (Adhar or PAN)
              </h3>

              <div className="border-2 border-dashed border-blue-500 mx-auto rounded-lg flex flex-col items-center justify-center p-8 mb-2">
                <p className="text-gray-500 mb-4 text-center">DRAG FILE HERE OR</p>
                <input
                  type="file"
                  name="driverIdProof"
                  id="driverIdUpload"
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor="driverIdUpload"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-blue-700"
                >
                  Browse
                </label>
                {formData.driverIdProof && (
                  <p className="text-green-600 mt-2 text-sm">
                    {formData.driverIdProof.name}
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
                    name="password"
                    value={formData.password || ""}
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
              <div className="flex items-center md:gap-2 mb-5">
                <label className="text-sm sm:text-lg font-semibold w-28 sm:w-48 ml-2 sm:ml-10">
                  Ambulance Type
                </label>
                <select
                  name="ambulanceType"
                  onChange={handleChange}
                  value={formData.ambulanceType || ""}
                  className="flex-1 min-w-0 bg-gray-200 p-2 rounded-md outline-none text-sm sm:text-base"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Ambulance Type
                  </option>
                  <option value="Basic">Basic</option>
                  <option value="ICU">ICU</option>
                  <option value="Oxygen">Oxygen</option>
                </select>
              </div>

              <div className="flex items-center md:gap-2 mb-5">
                <label className="text-sm sm:text-lg font-semibold w-28 sm:w-48 ml-2 sm:ml-10">
                  Vehical Number
                </label>
                <input
                  name="vehicleNumber"
                  value={formData.vehicleNumber || ""}
                  onChange={handleChange}
                  className="flex-1 min-w-0 bg-gray-200 p-2 rounded-md outline-none text-sm sm:text-base"
                />
              </div>

              <div className="flex items-center md:gap-2 mb-5">
                <label className="text-sm sm:text-lg font-semibold w-28 sm:w-48 ml-2 sm:ml-10">
                  vehical Registration\License Number
                </label>
                <input
                  name="vehicleRegistrationLicenseNumber"
                  value={formData.vehicleRegistrationLicenseNumber || ""}
                  onChange={handleChange}
                  className="flex-1 min-w-0 bg-gray-200 px-2 py-2 rounded-md outline-none text-sm sm:text-base"
                />
              </div>

              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Upload Vehicle Registration Number Certificate
              </h3>

              <div className="border-2 border-dashed border-blue-500 mx-auto rounded-lg flex flex-col items-center justify-center p-8 mb-2">
                <p className="text-gray-500 mb-4 text-center">DRAG FILE HERE OR</p>
                <input
                  type="file"
                  name="vehicleRegistrationCertificate"
                  id="vehicleRegistrationUpload"
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor="vehicleRegistrationUpload"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-blue-700"
                >
                  Browse
                </label>
                {formData.vehicleRegistrationCertificate && (
                  <p className="text-green-600 mt-2 text-sm">
                    {formData.vehicleRegistrationCertificate.name}
                  </p>
                )}
              </div>

              <p className="text-gray-500 text-center mb-8">
                Supported file types: .PDF .PNG .JPG
              </p>

              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Upload vehicle Photo
              </h3>

              <div className="border-2 border-dashed border-blue-500 mx-auto rounded-lg flex flex-col items-center justify-center p-8 mb-2">
                <p className="text-gray-500 mb-4 text-center">DRAG FILE HERE OR</p>
                <input
                  type="file"
                  name="vehiclePhoto"
                  id="vehiclePhotoUpload"
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor="vehiclePhotoUpload"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-blue-700"
                >
                  Browse
                </label>
                {formData.vehiclePhoto && (
                  <p className="text-green-600 mt-2 text-sm">
                    {formData.vehiclePhoto.name}
                  </p>
                )}
              </div>

              <p className="text-gray-500 text-center mb-8">
                Supported file types: .PDF .PNG .JPG
              </p>

              <div className="flex justify-center mt-8">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-10 py-2 rounded-md text-lg shadow-md hover:bg-blue-700"
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

export default PrivateAmbulaceSignup;