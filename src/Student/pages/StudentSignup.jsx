import React from "react";
import SignupForm from "../../shared/components/SignupForm";

const StudentSignup = () => {
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img
            className="h-12 mx-auto"
            src="../assets/image/learningportal.svg"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Create Your New Account
          </h2>
        </div>

        <SignupForm />
      </div>
    </section>
  );
};

export default StudentSignup;
