import SmallBtn from "@/app/components/buttons/Small";
import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import FilterModalContext from "./Context";

export default function FilterModalEditTagsBtn() {
  const t = useTranslations("Tags");
  const { setIsEditing, isEditing } = useGetContext(FilterModalContext);
  let content: ReactNode;
  if (isEditing) content = t("stopEditingTags");
  else content = t("editTags");

  return (
    <div>
      <SmallBtn onClick={() => setIsEditing((prev) => !prev)}>
        {content}
      </SmallBtn>
    </div>
  );
}
