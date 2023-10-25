"use client";
import { Context, useContext } from "react";

export default function useGetContext<T>(context: Context<T>) {
  const contextValue = useContext(context);
  if (!contextValue) throw new Error("context value not provided");
  return contextValue;
}
