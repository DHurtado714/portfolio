export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-3 border-t border-border-subtle px-6 py-8 text-center md:flex-row md:px-12">
      <div className="font-mono text-[11px] tracking-[1px] text-text-muted">
        <span className="text-green">{"{D}"}</span> &copy;{" "}
        {new Date().getFullYear()} Daniel
      </div>
      <div className="font-mono text-[11px] text-text-muted">
        Built with intention. Deployed with care.
      </div>
    </footer>
  );
}
