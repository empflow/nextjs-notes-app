import { twBreakpoints } from "@shared/values";

export default function isScreenWiderThanBreakpoint(
  breakpoint: keyof typeof twBreakpoints,
) {
  return window.innerWidth > twBreakpoints[breakpoint];
}
