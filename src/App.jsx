import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./Dashboard/pages/AdminLogin";
import AdminSignup from "./Dashboard/pages/AdminSignup";
import AdminDashboard from "./Dashboard/pages/AdminDashboard";

import StudentLogin from "./Student/pages/StudentLogin";
import StudentSignup from "./Student/pages/StudentSignup";
import StudentDashboard from "./Student/pages/StudentDashboard";

// import Header from "./shared/components/Header";
// import Footer from "./shared/components/Footer";
// import PrivateRoute from "./shared/components/PriveteRoute";
// import PublicRoute from "./shared/components/PublicRout";
// const isLoggedIn = true;
//Student
import CoursePlayer from "./Student/pages/CoursePlayer";
import Leaderboard from "./Student/pages/Leaderboard";
import Quiz from "./Student/pages/Quiz";

//Admin
import Videos from "./Dashboard/pages/Videos";
import Assignment from "./Dashboard/pages/Assignment";
import Quizzes from "./Dashboard/pages/Quizzes";
import AssignmentMark from "./Dashboard/pages/AssignmentMark";
import NotFound from "./shared/components/NotFound";
import useAuthCheck from "./hooks/useAuthCheck";
import PublicRoute from "./shared/components/PublicRout";
import PrivateRoute from "./shared/components/PrivateRoute";
import SignupRoute from "./shared/components/SignupRoute";

const RoutesNew = () => {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking authentication...</div>
  ) : (
    <Router>
      {/* Admin Routes */}
      <Routes>
        <Route
          path="/admin/login"
          element={
            <PublicRoute roles={["admin"]}>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute roles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <PrivateRoute roles={["admin"]}>
              <Videos />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/assignment"
          element={
            <PrivateRoute roles={["admin"]}>
              <Assignment />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <PrivateRoute roles={["admin"]}>
              <Quizzes />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/assignmentMark"
          element={
            <PrivateRoute roles={["admin"]}>
              <AssignmentMark />
            </PrivateRoute>
          }
        />

        {/* Student Routs */}
        <Route
          path="/"
          element={
            <PublicRoute roles={["student"]}>
              <StudentLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <SignupRoute roles={["student"]}>
              <StudentSignup />
            </SignupRoute>
          }
        />
        <Route
          path="/student/course-player"
          element={
            <PrivateRoute roles={["student"]}>
              <CoursePlayer />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/leaderboard"
          element={
            <PrivateRoute roles={["student"]}>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/quiz/:videoId"
          element={
            <PrivateRoute roles={["student"]}>
              <Quiz />
            </PrivateRoute>
          }
        />

        <Route
          path="/student/dashboard"
          element={
            <PrivateRoute roles={["student"]}>
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />

        {/* Add other routes as needed */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default RoutesNew;
