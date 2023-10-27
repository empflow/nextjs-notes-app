import ColorInput from "@/app/components/form/ColorInput/ColorInput";
import Input from "@/app/components/form/Input";
import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import { TagContext } from "./Tag";

export default function TagInputs() {
  const {
    isEditingThisTag,
    nameInputRef,
    initColor,
    initName,
    _id,
    form: { register },
  } = useGetContext(TagContext);
  const formT = useTranslations("Tags.addTagForm");
  const { ref: nameInputRegisterRef, ...nameInputRegisterRest } = register(
    "name",
    { required: formT("noName") },
  );

  return (
    <div key={_id} className="flex items-center gap-2">
      {isEditingThisTag ? (
        <>
          <ColorInput
            className="disabled:cursor-default"
            style={{ width: 30, height: 34 }}
            register={register("color", { required: formT("noColor") })}
            disabled={!isEditingThisTag}
          />
          <Input
            {...nameInputRegisterRest}
            ref={(e) => {
              nameInputRegisterRef(e);
              nameInputRef.current = e;
            }}
            className="disabled:border-none disabled:bg-transparent"
            disabled={!isEditingThisTag}
            type="text"
            style={{ padding: 4 }}
          />
        </>
      ) : (
        <>
          <ColorInput
            className="disabled:cursor-default"
            style={{ width: 30, height: 34 }}
            disabled={!isEditingThisTag}
            value={initColor}
          />
          <Input
            ref={nameInputRef}
            className="disabled:border-none disabled:bg-transparent"
            disabled={!isEditingThisTag}
            type="text"
            value={initName}
            style={{ padding: 4 }}
          />
        </>
      )}
    </div>
  );
}
