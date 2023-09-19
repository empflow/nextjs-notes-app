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
      className="flex h-[100dvh]"
      maxConstraints={[500, 0]}
      minConstraints={[180, 0]}
      handle={<ResizeHandle />}
    >
      <aside className="flex w-full flex-col gap-3 overflow-auto">
        <Controls />
        <NotesListContainer>
          <NotesList />
        </NotesListContainer>
      </aside>
    </ResizableBox>
  );
}
