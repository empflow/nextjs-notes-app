import TooltipContainerContext from "@/contexts/TooltipContainerContext";
import { ReactNode, useState } from "react";
import useGetContext from "../hooks/useGetContext";

interface TProps {
  children: ReactNode;
  text: string;
  hide?: boolean;
  top?: number;
}

export default function Tooltip({ children, text, hide = false, top }: TProps) {
  const [isCursorHovering, setIsCursorHovering] = useState(false);
  const { showTooltips } = useGetContext(TooltipContainerContext);
  const show = !hide && isCursorHovering && showTooltips;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsCursorHovering(true)}
      onMouseLeave={() => setIsCursorHovering(false)}
    >
      <div
        className={`absolute left-1/2 w-max max-w-[250px] -translate-x-1/2 rounded border border-light-3xl-gray bg-l-secondary px-[5px] py-[2px] text-center shadow-lg duration-200 dark:border-dark-3xl-gray dark:bg-d-main ${
          show
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{ top }}
      >
        <p>{text}</p>
      </div>
      {children}
    </div>
  );
}
