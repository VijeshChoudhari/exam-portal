import { toaster } from "../../components/toaster/toaster";
import { verifyEmail } from "../../axios/api";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);

  const verfiy = async () => {
    try {
      const resp = await verifyEmail(params.token);
      console.log(resp);
      if (resp.data.error) {
        throw new Error(resp.data.message);
      }
      setStatus(true);
    } catch (error) {
      console.log(error);
      toaster.errorToast(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verfiy();
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="flex h-full w-full items-center justify-center">
        {!loading && status ? (
          <div className="text-center">
            <h1 className="text-2xl text-green-600">Email has Been verified</h1>
            <Link to="/auth/sign-in" className="hover:underline">
              Click here to SignIn
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
