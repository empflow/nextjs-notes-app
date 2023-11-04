"use client";
import NotesList from "./NotesList/NotesList";
import Controls from "./Controls/Controls";
import "react-resizable/css/styles.css";

export default function Sidebar() {
  return (
    <aside className="flex w-full flex-col gap-3 overflow-auto border-light-3.5xl-gray bg-light-5xl-gray dark:border-dark-4xl-gray dark:bg-d-secondary md:max-w-[400px] md:border-r">
      <Controls />
      <NotesList />
    </aside>
  );
}
