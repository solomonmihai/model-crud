import React from "react";

export default function Input({ label, ...props }) {
  // TODO: fix label
  return (
    <>
      {label && (
        <label className="text-left text-xmint bg-xgray w-fit translate-x-4 translate-y-3/4 px-2">
          {label}
        </label>
      )}
      <input
        className="outline-none border-2 border-xmint p-2 m-2 bg-xgray text-xwhite"
        {...props}
      />
    </>
  );
}
