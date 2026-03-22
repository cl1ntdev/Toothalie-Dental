import React, { useEffect, useState, useCallback, useMemo } from "react";
import { getServices } from "@/API/Authenticated/admin/Services";
import {
  createService,
  updateService,
  deleteService,
} from "@/API/Authenticated/admin/ServiceAdmin";
import {
  Pencil,
  Trash2,
  Plus,
  Activity,
  Search,
  Tag,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import Alert from "@/components/_myComp/Alerts";
import { getServiceTypes } from "@/API/Authenticated/admin/ServiceTypeAdmin";

export default function ManageService() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [name, setName] = useState("");
  const [serviceTypeId, setServiceTypeId] = useState<number | null>(null);
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "info",
    title: "",
    message: "",
  });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getServices();
      if (res && res.data) setServices(res.data);
      try {
        const st = await getServiceTypes();
        if (st && st.data) setServiceTypes(st.data);
      } catch (e) {
        console.error("failed to load service types", e);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const getId = (s: any) => s.id ?? s.service_id ?? null;
  const getName = (s: any) => s.name ?? s.service_name ?? "";
  const getServiceTypeId = (s: any) =>
    s.service_type_id ?? s.serviceTypeId ?? null;
  const getServiceTypeName = (s: any) =>
    s.service_type_name ?? s.serviceTypeName ?? "";
  const getTypeId = (t: any) => t.id ?? t.service_type_id ?? null;
  const getTypeName = (t: any) => t.name ?? t.service_type_name ?? "";

  const openCreate = () => {
    setEditing(null);
    setName("");
    setServiceTypeId(null);
    setIsModalOpen(true);
  };
  const openEdit = (svc: any) => {
    setEditing(svc);
    setName(getName(svc));
    setServiceTypeId(getServiceTypeId(svc));
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await updateService({
          id: getId(editing),
          name,
          service_type_id: serviceTypeId,
        });
        setAlert({
          show: true,
          type: "success",
          title: "Updated",
          message: "Service updated.",
        });
      } else {
        await createService({ name, service_type_id: serviceTypeId });
        setAlert({
          show: true,
          type: "success",
          title: "Created",
          message: "Service created.",
        });
      }
      setIsModalOpen(false);
      fetch();
    } catch (e) {
      console.error(e);
      setAlert({
        show: true,
        type: "error",
        title: "Error",
        message: "Failed to save service.",
      });
    }
  };

  const handleDeleteClick = (svc: any) => {
    setServiceToDelete(svc);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;
    setIsDeleting(true);
    try {
      await deleteService(getId(serviceToDelete));
      setAlert({
        show: true,
        type: "success",
        title: "Deleted",
        message: "Service deleted.",
      });
      setOpenDeleteModal(false);
      setServiceToDelete(null);
      fetch();
    } catch (e) {
      console.error(e);
      setAlert({
        show: true,
        type: "error",
        title: "Error",
        message: "Failed to delete.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const getResolvedServiceTypeName = (svc: any) => {
    const direct = getServiceTypeName(svc);
    if (direct) return direct;
    const match = serviceTypes.find(
      (type) => getTypeId(type) === getServiceTypeId(svc)
    );
    return match ? getTypeName(match) : "Unassigned";
  };

  const filteredServices = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return services;
    return services.filter((svc) => {
      const nameValue = getName(svc).toLowerCase();
      const typeValue = getResolvedServiceTypeName(svc).toLowerCase();
      return nameValue.includes(term) || typeValue.includes(term);
    });
  }, [services, searchTerm, serviceTypes]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 font-ceramon">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <Activity className="w-6 h-6 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="mt-4 text-slate-500 font-medium animate-pulse">
          Loading All Services...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 lg:p-10 font-ceramon text-slate-900">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-grow md:flex-grow-0 md:min-w-[280px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search services..."
                className="pl-10 pr-4 py-2.5 w-full bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-sans shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={openCreate}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl transition-all shadow-lg shadow-indigo-200 font-medium text-sm w-full md:w-auto"
            >
              <Plus size={18} />
              <span>New Service</span>
            </button>
          </div>
        </div>

        <div className="hidden lg:block bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="px-8 py-5">Service</th>
                <th className="px-6 py-5">Type</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredServices.map((svc) => (
                <tr
                  key={getId(svc) ?? Math.random()}
                  className="group transition-colors hover:bg-slate-50/50"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-sm border border-white bg-gradient-to-br from-indigo-100 to-blue-50 text-indigo-600">
                        {getName(svc).slice(0, 1).toUpperCase() || "S"}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-slate-900">
                          {getName(svc)}
                        </span>
                        <span className="text-xs text-slate-500 font-sans">
                          ID #{getId(svc) ?? "N/A"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border bg-slate-100 text-slate-600 border-slate-200">
                      <Tag size={10} /> {getResolvedServiceTypeName(svc)}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(svc)}
                        className="p-2 bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 rounded-lg transition-all shadow-sm"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(svc)}
                        className="p-2 bg-white border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 rounded-lg transition-all shadow-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
          {filteredServices.map((svc) => (
            <div
              key={getId(svc) ?? Math.random()}
              className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <div>
                <div className="flex justify-between items-start mb-4 pl-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold shadow-sm border border-slate-50 bg-indigo-50 text-indigo-600">
                      {getName(svc).slice(0, 1).toUpperCase() || "S"}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">
                        {getName(svc)}
                      </h3>
                      <p className="text-xs text-slate-400 font-sans">
                        ID #{getId(svc) ?? "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pl-3 space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">
                      Type
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-600">
                      {getResolvedServiceTypeName(svc)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pl-3 flex gap-3 mt-auto pt-4 border-t border-slate-50">
                <button
                  onClick={() => openEdit(svc)}
                  className="flex-1 py-2 flex items-center justify-center gap-2 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg transition-colors text-sm font-medium"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(svc)}
                  className="flex-1 py-2 flex items-center justify-center gap-2 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-lg transition-colors text-sm font-medium"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 border-dashed">
            <div className="flex flex-col items-center justify-center text-slate-400">
              <div className="bg-slate-50 p-4 rounded-full mb-3">
                <Search size={24} />
              </div>
              <p className="text-slate-600 font-medium">No services found</p>
              <p className="text-sm">Try adjusting your search</p>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 z-50 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editing ? "Edit Service" : "Create Service"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-600">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600">
                  Service Type
                </label>
                <select
                  value={serviceTypeId ?? ""}
                  onChange={(e) =>
                    setServiceTypeId(
                      e.target.value ? parseInt(e.target.value) : null
                    )
                  }
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="">Select service type</option>
                  {serviceTypes.map((st) => (
                    <option key={getTypeId(st)} value={getTypeId(st)}>
                      {getTypeName(st)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {openDeleteModal && serviceToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200 font-sans">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100">
            <div className="p-6 md:p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 border border-rose-100">
                <AlertTriangle className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Delete Service?
              </h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                You are about to delete service{" "}
                <span className="font-mono bg-slate-100 px-1 rounded text-slate-700">
                  {getName(serviceToDelete)}
                </span>
                .
                <br />
                This action cannot be undone.
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setOpenDeleteModal(false)}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 font-medium disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-600 text-white rounded-xl hover:bg-rose-700 font-medium disabled:opacity-50 shadow-lg shadow-rose-200 transition-all"
                >
                  {isDeleting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Trash2 size={18} />
                  )}
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {alert.show && <Alert {...alert} />}
    </div>
  );
}
