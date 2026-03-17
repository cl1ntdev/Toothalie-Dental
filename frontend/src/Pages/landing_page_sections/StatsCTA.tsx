import { motion } from "framer-motion";
import { ArrowRight, Instagram, Twitter, Facebook } from "lucide-react";

export default function StatsCTA() {
  return (
    <section className="py-24 lg:py-32 font-poppins relative overflow-hidden">
      {/* Subtle background gradients for a modern clinic/SaaS feel */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-12 w-72 h-72 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-soft-blue font-semibold tracking-wider uppercase text-sm mb-4 block">
                  Elevate Your Practice
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-1 tracking-tight font-ceramon">
                  Forward-Thinking
                </h2>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-500 leading-tight mb-8 tracking-tight font-ceramon">
                  Dental Solutions.
                </h2>
              </motion.div>

              {/*<motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <button
                  className="px-6 md:px-8 py-3 md:py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-base md:text-lg transition-all shadow-xl shadow-blue-700/30 flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  aria-label="Get Started with Toothalie"
                >
                  Get Started <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </motion.div>*/}
            </div>

            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-16 lg:mt-32 flex items-center gap-6"
            >
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Connect with us</p>
              <div className="h-px w-12 bg-slate-200"></div>
              <div className="flex gap-3">
                {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div> */}
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-lg md:text-xl text-slate-800 font-medium mb-6 leading-relaxed">
                We've built a dynamic platform focused on empowering aspiring
                clinics to master the necessary skills for both launching and
                scaling.
              </p>
              <p className="text-sm md:text-base text-slate-600 font-light mb-12 leading-relaxed">
                Cognizant of the entire spectrum, we meticulously navigate
                through the phases, commencing from the germination of an idea,
                extending to the intricate stages of expansion, and resiliently
                embracing setbacks.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8 border-t border-slate-200">
              {[
                { value: "25,000+", label: "Patients treated" },
                { value: "12+", label: "Years of care" },
                { value: "4.9/5", label: "Average patient rating" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                >
                  <p className="text-4xl md:text-5xl font-bold text-soft-blue mb-2 tracking-tighter">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-500 font-medium">
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
