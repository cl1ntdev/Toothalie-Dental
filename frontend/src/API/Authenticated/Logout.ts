export async function LogoutUser() {
  console.log("logging out");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo.token;
  console.log(token);
  try {
    const userData = await fetch("/api/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(userData);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("ToothalieUser");
    localStorage.removeItem("loginedDentist");
    return userData.json();
  } catch (e) {
    console.log(e);
  }

  return null;
}
