import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import Controls from "./Controls";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import EditStore from "../../stores/edit";
import Box from "./Box";

export default function Edit() {
  const onCreated = (state) => {
    state.gl.setClearColor("black");
  };

  const model = EditStore.useState((s) => s.model);

  // TODO: make scene bigger

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
            <Controls />
            {model.objects.map((obj, index) => (
              <Box key={index} obj={obj} />
            ))}
          </Canvas>
        </div>
      </div>
    </div>
  );
}
