import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

import dev from "../../assets/about_page_assets/dev2.webp";
import image6 from "../../assets/about_page_assets/image6.webp";
import image2 from "../../assets/about_page_assets/image2.webp";
import image3 from "../../assets/about_page_assets/image3.webp";

const testimonials = [
  {
    id: 1,
    name: "Clint Jay Estrellanes",
    role: "Lead Full Stack Developer",
    quote: "Great software bridges the gap between complex clinic operations and a seamless patient experience. That was our north star when building Toothalie.",
    company: "TOOTHALIE CORE TEAM",
    image: dev,
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Partner Dentist & Clinical Advisor",
    quote: "Toothalie doesn’t just digitize records; it transforms how we interact with our patients. It’s the intuitive tool the dental industry has been waiting for.",
    company: "TOOTHALIE CLINIC",
    image: image2,
  },
  {
    id: 3,
    name: "David Wright",
    role: "Head of Clinic Operations",
    quote: "Managing appointments and patient histories used to be our biggest bottleneck. Toothalie streamlined our entire workflow, giving us back hours of our day.",
    company: "PARTNER CLINIC",
    image: image3,
  },
  {
    id: 4,
    name: "Emily Chen",
    role: "Dental Associate & Patient Advocate",
    quote: "Patients expect a frictionless experience from booking the appointment to sitting in the chair. Toothalie finally brings that modern standard to dental care.",
    company: "TOOTHALIE CLINIC",
    image: image6,
  },
];
export default function AboutTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number>(testimonials[0].id);

  const handleNavigate = (action: "next" | "prev" | number) => {
    let targetIndex = 0;
    const currentIndex = testimonials.findIndex((t) => t.id === expandedId);

    if (typeof action === "number") {
      targetIndex = action;
    } else {
      const safeIndex = currentIndex === -1 ? 0 : currentIndex;
      targetIndex =
        action === "next"
          ? (safeIndex + 1) % testimonials.length
          : (safeIndex - 1 + testimonials.length) % testimonials.length;
    }

    setExpandedId(testimonials[targetIndex].id);

    setTimeout(() => {
      if (scrollRef.current) {
        const targetCard = scrollRef.current.children[targetIndex] as HTMLElement;
        if (targetCard) {
          targetCard.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    }, 100);
  };

  return (
    <section id="testimonials" className="bg-[#f4f5f7] py-12 md:py-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 leading-tight">
            People Behind <br className="hidden md:block" /> Toothalie
          </h2>

          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
            <p className="text-xs text-gray-600 font-medium md:text-right">
              Built on insights from 250+ Clinics
              <br className="hidden md:block" /> & Thousands of Patients
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => handleNavigate("prev")}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-900 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleNavigate("next")}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Scroll Area */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 items-start no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((test, index) => {
            const isExpanded = expandedId === test.id;

            return (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: index * 0.1 }}
                /* ADJUSTED CARD WIDTHS */
                className={`flex-shrink-0 snap-center transition-all duration-500 ease-in-out ${
                  isExpanded
                    ? "w-[75vw] sm:w-[50vw] md:w-[35vw] lg:w-[30vw]"
                    : "w-[55vw] sm:w-[30vw] md:w-[22vw] lg:w-[18vw]"
                }`}
              >
                <div
                  onClick={() => handleNavigate(index)}
                  /* ADJUSTED IMAGE CONTAINER HEIGHTS */
                  className={`group relative cursor-pointer w-full bg-gray-200 mb-4 transition-all duration-500 ease-in-out overflow-hidden shadow-sm ${
                    isExpanded
                      ? "h-[80vw] sm:h-[350px] md:h-[420px]" 
                      : "h-[65vw] sm:h-[250px] md:h-[300px]"
                  }`}
                  style={{
                    clipPath:
                      index === 0
                        ? "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)"
                        : "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%)",
                  }}
                >
                  <img
                    src={test.image}
                    alt={test.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {!isExpanded && (
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  )}
                </div>

                <div className="px-1">
                  <h4 className="text-base md:text-lg font-bold text-gray-900">
                    {test.name}
                  </h4>

                  <p className="text-[10px] md:text-xs text-gray-500 font-bold mb-2 uppercase tracking-widest">
                    {test.role}
                  </p>

                  <div className="flex items-start gap-2 mb-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(isExpanded ? "next" : index);
                      }}
                      className="mt-1 flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                    >
                      <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                    
                    <blockquote className={`italic text-gray-800 leading-snug transition-all duration-500 ${
                        isExpanded ? "text-xs md:text-sm opacity-100" : "text-[10px] opacity-60 line-clamp-2"
                      }`}>
                      “{test.quote}”
                    </blockquote>
                  </div>

                  <p className="text-[9px] font-bold uppercase tracking-widest text-blue-600/70 border-b border-blue-600/10 pb-0.5 inline-block">
                    {test.company}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}