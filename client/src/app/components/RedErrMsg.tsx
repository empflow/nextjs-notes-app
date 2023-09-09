import React from "react";

interface Props {
  msg: string;
  className?: string;
}

export default function RedErrMsg({ msg, className }: Props) {
  className = className ? className : "";
  return (
    <div
      className={`font-semibold text-l-error dark:text-d-error ${className}`}
    >
      {msg}
    </div>
  );
}
