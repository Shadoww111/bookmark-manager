import { useState } from "react"; import { Plus, X } from "lucide-react";
export default function AddBookmark({ onAdd }) {
  const [open, setOpen] = useState(false); const [url, setUrl] = useState(""); const [title, setTitle] = useState(""); const [desc, setDesc] = useState("");
  const submit = (e) => { e.preventDefault(); if (!url || !title) return; onAdd({ url, title, description: desc }); setUrl(""); setTitle(""); setDesc(""); setOpen(false); };
  if (!open) return <button onClick={()=>setOpen(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"><Plus className="w-4 h-4"/>add</button>;
  return (<form onSubmit={submit} className="bg-white rounded-xl border p-4 space-y-3"><div className="flex justify-between"><h3 className="font-medium text-sm">new bookmark</h3><button type="button" onClick={()=>setOpen(false)}><X className="w-4 h-4 text-gray-400"/></button></div>
    <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://..." required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
    <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="title" required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
    <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="description (optional)" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">save</button></form>); }
