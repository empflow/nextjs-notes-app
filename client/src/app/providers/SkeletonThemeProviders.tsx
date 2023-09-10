"use client";

import getSkeletonThemeColors from "@/utils/getSkeletonThemeColors";
import getResolvedTheme from "@/utils/getResolvedTheme";
import { useTheme } from "next-themes";
import { ReactNode } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import isSsr from "@/utils/isSsr";

interface TProps {
  children: ReactNode;
}

export default function SkeletonThemeProivers({ children }: TProps) {
  const { resolvedTheme, theme } = useTheme();
  const { baseColor, highlightColor } = getSkeletonThemeColors(
    getResolvedTheme(theme),
  );

  return <>{children}</>;
}
