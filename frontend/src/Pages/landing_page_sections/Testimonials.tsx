import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const personas = [
  {
    id: 1,
    name: "Johann, 70",
    role: "Retired engineer,\nbased in Prague",
    avatar: "https://picsum.photos/seed/johann/100/100",
    profile:
      "Financially independent, prioritizes comfort, quality, and privacy. Views oral health as an investment in his image and wellbeing. Prefers premium materials, European-level standards, and tailored care.",
    painPoints:
      "Avoids clinics that feel commercial or pushy. Dislikes medical jargon and overly complex booking processes. Worries about procedure safety, recovery time, and hidden fees. Needs simple, step-by-step guidance and reassurance of premium quality.",
  },
  {
    id: 2,
    name: "Klara, 32",
    role: "Marketing specialist,\nbased in Warsaw",
    avatar: "https://picsum.photos/seed/klara/100/100",
    profile:
      "Cares deeply about appearance and confidence. Leads an active lifestyle, works remotely, and prefers brands that reflect quality and professionalism. Researches clinics online, pays attention to reviews, certifications, and real patient stories.",
    painPoints:
      "Gets frustrated by outdated websites, unclear treatment stages, and hidden costs. Feels anxious about dental procedures and wants reassurance through expert explanations and realistic visuals. Seeks a clinic that combines advanced technology with a human touch.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 lg:py-32 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="flex items-start gap-4">
              <span className="text-[100px] leading-[0.8] font-light text-gray-900 tracking-tighter">
                03
              </span>
              <div className="pt-2">
                <h2 className="text-xl font-medium text-gray-900 leading-tight font-ceramon">
                  User
                  <br />
                  Research
                </h2>
              </div>
            </div>

            <div className="mt-16">
              <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                <ArrowDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-gray-900 leading-snug tracking-tight font-ceramon">
              I conducted a detailed audience analysis to{" "}
              <span className="font-medium">
                align the clinic's website UX with the real needs
              </span>
              , motivations, and expectations{" "}
              <span className="text-soft-blue">of patients</span> seeking
              premium implants and other advanced dental services.
            </h3>
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#eef2f6] rounded-3xl p-6 md:p-8 flex flex-col min-h-[280px]"
            >
              <div className="flex items-center gap-4 mb-8">
                <img
                  src={persona.avatar}
                  alt={persona.name}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-medium text-gray-900 text-base md:text-lg">
                    {persona.name}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 whitespace-pre-line leading-tight">
                    {persona.role}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h5 className="text-sm font-medium text-gray-900 mb-2">
                  Profile
                </h5>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {persona.profile}
                </p>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">
                  Pain points
                </h5>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {persona.painPoints}
                </p>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#1a1a1a] rounded-3xl p-8 text-white"
          >
            <h4 className="font-medium text-lg mb-8">Goals</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0"></div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Understand the quality and reliability of treatments through
                  clear visuals, patient stories, and doctor credentials
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0"></div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Easily access pricing, treatment options, and appointment
                  booking in one or two steps
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0"></div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Feel trust and safety through transparent, respectful
                  communication.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0"></div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Recognize the clinic as a premium, technology-driven yet
                  caring dental provider.
                </p>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
