import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../AuthTokenContext'

const RequireAuth = ({ allowedRoles }) => {

    const { userType } = useAuth();
     
    const location = useLocation();

    if (allowedRoles.includes(userType)) {
        return <Outlet />;
      } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
        //replace is for replacing the login in the navigation history with the loaction the came from
      }
    };

export default RequireAuth