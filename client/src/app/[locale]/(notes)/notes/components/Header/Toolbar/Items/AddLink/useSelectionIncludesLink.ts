"use client";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { useEffect, useState } from "react";
import { ToolbarContext } from "../../Context";

export default function useSelectionIncludesLink(): [boolean, () => void] {
  const { editor } = useGetContext(NotesContext);
  const { isAddLinkMenuOpen } = useGetContext(ToolbarContext);
  const [selectionIncludesLink, setSelectionIncludesLink] = useState(
    getSelectionIncludesLink(),
  );

  const updateSelectionIncludesLink = () => {
    console.log("run");
    setSelectionIncludesLink(getSelectionIncludesLink());
  };

  useEffect(() => {
    editor?.on("selectionUpdate", updateSelectionIncludesLink);
    return () => {
      editor?.off("selectionUpdate", updateSelectionIncludesLink);
    };
  }, [updateSelectionIncludesLink]);

  useEffect(() => {
    setTimeout(updateSelectionIncludesLink, 200);
  }, [isAddLinkMenuOpen]);

  function getSelectionIncludesLink() {
    const selection = editor?.state?.selection;
    if (!selection) return false;

    const { $from, $to } = selection;
    let selectionIncludesLink = false;

    editor.state.doc.nodesBetween($from.pos, $to.pos, (node) => {
      const hasLinkMark = node.marks.some((mark) => mark.type.name === "link");
      if (hasLinkMark) selectionIncludesLink = true;
    });

    return selectionIncludesLink;
  }

  return [selectionIncludesLink, updateSelectionIncludesLink];
}
