import { twBreakpoints } from "@shared/values";
import { useEffect, useState } from "react";

export default function useIsScreenWidthOverBreakpoint(
  breakpoint: keyof typeof twBreakpoints,
) {
  const [isWidthOverBreakpoint, setIsWidthOverBreakpoint] = useState(false);

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);

    function onResize() {
      setIsWidthOverBreakpoint(window.innerWidth > twBreakpoints[breakpoint]);
    }
  }, []);

  return isWidthOverBreakpoint;
}
