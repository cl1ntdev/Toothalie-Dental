import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import card1 from "../../assets/card1.webp";
import card2 from "../../assets/card2.webp";
import card3 from "../../assets/card3.webp";
import card4 from "../../assets/card4.webp";

const services = [
  {
    id: "01",
    title: "General Dentistry",
    description: "Routine exams, professional cleanings, and preventive care that keep every Toothalie patient healthy year-round.",
    imgsource: card1,
  },
  {
    id: "02",
    title: "Cosmetic Dentistry",
    description: "Whitening, bonding, and custom veneers designed to match facial aesthetics while protecting natural enamel.",
    imgsource: card2,
  },
  {
    id: "03",
    title: "Implantology & Restorative",
    description: "Single-tooth implants and full-arch solutions planned with 3D CT scanning for long-lasting comfort and function.",
    imgsource: card3,
  },
  {
    id: "04",
    title: "Endodontics & Emergency Care",
    description: "Rapid pain relief, root canal therapy, and same-day urgent visits supported by digital records and secure follow-ups.",
    imgsource: card4,
  },
];

export default function Services() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardElements = container.children;
      if (cardElements[activeIndex]) {
        const activeCard = cardElements[activeIndex];
        const scrollPosition =
          activeCard.offsetLeft -
          container.clientWidth / 2 +
          activeCard.clientWidth / 2;
        container.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  const handleNext = () => setActiveIndex((prev) => Math.min(prev + 1, services.length - 1));
  const handlePrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 overflow-hidden font-poppins">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-12 md:mb-20">
          <div className="lg:col-span-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-gray-900 leading-[1.1] lg:leading-[0.95] tracking-tight font-ceramon">
              More than <span className="text-blue-400">a clinic</span>
              <br className="hidden sm:block" />
              <span className="font-medium"> — Your smile partner</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-base md:text-lg text-gray-500 max-w-md leading-relaxed">
              At our clinic, you're not just receiving treatment — you're
              gaining a lifelong partner in dental health and well-being.
            </p>
          </div>
        </div>

        <div className="relative group/nav">
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-16 md:pb-20 pt-4 px-[5vw] sm:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {services.map((service, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative snap-center min-w-[85vw] sm:min-w-[340px] md:min-w-[400px] h-[480px] md:h-[550px] flex-shrink-0 rounded-[2.5rem] overflow-hidden transition-all duration-500 ease-out cursor-pointer ${
                    isActive
                      ? "scale-100 sm:scale-105 z-20 ring-4 ring-white/80 "
                      : "scale-[0.92] opacity-60 hover:opacity-100 hover:scale-[0.95]"
                  }`}
                >
                  <img
                    src={service.imgsource}
                    alt={service.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out ${
                      isActive ? "scale-110" : "scale-100"
                    }`}
                  />

                  <div className={`absolute top-0 inset-x-0 h-[50%] bg-gradient-to-b from-white/95 via-white/40 to-transparent transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`} />

                  <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full pointer-events-none">
                    <div>
                      <h3
                        className={`text-2xl md:text-3xl whitespace-pre-line leading-tight mb-3 font-ceramon transition-all duration-500 ${
                          isActive
                            ? "font-semibold text-blue-900 translate-y-0"
                            : "font-medium text-gray-800 translate-y-4"
                        }`}
                      >
                        {service.title}
                      </h3>

                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="max-w-[280px] md:max-w-full"
                        >
                          <p className="text-sm md:text-base text-gray-800 leading-relaxed font-medium bg-white/80 p-4 rounded-2xl backdrop-blur-md shadow-sm border border-white/50 mt-2">
                            {service.description}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <span
                        className={`text-7xl md:text-8xl leading-none tracking-tighter transition-all duration-700 ${
                          isActive
                            ? "text-blue-900/30 font-medium translate-y-0"
                            : "text-gray-900/10 font-light translate-y-8"
                        }`}
                      >
                        {service.id}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center sm:justify-start items-center gap-4 mt-2 sm:absolute sm:bottom-0 sm:left-0">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                activeIndex === 0
                  ? "border border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                  : "border border-blue-200 bg-white text-blue-600 hover:scale-110 active:scale-95"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              disabled={activeIndex === services.length - 1}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                activeIndex === services.length - 1
                  ? "border border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                  : "border border-blue-200 bg-white text-blue-600 hover:scale-110 active:scale-95"
              }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="hidden sm:block h-px w-12 bg-gray-200 mx-2" />
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
              {activeIndex + 1} / {services.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}