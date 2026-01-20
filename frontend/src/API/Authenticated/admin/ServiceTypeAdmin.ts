export async function getServiceTypes() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo?.token;
  const res = await fetch('/api/admin/service-types', { method: 'GET', headers: { Authorization: `Bearer ${token}` } });
  return res.json();
}

export async function createServiceType(payload: { name: string }) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo?.token;
  const res = await fetch('/api/admin/create-service-type', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload)
  });
  return res.json();
}

export async function updateServiceType(payload: { id: number; name: string }) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo?.token;
  const res = await fetch('/api/admin/update-service-type', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload)
  });
  return res.json();
}

export async function deleteServiceType(id: number) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo?.token;
  const res = await fetch('/api/admin/delete-service-type', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ id })
  });
  return res.json();
}
