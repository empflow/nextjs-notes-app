import ViewsContainer from "@/app/components/Views/ViewsContainer";
import useGetContext from "@/app/hooks/useGetContext";
import { ToolbarContext } from "../../Context";
import FormatTextIcon from "@/icons/svg/formatText.svg";
import ToolbarItem from "../Item";
import { useTranslations } from "next-intl";
import Popover from "@/app/components/Popover";
import FormattingView from "./Formatting/Formatting";
import CodeView from "./Code/Code";

export default function FormatText() {
  const t = useTranslations("Toolbar.tooltips");
  const { isFormatTextMenuOpen: isOpen, setIsFormatTextMenuOpen: setIsOpen } =
    useGetContext(ToolbarContext);

  return (
    <ToolbarItem
      icon={<FormatTextIcon />}
      onClick={() => setIsOpen((prev) => !prev)}
      tooltipText={t("formatText")}
      hideTooltip={isOpen}
    >
      <Popover {...{ isOpen, setIsOpen }} position="bottom-center" offset={40}>
        <ViewsContainer
          centered={true}
          {...{ isOpen, setIsOpen }}
          initMenu="formatting"
          width={250}
        >
          <FormattingView />
          <CodeView />
        </ViewsContainer>
      </Popover>
    </ToolbarItem>
  );
}
