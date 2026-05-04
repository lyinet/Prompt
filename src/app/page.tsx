import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* 动态渐变背景 */}
      <div className="fixed inset-0 gradient-mesh -z-10" />

      {/* 浮动装饰球体 */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-gradient-to-br from-indigo-500/40 to-purple-500/40 rounded-full blur-3xl animate-float" />
      <div className="fixed bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-pink-500/40 to-rose-500/40 rounded-full blur-3xl animate-float-delayed" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20 space-y-8">
          <div className="inline-block mb-6 animate-float">
            <div className="glass px-8 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg">
              ✨ 2026 Next-Gen AI Platform
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[1.1] tracking-tight">
            <span className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              AI 提示词
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
              智能管理
            </span>
          </h1>

          <p className="text-xl md:text-3xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed">
            <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">收集、管理、分享</span>
            <span className="mx-2">·</span>
            优质 AI 提示词库
            <br />
            <span className="text-lg md:text-xl text-gray-500 mt-4 inline-block">让每一次创作都充满灵感</span>
          </p>
        </div>

        {/* 分类卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-20">
          <Link href="/prompts?type=text" className="group">
            <div className="glass rounded-[2rem] p-10 card-hover hover:shadow-2xl hover:shadow-indigo-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="text-7xl mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">📝</div>
                <h2 className="text-4xl font-black mb-4 bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  文字提示词
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  ChatGPT、Claude 等文字类 AI 的专业提示词库
                </p>
                <div className="flex items-center text-indigo-600 font-bold text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2">
                  探索更多
                  <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/prompts?type=image" className="group">
            <div className="glass rounded-[2rem] p-10 card-hover hover:shadow-2xl hover:shadow-purple-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="text-7xl mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">🎨</div>
                <h2 className="text-4xl font-black mb-4 bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  图片提示词
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Midjourney、DALL-E 等图片生成 AI 的创意提示词
                </p>
                <div className="flex items-center text-purple-600 font-bold text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2">
                  探索更多
                  <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/prompts?type=video" className="group">
            <div className="glass rounded-[2rem] p-10 card-hover hover:shadow-2xl hover:shadow-pink-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="text-7xl mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">🎬</div>
                <h2 className="text-4xl font-black mb-4 bg-gradient-to-br from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  视频提示词
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Sora、Runway 等视频生成 AI 的高级提示词
                </p>
                <div className="flex items-center text-pink-600 font-bold text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2">
                  探索更多
                  <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* CTA 按钮 */}
        <div className="text-center space-y-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/prompts"
              className="inline-flex items-center gap-3 glass px-12 py-6 rounded-2xl font-bold text-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/50 group animate-glow"
            >
              <span>浏览提示词</span>
              <svg className="w-7 h-7 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <Link
              href="/admin"
              className="inline-flex items-center gap-3 glass px-12 py-6 rounded-2xl font-bold text-xl text-gray-700 hover:scale-105 transition-all duration-500 hover:shadow-xl group border-2 border-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>管理后台</span>
            </Link>
          </div>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            开始构建你的专属 AI 提示词库，让每一次创作都更加高效
          </p>
        </div>
      </div>
    </main>
  );
}
