import ViewsContainer from "@/app/components/Views/ViewsContainer";
import useGetContext from "@/app/hooks/useGetContext";
import { ToolbarContext } from "../../Context";
import FormatTextIcon from "@/icons/svg/formatText.svg";
import ToolbarItem from "../ToolbarItem";
import { useTranslations } from "next-intl";
import Popover from "@/app/components/Popover";
import FormattingView from "./Formatting/Formatting";
import NotesContext from "@/app/[locale]/(notes)/notes/NotesContext";
import ListsView from "./Lists";
import useIsScreenWidthOverBreakpoint from "@/app/hooks/useIsScreenWidthOverBreakpoint";
import { CSSProperties } from "react";

export default function FormatText() {
  const t = useTranslations("Toolbar.tooltips");
  const { isFormatTextMenuOpen: isOpen, setIsFormatTextMenuOpen: setIsOpen } =
    useGetContext(ToolbarContext);
  const { selectedNoteId } = useGetContext(NotesContext);
  const isDisabled = !selectedNoteId;
  const isMobile = !useIsScreenWidthOverBreakpoint("sm");
  const style: CSSProperties = {};
  if (isMobile) style.translate = "-10% 0";

  return (
    <ToolbarItem
      icon={<FormatTextIcon />}
      onClick={() => setIsOpen((prev) => !prev)}
      isDisabled={isDisabled}
      tooltipText={t("formatText")}
      hideTooltip={isOpen || isDisabled}
    >
      <Popover
        {...{ isOpen, setIsOpen }}
        position={"bottom-center"}
        offset={40}
        style={style}
        portalSelector="#main-content-popover-overlays"
      >
        <ViewsContainer
          centered={true}
          {...{ isOpen, setIsOpen }}
          initMenu="formatting"
          width={250}
        >
          <FormattingView />
          <ListsView />
        </ViewsContainer>
      </Popover>
    </ToolbarItem>
  );
}
