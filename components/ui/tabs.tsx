"use client";

import { useState, createContext, useContext } from "react";

const TabsContext = createContext<{
  value: string;
  setValue: (v: string) => void;
}>({ value: "", setValue: () => {} });

export function Tabs({
  defaultValue,
  children,
}: {
  defaultValue: string;
  children: React.ReactNode;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className="my-6">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-0 flex gap-1 rounded-t-lg border border-b-0 border-border-subtle bg-surface p-1">
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const ctx = useContext(TabsContext);
  const active = ctx.value === value;
  return (
    <button
      onClick={() => ctx.setValue(value)}
      className={`rounded-md px-3 py-1.5 font-mono text-[12px] uppercase tracking-[1px] transition-colors ${
        active
          ? "bg-green/10 text-green"
          : "text-text-muted hover:text-text-secondary"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const ctx = useContext(TabsContext);
  if (ctx.value !== value) return null;
  return (
    <div className="rounded-b-lg border border-t-0 border-border-subtle p-1 [&>pre]:my-0 [&>pre]:rounded-t-none [&>pre]:border-0">
      {children}
    </div>
  );
}
