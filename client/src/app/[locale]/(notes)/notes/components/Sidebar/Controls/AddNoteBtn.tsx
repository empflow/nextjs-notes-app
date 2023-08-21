import BigBtn from "@/app/components/buttons/Big";
import AddIcon from "@/icons/svg/addCircle.svg";

export default function AddNoteBtn() {
  return (
    <BigBtn style={{ padding: "8px" }}>
      <AddIcon fill="white" />
    </BigBtn>
  );
}
