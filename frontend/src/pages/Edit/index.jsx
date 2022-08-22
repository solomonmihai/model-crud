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
  const showGrid = EditStore.useState((s) => s.showGrid);

  // TODO: change background color
  // TODO: object list
  //  * parent children relationship???
  // TODO: default camera position
  // TODO: make scene bigger
  // TODO: multi select (modify properties for all objects)
  // TODO: add 3d lines in center of scene
  // TODO: sync scene editor settings with localstorage
  // TODO: lighting settings
  // TODO: resize sidebar
  // TODO: add multiple types of objects
  // TODO: prewview mode with skybox
  // TODO: deselect
  // TODO: undo / redo

  return (
    <div className="fixed top-0 left-0 w-screen h-screen">
      <Toolbar />
      <div className="w-full h-full flex flex-row">
        <Sidebar />
        <div className="w-full h-full">
          <Canvas onCreated={onCreated}>
            <ambientLight />
            <pointLight position={[0, 10, 10]} />
            {showGrid && <gridHelper />}
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
