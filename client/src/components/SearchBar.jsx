import { useState, useEffect } from "react"; import { Search, X } from "lucide-react";
export default function SearchBar({ onSearch }) { const [q, setQ] = useState("");
  useEffect(() => { const t = setTimeout(() => onSearch(q), 300); return () => clearTimeout(t); }, [q]);
  return (<div className="relative"><Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="search bookmarks..." className="w-full pl-9 pr-8 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
    {q && <button onClick={()=>setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-gray-400"/></button>}</div>); }
