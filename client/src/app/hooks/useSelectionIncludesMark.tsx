"use client";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { useEffect, useState } from "react";

interface TProps {
  isMenuOpen: boolean;
  markName: string;
}

export default function useSelectionIncludesMark({
  isMenuOpen,
  markName,
}: TProps) {
  const { editor } = useGetContext(NotesContext);
  const [selectionIncludesMark, setSelectionIncludesMark] = useState(
    getSelectionincludesMark(),
  );

  function updateSelectionIncludesMark() {
    setSelectionIncludesMark(getSelectionincludesMark());
  }

  useEffect(() => {
    editor?.on("selectionUpdate", updateSelectionIncludesMark);
    return () => {
      editor?.off("selectionUpdate", updateSelectionIncludesMark);
    };
  }, [updateSelectionIncludesMark]);

  useEffect(() => {
    setTimeout(updateSelectionIncludesMark, 200);
  }, [isMenuOpen]);

  function getSelectionincludesMark() {
    const selection = editor?.state?.selection;
    if (!selection) return false;

    const { $from, $to } = selection;
    let selectionIncludesMark = false;

    console.log(editor.getJSON());
    editor.state.doc.nodesBetween($from.pos, $to.pos, (node) => {
      const hasTargetMark = node.marks.some((mark) => {
        console.log(mark);
        return mark.type.name === markName;
      });
      if (hasTargetMark) selectionIncludesMark = true;
    });

    return selectionIncludesMark;
  }

  return selectionIncludesMark;
}
