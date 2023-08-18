import { TTag, TTranslations } from "@/utils/types";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";
import NotesContext from "@/contexts/NotesContext";
import BigBtn from "@/app/components/buttons/Big";
import Image from "next/image";
import { SVGProps } from "react";
import SidebarTop from "./Top";
import SidebarNotesList from "./NotesList/NotesList";
import useGetContext from "@/app/hooks/useGetContext/useGetContext";

export default function Sidebar() {
  const t = useTranslations("Notes");
  const context = useGetContext(NotesContext);

  return (
    <aside className="flex h-full w-[350px] flex-col gap-[25px] border-r border-light-3.5xl-gray p-5 dark:border-dark-4xl-gray">
      <SidebarTop />
      <SidebarNotesList />
    </aside>
  );
}
