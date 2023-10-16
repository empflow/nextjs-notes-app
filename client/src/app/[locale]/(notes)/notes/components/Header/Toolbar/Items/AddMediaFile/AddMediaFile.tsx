import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ToolbarContext } from "../../Context";
import ToolbarItem from "../Item";
import ImageIcon from "@/icons/svg/image.svg";
import Popover from "@/app/components/Popover";
import Hidable from "@/app/components/Hidable";
import SignleView from "@/app/components/Views/SingleView";
import AddMediaFilePopoverContent from "./PopoverContent";

export default function AddMediaFile() {
  const menuWidth = 280;
  const t = useTranslations("Toolbar");
  const { editor } = useGetContext(NotesContext);
  const {
    isAddMediaFileMenuOpen: isOpen,
    setIsAddMediaFileMenuOpen: setIsOpen,
    mediaFileId,
  } = useGetContext(ToolbarContext);
  const { selectedNoteId } = useGetContext(NotesContext);
  const isDisabled = !selectedNoteId;

  return (
    <ToolbarItem
      tooltipText={t("tooltips.addMediaFile")}
      isDisabled={isDisabled}
      hideTooltip={isOpen}
      onClick={() => setIsOpen((prev) => !prev)}
      icon={<ImageIcon />}
    >
      <Popover
        style={{ width: menuWidth }}
        position="bottom-center"
        {...{ isOpen, setIsOpen }}
        offset={40}
      >
        <Hidable className="px-3 py-2" width={menuWidth} isHidden={isOpen}>
          <SignleView name={t("addMediaFile.menuTitle")}>
            <AddMediaFilePopoverContent />
          </SignleView>
        </Hidable>
      </Popover>
    </ToolbarItem>
  );
}
