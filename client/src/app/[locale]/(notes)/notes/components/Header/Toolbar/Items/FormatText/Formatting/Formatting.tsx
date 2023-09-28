import View from "@/app/components/Views/View";
import { useTranslations } from "next-intl";
import Headings from "./Headings/Headings";
import TopSection from "./TopSection";

export default function FormattingView() {
  const t = useTranslations("Toolbar.formatText");

  return (
    <View name="formatting" nameToShow={t("menuTitle")}>
      <TopSection />
      <Headings />
    </View>
  );
}
