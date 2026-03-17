import { ShieldCheck,Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import mypic from '../../assets/mypic.webp'
export default function AboutHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      <img 
        src={mypic}
        alt="Dental Surgery" 
        className="absolute inset-0 w-full h-full object-cover opacity-100"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-black/5 to-transparent" />
      
      <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
              Your Trusted<br/>Dental Solutions
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-light max-w-lg">
              Serving patients with top-quality materials, expert specialists, and reliable treatments for every smile.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-md rounded-[32px] p-6 flex flex-col gap-4 shadow-2xl w-full md:w-[340px] relative z-10"
          >
           
            
            <div>
              <h4 className="text-slate-900 font-bold text-xl mb-1">Our Philosophy</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                We believe dentistry should be painless, transparent, and tailored to you. We utilize cutting-edge technology to prioritize your comfort and long-term oral health.
              </p>
            </div>
          
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-900 bg-slate-100 py-2 px-4 rounded-full w-max">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
              <span>Certified Professionals</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}