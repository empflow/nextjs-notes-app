import { CSSProperties } from "react";
import { toast, ToastOptions } from "react-toastify";

type Theme = "dark" | "light";
type NotificationType = "info" | "error" | "warning" | "success";

export default function notify(content: string, type?: NotificationType) {
  const theme = getTheme();

  const className = "dark:bg-d-secondary bg-l-secondary";
  const style: CSSProperties = {
    color: theme === "dark" ? "whitesmoke" : "black",
  };
  const toastOptions: ToastOptions = {
    theme,
    className,
    style,
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
