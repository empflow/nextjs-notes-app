import SmallBtn from "@/app/components/buttons/Small";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { useTranslations } from "next-intl";
import { ToolbarContext } from "../../Context";
import useGetToggleLinkAttrs from "./useGetToggleLinkAttrs";
import useSelectionIncludesLink from "../../../../../../../../hooks/useSelectionIncludesMark";

export default function AddLinkPopoverContent() {
  const toggleLinkAttrs = useGetToggleLinkAttrs();
  const t = useTranslations("Toolbar.link");
  const { link, setLink, setIsAddLinkMenuOpen, isAddLinkMenuOpen } =
    useGetContext(ToolbarContext);
  const { editor } = useGetContext(NotesContext);
  const selectionIncludesLink = useSelectionIncludesLink({
    isMenuOpen: isAddLinkMenuOpen,
    markName: "link",
  });

  function toggleLink() {
    linkAction(editor?.chain().focus().toggleLink(toggleLinkAttrs).run);
  }

  function clearLink() {
    linkAction(editor?.chain().focus().unsetLink().run);
  }

  function linkAction(cb?: () => unknown) {
    setIsAddLinkMenuOpen(false);
    setLink("");
    if (cb) cb();
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-1">
      <input
        className="blue-outline rounded border border-light-2xl-gray bg-light-5xl-gray px-1 py-[2px] dark:border-dark-2xl-gray dark:bg-dark-4xl-gray"
        type="text"
        onChange={(e) => setLink(e.target.value)}
        value={link}
        placeholder={t("inputPlaceholder")}
      />
      <SmallBtn disabled={!link} onClick={toggleLink}>
        {t(selectionIncludesLink ? "editBtnText" : "addBtnText")}
      </SmallBtn>
      {selectionIncludesLink && (
        <SmallBtn onClick={clearLink}>{t("remove")}</SmallBtn>
      )}
    </form>
  );
}
