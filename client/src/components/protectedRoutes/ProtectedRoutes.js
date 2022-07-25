import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    return user;
}

const ProtectedRoutes = () => {

    const isAuth = useAuth();
    
    return isAuth ? <Outlet/> : <Navigate to="/signin" /> ;
}

export default ProtectedRoutes