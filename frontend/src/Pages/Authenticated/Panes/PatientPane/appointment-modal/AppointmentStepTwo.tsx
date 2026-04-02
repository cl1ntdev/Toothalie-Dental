"use client";

import React, { useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Search,
  Stethoscope,
} from "lucide-react";
import type { ServiceItem, SelectService } from "./types";

type AppointmentStepTwoProps = {
  servicesByType: Record<string, ServiceItem[]>;
  selectService: SelectService;
  onSelectService: (service: ServiceItem) => void;

  loading: boolean;
  filteredDentists: any[];

  pickDentist: string | number;
  onPickDentist: (id: string | number) => void;

  pickDay: string;
  pickTime: string;
  date?: Date;
  onPickDay: (day: string) => void;
  onPickTime: (time: string) => void;
  onSetDate: (date?: Date) => void;

  onClearError: () => void;

  formatServiceTypeName: (typeName: string) => string;
  getServicesByType: (dentist: any) => Record<string, any[]>;
  getInitials: (first: string, last: string) => string;

  activePopover: string | null;
  setActivePopover: (value: string | null) => void;
  disableDates: (date: Date) => boolean;
};

export default function AppointmentStepTwo({
  servicesByType,
  selectService,
  onSelectService,
  loading,
  filteredDentists,
  pickDentist,
  onPickDentist,
  pickDay,
  pickTime,
  date,
  onPickDay,
  onPickTime,
  onSetDate,
  onClearError,
  formatServiceTypeName,
  getServicesByType,
  getInitials,
  activePopover,
  setActivePopover,
  disableDates,
}: AppointmentStepTwoProps) {
  
  // 1. AUTO-SELECT FIRST SERVICE
  useEffect(() => {
    if (!selectService.serviceID && Object.keys(servicesByType).length > 0) {
      // Grab the first category key
      const firstCategory = Object.keys(servicesByType)[0];
      // Grab the first service item in that category
      const firstService = servicesByType[firstCategory][0];
      
      if (firstService) {
        onSelectService(firstService);
      }
    }
  }, [servicesByType, selectService.serviceID, onSelectService]);

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-0 w-full overflow-hidden bg-white">
      
      {/* LEFT COLUMN: Service Selection 
          MOBILE FIX: Added max-h-[35vh] on mobile so it doesn't push the dentist list off-screen.
          Changed border-r to border-b on mobile. Reduced mobile padding. */}
      <div className="w-full lg:w-[320px] bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col min-h-0 shrink-0 max-h-[35vh] lg:max-h-none">
        <div className="p-4 lg:p-6 pb-2 shrink-0">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Select a service
          </h3>
          <p className="text-xs lg:text-sm text-slate-500 mt-1">
            Choose the service you want to book.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-6 pt-2 custom-scrollbar">
          <div className="space-y-6">
            {Object.keys(servicesByType).length === 0 && (
              <div className="text-sm text-slate-400">
                No services available.
              </div>
            )}
            {Object.keys(servicesByType).map((typeName) => (
              <div key={typeName}>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">
                  {formatServiceTypeName(typeName)}
                </p>
                <div className="space-y-2">
                  {servicesByType[typeName].map((service) => {
                    const serviceId = service.service_id ?? service.serviceID;
                    const serviceName = service.service_name ?? service.serviceName;
                    const active = selectService.serviceID === serviceId;
                    
                    return (
                      <button
                        key={serviceId}
                        onClick={() => {
                          if (selectService.serviceID !== serviceId) {
                            onPickDentist("");
                            onPickDay("");
                            onPickTime("");
                            onSetDate(undefined);
                          }
                          onSelectService(service);
                          onClearError();
                        }}
                        className={`w-full text-left px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl border transition-all text-xs lg:text-sm ${
                          active
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100"
                            : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300"
                        }`}
                      >
                        {serviceName}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Dentist List (Independent Scroll) */}
      <div className="flex-1 flex flex-col min-h-0 bg-white">
        {/* MOBILE FIX: Reduced mobile padding (p-4) to maximize screen real estate */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3 min-h-[200px]">
              <Clock className="h-8 w-8 animate-spin text-indigo-600" />
              <p>Loading dentists...</p>
            </div>
          ) : !selectService.serviceID ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3 min-h-[200px]">
              <div className="p-4 bg-slate-50 rounded-full">
                <Search className="h-8 w-8 text-slate-300" />
              </div>
              <p className="text-sm">
                Select a service to view available dentists.
              </p>
            </div>
          ) : filteredDentists.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2 min-h-[200px]">
              <Search className="h-10 w-10 text-slate-200" />
              <p>No dentists found for this service.</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-4 lg:space-y-6">
              {filteredDentists.map((dentist) => {
                const groupedServices = getServicesByType(dentist);
                const serviceTypes = Object.keys(groupedServices);
                const isSelected = pickDentist === dentist.id;

                return (
                  <div
                    key={dentist.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isSelected
                        ? "border-indigo-500 shadow-xl shadow-indigo-50 ring-1 ring-indigo-500 bg-white"
                        : "border-slate-100 hover:border-slate-300 hover:shadow-md bg-white"
                    }`}
                  >
                    <div
                      onClick={() => {
                        if (pickDentist !== dentist.id) {
                          onPickDay("");
                          onPickTime("");
                          onSetDate(undefined);
                          onClearError();
                        }
                        onPickDentist(dentist.id);
                      }}
                      // MOBILE FIX: Adjusted padding for smaller screens
                      className="p-4 lg:p-5 cursor-pointer flex items-start gap-3 lg:gap-4"
                    >
                      <div
                        className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center text-base lg:text-lg font-bold border-2 shrink-0 ${
                          isSelected
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-slate-50 text-slate-400 border-slate-100"
                        }`}
                      >
                        {getInitials(dentist.first_name, dentist.last_name)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3
                              className={`font-bold text-base lg:text-lg truncate pr-2 ${
                                isSelected ? "text-indigo-900" : "text-slate-900"
                              }`}
                            >
                              Dr. {dentist.first_name} {dentist.last_name}
                            </h3>
                            <p className="text-xs lg:text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                              <Stethoscope
                                size={14}
                                className="text-indigo-400 shrink-0"
                              />
                              <span className="truncate">
                                {dentist.specialty || dentist.specialization || "General Dentist"}
                              </span>
                            </p>
                          </div>
                          {isSelected && (
                            <CheckCircle2
                              className="text-indigo-600 shrink-0 mt-1 lg:mt-0"
                              size={20}
                            />
                          )}
                        </div>

                        {!isSelected && (
                          <p className="text-[10px] lg:text-xs text-indigo-600 font-medium mt-2">
                            Click to view schedule & services
                          </p>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="px-4 lg:px-6 pb-4 lg:pb-6 border-t border-slate-100 bg-slate-50/50">
                        <div className="mt-4">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                            Available services
                          </h4>
                          <div className="space-y-4">
                            {serviceTypes.map((typeName) => (
                              <div key={typeName}>
                                <h5 className="text-[11px] lg:text-xs font-semibold text-slate-700 mb-2 pl-1">
                                  {formatServiceTypeName(typeName)}
                                </h5>
                                <div className="flex flex-wrap gap-1.5 lg:gap-2">
                                  {groupedServices[typeName]
                                    .slice(0, 6)
                                    .map((service: any) => {
                                      const serviceId = service.service_id ?? service.serviceID;
                                      const serviceName = service.service_name ?? service.serviceName;
                                      return (
                                        <span
                                          key={serviceId}
                                          className={`px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-lg text-[10px] lg:text-xs font-medium border ${
                                            selectService.serviceID === serviceId
                                              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                                              : "bg-white text-slate-600 border-slate-200"
                                          }`}
                                        >
                                          {serviceName}
                                        </span>
                                      );
                                    })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                            Select time & date
                          </h4>
                          {dentist.schedule &&
                          Object.keys(dentist.schedule).length > 0 ? (
                            <div className="space-y-3">
                              {Object.keys(dentist.schedule).map((day) => (
                                <div
                                  key={day}
                                  className="bg-white p-3 rounded-xl border border-slate-200"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs lg:text-sm font-bold text-slate-700 flex items-center gap-2">
                                      <CalendarIcon
                                        size={14}
                                        className="text-indigo-500"
                                      />
                                      {day}
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {dentist.schedule[day].map(
                                      (time: string) => {
                                        const activeTime = pickDay === day && pickTime === time;
                                        return (
                                          <button
                                            key={time}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              onPickDay(day);
                                              onPickTime(time);
                                              onSetDate(undefined);
                                              onClearError();
                                            }}
                                            className={`relative px-2.5 lg:px-3 py-1.5 lg:py-2 rounded-md text-[10px] lg:text-xs font-medium border transition-all ${
                                              activeTime
                                                ? "bg-indigo-50 text-indigo-700 border-indigo-200 ring-1 ring-indigo-200"
                                                : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-white hover:border-slate-300"
                                            }`}
                                          >
                                            {time}
                                          </button>
                                        );
                                      },
                                    )}
                                  </div>

                                  {pickDay === day && pickTime && (
                                    <div className="mt-3 pt-3 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
                                      <Popover
                                        open={activePopover === `${dentist.id}-${day}`}
                                        onOpenChange={(open) =>
                                          setActivePopover(open ? `${dentist.id}-${day}` : null)
                                        }
                                      >
                                        <PopoverTrigger asChild>
                                          <Button
                                            variant="outline"
                                            className={`w-full justify-start text-left h-9 lg:h-10 text-xs lg:text-sm border-slate-200 ${
                                              !date && "text-slate-400"
                                            }`}
                                          >
                                            <CalendarIcon className="mr-2 h-3 w-3 lg:h-4 lg:w-4" />
                                            {date
                                              ? date.toLocaleDateString()
                                              : "Select Date"}
                                          </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                          className="w-auto p-0"
                                          align="start"
                                        >
                                          <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={onSetDate}
                                            disabled={disableDates}
                                            initialFocus
                                          />
                                        </PopoverContent>
                                      </Popover>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs lg:text-sm text-slate-400 italic">
                              No slots available.
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Global Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        @media (min-width: 1024px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}