import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";

const PrivateRoute = ({ element, ...rest }) => {
  const { authState } = useAuth();

  return (
    <Route
      {...rest}
      element={authState.token ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
