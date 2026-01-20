export async function createService(payload: { name: string; service_type_id: number }) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo?.token;
  const res = await fetch('/api/admin/create-service', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateService(payload: { id: number; name: string; service_type_id: number }) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo?.token;
  const res = await fetch('/api/admin/update-service', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deleteService(id: number) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo?.token;
  const res = await fetch('/api/admin/delete-service', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ id }),
  });
  return res.json();
}
