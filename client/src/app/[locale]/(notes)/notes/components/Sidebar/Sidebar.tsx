import NotesList from "./NotesList/NotesList";
import Controls from "./Controls/Controls";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import ResizeHandle from "./ResizeHandle";
import NotesListContainer from "./NotesList/NotesListContainer";

export default function Sidebar() {
  return (
    <ResizableBox
      width={400}
      axis="x"
      className="flex min-h-[100dvh]"
      maxConstraints={[500, 0]}
      minConstraints={[180, 0]}
      handle={<ResizeHandle />}
    >
      <aside className="flex w-full flex-col gap-3 p-5">
        <Controls />
        <NotesListContainer>
          <NotesList />
        </NotesListContainer>
      </aside>
    </ResizableBox>
  );
}
