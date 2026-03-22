import { motion } from 'motion/react';

const BlueFlower = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="#4a86e8">
    <path d="M50 0 C60 30, 70 40, 100 50 C70 60, 60 70, 50 100 C40 70, 30 60, 0 50 C30 40, 40 30, 50 0 Z" />
    <circle cx="50" cy="50" r="10" fill="#2b5cba" />
  </svg>
);

export default function AboutProblems() {
  const problems = [
    { id: 1, title: 'Long wait times', desc: 'Spending hours in the waiting room despite having a scheduled appointment.', offset: 'translate-x-0 md:-translate-x-24' },
    { id: 2, title: 'Confusing records', desc: 'Losing track of past treatments, x-rays, and upcoming procedures.', offset: 'translate-x-0 md:translate-x-32' },
    { id: 3, title: 'Booking hassles', desc: 'Playing phone tag just to find an available slot that fits your schedule.', offset: 'translate-x-0 md:-translate-x-16' },
    { id: 4, title: 'Hidden costs', desc: 'Unclear pricing and surprise bills after the treatment is already done.', offset: 'translate-x-0 md:translate-x-20' },
  ];

  return (
    <section className="bg-[#f8f9fa] py-20 md:py-32 relative overflow-hidden">
      {/* Soft blue radial gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-400/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Scattered flowers */}
      <BlueFlower className="absolute top-20 right-32 w-12 h-12 opacity-80 rotate-12" />
      <BlueFlower className="absolute top-1/3 left-20 w-8 h-8 opacity-60 -rotate-45" />
      <BlueFlower className="absolute bottom-1/3 right-40 w-16 h-16 opacity-90 rotate-90" />
      <BlueFlower className="absolute bottom-20 left-32 w-10 h-10 opacity-70 rotate-180" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-32">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#1a2b2b] leading-tight tracking-tight">
            Does this sound<br/>familiar?
          </h2>
          <p className="text-blue-200/50 text-3xl md:text-5xl font-bold uppercase tracking-widest mt-8 md:mt-0">
            Typical Problems
          </p>
        </div>

        <div className="flex flex-col items-center gap-16 md:gap-24">
          {problems.map((prob, index) => (
            <motion.div 
              key={prob.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`text-center relative max-w-md ${prob.offset}`}
            >
              <div className="flex items-start justify-center">
                <span className="text-xl font-medium mr-1 mt-2 text-[#1a2b2b]">{prob.id}</span>
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-[#1a2b2b]">{prob.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mt-4 max-w-sm mx-auto leading-relaxed">
                {prob.desc}
              </p>
              {/* Small flower decoration near the text */}
              {index % 2 === 0 && (
                <BlueFlower className="absolute -top-6 -right-8 w-6 h-6 opacity-50" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}