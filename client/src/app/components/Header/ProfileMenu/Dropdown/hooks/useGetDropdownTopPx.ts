import useGetContext from "@/app/hooks/useGetContext";
import ProfileMenuContext from "@/contexts/ProfileMenu";
import isScreenWiderThanBreakpoint from "@/utils/isScreenWidthOverBreakpoint";

export default function useGetDropdownTopPx() {
  const defaultDropdownTopPx = 40;
  const { dropdownTopPx } = useGetContext(ProfileMenuContext);
  const isMobile = !isScreenWiderThanBreakpoint("sm");

  if (isMobile) return 0;
  return dropdownTopPx ? dropdownTopPx : defaultDropdownTopPx;
}
