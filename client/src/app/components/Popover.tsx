import { SetState } from "@/utils/types";
import { CSSProperties, ReactNode } from "react";
import Overlay from "./Overlay";

type TProps = {
  children: ReactNode;
  style?: CSSProperties;
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
  position:
    | "top-center"
    | "top-left"
    | "top-right"
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "left"
    | "right";
  offset?: number;
  className?: string;
};

interface TPosition {
  translate?: string;
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
}

export default function Popover({
  children,
  style,
  className,
  position,
  isOpen,
  setIsOpen,
  offset = 0,
}: TProps) {
  const positions: Record<typeof position, TPosition> = {
    "top-center": { translate: "-50%", left: "50%", bottom: offset },
    "top-left": { bottom: offset, right: 0 },
    "top-right": { bottom: offset, left: 0 },
    "bottom-center": { translate: "-50%", left: "50%", top: offset },
    "bottom-left": { top: offset, right: 0 },
    "bottom-right": { top: offset, left: 0 },
    left: { translate: "0 50%", bottom: "50%", right: offset ?? 0 },
    right: { translate: "0 50%", bottom: "50%", left: offset ?? 0 },
  };
  const activePosition = positions[position];

  return (
    <>
      <div
        style={{ ...activePosition, ...style }}
        className={`absolute z-20 ${!isOpen ? "pointer-events-none" : ""} ${
          className ?? ""
        }`}
      >
        {children}
      </div>
      <Overlay isActive={isOpen} setIsActive={setIsOpen} transparent={true} />
    </>
  );
}
