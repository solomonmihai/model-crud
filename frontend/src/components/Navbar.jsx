import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
  return (
    <div className="flex items-center">
      <p className="text-center text-xmint font-bold ml-4">Model CRUD</p>
      <div className="flex-grow"></div>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
      <Link to="/register">
        <Button filled>Register</Button>
      </Link>
    </div>
  );
}
