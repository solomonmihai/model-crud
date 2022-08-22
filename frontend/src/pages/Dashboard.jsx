import { useEffect, useState } from "react";
import axios from "axios";
import * as dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

import Button from "../components/Button";

dayjs.extend(RelativeTime);

export default function Dashboard() {
  const [update, setUpdate] = useState(true);
  const [models, setModels] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8888/models/all", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setModels(res.data.models);
      })
      .catch((err) => {
        console.log("error fetching models", err);
      });

    setUpdate(false);
  }, [update]);

  return (
    <div className="w-full">
      <div className="max-w-2xl mx-auto px-10">
        <p className="text-2xl font-bold">model list: </p>
        <div>
          {models.map((model, index) => (
            <div
              className="my-2 p-2 border-2 border-xgray hover:border-xmint cursor-pointer flex"
              key={index}
            >
              <div className="w-full">
                <p className="text-xmint">{model.data.name}</p>
                <p className="text-sm">created: {dayjs(model.createdAt).fromNow()}</p>
                <p className="text-sm">updated: {dayjs(model.updatedAt).fromNow()}</p>
              </div>
              <div className="flex justify-end">
                {/* TODO: put delete button on bottom*/}
                <div>
                  <Button danger>delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
