import { Formats, TranslationValues } from "next-intl";

export type TTranslations = (
  key: string,
  values?: TranslationValues,
  formats?: Partial<Formats>,
) => string;
