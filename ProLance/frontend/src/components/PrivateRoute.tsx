import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token"); // Replace with cookie/session logic if needed

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;