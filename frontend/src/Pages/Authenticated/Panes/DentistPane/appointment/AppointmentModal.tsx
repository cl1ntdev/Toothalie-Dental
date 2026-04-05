import { ArrowLeft, XCircle } from "lucide-react";

import AppointmentDetailsView from "./AppointmentDetailsView";
import ReminderEditor from "./ReminderEditor";
import type { AppointmentItem, ModalMode, ReminderDay, ReminderSlot } from "./types";

interface AppointmentModalProps {
  viewAppointment: AppointmentItem | null;
  modalMode: ModalMode;
  isUpdating: boolean;
  isSavingReminder: boolean;
  reminderSchedule: ReminderDay[];
  todayDate: string;
  timeOptions: string[];
  onClose: () => void;
  onBackToDetails: () => void;
  onApprove: () => void;
  onReject: () => void;
  onOpenReminder: () => void;
  onAddDay: () => void;
  onRemoveDay: (dayId: string) => void;
  onUpdateDayDate: (dayId: string, newDate: string) => void;
  onAddTimeSlot: (dayId: string) => void;
  onRemoveTimeSlot: (dayId: string, slotIndex: number) => void;
  onUpdateTimeSlot: (
    dayId: string,
    slotIndex: number,
    field: keyof ReminderSlot,
    value: string
  ) => void;
  onCancelReminder: () => void;
  onSaveReminder: () => void;
}

export default function AppointmentModal({
  viewAppointment,
  modalMode,
  isUpdating,
  isSavingReminder,
  reminderSchedule,
  todayDate,
  timeOptions,
  onClose,
  onBackToDetails,
  onApprove,
  onReject,
  onOpenReminder,
  onAddDay,
  onRemoveDay,
  onUpdateDayDate,
  onAddTimeSlot,
  onRemoveTimeSlot,
  onUpdateTimeSlot,
  onCancelReminder,
  onSaveReminder,
}: AppointmentModalProps) {
  if (!viewAppointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col transition-all duration-300">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between bg-clip-padding">
          <div className="flex items-center gap-3">
            {modalMode === "reminder" && (
              <button onClick={onBackToDetails} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </button>
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {modalMode === "details" ? "Appointment Details" : "Create Reminder"}
              </h2>
              <p className="text-xs text-gray-400 font-mono mt-0.5">#{viewAppointment.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>

        {modalMode === "details" ? (
          <AppointmentDetailsView
            appointment={viewAppointment}
            isUpdating={isUpdating}
            onApprove={onApprove}
            onReject={onReject}
            onOpenReminder={onOpenReminder}
          />
        ) : (
          <ReminderEditor
            reminderSchedule={reminderSchedule}
            todayDate={todayDate}
            timeOptions={timeOptions}
            isSavingReminder={isSavingReminder}
            onAddDay={onAddDay}
            onRemoveDay={onRemoveDay}
            onUpdateDayDate={onUpdateDayDate}
            onAddTimeSlot={onAddTimeSlot}
            onRemoveTimeSlot={onRemoveTimeSlot}
            onUpdateTimeSlot={onUpdateTimeSlot}
            onCancel={onCancelReminder}
            onSave={onSaveReminder}
          />
        )}
      </div>
    </div>
  );
}
