import cn from "@/utils/cn";
import { SetState } from "@/utils/types";
import { CSSProperties, forwardRef, ReactNode } from "react";
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
  portalSelector?: string;
  usePortal?: boolean;
  overlayStyle?: CSSProperties;
  noOverlay?: boolean;
};

interface TPosition {
  translate?: string;
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
}

const Popover = forwardRef<HTMLDivElement, TProps>(
  (
    {
      children,
      style,
      className,
      position,
      isOpen,
      setIsOpen,
      offset = 0,
      portalSelector,
      usePortal = true,
      overlayStyle,
      noOverlay,
    },
    ref,
  ) => {
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
          ref={ref}
          style={{ ...activePosition, ...style }}
          className={cn(
            `absolute z-30 duration-100`,
            { "pointer-events-auto translate-y-0 opacity-100": isOpen },
            { "pointer-events-none -translate-y-1 opacity-0": !isOpen },
            className,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
        {!noOverlay && (
          <Overlay
            style={overlayStyle}
            usePortal={usePortal}
            portalSelector={portalSelector}
            isActive={isOpen}
            setIsActive={setIsOpen}
            transparent={true}
          />
        )}
      </>
    );
  },
);

export default Popover;
