import React from "react";
import { X } from "lucide-react";

type AppointmentModalHeaderProps = {
  step: 1 | 2 | 3;
  onClose: () => void;
};

const titles = {
  1: "Make an appointment",
  2: "Select a service",
  3: "Confirm your details",
};

const subtitles = {
  1: "Choose how you'd like to book.",
  2: "Pick a service, then choose your dentist and time.",
  3: "Review the details and submit your request.",
};

export default function AppointmentModalHeader({
  step,
  onClose,
}: AppointmentModalHeaderProps) {
  return (
    <div className="px-6 pt-5 pb-4 border-b border-slate-100 bg-white shrink-0">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`h-1.5 w-12 rounded-full transition-colors ${
                  step >= s ? "bg-blue-600" : "bg-slate-200"
                }`}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-ceramon tracking-tight">
            {titles[step]}
          </h2>
          <p className="text-sm text-slate-500">{subtitles[step]}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
