import {
  AlertCircle,
  CheckCircle,
  ClockIcon,
  type LucideIcon,
  User,
  Users,
  XCircle,
} from "lucide-react";

export const TIME_INTERVAL_MINUTES = 30;

export const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const formatMinutesAsTime = (totalMinutes: number) => {
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const generateTimeOptions = () => {
  const options: string[] = [];
  for (let mins = 0; mins < 24 * 60; mins += TIME_INTERVAL_MINUTES) {
    options.push(formatMinutesAsTime(mins));
  }
  return options;
};

interface StatusConfig {
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  badge: string;
}

const statusConfig: Record<string, StatusConfig> = {
  Pending: {
    icon: ClockIcon,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
  },
  Approved: {
    icon: CheckCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
  },
  Rejected: {
    icon: XCircle,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    badge: "bg-rose-100 text-rose-700",
  },
};

export const getStatusConfig = (status: string) => {
  return statusConfig[status] || statusConfig.Pending;
};

interface AppointmentTypeConfig {
  name: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

const appointmentTypeConfig: Record<number, AppointmentTypeConfig> = {
  1: {
    name: "Normal",
    icon: User,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  2: {
    name: "Family",
    icon: Users,
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
  3: {
    name: "Emergency",
    icon: AlertCircle,
    color: "text-red-600",
    bg: "bg-red-100",
  },
};

export const getAppointmentTypeConfig = (typeId: number) => {
  return appointmentTypeConfig[typeId] || appointmentTypeConfig[1];
};
