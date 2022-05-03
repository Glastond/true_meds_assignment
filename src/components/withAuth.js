import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const withAuth = (Component) => {
  const AuthRoute = () => {
    const token = useSelector((state) => state.token);
    if (token) {
      return <Component />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return AuthRoute;
};

export default withAuth;
