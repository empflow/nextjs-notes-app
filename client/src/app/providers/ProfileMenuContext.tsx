"use client";

import ProfileMenuContext from "@/contexts/ProfileMenuContext";
import { TGetAuthDataReturnT } from "@/utils/getAuthData/getAuthDataGetReturnVal";
import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";

interface TProps {
  children: ReactNode;
  authData: TGetAuthDataReturnT;
  dropdownTopPx?: number;
}

export default function ProfileMenuContextProviders({
  children,
  dropdownTopPx = 0,
  authData,
}: TProps) {
  const t = useTranslations("Header");
  let signedInAs: string | null = null;
  if (authData) signedInAs = authData.username;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ProfileMenuContext.Provider
      value={{
        authData,
        isDropdownOpen: isOpen,
        setIsDropdownOpen: setIsOpen,
        signedInAs: signedInAs || t("signedInAsUnknown"),
        dropdownTopPx,
      }}
    >
      {children}
    </ProfileMenuContext.Provider>
  );
}
