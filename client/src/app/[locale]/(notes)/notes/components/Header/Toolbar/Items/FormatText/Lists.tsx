import View from "@/app/components/Views/View";
import { useTranslations } from "next-intl";

export default function ListsView() {
  const t = useTranslations("Toolbar.formatText.lists");

  return (
    <View headerClassName="px-3 py-2" name="lists" nameToShow={t("menuTitle")}>
      lists
    </View>
  );
}
