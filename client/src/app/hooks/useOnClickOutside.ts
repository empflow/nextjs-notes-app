import { Ref, RefObject, useRef } from "react";
import useOnClick from "./useOnClick";

type TEvent = TouchEvent | MouseEvent;

export default function useOnClickOutside<T>(
  ref: RefObject<HTMLElement>,
  cb: () => unknown,
) {
  useOnClick((e: TEvent) => {
    const { target } = e;
    if (
      ref?.current &&
      target instanceof Node &&
      !ref.current.contains(target)
    ) {
      cb();
    }
  });
}
