export default async function SubmitAppointment(
  dentistID: string,
  day: string,
  time: string,
  emergency: boolean,
  appointmentTypeId: number | null,
  date: string | null,
  message: string,
  serviceID: string | null,
) {
  // console.log(patientID)
  // console.log(dentistID)
  // console.log(day)
  // console.log(time)
  // console.log(emergency)
  // console.log(familyBooking)
  // console.log(date)
  console.log(serviceID);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo.token;

  const submit = await fetch("/api/add-appointment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      dentistID,
      day,
      time,
      emergency,
      appointmentTypeId,
      date,
      message,
      serviceID,
    }),
  });
  if (!submit.ok) {
    const errorData = await submit.json();
    throw new Error(errorData.message || "Failed to submit appointment");
  }

  console.log(submit);
  return submit;
}
