import React from "react";
import classnames from "classnames";

export default function Button({ filled, danger, children, ...props }) {
  const main =
    "cursor-pointer m-2 min-w-[100px] text-center font-bold p-[3px] border-2 transition-ease duration-75";

  // TODO: remake this shit
  return (
    <div
      className={classnames(main, {
        "bg-red-400": filled && danger,
        "bg-xmint": filled && !danger,
        "border-xmint": !danger,
        "border-red-400": danger,
        "text-xdark": filled && !danger,
        "text-xmint": !filled && !danger,
        "text-xdark": filled && danger,
        "text-red-400": !filled && danger,
        "hover:bg-xdark hover:text-xmint": filled && !danger,
        "hover:bg-xdark hover:text-red-400": filled && danger,
        "hover:bg-xmint hover:text-xdark": !filled && !danger,
        "hover:bg-red-400 hover:text-xdark": !filled && danger,
      })}
      {...props}
    >
      {children}
    </div>
  );
}
