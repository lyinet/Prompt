import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function PromptsPage({
  searchParams,
}: {
  searchParams: { type?: string; category?: string };
}) {
  const prompts = await prisma.prompt.findMany({
    where: {
      ...(searchParams.type && { category: { type: searchParams.type } }),
      ...(searchParams.category && { categoryId: searchParams.category }),
    },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">提示词列表</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            ← 返回首页
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map(prompt => (
            <Link key={prompt.id} href={`/prompts/${prompt.id}`}>
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-bold">{prompt.title}</h2>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {prompt.category.name}
                  </span>
                </div>
                {prompt.description && (
                  <p className="text-gray-600 text-sm mb-3">{prompt.description}</p>
                )}
                {prompt.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {prompt.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {prompts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">还没有提示词</p>
            <Link href="/admin/prompts/new" className="text-blue-600 hover:underline">
              添加第一个提示词 →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
