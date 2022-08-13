import React from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import AuthStore from "../stores/auth";
import Button from "./Button";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, username } = AuthStore.useState((s) => s);

  function logOut() {
    localStorage.removeItem("token");
    AuthStore.update((s) => {
      s.isAuth = false;
    });
    navigate("/");
  }

  if (location.pathname === "/edit") {
    return null;
  }

  return (
    <div className="flex items-center">
      <p className="text-center text-xmint font-bold ml-4">
        {isAuth ? (
          `logged in as ${username}`
        ) : (
          <Link to="/">
            <span className="cursor-pointer">model crud</span>
          </Link>
        )}
      </p>
      <div className="flex-grow"></div>
      {isAuth ? (
        <Button onClick={logOut}>log out</Button>
      ) : (
        <>
          <Link to="/login">
            <Button>login</Button>
          </Link>
          <Link to="/register">
            <Button filled>register</Button>
          </Link>
        </>
      )}
    </div>
  );
}
