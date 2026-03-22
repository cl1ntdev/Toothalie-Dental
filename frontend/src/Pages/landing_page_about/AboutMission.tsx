import { motion } from 'motion/react';

const WireframeFlower = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="0.15">
    <path d="M50 10 C60 10, 70 30, 50 50 C30 30, 40 10, 50 10 Z" />
    <path d="M50 90 C60 90, 70 70, 50 50 C30 70, 40 90, 50 90 Z" />
    <path d="M10 50 C10 40, 30 30, 50 50 C30 70, 10 60, 10 50 Z" />
    <path d="M90 50 C90 40, 70 30, 50 50 C70 70, 90 60, 90 50 Z" />
    <path d="M20 20 C30 15, 45 35, 50 50 C35 45, 15 30, 20 20 Z" />
    <path d="M80 80 C70 85, 55 65, 50 50 C65 55, 85 70, 80 80 Z" />
    <path d="M80 20 C70 15, 55 35, 50 50 C65 45, 85 30, 80 20 Z" />
    <path d="M20 80 C30 85, 45 65, 50 50 C35 55, 15 70, 20 80 Z" />
    <circle cx="50" cy="50" r="5" />
  </svg>
);

export default function AboutMission() {
  return (
    <section id="mission" className="relative py-20 md:py-40 overflow-hidden bg-[#F8F9FA]">
      
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,_rgba(235,244,255,1)_0%,_rgba(255,255,255,1)_100%)]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px]" />
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-slate-100 rounded-full blur-[100px]" />
      </div>

      {/* Light-themed Wireframes */}
      <WireframeFlower className="absolute -top-40 -left-20 w-[600px] h-[600px] text-blue-600 opacity-[0.07]" />
      <WireframeFlower className="absolute -bottom-40 -right-20 w-[800px] h-[800px] text-slate-400 opacity-[0.07]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row gap-4 justify-between text-[10px] text-slate-400 mb-12 md:mb-24 uppercase tracking-[0.3em] font-medium">
          <span className="flex items-center gap-2">
            <span className="w-8 h-[1px] bg-slate-300" /> 01 THE GENESIS
          </span>
          <span>SINCE 2024</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-slate-900 text-3xl md:text-4xl font-light tracking-tight leading-snug">
              Born from a vision to <br/>
              <span className="font-semibold italic text-blue-600">humanize</span> the clinical.
            </h3>
            <p className="text-sm md:text-base leading-relaxed tracking-wider uppercase font-normal text-slate-500 max-w-sm">
              Toothalie began in 2024 as a response to "Dental Anxiety." We realized that while technology had advanced, the human experience in the chair had stayed in the past. 
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:mt-64 space-y-8"
          >
            <p className="text-sm md:text-base leading-relaxed tracking-wider uppercase font-normal text-slate-500 max-w-sm ml-auto">
              Our history is built on the fusion of high-precision bio-mechanics and the warmth of a luxury sanctuary. We don't just treat teeth; we curate smiles that reflect the soul of our patients.
            </p>
            <div className="h-[1px] w-24 bg-blue-600 ml-auto md:mr-0" />
            <p className="text-[10px] text-right text-slate-400 tracking-[0.2em] uppercase">
              The Toothalie Standard
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}