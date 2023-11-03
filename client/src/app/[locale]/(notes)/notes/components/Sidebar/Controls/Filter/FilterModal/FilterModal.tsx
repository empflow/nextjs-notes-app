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
  const t = useTranslations("Tags");

  return (
    <FilterModalContext.Provider value={{ isEditing, setIsEditing }}>
      <AddTagModal />
      <Modal
        overlayStyle={{ zIndex: 30 }}
        isOpen={isFilterMenuOpen}
        setIsOpen={setIsFilterMenuOpen}
        className="w-full max-w-[600px]"
      >
        <p className="mb-4 text-xl font-semibold">{t("filterByTag")}</p>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <FilterModalEditTagsBtn />
            <FilterModalAddTagBtn />
          </div>
          <TagsList />
        </div>
      </Modal>
    </FilterModalContext.Provider>
  );
}
