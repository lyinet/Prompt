import Link from "next/link";
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

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory-100">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-28">
          <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-ivory-300 bg-ivory-50 px-3 py-1 text-xs uppercase tracking-[0.18em] text-ink-500">
            <span className="h-1.5 w-1.5 rounded-full bg-clay-600" />
            Prompt Library · v0.1
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
