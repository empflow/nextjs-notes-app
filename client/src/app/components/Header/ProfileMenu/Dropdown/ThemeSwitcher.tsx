import getTheme from "@/utils/getTheme";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export default function ProfileMenuDropdownThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const { theme: resolvedTheme } = getTheme(theme);
  const themeT = useTranslations("Themes");

  return (
    <select
      value={resolvedTheme}
      onChange={(e) => setTheme(e.target.value)}
      className="rounded border  border-light-2xl-gray bg-l-secondary outline-none dark:border-dark-2xl-gray dark:bg-d-secondary"
    >
      <option value="light">{themeT("light")}</option>
      <option value="dark">{themeT("dark")}</option>
      <option value="system">{themeT("system")}</option>
    </select>
  );
}
