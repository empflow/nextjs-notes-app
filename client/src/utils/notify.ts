import React, { CSSProperties } from "react";
import { toast, ToastOptions } from "react-toastify";

type Theme = "dark" | "light";
type NotificationType = "info" | "error" | "warning" | "success";

export default function notify(
  content: React.ReactNode | string,
  type?: NotificationType,
  opts: ToastOptions = {},
) {
  const theme = getTheme();
  const toastOptions: ToastOptions = {
    theme,
    className: "dark:bg-d-secondary bg-l-secondary",
    style: { color: theme === "dark" ? "whitesmoke" : "black" },
    ...opts,
  };

  if (!type) return toast(content, toastOptions);
  toast[type](content, toastOptions);
}

function getTheme(): Theme {
  const defaultTheme: Theme = "light";

  const htmlElem = document.querySelector("html");
  if (!htmlElem) return defaultTheme;

  const theme: string | Theme = htmlElem.classList[0];
  if (theme !== "dark" && theme !== "light") {
    return defaultTheme;
  }

  return theme;
}
