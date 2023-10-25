import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { useTranslations } from "next-intl";
import { ToolbarContext } from "../../Context";
import ToolbarItem from "../ToolbarItem";
import LinkIcon from "@/icons/svg/link.svg";
import Popover from "@/app/components/Popover";
import Hidable from "@/app/components/Hidable";
import SignleView from "@/app/components/Views/SingleView";
import AddLinkPopoverContent from "./PopoverContent";
import useGetToggleLinkAttrs from "./useGetToggleLinkAttrs";

export default function AddLink() {
  const menuWidth = 250;
  const t = useTranslations("Toolbar");
  const { editor } = useGetContext(NotesContext);
  const { isAddLinkMenuOpen: isOpen, setIsAddLinkMenuOpen: setIsOpen } =
    useGetContext(ToolbarContext);
  const toggleLinkAttrs = useGetToggleLinkAttrs();
  const isDisabled = !editor
    ?.can()
    .chain()
    .focus()
    .toggleLink(toggleLinkAttrs)
    .run();

  function toggleAddLinkMenu() {
    setIsOpen((prev) => !prev);
  }

  return (
    <ToolbarItem
      tooltipText={t("tooltips.addLink")}
      isDisabled={isDisabled}
      hideTooltip={isOpen}
      onClick={toggleAddLinkMenu}
      icon={<LinkIcon />}
    >
      <Popover
        style={{ width: menuWidth }}
        position="bottom-center"
        {...{ isOpen, setIsOpen }}
        offset={40}
        portalSelector="#main-content-popover-overlays"
      >
        <Hidable className="px-3 py-2" width={menuWidth} isHidden={isOpen}>
          <SignleView name={t("link.menuTitle")}>
            <AddLinkPopoverContent />
          </SignleView>
        </Hidable>
      </Popover>
    </ToolbarItem>
  );
}
