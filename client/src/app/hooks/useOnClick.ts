import { useEffect } from "react";

type TCallback = (e: globalThis.MouseEvent) => any;

export default function useOnClick(cb: TCallback) {
  useEffect(() => {
    window.addEventListener("click", cb);
    return () => window.removeEventListener("click", cb);
  }, []);
}
