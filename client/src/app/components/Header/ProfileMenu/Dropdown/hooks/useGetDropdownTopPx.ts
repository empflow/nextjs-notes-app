import useGetContext from "@/app/hooks/useGetContext";
import ProfileMenuContext from "@/contexts/ProfileMenuContext";
import useIsScreenWidthOverBreakpoint from "@/app/hooks/useIsScreenWidthOverBreakpoint";

export default function useGetDropdownTopPx() {
  const isMobile = !useIsScreenWidthOverBreakpoint("sm");
  const defaultDropdownTopPx = 40;
  const { dropdownTopPx } = useGetContext(ProfileMenuContext);

  if (isMobile) return 0;
  return dropdownTopPx ? dropdownTopPx : defaultDropdownTopPx;
}
