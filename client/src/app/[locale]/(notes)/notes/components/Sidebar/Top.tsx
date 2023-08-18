import BigBtn from "@/app/components/buttons/Big";
import FilterIcon from "@/icons/svg/filter.svg";
import AddIcon from "@/icons/svg/addCircle.svg";
import { useContext } from "react";
import NotesContext from "@/contexts/NotesContext";
import { useTranslations } from "next-intl";
import { TTag, TTranslations } from "@/utils/types";
import SmallBtn from "@/app/components/buttons/Small";
import useGetContext from "@/app/hooks/useGetContext/useGetContext";

export default function SidebarTop() {
  const t = useTranslations("Notes");
  const context = useGetContext(NotesContext);
  const { selectedTagId, tags, isFilterMenuOpen, setIsFilterMenuOpen } =
    context;

  const tagName = getTagName(tags, selectedTagId, t);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-[1.75rem] font-semibold text-l-main dark:text-d-main">
          {tagName}
        </h1>
        <BigBtn style={{ padding: "8px" }}>
          <AddIcon fill="white" />
        </BigBtn>
      </div>
      <div className="flex justify-between">
        <SmallBtn
          className="flex gap-1"
          onClick={() => setIsFilterMenuOpen((prev) => !prev)}
        >
          <FilterIcon fill="white" width={20} />
          {t("filter")}
        </SmallBtn>
      </div>
    </div>
  );
}

function getTagName(
  tags: TTag[] | null,
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
