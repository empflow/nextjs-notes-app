"use client";

import { TGetAuthDataReturnT } from "@/utils/getAuthData/getAuthDataGetReturnVal";
import { ReactNode } from "react";
import MainContentContext from "./Context";

interface TProps {
  children: ReactNode;
  authData: TGetAuthDataReturnT;
}

export default function MainContentContextProviders({
  children,
  authData,
}: TProps) {
  return (
    <MainContentContext.Provider value={{ authData }}>
      {children}
    </MainContentContext.Provider>
  );
}
