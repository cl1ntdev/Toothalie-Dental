export async function authenticateUser(token: string) {
  try {
    const res = await fetch("/api/auth/me", {
      headers: { 
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420", // <--- REQUIRED
        "Content-Type": "application/json"
      },
    });

    // 👇 ADD THIS DEBUGGING BLOCK 👇
    const text = await res.text(); // Get raw text first
    console.log("Raw Response Body:", text); // Check if this is HTML or JSON

    if (!res.ok) return { status: "error" };

    try {
        const data = JSON.parse(text); // Manually parse it
        return { status: "ok", user: data };
    } catch (err) {
        console.error("CRITICAL: Received HTML instead of JSON. Ngrok header missing?");
        return { status: "error" };
    }
    // 👆 END DEBUGGING BLOCK 👆

  } catch (e) {
    console.error(e);
    return { status: "error" };
  }
}