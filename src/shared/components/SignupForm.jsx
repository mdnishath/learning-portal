import React, { useEffect, useState } from "react";
import Error from "../ui/Error";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../../features/auth/authApi";
import { curentUserSelector } from "../../features/auth/authSeletors";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const { user } = useSelector(curentUserSelector);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [localError, setLocalError] = useState("");
  const { name, email, password, confirmPassword } = formData || {};

  // Handle signup form
  const handleSignup = (e) => {
    e.preventDefault();
    setLocalError("");
    if (password !== confirmPassword) {
      setLocalError("Password not matched");
    } else {
      dispatch(
        authApi.endpoints.signup.initiate({
          email,
          password,
          role: "student",
          name,
        })
      );
      console.log(formData);
    }
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      if (user.role === "admin") {
        //console.log("Admin Login Success");
        navigate("/dashboard");
      } else if (user.role === "student") {
        navigate("/student/course-player");
      }
    }
  }, [user]);
  return (
    <form className="mt-8 space-y-6 " onSubmit={handleSignup}>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="name"
            autoComplete="name"
            required
            className="login-input rounded-t-md"
            placeholder="Student Name"
            value={name}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
        </div>
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
            className="login-input bg-[#33415599] border-[#33415599]"
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
            className="login-input bg-[#33415599] border-[#33415599]"
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
        <div>
          <label htmlFor="confirm-password" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="confirm-password"
            required
            className="login-input bg-[#33415599] border-[#33415599] rounded-b-md"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                confirmPassword: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Create Account
        </button>
      </div>
      <Error message={localError} />
    </form>
  );
};

export default SignupForm;
