import { useEffect } from "react";

type TCallback = (e: globalThis.MouseEvent) => any;

export default function useOnClick(cb: TCallback) {
  useEffect(() => {
    document.addEventListener("click", cb);
    return () => document.removeEventListener("click", cb);
  });
}
