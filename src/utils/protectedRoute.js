import {Navigate, Outlet } from 'react-router-dom';
const ProtectedRoute = () =>{
    const storedLogin = localStorage.getItem("login");
     return storedLogin === "true" ? <Outlet /> : <Navigate to="/" replace />
 }

export default ProtectedRoute;