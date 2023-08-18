import { AxiosError, AxiosResponse } from "axios";
import { Formats, TranslationValues } from "next-intl";
import React from "react";

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

export type TWidth = "auto" | number;
export type THeight = TWidth;

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type AxiosErrWithResp<T = any> = Omit<AxiosError<T>, "response"> & {
  response: AxiosResponse<T>;
};
