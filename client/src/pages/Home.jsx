import { useState, useEffect } from "react"; import { getBookmarks, addBookmark, removeBookmark } from "../api/client"; import { useAuth } from "../context/AuthContext";
import BookmarkCard from "../components/BookmarkCard"; import AddBookmark from "../components/AddBookmark"; import { LogOut, Loader2, Bookmark } from "lucide-react"; import toast from "react-hot-toast";
export default function Home() { const { user, logout } = useAuth(); const [bms, setBms] = useState([]); const [loading, setLoading] = useState(true);
  const fetch = async () => { try { const { data } = await getBookmarks(); setBms(data); } catch {} finally { setLoading(false); } };
  useEffect(() => { fetch(); }, []);
  const handleAdd = async (d) => { try { await addBookmark(d); toast.success("saved"); fetch(); } catch { toast.error("failed"); } };
  const handleDel = async (id) => { if (!confirm("delete?")) return; try { await removeBookmark(id); toast.success("deleted"); fetch(); } catch { toast.error("failed"); } };
  return (<div className="min-h-screen bg-gray-50"><nav className="bg-white border-b sticky top-0 z-50"><div className="max-w-3xl mx-auto px-4 flex items-center justify-between h-14">
    <span className="font-bold flex items-center gap-2"><Bookmark className="w-5 h-5 text-indigo-600"/>bookmarks</span>
    <div className="flex items-center gap-3"><span className="text-sm text-gray-500">{user?.username}</span><button onClick={logout} className="text-gray-400 hover:text-red-500"><LogOut className="w-4 h-4"/></button></div></div></nav>
    <main className="max-w-3xl mx-auto px-4 py-6 space-y-4"><AddBookmark onAdd={handleAdd}/>
    {loading ? <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-indigo-500"/></div>
    : bms.length === 0 ? <p className="text-center py-20 text-gray-400">no bookmarks yet</p>
    : <div className="space-y-2">{bms.map(b=><BookmarkCard key={b.id} bm={b} onEdit={()=>{}} onDelete={handleDel}/>)}</div>}
    </main></div>); }
