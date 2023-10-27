import Popover from "@/app/components/Popover";
import useGetContext from "@/app/hooks/useGetContext";
import { SetState } from "@/utils/types";
import FilterModalContext from "../Context";

interface TProps {
  setIsPopoverMenuOpen: SetState<boolean>;
  isPopoverMenuOpen: boolean;
}

export default function TagActionsPopover({
  isPopoverMenuOpen,
  setIsPopoverMenuOpen,
}: TProps) {
  const { isEditing } = useGetContext(FilterModalContext);
  return (
    <>
      {isEditing && (
        <div
          className="relative"
          onClick={() => setIsPopoverMenuOpen((prev) => !prev)}
        >
          open popover
          <Popover
            noOverlay={true}
            isOpen={isPopoverMenuOpen}
            setIsOpen={setIsPopoverMenuOpen}
            position={"bottom-left"}
            offset={30}
            portalSelector="#popover-overlays"
            className="rounded border border-light-3xl-gray bg-light-5xl-gray px-2 py-1"
          >
            popover content
          </Popover>
        </div>
      )}
    </>
  );
}
