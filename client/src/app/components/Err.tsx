import React from "react";

interface Props {
  msg: string;
  className?: string;
}

export default function Err({ msg, className }: Props) {
  className = className ? className : "";
  return (
    <div
      className={`text-l-error dark:text-d-error font-semibold ${className}`}
    >
      {msg}
    </div>
  );
}
