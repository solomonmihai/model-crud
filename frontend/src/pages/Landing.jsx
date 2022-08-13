import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function mapVal(value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

function Box({ ...props }) {
  const mesh = useRef(null);

  const [hover, setHover] = useState(false);

  useFrame(({ mouse }, delta) => {
    let s = 1;
    if (hover) {
      s = 10;
    }
    const speed1 = mapVal(mouse.x, -1, 1, -s, s);
    const speed2 = mapVal(mouse.y, -1, 1, -s, s);
    mesh.current.rotation.x += speed1 * delta;
    mesh.current.rotation.y += speed2 * delta;
    mesh.current.rotation.z += speed1 * delta;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3ea382" />
    </mesh>
  );
}

export default function Landing() {
  return (
    <div className="fixed w-screen h-screen left-0 top-0 -z-10">
      <Canvas>
        <ambientLight />
        <pointLight position={[0, 10, 10]} />
        <Box position={[0, 3, 0]} scale={0.2} />
        <Box position={[0, 2, 0]} scale={0.7} />
        <Box position={[0, 0, 0]} scale={1.6} />
        <Box position={[0, -2, 0]} scale={0.7} />
        <Box position={[0, -3, 0]} scale={0.2} />
    </Canvas>
      <div>
        <p className="fixed w-screen bottom-0 text-center">
          by{" "}
          <span className="cursor-pointer italic text-xmint hover:underline">
            @mihai
          </span>
        </p>
      </div>
    </div>
  );
}
