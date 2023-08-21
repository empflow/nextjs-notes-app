import BigBtn from "@/app/components/buttons/Big";
import MediumBtn from "@/app/components/buttons/Medium";
import SmallBtn from "@/app/components/buttons/Small";
import TinyBtn from "@/app/components/buttons/Tiny";
import useGetContext from "@/app/hooks/useGetContext/useGetContext";

import { TWidth } from "@/utils/types";
import { useTranslations } from "next-intl";
import NotesContext from "@/contexts/NotesContext";
import { ErrorBoundary } from "react-error-boundary";
import NotesElems from "./NotesElems";

export default function NotesList() {
  const context = useGetContext(NotesContext);
  const { notes, selectedNoteId, setSelectedNoteId, notesLoading } = context;
  const t = useTranslations("Notes");

  return (
    <div className="flex flex-grow flex-col gap-3">
      <ErrorBoundary fallback={<>Something went wrong</>}>
        <NotesElems />
      </ErrorBoundary>
    </div>
  );
}
