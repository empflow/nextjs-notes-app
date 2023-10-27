import SmallBtn from "@/app/components/buttons/Small";
import useRerender from "@/app/hooks/useRerender";
import { SetState } from "@/utils/types";
import { useEffect } from "react";
import { TAddTagForm } from "../AddTagModal/AddTagModal";

interface TProps {
  isEditingThisTag: boolean;
  setIsEditingThisTag: SetState<boolean>;
  formData: TAddTagForm;
}

export default function TagBtns({
  isEditingThisTag,
  setIsEditingThisTag,
  formData,
}: TProps) {
  const rerender = useRerender();
  useEffect(rerender, [isEditingThisTag]);
  console.log(formData);

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
