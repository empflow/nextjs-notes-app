"use client";

import ProfileMenuContext from "@/contexts/ProfileMenu";
import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";

interface TProps {
  children: ReactNode;
  signedInAs: string;
  dropdownTopPx?: number;
}

export default function ProfileMenuContextProviders({
  children,
  signedInAs,
  dropdownTopPx = 0,
}: TProps) {
  const t = useTranslations("Header");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ProfileMenuContext.Provider
      value={{
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
