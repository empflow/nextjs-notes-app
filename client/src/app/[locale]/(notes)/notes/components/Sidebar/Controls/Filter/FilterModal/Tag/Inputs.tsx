import ColorInput from "@/app/components/form/ColorInput/ColorInput";
import InputWithRef from "@/app/components/form/InputWithRef";
import useFilterNotes from "@/app/hooks/useFilterNotes";
import useGetContext from "@/app/hooks/useGetContext";
import cn from "@/utils/cn";
import { useTranslations } from "next-intl";
import FilterModalContext from "../Context";
import { TagContext } from "./Tag";

export default function TagInputs() {
  const { isEditing } = useGetContext(FilterModalContext);
  const {
    isEditingThisTag,
    nameInputRef,
    color,
    name,
    _id,
    form: { register, watch: formWatch },
  } = useGetContext(TagContext);
  const form = formWatch();
  const formT = useTranslations("Tags.addTagForm");
  const { ref: nameInputRegisterRef, ...nameInputRegisterRest } = register(
    "name",
    { required: formT("noName") },
  );
  const filterNotes = useFilterNotes();

  function handleClick() {
    if (!isEditing) filterNotes(_id);
  }

  return (
    <div key={_id} className="flex items-center gap-2">
      {isEditingThisTag ? (
        <>
          <ColorInput
            className={cn("disabled:cursor-default")}
            style={{ width: 30, height: 34 }}
            register={register("color", { required: formT("noColor") })}
            disabled={!isEditingThisTag}
            value={form.color}
          />
          <InputWithRef
            {...nameInputRegisterRest}
            ref={(e) => {
              nameInputRegisterRef(e);
              nameInputRef.current = e;
            }}
            className="border-none bg-transparent"
            disabled={!isEditingThisTag}
            type="text"
            style={{ padding: 4 }}
            value={form.name}
          />
        </>
      ) : (
        <div className={cn("relative flex justify-center")}>
          <div
            className={cn("absolute bottom-0 left-0 right-0 top-0")}
            onClick={handleClick}
          />
          <ColorInput
            style={{ width: 30, height: 34 }}
            disabled={true}
            value={color}
          />
          <InputWithRef
            ref={nameInputRef}
            className="cursor-pointer border-none bg-transparent"
            disabled={true}
            type="text"
            value={name}
            style={{ padding: 4 }}
          />
        </div>
      )}
    </div>
  );
}
