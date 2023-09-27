import View from "@/app/components/Views/View";
import { ViewsContainerContext } from "@/app/components/Views/ViewsContainer";
import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import TopSection from "./TopSection/TopSection";

export default function FormattingView() {
  const { setActiveView } = useGetContext(ViewsContainerContext);
  const t = useTranslations("Toolbar.formatText");

  return (
    <View name="formatting" nameToShow={t("menuTitle")}>
      <TopSection />
    </View>
  );
}
