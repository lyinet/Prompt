import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function PromptDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const prompt = await prisma.prompt.findUnique({
    where: { id: params.id },
    include: { category: true },
  });

  if (!prompt) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/prompts" className="text-blue-600 hover:underline">
            ← 返回列表
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-3xl font-bold">{prompt.title}</h1>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
              {prompt.category.name}
            </span>
          </div>

          {prompt.description && (
            <p className="text-gray-600 mb-6">{prompt.description}</p>
          )}

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="font-semibold mb-3">提示词内容：</h2>
            <pre className="whitespace-pre-wrap text-sm">{prompt.content}</pre>
          </div>

          {prompt.images.length > 0 && (
            <div className="mb-6">
              <h2 className="font-semibold mb-3">示例图片：</h2>
              <div className="grid grid-cols-2 gap-4">
                {prompt.images.map((url, i) => (
                  <img key={i} src={url} alt="" className="rounded-lg" />
                ))}
              </div>
            </div>
          )}

          {prompt.tags.length > 0 && (
            <div>
              <h2 className="font-semibold mb-3">标签：</h2>
              <div className="flex flex-wrap gap-2">
                {prompt.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-100 px-3 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
