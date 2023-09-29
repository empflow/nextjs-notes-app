import View from "@/app/components/Views/View";
import { useTranslations } from "next-intl";
import Divider from "./Divider";
import TextTypes from "./TextTypes";
import TextFormatting from "./TextFormatting";

export default function FormattingView() {
  const t = useTranslations("Toolbar.formatText");

  return (
    <View
      headerClassName="px-3 py-2"
      name="formatting"
      nameToShow={t("menuTitle")}
    >
      <TextFormatting />
      <Divider />
      <TextTypes />
    </View>
  );
}
