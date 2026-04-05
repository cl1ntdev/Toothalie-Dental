import { Calendar, Clock, Eye, Mail } from "lucide-react";

import { getAppointmentTypeConfig, getStatusConfig } from "./config";
import type { AppointmentItem } from "./types";

interface AppointmentsGridProps {
  appointments: AppointmentItem[];
  onView: (appointment: AppointmentItem) => void;
}

export default function AppointmentsGrid({ appointments, onView }: AppointmentsGridProps) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {appointments.map((appointment) => {
        const statusCfg = getStatusConfig(appointment.status);
        const typeCfg = getAppointmentTypeConfig(appointment.appointment_type_id);
        const TypeIcon = typeCfg.icon;

        return (
          <div
            key={appointment.id}
            className={`group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col ${
              appointment.emergency ? "ring-1 ring-red-200" : ""
            }`}
          >
            {!!appointment.emergency && <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-500" />}

            <div className="p-5 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${typeCfg.bg} ${typeCfg.color}`}
                >
                  <TypeIcon className="h-3.5 w-3.5" />
                  {typeCfg.name}
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusCfg.borderColor} ${statusCfg.badge}`}
                >
                  {appointment.status}
                </span>
              </div>

              <div className="mb-4">
                <h3 className="font-bold text-gray-900 text-lg truncate mb-1">{appointment.patient_name}</h3>
                <div className="flex items-center text-sm text-gray-500 gap-2 truncate">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="truncate">{appointment.email || "No email"}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 mb-4 mt-auto">
                <div className="flex items-center gap-2 text-sm text-gray-900 font-medium mb-1">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  {appointment.date}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{appointment.day_of_week}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {appointment.time_slot || "TBD"}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onView(appointment)}
                className="w-full mt-2 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-center gap-2 group-hover:border-blue-200 group-hover:text-blue-600"
              >
                <Eye className="h-4 w-4" />
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
