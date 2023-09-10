interface ReturnT {
  baseColor?: string;
  highlightColor?: string;
}

export default function getSkeletonThemeColors(
  theme: "light" | "dark",
): ReturnT {
  let baseColor: string | undefined;
  let highlightColor: string | undefined;

  if (theme === "dark") {
    baseColor = "#313131";
    highlightColor = "#525252";
  }

  return { baseColor, highlightColor };
}
