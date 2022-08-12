import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Register() {
  const [stage, setStage] = useState(1);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState();

  // TODO: go to dashboard after create user
  // TODO: use enter key for next and create account

  function createAccount() {
    axios
      .post("http://localhost:8888/auth/register", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("error registering user", err);
        setError(err.response.data.message ?? err.message);
      });
  }

  const StageCircle = ({ needStage }) => (
    <div
      className={`rounded-full w-3.5 h-3.5 border-2 border-xmint ${
        stage == needStage && "bg-xmint"
      }`}
    ></div>
  );

  return (
    <div className="flex w-full justify-center items-center overflow-hidden">
      <div className="flex flex-col w-[450px] text-center text-xwhite bg-xgray p-4 py-8">
        <p className="text-2xl font-bold italic">register</p>
        <div className="flex justify-center space-x-2 mt-4">
          <StageCircle needStage={1} />
          <StageCircle needStage={2} />
        </div>
        {stage == 1 ? (
          <div className="flex flex-col">
            <Input
              type="text"
              label="username"
              value={data.username}
              onChange={(ev) => {
                setData({ ...data, username: ev.target.value });
              }}
            />
            <Input
              type="text"
              label="email"
              value={data.email}
              onChange={(ev) => {
                setData({ ...data, email: ev.target.value });
              }}
            />
            <Button
              filled
              onClick={() => {
                // TODO: check if fields filled
                setStage((old) => ++old);
              }}
            >
              next
            </Button>
          </div>
        ) : (
          <div className="flex flex-col">
            <Input
              type="password"
              label="password"
              value={data.password}
              onChange={(ev) => {
                setData({ ...data, password: ev.target.value });
              }}
            />
            <Input
              type="password"
              label="confirm password"
              value={data.confirmPassword}
              onChange={(ev) => {
                setData({ ...data, confirmPassword: ev.target.value });
              }}
            />
            <div className="grid grid-cols-4">
              <div className="col-span-1">
                <Button onClick={() => setStage((old) => --old)}>back</Button>
              </div>
              <div className="col-span-3">
                <Button filled onClick={createAccount}>
                  create account
                </Button>
              </div>
            </div>
          </div>
        )}
        {error && <p className="text-red-300">{error}</p>}
        <p>
          already have an account?{" "}
          <Link to="/login" className="text-xmint italic hover:underline">
            login
          </Link>
        </p>
      </div>
    </div>
  );
}
