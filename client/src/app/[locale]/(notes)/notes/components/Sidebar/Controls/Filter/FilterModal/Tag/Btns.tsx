import SmallBtn from "@/app/components/buttons/Small";
import useUpdateTagMutation from "@/app/hooks/reactQuery/useUpdateTagMutation";
import useGetContext from "@/app/hooks/useGetContext";
import useRerender from "@/app/hooks/useRerender";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { TagContext } from "./Tag";

export default function TagBtns() {
  const {
    form,
    isEditingThisTag,
    setIsEditingThisTag,
    _id: tagId,
    setColor,
    setName,
  } = useGetContext(TagContext);
  const t = useTranslations("General");
  const formData = form.watch();
  const rerender = useRerender();
  useEffect(rerender, [isEditingThisTag]);
  const { mutate: updateTag } = useUpdateTagMutation();

  const handleSave = () => {
    updateTag({ ...formData, tagId });
    setIsEditingThisTag(false);
    setColor(formData.color);
    setName(formData.name);
  };

  const handleCancel = () => {
    setIsEditingThisTag(false);
    form.reset();
  };

  return (
    <div className="flex gap-1">
      {isEditingThisTag && (
        <>
          <SmallBtn onClick={handleSave} disabled={!formData.name}>
            {t("save")}
          </SmallBtn>
          <SmallBtn onClick={handleCancel} type="button" variant="outlined">
            {t("cancel")}
          </SmallBtn>
        </>
      )}
    </div>
  );
}
