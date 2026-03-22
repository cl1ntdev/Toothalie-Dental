import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

import dev from "../../assets/about_page_assets/dev1.jpg";
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
    <section id="testimonials" className="bg-[#f4f5f7] py-12 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight tracking-tight">
            People Behind <br className="hidden md:block" /> Toothalie
          </h2>

          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
            <p className="text-xs md:text-sm text-gray-600 font-medium md:text-right">
              Built on insights from 250+ Clinics
              <br className="hidden md:block" /> & Thousands of Patients
            </p>

            <div className="flex gap-2 md:gap-4">
              <button
                onClick={() => handleNavigate("prev")}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-all"
              >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button
                onClick={() => handleNavigate("next")}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-gray-900 bg-gray-900 text-white hover:bg-gray-800 transition-all"
              >
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>

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
                className={`flex-shrink-0 snap-center transition-all duration-500 ease-in-out ${
                  isExpanded
                    ? "w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[40vw] xl:w-[35vw]"
                    : "w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[25vw] xl:w-[22vw]"
                }`}
              >
                <div
                  onClick={() => handleNavigate(index)}
                  className={`group relative cursor-pointer w-full bg-gray-200 mb-6 transition-all duration-500 ease-in-out overflow-hidden shadow-sm ${
                    isExpanded
                      ? "h-[100vw] sm:h-[480px] md:h-[540px] lg:h-[600px]"
                      : "h-[85vw] sm:h-[380px] md:h-[400px] lg:h-[440px]"
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
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle overlay for unexpanded cards */}
                  {!isExpanded && (
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  )}
                </div>

                <div className="px-1 md:px-0">
                  <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                    {test.name}
                  </h4>

                  <p className="text-xs md:text-sm lg:text-base text-gray-500 font-medium mb-3 uppercase tracking-wider">
                    {test.role}
                  </p>

                  <div className="flex items-start gap-3 mb-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(isExpanded ? "next" : index);
                      }}
                      className="mt-1 flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                    >
                      <ChevronRight className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                    
                    <blockquote className={`italic text-gray-800 leading-relaxed transition-all duration-500 ${
                        isExpanded ? "text-sm md:text-base lg:text-lg opacity-100" : "text-xs md:text-sm opacity-60 line-clamp-2"
                      }`}>
                      “{test.quote}”
                    </blockquote>
                  </div>

                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-blue-600/70 border-b-2 border-blue-600/20 pb-1 inline-block">
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