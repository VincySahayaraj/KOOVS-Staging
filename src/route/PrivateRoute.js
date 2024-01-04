import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// private Route for checking if user is authenticated
const PrivateRoute = ({ children }) => {
  const user = useAuth();

  function useAuth() {
    if(localStorage.getItem("userToken"))
    {
        return true;
    }
    else
    {
        return false;
    }
  }

  return user ? children : <Navigate to="/signup/login" />;
};

export default PrivateRoute;
