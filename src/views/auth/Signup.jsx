import { TextField } from "@mui/material";
import { toaster } from "../../components/toaster/toaster";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../axios/api";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async () => {
    try {
      const resp = await signUp({ firstName, lastName, email, password });
      console.log(resp);
      if (resp.data.error) {
        throw new Error(resp.data.message);
      }
      toaster.successToast("Verification link has been sent to your email");
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    } catch (error) {
      console.log(error);
      toaster.errorToast(error.message || "something went wrong");
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign up section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign Up
        </h4>
        {/* Email */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="mb-2">
            <TextField
              className="mb-2 w-full"
              label="First Name"
              name="firstName"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <TextField
              className="mb-2 w-full"
              label="Last Name"
              name="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <TextField
              className="mb-2 w-full"
              label="Email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <TextField
            className="mt-2 w-full"
            label="Password"
            name="password"
            type="password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Checkbox */}
          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Already have an account?
          </span>
          <Link
            to="/auth/sign-in"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
