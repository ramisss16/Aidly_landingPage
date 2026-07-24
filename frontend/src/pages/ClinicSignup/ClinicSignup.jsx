import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import { isValidEmail } from "../../utils/validateEmail";

function Clinic_details() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [step, setstep] = useState(1);

  const [formData, setFormData] = useState({
    specialistsCount: "",
    doctorsCount: "",
    visitMode: "",

    clinicName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    clinicEmail: "",
    licenseNumber: "",
    licenseDocument: null,
  });

  const emailValue = (formData.clinicEmail || "").trim();
  const isEmailValid = isValidEmail(emailValue);
  const emailError = emailValue && !isEmailValid;

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    let formattedValue = value;

    // First letter capital for text fields
    if (name === "clinicName" || name === "city" || name === "state") {
      formattedValue = value
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    // Update current field
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : formattedValue,
    }));

    // Auto fetch city & state from pincode
    if (name === "pincode" && value.length === 6) {
      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${value}`,
        );

        const data = await res.json();

        if (data[0].Status === "Success" && data[0].PostOffice?.length > 0) {
          const office = data[0].PostOffice[0];

          setFormData((prev) => ({
            ...prev,
            pincode: value,
            city: office.District.toLowerCase().replace(/\b\w/g, (c) =>
              c.toUpperCase(),
            ),
            state: office.State.toLowerCase().replace(/\b\w/g, (c) =>
              c.toUpperCase(),
            ),
          }));
        }
      } catch (error) {
        console.log("Pincode Error:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      setLoading(true);

      if (emailValue && !isEmailValid) {
        return;
      }

      const form = new FormData();

      // STEP 1 DATA
      form.append("specialistsCount", formData.specialistsCount);

      form.append("doctorsCount", formData.doctorsCount);

      form.append("visitMode", formData.visitMode.toLowerCase());

      // STEP 2 DATA
      form.append("clinicName", formData.clinicName);

      form.append("address", formData.address);

      form.append("city", formData.city);

      form.append("state", formData.state);

      form.append("pincode", formData.pincode);

      form.append("licenseNumber", formData.licenseNumber);

      form.append("clinicEmail", formData.clinicEmail);

      form.append("licenseDocument", formData.licenseDocument);

      const response = await api.post("/clinic/register", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      // localStorage.setItem(
      //   "clinicDetails",
      //   JSON.stringify(response.data)
      // );

      alert("Clinic Registered Successfully");

      sessionStorage.setItem("clinicId", response.data.data.clinicId);

      sessionStorage.setItem("adminId", response.data.data.adminId);

      if (formData.specialistsCount === "1 Specialist") {
        navigate("/Clinic-Doctor-Signup");
      } else {
        navigate("/clinic_Admin_Details");
      }
    } catch (error) {
      console.log(error.response?.data);

      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (!formData.specialistsCount) {
      alert("Fill all required fields");
      return;
    }

    setLoading(true);

    // 1 sec loading
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
        <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6 md:p-10 border">
          {/* HEADER */}
          {/* hide in form section */}
          {step !== 1 && (
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
                Clinic Details
              </h2>
            </div>
          )}

          {step == 1 && (
            <>
              <form onSubmit={handleNext}>
                <h2 className="text-lg md:text-2xl font-semibold mb-6">
                  Provide Answer For Following Question
                </h2>

                {/* Specialists */}
                <label
                  className="block mb-2 text-sm md:text-lg font-medium"
                  aria-required
                >
                  How many different Specialist are available in your clinic ?{" "}
                  <span className="text-red-600 px-2">*</span>
                </label>

                <div className="flex flex-col gap-3 mb-8">
                  {["1 Specialist", "More than one Specialist"].map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg cursor-pointer w-[250px] sm:w-[300px]"
                    >
                      <input
                        required
                        type="radio"
                        name="specialistsCount"
                        value={item}
                        checked={formData.specialistsCount === item}
                        onClick={() => {
                          if (formData.specialistsCount === item) {
                            handleChange({
                              target: {
                                name: "specialistsCount",
                                value: "",
                              },
                            });
                          }
                        }}
                        onChange={handleChange}
                      />
                      {item}
                    </label>
                  ))}
                </div>

                {/* Doctors */}
                <label className="block mb-2 text-sm md:text-lg font-medium">
                  How many Doctor you have currently practicing in your clinic ?{" "}
                  <span className="text-red-600 px-2">*</span>
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {[
                    "1 Doctor",
                    "2 Doctors",
                    "3 Doctors",
                    "More than three Doctors",
                  ].map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg cursor-pointer"
                    >
                      <input
                        required
                        type="radio"
                        name="doctorsCount"
                        value={item}
                        checked={formData.doctorsCount === item}
                        onClick={() => {
                          if (formData.doctorsCount === item) {
                            handleChange({
                              target: {
                                name: "doctorsCount",
                                value: "",
                              },
                            });
                          }
                        }}
                        onChange={handleChange}
                      />
                      {item}
                    </label>
                  ))}
                </div>

                {/* Visit Mode */}
                <label className="block mb-2 text-sm md:text-lg font-medium">
                  How do you manage patient visit ?{" "}
                  <span className="text-red-600 px-2">*</span>
                </label>

                <div className="flex flex-col gap-3 mb-6">
                  {["Online", "Offline"].map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg cursor-pointer"
                    >
                      <input
                        required
                        type="radio"
                        name="visitMode"
                        value={item}
                        checked={formData.visitMode === item}
                        onClick={() => {
                          if (formData.visitMode === item) {
                            handleChange({
                              target: {
                                name: "visitMode",
                                value: "",
                              },
                            });
                          }
                        }}
                        onChange={handleChange}
                      />
                      {item}
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-3 px-8 md:px-12 flex mx-auto rounded-md hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </form>
            </>
          )}

          {/* step 2: clinic details */}
          {step == 2 && (
            <>
              <form onSubmit={handleSubmit}>
                {/* Clinic Name */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-5">
                  <label className="w-full md:w-48 font-semibold">
                    Clinic Name <span className="text-red-600 px-2">*</span>
                  </label>
                  <input
                    name="clinicName"
                    required
                    value={formData.clinicName}
                    type="text"
                    onChange={handleChange}
                    className="w-full bg-gray-200 p-2 rounded-md outline-none"
                  />
                </div>

                {/* Address */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-5">
                  <label className="w-full md:w-48 font-semibold">
                    Clinic Address
                  </label>
                  <input
                    name="address"
                    type="text"
                    onChange={handleChange}
                    className="w-full bg-gray-200 p-2 rounded-md outline-none"
                  />
                </div>

                {/* City + State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div className="flex flex-col">
                    <label className="font-semibold mb-1">City</label>
                    <input
                      name="city"
                      value={formData.city}
                      type="text"
                      onChange={handleChange}
                      className="bg-gray-200 p-2 rounded-md outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold mb-1">State</label>
                    <input
                      name="state"
                      value={formData.state}
                      type="text"
                      onChange={handleChange}
                      className="bg-gray-200 p-2 rounded-md outline-none"
                    />
                  </div>
                </div>

                {/* Pincode */}
                <div className="flex flex-col md:flex-row gap-3 mb-5">
                  <label className="w-full md:w-48 font-semibold">
                    Pincode
                  </label>
                  <input
                    name="pincode"
                    value={formData.pincode}
                    maxLength={6}
                    type="text"
                    onChange={handleChange}
                    className="w-full md:w-1/2 bg-gray-200 p-2 rounded-md outline-none"
                  />
                </div>

                {/* Contact */}
                <div className="flex flex-col md:flex-row gap-3 mb-5">
                  <label className="w-full md:w-48 font-semibold">
                    Contact Number
                  </label>
                  <input
                    name="contact"
                    type="number"
                    onChange={handleChange}
                    className="w-full md:w-1/2 bg-gray-200 p-2 rounded-md outline-none"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col md:flex-row gap-3 mb-5">
                  <label className="w-full md:w-48 font-semibold">
                    Email Address <span className="text-red-600 px-2">*</span>
                  </label>
                  <div className="w-full">
                    <input
                      name="clinicEmail"
                      required
                      type="email"
                      value={formData.clinicEmail || ""}
                      onChange={handleChange}
                      className="w-full bg-gray-200 p-2 rounded-md outline-none"
                    />
                    {emailError && (
                      <p className="mt-2 text-sm text-red-600">
                        Please enter a valid email address.
                      </p>
                    )}
                  </div>
                </div>

                {/* License */}
                <div className="flex flex-col md:flex-row gap-3 mb-6">
                  <label className="w-full md:w-48 font-semibold">
                    Registration / License Number{" "}
                    <span className="text-red-600 px-2">*</span>
                  </label>
                  <input
                    name="licenseNumber"
                    required
                    type="text"
                    onChange={handleChange}
                    className="w-full md:w-1/2 bg-gray-200 p-2 rounded-md outline-none"
                  />
                </div>

                {/* Upload */}
                <h3 className="text-lg md:text-xl font-semibold mb-4">
                  Upload Document for given Registration / License Number{" "}
                  <span className="text-red-600 px-2">*</span>
                </h3>

                <div className="border-2 border-dashed border-blue-500 mx-auto rounded-lg flex flex-col items-center justify-center p-8 mb-2">
                  <p className="text-gray-500 mb-4 text-center">
                    DRAG FILE HERE OR
                  </p>

                  <input
                    required
                    type="file"
                    name="licenseDocument"
                    onChange={handleChange}
                    className="w-full text-sm"
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

                {/* Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-10 py-3 rounded-md text-lg shadow-md hover:bg-blue-700"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Clinic_details;
