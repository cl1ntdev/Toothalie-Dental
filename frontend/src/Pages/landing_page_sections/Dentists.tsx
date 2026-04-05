import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowRight as ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppointmentModal from "../Authenticated/Panes/PatientPane/AppointmentModal";
import dentist1 from '../../assets/home_page_assets/dentist1.webp';
import dentist2 from '../../assets/home_page_assets/dentist2.webp';
import dentist3 from '../../assets/home_page_assets/dentist3.webp';
import dentist4 from '../../assets/home_page_assets/dentist4.webp';
import dentist5 from '../../assets/home_page_assets/dentist5.webp';
import dentist6 from '../../assets/home_page_assets/dentist6.webp';

const doctors = [
  {
    id: 1,
    name: "Dr. Mikaela Reyes", 
    experience: "3 years",
    specialization: "Prosthodontics",
    image: dentist1, 
  },
  {
    id: 2,
    name: "Dr. Olivia Bennett",
    experience: "7 years",
    specialization: "Cosmetic Dentistry & Veneers",
    image: dentist2, 
  },
  {
    id: 3,
    name: "Dr. Jamie Anderson",
    experience: "5 years",
    specialization: "Implantology",
    image: dentist3,
  },
  {
    id: 4,
    name: "Dr. Sophia Martinez",
    experience: "5 years",
    specialization: "Orthodontics (Aligners)",
    image: dentist4,
  },
  {
    id: 5,
    name: "Dr. Hana Sy", 
    experience: "9 years",
    specialization: "Endodontics",
    image: dentist5, 
  },
  {
    id: 6,
    name: "Dr. Liana Chen", 
    experience: "6 years",
    specialization: "Periodontics",
    image: dentist6, 
  }
];

export default function Dentist() {
  const [selectedId, setSelectedId] = useState(2);
  const carouselRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const navigate = useNavigate();
  // Arrow Click Scrolling
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Mouse Drag Scrolling Functions
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiply for faster scrolling
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-24 lg:py-32 bg-white font-['Plus_Jakarta_Sans',_sans-serif] overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-16 items-end">
          <div className="lg:col-span-7">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 tracking-tight mb-8"
            >
              Our <span className="font-semibold">Dentists</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl font-light"
            >
              Behind every confident smile is a dedicated professional. Our team of highly qualified dentists combines years of clinical experience with continuous training in the latest dental techniques.
            </motion.p>
          </div>

          <div className="lg:col-span-5 flex flex-col md:flex-row lg:flex-col xl:flex-row justify-between items-start md:items-end lg:items-start xl:items-end gap-8 pb-2">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base text-slate-500 leading-relaxed max-w-sm font-light"
            >
              Whether you need routine check-ups or complex treatments, you can trust our dentist to deliver the highest standard of dentistry.
            </motion.p>

            {/* Navigation Arrows */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 shrink-0"
            >
              <button 
                onClick={() => scroll("left")}
                className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-all active:scale-95 group"
                aria-label="Scroll left"
              >
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scroll("right")}
                className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-blue-900/20 transition-all active:scale-95 group"
                aria-label="Scroll right"
              >
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Interactive Drag-to-Scroll Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
        >
          <div 
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            // Add 'cursor-grab' and remove snap-x when dragging so it feels fluid
            className={`flex gap-6 md:gap-8 overflow-x-auto hide-scrollbar pb-12 pt-4 select-none ${
              isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {doctors.map((doctor) => {
              const isSelected = selectedId === doctor.id;

              return (
                <div 
                  key={doctor.id}
                  onClick={() => !isDragging && setSelectedId(doctor.id)} // Prevent selection if user is just dragging
                  className={`snap-start shrink-0 w-[280px] md:w-[320px] flex flex-col transition-all duration-500 ${
                    isSelected ? "scale-100" : "scale-95 hover:scale-[0.98] opacity-80 hover:opacity-100"
                  }`}
                >
                  {/* Portrait Container */}
                  <div className={`w-full aspect-[4/5] rounded-3xl overflow-hidden mb-6 transition-all duration-500 relative border pointer-events-none ${
                    isSelected ? "bg-white border-blue-100 shadow-xl shadow-blue-900/5" : "bg-slate-50 border-transparent"
                  }`}>
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-50/80 to-transparent mix-blend-multiply z-0"></div>
                    )}
                    
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className={`w-full h-full object-cover object-top transition-all duration-700 relative z-10 ${
                        isSelected ? "grayscale-0 scale-105" : "grayscale contrast-125"
                      }`}
                      referrerPolicy="no-referrer"
                      draggable="false" // Prevent ghost image drag
                    />
                  </div>

                  {/* Doctor Details */}
                  <div className="flex flex-col flex-grow px-2">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 font-['Plus_Jakarta_Sans'] tracking-tight">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-1">
                      <span className="font-semibold text-slate-800">Experience:</span> {doctor.experience}
                    </p>
                    <p className="text-sm text-slate-500 mb-6 line-clamp-2">
                      <span className="font-semibold text-slate-800">Specialization:</span> {doctor.specialization}
                    </p>

                    {/* Dynamic Action Button */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isSelected ? "max-h-20 opacity-100 mt-auto" : "max-h-0 opacity-0"
                    }`}>
                      <button className="w-full bg-slate-900 text-white rounded-full py-3.5 px-6 font-semibold flex items-center justify-between hover:bg-slate-800 hover:shadow-lg hover:shadow-blue-500/20 transition-all group cursor-pointer"
                        onClick={() => {
                          setIsModalOpen(true);
                        }}
                      >
                        <span className="tracking-wide text-sm md:text-base">Book appointment</span>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
                          <ArrowRightIcon className="w-4 h-4" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
        {isModalOpen && (
          <AppointmentModal
            onClose={() => setIsModalOpen(false)}
            appointmentSuccess={() => alert("siccess")} 
            operatorPhone=""
            isStatic={true}
          />
        )}
      </div>

      {/* Global CSS block to ensure scrollbar is stripped across all browsers */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .hide-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />
    </section>
  );
}