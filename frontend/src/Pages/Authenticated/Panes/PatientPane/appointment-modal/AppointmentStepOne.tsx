import React from "react";
import { Phone, Stethoscope, User, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AppointmentStepOneProps = {
  bookingMethod: "operator" | "self" | null;
  onSelectOperator: () => void;
  onSelectSelf: () => void;
  operatorPhoneValue: string;
  operatorPhoneHref?: string;
};

export default function AppointmentStepOne({
  bookingMethod,
  onSelectOperator,
  onSelectSelf,
  operatorPhoneValue,
  operatorPhoneHref,
}: AppointmentStepOneProps) {
  return (
    <div className="p-2 sm:p-6 font-sans bg-slate-50/50">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-stretch min-h-[480px]">
        
        {/* LEFT PANEL: The "Toothalie" Frosted Glass Card */}
        <div className="relative overflow-hidden bg-white rounded-[2.5rem] p-10 text-slate-900 flex flex-col justify-between group shadow-xl shadow-slate-200/60 border border-white">
          {/* Soft Blue Ambient Glow (Lightened) */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-100 rounded-full blur-[110px] group-hover:bg-blue-200/50 transition-all duration-1000"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-[1.5px] bg-blue-600"></div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-600">
                Toothalie Studio
              </p>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-light leading-[1.1] font-ceramon tracking-tight text-slate-900">
              A New Era of <br />
              <span className="font-bold text-blue-600">Oral Precision</span>
            </h3>
            
            <p className="text-sm text-slate-500 mt-8 leading-relaxed max-w-[260px] font-light">
              Experience a redefined patient journey that prioritizes your comfort, time, and clinical excellence.
            </p>
          </div>

          <div className="relative z-10 space-y-5">
             <div className="flex items-center gap-4 text-slate-600 text-[11px] py-4 border-t border-slate-100 tracking-wider uppercase font-semibold">
                <Stethoscope className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Expert-Led Consultations</span>
             </div>
             <p className="text-[10px] text-slate-400 italic font-light">
               Crafting smiles with surgical precision.
             </p>
          </div>
        </div>

        {/* RIGHT PANEL: Interactive Selection Gateway */}
        <div className="flex flex-col justify-center space-y-5">
          <div className="mb-6 px-2">
            <h4 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight font-ceramon">
              How would you like to proceed?
            </h4>
            <p className="text-sm text-slate-500 mt-2 font-light">
              Select your gateway to view real-time availability.
            </p>
          </div>

          {/* GATEWAY: Self-Booking */}
          <button
            onClick={onSelectSelf}
            className={`group relative w-full text-left p-7 rounded-[2rem] border transition-all duration-500 ${
              bookingMethod === "self"
                ? "bg-white border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/20"
                : "bg-white/80 border-white hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/40"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm ${
                  bookingMethod === "self" 
                    ? "bg-blue-600 text-white rotate-0" 
                    : "bg-blue-50 text-blue-600 -rotate-3 group-hover:rotate-0"
                }`}>
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-ceramon text-slate-900 tracking-tight">Digital Booking</h4>
                  <p className="text-sm text-slate-500 font-light mt-0.5">Browse specialists and secure a slot instantly.</p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${bookingMethod === "self" ? "text-blue-600 translate-x-1" : "text-slate-300"}`} />
            </div>
          </button>

          {/* GATEWAY: Concierge/Operator */}
          <button
            onClick={onSelectOperator}
            className={`group relative w-full text-left p-7 rounded-[2rem] border transition-all duration-500 ${
              bookingMethod === "operator"
                ? "bg-white border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/20"
                : "bg-white/80 border-white hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/40"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm ${
                  bookingMethod === "operator" 
                    ? "bg-blue-600 text-white rotate-0" 
                    : "bg-blue-50 text-blue-600 rotate-3 group-hover:rotate-0"
                }`}>
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-ceramon text-slate-900 tracking-tight">Direct Concierge</h4>
                  <p className="text-sm text-slate-500 font-light mt-0.5">Speak with our team for personalized scheduling.</p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${bookingMethod === "operator" ? "text-blue-600 translate-x-1" : "text-slate-300"}`} />
            </div>
          </button>

          {/* HIDDEN DETAILS: Hotline Reveal (Light Style) */}
          <AnimatePresence>
            {bookingMethod === "operator" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="mt-2"
              >
                <div className="rounded-[2.5rem] bg-white p-8 text-slate-900 relative overflow-hidden shadow-2xl border border-blue-100">
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 blur-[60px]"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-blue-600 font-bold mb-3">
                        Clinic Hotline
                      </p>
                      <div className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 font-sans">
                        {operatorPhoneValue || "Not Available"}
                      </div>
                    </div>

                    {operatorPhoneHref && (
                      <a
                        href={operatorPhoneHref}
                        className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                      >
                        <Phone className="w-4 h-4 fill-current" />
                        Call Now
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}