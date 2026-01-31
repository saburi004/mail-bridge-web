export async function sendEmail({ to, subject, message, apiKey }) {
  const res = await fetch("http://localhost:5000/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey
    },
    body: JSON.stringify({ to, subject, message })
  });

  if (!res.ok) {
    throw new Error("Email failed");
  }

  return res.json();
}
