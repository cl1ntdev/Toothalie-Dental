"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FetchAppointment } from '@/API/Authenticated/appointment/FetchAppointment';
import AppointmentModal from './AppointmentModal';
import DeleteAppointmentModal from './DeleteAppointmentModal';
import EditModal from './EditModal';
import ViewAppointmentModal from './ViewAppointmentModal';
import {
  Pencil,
  Trash2,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plus,
  Stethoscope,
  Eye,
  Search,
  RefreshCw,
  Users,
  Activity,
} from 'lucide-react';
import Alert from '@/components/_myComp/Alerts';

export default function UpcomingAppointment() {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [viewAppointmentModal, setViewAppointmentModal] = useState(false);

  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [selectedAppointmentData, setSelectedAppointmentData] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [alert, setAlert] = useState({ 
    show: false, 
    type: "info", 
    title: "", 
    message: "" 
  });

  const getAppointmentId = (appointment: any) => {
    return appointment?.id ?? null;
  };

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await FetchAppointment();
      if (data && data.status === 'ok' && Array.isArray(data.appointments)) {
        setAppointmentsData(data.appointments);
      } else {
        setAppointmentsData([]);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load your appointments. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
    if (isUpdate) setIsUpdate(false);
  }, [fetchAppointments, isUpdate]);

  const handleReload = () => {
    fetchAppointments();
  };

  const filteredAppointments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return appointmentsData;

    return appointmentsData.filter((appointmentData) => {
      const appointment = appointmentData?.appointment || {};
      const dentist = appointmentData?.dentist || {};

      const dentistName = `dr. ${dentist.first_name || ''} ${dentist.last_name || ''}`.toLowerCase();
      const specialty = (dentist.specialty || '').toLowerCase();
      const status = (appointment.status || '').toLowerCase();
      const date = (appointment.user_set_date || '').toLowerCase();

      return (
        dentistName.includes(query) ||
        specialty.includes(query) ||
        status.includes(query) ||
        date.includes(query)
      );
    });
  }, [appointmentsData, searchQuery]);

  const handleDelete = (id) => {
    if (id === null || id === undefined) {
      setAlert({
        show: true,
        type: "error",
        title: "Unable to Delete",
        message: "Appointment ID is missing. Please reload and try again.",
      });
      return;
    }
    setSelectedAppointmentId(id);
    setDeleteModalOpen(true);
  };

  const handleEdit = (id) => {
    if (id === null || id === undefined) {
      setAlert({
        show: true,
        type: "error",
        title: "Unable to Edit",
        message: "Appointment ID is missing. Please reload and try again.",
      });
      return;
    }
    setSelectedAppointmentId(id);
    setEditModalOpen(true);
  };
  
  const handleEditSuccess = () => {
    setAlert({
      show: true,
      type: "success",
      title: "Updated Successfully",
      message: "Your appointment details have been updated."
    });
    setIsUpdate((prev) => !prev)
  }

  const handleCloseModal = () => setShowAppointmentModal(false);
  
  const handleAppointmentSuccess = () => {
    setAlert({
      show: true,
      type: "success",
      title: "Booked Successfully",
      message: "Your new appointment has been scheduled."
    });
    setShowAppointmentModal(false);
    setIsUpdate(true);
  };

  const triggerDelete = () => {
    setAlert({
      show: true,
      type: "success",
      title: "Cancelled Successfully",
      message: "The appointment has been removed from your schedule."
    });

    setIsUpdate(true);
    setAppointmentsData((prev) =>
      prev.filter((appt) => getAppointmentId(appt?.appointment) !== selectedAppointmentId)
    );
    setDeleteModalOpen(false);
    setSelectedAppointmentId(null);
  };

  // --- UI HELPERS ---
  const getStatusConfig = (status) => {
    const config = {
      Pending: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
      Approved: { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
      Rejected: { icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
    };
    return config[status] || config.Pending;
  };

  const getAppointmentTypeBadge = (typeId) => {
    if (typeId === 2) { 
      return <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100/50">Family Visit</span>
    }
    return <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100/50">Standard</span>
  };

  const getDateComponents = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
      full: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
  };

  // --- RENDER STATES ---

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] w-full bg-slate-50/50 rounded-xl font-ceramon">
        <Activity className="h-10 w-10 text-indigo-600 animate-pulse mb-4" />
        <span className="text-slate-600 font-medium tracking-wide">Loading your schedule...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] px-4 w-full font-ceramon">
        <div className="bg-white border border-rose-100 shadow-sm rounded-2xl p-8 max-w-md text-center">
          <div className="h-16 w-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-rose-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Oops! Something went wrong.</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">{error}</p>
          <button 
            onClick={handleReload}
            className="w-full flex justify-center items-center gap-2 px-6 py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm focus:outline-none"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-4 max-w-[1400px] mx-auto space-y-8 font-ceramon text-slate-900">
      
     
      {/* Control Panel */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-indigo-50/70 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium border border-indigo-100/50">
            <Calendar className="h-4 w-4" />
            {searchQuery.trim()
              ? `Showing ${filteredAppointments.length} of ${appointmentsData.length}`
              : `Total Appointments: ${appointmentsData.length}`}
          </div>

          <button
            onClick={handleReload}
            className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
            Reload
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by dentist, date, or status..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-sm text-slate-700 placeholder:text-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <button
            onClick={() => setShowAppointmentModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200/50 font-medium active:scale-[0.98] group whitespace-nowrap text-sm"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      {/* Appointments Grid */}
      {appointmentsData.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-slate-100 shadow-sm text-center px-4">
          <div className="bg-indigo-50/50 p-6 rounded-full mb-6">
             <Calendar className="w-12 h-12 text-indigo-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No upcoming appointments</h3>
          <p className="text-slate-500 text-sm max-w-sm mb-8 leading-relaxed">
            You are all caught up! If you need to see a doctor, feel free to book a new session.
          </p>
          <button 
            onClick={() => setShowAppointmentModal(true)}
            className="text-indigo-600 font-medium hover:text-indigo-700 bg-indigo-50 px-5 py-2 rounded-lg transition-colors"
          >
            Book your first appointment
          </button>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-slate-100 shadow-sm text-center px-4">
          <div className="bg-slate-50 p-6 rounded-full mb-4">
            <Search className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No matching appointments</h3>
          <p className="text-slate-500 text-sm mb-6">We couldn't find anything matching your search term.</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="text-sm text-indigo-600 font-medium hover:text-indigo-700 hover:underline"
          >
            Clear search filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAppointments.map((appointmentData) => {
            const { appointment, dentist, schedules } = appointmentData;
            const appointmentId = getAppointmentId(appointment);
            const schedule = schedules?.find((s) => s.scheduleID === appointment.schedule_id);
            const dateInfo = getDateComponents(appointment.user_set_date);
            const statusCfg = getStatusConfig(appointment.status);
            const StatusIcon = statusCfg.icon;
            const isEmergency = appointment.emergency === 1;

            const canEdit = appointment.status === 'Pending';
            const canDelete = appointment.status === 'Pending' || appointment.status === 'Rejected';
            const canView = true; 

            return (
              <div
                key={appointmentId ?? `${appointment?.user_set_date || 'na'}-${dentist?.id || dentist?.dentist_id || 'na'}`}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-100 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Emergency Strip */}
                {isEmergency && <div className="absolute top-0 left-0 w-full h-1 bg-rose-500"></div>}

                <div className="flex items-start gap-5">
                  {/* Date Box */}
                  <div className="flex flex-col items-center justify-center w-16 h-20 bg-slate-50/80 rounded-xl border border-slate-100 shrink-0 group-hover:bg-indigo-50/50 group-hover:border-indigo-100 transition-colors">
                    <span className="text-xs font-bold text-slate-400 uppercase group-hover:text-indigo-500 tracking-wider">{dateInfo.month}</span>
                    <span className="text-2xl font-bold text-slate-800 font-ceramon group-hover:text-indigo-600">{dateInfo.day}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2.5">
                        <div className="flex flex-wrap gap-2 mb-1">
                            {getAppointmentTypeBadge(appointment.appointment_type_id)}
                            {isEmergency && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100/50 flex items-center gap-1">
                                    <AlertTriangle size={10} /> Emergency
                                </span>
                            )}
                        </div>
                        
                        {/* Status Badge */}
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusCfg.bg} ${statusCfg.border} ${statusCfg.color}`}>
                            <StatusIcon size={12} strokeWidth={2.5} />
                            {appointment.status}
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 truncate">
                        Dr. {dentist?.first_name} {dentist?.last_name || 'Unassigned'}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 flex items-center gap-1.5">
                        <Stethoscope size={14} className="text-slate-400"/>
                        {dentist?.specialty || 'General Dentistry'}
                    </p>

                    <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50/60 p-2.5 rounded-lg border border-slate-100">
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-indigo-400" />
                            <span className="font-medium text-slate-700">{appointment?.user_set_date || 'Time TBD'}</span>
                        </div>
                        <div className="w-px h-3.5 bg-slate-200"></div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <span className="truncate">{dateInfo.weekday}</span>
                        </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-1.5 mt-5 pt-4 border-t border-slate-50">
                    {canView && (
                        <button
                        onClick={() => {
                            setSelectedAppointmentData(appointmentData);
                            setViewAppointmentModal(true);
                        }}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-100"
                        title="View Details"
                        >
                        <Eye size={18} />
                        </button>
                    )}
                    {canEdit && (
                        <button
                      onClick={() => handleEdit(appointmentId)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100"
                        title="Edit Appointment"
                        >
                        <Pencil size={18} />
                        </button>
                    )}
                    {canDelete && (
                        <button
                      onClick={() => handleDelete(appointmentId)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rose-100"
                        title="Cancel Appointment"
                        >
                        <Trash2 size={18} />
                        </button>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- MODALS --- */}
      {showAppointmentModal && (
        <AppointmentModal onClose={handleCloseModal} appointmentSuccess={handleAppointmentSuccess} />
      )}
      
      {deleteModalOpen && (
        <DeleteAppointmentModal
          appointmentID={selectedAppointmentId}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedAppointmentId(null);
          }}
          deleteSuccess={triggerDelete}
        />
      )}
      
      {editModalOpen && (
        <EditModal
          appointmentID={selectedAppointmentId}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedAppointmentId(null);
          }}
          onSuccessEdit={handleEditSuccess}
        />
      )}
      
      {viewAppointmentModal && selectedAppointmentData && (
        <ViewAppointmentModal
          appointmentData={selectedAppointmentData}
          onClose={() => setViewAppointmentModal(false)}
        />
      )}
      
      <Alert 
        isOpen={alert.show} 
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={() => setAlert({ ...alert, show: false })} 
      />
    </div>
  );
}