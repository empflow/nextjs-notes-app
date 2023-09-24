import useGetContext from "@/app/hooks/useGetContext";
import ArrowBackIcon from "@/icons/svg/backArrow.svg";
import { ViewsContainerContext } from "./ViewsContainer";

interface TProps {
  navTo?: string;
  text?: string;
}

export default function ViewBackBtn({ navTo, text }: TProps) {
  const { setActiveView } = useGetContext(ViewsContainerContext);
  if (!navTo || !text) return null;

  return (
    <div>
      <button
        className="flex items-center gap-0 text-[0.95rem] text-light-xl-blue"
        onClick={() => setActiveView(navTo)}
      >
        <ArrowBackIcon className="fill-light-xl-blue" width={15} height={15} />
        {text}
      </button>
    </div>
  );
}
