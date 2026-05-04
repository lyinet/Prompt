import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-ivory-300/70 bg-ivory-100/80 backdrop-blur supports-[backdrop-filter]:bg-ivory-100/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-ink-900 transition-colors hover:text-clay-600"
        >
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-full bg-clay-600"
          />
          <span className="font-serif text-lg tracking-editorial">
            Prompt Library
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-ink-600">
          <Link
            href="/prompts"
            className="transition-colors hover:text-ink-900"
          >
            浏览
          </Link>
          <Link
            href="/admin"
            className="transition-colors hover:text-ink-900"
          >
            管理后台
          </Link>
          <Link href="/admin/prompts/new" className="btn-primary">
            新建提示词
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ivory-300/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-ink-500 md:flex-row md:items-center md:justify-between">
        <p className="font-serif text-base tracking-editorial text-ink-700">
          Prompt Library · 让每一次 AI 对话都更精准
        </p>
        <p className="text-ink-500">© {new Date().getFullYear()} Prompt Library.</p>
      </div>
    </footer>
  );
}
