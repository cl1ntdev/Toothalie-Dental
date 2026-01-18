export async function saveReminder(payload, id: string) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  console.log(payload);
  console.log(id);
  const result = await fetch("/api/save-reminder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
    body: JSON.stringify({ payload, id }),
  });

  const data = await result.json();
  console.log(data);
  return data;
}

export async function getReminder(id: string) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  console.log(id);
  const result = await fetch("/api/get-reminder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
    body: JSON.stringify({id }),
  });

  const data = await result.json();
  console.log(data);
  return data;
}

// Update Reminder
export async function updateReminder(appointmentID: string, payload: any) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const result = await fetch("/api/update-reminder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
    body: JSON.stringify({ appointmentID, payload }), // Match backend
  });

  const data = await result.json();
  console.log("Update Reminder Response:", data);
  return data;
}
