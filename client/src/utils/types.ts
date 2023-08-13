import { Formats, TranslationValues } from "next-intl";

export type TTranslations = (
  key: string,
  values?: TranslationValues,
  formats?: Partial<Formats>,
) => string;

export interface TNote {
  title: string;
  content: string;
  isInTrash: boolean;
  tags: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface TTag {
  name: string;
  color: string;
  owner: string;
  _id: string;
}
