export function SectionHeader({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="mb-4 flex items-baseline gap-4">
      <span className="font-mono text-xs tracking-[2px] text-green">
        {number}
      </span>
      <span className="font-mono text-xs uppercase tracking-[3px] text-text-muted">
        {label}
      </span>
    </div>
  );
}
