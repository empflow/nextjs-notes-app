import NotesList from "./NotesList/NotesList";
import Controls from "./Controls/Controls";
import "react-resizable/css/styles.css";
import NotesListContainer from "./NotesList/NotesListContainer";
import SidebarResizableBoxProviders from "./ResizableBoxProviders";

export default function Sidebar() {
  return (
    <SidebarResizableBoxProviders>
      <aside className="flex w-full flex-col gap-3 overflow-auto">
        <Controls />
        <NotesListContainer>
          <NotesList />
        </NotesListContainer>
      </aside>
    </SidebarResizableBoxProviders>
  );
}
