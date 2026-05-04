import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function PromptsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; category?: string }>;
}) {
  const params = await searchParams;
  const prompts = await prisma.prompt.findMany({
    where: {
      ...(params.type && { category: { type: params.type } }),
      ...(params.category && { categoryId: params.category }),
    },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors">
            AI Prompt Manager
          </Link>
          <Link
            href="/admin"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            管理后台
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">提示词库</h1>
          <p className="text-lg text-gray-600">浏览和使用精选的 AI 提示词模板</p>
        </div>

        {/* Prompts Grid */}
        {prompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt) => (
              <Link key={prompt.id} href={`/prompts/${prompt.id}`} className="group">
                <div className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-sm transition-all h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      {prompt.category.name}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#CC785C] transition-colors">
                    {prompt.title}
                  </h2>

                  {prompt.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                      {prompt.description}
                    </p>
                  )}

                  {Array.isArray(prompt.tags) && prompt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100">
                      {(prompt.tags as string[]).slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-xs text-gray-500">
                          #{tag}
                        </span>
                      ))}
                      {(prompt.tags as string[]).length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{(prompt.tags as string[]).length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">暂无提示词</h3>
              <p className="text-gray-600 mb-8">开始创建你的第一个提示词模板</p>
              <Link
                href="/admin/prompts/new"
                className="inline-flex items-center px-6 py-3 bg-[#CC785C] text-white font-medium rounded-lg hover:bg-[#B86A4F] transition-colors"
              >
                创建提示词
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
