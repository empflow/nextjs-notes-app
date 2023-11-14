"use client";

import TinyBtn from "@/app/components/buttons/Tiny";
import EditIcon from "@/icons/svg/edit.svg";
import EditOffIcon from "@/icons/svg/editOff.svg";
import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import NotesContext from "@/app/[locale]/(notes)/notes/NotesContext";

export default function EditBtn() {
  const t = useTranslations("Notes");
  const context = useGetContext(NotesContext);
  const { isEditing, setIsEditing } = context;

  return (
    <div>
      <TinyBtn
        className="flex gap-1 duration-200"
        onClick={() => setIsEditing((prev) => !prev)}
      >
        {isEditing ? (
          <>
            <EditOffIcon width={20} fill="white" />
            {t("stopEditing")}
          </>
        ) : (
          <>
            <EditIcon width={20} fill="white" />
            {t("edit")}
          </>
        )}
      </TinyBtn>
    </div>
  );
}
