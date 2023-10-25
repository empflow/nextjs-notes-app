import ColoredIcon from "@/app/components/ColoredIcon";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import BackArrowIcon from "@/icons/svg/backArrow.svg";
import { useTranslations } from "next-intl";

interface TProps {}

export default function BackArrow({}: TProps) {
  const t = useTranslations("Toolbar");
  const { setSelectedNoteId, setHideEditorOnMobile } =
    useGetContext(NotesContext);

  function onClick() {
    setHideEditorOnMobile(true);
    setTimeout(() => setSelectedNoteId(null), 200);
  }

  return (
    <button className="block p-1 md:hidden" title={t("back")} onClick={onClick}>
      <ColoredIcon icon={<BackArrowIcon />} />
    </button>
  );
}
