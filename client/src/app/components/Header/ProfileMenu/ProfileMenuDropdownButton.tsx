import SignOutIcon from "@/icons/SignOut";
import { MouseEvent } from "react";
import { useTranslations } from "next-intl";

interface Props {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  translationName: string;
}

export default function ProfileMenuDropdownButton({
  onClick,
  translationName,
}: Props) {
  const btnsT = useTranslations("Header.Buttons");

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 p-2 hover:bg-light-5xl-gray dark:hover:bg-dark-4xl-gray"
    >
      <SignOutIcon pxSize={22} className="fill-l-accent dark:fill-d-accent" />
      <div>{btnsT(translationName)}</div>
    </button>
  );
}
