import Popover from "@/app/components/Popover";
import useGetContext from "@/app/hooks/useGetContext";
import { SetState } from "@/utils/types";
import { Ref, RefObject, useEffect } from "react";
import FilterModalContext from "../../Context";
import PopoverActionBtn from "../../../../../../../../../(main)/auth/sign-in/components/PopoverActionBtn";
import MoreIcon from "@/icons/svg/moreHorizontalCircled.svg";
import { useTranslations } from "next-intl";
import { TagContext } from "../Tag";
import useDeleteTagMutation from "@/app/hooks/reactQuery/useDeleteTagMutation";

export default function TagActionsPopover() {
  const {
    setIsPopoverMenuOpen,
    isPopoverMenuOpen,
    isEditingThisTag,
    setIsEditingThisTag,
    nameInputRef,
  } = useGetContext(TagContext);
  const t = useTranslations("Tags");
  const tGeneral = useTranslations("General");
  const { isEditing } = useGetContext(FilterModalContext);
  const { _id } = useGetContext(TagContext);
  const { mutate: deleteTag } = useDeleteTagMutation();

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

  const handleDelete = () => deleteTag(_id);
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
            className="rounded border border-light-3xl-gray  bg-light-5xl-gray px-2 py-1 dark:border-dark-3xl-gray dark:bg-dark-5xl-gray"
          >
            <PopoverActionBtn
              {...{ setIsPopoverMenuOpen }}
              onClick={handleRename}
            >
              {tGeneral("edit")}
            </PopoverActionBtn>
            <PopoverActionBtn
              {...{ setIsPopoverMenuOpen }}
              onClick={handleDelete}
            >
              {t("delete")}
            </PopoverActionBtn>
          </Popover>
        </div>
      )}
    </>
  );
}
