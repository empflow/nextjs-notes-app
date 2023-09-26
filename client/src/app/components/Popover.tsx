import { SetState } from "@/utils/types";
import { CSSProperties, ReactNode } from "react";
import Overlay from "./Overlay";

type TProps = {
  children: ReactNode;
  style?: CSSProperties;
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
  position: "top" | "bottom" | "left" | "right";
  offset?: number;
};

export default function Popover({
  children,
  style,
  position,
  isOpen,
  setIsOpen,
  offset = 0,
}: TProps) {
  let translate: string | undefined,
    top: string | number | undefined,
    bottom: string | number | undefined,
    left: string | number | undefined,
    right: string | number | undefined;

  switch (position) {
    case "top":
      translate = "-50%";
      left = "50%";
      bottom = offset;
      break;
    case "bottom":
      translate = "-50%";
      left = "50%";
      top = offset;
      break;
    case "left":
      translate = "0 50%";
      bottom = "50%";
      right = offset ?? 0;
      break;
    case "right":
      translate = "0 50%";
      bottom = "50%";
      left = offset ?? 0;
      break;
  }

  return (
    <>
      <div
        style={{ ...{ top, bottom, left, right, translate }, ...style }}
        className={`absolute z-20 ${!isOpen ? "pointer-events-none" : ""}`}
      >
        {children}
      </div>
      <Overlay isActive={isOpen} setIsActive={setIsOpen} transparent={true} />
    </>
  );
}
