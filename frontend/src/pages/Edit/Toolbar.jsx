import { v4 as uuid } from "uuid";

import Button from "../../components/Button";
import Input from "../../components/Input";
import EditStore from "../../stores/edit";

export default function Toolbar() {
  const name = EditStore.useState((s) => s.model.name);

  function addCube() {
    // TODO: gen uuid for every object
    const cube = {
      uuid: uuid(),
      position: [0, 0, 0],
      scale: [1, 1, 1],
      rotation: [0, 0, 0],
      color: "#047BFF",
    };

    EditStore.update((s) => {
      s.model.objects = [...s.model.objects, cube];
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
      <Button>disable grid</Button>
      <Button>reset camera</Button>
      <div className="flex flex-grow" />
      <Button>save</Button>
      <Button danger>exit</Button>
    </div>
  );
}
