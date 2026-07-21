// import React from "react";
// import { useState } from "react";
// import { useRef, useEffect, useLayoutEffect  } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);
// import { FaGooglePlay, FaApple } from "react-icons/fa";
// import { FaLinkedin, FaInstagram } from "react-icons/fa";
// import landinglogo from "../../assets/landingLogo2.png"
// import AidlyLogo from "../../assets/Aidly2.png"
// import AmbulanceImage from "../../assets/AmbulanceImage.png"
// import DoctorApointmentImage from "../../assets/DoctorApointmentImage.png"
// import HomeCareImage from "../../assets/HomeCareImage.png"
// import MedicalStore from "../../assets/MedicalStoreImage.png"
// import ReviewImage1 from "../../assets/ReviewImage.jpeg"
// import ReviewImage2 from "../../assets/ReviewImage2.jpeg"
// import ReviewImage3 from "../../assets/ReviewImage4.jpeg"
// import ReviewImage4 from "../../assets/ReviewImage2.jpeg"
// import ReviewImage5 from "../../assets/ReviewImage5.jpeg"

// const services = [
//   {
//     title: "Ambulance Booking",
//     image: AmbulanceImage,
//     reverse: false,
//   },
//   {
//     title: "Doctor Appointment",
//     image: DoctorApointmentImage,
//     reverse: true,
//   },
//   {
//     title: "Home Healthcare",
//     image: HomeCareImage,
//     reverse: false,
//   },
//   {
//     title: "Medical Store",
//     image: MedicalStore,
//     reverse: true,
//   },
// ];

// const reviews = [
//   {
//     name: "Rahul Sharma",
//     image: ReviewImage1,
//     text: "Booked an ambulance in an emergency, and it arrived quickly. Excellent service and support",
//   },
//   {
//     name: "Priya Verma",
//     image: ReviewImage2,
//     text: "Home healthcare team was professional and caring. Highly recommended for patient care at home",
//   },
//   {
//     name: "Amit Singh",
//     image: ReviewImage3,
//     text: "Doctor appointment booking was simple and hassle free. The consultation experience was great",
//   },
//   {
//     name: "Sneha Patel",
//     image: ReviewImage4,
//     text: "Ordered medicines through the medical store and received them on time. Reliable and convenient service",
//   },
//   {
//     name: "Rohan Gupta",
//     image: ReviewImage5,
//     text: "Complete healthcare platform with excellent Ambulance, Doctor and Pharmacy services.",
//   },
// ];

// export default function LandingPage() {
//   const [showPopup, setShowPopup] = useState(false);

//   const heroLogoRef = useRef(null);
// const aboutLogoRef = useRef(null);


// const heroRef = useRef(null);
// const aboutRef = useRef(null);
// const serviceRefs = useRef([]);
// const reviewsRef = useRef(null);
// const downloadRef = useRef(null);

// useLayoutEffect (() => {
// const timer = setTimeout(() => {
//     const hero = heroLogoRef.current;
//     const target = aboutLogoRef.current;

//     if (!hero || !target) return;

//     const heroRect = hero.getBoundingClientRect();
//     const targetRect = target.getBoundingClientRect();

//     const x = targetRect.left - heroRect.left;
//     const y = targetRect.top - heroRect.top;

//     gsap.to(hero, {
//       x,
//       y,
//       scale: 1,
//       ease: "none",
//       scrollTrigger: {
//         trigger: target,
//         start: "top 80%",
//         end: "top 40%",
//         scrub: true,
//       },
//     });
//   }, 2200);
//   const sections = [
//   aboutRef.current,

//   reviewsRef.current,
//   downloadRef.current,
// ];

// sections.forEach((section) => {
//   gsap.from(section, {
//     opacity: 0,
//     y: 100,
//     duration: 3.0,
//     ease: "power3.out",
//     scrollTrigger: {
//       trigger: section,
//       start: "top 80%",
//       toggleActions: "play none none none",
//     },
//   });
// });

// serviceRefs.current.forEach((card, i) => {
//   if (!card) return;

//   gsap.from(card, {
//     opacity: 0,
//     x: i % 2 === 0 ? -150 : 150,
//     duration: 1.5,
//     ease: "none",
//     scrollTrigger: {
//       trigger: card,
//       start: "top 85%",
//       toggleActions: "play none none none",
//     },
//   });
// });

// gsap.from(heroRef.current, {
//   opacity: 0,
//   y: 20,
//   scale: 0.9,
//   duration: 1.5,
//   ease: "power3.out",
//   delay: 0,
// });

//  return () => clearTimeout(timer);
// }, []);

// const handleMouseMove = (e) => {
//   const rect = heroLogoRef.current.getBoundingClientRect();

//   const x = e.clientX - rect.left;
//   const y = e.clientY - rect.top;

//   const centerX = rect.width / 2;
//   const centerY = rect.height / 2;

//   const rotateY = (x - centerX) / 20;
//   const rotateX = -(y - centerY) / 20;

//   gsap.to(heroLogoRef.current, {
//     rotationY: rotateY,
//     rotationX: rotateX,
//     scale: 1.05,
//     transformPerspective: 1000,
//     duration: 0.3,
//     ease: "power2.out",
//   });
// };

// const handleMouseLeave = () => {
//   gsap.to(heroLogoRef.current, {
//     rotationX: 0,
//     rotationY: 0,
//     scale: 1,
//     duration: 0.5,
//     ease: "power3.out",
//   });
// };

//   return (
//     <div className="bg-gradient-to-b from-[#1A5F48] via-[#89C9CA] to-[#C6EBE8] min-h-[400px] ">


//       {/* HERO */}
//       <section ref={heroRef} className="pt-28  flex flex-col items-center">
//         <img
//           ref={heroLogoRef}
//           src={landinglogo}
//           alt="Logo"
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseLeave}
//           className="w-[350px] object-contain"
//         />

//         <h1 className="text-7xl font-bold text-blue-600 ">Aidly</h1>

//         <p className="text-2xl font-bold mt-3">
//           Your health, our priority. Stay Healthy!
//         </p>

//         <div className="flex gap-8 mt-8">
//           <button className="px-12 py-4 rounded-2xl bg-blue-600 text-white text-3xl font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
//             Explore Aidly
//           </button>

//           <button className="px-12 py-4 rounded-2xl bg-blue-600 text-white text-3xl font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
//             View Services
//           </button>
//         </div>
//       </section>

//       {/* ABOUT */}
//       <section ref={aboutRef} className="py-20 px-10">
//         <div className="max-w-6xl mx-auto flex items-center justify-between">

//           <div className="flex flex-col items-center ">
//             <h2 className="text-6xl font-bold text-center md:text-center">
//               Aidly
//             </h2>

//             <p className="text-3xl mt-5 max-w-xl text-center md:text-left">
//               Aidly is an all-in-one healthcare platform offering smart and
//               digital unified ecosystem.
//             </p>
//           </div>

//        <div ref={aboutLogoRef} className="w-[350px] h-[350px]" />
//         </div>
//       </section>

//       {/* SERVICES */}
//       <section  className="py-16 px-6">
//         <h2 className="text-6xl font-bold text-center mb-10">Our Services</h2>

//         <div className="space-y-10 max-w-7xl mx-auto">
//           {services.map((service, i) => (
//             <div
//               key={i}
//                ref={(el) => (serviceRefs.current[i] = el)}
//               className={` rounded-3xl  flex items-center justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${service.reverse ? "flex-row-reverse bg-gradient-to-r from-[#1d8c72] to-[#d9fff7] pl-30 pr-10" : "bg-gradient-to-l from-[#1d8c72] to-[#d9fff7] pl-10 pr-30"
//                 }`}
//             >
//               <img
//                 src={service.image}
//                 alt=""
//                 className="w-[360px] h-[300px] object-contain"
//               />

//               <div className="flex flex-col items-center">
//                 <h3 className="text-5xl text-white font-semibold">
//                   {service.title}
//                 </h3>

//                 <button className="mt-10 bg-white px-8 py-3 rounded-full text-2xl font-medium transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* REVIEWS */}
//       <section ref={reviewsRef} className="py-20 px-6">
//         <h2 className="text-center text-6xl font-bold text-blue-500">
//           Aidly Reviews
//         </h2>
//         <p className="text-center text-4xl font-semibold mt-3">
//           What Our User Says
//         </p>

//         <div className="grid grid-cols-5 gap-5 mt-12">
//           {reviews.map((review, i) => (
//             <div key={i} className="shadow-lg rounded-xl p-4 bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ">
//               <img
//                 src={review.image}
//                 alt=""
//                 className="w-full h-52 object-cover rounded-lg"
//               />

//               <div className="text-yellow-500 text-center mt-3">★★★★★</div>

//               <h3 className="font-bold text-center mt-3">{review.name}</h3>

//               <p className="text-center text-sm mt-3">{review.text}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* DOWNLOAD */}
//       <section ref={downloadRef} className="py-16 px-5 ">
//         <div className="max-w-7xl mx-auto">

//           <div className="flex gap-8 items-center" >
//             <h2 className="text-4xl font-bold ">Download Aidly App:</h2>

//             <button onClick={()=>setShowPopup(true)}
//              className="bg-black text-white rounded-xl text-3xl flex items-center gap-3 px-6 py-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
//               <FaGooglePlay className="text-4xl" />
//               Get on Google Play Store
//             </button>

//             <button onClick={()=>setShowPopup(true)} 
//             className="bg-black text-white rounded-xl text-3xl flex items-center gap-3 px-6 py-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
//               <FaApple className="text-4xl" />
//               Get on Apple App Store
//             </button>
//           </div>
//         </div>


//         <div className="mt-10 space-y-5 mx-auto max-w-2xl">
//        <a
//   href="https://www.linkedin.com/company/aidly-in/"
//   target="_blank"
//   rel="noopener noreferrer"
//   className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#B8B6FF] via-[#2F3FD8] to-[#B8B6FF] rounded-full py-4 px-4 text-lg md:text-3xl font-semibold transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
// >
//   <span>Follow us on LinkedIn for more updates</span>
//   <FaLinkedin className="text-3xl shrink-0" />
// </a>

//           <a
//             href="https://www.instagram.com/aidly_in?igsh=MWxxMWt1cGoxNmdscA=="
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center justify-center gap-3  block bg-gradient-to-r from-[#A64DFF] via-[#dac67f] to-[#A64DFF] rounded-full py-4 px-4  md:text-3xl font-semibold transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
//             Follow us on Instagram for more updates
//             <FaInstagram className="text-3xl shrink-0"/>
//           </a>

//           <p className="text-3xl mt-10 font-bold">
//             Reach out to us:
//             <a
//               href="mailto:aidlyservice2025@gmail.com?subject=Inquiry about Aidly"
//               className="text-blue-500 underline ml-2 hover:text-blue-700"
//             >
//               aidlyservice2025@gmail.com
//             </a>
//           </p>
//         </div>


//       </section>
//       {showPopup && (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
//     <div className="bg-white rounded-2xl p-8 shadow-2xl text-center w-[350px]">
//       <h2 className="text-3xl font-bold mb-3">Launching Soon 🚀</h2>
//       <p className="text-gray-600 mb-5">
//         Aidly app will be available soon on Google Play Store & Apple Store.
//       </p>

//       <button
//         onClick={() => setShowPopup(false)}
//         className="bg-blue-500 text-white px-6 py-2 rounded-lg"
//       >
//         Close
//       </button>
//     </div>
//   </div>
// )}
//       <p className="text-center mb-1 text-xl">
//         © 2025 Aidly. All rights reserved.
//       </p>
//     </div>
//   );
// }

import React, { useState, useRef, useLayoutEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGooglePlay, FaApple, FaLinkedin, FaInstagram } from "react-icons/fa";
import landinglogo from "../../assets/landingLogo2.png";
import AidlyLogo from "../../assets/Aidly2.png";
import AmbulanceImage from "../../assets/AmbulanceImage.png";
import DoctorApointmentImage from "../../assets/DoctorApointmentImage.png";
import clinicmangementImage from "../../assets/clinicmanagementImage.png";
import HomeCareImage from "../../assets/HomeCareImage.png";
import MedicalStore from "../../assets/MedicalStoreImage.png";
import ReviewImage1 from "../../assets/ReviewImage.jpeg";
import ReviewImage2 from "../../assets/ReviewImage2.jpeg";
import ReviewImage3 from "../../assets/ReviewImage3.jpeg";
import ReviewImage4 from "../../assets/ReviewImage4.jpeg";
import ReviewImage5 from "../../assets/ReviewImage5.jpeg";

gsap.registerPlugin(ScrollTrigger);

const NAV_HEIGHT = 40;

const services = [
  {
    id: "ambulance",
    title: "Ambulance Booking",
    image: AmbulanceImage,
    
  },
  {
    id: "doctor",
    title: "Doctor Appointment",
    image: DoctorApointmentImage,
    
  },
  {
    id: "clinic",
    title: "Clinic Management",
    image: clinicmangementImage,
   
  },
  {
    id: "homecare",
    title: "Home Healthcare",
    image: HomeCareImage,
  
  },
  {
    id: "medical",
    title: "Medical Store",
    image: MedicalStore,
    
  },
];

const reviews = [
  {
    title: "Doctors & Clinics",
    text: "The survey indicates strong interest among doctors in adopting digital clinic management solutions. Respondents highlighted the need for streamlined appointments, digital patient records, billing, and efficient clinic operations. Overall, the responses validate the demand for an integrated, user-friendly platform that improves workflow and patient care.",
  },
  {
    title: "Users & Their Family",
    text: "The survey shows strong demand for affordable, trusted, and accessible digital healthcare services. Respondents prioritized faster ambulance response, verified doctors, home healthcare, and easy appointment booking while identifying long waiting times and high consultation costs as key challenges. Nearly 80% showed interest in a family healthcare subscription, with ₹299–₹499/month as the preferred price range. Overall, the responses validate strong interest in the Aidly platform.",
  },
  {
    title: "Pharmacy",
    text: "The survey shows strong interest among pharmacies in joining a digital platform to increase customer reach. Medicine expiry was identified as a key challenge, while demand for home delivery and online medicine orders was high. Trust was the main concern, highlighting the need for transparency, secure payments, and reliable support. The responses validate the need for barcode scanning, delivery integration, and sales reporting.",
  },
];

export default function LandingPage() {
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const heroLogoRef = useRef(null);
  const aboutLogoRef = useRef(null);

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const serviceRefs = useRef([]);
  const reviewsRef = useRef(null);
  const downloadRef = useRef(null);

  useLayoutEffect(() => {
   
    const sections = [aboutRef.current, reviewsRef.current, downloadRef.current];

    sections.forEach((section) => {
      if (!section) return;
      gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

   
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.9,
      duration: 1.5,
      ease: "power3.out",
      delay: 0,
    });

    

    
  }, []);

  const handleMouseMove = (e) => {
    const rect = heroLogoRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = (x - centerX) / 20;
    const rotateX = -(y - centerY) / 20;

    gsap.to(heroLogoRef.current, {
      rotationY: rotateY,
      rotationX: rotateX,
      scale: 1.05,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(heroLogoRef.current, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  // reviews section
  const autoplay = Autoplay({
  delay: 3000,
  stopOnInteraction: false,
});

const [emblaRef, emblaApi] = useEmblaCarousel(
  {
    loop: true,
    align: "center",
  },
  [autoplay]
);

const [selected, setSelected] = useState(0);

const onSelect = useCallback(() => {
  if (!emblaApi) return;
  setSelected(emblaApi.selectedScrollSnap());
}, [emblaApi]);

useEffect(() => {
  if (!emblaApi) return;

  onSelect();
  emblaApi.on("select", onSelect);
}, [emblaApi, onSelect]);

  
  return (
    <div
      className="bg-[linear-gradient(0deg,_#FFFFFF_0%,_#C6EBE8_39.9%,_#89C9CA_75.48%,_#1A5F48_100%)] min-h-screen bg-fixed overflow-x-hidden"
      style={{ paddingTop: NAV_HEIGHT  }}
    >
      <section
        
        ref={heroRef}
        className="pt-18 md:pt-18 flex flex-col items-center px-4 text-center"
      >
        <img
          ref={heroLogoRef}
          src={landinglogo}
          alt="Logo"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-[220px] sm:w-[250px] md:w-[350px] object-contain"
        />

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-blue-600">
          Aidly
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl font-bold mt-3 px-2">
         All In One Healthcare Platform

        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-8 md:w-full justify-center">
          <button onClick={()=>navigate("/about")} 
          className="px-8 md:px-12 py-4 rounded-2xl bg-blue-600 text-white text-xl sm:text-2xl md:text-3xl font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            Explore Aidly
          </button>

          <button className="px-8 md:px-12 py-4 rounded-2xl bg-blue-600 text-white text-xl sm:text-2xl md:text-3xl font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                   onClick={()=>navigate("/login")}>
            Admin Login
          </button>
        </div>
      </section>

      <section ref={aboutRef} className="py-16 md:py-20 px-4 md:px-10 scroll-mt-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-5 lg:gap-28">
          <div className="flex flex-col items-center  w-full md:w-1/2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left">
              Aidly
            </h2>

            <p className="text-xl sm:text-2xl md:text-3xl mt-5 max-w-xl text-center font-semibold md:text-left">
              Aidly is an all-in-one healthcare platform offering smart and digital unified ecosystem.
            </p>
          </div>

        <div
  
  className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[420px] md:h-[420px]"
>
  {/* Tablet (768px - 1023px) par logo show hoga */}
  <img
    src={AidlyLogo}
    alt="Aidly Logo"
    className=" w-full h-full object-contain"
  />
</div>
        </div>
      </section>

    {/* SERVICES */}
<section className="py-3 md:py-8 px-4 sm:px-6 mb-12 lg:mb-22 ">
  <h2 className="text-3xl sm:text-4xl md:text-5xl  font-bold text-center mb-8 md:mb-10">
    Our Services
  </h2>
<div className="max-w-7xl mx-auto space-y-8">

  {/* First 3 Cards */}
  <div className="grid grid-cols-1  sm:grid-cols-3 gap-5 ">
    {services.slice(0, 3).map((service, i) => (
        <div
      key={i}
     
      className={` 
        rounded-3xl overflow-hidden w-full md:w-full
       bg-[linear-gradient(0deg,_#1A5F48_0%,_#89C9CA_24.52%,_#C6EBE8_60.1%,_#FFFFFF_100%)]
        transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
        
      `}
    >
      <div className="flex flex-col items-center text-center p-2">
        <img
          src={service.image}
          alt={service.title}
          className="w-60 h-52 object-contain"
        />

        <h3 className="text-3xl text-white font-semibold mt-2">
          {service.title}
        </h3>

        <button
          className="mt-3 mb-2 bg-white px-8 py-3 rounded-full text-xl font-semibold hover:shadow-xl"
          onClick={() =>
            navigate("/services", {
              state: { service: service.id },
            })
          }
        >
          View Details
        </button>
      </div>
    </div>
    ))}
  </div>

  {/* Last 2 Cards */}
  <div className="flex flex-col sm:flex-row justify-center gap-8">
    {services.slice(3).map((service, i) => (
       <div
      key={i}
      ref={(el) => (serviceRefs.current[i] = el)}
      className={` w-full md:w-[240px] lg:w-[380px]  justify-self-center
        rounded-3xl overflow-hidden
       bg-[linear-gradient(0deg,_#1A5F48_0%,_#89C9CA_24.52%,_#C6EBE8_60.1%,_#FFFFFF_100%)]
        transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
        
      `}
    >
      <div className="flex flex-col items-center text-center p-2">
        <img
          src={service.image}
          alt={service.title}
            className={`w-60 h-52 object-contain ${
     service.title === "Medical Store"
      ? "md:mb-8 lg:-mb-1"
      : ""
  }`}
        />

        <h3 className="text-3xl text-white font-semibold mt-2">
          {service.title}
        </h3>

        <button
          className="mt-3 mb-2 bg-white px-8 py-3 rounded-full text-xl font-semibold hover:shadow-xl"
          onClick={() =>
            navigate("/services", {
              state: { service: service.id },
            })
          }
        >
          View Details
        </button>
      </div>
    </div>
    ))}
  </div>

</div>
</section>

    <section
  ref={reviewsRef}
  className="py-8 md:py-10 px-4 sm:px-6 lg:px-8 bg-white/30 mx-4  md:mx-8 rounded-[25px] md:rounded-[35px]"
>
  <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold">
    Aidly Feedback
  </h2>

  <p className="text-center text-lg sm:text-xl md:text-2xl font-semibold mt-3">
    What Our Survey Says
  </p>

  <div className="overflow-hidden mt-5 md:mt-12" ref={emblaRef}>
    <div className="flex">
      {reviews.map((review, i) => (
        <div
          key={i}
          className="
            flex-[0_0_100%]
            sm:flex-[0_0_92%]
            md:flex-[0_0_82%]
            xl:flex-[0_0_78%]
            px-2 sm:px-3 md:px-4
          "
        >
          <div
            className="
              bg-white
              rounded-[24px] md:rounded-[32px]
              shadow-lg
              px-2 sm:px-6 md:px-8
              py-3 md:py-8
              
              h-[480px]
              md:h-[530px]
              lg:h-[350px]
              flex flex-col
            "
          >
            {/* Fixed title height */}
            <div className="h-5 md:h-16 flex items-start">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                {review.title}
              </h3>
            </div>

            {/* Text */}
            <div className="mt-6 flex-1">
              <p className="text-base sm:text-lg md:text-2xl leading-7 md:leading-9 text-justify">
                {review.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="flex justify-center gap-3 mt-8">
    {reviews.map((_, i) => (
      <button
        key={i}
        onClick={() => emblaApi?.scrollTo(i)}
        className={`transition-all duration-300 rounded-full ${
          selected === i
            ? "w-7 h-3 bg-black"
            : "w-3 h-3 bg-gray-400"
        }`}
      />
    ))}
  </div>
</section>

      <section ref={downloadRef} className="py-16 px-4 md:px-5 scroll-mt-24">
     <div className="max-w-7xl mx-auto mt-10 px-4">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4 md:gap-12">

    {/* Heading */}
    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center md:text-left">
      Download Aidly App:
    </h2>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto  md:justify-center">

      <button
        onClick={() => setShowPopup(true)}
        className="
          bg-[#4A4A4A]
          hover:bg-[#3d3d3d]
          text-white
          flex items-center justify-center
          md:gap-3 gap-2
          px-1 md:px-6 py-2 md:py-4
          w-[210px] sm:w-auto mx-auto
          transition-all duration-300 rounded-sm
        "
      >
        <FaGooglePlay className="text-2xl md:text-4xl flex-shrink-0" />

        <div className="text-left leading-tight">
          <p className="text-lg md:text-2xl font-semibold">Get on Google</p>
          <p className="text-lg md:text-2xl font-semibold">Play Store</p>
        </div>
      </button>

      <button
        onClick={() => setShowPopup(true)}
        className="
          bg-[#4A4A4A]
          hover:bg-[#3d3d3d]
          text-white
          flex items-center justify-center
         md:gap-3 gap-2
          px-1 md:px-6 py-2 md:py-4
          w-[210px] sm:w-auto mx-auto
          transition-all duration-300 rounded-sm
        "
      >
        <FaApple className="text-2xl md:text-4xl flex-shrink-0" />

        <div className="text-left leading-tight">
          <p className="text-lg md:text-2xl font-semibold">Get on Apple</p>
          <p className="text-lg md:text-2xl font-semibold">App Store</p>
        </div>
      </button>

    </div>
  </div>
</div>

       <div className="mt-10 space-y-5 mx-auto max-w-lg md:max-w-xl">
                     <a
                       href="https://www.linkedin.com/company/aidly-in/"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center justify-center gap-1 md:gap-3 bg-[linear-gradient(90deg,_#C0C3FF_0%,_#313CB1_51.44%,_#C0C3FF_100%)] rounded-full px-2 py-3 md:py-4 md:px-4  text-base sm:text-lg md:text-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                     >
                       <span className="text-white">Follow on LinkedIn for more updates</span>
                       <FaLinkedin className=" text-2xl md:text-3xl shrink-0" />
                     </a>
           
                     <a
                       href="https://www.instagram.com/aidly_in?igsh=MWxxMWt1cGoxNmdscA=="
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center justify-center gap-1 md:gap-3 bg-[linear-gradient(90deg,_#B16DF4_0%,_#F4D56D_50%,_#B16DF4_100%)] rounded-full px-2 py-3 md:py-4 md:px-4 text-base sm:text-lg md:text-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                     >
                       <span className="text-white">Follow on Instagram for more updates</span>
                       <FaInstagram className="text-2xl md:text-3xl shrink-0" />
                     </a>
           
                    
                  

          <p className="text-lg sm:text-2xl md:text-3xl mt-10 font-bold text-center sm:text-left">
            Reach out to us:
            <a
              href="mailto:aidlyservice2025@gmail.com?subject=Inquiry about Aidly"
              className="text-blue-500 underline ml-2 hover:text-blue-700 break-all"
            >
              service@aidly.in
            </a>
          </p>
        </div>
      </section>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] px-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl text-center w-full max-w-[350px]">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Launching Soon 🚀</h2>
            <p className="text-gray-600 mb-5">
              Aidly app will be available soon on Google Play Store & Apple Store.
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

      <p className="text-center mb-2 text-base sm:text-lg md:text-xl">
        © 2025 Aidly. All rights reserved.
      </p>
      <p className="text-center mb-1 text-base sm:text-lg md:text-xl">
        Powered by Aidcore Technologies Pvt. Ltd
      </p>
    </div>
  );
}