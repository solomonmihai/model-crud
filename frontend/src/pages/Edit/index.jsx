import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import EditStore from "../../stores/edit";
import Box from "./Box";
import TransformControl from "./TransformControl";

export default function Edit() {
  const onCreated = (state) => {
    state.gl.setClearColor("black");
  };

  const model = EditStore.useState((s) => s.model);

  // TODO: delete object
  // TODO: change background color
  // TODO: object list
  //  * parent children relationship???
  // TODO: default camera position
  // TODO: make scene bigger
  // TODO: multi select (modify properties for all objects)

  return (
    <div>
      <Toolbar />
      <div className="w-full flex">
        <Sidebar />
        <div className="w-full h-[550px]">
          <Canvas onCreated={onCreated}>
            <ambientLight />
            <pointLight position={[0, 10, 10]} />
            <gridHelper />
            <OrbitControls makeDefault enableDamping={false} />
            {model.objects.map((obj, index) => {
              return <Box key={index} obj={obj} />;
            })}
            <TransformControl />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
