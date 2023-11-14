import httpWithAuth from "@/utils/http/httpWithAuth/httpWithAuth";
import { useMutation } from "@tanstack/react-query";
import useGetContext from "../useGetContext";
import { mediaFileSchema } from "@shared/schemas/mediaFile";
import notify from "@/utils/notify";
import { useTranslations } from "next-intl";
import { AddMediaFileContext } from "@/app/[locale]/(notes)/notes/components/Header/Toolbar/Items/AddMediaFile/Context";
import NotesContext from "@/app/[locale]/(notes)/notes/NotesContext";
import wait from "@/utils/wait";

export default function useUploadMediaFileMutation() {
  const errsT = useTranslations("Errors");
  const {
    mediaFiles,
    setMenuState,
    setIsMenuOpen,
    setMediaFiles,
    fileInputRef,
  } = useGetContext(AddMediaFileContext);
  const { editor } = useGetContext(NotesContext);
  const mutation = useMutation(mutationFn, {
    onError: () => {
      notify(errsT("generic"), "error");
      setMenuState("uploadFile");
    },
    onMutate: () => setMenuState("uploadingFile"),
    onSuccess: async (data) => {
      await onSuccessMenuTeardown();
      if (data) editor?.commands.setNextImage({ id: data._id });
    },
  });

  async function onSuccessMenuTeardown() {
    moveSelectionAwayFromImage();
    resetFileInput();
    setIsMenuOpen(false);
    const waitMs = 300;
    setTimeout(() => {
      setMenuState("chooseFile");
      setMediaFiles(null);
    }, waitMs);
    await wait(waitMs);
  }

  function resetFileInput() {
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function moveSelectionAwayFromImage() {
    editor?.view.dom.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter" }),
    );
  }

  async function mutationFn() {
    const mediaFile = mediaFiles?.[0];
    if (!mediaFile) return;

    const formData = new FormData();
    formData.append("img", mediaFile);

    const resp = await httpWithAuth.post("/media/upload/img", formData);
    return mediaFileSchema.parse(resp.data);
  }

  return mutation;
}
