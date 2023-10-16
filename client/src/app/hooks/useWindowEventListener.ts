import { useEffect } from "react";

export default function useWindowEventListener<T extends keyof WindowEventMap>(
  event: T,
  cb: (event: WindowEventMap[T]) => unknown,
) {
  useEffect(() => {
    window.addEventListener(event, cb);

    return () => {
      window.removeEventListener(event, cb);
    };
  }, []);
}
