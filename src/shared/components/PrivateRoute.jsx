import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { curentUserSelector } from "../../features/auth/authSeletors";

export default function PrivateRoute({ children, roles }) {
  const data = useSelector(curentUserSelector);
  const { user } = data;
  //   //console.log(user);
  const isLoggedIn = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (roles && roles.length && !roles.includes(user.role)) {
    const redirectTo =
      user.role === "admin" ? "/admin/dashboard" : "/student/course-player";
    return <Navigate to={redirectTo} />;
  }

  return children;
}
