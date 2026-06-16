import type { ReactNode } from "react";

export function Wide({ children }: { children: ReactNode }) {
  return (
    <div className="relative left-1/2 right-1/2 my-8 -mx-[50vw] w-screen max-w-[100vw] px-5">
      <div className="mx-auto max-w-[1080px]">{children}</div>
    </div>
  );
}

export function FullBleed({
  children,
  padded = false,
}: {
  children: ReactNode;
  padded?: boolean;
}) {
  return (
    <div
      className={`relative left-1/2 right-1/2 my-8 -mx-[50vw] w-screen max-w-[100vw]${
        padded ? " px-5" : ""
      }`}
    >
      {children}
    </div>
  );
}
