import { ErrorBoundary } from "react-error-boundary";
import NotesElems from "./NotesElems";

export default function NotesList() {
  return (
    <div className="flex flex-grow flex-col">
      <ErrorBoundary fallback={<>Something went wrong</>}>
        <NotesElems />
      </ErrorBoundary>
    </div>
  );
}
