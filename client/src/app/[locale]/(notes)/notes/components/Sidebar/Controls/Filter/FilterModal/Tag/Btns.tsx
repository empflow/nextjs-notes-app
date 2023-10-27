import SmallBtn from "@/app/components/buttons/Small";
import { SetState } from "@/utils/types";

interface TProps {
  isEditingThisTag: boolean;
  setIsEditingThisTag: SetState<boolean>;
}

export default function TagBtns({
  isEditingThisTag,
  setIsEditingThisTag,
}: TProps) {
  return (
    <div className="flex gap-1">
      {isEditingThisTag && (
        <>
          <SmallBtn>Save</SmallBtn>
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
