import Link from "next/link";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const TYPE_LABEL: Record<string, string> = {
  text: "文字 · Text",
  image: "图片 · Image",
  video: "视频 · Video",
};

export default async function PromptsPage({
  searchParams,
}: {
  searchParams: Promise<{
    type?: string;
    category?: string;
    tag?: string;
    model?: string;
  }>;
}) {
  const params = await searchParams;

  const where: Prisma.PromptWhereInput = {
    ...(params.type && { category: { type: params.type } }),
    ...(params.category && { categoryId: params.category }),
    ...(params.tag && { tags: { array_contains: params.tag } }),
    ...(params.model && { models: { array_contains: params.model } }),
  };

  const prompts = await prisma.prompt.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const activeType = params.type;
  const activeFilter = params.tag
    ? { kind: "tag" as const, value: params.tag }
    : params.model
      ? { kind: "model" as const, value: params.model }
      : null;

  return (
    <main className="min-h-screen bg-ivory-100">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pt-20">
        <p className="text-xs uppercase tracking-[0.22em] text-ink-500">
          The Library
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight tracking-editorial text-ink-900 md:text-5xl">
          提示词库
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-700">
          一份持续生长的提示词目录 —— 你可以按媒介筛选，或直接打开任意一条仔细阅读。
        </p>

        {/* Active filter (tag/model) banner */}
        {activeFilter && (
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-clay-200 bg-clay-50 px-4 py-2 text-sm text-clay-700">
            <span className="text-xs uppercase tracking-[0.18em] text-clay-700/80">
              {activeFilter.kind === "tag" ? "Tag" : "Model"}
            </span>
            <span className="font-medium">
              {activeFilter.kind === "tag"
                ? `#${activeFilter.value}`
                : activeFilter.value}
            </span>
            <Link
              href="/prompts"
              className="ml-1 rounded-full text-clay-700/60 transition-colors hover:text-clay-700"
              aria-label="清除过滤"
            >
              ×
            </Link>
          </div>
        )}

        {/* Filter tabs */}
        {!activeFilter && (
          <div className="mt-10 flex flex-wrap items-center gap-2">
            <FilterChip href="/prompts" label="全部" active={!activeType} />
            <FilterChip
              href="/prompts?type=text"
              label="文字"
              active={activeType === "text"}
            />
            <FilterChip
              href="/prompts?type=image"
              label="图片"
              active={activeType === "image"}
            />
            <FilterChip
              href="/prompts?type=video"
              label="视频"
              active={activeType === "video"}
            />
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        {prompts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {prompts.map((prompt) => {
              const tags = Array.isArray(prompt.tags)
                ? (prompt.tags as string[])
                : [];
              const models = Array.isArray(prompt.models)
                ? (prompt.models as string[])
                : [];
              return (
                <Link
                  key={prompt.id}
                  href={`/prompts/${prompt.id}`}
                  className="group flex flex-col rounded-card border border-ivory-300 bg-ivory-50 p-7 transition-all hover:border-ivory-400 hover:bg-white"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-clay-50 px-2.5 py-1 text-xs font-medium text-clay-700">
                      <span className="h-1 w-1 rounded-full bg-clay-600" />
                      {TYPE_LABEL[prompt.category.type] ?? prompt.category.name}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-ink-400">
                      {new Date(prompt.createdAt).toLocaleDateString("zh-CN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl leading-snug tracking-editorial text-ink-900 transition-colors group-hover:text-clay-700">
                    {prompt.title}
                  </h2>

                  {prompt.description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-600">
                      {prompt.description}
                    </p>
                  )}

                  {models.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {models.slice(0, 3).map((m, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-clay-200 bg-clay-50/60 px-2 py-0.5 text-[11px] text-clay-700"
                        >
                          {m}
                        </span>
                      ))}
                      {models.length > 3 && (
                        <span className="text-[11px] text-ink-400">
                          +{models.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {tags.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 border-t border-ivory-300 pt-4 text-xs text-ink-500">
                      {tags.slice(0, 4).map((tag, i) => (
                        <span key={i}>#{tag}</span>
                      ))}
                      {tags.length > 4 && (
                        <span className="text-ink-400">
                          +{tags.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-card border border-dashed border-ivory-400 bg-ivory-50 px-8 py-20 text-center">
            <p className="font-serif text-3xl tracking-editorial text-ink-800">
              空白页
            </p>
            <p className="mt-3 text-sm text-ink-600">
              {activeFilter
                ? "这个过滤条件下还没有提示词。"
                : "这里还没有任何提示词。要不要写下第一条？"}
            </p>
            <Link
              href={activeFilter ? "/prompts" : "/admin/prompts/new"}
              className="btn-primary mt-8"
            >
              {activeFilter ? "查看全部" : "创建第一个提示词"}
            </Link>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}

function FilterChip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "rounded-full border border-ink-900 bg-ink-900 px-4 py-1.5 text-sm text-ivory-50"
          : "rounded-full border border-ivory-300 bg-ivory-50 px-4 py-1.5 text-sm text-ink-700 transition-colors hover:border-ink-700 hover:bg-white"
      }
    >
      {label}
    </Link>
  );
}
