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
    quote:
      "Great software bridges the gap between complex clinic operations and a seamless patient experience. That was our north star when building Toothalie.",
    company: "TOOTHALIE CORE TEAM",
    image: dev,
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Partner Dentist & Clinical Advisor",
    quote:
      "Toothalie doesn’t just digitize records; it transforms how we interact with our patients. It’s the intuitive tool the dental industry has been waiting for.",
    company: "TOOTHALIE CLINIC",
    image: image2,
  },
  {
    id: 3,
    name: "David Wright",
    role: "Head of Clinic Operations",
    quote:
      "Managing appointments and patient histories used to be our biggest bottleneck. Toothalie streamlined our entire workflow, giving us back hours of our day.",
    company: "PARTNER CLINIC",
    image: image3,
  },
  {
    id: 4,
    name: "Emily Chen",
    role: "Dental Associate & Patient Advocate",
    quote:
      "Patients expect a frictionless experience from booking the appointment to sitting in the chair. Toothalie finally brings that modern standard to dental care.",
    company: "TOOTHALIE CLINIC",
    image: image6, // Make sure this matches your updated image import
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
        const targetCard = scrollRef.current.children[
          targetIndex
        ] as HTMLElement;
        if (targetCard) {
          targetCard.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    }, 150);
  };

  return (
    <section className="bg-[#f4f5f7] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight tracking-tight">
            People Behind <br /> Toothalie
          </h2>

          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-sm text-gray-600 font-medium md:text-right">
              Built on insights from 250+ Clinics
              <br className="hidden md:block" />& Thousands of Patients
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => handleNavigate("prev")}
                className="text-gray-400 hover:text-gray-900 transition"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => handleNavigate("next")}
                className="text-gray-900 hover:text-gray-600 transition"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* CAROUSEL */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 items-start [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {testimonials.map((test, index) => {
            const isExpanded = expandedId === test.id;

            return (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                // 1. Dynamic Widths (as you requested)
                className={`flex-shrink-0 snap-center transition-all duration-500 ease-in-out ${
                  isExpanded
                    ? "w-[90vw] sm:w-[60vw] md:w-[45vw] lg:w-[40vw] xl:w-[35vw]"
                    : "w-[80vw] sm:w-[45vw] md:w-[30vw] lg:w-[25vw] xl:w-[22vw]"
                }`}
              >
                {/* 2. IMAGE CONTAINER: Added dynamic Heights to enforce a strict portrait ratio! */}
                <div
                  onClick={() => handleNavigate(isExpanded ? "next" : index)}
                  className={`group cursor-pointer w-full bg-gray-200 mb-5 transition-all duration-500 ease-in-out overflow-hidden ${
                    isExpanded
                      ? "h-[110vw] sm:h-[480px] md:h-[540px] lg:h-[600px] xl:h-[640px]"
                      : "h-[100vw] sm:h-[380px] md:h-[400px] lg:h-[440px] xl:h-[480px]"
                  }`}
                  style={{
                    clipPath:
                      index === 0
                        ? "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)"
                        : "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%)",
                  }}
                >
                  <img
                    src={test.image}
                    alt={test.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* TEXT */}
                <div className="pr-4">
                  <h4 className="text-base md:text-xl lg:text-2xl font-semibold text-gray-900 transition-all duration-300">
                    {test.name}
                  </h4>

                  <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-3 leading-tight">
                    {test.role}
                  </p>

                  <div className="text-sm md:text-base lg:text-lg text-gray-800 leading-relaxed mb-4 flex items-start gap-3 transition-all duration-300">
                    <button
                      onClick={() =>
                        handleNavigate(isExpanded ? "next" : index)
                      }
                      className="mt-0.5 flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
                      aria-label={
                        isExpanded ? "Next testimonial" : "Expand testimonial"
                      }
                      aria-expanded={isExpanded}
                    >
                      <ChevronRight size={16} />
                    </button>
                    <blockquote className="m-0 pl-2 text-sm md:text-base lg:text-lg italic text-gray-800 leading-relaxed">
                      “{test.quote}”
                    </blockquote>
                  </div>

                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-300 pb-1 inline-block">
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
