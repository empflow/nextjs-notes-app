import { SetState, TContext } from "@/utils/types";
import { createContext, RefObject } from "react";

interface TProfileMenuContextValue {
  signedInAs: string;
  isDropdownOpen: boolean;
  setIsDropdownOpen: SetState<boolean>;
  dropdownTopPx: number;
}

export type TProfileMenuContext = TContext<TProfileMenuContextValue>;
export const ProfileMenuContext = createContext<TProfileMenuContext>(null);

export default ProfileMenuContext;
