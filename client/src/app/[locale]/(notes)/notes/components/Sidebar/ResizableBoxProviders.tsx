"use client";

import useIsScreenWidthOverBreakpoint from "@/app/hooks/useIsScreenWidthOverBreakpoint";
import { ReactNode } from "react";
import { ResizableBox } from "react-resizable";
import ResizeHandle from "./ResizeHandle";

interface TProps {
  children: ReactNode;
}

export default function SidebarResizableBoxProviders({ children }: TProps) {
  const fullWidth = !useIsScreenWidthOverBreakpoint("md");

  if (fullWidth) return <>{children}</>;
  return (
    <ResizableBox
      width={400}
      axis="x"
      className="flex h-[100dvh]"
      maxConstraints={[500, 0]}
      minConstraints={[180, 0]}
      handle={<ResizeHandle />}
    >
      {children}
    </ResizableBox>
  );
}
