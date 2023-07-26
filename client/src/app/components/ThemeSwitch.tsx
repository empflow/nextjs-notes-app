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
    <div className="flex rounded-full border border-gray-400 p-[2px] dark:border-gray-500">
      <div
        className={`${
          isLight ? "bg-gray-300 dark:bg-gray-700 " : ""
        }rounded-full flex h-[32px] w-[32px] cursor-pointer items-center justify-center`}
        onClick={() => setTheme("light")}
      >
        <SunIcon
          pxSize={24}
          className={`${
            isLight
              ? "fill-slate-700 dark:fill-slate-400 "
              : "fill-slate-500 dark:fill-slate-500 "
          }`}
        />
      </div>
      <div
        className={`${
          isSystem ? "bg-gray-300 dark:bg-gray-700 " : ""
        }rounded-full flex h-[32px] w-[32px] cursor-pointer items-center justify-center`}
        onClick={() => setTheme("system")}
      >
        <ComputerIcon
          pxSize={24}
          className={`${
            isSystem
              ? "fill-slate-700 dark:fill-slate-400 "
              : "fill-slate-500 dark:fill-slate-500 "
          }`}
        />
      </div>
      <div
        className={`${
          isDark ? "bg-gray-300 dark:bg-gray-700 " : ""
        }rounded-full flex h-[32px] w-[32px] cursor-pointer items-center justify-center`}
        onClick={() => setTheme("dark")}
      >
        <MoonIcon
          pxSize={24}
          className={`${
            isDark
              ? "fill-slate-700 dark:fill-slate-400 "
              : "fill-slate-500 dark:fill-slate-500 "
          }`}
        />
      </div>
    </div>
  );
}
