import BigBtn from "@/app/components/buttons/Big";
import MediumBtn from "@/app/components/buttons/Medium";
import SmallBtn from "@/app/components/buttons/Small";
import TinyBtn from "@/app/components/buttons/Tiny";
import useGetContext from "@/app/hooks/useGetContext/useGetContext";
import EditIcon from "@/icons/svg/edit.svg";
import EditOffIcon from "@/icons/svg/editOff.svg";
import { TWidth } from "@/utils/types";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "../../../page";

export default function SidebarNotesList() {
  const context = useGetContext(NotesContext);
  return (
    <div className="flex flex-col gap-3">
      <div>
        <EditBtn />
      </div>
    </div>
  );
}

function EditBtn() {
  const t = useTranslations("Notes");
  const context = useGetContext(NotesContext);
  const { isEditing, setIsEditing } = context;

  return (
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
  );
}
