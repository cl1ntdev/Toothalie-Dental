import {
  ArrowRight,
  Calendar,
  Clock,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  X,
} from "lucide-react";

import { timeToMinutes } from "./config";
import type { ReminderDay, ReminderSlot } from "./types";

interface ReminderEditorProps {
  reminderSchedule: ReminderDay[];
  todayDate: string;
  timeOptions: string[];
  isSavingReminder: boolean;
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
  onCancel: () => void;
  onSave: () => void;
}

export default function ReminderEditor({
  reminderSchedule,
  todayDate,
  timeOptions,
  isSavingReminder,
  onAddDay,
  onRemoveDay,
  onUpdateDayDate,
  onAddTimeSlot,
  onRemoveTimeSlot,
  onUpdateTimeSlot,
  onCancel,
  onSave,
}: ReminderEditorProps) {
  const getEndTimeOptions = (startTime: string) => {
    if (!startTime) return [];
    const startMinutes = timeToMinutes(startTime);
    return timeOptions.filter((time) => timeToMinutes(time) > startMinutes);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto p-6 min-h-[400px]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Schedules</h3>
            <p className="text-sm text-gray-500 mt-1">Manage dates and time slots for reminders.</p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={onAddDay}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all shadow-sm hover:shadow"
            >
              <Plus className="h-4 w-4" />
              Add Date
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {reminderSchedule.map((day) => (
            <div
              key={day.id}
              className="group relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="px-5 py-4 flex items-center justify-between bg-gray-50/50 border-b border-gray-100 rounded-t-2xl">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white px-3 py-1.5 border border-gray-200 rounded-md shadow-sm">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <input
                      type="date"
                      value={day.date}
                      onChange={(e) => onUpdateDayDate(day.id, e.target.value)}
                      min={todayDate}
                      className="bg-transparent border-none p-0 focus:ring-0 text-gray-700 cursor-pointer text-sm font-medium"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {day.slots.length} {day.slots.length === 1 ? "Slot" : "Slots"}
                  </span>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onAddTimeSlot(day.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    Add Time
                  </button>
                  <button
                    onClick={() => onRemoveDay(day.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Remove Day"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-3">
                {day.slots.map((slot, slotIndex) => (
                  <div
                    key={`${day.id}-${slotIndex}`}
                    className="flex flex-col sm:flex-row gap-3 items-start sm:items-center animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="relative flex items-center bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
                      <div className="relative flex items-center pl-3">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <select
                          value={slot.startTime}
                          onChange={(e) =>
                            onUpdateTimeSlot(day.id, slotIndex, "startTime", e.target.value)
                          }
                          className="pl-2 pr-1 py-2 bg-transparent border-none text-sm font-semibold text-gray-700 focus:ring-0 cursor-pointer w-[120px]"
                        >
                          <option value="">Start</option>
                          {timeOptions.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="h-4 w-px bg-gray-200 mx-0" />

                      <div className="relative flex items-center pr-1">
                        <select
                          value={slot.endTime}
                          onChange={(e) =>
                            onUpdateTimeSlot(day.id, slotIndex, "endTime", e.target.value)
                          }
                          disabled={!slot.startTime}
                          className="pl-3 pr-1 py-2 bg-transparent border-none text-sm font-medium text-gray-600 focus:ring-0 cursor-pointer w-[120px] disabled:text-gray-300"
                        >
                          <option value="">End</option>
                          {getEndTimeOptions(slot.startTime).map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover/slot:opacity-100 transition-opacity bg-white px-1">
                        <ArrowRight className="h-3 w-3 text-blue-400" />
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="Enter reminder message..."
                      value={slot.message}
                      onChange={(e) =>
                        onUpdateTimeSlot(day.id, slotIndex, "message", e.target.value)
                      }
                      className="flex-1 w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    />

                    <button
                      onClick={() => onRemoveTimeSlot(day.id, slotIndex)}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                {day.slots.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
                    <Clock className="h-8 w-8 text-gray-200 mb-2" />
                    <p className="text-sm text-gray-500 font-medium">No time slots yet</p>
                    <button onClick={() => onAddTimeSlot(day.id)} className="mt-2 text-xs text-blue-600 hover:underline">
                      Add your first slot
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {reminderSchedule.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-dashed border-gray-300 text-center">
              <div className="h-12 w-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h4 className="text-base font-medium text-gray-900">No dates scheduled</h4>
              <p className="text-sm text-gray-500 mt-1 max-w-xs">
                Start by adding a date to configure your reminder schedule.
              </p>
              <button
                onClick={onAddDay}
                className="mt-6 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Add Date
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-gray-100 p-6 flex items-center justify-end gap-3 z-10">
        <button
          onClick={onCancel}
          className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={isSavingReminder}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow"
        >
          {isSavingReminder ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Changes
        </button>
      </div>
    </div>
  );
}
