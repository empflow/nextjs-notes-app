import SmallBtn from "@/app/components/buttons/Small";
import useGetContext from "@/app/hooks/useGetContext";
import { AddMediaFileContext } from "./Context";

export default function AddMediaFileCancelBtn() {
  const { mediaFiles, setMediaFiles, setMenuState } =
    useGetContext(AddMediaFileContext);
  if (!mediaFiles?.length) return null;

  function onClick() {
    setMediaFiles(null);
    setMenuState("chooseFile");
  }

  return (
    <SmallBtn variant="outlined" onClick={onClick}>
      cancel
    </SmallBtn>
  );
}
