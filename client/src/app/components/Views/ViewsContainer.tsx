import { ReactNode, useState } from "react";
import { SetState } from "@/utils/types";
import getViewsContext, { TViewsContainerHeight } from "./getVIewsContext";

export const ViewsContainerContext = getViewsContext();

interface TProps {
  initMenu: string;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
  centered?: boolean;
  width?: number;
}

export default function ViewsContainer({
  initMenu,
  children,
  isOpen,
  setIsOpen,
  width = 300,
}: TProps) {
  const [activeView, setActiveView] = useState(initMenu);
  const [height, setHeight] = useState<TViewsContainerHeight>("auto");

  return (
    <div
      className={`rounded border border-light-2xl-gray bg-l-secondary shadow-md duration-200 dark:border-dark-3xl-gray dark:bg-d-main`}
      style={{ height, width }}
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
