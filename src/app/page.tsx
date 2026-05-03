import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI 提示词管理平台
          </h1>
          <p className="text-xl text-gray-600">
            收集、管理和分享优质的 AI 提示词
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          <Link href="/prompts?type=text" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-blue-500">
              <div className="text-4xl mb-4">📝</div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600">文字提示词</h2>
              <p className="text-gray-600">ChatGPT、Claude 等文字类 AI 的提示词</p>
            </div>
          </Link>

          <Link href="/prompts?type=image" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-purple-500">
              <div className="text-4xl mb-4">🖼️</div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-600">图片提示词</h2>
              <p className="text-gray-600">Midjourney、DALL-E 等图片生成 AI 的提示词</p>
            </div>
          </Link>

          <Link href="/prompts?type=video" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-pink-500">
              <div className="text-4xl mb-4">🎬</div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-pink-600">视频提示词</h2>
              <p className="text-gray-600">Sora、Runway 等视频生成 AI 的提示词</p>
            </div>
          </Link>
        </div>

        <div className="text-center">
          <Link
            href="/admin"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            进入管理后台
          </Link>
        </div>
      </div>
    </main>
  );
}
