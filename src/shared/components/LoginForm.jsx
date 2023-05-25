import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../features/auth/authApi";
import Error from "../ui/Error";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../features/auth/authApi";
import { useParams } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const [localError, setLocalError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData || {};
  const [loginError, setLoginError] = useState("");
  const [login, { data, isLoading, error }] = useLoginMutation();
  const { data: users } = useGetUsersQuery();

  const handleLogin = (e) => {
    e.preventDefault();
    setLocalError("");
    if (pathname === "/admin/login") {
      const adminUser = users.find(
        (user) => user.email === email && user.role === "admin"
      );
      if (adminUser) {
        login({ email, password });
      } else {
        setLocalError("Invalid credentials for admin login");
      }
    } else {
      const studentUser = users.find(
        (user) => user.email === email && user.role === "student"
      );
      if (studentUser) {
        login({ email, password });
      } else {
        setLocalError("Invalid credentials for student login");
      }
    }
  };

  useEffect(() => {
    if (data) {
      if (data.user.role === "admin") {
        navigate("/dashboard");
      } else if (data.user.role === "student") {
        navigate("/student/course-player");
      }
    }
  }, [data]);

  return (
    <form className="mt-8 space-y-6 " onSubmit={handleLogin}>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="login-input rounded-t-md text-black"
            placeholder="Email address"
            value={email}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="login-input rounded-b-md text-black"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-violet-600 hover:text-violet-500"
          >
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Sign in
        </button>
        {!isLoading && error && <Error message={error.data} />}
        {localError && <Error message={localError} />}
      </div>
    </form>
  );
};

export default LoginForm;
