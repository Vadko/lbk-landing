import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl font-extrabold text-gradient mb-4">404</div>
        <h1 className="text-2xl font-bold mb-4">Сторінку не знайдено</h1>
        <p className="text-[var(--text-secondary)] mb-8">
          Схоже, ця сторінка не існує або була переміщена.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn-primary">
            <i className="fa-solid fa-home" />
            На головну
          </Link>
          <Link
            href="/games"
            className="px-6 py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:border-[var(--accent-blue)] transition-colors"
          >
            <i className="fa-solid fa-gamepad mr-2" />
            Каталог ігор
          </Link>
        </div>
      </div>
    </section>
  );
}
