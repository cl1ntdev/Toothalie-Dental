export default async function SendForm(form) {
     
    const resp = await fetch("/api/send-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });
    return resp;
}