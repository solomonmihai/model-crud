import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import EditStore from "../stores/edit";
import { getNewModel } from "../helper";

dayjs.extend(RelativeTime);

export default function Dashboard() {
  const navigate = useNavigate();

  const [update, setUpdate] = useState(true);
  const [models, setModels] = useState([]);

  useEffect(() => {
    if (!update) {
      return;
    }
    axios
      .get("http://localhost:8888/models/all")
      .then((res) => {
        setModels(res.data.models);

        setUpdate(false);
      })
      .catch((err) => {
        console.log("error fetching models", err);
      });
  }, [update]);

  function deleteModel(id) {
    axios
      .get(`http://localhost:8888/models/delete?id=${id}`)
      .then((res) => {
        console.log(res);

        setUpdate(true);
      })
      .catch((err) => {
        console.log("error deleting model", err);
      });
  }

  function editModel(id) {
    navigate(`/edit?id=${id}`);
  }

  function newModel() {
    EditStore.update((s) => {
      s.model = getNewModel();
      s.id = null;
    });
    navigate("/edit");
  }

  return (
    <div className="w-full">
      <div className="max-w-2xl mx-auto px-10">
        <div className="flex justify-between">
          <div>
            <p className="text-2xl font-bold">model list</p>
          </div>
          <div>
            <Button onClick={newModel}>new</Button>
          </div>
        </div>
        <div>
          {models.length == 0 && <p>you don't have any models yet</p>}
          {models.map((model, index) => (
            <div className="my-2 p-2 border-2 border-xgray cursor-pointer flex" key={index}>
              <div className="w-full">
                <p className="text-xmint">{model.data.name}</p>
                <p className="text-sm">created: {dayjs(model.createdAt).fromNow()}</p>
                <p className="text-sm">updated: {dayjs(model.updatedAt).fromNow()}</p>
              </div>
              <div className="flex-col justify-end">
                {/* TODO: put delete button on bottom*/}
                <div>
                  <Button onClick={() => editModel(model._id)}>edit</Button>
                </div>
                <Button danger onClick={() => deleteModel(model._id)}>
                  delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
