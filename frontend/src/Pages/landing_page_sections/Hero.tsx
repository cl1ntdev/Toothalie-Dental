import React from "react";
import { motion } from "framer-motion";
import tooth from "../../assets/tooth.webp";
import Aurora from "../../components/Aurora";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 md:pt-24 font-poppins isolate bg-white/50">
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
        <Aurora
          colorStops={["#ffffff", "#bae6fd", "#0ea5e9"]}
          blend={2}
          amplitude={2}
          speed={0.4}
        />
      </div>

      <div className="absolute top-[15%] w-full text-center z-20 flex flex-col items-center px-4 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[clamp(1.75rem,8vw,4.5rem)] md:text-[10vw] leading-none font-light tracking-tight text-slate-800 uppercase text-center md:text-left font-ceramon"
        >
          Experience{" "}
          <span className="text-blue-600 font-medium">Dental Care</span>
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[clamp(1.25rem,6.5vw,3.5rem)] md:text-[7.5vw] leading-none font-bold tracking-tight text-slate-900 uppercase mt-[-1%] text-center md:text-left font-ceramon"
        >
          That Makes You Smile
        </motion.h1>
      </div>

      <div className="relative z-30 mt-[10vh] flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] flex items-center justify-center relative overflow-hidden rounded-[100px]">
            <img
              src={tooth}
              alt="Dental Care"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[60%] border border-gray-300/100 rounded-[100%] -rotate-12 pointer-events-none"></div>

          <div className="absolute top-[60%] -left-[30%] flex items-center gap-2">
            <div className="text-right">
              <p className="text-lg font-medium text-gray-800">
                Not just "TREATMENT", but
              </p>
              <p className="text-xs text-gray-500">care that brings results</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-gray-300 border-2 border-white shadow-sm"></div>
            <div className="w-16 h-[1px] bg-gray-300"></div>
          </div>

          <div className="absolute top-[75%] -right-[20%] flex items-center gap-2">
            <div className="w-16 h-[1px] bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300 border-2 border-white shadow-sm"></div>
            <div className="text-left">
              <p className="text-xs font-medium text-gray-800">
                Elegant platform that builds
              </p>
              <p className="text-xs text-gray-500">trust and calmness</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-10 top-[40%] max-w-[200px] hidden lg:block z-20"
      >
        <p className="text-5xl text-gray-800 font-medium mb-1">
          {" "}
          Are you interested{" "}
        </p>
        <p className="text-xl text-gray-500">in premium dental care?</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute right-10 top-[45%] max-w-[200px] hidden lg:block text-right z-20"
      >
        <p className="text-5xl text-gray-800 font-medium mb-1">
          {" "}
          We're open to new{" "}
        </p>
        <p className="text-xl text-gray-500">
          patients and creating beautiful smiles.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="absolute bottom-10 left-10 hidden md:block z-20"
      >
        <p className="text-xs text-gray-500">Powered by</p>
        <p className="text-sm font-medium text-gray-900">Toothalie</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="absolute bottom-10 right-10 hidden md:block z-20"
      >
        <p className="text-xs text-gray-500">Platform</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative md:absolute bottom-6 md:bottom-12 z-20 flex flex-col items-center gap-4 w-full md:w-auto px-4 md:px-0"
      >
        <p className="text-sm md:text-base text-gray-600 max-w-md text-center">
          Toothalie Dental Clinic offers secure online booking, fast digital
          records, and truly personalized treatment plans so your care fits your
          schedule.
        </p>
        <button className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-medium text-base md:text-lg tracking-wide transition-all shadow-xl hover:from-blue-700 hover:to-cyan-600 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-200">
          Book an Appointment
        </button>
      </motion.div>
    </section>
  );
}
