
export async function getAppointmentTypes() {
const token = JSON.parse(localStorage.getItem('userInfo')).token;
try {
  const response = await fetch('api/get-appointment-types', {
    method: "GET",
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${token}`
    },
  });
  const data = await response.json()
  console.log(data)
  return data;
} catch (error) {
  console.error("Error fetching appointment types:", error);
  throw error;
}
}