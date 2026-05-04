'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  slug: string;
  type: string;
}

export default function NewPromptPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    categoryId: '',
    tags: '',
    images: [] as string[],
  });

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body });
      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, data.url],
        }));
      }
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeImage = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      if (res.ok) {
        router.push('/admin');
      }
    } catch (error) {
      console.error('创建失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-ivory-100">
      {/* Lightweight in-page header — keep author focused */}
      <header className="border-b border-ivory-300/70 bg-ivory-100/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            href="/admin"
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
            返回管理后台
          </Link>
          <span className="text-xs uppercase tracking-[0.22em] text-ink-400">
            Draft
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-24 pt-12">
        <p className="text-xs uppercase tracking-[0.22em] text-ink-500">
          New Prompt
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight tracking-editorial text-ink-900 md:text-5xl">
          撰写一条新的提示词
        </h1>
        <p className="mt-4 max-w-xl text-ink-700">
          像写一段稿件一样：先有标题，再有意图，最后写下精确的指令本身。
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-10 rounded-card border border-ivory-300 bg-ivory-50 p-8 md:p-10"
        >
          <Field label="标题" required eyebrow="01">
            <input
              type="text"
              required
              className="field-input"
              placeholder="给这条提示词一个值得记住的名字"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </Field>

          <Field label="描述" eyebrow="02" hint="一句话说明这条提示词的用途。">
            <input
              type="text"
              className="field-input"
              placeholder="可选 —— 它解决什么问题？"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Field>

          <Field
            label="提示词内容"
            required
            eyebrow="03"
            hint="支持多行。可以包含 [占位符] 让使用者填充。"
          >
            <textarea
              required
              rows={12}
              className="field-input font-mono text-[13.5px] leading-relaxed"
              placeholder={"你是一位 …\n\n请根据以下信息 …"}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </Field>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <Field label="分类" required eyebrow="04">
              <select
                required
                className="field-input appearance-none bg-ivory-50"
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
              >
                <option value="">选择分类</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="标签"
              eyebrow="05"
              hint="用逗号分隔。例如：ChatGPT, 文案, 营销"
            >
              <input
                type="text"
                className="field-input"
                placeholder="ChatGPT, 文案, 营销"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
              />
            </Field>
          </div>

          <Field
            label="参考图片"
            eyebrow="06"
            hint="可选 —— 可以为图片类提示词附上效果示例。"
          >
            <label
              htmlFor="prompt-image"
              className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-dashed border-ivory-400 bg-white px-5 py-4 text-sm text-ink-600 transition-colors hover:border-clay-600 hover:text-clay-700"
            >
              <span>{uploading ? '上传中…' : '点击选择图片，或拖拽到此处'}</span>
              <span className="rounded-full border border-ivory-300 px-3 py-1 text-xs uppercase tracking-[0.18em] text-ink-500">
                {uploading ? 'Uploading' : 'Browse'}
              </span>
            </label>
            <input
              id="prompt-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="sr-only"
            />

            {formData.images.length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {formData.images.map((url, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-lg border border-ivory-300"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt=""
                      className="aspect-square w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute right-2 top-2 rounded-full bg-ink-900/70 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-ivory-50 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      移除
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Field>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ivory-300 pt-8">
            <p className="text-xs text-ink-500">
              提交后这条提示词会立即出现在公开列表中。
            </p>
            <div className="flex items-center gap-3">
              <Link href="/admin" className="btn-secondary">
                取消
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? '保存中…' : '发布提示词'}
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

function Field({
  eyebrow,
  label,
  required,
  hint,
  children,
}: {
  eyebrow?: string;
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <span className="flex items-baseline gap-3">
          {eyebrow && (
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
              {eyebrow}
            </span>
          )}
          <span className="font-serif text-lg tracking-editorial text-ink-900">
            {label}
            {required && <span className="ml-1 text-clay-600">*</span>}
          </span>
        </span>
        {hint && <span className="text-xs text-ink-500">{hint}</span>}
      </div>
      {children}
    </label>
  );
}
