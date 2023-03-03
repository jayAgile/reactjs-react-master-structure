import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthGuard from "../components/auth";

const Layout = lazy(() => import("../components/layout"));
const SignIn = lazy(() => import("../pages/SignIn"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const MyAccount = lazy(() => import("../pages/MyAccount"));

const Routing = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/"
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Routing;
