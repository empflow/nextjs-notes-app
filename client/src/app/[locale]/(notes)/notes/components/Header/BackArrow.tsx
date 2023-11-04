import ColoredIcon from "@/app/components/ColoredIcon";
import useNote from "@/app/hooks/useNote";
import BackArrowIcon from "@/icons/svg/backArrow.svg";
import { useTranslations } from "next-intl";

interface TProps {}

export default function BackArrow({}: TProps) {
  const t = useTranslations("Toolbar");
  const { deselectSelectedNote } = useNote();

  return (
    <button
      className="block p-1 md:hidden"
      title={t("back")}
      onClick={deselectSelectedNote}
    >
      <ColoredIcon icon={<BackArrowIcon />} />
    </button>
  );
}
