"use client";

import { TGetAuthDataReturnT } from "@/utils/getAuthData/getAuthDataGetReturnVal";
import { SetState, TContext } from "@/utils/types";
import { createContext } from "react";

interface TProfileMenuContextValue {
  signedInAs: string;
  isDropdownOpen: boolean;
  setIsDropdownOpen: SetState<boolean>;
  dropdownTopPx: number;
  authData: TGetAuthDataReturnT;
}

export type TProfileMenuContext = TContext<TProfileMenuContextValue>;
export const ProfileMenuContext = createContext<TProfileMenuContext>(null);

export default ProfileMenuContext;
