import ColorInput from "@/app/components/form/ColorInput/ColorInput";
import Input from "@/app/components/form/Input";
import InputWithRef from "@/app/components/form/InputWithRef";
import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import { TagContext } from "./Tag";

export default function TagInputs() {
  const {
    isEditingThisTag,
    nameInputRef,
    color,
    setColor,
    name,
    setName,
    _id,
    form: { register, watch: formWatch },
  } = useGetContext(TagContext);
  const form = formWatch();
  const formT = useTranslations("Tags.addTagForm");
  const { ref: nameInputRegisterRef, ...nameInputRegisterRest } = register(
    "name",
    { required: formT("noName") },
  );
  console.log(form.name, form.color);

  return (
    <div key={_id} className="flex items-center gap-2">
      {isEditingThisTag ? (
        <>
          <ColorInput
            className="disabled:cursor-default"
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
            className="disabled:border-none disabled:bg-transparent"
            disabled={!isEditingThisTag}
            type="text"
            style={{ padding: 4 }}
            value={form.name}
          />
        </>
      ) : (
        <>
          <ColorInput
            className="disabled:cursor-default"
            style={{ width: 30, height: 34 }}
            disabled={!isEditingThisTag}
            value={color}
          />
          <InputWithRef
            ref={nameInputRef}
            className="disabled:border-none disabled:bg-transparent"
            disabled={!isEditingThisTag}
            type="text"
            value={name}
            style={{ padding: 4 }}
          />
        </>
      )}
    </div>
  );
}
