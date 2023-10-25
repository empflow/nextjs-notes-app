"use client";

import useIsScreenWidthOverBreakpoint from "@/app/hooks/useIsScreenWidthOverBreakpoint";
import { SetState } from "@/utils/types";
import { ReactNode } from "react";
import { ResizableBox } from "react-resizable";
import ResizeHandle from "./ResizeHandle";

interface TProps {
  children: ReactNode;
  width?: number;
  setSidebarWidth: SetState<number | undefined>;
}

export default function SidebarResizableBoxProviders({
  children,
  width = 400,
  setSidebarWidth,
}: TProps) {
  const fullWidth = !useIsScreenWidthOverBreakpoint("md");

  if (fullWidth) return <>{children}</>;
  return (
    <ResizableBox
      onResize={(_, { size }) => setSidebarWidth(size.width)}
      width={width}
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
