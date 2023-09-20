"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import ComputerIcon from "@/icons/Computer";
import MoonIcon from "@/icons/Moon";
import SunIcon from "@/icons/Sun";
import getTheme from "@/utils/getTheme";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { isLight, isDark, isSystem } = getTheme(theme);
  const [isMounted, setIsMounted] = useState(false);
  const switchRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return <div style={{ height: "38px" }}></div>;
  }

  return (
    <div
      ref={switchRef}
      className="flex rounded-full border border-gray p-[2px] dark:border-dark-xl-gray"
    >
      <div
        className={`${
          isLight ? "bg-light-3.5xl-gray " : ""
        }rounded-full flex h-[32px] w-[32px] cursor-pointer items-center justify-center`}
        onClick={() => setTheme("light")}
        title="Light theme"
      >
        <SunIcon
          pxSize={24}
          className={`${
            isLight
              ? "fill-dark-3xl-gray"
              : "fill-dark-xl-gray dark:fill-dark-gray"
          }`}
        />
      </div>

      <div
        className={`${
          isSystem ? "bg-light-3.5xl-gray dark:bg-dark-3xl-gray " : ""
        }rounded-full flex h-[32px] w-[32px] cursor-pointer items-center justify-center`}
        onClick={() => setTheme("system")}
        title="System theme"
      >
        <ComputerIcon
          pxSize={24}
          className={`${
            isSystem
              ? "fill-dark-3xl-gray dark:fill-light-gray "
              : "fill-dark-xl-gray dark:fill-dark-gray "
          }`}
        />
      </div>

      <div
        className={`${
          isDark ? "dark:bg-dark-3xl-gray " : ""
        }rounded-full flex h-[32px] w-[32px] cursor-pointer items-center justify-center`}
        onClick={() => setTheme("dark")}
        title="Dark theme"
      >
        <MoonIcon
          pxSize={24}
          className={`${
            isDark
              ? "dark:fill-light-gray "
              : "fill-dark-xl-gray dark:fill-dark-gray "
          }`}
        />
      </div>
    </div>
  );
}
