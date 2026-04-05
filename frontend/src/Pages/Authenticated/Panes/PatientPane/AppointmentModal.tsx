"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getServices } from "@/API/Authenticated/appointment/GetServices";
import { getAppointmentTypes } from "@/API/Authenticated/appointment/GetAppointmentTypes";
import { getAllDentist } from "@/API/Authenticated/GetDentist";
import SubmitAppointment from "@/API/Authenticated/appointment/SubmitAppointment";
import AppointmentModalHeader from "./appointment-modal/AppointmentModalHeader";
import AppointmentStepOne from "./appointment-modal/AppointmentStepOne";
import AppointmentStepTwo from "./appointment-modal/AppointmentStepTwo";
import AppointmentStepThree from "./appointment-modal/AppointmentStepThree";
import AppointmentModalFooter from "./appointment-modal/AppointmentModalFooter";
import type {
  AppointmentType,
  ServiceItem,
  SelectService,
} from "./appointment-modal/types";

// static shi
import {
  appointmentTypeRes as staticAppointmentTypeRes,
  servicesRes as staticServicesRes,
  dentistRes as staticDentistRes,
} from "./static/DentistData";

const normalizeServiceItem = (service: any) => {
  const serviceId = service.service_id ?? service.serviceID;
  const serviceName = service.service_name ?? service.serviceName;
  const serviceTypeId = service.serviceTypeId ?? service.service_type_id;
  const serviceTypeName =
    service.serviceTypeName ?? service.service_type_name ?? service.serviceType;

  return {
    ...service,
    service_id: serviceId,
    service_name: serviceName,
    service_type_id: serviceTypeId,
    serviceTypeId: serviceTypeId,
    serviceTypeName: serviceTypeName,
    serviceID: serviceId,
    serviceName: serviceName,
  };
};

const normalizeDentist = (dentist: any) => ({
  ...dentist,
  specialty: dentist.specialty ?? dentist.specialization,
  services: (dentist.services || []).map(normalizeServiceItem),
});

type AppointmentProps = {
  onClose: () => void;
  appointmentSuccess: () => void;
  operatorPhone?: string;
  isStatic?: boolean;
};

export default function AppointmentModal({
  onClose,
  appointmentSuccess,
  operatorPhone,
  isStatic = false,
}: AppointmentProps) {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [bookingMethod, setBookingMethod] = useState<
    "operator" | "self" | null
  >(null);

  const [dentists, setDentists] = useState<any[]>([]);
  const [filteredDentists, setFilteredDentists] = useState<any[]>([]);
  const [servicesCatalog, setServicesCatalog] = useState<ServiceItem[]>([]);
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>(
    [],
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [pickDentist, setPickDentist] = useState<string | number>("");
  const [pickDay, setPickDay] = useState<string>("");
  const [pickTime, setPickTime] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [activePopover, setActivePopover] = useState<string | null>(null);

  const [selectService, setSelectService] = useState<SelectService>({
    serviceID: null,
    serviceName: "",
    serviceTypeName: "",
  });

  const [isEmergency, setIsEmergency] = useState(false);
  const [selectedAppointmentTypeId, setSelectedAppointmentTypeId] = useState<
    number | null
  >(null);
  const [message, setMessage] = useState<string>("");

  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [acknowledge, setAcknowledge] = useState(false);

  const operatorPhoneValue = operatorPhone?.trim() || "09453690012";
  const operatorPhoneHref = operatorPhoneValue
    ? `tel:${operatorPhoneValue.replace(/\s+/g, "")}`
    : undefined;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        console.log("Loaded dentist :", staticDentistRes);
        console.log("Loaded static services:", staticServicesRes);
        console.log(
          "Loaded static appointment types:",
          staticAppointmentTypeRes,
        );

        if (isStatic) {
          console.log("Public View: Loading static data...");

          // 1. Populate Dentists
          if (staticDentistRes.status === "ok" && staticDentistRes.dentists) {
            const normalizedDentists =
              staticDentistRes.dentists.map(normalizeDentist);
            setDentists(normalizedDentists);
            setFilteredDentists(normalizedDentists);
          } else {
            setError("No static dentists found.");
          }

          // 2. Populate Services
          if (staticServicesRes.data) {
            setServicesCatalog(
              staticServicesRes.data.map(normalizeServiceItem),
            );
          }

          // 3. Populate Appointment Types
          if (staticAppointmentTypeRes.data) {
            setAppointmentTypes(staticAppointmentTypeRes.data);
            // Default to the first type if available
            if (staticAppointmentTypeRes.data.length > 0) {
              setSelectedAppointmentTypeId(staticAppointmentTypeRes.data[0].id);
            }
          }

          return;
        }

        console.log("Logged In View: Fetching live data...");
        const [
          fetchedDentistRes,
          fetchedServiceRes,
          fetchedAppointmentTypeRes,
        ] = await Promise.all([
          getAllDentist(),
          getServices(),
          getAppointmentTypes(),
        ]);

        if (fetchedDentistRes.status === "ok" && fetchedDentistRes.dentists) {
          const normalizedDentists =
            fetchedDentistRes.dentists.map(normalizeDentist);
          setDentists(normalizedDentists);
          setFilteredDentists(normalizedDentists);
        } else {
          setError("No dentists found.");
        }

        if (fetchedServiceRes.data) {
          setServicesCatalog(fetchedServiceRes.data.map(normalizeServiceItem));
        }

        if (fetchedAppointmentTypeRes.data) {
          setAppointmentTypes(fetchedAppointmentTypeRes.data);
          if (fetchedAppointmentTypeRes.data.length > 0) {
            setSelectedAppointmentTypeId(fetchedAppointmentTypeRes.data[0].id);
          }
        }
      } catch (err) {
        setError("Failed to load initial data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [isStatic]); // The effect w

  useEffect(() => {
    if (!selectService.serviceID) {
      setFilteredDentists(dentists);
      return;
    }
    const filtered = dentists.filter((dentist) =>
      dentist.services?.some((service: any) => {
        const serviceId = service.service_id ?? service.serviceID;
        return serviceId === selectService.serviceID;
      }),
    );
    setFilteredDentists(filtered);
  }, [selectService.serviceID, dentists]);

  const servicesByType = useMemo(() => {
    const grouped: Record<string, ServiceItem[]> = {};
    servicesCatalog.forEach((service) => {
      const typeName = service.serviceTypeName || "Other Services";
      if (!grouped[typeName]) grouped[typeName] = [];
      grouped[typeName].push(service);
    });
    return grouped;
  }, [servicesCatalog]);

  const getDayIndex = (day: string) => {
    const map: Record<string, number> = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    return map[day] ?? -1;
  };

  const disableDates = (dateValue: Date) => {
    if (!pickDay) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayIndex = getDayIndex(pickDay);
    return dateValue < today || dateValue.getDay() !== dayIndex;
  };

  const getServicesByType = (dentist: any) => {
    const services = dentist.services || [];
    const grouped: Record<string, any[]> = {};
    services.forEach((service: any) => {
      const typeName = service.serviceTypeName || "Other Services";
      if (!grouped[typeName]) grouped[typeName] = [];
      grouped[typeName].push(service);
    });
    return grouped;
  };

  const formatServiceTypeName = (typeName: string) =>
    typeName
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();

  const getInitials = (first: string, last: string) =>
    `${first?.charAt(0) || ""}${last?.charAt(0) || ""}`.toUpperCase();

  const selectedDentist = dentists.find((d) => d.id === pickDentist);

  const canContinue =
    !!selectService.serviceID &&
    !!pickDentist &&
    !!pickDay &&
    !!pickTime &&
    !!date;

  const canSubmit =
    canContinue &&
    !!selectedAppointmentTypeId &&
    !!contactFirstName.trim() &&
    !!contactLastName.trim() &&
    !!contactEmail.trim();

  const handleSubmit = async () => {
    if (!canSubmit || !selectedAppointmentTypeId) {
      setError("Please complete all required fields.");
      return;
    }

    const formattedDate = date!.toLocaleDateString("en-CA");
    const serviceID = selectService.serviceID!.toString();

    const contactLine = `Contact: ${contactFirstName.trim()} ${contactLastName.trim()} (${contactEmail.trim()})`;
    const noteLine = message.trim() ? `Note: ${message.trim()}` : "";
    const composedMessage = [contactLine, noteLine].filter(Boolean).join(" | ");

    const user_check = JSON.parse(localStorage.getItem("ToothalieUser"));
    if (!user_check || !user_check.id) {
      localStorage.setItem(
        "unauthorized_appointment",
        JSON.stringify({
          pickDentist: pickDentist.toString(),
          pickDay,
          pickTime,
          isEmergency,
          selectedAppointmentTypeId,
          formattedDate,
          composedMessage,
          serviceID,
        }),
      );

      navigate("/login");
      return;
    }
    const res = await SubmitAppointment(
      pickDentist.toString(),
      pickDay,
      pickTime,
      isEmergency,
      selectedAppointmentTypeId,
      formattedDate,
      composedMessage,
      serviceID,
    );

    if (res.ok === true) {
      onClose();
      appointmentSuccess();
    } else {
      setError(res.statusText || "Failed to submit appointment.");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl flex flex-col h-[90vh] overflow-hidden border border-slate-100">
        <AppointmentModalHeader step={step} onClose={onClose} />

        <div
          className={`flex-1 min-h-0 w-full bg-white ${
            step === 2 ? "overflow-hidden" : "overflow-y-auto"
          }`}
        >
          {step === 1 && (
            <AppointmentStepOne
              bookingMethod={bookingMethod}
              onSelectOperator={() => {
                setBookingMethod("operator");
                setError(null);
              }}
              onSelectSelf={() => {
                setBookingMethod("self");
                setStep(2);
                setError(null);
              }}
              operatorPhoneValue={operatorPhoneValue}
              operatorPhoneHref={operatorPhoneHref}
            />
          )}

          {step === 2 && (
            <AppointmentStepTwo
              servicesByType={servicesByType}
              selectService={selectService}
              onSelectService={(service) => {
                setSelectService({
                  serviceTypeName: service.serviceTypeName,
                  serviceID: service.service_id,
                  serviceName: service.service_name,
                });
              }}
              loading={loading}
              filteredDentists={filteredDentists}
              pickDentist={pickDentist}
              onPickDentist={setPickDentist}
              pickDay={pickDay}
              pickTime={pickTime}
              date={date}
              onPickDay={setPickDay}
              onPickTime={setPickTime}
              onSetDate={setDate}
              onClearError={() => setError(null)}
              formatServiceTypeName={formatServiceTypeName}
              getServicesByType={getServicesByType}
              getInitials={getInitials}
              activePopover={activePopover}
              setActivePopover={setActivePopover}
              disableDates={disableDates}
            />
          )}

          {step === 3 && (
            <AppointmentStepThree
              selectService={selectService}
              selectedDentist={selectedDentist}
              formatServiceTypeName={formatServiceTypeName}
              date={date}
              pickTime={pickTime}
              pickDay={pickDay}
              isEmergency={isEmergency}
              setIsEmergency={setIsEmergency}
              appointmentTypes={appointmentTypes}
              selectedAppointmentTypeId={selectedAppointmentTypeId}
              setSelectedAppointmentTypeId={setSelectedAppointmentTypeId}
              contactFirstName={contactFirstName}
              contactLastName={contactLastName}
              contactEmail={contactEmail}
              setContactFirstName={setContactFirstName}
              setContactLastName={setContactLastName}
              setContactEmail={setContactEmail}
              message={message}
              setMessage={setMessage}
              acknowledge={acknowledge}
              setAcknowledge={setAcknowledge}
              error={error}
            />
          )}
        </div>

        <AppointmentModalFooter
          step={step}
          canContinue={canContinue}
          canSubmit={canSubmit}
          onClose={onClose}
          onBack={() => setStep(step === 2 ? 1 : 2)}
          onContinue={() => setStep(3)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
