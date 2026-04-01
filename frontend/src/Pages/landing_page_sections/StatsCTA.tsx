import React from "react";
import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";
import TypingText from "@/components/TypingText";

export default function StatsCTA() {
  const stats = [
    { to: 25, suffix: "k+", label: "Patients Treated" },
    { to: 12, suffix: "+", label: "Years of Care" },
    { to: 99, suffix: "%", label: "Platform Rating" }, // Changed 4.9 to 99% for better CountUp visual
  ];

  return (
    <section className="py-32 font-poppins ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column (Matches 'About' structure) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-start gap-4 mb-16">
              <span className="text-[100px] leading-[0.8] font-light text-gray-900 tracking-tighter">
                04
              </span>
              <div className="pt-2">
                <h2 className="text-xl font-medium text-gray-900 leading-tight font-ceramon">
                  Platform
                  <br />
                  Impact
                </h2>
              </div>
            </div>

            {/* TypingText used as an elegant label replacing the pills from 'About' */}
            <div className="mt-4 md:mt-8">
              <TypingText 
                text="Elevate Your Practice" 
                className="text-soft-blue uppercase tracking-[0.2em] text-xs font-bold"
                delay={0.2}
              />
              <div className="h-[1px] w-12 bg-blue-200 mt-4"></div>
            </div>
          </div>

          <div className="lg:col-span-8 lg:pl-16  flex flex-col justify-center h-full">
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-8 tracking-tight font-ceramon"
            >
              Forward-thinking dentistry —{" "}
              <span className="font-medium italic text-blue-600 font-ceramon">
                where clinical excellence
              </span>{" "}
              meets digital innovation.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed tracking-tight mb-6"
            >
              We've built a dynamic platform focused on empowering aspiring clinics to master the necessary skills for both launching and scaling.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg font-light text-gray-500 leading-relaxed mb-16"
            >
              Cognizant of the entire spectrum, we meticulously navigate through the phases, commencing from the germination of an idea, extending to the intricate stages of expansion, and resiliently embracing setbacks.
            </motion.p>

            {/* Stats Grid using CountUp */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-12 ">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.15 }}
                  className="flex flex-col"
                >
                  <div className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-2 tracking-tighter flex items-baseline font-ceramon">
                    <CountUp 
                      from={0} 
                      to={stat.to} 
                      separator="," 
                      direction="up" 
                      duration={2.5} 
                      startCounting={true} 
                    />
                    <span className="text-blue-500 ml-1 text-3xl md:text-4xl font-medium">{stat.suffix}</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-widest mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}