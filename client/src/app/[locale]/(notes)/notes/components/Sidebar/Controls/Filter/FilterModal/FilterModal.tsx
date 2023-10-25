import Modal from "@/app/components/Modal";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";

export default function FilterModal() {
  const { setIsFilterMenuOpen, isFilterMenuOpen } = useGetContext(NotesContext);

  return (
    <Modal isOpen={isFilterMenuOpen} setIsOpen={setIsFilterMenuOpen}>
      <div className="flex flex-col gap-1">Filter by tag</div>
    </Modal>
  );
}
