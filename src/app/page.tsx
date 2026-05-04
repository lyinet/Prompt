import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* 背景渐变网格 */}
      <div className="fixed inset-0 gradient-mesh -z-10" />

      {/* 浮动装饰元素 */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl animate-float" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-rose-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-24 space-y-6">
          <div className="inline-block mb-4">
            <span className="glass px-6 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ✨ 2026 AI Prompt Platform
            </span>
          </div>

          <h1 className="text-7xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-glow">
              AI 提示词
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              管理平台
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto font-light">
            收集、管理和分享优质的 AI 提示词
            <br />
            <span className="text-lg text-gray-500">让创意触手可及</span>
          </p>
        </div>

        {/* 分类卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <Link href="/prompts?type=text" className="group">
            <div className="glass rounded-3xl p-8 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">📝</div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  文字提示词
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  ChatGPT、Claude 等文字类 AI 的提示词
                </p>
                <div className="mt-6 flex items-center text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  探索更多
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/prompts?type=image" className="group">
            <div className="glass rounded-3xl p-8 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🖼️</div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  图片提示词
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Midjourney、DALL-E 等图片生成 AI 的提示词
                </p>
                <div className="mt-6 flex items-center text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  探索更多
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/prompts?type=video" className="group">
            <div className="glass rounded-3xl p-8 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🎬</div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  视频提示词
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Sora、Runway 等视频生成 AI 的提示词
                </p>
                <div className="mt-6 flex items-center text-pink-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  探索更多
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* CTA 按钮 */}
        <div className="text-center space-y-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-3 glass px-10 py-5 rounded-2xl font-semibold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/50 group"
          >
            <span>进入管理后台</span>
            <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <p className="text-sm text-gray-500">
            开始创建和管理你的 AI 提示词库
          </p>
        </div>
      </div>
    </main>
  );
}
