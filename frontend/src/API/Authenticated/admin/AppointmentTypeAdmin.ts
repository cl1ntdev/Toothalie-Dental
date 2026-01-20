export async function getAppointmentTypes() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo?.token;
  const res = await fetch('/api/admin/appointment-types', { method: 'GET', headers: { Authorization: `Bearer ${token}` } });
  return res.json();
}

export async function createAppointmentType(payload: { name: string }) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo?.token;
  const res = await fetch('/api/admin/create-appointment-type', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload)
  });
  return res.json();
}

export async function updateAppointmentType(payload: { id: number; name: string }) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo?.token;
  const res = await fetch('/api/admin/update-appointment-type', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload)
  });
  return res.json();
}

export async function deleteAppointmentType(id: number) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo?.token;
  const res = await fetch('/api/admin/delete-appointment-type', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ id })
  });
  return res.json();
}
