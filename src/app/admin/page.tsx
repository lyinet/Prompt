import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">管理后台</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            ← 返回首页
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <Link href="/admin/prompts/new">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold mb-2">📝 添加提示词</h2>
              <p className="text-gray-600">创建新的提示词</p>
            </div>
          </Link>

          <Link href="/prompts">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold mb-2">📋 查看所有提示词</h2>
              <p className="text-gray-600">浏览和管理现有提示词</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
