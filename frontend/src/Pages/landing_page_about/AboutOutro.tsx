import { motion } from 'motion/react';

export default function AboutOutro() {
  return (
    <section className="bg-[#FAFAFA] py-20 sm:py-32 md:py-40 relative overflow-hidden flex flex-col items-center justify-center min-h-[50vh] md:min-h-[80vh]">

      {/* Background Wireframe */}
      <svg 
        viewBox="0 0 100 100" 
        className="absolute top-5 left-5 md:top-10 md:left-10 w-[150px] h-[150px] md:w-[400px] md:h-[400px] text-blue-600 opacity-[0.08]" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="0.15"
      >
        <path d="M50 10 C60 10, 70 30, 50 50 C30 30, 40 10, 50 10 Z" />
        <path d="M50 90 C60 90, 70 70, 50 50 C30 70, 40 90, 50 90 Z" />
        <path d="M10 50 C10 40, 30 30, 50 50 C30 70, 10 60, 10 50 Z" />
        <path d="M90 50 C90 40, 70 30, 50 50 C70 70, 90 60, 90 50 Z" />
        <circle cx="50" cy="50" r="5" />
      </svg>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-left relative w-full max-w-7xl mx-auto px-5 sm:px-10 md:px-20"
      >
        <h2 className="text-[13vw] sm:text-[10vw] md:text-8xl lg:text-[110px] text-slate-800 font-extralight tracking-tighter leading-[0.9] uppercase flex flex-col">
          
          <span className="block">Defining the</span>
          
          <span className="block ml-[15%] sm:ml-[20%] font-medium text-blue-600/90 italic lowercase font-serif pr-4 leading-tight">
            standard
          </span>
          
          <span className="block ml-[5%] sm:ml-[10%] md:ml-[30%]">
            of modern care
          </span>
        </h2>
        
        {/* Subtle Year Marker - Rotated for that high-end look */}
        <div className="absolute -right-2 md:right-10 top-1/2 -translate-y-1/2 text-slate-300 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase hidden xs:block [writing-mode:vertical-lr] rotate-180">
          Toothalie Clinic — Est. 2026
        </div>
      </motion.div>

      {/* Huge Faded Background Text */}
      <div className="absolute bottom-[-2%] left-0 w-full text-center overflow-hidden pointer-events-none select-none">
        <span className="text-[25vw] font-black text-slate-200/40 whitespace-nowrap tracking-tighter uppercase inline-block leading-none">
          Toothalie
        </span>
      </div>

    </section>
  );
}