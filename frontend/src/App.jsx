import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Edit from "./pages/Edit";
import Dashboard from "./pages/Dashboard";
import AuthStore from "./stores/auth";
import { checkAuth } from "./helper";
import Landing from "./pages/Landing";

function App() {
  const token = localStorage.getItem("token");
  const isAuth = AuthStore.useState((s) => s.isAuth);

  useEffect(() => {
    checkAuth(token).then(({ isAuth, username }) => {
      if (isAuth) {
        AuthStore.update((s) => {
          s.isAuth = isAuth;
          s.username = username;
        });
        // window.location.href = "/dashboard";
      }
    });
  }, [isAuth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div>
                <Navbar />
                <Outlet />
              </div>
            </>
          }
        >
          <Route path="" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="edit"
            element={
              <PrivateRoute>
                <Edit />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<div className="w-full text-center">path not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
