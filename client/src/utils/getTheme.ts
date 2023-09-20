interface ReturnT {
  isSystem: boolean;
  isLight: boolean;
  isDark: boolean;
}

/**
 *
 * @param theme should be `useTheme().theme`. `useTheme` comes from `next-themes`
 */
export default function getTheme(theme: string | undefined): ReturnT {
  const result: ReturnT = {
    isLight: false,
    isDark: false,
    isSystem: false,
  };

  if (theme !== "light" && theme !== "dark" && theme !== "system") {
    result.isSystem = true;
    return result;
  }

  result.isSystem = theme === "system";
  result.isLight = theme === "light";
  result.isDark = theme === "dark";

  return result;
}
