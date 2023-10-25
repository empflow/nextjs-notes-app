"use client";

import { createContext } from "react";
import { TGetAuthDataReturnT } from "@/utils/getAuthData/getAuthDataGetReturnVal";
import { TContext } from "@/utils/types";

interface TMainContentContextValue {
  authData: TGetAuthDataReturnT;
}

type TMainContentContext = TContext<TMainContentContextValue>;
const MainContentContext = createContext<TMainContentContext>(null);

export default MainContentContext;
