import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export default async function AdminPage() {
  const [promptCount, categoryCount] = await Promise.all([
    prisma.prompt.count(),
    prisma.category.count(),
  ]);

  const recent = await prisma.prompt.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <main className="min-h-screen bg-ivory-100">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pt-20">
        <p className="text-xs uppercase tracking-[0.22em] text-ink-500">
          Workspace
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-editorial text-ink-900 md:text-5xl">
          管理后台
        </h1>
        <p className="mt-5 max-w-xl text-ink-700">
          在这里编排你的提示词集合 —— 像编辑一份内部刊物。
        </p>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-ivory-300 bg-ivory-300 sm:grid-cols-3">
          <Stat label="提示词总数" value={promptCount} />
          <Stat label="分类数量" value={categoryCount} />
          <Stat label="存储位置" value="local · sqlite" mono />
        </div>
      </section>

      {/* Quick actions */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 font-serif text-2xl tracking-editorial text-ink-900">
          快速操作
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ActionCard
            href="/admin/prompts/new"
            eyebrow="Compose"
            title="撰写新的提示词"
            description="进入编辑视图，记录一个值得保留的提示词。支持图片、标签与分类。"
          />
          <ActionCard
            href="/prompts"
            eyebrow="Browse"
            title="浏览全部提示词"
            description="查看公开页面，验证内容在读者视角下的呈现是否得当。"
          />
        </div>
      </section>

      {/* Recent activity */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-2xl tracking-editorial text-ink-900">
            最近撰写
          </h2>
          <Link
            href="/prompts"
            className="text-sm text-ink-600 transition-colors hover:text-clay-700"
          >
            查看全部 →
          </Link>
        </div>

        {recent.length > 0 ? (
          <ul className="overflow-hidden rounded-card border border-ivory-300 bg-ivory-50">
            {recent.map((p, idx) => (
              <li
                key={p.id}
                className={
                  idx === 0
                    ? ""
                    : "border-t border-ivory-300"
                }
              >
                <Link
                  href={`/prompts/${p.id}`}
                  className="flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-white"
                >
                  <div className="min-w-0">
                    <p className="truncate font-serif text-lg tracking-editorial text-ink-900">
                      {p.title}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ink-500">
                      {p.category.name}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-ink-400">
                    {new Date(p.createdAt).toLocaleDateString("zh-CN", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-card border border-dashed border-ivory-400 bg-ivory-50 px-8 py-16 text-center">
            <p className="font-serif text-2xl tracking-editorial text-ink-800">
              还没有任何提示词
            </p>
            <p className="mt-2 text-sm text-ink-600">
              从一条简单的指令开始，慢慢积累你的语言库。
            </p>
            <Link href="/admin/prompts/new" className="btn-primary mt-6">
              撰写第一条
            </Link>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}

function Stat({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: number | string;
  mono?: boolean;
}) {
  return (
    <div className="bg-ivory-50 p-8">
      <p className="text-xs uppercase tracking-[0.22em] text-ink-500">
        {label}
      </p>
      <p
        className={
          mono
            ? "mt-3 font-mono text-lg text-ink-800"
            : "mt-3 font-serif text-4xl tracking-editorial text-ink-900"
        }
      >
        {value}
      </p>
    </div>
  );
}

function ActionCard({
  href,
  eyebrow,
  title,
  description,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-card border border-ivory-300 bg-ivory-50 p-8 transition-all hover:border-ivory-400 hover:bg-white"
    >
      <p className="text-xs uppercase tracking-[0.22em] text-ink-500">
        {eyebrow}
      </p>
      <h3 className="mt-4 font-serif text-2xl tracking-editorial text-ink-900 transition-colors group-hover:text-clay-700">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-600">{description}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-clay-700">
        前往
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </span>
    </Link>
  );
}
