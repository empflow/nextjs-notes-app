import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { useTranslations } from "next-intl";
import { CSSProperties, useRef, useState } from "react";
import ToolbarItem from "../ToolbarItem";
import ImageIcon from "@/icons/svg/image.svg";
import Popover from "@/app/components/Popover";
import Hidable from "@/app/components/Hidable";
import SignleView from "@/app/components/Views/SingleView";
import AddMediaFilePopoverContent from "./PopoverContent";
import { AddMediaFileContext, TAddMediaFileState } from "./Context";
import useIsScreenWidthOverBreakpoint from "@/app/hooks/useIsScreenWidthOverBreakpoint";

export default function AddMediaFile() {
  const menuWidth = 280;
  const t = useTranslations("Toolbar");
  const { selectedNoteId } = useGetContext(NotesContext);
  const isDisabled = !selectedNoteId;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mediaFileId, setMediaFileId] = useState<string | null>(null);
  const [mediaFiles, setMediaFiles] = useState<FileList | null>(null);
  const [menuState, setMenuState] = useState<TAddMediaFileState>("chooseFile");
  const isMobile = !useIsScreenWidthOverBreakpoint("sm");
  const style: CSSProperties = {
    width: menuWidth,
  };
  if (isMobile) style.translate = "-30% 0";

  return (
    <ToolbarItem
      tooltipText={t("tooltips.addMediaFile")}
      isDisabled={isDisabled}
      hideTooltip={isMenuOpen}
      onClick={() => setIsMenuOpen((prev) => !prev)}
      icon={<ImageIcon />}
    >
      <Popover
        portalSelector="#main-content-popover-overlays"
        style={style}
        position="bottom-center"
        {...{ isOpen: isMenuOpen, setIsOpen: setIsMenuOpen }}
        offset={40}
      >
        <Hidable className="px-3 py-2" width={menuWidth} isHidden={isMenuOpen}>
          <SignleView name={t("addMediaFile.menuTitle")}>
            <AddMediaFileContext.Provider
              value={{
                fileInputRef,
                isMenuOpen,
                setIsMenuOpen,
                mediaFileId,
                setMediaFileId,
                mediaFiles,
                setMediaFiles,
                menuState,
                setMenuState,
              }}
            >
              <AddMediaFilePopoverContent />
            </AddMediaFileContext.Provider>
          </SignleView>
        </Hidable>
      </Popover>
    </ToolbarItem>
  );
}
