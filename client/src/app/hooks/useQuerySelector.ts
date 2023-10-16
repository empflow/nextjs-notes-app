import { useEffect, useRef } from "react";

export default function useQuerySelector<T extends Element>(selector: string) {
  const elem = useRef<T | null>(null);

  useEffect(() => {
    elem.current = document.querySelector(selector);
  });

  return elem.current;
}
