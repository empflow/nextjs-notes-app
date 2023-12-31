"use client";

import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/app/[locale]/(notes)/notes/NotesContext";
import { TTranslations } from "@/utils/types";
import { TTagSchema } from "@shared/schemas/tag";
import { useTranslations } from "next-intl";

export default function CurrTag() {
  const { selectedTagId, tags } = useGetContext(NotesContext);
  const t = useTranslations("Notes");

  const tagName = getTagName(tags, selectedTagId, t);
  return (
    <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-[1.75rem] font-semibold text-l-main dark:text-d-main">
      {tagName}
    </h1>
  );
}

function getTagName(
  tags: TTagSchema[] | null,
  selectedTagId: string | null,
  t: TTranslations,
) {
  const allNotesMsg = t("allNotes");

  if (!tags) return allNotesMsg;

  if (selectedTagId) {
    const result = tags.find((tag) => tag._id === selectedTagId);
    return result?.name ?? allNotesMsg;
  }
  return allNotesMsg;
}
