import {
  AlertCircle,
  Bell,
  CalendarCheck,
  CheckCircle,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  User,
  XCircle,
} from "lucide-react";

import { getAppointmentTypeConfig, getStatusConfig } from "./config";
import type { AppointmentItem } from "./types";

interface AppointmentDetailsViewProps {
  appointment: AppointmentItem;
  isUpdating: boolean;
  onApprove: () => void;
  onReject: () => void;
  onOpenReminder: () => void;
}

export default function AppointmentDetailsView({
  appointment,
  isUpdating,
  onApprove,
  onReject,
  onOpenReminder,
}: AppointmentDetailsViewProps) {
  const typeConfig = getAppointmentTypeConfig(appointment.appointment_type_id);
  const TypeIcon = typeConfig.icon;
  const statusConfig = getStatusConfig(appointment.status);

  return (
    <>
      <div className="p-6 space-y-8">
        <section>
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-blue-500" /> Patient Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <span className="block text-xs text-gray-500 mb-1">Full Name</span>
              <span className="font-medium text-gray-900 text-base">{appointment.patient_name}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Phone Number</span>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-gray-400" />
                <span className="font-medium text-gray-900">{appointment.phone}</span>
              </div>
            </div>
            <div className="md:col-span-2">
              <span className="block text-xs text-gray-500 mb-1">Email Address</span>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gray-400" />
                <span className="font-medium text-gray-900">{appointment.email || "Not provided"}</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100" />

        <section>
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <CalendarCheck className="h-4 w-4 text-blue-500" /> Session Details
          </h4>
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <span className="block text-xs text-gray-500 mb-1">Date</span>
                <span className="font-semibold text-gray-900">{appointment.date}</span>
                <span className="text-xs text-gray-500 block">{appointment.day_of_week}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 mb-1">Time Slot</span>
                <span className="font-semibold text-gray-900">{appointment.time_slot}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 mb-1">Service</span>
                <span className="font-semibold text-gray-900">{appointment.service_name}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${typeConfig.bg} ${typeConfig.color}`}
              >
                <TypeIcon className="h-3.5 w-3.5" />
                {typeConfig.name} Type
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.color}`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-current" />
                {appointment.status}
              </span>

              {!!appointment.emergency && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-100 text-red-700">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Emergency
                </span>
              )}
            </div>
          </div>
        </section>

        {appointment.message && (
          <section>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-500" /> Message
            </h4>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {appointment.message}
            </div>
          </section>
        )}
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <button
            onClick={onApprove}
            disabled={isUpdating || appointment.status === "Approved"}
            className={`flex justify-center items-center gap-2 py-2.5 rounded-lg font-medium transition-colors ${
              appointment.status === "Approved"
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-200"
            }`}
          >
            {isUpdating && appointment.status !== "Approved" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            {appointment.status === "Approved" ? "Approved" : "Approve Appointment"}
          </button>

          <button
            onClick={onReject}
            disabled={isUpdating || appointment.status === "Rejected"}
            className={`flex justify-center items-center gap-2 py-2.5 rounded-lg font-medium transition-colors ${
              appointment.status === "Rejected"
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300"
            }`}
          >
            {isUpdating && appointment.status !== "Rejected" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            {appointment.status === "Rejected" ? "Rejected" : "Reject Appointment"}
          </button>
        </div>

        {appointment.status === "Approved" && (
          <button
            onClick={onOpenReminder}
            className="w-full py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
          >
            <Bell className="h-4 w-4" />
            Set Reminder for Patient
          </button>
        )}
      </div>
    </>
  );
}
