import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? (
    <>{element}</>
  ) : (
    <Navigate to="/auth/sign-in" replace={true} />
  );
};

export default ProtectedRoute;
