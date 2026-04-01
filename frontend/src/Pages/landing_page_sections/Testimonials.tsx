import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const personas = [
  {
    id: 1,
    name: "Isabella T., 34",
    role: "Creative Director — Cebu City",
    avatar: "https://picsum.photos/seed/isabella/100/100",
    profile:
      "Aesthetic-driven professional who values her time. Demands transparent pricing, visual proof of outcomes, and seamless digital booking.",
    painPoints:
      "Outdated phone-booking systems, hidden aesthetic fees, and the inability to preview cosmetic results before committing.",
    testimonial:
      '"I needed a clinic that respects my time. The ability to book instantly and see digital mockups of my veneers was an absolute game-changer."',
  },
  {
    id: 2,
    name: "Marcus L., 52",
    role: "Corporate Executive — Makati",
    avatar: "https://picsum.photos/seed/marcus/100/100",
    profile:
      "Results-oriented and highly scheduled. Prioritizes the longevity of surgical implants and expects clear, measurable post-op tracking.",
    painPoints:
      "Unpredictable recovery timelines and inefficient physical follow-up appointments that disrupt a busy workday.",
    testimonial:
      '"The digital portal kept me connected with my surgeon. I tracked my implant healing remotely without missing a single board meeting."',
  },
  {
    id: 3,
    name: "Elena R., 28",
    role: "Architect — Bayawan City",
    avatar: "https://picsum.photos/seed/elena/100/100",
    profile:
      "Detail-oriented but prone to dental anxiety. Requires empathetic communication, clear step-by-step guidance, and a calming environment.",
    painPoints:
      "Cold clinical jargon, rushed consultations, and feeling disconnected from her own dental health records.",
    testimonial:
      '"For the first time, I wasn\'t intimidated. The visual breakdowns and secure access to my records gave me complete peace of mind."',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 lg:py-5 font-poppins">
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
            
            <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-gray-900 leading-relaxed tracking-tight font-ceramon">
              Behind every procedure is a{" "}
              <span className="font-medium italic border-b border-blue-200">
                study of human needs.
              </span>{" "}
              I mapped the patient journey to ensure Toothalie{" "}
              <span className="text-soft-blue">anticipates every expectation</span>{" "}
              of premium dental care.
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

              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-900 mb-2">
                  Pain points
                </h5>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {persona.painPoints}
                </p>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">
                  Quote
                </h5>
                <p className="text-sm md:text-base text-gray-800 leading-relaxed italic">
                  {persona.testimonial}
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
                  Prove quality and reliability through clear visuals, verified patient stories, and accessible credentials.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0"></div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Streamline access to pricing, treatment mapping, and appointment booking into a frictionless process.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0"></div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Establish a secure environment of trust and safety through transparent, asynchronous communication.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0"></div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Position the clinic as a modern, technology-driven leader that retains a deeply empathetic human touch.
                </p>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}