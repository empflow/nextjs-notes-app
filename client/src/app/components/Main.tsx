import React from "react";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-grow px-global sm:px-global-sm py-8 w-full bg-l-main dark:bg-d-main">
      <div className="max-w-global m-auto">{children}</div>
    </main>
  );
}
