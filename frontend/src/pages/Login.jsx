import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { checkAuth } from "../helper";
import AuthStore from "../stores/auth";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState();

  // TODO: login on enter

  function login() {
    axios
      .post("http://localhost:8888/auth/login", data)
      .then((res) => {
        const { token } = res.data;
        checkAuth(token).then(({ isAuth, username }) => {
          if (isAuth) {
            AuthStore.update((s) => {
              s.isAuth = isAuth;
              s.username = username;
            });
            navigate("/dashboard");
          }
        });
      })
      .catch((err) => {
        setError(err.response.data.message ?? err.message);
        console.log("error loggin in", err);
      });
  }

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col w-[450px] text-center text-xwhite bg-xgray p-4 py-8">
        <p className="text-2xl font-bold italic">login</p>
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
        <Button filled onClick={login}>
          login
        </Button>
        {error && <p className="text-red-300">{error}</p>}
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
