// "use client";

// import { useState } from "react";

// export default function Landing() {
//   const [email, setEmail] = useState("");
//   const [apiKey, setApiKey] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

// const generateKey = async () => {
//   setLoading(true);
//   setError("");

//   try {
//     const res = await fetch(`${API_BASE}/generate-key`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email })
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.error || "Failed");
//     }

//     setApiKey(data.apiKey);
//   } catch (err) {
//     setError(err.message);
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <main style={{ padding: 40 }}>
//       <h1>Mail Bridge – Get API Key</h1>

//       <input
//         type="email"
//         placeholder="your@email.com"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         style={{ padding: 8, width: 300 }}
//       />

//       <br /><br />

//       <button onClick={generateKey} disabled={loading || !email}>
//         {loading ? "Generating..." : "Generate API Key"}
//       </button>

//       {apiKey && (
//         <>
//           <h3>Your API Key</h3>
//           <code>{apiKey}</code>
//           <p>⚠️ Save this key. It will not be shown again.</p>
//         </>
//       )}

//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </main>
//   );
// }
