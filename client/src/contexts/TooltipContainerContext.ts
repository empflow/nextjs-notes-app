import { TContext } from "@/utils/types";
import { createContext } from "react";

interface TTooltipContainerContextValue {
  showTooltips: boolean;
}

type TTooltipContainerContext = TContext<TTooltipContainerContextValue>;
const TooltipContainerContext = createContext<TTooltipContainerContext>(null);

export default TooltipContainerContext;
