import Modal from "@/app/components/Modal";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import AssignTagsModalTagList from "./TagsList";

export default function AssignTagModal() {
  const { isAssignTagModalOpen, setIsAssignTagModalOpen } =
    useGetContext(NotesContext);

  return (
    <Modal isOpen={isAssignTagModalOpen} setIsOpen={setIsAssignTagModalOpen}>
      <AssignTagsModalTagList />
    </Modal>
  );
}
