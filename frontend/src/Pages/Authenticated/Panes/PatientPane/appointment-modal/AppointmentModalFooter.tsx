import React from "react";
import { Button } from "@/components/ui/button";

type FooterProps = {
  step: 1 | 2 | 3;
  canContinue: boolean;
  canSubmit: boolean;
  onClose: () => void;
  onBack: () => void;
  onContinue: () => void;
  onSubmit: () => void;
};

export default function AppointmentModalFooter({
  step,
  canContinue,
  canSubmit,
  onClose,
  onBack,
  onContinue,
  onSubmit,
}: FooterProps) {
  return (
    <div className="p-5 border-t border-slate-100 bg-white flex items-center justify-between gap-4 shrink-0">
      <div className="hidden sm:block text-xs text-slate-400">
        {step === 2 &&
          !canContinue &&
          "Select a service, dentist, time, and date to continue."}
        {step === 3 &&
          !canSubmit &&
          "Please fill out your details before submitting."}
      </div>
      <div className="flex gap-3 w-full sm:w-auto">
        {step === 1 && (
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 sm:flex-none"
          >
            Close
          </Button>
        )}
        {step === 2 && (
          <>
            <Button
              variant="outline"
              onClick={onBack}
              className="flex-1 sm:flex-none"
            >
              Back
            </Button>
            <Button
              onClick={onContinue}
              disabled={!canContinue}
              className={`flex-1 sm:flex-none min-w-[140px] ${
                canContinue
                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                  : "opacity-50"
              }`}
            >
              Continue
            </Button>
          </>
        )}
        {step === 3 && (
          <>
            <Button
              variant="outline"
              onClick={onBack}
              className="flex-1 sm:flex-none"
            >
              Back
            </Button>
            <Button
              onClick={onSubmit}
              disabled={!canSubmit}
              className={`flex-1 sm:flex-none min-w-[160px] ${
                canSubmit
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "opacity-50"
              }`}
            >
              Submit application
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
