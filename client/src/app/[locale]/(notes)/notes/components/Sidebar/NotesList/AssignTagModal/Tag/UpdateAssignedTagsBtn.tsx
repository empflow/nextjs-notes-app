import SmallBtn from "@/app/components/buttons/Small";
import useUpdateAssignedTagsMutation, {
  TUpdateAssignedTagsAction,
} from "@/app/hooks/queries/useUpdateAssignedTagsMutation";
import useGetContext from "@/app/hooks/useGetContext";
import useGetNote from "@/app/hooks/useGetNote";
import NotesContext from "@/contexts/NotesContext";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

interface TProps {
  tagId: string;
  mode: TUpdateAssignedTagsAction;
}

export default function AssignTagModalUpdateAssignedTagsBtn({
  tagId,
  mode,
}: TProps) {
  const { mutate: updateAssignedTags } = useUpdateAssignedTagsMutation();
  const { assignTagModalNoteId: noteId } = useGetContext(NotesContext);
  const t = useTranslations("Tags");
  const noteToUpdate = useGetNote(noteId as string);
  let content: ReactNode;
  let isDisabled: boolean;

  function getIsBtnDisabled({ mode }: { mode: TUpdateAssignedTagsAction }) {
    if (!noteToUpdate) return true;
    const includes = noteToUpdate.tags.includes(tagId);
    if (mode === "assign") return includes;
    return !includes;
  }

  if (mode === "assign") {
    content = t("assign");
    isDisabled = getIsBtnDisabled({ mode: "assign" });
  } else {
    content = t("unassign");
    isDisabled = getIsBtnDisabled({ mode: "unassign" });
  }

  function handleClick() {
    if (mode === "assign") {
      console.log("assign");
      updateAssignedTags({ noteId: noteId as string, tagId, action: "assign" });
    } else {
      console.log("unassign");
      updateAssignedTags({
        noteId: noteId as string,
        tagId,
        action: "unassign",
      });
    }
  }

  return (
    <SmallBtn
      disabled={isDisabled}
      style={{ borderColor: isDisabled ? "transparent" : undefined }}
      variant="outlined"
      onClick={handleClick}
    >
      {content}
    </SmallBtn>
  );
}
