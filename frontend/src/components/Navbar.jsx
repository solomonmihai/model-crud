import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
  // TODO: hide login register buttons based on state
  return (
    <div className="flex items-center">
      <p className="text-center text-xmint font-bold ml-4">model crud</p>
      <div className="flex-grow"></div>
      <Link to="/login">
        <Button>login</Button>
      </Link>
      <Link to="/register">
        <Button filled>register</Button>
      </Link>
    </div>
  );
}
