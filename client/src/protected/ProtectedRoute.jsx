import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
    const { loading, isAuthenticate } = useAuth();
    if (loading) return <h3>Loading..</h3>;
    if (!isAuthenticate) return <Navigate to={"/"} replace />
    return (<Outlet />);
    
};