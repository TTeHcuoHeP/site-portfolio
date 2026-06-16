export default function Footer() {
  return (
    <footer className="bg-[var(--graphite)] py-7 text-[var(--muted)]">
      <div className="shell flex justify-between text-[10px] uppercase tracking-[.16em]">
        <span>© {new Date().getFullYear()} Alsim</span>
        <span>Creative Direction</span>
      </div>
    </footer>
  );
}
