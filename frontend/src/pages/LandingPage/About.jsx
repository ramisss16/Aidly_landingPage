import { useRef, useEffect, useState } from "react";

import gsap from "gsap";
import satyam from "../../assets/satyamImage.jpeg"
import satyamremovebg from "../../assets/satyamImage-removebg.png"
import shefali from "../../assets/shifaliImage.jpeg"
import shifaliremovebg from "../../assets/shifaliImage-removebg.png"
import shahid from "../../assets/shahidImage.png"
import shahidremovebg from "../../assets/shahidImage-removebg.png"
import sachin from "../../assets/sachinImage.jpeg"
import sachinremovebg from "../../assets/sachinImage-removebg.png"
import shivam from "../../assets/shivamImage.jpeg"
import shivamremovebg from "../../assets/shivamImage-removebg.png"
import ramish from "../../assets/ramishImage.png"
import ramishremovebg from "../../assets/ramishImage-removebg.png"
import riya from "../../assets/riyaImage.jpeg"
import riyaremovebg from "../../assets/riyaImage-removebg.png"
import bharti from "../../assets/bhartiImage.jpeg"
import bhartiremovebg from "../../assets/bhartiImage-removebg.png"
import nisha from "../../assets/nishaImage.jpeg"
import nisharemovebg from "../../assets/nishaImage-removebg.png"
import siya from "../../assets/siyaImage.jpeg"
import siyaremovebg from "../../assets/siyaImage-removebg.png"
import shubham from "../../assets/ShubhamImage.jpeg"
import shubhamremovebg from "../../assets/ShubhamImage-removebg.png"

const AboutAidly = () => {

const [current, setCurrent] = useState(0);

const intervalRef = useRef(null);

const startSlider = () => {
  clearInterval(intervalRef.current);

  intervalRef.current = setInterval(() => {
    setCurrent((prev) => (prev + 1) % team.length);
  }, 2500);
};

const stopSlider = () => {
  clearInterval(intervalRef.current);
};

useEffect(() => {
  startSlider();

  return () => clearInterval(intervalRef.current);
}, []);

     const aboutRef = useRef(null);

       useEffect(() => {
    gsap.from(aboutRef.current, {
      y: -120,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });
  }, []);

  const team = [
  {
    image: satyam,
    bgromveImage: satyamremovebg,
    name: "Satyam Kumar",
    role: "Co-Founder & CEO",
    description: "Driving the company’s overarching strategic vision, commercial growth, and investor relations. He focuses on scaling early operations, securing venture capital, and building high-impact market partnerships to expand the company's footprint.",
  },
  {
    image: shefali,
    bgromveImage: shifaliremovebg,
    name: "Shefali Kishan",
    role: "Co-Founder & CTO",
    description: " Overseeing the company’s technological strategy, architecture, and product development. She translates company goals into a robust, scalable technical roadmap, leading engineering execution from inception to scale.",
  },
  {
    image: shahid,
    bgromveImage: shahidremovebg,
    name: "Shahid Ahmed",
    role: "Graphic Designer",
    description: "Creates engaging visuals for Aidly's website/App, branding, and marketing materials. Ensures a consistent brand identity while designing user-friendly graphics that enhance communication and user experience.",
  
  },
  {
    image: sachin,
    bgromveImage: sachinremovebg,
    name: "Sachin Kumar",
    role: "Manual Tester",
    description: "Performed manual testing by executing functional test cases.Identified and reported defects while verifying bug fixes. Collaborated with the team to ensure software quality and reliability",
  },
  {
    image: shivam,
    bgromveImage: shivamremovebg,
    name: "Shivam Kumar Sahu",
    role: "Researcher",
    description: "Financial Researcher specialized in startup economics, investment analysis, and data-driven growth strategies",
  },
  {
    image: ramish,
    bgromveImage: ramishremovebg,
    name: "Ramish Khan",
    role: "Full Stack Web Developer",
    description: "Contributed to the end-to-end development of Aidly by building scalable frontend components and robust backend services. Worked on authentication, healthcare service modules, API integration, dashboards, and deployment while ensuring security, performance, and reliability.",
  },
  {
    image: riya,
    bgromveImage: riyaremovebg,
    name: "Riya Jain",
    role: "Full Stack Web Developer",
    description: "Developed and integrated scalable frontend and backend modules. Contributed to authentication, appointment management, dashboards, API integration, and deployment while ensuring a seamless user experience",
  },
  {
    image: bharti,
    bgromveImage: bhartiremovebg,
    name: "Bharti Kushwaha",
    role: "App Front-end Developer",
    description: "Worked as a Frontend Developer, designing and developing responsive and user-friendly mobile applications using Flutter. Created visually appealing UI screens and ensured a seamless user experience across the application.",
  },
  {
    image: nisha,
    bgromveImage: nisharemovebg,
    name: "Nisha Sahu",
    role: "App Front-end Developer",
    description: "Frontend Developer specializing in Flutter, with experience in developing responsive, scalable, and user-centric mobile applications. Passionate about crafting modern UI, enhancing usability, and delivering seamless cross-platform experiences.",
  },
  {
    image: siya,
    bgromveImage: siyaremovebg,
    name: "Siya Naik",
    role: "App Back-end Developer",
    description: "Developed and maintained the application's backend services, APIs, and database. Ensured secure data management, efficient server-side functionality, and reliable performance to support a seamless user experience.",
  },
  {
    image: shubham,
    bgromveImage: shubhamremovebg,
    name: "Shubham Kumar",
    role: "Chief Financial Officer (CFO)",
    description: "Leads the company's financial strategy, budgeting, fundraising, and financial planning while ensuring regulatory compliance and operational efficiency. Focused on building a sustainable financial foundation, driving strategic growth, managing financial risks, and supporting data-driven decision-making to accelerate the company's vision of transforming healthcare through technology.",
  },
];

const activeMember = team[current];
 
const imageRef = useRef(null);
const contentRef = useRef(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      imageRef.current,
      {
        opacity: 0,
        x: 60,
        scale: 0.9,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
      }
    );

    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        x: -60,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
      }
    );
  });

  return () => ctx.revert();
}, [current]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
   <div className="fixed inset-0 -z-10 bg-[linear-gradient(0deg,_#FFFFFF_0%,_#C6EBE8_39.9%,_#89C9CA_75.48%,_#1A5F48_100%)]" />
    <div ref={aboutRef} className=" px-4 sm:px-6 md:px-10 py-8 md:py-10">

      <h2 className="pt-19 md:pt-20 text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight mb-5 text-center">
        About Aidly
      </h2>

      <p className="text-lg sm:text-xl md:text-2xl  font-semibold leading-relaxed text-black mx-auto">
         Aidly is an all-in-one digital healthcare platform that connects patients, 
        healthcare providers, and clinics through a unified ecosystem. Our platform offers smart ambulance booking, real-time
         emergency support, online doctor consultations, home healthcare services, medical product delivery, and an intelligent
          Clinic Management System to simplify healthcare access and operations.
      </p>

      <p className="text-lg sm:text-xl md:text-2xl  font-semibold leading-relaxed text-black mt-4 md:mt-6">
       Designed for both patients and healthcare organizations, Aidly combines modern technology with reliable healthcare services
        to deliver a seamless experience. From emergency medical assistance and everyday healthcare needs to managing clinic
         operations through dedicated dashboards for Clinic Admins, Managers, Doctors, and Receptionists, Aidly helps improve 
         efficiency, enhance patient care, and make quality healthcare more accessible for everyone.
      </p>

      <h2 className="pt-8 md:pt-18 text-3xl sm:text-4xl md:text-5xl font-bold text-center text-black leading-tight mb-3">
        Our Vision
      </h2>

      <p className="text-lg sm:text-xl md:text-2xl  font-semibold leading-relaxed text-black mt-4 md:mt-6">
        To create a healthcare ecosystem where quality medical assistance is accessible to every individual,
        regardless of location, time, or circumstance. We envision a future where technology empowers healthcare providers
        and patients to connect instantly, resulting in faster response times, better patient outcomes, and improved overall
        healthcare experiences.
      </p>

      <h2 className="pt-8 md:pt-18 text-3xl sm:text-4xl md:text-5xl text-center font-bold text-black leading-tight mb-3">
        Our Mission
      </h2>

      <p className="text-lg sm:text-xl md:text-2xl  font-semibold leading-relaxed text-black mt-4 md:mt-6">
        Our mission is to simplify healthcare access by leveraging technology to deliver efficient, transparent,
        and patient-centric services. We strive to provide reliable emergency support, professional medical consultations,
        convenient home healthcare solutions, and hassle-free medicine delivery through a unified platform.
      </p>

      <h2 className="pt-8 md:pt-18 text-3xl sm:text-4xl md:text-5xl  font-bold text-center text-black leading-tight mb-6 md:mb-10">
        Why Choose Aidly?
      </h2>

   <ul className="list-disc list-outside w-fit mx-auto space-y-3 text-lg sm:text-xl md:text-2xl">
  <li><span className="font-bold">All-in-One Healthcare Solution</span> – Multiple healthcare services available on a single platform.</li>
  <li><span className="font-bold">Fast Emergency Response</span> – Quick access to ambulances and emergency support.</li>
  <li><span className="font-bold">Convenient Healthcare Access</span> – Consult doctors and access healthcare services anytime, anywhere.</li>
  <li><span className="font-bold">Patient-Centered Approach</span> – Designed to prioritize user safety, comfort, and convenience.</li>
  <li><span className="font-bold">Technology-Driven Efficiency</span> – Smart digital solutions that streamline healthcare delivery.</li>
  <li><span className="font-bold">Reliable and Accessible</span> – Healthcare support available whenever you need it.</li>
</ul>

      <section className="mt-20">

  <h2 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-black mb-5 ">
    Our Team
  </h2>

  <div className="grid lg:grid-cols-2 gap-2 items-center lg:px-24 md:-mt-6 ">

    {/* Left */}
    <div ref={contentRef} className="text-center ">

      <h3 className=" text-2xl md:text-4xl font-bold text-black">
        {activeMember.name}
      </h3>

      <h4 className="text-xl md:text-2xl font-bold mt-2">
        {activeMember.role}
      </h4>

      <p className="mt-6 md:text-xl leading-relaxed text-black">
        {activeMember.description}
      </p>

    </div>

    {/* Right */}
    <div ref={imageRef} className="flex justify-center">

      <img
        src={activeMember.bgromveImage}
        alt=""
         loading="eager"
        decoding="async"
        className="w-[260px] md:w-[370px]  object-contain"
      />

    </div>

  </div>

  {/* Team Card */}

  <div className=" rounded-[35px] bg-white/30 backdrop-blur-md p-3">

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-5">

    {team.map((member, index) => (
  <div
    key={index}
    onClick={() => setCurrent(index)}
    onMouseEnter={stopSlider}
    onMouseLeave={startSlider}
    className="flex flex-col items-center text-center cursor-pointer"
  >
    <img
      src={member.image}
      alt={member.name}
       loading="eager"
       decoding="async"
      className={`w-15 h-15 md:w-20 md:h-20  rounded-full object-cover transition-all duration-500 shadow-lg
      ${
        current === index
          ? "border-4 border-[#1A5F48] scale-110 opacity-100"
          : "border-4 border-white opacity-60 hover:opacity-100 hover:scale-105"
      }`}
    />

    <h3
      className={`mt-2  md:text-lg font-bold transition-all duration-300 ${
        current === index ? "text-[#1A5F48]" : "text-black"
      }`}
    >
      {member.name}
    </h3>

    <p
      className={`text-base md:text-[15px] transition-all duration-300 ${
        current === index ? "text-[#1A5F48]" : "text-black"
      }`}
    >
      {member.role}
    </p>
  </div>
))}

    </div>

  </div>

</section>

      

      <div className="w-fit font-bold text-center text-xl sm:text-2xl md:text-4xl mt-8 md:mt-12 mx-auto px-2">
        Aidly – All In One Healthcare Platform
      </div>
    </div>
    </div>
    
  );
};

export default AboutAidly;