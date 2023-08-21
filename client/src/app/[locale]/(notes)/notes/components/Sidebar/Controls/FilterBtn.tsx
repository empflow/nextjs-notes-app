import SmallBtn from "@/app/components/buttons/Small";
import FilterIcon from "@/icons/svg/filter.svg";
import useGetContext from "@/app/hooks/useGetContext/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { useTranslations } from "next-intl";

export default function FilterBtn() {
  const { notes, setIsFilterMenuOpen } = useGetContext(NotesContext);
  const t = useTranslations("Notes");

  if (notes?.length) {
    return (
      <div className="flex">
        <SmallBtn
          className="flex gap-1"
          onClick={() => setIsFilterMenuOpen((prev) => !prev)}
        >
          <FilterIcon fill="white" width={20} />
          {t("filter")}
        </SmallBtn>
      </div>
    );
  }

  return <></>;
}
