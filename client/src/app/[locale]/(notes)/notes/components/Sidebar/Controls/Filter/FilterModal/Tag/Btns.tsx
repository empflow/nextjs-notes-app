import SmallBtn from "@/app/components/buttons/Small";
import useGetContext from "@/app/hooks/useGetContext";
import useRerender from "@/app/hooks/useRerender";
import { SetState } from "@/utils/types";
import { useEffect } from "react";
import { TAddTagForm } from "../AddTagModal/AddTagModal";
import { TagContext } from "./Tag";

export default function TagBtns() {
  const { form, isEditingThisTag, setIsEditingThisTag } =
    useGetContext(TagContext);
  const formData = form.watch();
  const rerender = useRerender();
  useEffect(rerender, [isEditingThisTag]);

  return (
    <div className="flex gap-1">
      {isEditingThisTag && (
        <>
          <SmallBtn disabled={!formData.name}>Save</SmallBtn>
          <SmallBtn
            onClick={() => setIsEditingThisTag(false)}
            variant="outlined"
          >
            Cancel
          </SmallBtn>
        </>
      )}
    </div>
  );
}
