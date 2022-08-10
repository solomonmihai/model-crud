import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col w-[450px] text-center text-xwhite bg-xgray p-4 py-8">
        <p className="text-xl font-bold">login</p>
        <Input
          type="text"
          label="username"
          value={data.username}
          onChange={(ev) => {
            setData({ ...data, username: ev.target.value });
          }}
        />
        <Input
          type="password"
          label="password"
          value={data.password}
          onChange={(ev) => {
            setData({ ...data, password: ev.target.value });
          }}
        />
        <Button
          filled
          onClick={() => {
            console.log(data);
          }}
        >
          login
        </Button>
        <p>
          don't have an account?{" "}
          <Link to="/register" className="text-xmint hover:underline">
            register
          </Link>
        </p>
      </div>
    </div>
  );
}
