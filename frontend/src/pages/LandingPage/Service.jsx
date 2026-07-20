import React from "react";
import { useRef, useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useLocation } from "react-router-dom";
import AmbulanceImage from "../../assets/AmbulanceImage.png";
import HomecareImage from "../../assets/HomecareImage.png";
import DoctorImage from "../../assets/DoctorApointmentImage.png";
import MedicalStoreImage from "../../assets/MedicalStoreimage.png";
import clinicmanagementImage from "../../assets/clinicmanagementimage.png";

const AidlyServices = () => {

    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

     const servicesRef = useRef(null);

       useEffect(() => {
    gsap.from(servicesRef.current, {
      y: -120,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });
  }, []);

  const sectionRefs = {
  ambulance: useRef(null),
  doctor: useRef(null),
  homecare: useRef(null),
  medical: useRef(null),
  clinic: useRef(null)
};

const location = useLocation();

useEffect(() => {
  const service = location.state?.service;

  if (service && sectionRefs[service]) {
    sectionRefs[service].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, []);

  return (
       <div className="relative min-h-screen overflow-x-hidden">
   <div className="fixed inset-0 -z-10 bg-[linear-gradient(0deg,_#FFFFFF_0%,_#C6EBE8_39.9%,_#89C9CA_75.48%,_#1A5F48_100%)]" />
    <div ref={servicesRef} className="px-8 sm:px-10 md:px-10 py-6 md:py-16">

      <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl  text-black mt-20 md:mt-15 mb-8 text-center ">
        Our Services
      </h1>

      {/* Ambulance */}
      <div ref={sectionRefs.ambulance} className="relative w-full max-w-6xl mx-auto rounded-[30px] bg-white/85 shadow-lg overflow-hidden py-10 sm:py-14 md:py-16 px-4 sm:px-8 md:px-16 mb-10 md:mb-15">
        <img
          src={AmbulanceImage}
          alt="ambulance"
          className="absolute inset-0 w-full h-full object-contain opacity-15"
        />

        <div className="relative z-10 text-center">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-black mb-4 md:mb-6">
            Ambulance Booking
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-medium text-black leading-snug mb-4 md:mb-6">
            Book emergency and non-emergency ambulances quickly with real-time
            assistance and reliable transportation.
          </p>

          <p className="text-lg sm:text-xl md:text-2xl font-medium text-black leading-relaxed max-w-5xl mx-auto mb-5 md:mb-8">
            Get immediate access to nearby ambulances during medical
            emergencies. Our smart booking system enables quick dispatch,
            real-time tracking, and seamless communication to ensure timely
            patient transportation and emergency care.
          </p>

        </div>
       <div className=" relative flex justify-center md:justify-end">
  <button  onClick={() => setShowPopup(true)} className="bg-blue-500 py-3 px-4 font-bold rounded-xl text-white">
    Book Now
  </button>
</div>
      </div>

      {/* Doctor Appointment */}
      <div ref={sectionRefs.doctor} className="relative w-full max-w-6xl mx-auto rounded-[30px] bg-white/85 shadow-lg overflow-hidden py-10 sm:py-14 md:py-16 px-4 sm:px-8 md:px-16 mb-10 md:mb-15">
        <img
          src={DoctorImage}
          alt="doctor"
          className="absolute inset-0 w-full h-full object-contain opacity-15"
        />

        <div className="relative z-10 text-center">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-black mb-4 md:mb-6">
            Doctor Appointment
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-medium text-black leading-snug mb-4 md:mb-6">
            Easily schedule appointments with qualified doctors for in-person
            or online consultations.
          </p>

          <p className="text-lg sm:text-xl md:text-2xl font-medium text-black leading-relaxed max-w-5xl mx-auto mb-5 md:mb-8">
            Connect with experienced doctors through online or in-person
            appointments. Receive medical advice, diagnoses, prescriptions,
            follow-up care, and specialist consultations without long waiting
            times.
          </p>
        </div>
           <div className="relative flex justify-center md:justify-end">
  <button  onClick={() => setShowPopup(true)} className="bg-blue-500 py-3 px-4 font-bold rounded-xl text-white">
    Book Now
  </button>
</div>
      </div>

      {/* Homecare */}
      <div ref={sectionRefs.homecare} className="relative w-full max-w-6xl mx-auto rounded-[30px] bg-white/85 shadow-lg overflow-hidden py-10 sm:py-14 md:py-16 px-4 sm:px-8 md:px-16 mb-10 md:mb-15">
        <img
          src={HomecareImage}
          alt="homecare"
          className="absolute inset-0 w-full h-full object-contain opacity-15"
        />

        <div className="relative z-10 text-center">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-black mb-4 md:mb-6">
            Home Healthcare
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-medium text-black leading-snug mb-4 md:mb-6">
            Receive professional healthcare services at home, including nursing
            care, health monitoring, and patient support.
          </p>

          <p className="text-lg sm:text-xl md:text-2xl font-medium text-black leading-relaxed max-w-5xl mx-auto mb-5 md:mb-8">
            Access professional healthcare services in the comfort of your
            home. We provide nursing care, patient monitoring, elderly care,
            post-surgery assistance, physiotherapy support, and routine health
            checkups.
          </p>
        </div>
           <div className="relative flex justify-center md:justify-end">
  <button  onClick={() => setShowPopup(true)} className="bg-blue-500 py-3 px-4 font-bold rounded-xl text-white">
    Book Now
  </button>
</div>
      </div>

      {/* Medical Store */}
      <div ref={sectionRefs.medical} className="relative w-full max-w-6xl mx-auto rounded-[30px] bg-white/85 shadow-lg overflow-hidden py-10 sm:py-14 md:py-16 px-4 sm:px-8 md:px-16 mb-10 md:mb-15">
        <img
          src={MedicalStoreImage}
          alt="medical store"
          className="absolute inset-0 w-full h-full object-contain opacity-15"
        />

        <div className="relative z-10 text-center">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-black mb-4 md:mb-6">
            Medical Store
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-medium text-black leading-snug mb-4 md:mb-6">
            Order medicines and healthcare products conveniently with fast
            delivery and trusted pharmacy services.
          </p>

          <p className="text-lg sm:text-xl md:text-2xl font-medium text-black leading-relaxed max-w-5xl mx-auto mb-5 md:mb-8">
            Order medicines, healthcare products, and medical equipment from
            trusted pharmacies. Enjoy doorstep delivery, prescription-based
            ordering, and convenient access to essential healthcare supplies.
          </p>
        </div>
           <div className="relative flex justify-center md:justify-end">
  <button  onClick={() => setShowPopup(true)} className="bg-blue-500 py-3 px-4 font-bold rounded-xl text-white">
    Book Now
  </button>
</div>
      </div>

      {/* clinic management */}
      <div ref={sectionRefs.clinic} className="relative w-full max-w-6xl mx-auto rounded-[30px] bg-white/85 shadow-lg overflow-hidden py-10 sm:py-14 md:py-16 px-4 sm:px-8 md:px-16 mb-10 md:mb-15">
        <img
          src={clinicmanagementImage}
          alt="Clinic Management"
          className="absolute inset-0 w-full h-full object-contain opacity-15"
        />

        <div className="relative z-10 text-center">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-black mb-4 md:mb-6">
            Clinic Management
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-medium text-black leading-snug mb-5 md:mb-8">
            Aidly's Clinic Management System simplifies daily clinic operations with dedicated dashboards for Clinic Admins,
             Managers, Doctors, and Receptionists. It streamlines patient management, appointments, billing, medical records, 
             staff coordination, and inventory through a single, centralized platform.
          </p>

          
        </div>
           <div  className="relative flex justify-center md:justify-end">
  <button onClick={()=>navigate("/login")} className="bg-blue-500 py-3 px-4 font-bold rounded-xl text-white">
    Admin Login
  </button>
</div>
      </div>
    </div>

     {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] px-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl text-center w-full max-w-[350px]">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Launching Soon 🚀</h2>
          <p className="text-gray-600 leading-relaxed mb-5">
  This service is available exclusively in the <span className="font-semibold">Aidly App</span>.
  <br /><br />
  The Aidly App is currently under development and will be launching soon.
  Stay tuned for an all-in-one healthcare experience!
</p>

            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>

    
  );
};

export default AidlyServices;