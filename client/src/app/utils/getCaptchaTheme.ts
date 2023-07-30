export default function getCaptchaTheme(
  resolvedTheme: string | undefined
): "light" | "dark" {
  const defaultTheme = "light";

  if (resolvedTheme !== "light" && resolvedTheme !== "dark") {
    return defaultTheme;
  }

  return resolvedTheme;
}
