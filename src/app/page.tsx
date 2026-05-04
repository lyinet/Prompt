import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-900">AI Prompt Manager</div>
          <Link
            href="/admin"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            管理后台
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 leading-tight text-balance">
            收集、管理和分享
            <br />
            优质的 AI 提示词
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            构建你的专属提示词库，让每一次 AI 对话都更加高效和精准
          </p>
          <div className="flex gap-4">
            <Link
              href="/prompts"
              className="inline-flex items-center px-6 py-3 bg-[#CC785C] text-white font-medium rounded-lg hover:bg-[#B86A4F] transition-colors"
            >
              浏览提示词
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/admin/prompts/new"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              创建提示词
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-gray-900 mb-10">按类型浏览</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/prompts?type=text" className="group">
            <div className="border border-gray-200 rounded-xl p-8 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">文字提示词</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                适用于 ChatGPT、Claude 等对话式 AI 的提示词模板
              </p>
              <div className="text-[#CC785C] font-medium flex items-center">
                查看更多
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <Link href="/prompts?type=image" className="group">
            <div className="border border-gray-200 rounded-xl p-8 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">图片提示词</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                适用于 Midjourney、DALL-E 等图像生成 AI 的提示词
              </p>
              <div className="text-[#CC785C] font-medium flex items-center">
                查看更多
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <Link href="/prompts?type=video" className="group">
            <div className="border border-gray-200 rounded-xl p-8 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">视频提示词</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                适用于 Sora、Runway 等视频生成 AI 的提示词模板
              </p>
              <div className="text-[#CC785C] font-medium flex items-center">
                查看更多
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-sm text-gray-500">© 2026 AI Prompt Manager. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
