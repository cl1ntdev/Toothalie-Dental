import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-32 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-start gap-4 mb-16">
              <span className="text-[100px] leading-[0.8] font-light text-gray-900 tracking-tighter">
                01
              </span>
              <div className="pt-2">
                <h2 className="text-xl font-medium text-gray-900 leading-tight font-ceramon">
                  About
                  <br />
                  Project
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="px-4 py-3 rounded-full bg-gray-50 text-center text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                Patient Management
              </div>
              <div className="px-4 py-3 rounded-full bg-gray-50 text-center text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                Modern Technology
              </div>
              <div className="px-4 py-3 rounded-full bg-gray-50 text-center text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                Premium Dentistry
              </div>
              <div className="px-4 py-3 rounded-full bg-gray-50 text-center text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                Personalized Care
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8 lg:pl-16 lg:border-l border-gray-100 flex flex-col justify-center h-full">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-12 tracking-tight font-ceramon"
            >
              A new era of dentistry —{" "}
              <span className="font-medium">where advanced technology</span>{" "}
              meets natural aesthetics.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 leading-tight tracking-tight"
            >
              <span className="font-medium">Toothalie creates smiles</span> that
              unite the precision of{" "}
              <span className="text-soft-blue">premium implantology</span> with
              the elegance of personalized care.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
