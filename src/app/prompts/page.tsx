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

  const categoryColors: Record<string, string> = {
    '文字提示词': 'from-indigo-500 to-purple-500',
    '图片提示词': 'from-purple-500 to-pink-500',
    '视频提示词': 'from-pink-500 to-rose-500',
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景 */}
      <div className="fixed inset-0 gradient-mesh -z-10" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* 头部 */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 glass px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回首页
          </Link>

          <h1 className="text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              提示词库
            </span>
          </h1>
          <p className="text-xl text-gray-600">探索精选的 AI 提示词</p>
        </div>

        {/* 提示词网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <Link key={prompt.id} href={`/prompts/${prompt.id}`} className="group">
              <div className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl relative overflow-hidden h-full">
                {/* 悬停渐变效果 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[prompt.category.name] || 'from-blue-500 to-cyan-500'} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                <div className="relative z-10 flex flex-col h-full">
                  {/* 分类标签 */}
                  <div className="flex items-start justify-between mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${categoryColors[prompt.category.name] || 'from-blue-500 to-cyan-500'} text-white`}>
                      {prompt.category.name}
                    </span>
                  </div>

                  {/* 标题 */}
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                    {prompt.title}
                  </h2>

                  {/* 描述 */}
                  {prompt.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                      {prompt.description}
                    </p>
                  )}

                  {/* 标签 */}
                  {Array.isArray(prompt.tags) && prompt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {(prompt.tags as string[]).slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-xs bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full text-gray-700 border border-gray-200">
                          #{tag}
                        </span>
                      ))}
                      {(prompt.tags as string[]).length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{(prompt.tags as string[]).length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* 查看详情箭头 */}
                  <div className="mt-4 flex items-center text-indigo-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    查看详情
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 空状态 */}
        {prompts.length === 0 && (
          <div className="text-center py-20">
            <div className="glass rounded-3xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">暂无提示词</h3>
              <p className="text-gray-600 mb-8">开始创建你的第一个提示词吧</p>
              <Link href="/admin/prompts/new" className="inline-flex items-center gap-2 glass px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-105 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                创建提示词
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
