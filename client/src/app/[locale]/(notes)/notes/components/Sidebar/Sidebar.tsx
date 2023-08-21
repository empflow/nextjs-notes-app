import SidebarNotesList from "./NotesList/NotesList";
import Controls from "./Controls/Controls";

export default function Sidebar() {
  return (
    <aside className="flex h-full w-[350px] flex-col gap-[25px] border-r border-light-3.5xl-gray p-5 dark:border-dark-4xl-gray">
      <Controls />
      <SidebarNotesList />
    </aside>
  );
}
