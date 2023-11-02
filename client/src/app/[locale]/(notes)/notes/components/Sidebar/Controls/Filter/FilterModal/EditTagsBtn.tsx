import SmallBtn from "@/app/components/buttons/Small";
import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import FilterModalContext from "./Context";
import EditIcon from "@/icons/svg/edit.svg";
import EditOffIcon from "@/icons/svg/editOff.svg";

export default function FilterModalEditTagsBtn() {
  const t = useTranslations("Tags");
  const { setIsEditing, isEditing } = useGetContext(FilterModalContext);

  let content: ReactNode;
  let icon: ReactNode;

  if (isEditing) {
    content = t("stopEditingTags");
    icon = <EditOffIcon className="fill-white" />;
  } else {
    content = t("editTags");
    icon = <EditIcon className="fill-white" />;
  }

  return (
    <div>
      <SmallBtn
        className="flex gap-1"
        onClick={() => setIsEditing((prev) => !prev)}
      >
        {icon}
        {content}
      </SmallBtn>
    </div>
  );
}
