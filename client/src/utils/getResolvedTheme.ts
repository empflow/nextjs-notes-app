import { TResolvedTheme } from "./types";

/**
 *
 * @param theme should be useTheme().resolvedTheme
 * @returns either light or dark because useTheme() is too weak to do that!!!
 */
export default function getResolvedTheme(
  theme: string | undefined,
): TResolvedTheme {
  const defaultTheme = "light";

  if (theme !== "light" && theme !== "dark") {
    return defaultTheme;
  }

  return theme;
}
