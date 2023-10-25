"use client";

import TooltipContainer from "@/app/components/TooltipContainer";
import FormatText from "./Items/FormatText/FormatText";
import ToolbarContextProviders from "./ContextProviders";
import AddLink from "./Items/AddLink/AddLink";
import AddMediaFile from "./Items/AddMediaFile/AddMediaFile";
import Undo from "./Items/Undo";
import Redo from "./Items/Redo";
import Table from "./Items/Table/Table";

export default function Toolbar() {
  return (
    <ToolbarContextProviders>
      <TooltipContainer className="flex lg:m-auto">
        <FormatText />
        <AddMediaFile />
        <AddLink />
        <Table />
        <Undo />
        <Redo />
      </TooltipContainer>
    </ToolbarContextProviders>
  );
}
