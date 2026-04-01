export type AppointmentType = {
  id: number;
  appointment_name: string;
};

export type ServiceItem = {
  service_id: number;
  service_name: string;
  serviceTypeId: number;
  serviceTypeName: string;
};

export type SelectService = {
  serviceTypeName: string;
  serviceID: string | number | null;
  serviceName: string;
};
