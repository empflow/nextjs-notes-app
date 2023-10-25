"use client";
import { Context, useContext } from "react";

export default function useGetContext<T>(context: Context<T>) {
  const contextValue = useContext(context);
  console.log(contextValue);
  if (!contextValue) throw new Error("context value not provided");
  return contextValue;
}
