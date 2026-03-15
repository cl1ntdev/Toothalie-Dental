import { Phone } from 'lucide-react';
import { motion } from 'motion/react';
import mypic from '../../assets/mypic.webp'
export default function AboutHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-900">
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
            className="bg-white rounded-[32px] p-3 flex items-center gap-5 shadow-2xl w-full md:w-auto"
          >
            <img 
              src="https://picsum.photos/seed/dentist-avatar/200/200" 
              alt="Dr. Sarah Jenkins" 
              className="w-28 h-28 rounded-[24px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="pr-6 py-2">
              <h4 className="text-gray-900 font-bold text-xl">Dr. Sarah Jenkins</h4>
              <p className="text-gray-500 text-sm mb-4 font-medium">Lead Dentist at Toothalie</p>
              <button className="bg-[#ff6b35] hover:bg-[#e85d2c] transition-colors text-white rounded-full py-2.5 px-2.5 pr-6 flex items-center gap-3 w-full">
                <div className="bg-gray-300 rounded-full p-2">
                  <Phone className="w-4 h-4 text-[#ff6b35] fill-current" />
                </div>
                <span className="font-bold text-sm tracking-wide">+1 (813) 682-7114</span>
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}