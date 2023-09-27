import View from "@/app/components/Views/View";
import { useTranslations } from "next-intl";

interface TProps {}

export default function CodeView({}: TProps) {
  const t = useTranslations("Toolbar.formatText");

  return (
    <View
      nameToShow={t("code.menuTitle")}
      backBtn={{ navTo: "formatting", text: t("menuTitle") }}
      name="code"
    >
      code view
    </View>
  );
}
