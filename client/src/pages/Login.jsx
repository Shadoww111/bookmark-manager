import { useState } from "react"; import { Link, useNavigate } from "react-router-dom"; import { useAuth } from "../context/AuthContext"; import toast from "react-hot-toast";
export default function Login() { const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [busy, setBusy] = useState(false); const { login } = useAuth(); const nav = useNavigate();
  const go = async (e) => { e.preventDefault(); setBusy(true); try { await login(email, pw); nav("/"); } catch (err) { toast.error(err.response?.data?.msg || "fail"); } finally { setBusy(false); } };
  return (<div className="min-h-screen flex items-center justify-center px-4"><div className="max-w-sm w-full"><h1 className="text-2xl font-bold text-center mb-6">🔖 Bookmarks</h1>
    <form onSubmit={go} className="bg-white p-6 rounded-xl border space-y-4"><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
    <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="password" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
    <button disabled={busy} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50">{busy?"...":"login"}</button></form>
    <p className="text-center text-sm text-gray-500 mt-4">no account? <Link to="/register" className="text-indigo-600 hover:underline">register</Link></p></div></div>); }
