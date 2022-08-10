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

  const Stage1 = () => (
    <div className="flex flex-col animate-fadeIn">
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
      <Button filled onClick={() => setStage((old) => ++old)}>
        next
      </Button>
    </div>
  );

  const Stage2 = () => (
    <div className="flex flex-col animate-fadeIn">
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
          <Button filled>create account</Button>
        </div>
      </div>
    </div>
  );

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
        <p className="text-xl font-bold">register</p>
        <div className="flex justify-center space-x-2 mt-4">
          <StageCircle needStage={1} />
          <StageCircle needStage={2} />
        </div>
        {stage == 1 ? <Stage1 /> : <Stage2 />}
        <p>
          already have an account?
          <Link to="/login" className="text-xmint hover:underline">
            login
          </Link>
        </p>
      </div>
    </div>
  );
}
