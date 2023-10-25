"use client";

import SmallBtn from "@/app/components/buttons/Small";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import FilterIcon from "@/icons/svg/filter.svg";
import { useTranslations } from "next-intl";
import FilterModal from "./FilterModal/FilterModal";

export default function FilterBtn() {
  const { setIsFilterMenuOpen } = useGetContext(NotesContext);
  const t = useTranslations("Notes");

  return (
    <div>
      <SmallBtn
        className="flex gap-1"
        onClick={() => setIsFilterMenuOpen((prev) => !prev)}
      >
        <FilterIcon fill="white" width={20} />
        {t("filter")}
      </SmallBtn>
      <FilterModal />
    </div>
  );
}
