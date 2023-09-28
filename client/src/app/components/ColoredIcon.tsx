import { cloneElement } from "react";

interface TProps {
  isDisabled?: boolean;
  icon: any;
}

export default function ColoredIcon({ isDisabled = false, icon }: TProps) {
  return cloneElement(icon, {
    className: `${
      isDisabled
        ? "fill-light-gray dark:fill-dark-xl-gray"
        : "fill-light-xl-blue"
    }`,
  });
}
