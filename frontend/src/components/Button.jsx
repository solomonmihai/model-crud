import React from "react";
export default function Button({ filled, children, ...props }) {
  const bg = filled ? "bg-xmint" : "";
  const text = filled ? "text-xdark" : "text-xmint";
  const hover = filled
    ? "hover:bg-xdark hover:text-xmint"
    : "hover:bg-xmint hover:text-xdark";

  return (
    <div
      className={`cursor-pointer m-2 min-w-[100px] text-center font-bold p-[3px] border-2 border-xmint transition-ease duration-75 ${bg} ${text} ${hover}`}
      {...props}
    >
      {children}
    </div>
  );
}
