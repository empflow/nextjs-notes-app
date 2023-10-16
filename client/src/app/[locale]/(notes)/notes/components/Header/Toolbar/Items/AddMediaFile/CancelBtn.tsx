import SmallBtn from "@/app/components/buttons/Small";
import { SetState } from "@/utils/types";
import { TAddMediaFileState } from "./PopoverContent";

interface TProps {
  files: FileList | null;
  setFiles: SetState<FileList | null>;
  setState: SetState<TAddMediaFileState>;
}

export default function AddMediaFileCancelBtn({
  files,
  setFiles,
  setState,
}: TProps) {
  if (!files?.length) return null;

  function onClick() {
    setFiles(null);
    setState("chooseFile");
  }

  return (
    <SmallBtn variant="outlined" onClick={onClick}>
      cancel
    </SmallBtn>
  );
}
