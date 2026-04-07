import React, { useState } from "react";
import { motion } from "framer-motion";
import tooth from "../../assets/tooth.webp";
import location from "../../assets/location.png";
import Aurora from "../../components/Aurora";
import { useNavigate } from "react-router-dom";
import CountUp from "@/components/CountUp";
import TypingText from "@/components/TypingText";
import AppointmentModal from "../Authenticated/Panes/PatientPane/AppointmentModal";
const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-20, 20, -20],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

const reverseFloatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [15, -15, 15],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Hero() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-10 md:pt-20 font-poppins isolate bg-white">
      <style
        dangerouslySetInnerHTML={{
          __html: `
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

              .glass-panel {
                background: rgba(255, 255, 255, 0.5);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid rgba(255, 255, 255, 0.8);
                box-shadow: 0 10px 40px -10px rgba(31, 38, 135, 0.15);
              }
            `,
        }}
      />

      {/* 1. Cinematic Background Layer */}
      {/* 1. Responsive Cinematic Background Layer */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        /* Changed inset-0 to top-0 left-0 and used min-h-full to ensure it stretches */
        className="absolute top-0 left-0 w-full h-full min-h-[100svh] -z-30 overflow-hidden"
      >
        <img
          src={location}
          alt="Location Background"
          /* added min-w-full and min-h-full to force the stretch on mobile */
          className="w-full h-full min-w-full min-h-full object-cover opacity-30 object-center"
        />

        {/* White wash overlay with responsive blur */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] md:backdrop-blur-[4px]"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
        className="absolute inset-0 w-full h-full -z-20 pointer-events-none mix-blend-multiply opacity-80"
      >
        <Aurora
          colorStops={["#ffffff", "#bae6fd", "#0ea5e9"]}
          blend={2}
          amplitude={2}
          speed={1.1}
        />
      </motion.div>

      {/* 2. Hero Headers - REFRESHED QUOTE */}
      <div className="absolute top-[8%] md:top-[12%] w-full text-center z-20 flex flex-col items-center px-4 pointer-events-none font-['Plus_Jakarta_Sans',_sans-serif]">
        {/* --- Hero Headers: Option 2 (Eloquent & Minimal) --- */}
        <div className="absolute top-[8%] md:top-[12%] w-full text-center z-20 flex flex-col items-center px-4 pointer-events-none font-['Plus_Jakarta_Sans',_sans-serif]">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] leading-none font-extralight tracking-tighter text-slate-900 text-center drop-shadow-sm"
          >
            Confidence{" "}
            <span className="text-blue-600 font-['Playfair_Display',_serif] font-bold italic capitalize tracking-normal relative inline-block">
              Designed.
              {/*<motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 5, delay: 2, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-8 text-3xl text-yellow-400 hidden md:block drop-shadow-md"
              >
                ✦
              </motion.span>*/}
            </span>
          </motion.h1>

          {/* Eloquent Subtext: No gradients, pure animation & spacing */}
          <motion.p
            initial={{ opacity: 0, y: 20, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.4em" }}
            transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
            className="text-[3vw] sm:text-[2vw] md:text-[1.2vw] lg:text-[0.8vw] font-medium text-slate-500 mt-4 md:mt-6 text-center uppercase"
          >
            Modern dentistry tailored to your persona
          </motion.p>
        </div>
      </div>

      {/* 3. Main Interactive Centerpiece */}
      {/* Changed mt-32 to mt-20 to move the whole assembly UP */}
      <div className="relative z-30 mt-20 md:mt-24 mb-10 md:mb-0 flex flex-col items-center w-full max-w-5xl">
        {/* Animated Background Orbit Rings - Moved up with container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{
            opacity: { delay: 1.8, duration: 2 },
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[650px] md:h-[650px] border-[1.5px] border-blue-400/30 border-dashed rounded-full pointer-events-none -z-10"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: -360 }}
          transition={{
            opacity: { delay: 1.8, duration: 2 },
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] md:w-[800px] md:h-[800px] border-[1px] border-teal-400/20 rounded-full pointer-events-none -z-10"
        />

        {/* Central Floating Tooth */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 1.5,
            delay: 1.2,
            type: "spring",
            bounce: 0.3,
          }}
          className="relative group z-20"
        >
          <motion.div
            variants={floatAnimation}
            initial="initial"
            animate="animate"
          >
            {/* Added -mt-12 to nudge the tooth specifically higher within the assembly */}
            <div className="w-[280px] h-[380px] md:w-[400px] md:h-[500px] flex items-center justify-center relative transition-transform duration-700 hover:scale-105 hover:-translate-y-4 -mt-12">
              <img
                src={tooth}
                alt="Dental Care Centerpiece"
                className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(14,165,233,0.35)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* 4. Left Stat Card */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 2.2,
              type: "spring",
              bounce: 0.4,
            }}
            className="absolute -left-[10%] md:-left-[25%] top-[20%] md:top-[30%] z-40"
          >
            <motion.div
              variants={reverseFloatAnimation}
              initial="initial"
              animate="animate"
            >
              <div className="glass-panel rounded-2xl p-4 md:p-6 flex flex-col items-start gap-1 transform transition-all hover:-translate-y-2 hover:shadow-blue-400/40 cursor-default">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-gray-800 font-['Plus_Jakarta_Sans'] flex items-baseline tracking-tight">
                    <CountUp
                      from={0}
                      to={1500}
                      separator=","
                      direction="up"
                      duration={2.5}
                      startCounting={true}
                    />
                    <span className="text-blue-600 ml-1">+</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-500 font-semibold uppercase tracking-wider mt-1">
                  Happy Smiles Restored
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Floating Label */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 2.4,
              type: "spring",
              bounce: 0.4,
            }}
            className="absolute -right-[5%] md:-right-[20%] bottom-[15%] md:bottom-[20%] z-40"
          >
            <motion.div
              variants={floatAnimation}
              initial="initial"
              animate="animate"
            >
              <div className="glass-panel rounded-2xl p-4 md:p-6 flex flex-col items-start gap-1 transform transition-all hover:-translate-y-2 hover:shadow-teal-400/40 cursor-default">
                <span className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 font-['Playfair_Display'] italic">
                  100% Painless
                </span>
                <p className="text-sm md:text-base text-gray-600 font-medium max-w-[140px] md:max-w-[170px] leading-snug">
                  Care that brings calmness & trust.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* 5. Side Elements */}
      <div className="absolute left-6 lg:left-12 top-[45%] max-w-[180px] lg:max-w-[240px] hidden xl:block z-20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="h-[3px] bg-blue-500 mb-5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        />
        <TypingText
          text="Are you ready for premium care?"
          className="text-2xl lg:text-3xl text-gray-800 font-semibold mb-2 leading-snug font-['Plus_Jakarta_Sans']"
          delay={3.2}
        />
      </div>

      <div className="absolute right-6 lg:right-12 top-[45%] max-w-[180px] lg:max-w-[240px] hidden xl:block text-right z-20 flex flex-col items-end">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 1, delay: 3.0 }}
          className="h-[3px] bg-teal-400 mb-5 rounded-full ml-auto shadow-[0_0_10px_rgba(45,212,191,0.5)]"
        />
        <TypingText
          text="We're open to new patients."
          className="text-2xl lg:text-3xl text-gray-800 font-semibold mb-2 leading-snug font-['Plus_Jakarta_Sans']"
          delay={3.4}
        />
      </div>

      {/* 6. Footer Info */}
      <div className="absolute bottom-6 left-6 right-6 justify-between items-end hidden md:flex z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.6 }}
        >
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-1">
            Powered by
          </p>
          <p className="text-base font-extrabold text-gray-900 font-['Plus_Jakarta_Sans'] tracking-tight">
            Toothalie
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.7 }}
          className="text-right"
        >
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-1">
            Platform
          </p>
          <p className="text-base font-extrabold text-gray-900 tracking-tight">
            © 2026
          </p>
        </motion.div>
      </div>

      {/* 7. CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.8, type: "spring", bounce: 0.5 }}
        className="relative md:absolute bottom-8 md:bottom-6 z-50 flex flex-col items-center gap-4 w-full md:w-auto px-6 md:px-0 mt-8 md:mt-0"
      >
        <button
          className="group relative w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white rounded-full font-bold text-sm md:text-base tracking-wide transition-all overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(14,165,233,0.5)] hover:-translate-y-1 active:scale-95"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          <span className="relative z-10 flex items-center justify-center gap-2 font-['Plus_Jakarta_Sans']">
            Book an Appointment
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
        </button>
      </motion.div>
      {isModalOpen && (
        <AppointmentModal
          onClose={() => setIsModalOpen(false)}
          appointmentSuccess={() => alert("siccess")} 
          operatorPhone=""
          isStatic={true}
        />
      )}
    </section>
  );
}
