import MediumBtn from "@/app/components/buttons/Medium";
import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import FilterModalContext from "../Context";

export default function NoTags() {
  const t = useTranslations("Tags");
  const { setIsAddTagPopupOpen } = useGetContext(FilterModalContext);

  return (
    <div className="flex flex-col">
      <p>{t("noTags")}</p>
      <MediumBtn onClick={() => setIsAddTagPopupOpen((prev) => !prev)}>
        {t("addTag")}
      </MediumBtn>
    </div>
  );
}
