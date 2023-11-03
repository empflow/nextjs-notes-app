"use client";
import BigBtn from "@/app/components/buttons/Big";
import Loading from "@/app/components/Loading";
import useAddNewNoteMutation from "@/app/hooks/reactQuery/useAddNoteMutation";
import AddIcon from "@/icons/svg/addCircle.svg";
import { ReactNode } from "react";

export default function AddNoteBtn() {
  const { mutate: addNewNote, isLoading } = useAddNewNoteMutation();
  let content: ReactNode;

  if (isLoading)
    content = (
      <Loading foregroundColor="white" backgroundColor="#245e98" pxSize={24} />
    );
  else content = <AddIcon fill="white" />;

  return (
    <BigBtn style={{ padding: "8px" }} onClick={() => addNewNote()}>
      {content}
    </BigBtn>
  );
}
