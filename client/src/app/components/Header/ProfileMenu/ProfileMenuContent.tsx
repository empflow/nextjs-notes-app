"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import ProfileMenuHeaderIcon from "./ProfileMenuHeaderIcon";
import ProfileMenuDropdown from "./ProfileMenuDropdown";
import { SetState } from "@/utils/types";

interface IMenuProps {
  signedInAs: string;
}

export interface IProfileMenuContextValue {
  signedInAs: string;
  isDropdownOpen: boolean;
  setIsDropdownOpen: SetState<boolean>;
}
export type TProfileMenuContext = null | IProfileMenuContextValue;
export const ProfileMenuContext = createContext<TProfileMenuContext>(null);

export default function ProfileMenuContent({ signedInAs }: IMenuProps) {
  const headerIconRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    document.addEventListener("click", onClickOutsideDropdown);
    return () => document.removeEventListener("click", onClickOutsideDropdown);
  }, []);

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
        signedInAs,
      }}
    >
      <div className="sm:relative">
        <ProfileMenuHeaderIcon ref={headerIconRef} />
        <ProfileMenuDropdown ref={dropdownRef} />
      </div>
    </ProfileMenuContext.Provider>
  );
}
