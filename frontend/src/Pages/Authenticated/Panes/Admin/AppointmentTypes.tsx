import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  getAppointmentTypes,
  createAppointmentType,
  updateAppointmentType,
  deleteAppointmentType,
} from "@/API/Authenticated/admin/AppointmentTypeAdmin";
import {
  Plus,
  Pencil,
  Trash2,
  Activity,
  Search,
  Calendar,
  AlertTriangle,
  Loader2,
} from "lucide-react";

export default function AppointmentTypes() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [name, setName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAppointmentTypes();
      if (res && res.data) setItems(res.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const openCreate = () => {
    setEditing(null);
    setName("");
    setIsModalOpen(true);
  };
  const openEdit = (it: any) => {
    setEditing(it);
    setName(it.name);
    setIsModalOpen(true);
  };

  const save = async () => {
    try {
      if (editing) await updateAppointmentType({ id: editing.id, name });
      else await createAppointmentType({ name });
      setIsModalOpen(false);
      fetch();
    } catch (e) {
      console.error(e);
    }
  };

  const openDeleteModal = (item: any) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deleteAppointmentType(itemToDelete.id);
      fetch();
    } catch (e) {
      console.error(e);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return items;
    return items.filter((it) => it.name?.toLowerCase().includes(term));
  }, [items, searchTerm]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 font-ceramon">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <Activity className="w-6 h-6 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="mt-4 text-slate-500 font-medium animate-pulse">
          Loading Appointment Types...
        </p>
      </div>
    );
  }

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
                placeholder="Search appointment types..."
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
              <span>New Type</span>
            </button>
          </div>
        </div>

        <div className="hidden lg:block bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="px-8 py-5">Type</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((it) => (
                <tr
                  key={it.id}
                  className="group transition-colors hover:bg-slate-50/50"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-sm border border-white bg-gradient-to-br from-indigo-100 to-blue-50 text-indigo-600">
                        {it.name?.slice(0, 1).toUpperCase() || "A"}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-slate-900">
                          {it.name}
                        </span>
                        <span className="text-xs text-slate-500 font-sans">
                          ID #{it.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(it)}
                        className="p-2 bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 rounded-lg transition-all shadow-sm"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(it)}
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
          {filteredItems.map((it) => (
            <div
              key={it.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <div>
                <div className="flex justify-between items-start mb-4 pl-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold shadow-sm border border-slate-50 bg-indigo-50 text-indigo-600">
                      {it.name?.slice(0, 1).toUpperCase() || "A"}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{it.name}</h3>
                      <p className="text-xs text-slate-400 font-sans">
                        ID #{it.id}
                      </p>
                    </div>
                  </div>
                  <Calendar size={16} className="text-indigo-400" />
                </div>
              </div>

              <div className="pl-3 flex gap-3 mt-auto pt-4 border-t border-slate-50">
                <button
                  onClick={() => openEdit(it)}
                  className="flex-1 py-2 flex items-center justify-center gap-2 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg transition-colors text-sm font-medium"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => openDeleteModal(it)}
                  className="flex-1 py-2 flex items-center justify-center gap-2 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-lg transition-colors text-sm font-medium"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 border-dashed">
            <div className="flex flex-col items-center justify-center text-slate-400">
              <div className="bg-slate-50 p-4 rounded-full mb-3">
                <Search size={24} />
              </div>
              <p className="text-slate-600 font-medium">
                No appointment types found
              </p>
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
              {editing ? "Edit Appointment Type" : "Create Appointment Type"}
            </h3>
            <div>
              <label className="block text-sm text-slate-600">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200 font-sans">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100">
            <div className="p-6 md:p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 border border-rose-100">
                <AlertTriangle className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Delete Appointment Type?
              </h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                You are about to delete type{" "}
                <span className="font-mono bg-slate-100 px-1 rounded text-slate-700">
                  {itemToDelete.name}
                </span>
                .
                <br />
                This action cannot be undone.
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 font-medium disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
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
    </div>
  );
}
