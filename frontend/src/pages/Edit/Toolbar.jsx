import axios from "axios";
import { v4 as uuid } from "uuid";

import Button from "../../components/Button";
import Input from "../../components/Input";
import EditStore from "../../stores/edit";

export default function Toolbar() {
  const name = EditStore.useState((s) => s.model.name);
  const showGrid = EditStore.useState((s) => s.showGrid);
  const model = EditStore.useState((s) => s.model);

  // TODO: prevent 2 objects having same name
  //   * add cube (1) cube (2) etc ...
  function addCube() {
    const cube = {
      uuid: uuid(),
      name: "cube",
      position: [0, 0, 0],
      scale: [1, 1, 1],
      rotation: [0, 0, 0],
      color: "#047BFF",
    };

    EditStore.update((s) => {
      s.model.objects = [...s.model.objects, cube];
    });
  }

  function saveModel() {
    axios
      .post(
        "http://localhost:8888/models/save",
        {
          data: model,
          id: null,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <div className="w-full bg-xgray flex flex-row items-center">
      <Input
        placeholder="model name"
        style={{ paddig: "3px" }}
        value={name}
        onChange={(evt) => {
          EditStore.update((s) => {
            s.model.name = evt.target.value;
          });
        }}
      />
      <Button onClick={addCube}>add cube</Button>
      <Button
        onClick={() => {
          EditStore.update((s) => {
            s.showGrid = !s.showGrid;
          });
        }}
      >
        {showGrid ? "disable" : "enable"} grid
      </Button>
      <Button>reset camera</Button>
      <Button>bg color</Button>
      <div className="flex flex-grow" />
      <Button onClick={saveModel}>save</Button>
      <Button danger>exit</Button>
    </div>
  );
}
