import Modal from "@/app/components/Modal";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/app/[locale]/(notes)/notes/NotesContext";
import AssignTagsModalTagList from "./TagList";

export default function AssignTagModal() {
  const { isAssignTagModalOpen, setIsAssignTagModalOpen } =
    useGetContext(NotesContext);

  return (
    <Modal isOpen={isAssignTagModalOpen} setIsOpen={setIsAssignTagModalOpen}>
      <AssignTagsModalTagList />
    </Modal>
  );
}
