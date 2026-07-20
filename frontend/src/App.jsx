import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import gsap from "gsap";
import Navbar from "../Component/Navbar";
import LandingPage from "./pages/LandingPage/Hero";
import logo from "./assets/Aidly (2).png";
import AdminDas from "./Modules/clinic/admin/AdminDas";
import Receptionist from "./Modules/clinic/reception/ReceptionDas";
import DashboardNav from "../Component/DasNavbar";
import ManagerDas from "./Modules/clinic/manager/ManagerDas";
import DoctorDas from "./Modules/clinic/doctor/DoctorDas";
import ReceptionDas from "./Modules/clinic/reception/ReceptionDas";

function App() {
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      loaderRef.current,
      {
        scale: 0.75,
        opacity: 0.4,
        filter: "drop-shadow(0 0 0px #37B3BB)",
      },
      {
        scale: 1.1,
        opacity: 1,
        filter: "drop-shadow(0 0 35px #37B3BB)",
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      }
    );

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader loaderRef={loaderRef} />;
  }

  return (
    <div>
      <Navbar />
      <Outlet/>
      </div>
  );
}

function Loader({ loaderRef }) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-400">
      <img
        ref={loaderRef}
        src={logo}
        className="w-[250px] object-contain"
        alt=""
      />
    </div>
  );
}

export default App;