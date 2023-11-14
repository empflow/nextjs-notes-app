import { SetState, TContext } from "@/utils/types";
import { createContext } from "react";

export type TViewsContainerHeight = "auto" | number;
export type TViewsContainerContext = TContext<{
  activeView: string;
  setActiveView: SetState<string>;
  setViewsContainerHeight: SetState<TViewsContainerHeight>;
  setIsViewsContainerOpen: SetState<boolean>;
}>;

export default function getViewsContext() {
  return createContext<TViewsContainerContext>(null);
}
