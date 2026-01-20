import React, { useEffect, useState, useCallback } from "react";
import {
  getServiceTypes,
  createServiceType,
  updateServiceType,
  deleteServiceType,
} from "@/API/Authenticated/admin/ServiceTypeAdmin";
import { Plus, Pencil, Trash2, Activity } from "lucide-react";

export default function ServiceTypes() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [name, setName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getServiceTypes();
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
      if (editing) await updateServiceType({ id: editing.id, name });
      else await createServiceType({ name });
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
    try {
      await deleteServiceType(itemToDelete.id);
      fetch();
    } catch (e) {
      console.error(e);
    } finally {
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 font-ceramon">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <Activity className="w-6 h-6 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="mt-4 text-slate-500 font-medium animate-pulse">
          Loading Service Types...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Service Types</h2>
          <button
            onClick={openCreate}
            className="px-4 py-2 bg-indigo-600 text-white rounded flex items-center gap-2"
          >
            <Plus /> New
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-t">
                  <td className="px-4 py-3">{it.name}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openEdit(it)}
                      className="mr-2 p-2 border rounded"
                    >
                      <Pencil />
                    </button>
                    <button
                      onClick={() => openDeleteModal(it)}
                      className="p-2 border rounded text-rose-600"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div className="bg-white rounded-xl p-6 z-50 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">
                {editing ? "Edit Service Type" : "Create Service Type"}
              </h3>
              <div>
                <label className="block text-sm text-slate-600">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  onClick={save}
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {isDeleteModalOpen && itemToDelete && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsDeleteModalOpen(false)}
            ></div>
            <div className="bg-white rounded-xl p-6 z-50 w-full max-w-md">
              <h3 className="text-lg font-bold mb-2">Delete Service Type</h3>
              <p className="text-slate-600">
                Are you sure you want to delete the service type "
                <strong>{itemToDelete.name}</strong>"? This action cannot be
                undone.
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-rose-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
