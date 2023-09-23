import useGetContext from "@/app/hooks/useGetContext";
import ProfileMenuContext from "@/contexts/ProfileMenu";
import isScreenWiderThanBreakpoint from "@/utils/isScreenWidthOverBreakpoint";
import { useEffect, useState } from "react";

export default function useGetDropdownTopPx() {
  const [isMobile, setIsMobile] = useState(false);
  const defaultDropdownTopPx = 40;
  const { dropdownTopPx } = useGetContext(ProfileMenuContext);

  useEffect(() => {
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);

    function updateIsMobile() {
      setIsMobile(!isScreenWiderThanBreakpoint("sm"));
    }
  }, []);

  if (isMobile) return 0;
  return dropdownTopPx ? dropdownTopPx : defaultDropdownTopPx;
}
