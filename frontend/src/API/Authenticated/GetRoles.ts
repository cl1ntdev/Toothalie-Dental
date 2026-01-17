

export default async function getRoles() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo.token;
  console.log(token);
  const roles = await fetch("/api/get-roles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await roles.json()
  console.log(data);

  return data;
}
