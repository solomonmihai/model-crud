import React, { useState, useEffect } from "react";
import EditStore from "../../stores/edit";
import VectorInput from "./VectorInput";

const TO_RADIANS = Math.PI / 180;
const TO_DEGREES = 180 / Math.PI;

export default function Sidebar() {
  const objects = EditStore.useState((s) => s.model.objects);
  const selectedId = EditStore.useState((s) => s.selected);
  const [obj, setObj] = useState();

  // TODO: drag sidebar

  useEffect(() => {
    let newObj = null;

    for (const o of objects) {
      if (o.uuid === selectedId) {
        newObj = o;
        break;
      }
    }

    setObj(newObj);
  }, [selectedId]);

  useEffect(() => {
    EditStore.update((s) => {
      for (let i = 0; i < objects.length; i++) {
        if (objects[i].uuid === selectedId) {
          s.model.objects[i] = obj;
          break;
        }
      }
    });
  }, [obj]);

  return (
    <div className="flex flex-col space-y-2 overflow-scroll p-2 min-w-[240px] text-sm">
      {!obj ? (
        <p className="text-center">no object selected</p>
      ) : (
        <>
          <VectorInput
            label="position"
            vector={obj.position}
            onChange={(val) => {
              setObj((old) => {
                const newObj = { ...old };
                newObj.position = val;
                return newObj;
              });
            }}
          />
          <VectorInput
            label="scale"
            vector={obj.scale}
            onChange={(val) => {
              setObj((old) => {
                const newObj = { ...old };
                newObj.scale = val;
                return newObj;
              });
            }}
          />
          <VectorInput
            label="rotation"
            vector={obj.rotation.map((x) => x * TO_DEGREES)}
            onChange={(val) => {
              setObj((old) => {
                const newObj = { ...old };
                newObj.rotation = val.map((x) => x * TO_RADIANS);
                return newObj;
              });
            }}
          />
          <div className="grid grid-cols-3">
            <div className="col-span-1">color: </div>
            <div className="col-span-2">
              <input
                className="w-full"
                type="color"
                value={obj.color}
                onChange={(evt) => {
                  setObj((old) => {
                    const newObj = { ...old };
                    newObj.color = evt.target.value;
                    return newObj;
                  });
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
