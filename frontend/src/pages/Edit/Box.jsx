import React, { useRef, useEffect } from "react";

import EditStore from "../../stores/edit";

export default function Box({ obj }) {
  const mesh = useRef(null);

  const { uuid, color } = obj;

  return (
    <mesh
      uuid={uuid}
      {...obj}
      ref={mesh}
      onClick={() => {
        EditStore.update((s) => {
          s.selected = uuid;
        });
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
