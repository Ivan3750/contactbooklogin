import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" replace />;
};



export default PrivateRoute;
