import NotesList from "./NotesList/NotesList";
import Controls from "./Controls/Controls";

export default function Sidebar() {
  return (
    <aside className="flex min-h-[100dvh] w-[350px] flex-col gap-2 border-r border-light-3.5xl-gray p-5 dark:border-dark-4xl-gray">
      <Controls />
      <NotesList />
    </aside>
  );
}
