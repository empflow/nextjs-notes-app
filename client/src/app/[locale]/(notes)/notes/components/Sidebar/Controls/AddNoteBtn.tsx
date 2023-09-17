import BigBtn from "@/app/components/buttons/Big";
import useAddNewNoteMutation from "@/app/hooks/queries/useAddNoteMutation";
import AddIcon from "@/icons/svg/addCircle.svg";

export default function AddNoteBtn() {
  const { mutate: addNewNote, isLoading } = useAddNewNoteMutation();

  return (
    <BigBtn style={{ padding: "8px" }} onClick={() => addNewNote()}>
      <AddIcon fill="white" />
    </BigBtn>
  );
}
