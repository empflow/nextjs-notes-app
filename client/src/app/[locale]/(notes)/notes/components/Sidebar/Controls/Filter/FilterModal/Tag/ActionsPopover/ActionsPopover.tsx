import Popover from "@/app/components/Popover";
import useGetContext from "@/app/hooks/useGetContext";
import { SetState } from "@/utils/types";
import { Ref, RefObject, useEffect } from "react";
import FilterModalContext from "../../Context";
import TagActionsPopoverBtn from "./Btn";
import MoreIcon from "@/icons/svg/moreHorizontalCircled.svg";
import { useTranslations } from "next-intl";
import { TagContext } from "../Tag";

export default function TagActionsPopover() {
  const {
    setIsPopoverMenuOpen,
    isPopoverMenuOpen,
    isEditingThisTag,
    setIsEditingThisTag,
    nameInputRef,
  } = useGetContext(TagContext);
  const t = useTranslations("Tags");
  const { isEditing } = useGetContext(FilterModalContext);

  useEffect(() => {
    if (!isEditing) setIsEditingThisTag(false);
  }, [isEditing]);

  function handleRename() {
    if (!isEditingThisTag) setIsEditingThisTag(true);
    setTimeout(() => {
      const inputRef = nameInputRef.current;
      if (!inputRef) return;
      inputRef.focus();
      inputRef.selectionStart = inputRef.selectionEnd = inputRef.value.length;
    }, 0);
  }

  return (
    <>
      {isEditing && (
        <div
          className="relative"
          onClick={() => setIsPopoverMenuOpen((prev) => !prev)}
        >
          <MoreIcon className="cursor-pointer" />
          <Popover
            noOverlay={true}
            isOpen={isPopoverMenuOpen}
            setIsOpen={setIsPopoverMenuOpen}
            position={"bottom-left"}
            offset={30}
            portalSelector="#popover-overlays"
            className="rounded border border-light-3xl-gray bg-light-5xl-gray px-2 py-1"
          >
            <TagActionsPopoverBtn
              {...{ setIsPopoverMenuOpen }}
              onClick={handleRename}
            >
              {t("rename")}
            </TagActionsPopoverBtn>
            <TagActionsPopoverBtn
              {...{ setIsPopoverMenuOpen }}
              onClick={() => {}}
            >
              {t("delete")}
            </TagActionsPopoverBtn>
          </Popover>
        </div>
      )}
    </>
  );
}
