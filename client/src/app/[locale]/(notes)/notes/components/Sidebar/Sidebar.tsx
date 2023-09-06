import NotesList from "./NotesList/NotesList";
import Controls from "./Controls/Controls";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import ResizeHandle from "./ResizeHandle";

export default function Sidebar() {
  return (
    <ResizableBox
      width={300}
      axis="x"
      className="flex min-h-[100dvh]"
      maxConstraints={[700, 0]}
      minConstraints={[180, 0]}
      handle={<ResizeHandle />}
    >
      <aside className="flex w-full flex-col gap-2 p-5">
        <Controls />
        <NotesList />
      </aside>
    </ResizableBox>
  );
}
