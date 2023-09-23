import TooltipContainerContext from "@/contexts/TooltipContainerContext";
import { ReactNode } from "react";
import useGetContext from "../hooks/useGetContext";

interface TProps {
  children: ReactNode;
  text: string;
}

export default function Tooltip({ children, text }: TProps) {
  const { showTooltips } = useGetContext(TooltipContainerContext);

  return (
    <div className="relative">
      <div>{children}</div>

      <div
        className={`absolute left-1/2 w-max max-w-[250px] -translate-x-1/2 rounded border border-light-3xl-gray bg-white px-[5px] py-[2px] text-center shadow-lg duration-200 ${
          showTooltips ? "opacity-100" : "opacity-0"
        }`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
}
