import React, { useState, useEffect, useRef } from "react";
import { TransformControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import EditStore from "../../stores/edit";

export default function TransformControl() {
  const transform = useRef();
  const { scene } = useThree();

  const [mode, setMode] = useState("translate");

  const [obj, setObj] = useState();
  const selected = EditStore.useState((s) => s.selected);

  useEffect(() => {
    const keyDown = (evt) => {
      const key = evt.key.toLowerCase();

      if (key == "q") {
        setMode("translate");
      } else if (key == "w") {
        setMode("scale");
      } else if (key == "e") {
        setMode("rotate");
      }
    };

    document.addEventListener("keydown", keyDown);

    () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, []);

  useEffect(() => {
    if (transform.current) {
      const controls = transform.current;
      const callback = (evt) => {
        if (evt.value == false) {
          EditStore.update((s) => {
            const objs = s.model.objects;
            for (let i = 0; i < objs.length; i++) {
              if (objs[i].uuid === selected) {
                objs[i].position = Object.values(obj.position);
                objs[i].scale = Object.values(obj.scale);
                objs[i].rotation = [obj.rotation._x, obj.rotation._y, obj.rotation._z];
                break;
              }
            }
          });
        }
      };

      controls.addEventListener("dragging-changed", callback);

      return () => {
        controls.removeEventListener("dragging-changed", callback);
      };
    }
  });

  useEffect(() => {
    if (selected) {
      const o = scene.getObjectByProperty("uuid", selected);
      setObj(o);
    } else {
      setObj(null);
    }
  }, [selected]);

  if (obj) {
    return <TransformControls ref={transform} mode={mode} object={obj} />;
  }

  return null;
}
