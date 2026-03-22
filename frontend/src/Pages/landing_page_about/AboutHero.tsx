import { ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import mypic from '../../assets/mypic.webp'

export default function AboutHero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-slate-900">
      <img 
        src={mypic}
        alt="Dental Surgery" 
        className="absolute inset-0 w-full h-full object-cover opacity-90 md:opacity-100"
        referrerPolicy="no-referrer"
      />
      
      {/* Dynamic gradient for better text contrast on mobile */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 md:from-white/20 md:via-black/10 md:to-transparent" />
      
      <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10 md:pb-20 pt-24">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 lg:gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            {/* Fluid text sizes: 4xl on mobile, 7xl on desktop */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-4 md:mb-6 tracking-tight">
              Your Trusted<br className="hidden sm:block"/> Dental Solutions
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 font-light max-w-md">
              Serving patients with top-quality materials, expert specialists, and reliable treatments for every smile.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-md rounded-[24px] md:rounded-[32px] p-5 md:p-6 lg:p-8 flex flex-col gap-3 md:gap-4 shadow-2xl w-full md:w-[340px] lg:w-[380px] relative z-10"
          >
            <div>
              <h4 className="text-slate-900 font-bold text-lg md:text-xl mb-1">Our Philosophy</h4>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                We believe dentistry should be painless, transparent, and tailored to you. We utilize cutting-edge technology to prioritize your comfort.
              </p>
            </div>
          
            <div className="mt-1 md:mt-2 flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-900 bg-slate-100 py-2 px-4 rounded-full w-max">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
              <span>Certified Professionals</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}