import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmail from "views/verifyEmail/index";
import ProtectedRoute from "components/protectedRoute/index";
import Exam from "views/exam";
import StartTest from "views/exam/startTest";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="exam/:subjectName/:testRequestId" element={<Exam />} />
        <Route
          path="exam/:subjectName/:testRequestId/:token"
          element={<StartTest />}
        />
        <Route path="verifyEmail/:token" element={<VerifyEmail />} />
        <Route
          path="admin/*"
          element={<ProtectedRoute element={<AdminLayout />} />}
        />
        <Route path="rtl/*" element={<RtlLayout />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
