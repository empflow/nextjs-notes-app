"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ComputerIcon from "../icons/Computer";
import MoonIcon from "../icons/Moon";
import SunIcon from "../icons/Sun";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isSystem = theme === "system";
  const isLight = theme === "light";
  const isDark = theme === "dark";

  return (
    <div className="flex rounded-full border border-gray p-[2px] dark:border-dark-xl-gray">
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
