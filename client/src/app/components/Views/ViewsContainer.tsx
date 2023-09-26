import { createContext, forwardRef, ReactNode, useRef, useState } from "react";
import { SetState } from "@/utils/types";
import { TViewsContainerContext } from "@/contexts/ViewsContainerContext";

export type TViewsContainerHeight = "auto" | number;

export const ViewsContainerContext =
  createContext<TViewsContainerContext>(null);

interface TProps {
  initMenu: string;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
  centered?: boolean;
  top?: number;
}

export default function ViewsContainer({
  initMenu,
  children,
  isOpen,
  setIsOpen,
  centered = true,
  top,
}: TProps) {
  const [activeView, setActiveView] = useState(initMenu);
  const [height, setHeight] = useState<TViewsContainerHeight>("auto");

  return (
    <div
      className={`${
        isOpen
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0"
      } box-content w-[300px] overflow-hidden rounded border border-light-3xl-gray bg-l-secondary p-2 shadow-md duration-200 dark:border-dark-3xl-gray dark:bg-d-main`}
      style={{ height, top }}
    >
      <ViewsContainerContext.Provider
        value={{
          activeView,
          setActiveView,
          setViewsContainerHeight: setHeight,
          setIsViewsContainerOpen: setIsOpen,
        }}
      >
        {children}
      </ViewsContainerContext.Provider>
    </div>
  );
}
