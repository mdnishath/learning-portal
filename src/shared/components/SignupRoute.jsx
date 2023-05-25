import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { curentUserSelector } from "../../features/auth/authSeletors";

export default function SignupRoute({ children }) {
  const data = useSelector(curentUserSelector);
  const { user } = data;
  const isLoggedIn = useAuth();

  if (isLoggedIn && user.role === "student") {
    // If the user is logged in and has a student role, redirect them to the course player
    return <Navigate to="/student/course-player" />;
  }

  if (isLoggedIn) {
    // If the user is logged in but doesn't have a student role, redirect them to the home page
    return <Navigate to="/" />;
  }

  return children;
}
