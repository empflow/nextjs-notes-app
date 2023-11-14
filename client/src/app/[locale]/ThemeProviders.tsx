"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

export default function ThemeProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
}
