import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { TextField } from "@mui/material";
import { useState } from "react";
import { toaster } from "../../components/toaster/toaster";
import { login } from "../../axios/api";
import { Link, useNavigate } from "react-router-dom";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const resp = await login({ email, password });
      console.log(resp);
      if (resp.data.error) {
        throw new Error(resp.data.message);
      }
      localStorage.setItem("token", resp.data.data.token);
      localStorage.setItem(
        "name",
        `${resp.data.data.user.firstName} ${resp.data.data.user.lastName}`
      );
      toaster.successToast("Login successfully");
      navigate("/admin/subject");
    } catch (error) {
      console.log(error);
      toaster.errorToast(error.message || "something went wrong");
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
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
              label="Email"
              name="email"
              type="email"
              required
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
            Not registered yet?
          </span>
          <Link
            to="/auth/sign-up"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
