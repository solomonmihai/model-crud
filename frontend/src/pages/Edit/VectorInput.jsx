import React, { useState } from "react";

const NumInput = ({ ...props }) => (
  // TODO: allow only numbers
  <input className="min-w-[4px] outline-none bg-xgray px-1" {...props} />
);

export default function VectorInput({ label, vector, onChange }) {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1">{label}:</div>
      <div className="col-span-2 flex space-x-1">
        <NumInput
          value={vector[0]}
          onChange={(evt) => {
            if (evt.target === "") {
              return;
            }
            const val = [evt.target.value, vector[1], vector[2]];
            onChange(val);
          }}
        />
        <NumInput
          value={vector[1]}
          onChange={(evt) => {
            if (evt.target === "") {
              return;
            }
            const val = [vector[0], evt.target.value, vector[2]];
            onChange(val);
          }}
        />
        <NumInput
          value={vector[2]}
          onChange={(evt) => {
            if (evt.target === "") {
              return;
            }
            const val = [vector[0], vector[1], evt.target.value];
            onChange(val);
          }}
        />
      </div>
    </div>
  );
}
