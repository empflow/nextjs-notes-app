"use client";
import useGetContext from "@/app/hooks/useGetContext";
import useIsScreenWidthOverBreakpoint from "@/app/hooks/useIsScreenWidthOverBreakpoint";
import NotesContext from "@/contexts/NotesContext";
import { CSSProperties } from "react";
import Editor from "../Editor/Editor";
import Header from "../Header/Header";

export default function MainContent() {
  const isMobile = !useIsScreenWidthOverBreakpoint("md");
  const { hideEditorOnMobile, selectedNoteId } = useGetContext(NotesContext);

  const style: CSSProperties = { translate: "0 0" };
  if (isMobile) {
    if (!hideEditorOnMobile && selectedNoteId) style.translate = "-100% 0";
  }

  return (
    <div
      style={style}
      className="absolute bottom-0 top-0 flex w-full translate-x-full flex-col duration-200 md:relative md:translate-x-0"
    >
      <Header />
      <Editor />
      <div id="main-content-popover-overlays"></div>
    </div>
  );
}
