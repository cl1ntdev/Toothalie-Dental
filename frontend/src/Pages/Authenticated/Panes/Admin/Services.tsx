import React, { useEffect, useState, useCallback } from 'react';
import { getServices } from '@/API/Authenticated/admin/Services';
import { createService, updateService, deleteService } from '@/API/Authenticated/admin/ServiceAdmin';
import { Pencil, Trash2, Plus, Activity } from 'lucide-react';
import Alert from '@/components/_myComp/Alerts';
import { getServiceTypes } from '@/API/Authenticated/admin/ServiceTypeAdmin';

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [name, setName] = useState('');
  const [serviceTypeId, setServiceTypeId] = useState<number | null>(null);
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [alert, setAlert] = useState({ show: false, type: 'info', title: '', message: '' });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getServices();
      console.log(res)
      if (res && res.data) setServices(res.data);
      try {
        const st = await getServiceTypes();
        if (st && st.data) setServiceTypes(st.data);
      } catch (e) {
        console.error('failed to load service types', e);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const getId = (s: any) => s.id ?? s.service_id ?? null;
  const getName = (s: any) => s.name ?? s.service_name ?? '';
  const getServiceTypeId = (s: any) => s.service_type_id ?? s.serviceTypeId ?? null;
  const getServiceTypeName = (s: any) => s.service_type_name ?? s.serviceTypeName ?? '';

  const openCreate = () => { setEditing(null); setName(''); setServiceTypeId(null); setIsModalOpen(true); };
  const openEdit = (svc: any) => { setEditing(svc); setName(getName(svc)); setServiceTypeId(getServiceTypeId(svc)); setIsModalOpen(true); };

  const handleSave = async () => {
    try {
      if (editing) {
        await updateService({ id: editing.id, name, service_type_id: serviceTypeId });
        setAlert({ show: true, type: 'success', title: 'Updated', message: 'Service updated.' });
      } else {
        await createService({ name, service_type_id: serviceTypeId });
        setAlert({ show: true, type: 'success', title: 'Created', message: 'Service created.' });
      }
      setIsModalOpen(false);
      fetch();
    } catch (e) {
      console.error(e);
      setAlert({ show: true, type: 'error', title: 'Error', message: 'Failed to save service.' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this service?')) return;
    try {
      await deleteService(id);
      setAlert({ show: true, type: 'success', title: 'Deleted', message: 'Service deleted.' });
      fetch();
    } catch (e) {
      console.error(e);
      setAlert({ show: true, type: 'error', title: 'Error', message: 'Failed to delete.' });
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[200px]"><Activity className="animate-spin" /></div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Services</h2>
          <button onClick={openCreate} className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"><Plus/> New</button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Type</th><th className="px-4 py-3 text-right">Actions</th></tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={getId(s) ?? Math.random()} className="border-t">
                  <td className="px-4 py-3">{getName(s)}</td>
                  <td className="px-4 py-3">{getServiceTypeName(s)}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(s)} className="mr-2 p-2 border rounded"><Pencil/></button>
                    <button onClick={() => handleDelete(getId(s))} className="p-2 border rounded text-rose-600"><Trash2/></button>
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
              <h3 className="text-lg font-bold mb-4">{editing ? 'Edit Service' : 'Create Service'}</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-slate-600">Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2 mt-1" />
                </div>
                <div>
                  <label className="block text-sm text-slate-600">Service Type</label>
                  <select value={serviceTypeId ?? ''} onChange={(e) => setServiceTypeId(e.target.value ? parseInt(e.target.value) : null)} className="w-full border rounded px-3 py-2 mt-1">
                    <option value="">Select service type</option>
                    {serviceTypes.map((st) => (
                      <option key={st.id} value={st.id}>{st.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded border">Cancel</button>
                  <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {alert.show && <Alert {...alert} />}
      </div>
    </div>
  );
}
