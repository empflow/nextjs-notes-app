import Modal from "@/app/components/Modal";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { useState } from "react";
import FilterModalContext from "./Context";
import TagsList from "./TagsList/TagsList";
import AddTagModal from "./AddTagModal/AddTagModal";
import { useTranslations } from "next-intl";
import FilterModalEditTagsBtn from "./EditTagsBtn";
import FilterModalAddTagBtn from "./AddTagBtn";

export default function FilterModal() {
  const { setIsFilterMenuOpen, isFilterMenuOpen } = useGetContext(NotesContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddTagPopupOpen, setIsAddTagPopupOpen] = useState(false);
  const t = useTranslations("Tags");

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
        className="m-auto w-full max-w-[600px]"
      >
        <div className="flex flex-col gap-4">
          <p className="text-xl font-semibold">{t("filterByTag")}</p>
          <div className="flex flex-col gap-1">
            <FilterModalEditTagsBtn />
            <FilterModalAddTagBtn />
            <TagsList />
          </div>
        </div>
      </Modal>
    </FilterModalContext.Provider>
  );
}
