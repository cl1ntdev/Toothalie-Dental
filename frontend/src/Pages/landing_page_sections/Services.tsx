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
    description:
      "Routine exams, professional cleanings, and preventive care that keep every Toothalie patient healthy year-round.",
    imgsource: card1,
  },
  {
    id: "02",
    title: "Cosmetic Dentistry",
    description:
      "Whitening, bonding, and custom veneers designed to match facial aesthetics while protecting natural enamel.",
    imgsource: card2,
  },
  {
    id: "03",
    title: "Implantology & Restorative",
    description:
      "Single-tooth implants and full-arch solutions planned with 3D CT scanning for long-lasting comfort and function.",
    imgsource: card3,
  },
  {
    id: "04",
    title: "Endodontics & Emergency Care",
    description:
      "Rapid pain relief, root canal therapy, and same-day urgent visits supported by digital records and secure follow-ups.",
    imgsource: card4,
  },
];

export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardElements = container.children;
      if (cardElements[activeIndex]) {
        const activeCard = cardElements[activeIndex] as HTMLElement;
        const scrollPosition =
          activeCard.offsetLeft -
          container.clientWidth / 2 +
          activeCard.clientWidth / 2;
        container.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, services.length - 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section id="services" className="py-32 overflow-hidden font-poppins">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-[0.95] tracking-tight font-ceramon">
              More than <span className="text-blue-400">a clinic</span>
              <br />
              <span className="font-medium">
                — Your smile
                <br />
                partner
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-xs sm:max-w-md leading-relaxed">
              At our clinic, you're not just receiving treatment — you're
              gaining a lifelong partner in dental health and well-being.
            </p>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-12 pt-4 px-4 sm:px-1/2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
                  className={`group relative min-w-[280px] md:min-w-[340px] h-[450px] flex-shrink-0 rounded-3xl overflow-hidden transition-all duration-500 ease-out cursor-pointer ${
                    isActive
                      ? "scale-105 z-20 ring-4 ring-white/80"
                      : "scale-95 opacity-50 hover:opacity-100 hover:scale-[0.98] hover:shadow-xl hover:z-10"
                  }`}
                >
                  <img
                    src={service.imgsource}
                    alt={service.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
                      isActive ? "scale-105" : "scale-100 group-hover:scale-105"
                    }`}
                  />

                  <div
                    className={`absolute top-0 inset-x-0 h-[40%] bg-gradient-to-b from-white/95 via-white/70 to-transparent backdrop-blur-[2px] pointer-events-none transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}
                  ></div>
                  {/* <div className={`absolute bottom-0 inset-x-0 h-[40%] bg-gradient-to-t from-white/95 via-white/70 to-transparent backdrop-blur-[2px] pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}></div> */}

                  <div className="relative z-10 p-8 flex flex-col justify-between h-full pointer-events-none">
                    <div>
                      <h3
                        className={`text-2xl whitespace-pre-line leading-tight mb-3 font-ceramon transition-all duration-500 ${
                          isActive
                            ? "font-semibold text-blue-900 translate-y-0"
                            : "font-medium text-gray-800 translate-y-2 group-hover:translate-y-0 group-hover:text-blue-700"
                        }`}
                      >
                        {service.title}
                      </h3>

                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: 10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-gray-800 leading-relaxed font-medium bg-white/60 p-3.5 rounded-xl backdrop-blur-md shadow-sm border border-white/50 mt-2">
                            {service.description}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    <div className="flex justify-end overflow-hidden">
                      <span
                        className={`text-[80px] leading-none tracking-tighter transition-all duration-500 ${
                          isActive
                            ? "text-blue-900/30 font-medium translate-y-0"
                            : "text-gray-900/10 font-light translate-y-4 group-hover:translate-y-0 group-hover:text-blue-900/20"
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

          <div className="absolute bottom-0 left-4 flex gap-3 mt-8 items-center">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`px-3 py-2 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all focus:outline-none ${
                activeIndex === 0
                  ? "border border-gray-300 text-gray-400 cursor-not-allowed bg-white/30 opacity-60"
                  : "border border-blue-300 bg-white/90 text-blue-700 hover:shadow-md hover:scale-105"
              }`}
              aria-label="Previous service"
            >
              <span className="sr-only">Previous</span>
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              disabled={activeIndex === services.length - 1}
              className={`px-3 py-2 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all focus:outline-none ${
                activeIndex === services.length - 1
                  ? "border border-gray-300 text-gray-400 cursor-not-allowed bg-white/30 opacity-60"
                  : "border border-blue-300 bg-white/90 text-blue-700 hover:shadow-md hover:scale-105"
              }`}
              aria-label="Next service"
            >
              <span className="sr-only">Next</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* mobile readable labels */}
            <div className="hidden sm:flex flex-col ml-2 text-xs text-gray-600">
              <span className="hidden md:inline">Navigate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
