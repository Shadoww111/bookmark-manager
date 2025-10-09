import { Routes, Route, Navigate } from "react-router-dom"; import { Toaster } from "react-hot-toast"; import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home"; import Login from "./pages/Login"; import Register from "./pages/Register";
function App() { const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full"/></div>;
  return (<><Toaster position="top-right"/><Routes><Route path="/" element={user?<Home/>:<Navigate to="/login"/>}/><Route path="/login" element={!user?<Login/>:<Navigate to="/"/>}/><Route path="/register" element={!user?<Register/>:<Navigate to="/"/>}/><Route path="*" element={<Navigate to="/"/>}/></Routes></>); }
export default App;
