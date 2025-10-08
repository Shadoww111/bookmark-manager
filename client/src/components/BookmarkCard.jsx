import { ExternalLink, Pencil, Trash2 } from "lucide-react";
export default function BookmarkCard({ bm, onEdit, onDelete }) {
  return (<div className="bg-white rounded-lg border p-4 hover:shadow-sm transition-shadow group"><div className="flex items-start gap-3">
    {bm.favicon && <img src={bm.favicon} alt="" className="w-5 h-5 mt-0.5 rounded" onError={e=>e.target.style.display="none"}/>}
    <div className="flex-1 min-w-0"><a href={bm.url} target="_blank" rel="noopener noreferrer" className="font-medium text-gray-900 text-sm hover:text-indigo-600 flex items-center gap-1"><span className="truncate">{bm.title}</span><ExternalLink className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100"/></a>
    <p className="text-xs text-gray-400 truncate mt-0.5">{bm.url}</p>{bm.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{bm.description}</p>}</div>
    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={()=>onEdit(bm)} className="p-1 hover:bg-gray-100 rounded"><Pencil className="w-3.5 h-3.5 text-gray-400"/></button>
    <button onClick={()=>onDelete(bm.id)} className="p-1 hover:bg-red-50 rounded"><Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-500"/></button></div></div></div>); }
