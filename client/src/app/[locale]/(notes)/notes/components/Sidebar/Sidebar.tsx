import SidebarNotesList from "./NotesList/NotesList";
import CurrTag from "./CurrTag";
import AddNoteBtn from "./AddNoteBtn";
import FilterBtn from "./FilterBtn";

export default function Sidebar() {
  return (
    <aside className="flex h-full w-[350px] flex-col gap-[25px] border-r border-light-3.5xl-gray p-5 dark:border-dark-4xl-gray">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <CurrTag />
          <AddNoteBtn />
        </div>
        <FilterBtn />
      </div>

      <SidebarNotesList />
    </aside>
  );
}
