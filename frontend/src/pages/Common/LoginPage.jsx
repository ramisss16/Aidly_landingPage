import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../service/api";
import { jwtDecode } from "jwt-decode";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
const handleLogin = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    let res;

    // AIDLY ADMIN
    if (userId.startsWith("AIDLY")) {
      res = await api.post("/aidly-admin/login", {
        adminId: userId,
        password,
      });
    }

    // HOSPITAL AMBULANCE
    else if (userId.startsWith("HOSPAMB")) {
      res = await api.post("/hospital-ambulance/login", {
        hospitalAmbulanceId: userId,
        password,
      });
    }

    // PRIVATE AMBULANCE
    else if (userId.startsWith("PRIVAMB")) {
      res = await api.post("/private-ambulance/login", {
        privateAmbulanceId: userId,
        password,
      });
    }

    // CLINIC USERS
    else {
      res = await api.post("/clinic/auth/login", {
        userId,
        password,
      });
    }

    const data = res.data;

    localStorage.setItem("token", data.token);

    const decoded = jwtDecode(data.token);

    localStorage.setItem("role", decoded.role);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user || data.ambulance || data.admin)
    );

    // FINAL ROLE ROUTING
    if (decoded.role === "aidlyAdmin") {
      navigate("/admin/dashboard");
    } else if (decoded.role === "admin") {
      navigate("/Admin-Dashboard");
    } else if (decoded.role === "doctor") {
      navigate("/Doctor-Dashboard");
    } else if (decoded.role === "manager") {
      navigate("/Manager-Dashboard");
    } else if (decoded.role === "receptionist") {
      navigate("/Receptionist-Dashboard");
    } else if (decoded.role === "hospitalAmbulance") {
      navigate("/HospitalAmbulance-Dashboard");
    } else if (decoded.role === "privateAmbulance") {
      navigate("/PrivateAmbulance-Dashboard");
    }

  } catch (err) {
    if (err.response?.status === 401) {
      setError("Invalid User ID or Password");
    } else if (err.response?.status === 404) {
      setError("User not found");
    } else {
      setError(err.response?.data?.message || "Something went wrong");
    }
  } finally {
    setLoading(false);
  }
};

export default LoginPage;