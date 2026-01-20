export async function getRolesAdmin() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo?.token;
  const res = await fetch('/api/admin/roles', { method: 'GET', headers: { Authorization: `Bearer ${token}` } });
  return res.json();
}

export async function createRole(payload: { name: string }) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo?.token;
  const res = await fetch('/api/admin/create-role', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload)
  });
  return res.json();
}

export async function updateRole(payload: { id: number; name: string }) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo?.token;
  const res = await fetch('/api/admin/update-role', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload)
  });
  return res.json();
}

export async function deleteRole(id: number) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const token = userInfo?.token;
  const res = await fetch('/api/admin/delete-role', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ id })
  });
  return res.json();
}
