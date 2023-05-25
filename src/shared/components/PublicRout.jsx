import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PublicRoute({ children, roles }) {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useAuth();

  if (isLoggedIn) {
    if (roles && roles.length && !roles.includes(user.role)) {
      const redirectTo =
        user.role === "admin" ? "/admin/dashboard" : "/student/course-player";
      return <Navigate to={redirectTo} />;
    }

    if (user.role === "student") {
      return <Navigate to="/student/course-player" />;
    } else {
      return <Navigate to="/admin/dashboard" />;
    }
  }

  return children;
}
