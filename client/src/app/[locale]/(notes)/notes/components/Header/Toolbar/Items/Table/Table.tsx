import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/app/[locale]/(notes)/notes/NotesContext";
import { useTranslations } from "next-intl";
import ToolbarItem from "../ToolbarItem";
import TableIcon from "@/icons/svg/table.svg";
import Popover from "@/app/components/Popover";
import Hidable from "@/app/components/Hidable";
import SignleView from "@/app/components/Views/SingleView";
import TablePopoverContent from "./PopoverContent";
import { TableContext } from "./Context";
import { useState } from "react";

export default function Table() {
  const menuWidth = 250;
  const t = useTranslations("Toolbar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { selectedNoteId } = useGetContext(NotesContext);
  const isDisabled = !selectedNoteId;

  return (
    <ToolbarItem
      tooltipText={t("tooltips.table")}
      isDisabled={isDisabled}
      hideTooltip={isMenuOpen}
      onClick={() => setIsMenuOpen((prev) => !prev)}
      icon={<TableIcon />}
    >
      <Popover
        portalSelector="#main-content-popover-overlays"
        style={{ width: menuWidth }}
        position="bottom-center"
        {...{ isOpen: isMenuOpen, setIsOpen: setIsMenuOpen }}
        offset={40}
      >
        <Hidable width={menuWidth} isHidden={isMenuOpen}>
          <SignleView name={t("table.menuTitle")} headerClassName="px-3 py-2">
            <TableContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
              <TablePopoverContent />
            </TableContext.Provider>
          </SignleView>
        </Hidable>
      </Popover>
    </ToolbarItem>
  );
}
