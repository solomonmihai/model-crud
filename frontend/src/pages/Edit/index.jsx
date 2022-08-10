import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Controls from "./Controls";

function Box(props) {
  const mesh = useRef(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y -= 0.01;
    mesh.current.rotation.z += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export default function Edit() {
  const onCreated = (state) => {
    state.gl.setClearColor("black");
  };

  return (
    <div className="p-10 w-full flex justify-center items-center">
      <div className={`h-[550px] w-[1000px] border-2 border-xmint`}>
        <Canvas onCreated={onCreated}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <gridHelper />
          <Controls />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      </div>
    </div>
  );
}
