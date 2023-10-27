import Modal from "@/app/components/Modal";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { useState } from "react";
import useTagsQuery from "@/app/hooks/queries/useTagsQuery";
import FilterModalContext from "./Context";
import TagsList from "./TagsList/TagsList";
import { useForm } from "react-hook-form";
import AddTagModal from "./AddTagModal/AddTagModal";

export default function FilterModal() {
  const { setIsFilterMenuOpen, isFilterMenuOpen } = useGetContext(NotesContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddTagPopupOpen, setIsAddTagPopupOpen] = useState(false);

  return (
    <FilterModalContext.Provider
      value={{
        isEditing,
        setIsEditing,
        isAddTagPopupOpen,
        setIsAddTagPopupOpen,
      }}
    >
      <AddTagModal />
      <Modal
        overlayStyle={{ zIndex: 30 }}
        isOpen={isFilterMenuOpen}
        setIsOpen={setIsFilterMenuOpen}
      >
        <div className="flex flex-col gap-1">Filter by tag</div>
        <input placeholder="Search" />
        <button onClick={() => setIsEditing((prev) => !prev)}>Edit</button>
        <TagsList />
      </Modal>
    </FilterModalContext.Provider>
  );
}
