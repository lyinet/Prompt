import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const categories = [
  {
    type: "text",
    label: "Text",
    title: "文字提示词",
    description:
      "为 ChatGPT、Claude 等对话式模型精心打磨的指令模板，覆盖写作、分析、推理与代理工作流。",
    eyebrow: "01 — Conversation",
  },
  {
    type: "image",
    label: "Image",
    title: "图片提示词",
    description:
      "面向 Midjourney、DALL·E、Stable Diffusion 的视觉描述语言，强调风格、构图与光影的精确控制。",
    eyebrow: "02 — Vision",
  },
  {
    type: "video",
    label: "Video",
    title: "视频提示词",
    description:
      "为 Sora、Runway、Pika 等模型设计的镜头语言与时序描述，捕捉运动、节奏与叙事张力。",
    eyebrow: "03 — Motion",
  },
];

type CloudEntry = { name: string; count: number };

async function getCloudData(): Promise<{
  tags: CloudEntry[];
  models: CloudEntry[];
}> {
  const rows = await prisma.prompt.findMany({
    select: { tags: true, models: true },
  });

  const tagCounts = new Map<string, number>();
  const modelCounts = new Map<string, number>();

  for (const row of rows) {
    if (Array.isArray(row.tags)) {
      for (const t of row.tags) {
        if (typeof t !== "string") continue;
        const k = t.trim();
        if (!k) continue;
        tagCounts.set(k, (tagCounts.get(k) ?? 0) + 1);
      }
    }
    if (Array.isArray(row.models)) {
      for (const m of row.models) {
        if (typeof m !== "string") continue;
        const k = m.trim();
        if (!k) continue;
        modelCounts.set(k, (modelCounts.get(k) ?? 0) + 1);
      }
    }
  }

  const toEntries = (m: Map<string, number>, limit: number): CloudEntry[] =>
    Array.from(m.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      .slice(0, limit);

  return {
    tags: toEntries(tagCounts, 60),
    models: toEntries(modelCounts, 30),
  };
}

// Map a count to a Tailwind text-size class based on its rank within the cloud.
function sizeClass(count: number, max: number): string {
  if (max === 0) return "text-base";
  const r = count / max;
  if (r >= 0.85) return "text-3xl md:text-4xl";
  if (r >= 0.6) return "text-2xl md:text-3xl";
  if (r >= 0.4) return "text-xl md:text-2xl";
  if (r >= 0.2) return "text-lg md:text-xl";
  if (r >= 0.1) return "text-base";
  return "text-sm";
}

function weightClass(count: number, max: number): string {
  if (max === 0) return "text-ink-500";
  const r = count / max;
  if (r >= 0.6) return "text-ink-900";
  if (r >= 0.3) return "text-ink-700";
  return "text-ink-500";
}

export default async function Home() {
  const { tags, models } = await getCloudData();
  const tagMax = tags[0]?.count ?? 0;
  const modelMax = models[0]?.count ?? 0;

  return (
    <main className="min-h-screen bg-ivory-100">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-28">
          <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-ivory-300 bg-ivory-50 px-3 py-1 text-xs uppercase tracking-[0.18em] text-ink-500">
            <span className="h-1.5 w-1.5 rounded-full bg-clay-600" />
            Prompt Library · v0.2
          </p>

          <h1 className="font-serif text-[44px] leading-[1.05] tracking-editorial text-ink-900 md:text-[68px] md:leading-[1.02]">
            收集、管理与分享
            <br />
            <span className="italic text-clay-700">优质的 AI 提示词。</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-700 md:text-xl">
            一个为创作者打造的提示词工作台 —— 让每一段写给模型的话语，都像一份认真撰写的稿件，可以被复用、被重读、被传递。
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link href="/prompts" className="btn-primary">
              浏览提示词库
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link href="/admin/prompts/new" className="btn-secondary">
              创建新的提示词
            </Link>
          </div>

          {/* Subtle corner ornament — Anthropic-style serif ‘&’ */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-2 top-10 hidden select-none font-serif text-[200px] leading-none text-clay-100 md:block"
          >
            &amp;
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <div className="divider-dotted" />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-ink-500">
              Browse by medium
            </p>
            <h2 className="font-serif text-3xl tracking-editorial text-ink-900 md:text-4xl">
              按媒介浏览
            </h2>
          </div>
          <Link
            href="/prompts"
            className="hidden text-sm text-ink-600 transition-colors hover:text-clay-700 md:inline-flex"
          >
            查看全部 →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-ivory-300 bg-ivory-300 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.type}
              href={`/prompts?type=${cat.type}`}
              className="group relative flex flex-col bg-ivory-50 p-8 transition-colors hover:bg-white"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-ink-400">
                {cat.eyebrow}
              </p>
              <h3 className="mt-6 font-serif text-2xl tracking-editorial text-ink-900">
                {cat.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                {cat.description}
              </p>
              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-clay-700">
                浏览 {cat.label}
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
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tag & Model clouds */}
      {(tags.length > 0 || models.length > 0) && (
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-ivory-300 bg-ivory-300 md:grid-cols-2">
            {/* Tag cloud */}
            <div className="flex flex-col bg-ivory-50 p-8 md:p-10">
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.22em] text-ink-500">
                  Tag cloud
                </p>
                <span className="font-mono text-[11px] text-ink-400">
                  {tags.length} 个标签
                </span>
              </div>
              <h3 className="mb-6 font-serif text-2xl tracking-editorial text-ink-900">
                按主题游走
              </h3>
              {tags.length > 0 ? (
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  {tags.map((t) => (
                    <Link
                      key={t.name}
                      href={`/prompts?tag=${encodeURIComponent(t.name)}`}
                      className={`font-serif tracking-tightish transition-colors hover:text-clay-700 ${sizeClass(
                        t.count,
                        tagMax,
                      )} ${weightClass(t.count, tagMax)}`}
                      title={`${t.count} 条`}
                    >
                      <span className="text-clay-600/70">#</span>
                      {t.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-ink-500">还没有任何标签。</p>
              )}
            </div>

            {/* Model cloud */}
            <div className="flex flex-col bg-ivory-50 p-8 md:p-10">
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.22em] text-ink-500">
                  Model cloud
                </p>
                <span className="font-mono text-[11px] text-ink-400">
                  {models.length} 个模型
                </span>
              </div>
              <h3 className="mb-6 font-serif text-2xl tracking-editorial text-ink-900">
                按模型寻路
              </h3>
              {models.length > 0 ? (
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                  {models.map((m) => (
                    <Link
                      key={m.name}
                      href={`/prompts?model=${encodeURIComponent(m.name)}`}
                      className={`inline-flex items-baseline gap-1.5 rounded-full border border-clay-200/70 bg-clay-50/50 px-3 py-1 transition-colors hover:border-clay-600 hover:bg-clay-50 ${sizeClass(
                        m.count,
                        modelMax,
                      )} text-clay-700`}
                      title={`${m.count} 条`}
                    >
                      <span className="h-1 w-1 rounded-full bg-clay-600" />
                      <span className="font-medium">{m.name}</span>
                      <span className="font-mono text-[10px] text-clay-700/60">
                        {m.count}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-ink-500">
                  还没有任何模型记录。在新建提示词时填入「适用模型」即可。
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Manifesto block — editorial pull quote */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-card border border-ivory-300 bg-ivory-50 px-8 py-14 md:px-16 md:py-20">
          <p className="text-xs uppercase tracking-[0.22em] text-ink-500">
            A note on craft
          </p>
          <blockquote className="mt-6 font-serif text-2xl leading-snug tracking-editorial text-ink-800 md:text-[32px] md:leading-[1.25]">
            “一段好的提示词，是写作者与模型之间的 <span className="italic text-clay-700">共同语言</span> —— 它精确、克制，却为意外留出位置。”
          </blockquote>
          <p className="mt-8 text-sm text-ink-500">
            这个工作台只做一件事：让你的提示词值得被认真保存。
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
