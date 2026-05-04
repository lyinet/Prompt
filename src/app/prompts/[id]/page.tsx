import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const TYPE_LABEL: Record<string, string> = {
  text: "文字 · Text",
  image: "图片 · Image",
  video: "视频 · Video",
};

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prompt = await prisma.prompt.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!prompt) {
    notFound();
  }

  const tags = Array.isArray(prompt.tags) ? (prompt.tags as string[]) : [];
  const images = Array.isArray(prompt.images)
    ? (prompt.images as string[])
    : [];
  const models = Array.isArray(prompt.models)
    ? (prompt.models as string[])
    : [];

  return (
    <main className="min-h-screen bg-ivory-100">
      <SiteHeader />

      <article className="mx-auto max-w-3xl px-6 pb-24 pt-12 md:pt-16">
        <Link
          href="/prompts"
          className="inline-flex items-center gap-2 text-sm text-ink-600 transition-colors hover:text-clay-700"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          返回提示词库
        </Link>

        {/* Title block */}
        <header className="mt-10 border-b border-ivory-300 pb-10">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink-500">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-clay-50 px-2.5 py-1 text-clay-700">
              <span className="h-1 w-1 rounded-full bg-clay-600" />
              {TYPE_LABEL[prompt.category.type] ?? prompt.category.name}
            </span>
            <span>
              {new Date(prompt.createdAt).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="font-serif text-4xl leading-tight tracking-editorial text-ink-900 md:text-5xl">
            {prompt.title}
          </h1>
          {prompt.description && (
            <p className="mt-6 text-lg leading-relaxed text-ink-700">
              {prompt.description}
            </p>
          )}
        </header>

        {/* Prompt content */}
        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.22em] text-ink-500">
              The Prompt
            </p>
            <span className="text-xs text-ink-400">
              {prompt.content.length} 字符
            </span>
          </div>
          <div className="rounded-card border border-ivory-300 bg-ivory-50">
            <div className="border-b border-ivory-300 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-ink-400">
              prompt.txt
            </div>
            <pre className="whitespace-pre-wrap break-words px-6 py-6 font-sans text-[15px] leading-relaxed text-ink-800">
              {prompt.content}
            </pre>
          </div>
        </section>

        {/* Models */}
        {models.length > 0 && (
          <section className="mt-14">
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-ink-500">
              Recommended Models
            </p>
            <div className="flex flex-wrap gap-2">
              {models.map((m, i) => (
                <Link
                  key={i}
                  href={`/prompts?model=${encodeURIComponent(m)}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-clay-200 bg-clay-50 px-3 py-1 text-sm font-medium text-clay-700 transition-colors hover:bg-clay-100"
                >
                  <span className="h-1 w-1 rounded-full bg-clay-600" />
                  {m}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Images */}
        {images.length > 0 && (
          <section className="mt-14">
            <p className="mb-5 text-xs uppercase tracking-[0.22em] text-ink-500">
              Reference Images
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {images.map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="w-full rounded-card border border-ivory-300 bg-ivory-50 object-cover"
                />
              ))}
            </div>
          </section>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <section className="mt-14">
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-ink-500">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-full border border-ivory-300 bg-ivory-50 px-3 py-1 text-sm text-ink-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Editorial colophon */}
        <div className="mt-20 divider-dotted" />
        <p className="mt-8 text-center font-serif text-base italic tracking-editorial text-ink-500">
          — fin —
        </p>
      </article>

      <SiteFooter />
    </main>
  );
}
