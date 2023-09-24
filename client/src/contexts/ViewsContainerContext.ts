import { TViewsContainerHeight } from "@/app/components/Views/ViewsContainer";
import { SetState, TContext } from "@/utils/types";

export type TViewsContainerContext = TContext<{
  activeView: string;
  setActiveView: SetState<string>;
  setViewsContainerHeight: SetState<TViewsContainerHeight>;
  setIsViewsContainerOpen: SetState<boolean>;
}>;
