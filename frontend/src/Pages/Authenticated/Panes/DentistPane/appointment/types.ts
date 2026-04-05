export interface ReminderSlot {
  startTime: string;
  endTime: string;
  message: string;
}

export interface ReminderDay {
  id: string;
  date: string;
  slots: ReminderSlot[];
}

export interface AppointmentItem {
  id: string;
  date: string;
  time?: string;
  day_of_week?: string;
  time_slot?: string;
  status: string;
  appointment_type_id: number;
  patient_name: string;
  email?: string;
  phone?: string;
  emergency?: boolean;
  message?: string;
  created_at?: string;
  appointment_date?: string;
  service_name?: string;
}

export type ModalMode = "details" | "reminder";

export interface AlertState {
  show: boolean;
  type: string;
  title: string;
  message: string;
}
