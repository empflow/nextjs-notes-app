"use client";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { useEffect, useState } from "react";

interface TProps {
  isMenuOpen: boolean;
}

export default function useIsSelectionInsideTable({ isMenuOpen }: TProps) {
  const { editor } = useGetContext(NotesContext);
  const [selectionIncludesTable, setSelectionIncludesTable] = useState(
    getSelectionincludesTable(),
  );

  function updateSelectionIncludesTable() {
    setSelectionIncludesTable(getSelectionincludesTable());
  }

  useEffect(() => {
    editor?.on("selectionUpdate", updateSelectionIncludesTable);
    return () => {
      editor?.off("selectionUpdate", updateSelectionIncludesTable);
    };
  }, [updateSelectionIncludesTable]);

  useEffect(() => {
    setTimeout(updateSelectionIncludesTable, 200);
  }, [isMenuOpen]);

  function getSelectionincludesTable() {
    if (!editor) return false;
    return !!(
      editor?.state?.selection?.$from?.node(-1)?.type?.name === "tableCell"
    );
  }

  return selectionIncludesTable;
}
