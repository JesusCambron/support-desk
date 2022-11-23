import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();

  return (
    <>
      {checkingStatus ? (
        <Spinner />
      ) : (
        <> {loggedIn ? <Outlet /> : <Navigate to="/login" />}</>
      )}
    </>
  );
}

export default PrivateRoute;
