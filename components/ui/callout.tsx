interface CalloutProps {
  type?: "info" | "tip" | "warning";
  children: React.ReactNode;
}

const styles: Record<string, string> = {
  info: "border-blue-500/40 bg-blue-500/[0.06]",
  tip: "border-green/40 bg-green/[0.06]",
  warning: "border-yellow-500/40 bg-yellow-500/[0.06]",
};

const icons: Record<string, string> = {
  info: "💡",
  tip: "✅",
  warning: "⚠️",
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <div
      className={`my-6 rounded-xl border-l-2 p-5 ${styles[type] ?? styles.info}`}
    >
      <div className="flex gap-3">
        <span className="mt-0.5 text-lg">{icons[type]}</span>
        <div className="[&>p]:mb-0 [&>p]:text-[17px]">{children}</div>
      </div>
    </div>
  );
}
