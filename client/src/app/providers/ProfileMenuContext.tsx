"use client";

import ProfileMenuContext from "@/contexts/ProfileMenu";
import { useTranslations } from "next-intl";
import { ReactNode, useRef, useState } from "react";
import useOnClick from "../hooks/useOnClick";

interface TProps {
  children: ReactNode;
  signedInAs: string;
}

export default function ProfileMenuContextProviders({
  children,
  signedInAs,
}: TProps) {
  const t = useTranslations("Header");
  const [isOpen, setIsOpen] = useState(false);
  const headerIconRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClick(onClickOutsideDropdown);

  function onClickOutsideDropdown(e: globalThis.MouseEvent) {
    const { current: dropdownElem } = dropdownRef;
    const { current: headerIconElem } = headerIconRef;
    if (!(e.target instanceof Node)) return;

    const isClickInsideHeaderIcon = headerIconElem?.contains(e.target);
    if (isClickInsideHeaderIcon) return;

    const isClickInsideDropdown = dropdownElem?.contains(e.target);
    if (isClickInsideDropdown) return;
    setIsOpen(false);
  }

  return (
    <ProfileMenuContext.Provider
      value={{
        isDropdownOpen: isOpen,
        setIsDropdownOpen: setIsOpen,
        signedInAs: signedInAs || t("signedInAsUnknown"),
        dropdownRef,
        headerIconRef,
      }}
    >
      {children}
    </ProfileMenuContext.Provider>
  );
}
