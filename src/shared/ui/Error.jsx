import React from "react";

const Error = ({ message }) => {
  return (
    <p className="text-red-500 mt-5 p-4 text-center font-semibold">{message}</p>
  );
};

export default Error;
