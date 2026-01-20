import React, { useEffect, useState, useCallback } from 'react';
import { getAppointmentTypes, createAppointmentType, updateAppointmentType, deleteAppointmentType } from '@/API/Authenticated/admin/AppointmentTypeAdmin';
import { Plus, Pencil, Trash2, Activity } from 'lucide-react';

export default function AppointmentTypes() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [name, setName] = useState('');

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAppointmentTypes();
      if (res && res.data) setItems(res.data);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const openCreate = () => { setEditing(null); setName(''); setIsModalOpen(true); };
  const openEdit = (it: any) => { setEditing(it); setName(it.name); setIsModalOpen(true); };

  const save = async () => {
    try {
      if (editing) await updateAppointmentType({ id: editing.id, name });
      else await createAppointmentType({ name });
      setIsModalOpen(false);
      fetch();
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this appointment type?')) return;
    try { await deleteAppointmentType(id); fetch(); } catch (e) { console.error(e); }
  };

  if (loading) return <div className="p-8"><Activity className="animate-spin"/></div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Appointment Types</h2>
          <button onClick={openCreate} className="px-4 py-2 bg-indigo-600 text-white rounded flex items-center gap-2"><Plus/> New</button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs text-slate-500"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3 text-right">Actions</th></tr></thead>
            <tbody>
              {items.map(it => (
                <tr key={it.id} className="border-t">
                  <td className="px-4 py-3">{it.name}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(it)} className="mr-2 p-2 border rounded"><Pencil/></button>
                    <button onClick={() => handleDelete(it.id)} className="p-2 border rounded text-rose-600"><Trash2/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)}></div>
            <div className="bg-white rounded-xl p-6 z-50 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">{editing ? 'Edit Appointment Type' : 'Create Appointment Type'}</h3>
              <div>
                <label className="block text-sm text-slate-600">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2 mt-1" />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded border">Cancel</button>
                <button onClick={save} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
