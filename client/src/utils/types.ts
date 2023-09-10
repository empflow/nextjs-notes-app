import { AxiosError, AxiosResponse } from "axios";
import { Formats, TranslationValues } from "next-intl";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import React from "react";

export type TTranslations = (
  key: string,
  values?: TranslationValues,
  formats?: Partial<Formats>,
) => string;

export interface TNote {
  title: string;
  content: string | null;
  isInTrash: boolean;
  tags: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export type TNoteMeta = Omit<TNote, "content">;

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

export type TResolvedTheme = "light" | "dark";

export type TAxiosErrWithResp<T = any> = Omit<AxiosError<T>, "response"> & {
  response: AxiosResponse<T>;
};

export type TContext<T> = T | null;

export type TCookie = RequestCookie | string;
