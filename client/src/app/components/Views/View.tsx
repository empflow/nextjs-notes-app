import { useEffect, useRef } from "react";
import ArrowBackIcon from "@/icons/svg/backArrow.svg";
import useGetContext from "@/app/hooks/useGetContext";
import { ViewsContainerContext } from "./ViewsContainer";
import ViewBackBtn from "./ViewBackBtn";

interface TProps {
  children: React.ReactNode;
  name: string;
  nameToShow: string;
  backBtn?: {
    text: string;
    navTo: string;
  };
}

export default function View({ children, name, nameToShow, backBtn }: TProps) {
  const { activeView, setViewsContainerHeight } = useGetContext(
    ViewsContainerContext,
  );
  const viewRef = useRef<HTMLDivElement>(null);
  const isViewVisible = activeView === name;

  useEffect(() => {
    if (isViewVisible) {
      setViewsContainerHeight(viewRef.current?.offsetHeight ?? "auto");
    }
  }, [activeView]);

  if (!isViewVisible) return null;
  return (
    <div ref={viewRef} className="flex flex-col gap-2">
      <ViewBackBtn text={backBtn?.text} navTo={backBtn?.navTo} />
      <div className="text-xl font-bold">{nameToShow}</div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
