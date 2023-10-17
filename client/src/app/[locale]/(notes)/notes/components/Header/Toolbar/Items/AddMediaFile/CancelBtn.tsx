import SmallBtn from "@/app/components/buttons/Small";
import useGetContext from "@/app/hooks/useGetContext";
import { SetState } from "@/utils/types";
import { ToolbarContext } from "../../Context";

export default function AddMediaFileCancelBtn() {
  const {
    mediaFiles: files,
    setMediaFiles: setFiles,
    setAddMediaFileMenuState: setState,
  } = useGetContext(ToolbarContext);
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
