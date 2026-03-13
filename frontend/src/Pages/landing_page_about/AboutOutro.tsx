import { motion } from 'motion/react';
import { Image as ImageIcon, Bookmark, Link as LinkIcon } from 'lucide-react';

export default function AboutOutro() {
  return (
    <section className="bg-[#FAFAFA] py-40 relative overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">

      {/* Background Wireframe - Softened for light mode */}
      <svg 
        viewBox="0 0 100 100" 
        className="absolute top-10 left-10 w-[400px] h-[400px] text-blue-600 opacity-[0.08]" 
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

      {/* Decorative Gradient Blur - Adds "airiness" */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center relative w-full max-w-5xl mx-auto px-4"
      >
        <h2 className="text-5xl md:text-7xl lg:text-[90px] text-slate-800 font-extralight tracking-tight leading-[1.05] text-left md:ml-32">
          A SMILE<br/>
          <span className="ml-12 md:ml-32 font-medium text-blue-600/90 italic">EVERYONE</span>
          <br/>
          <span className="ml-12 md:ml-48">WILL NEVER FORGET</span>
        </h2>
        
        {/* Subtle Year Marker */}
        <div className="absolute right-10 top-1/2 text-slate-400 font-mono text-xs tracking-widest vertical-text">
          EST. 2026
        </div>
      </motion.div>

      {/* Huge Faded Background Text - Now in a soft gray */}
      <div className="absolute bottom-[-2%] left-0 w-full text-center设备 overflow-hidden pointer-events-none">
        <span className="text-[18vw] font-black text-slate-200/40 whitespace-nowrap tracking-tighter uppercase">
          Toothalie
        </span>
      </div>

    </section>
  );
}