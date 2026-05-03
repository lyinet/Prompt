# AI 提示词管理平台

一个现代化的 AI 提示词收集、管理和分享平台，支持文字、图片和视频类提示词的分类管理。

## 功能特性

- 📝 **提示词管理**：添加、编辑、删除和搜索提示词
- 🖼️ **图片支持**：上传和展示提示词相关的示例图片
- 🏷️ **分类管理**：按类型（文字、图片、视频）和自定义分类组织提示词
- 📄 **文章系统**：简单的文章发布和管理功能
- 🔍 **搜索功能**：快速查找所需的提示词
- 📱 **响应式设计**：适配各种设备屏幕

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: Prisma + SQLite (开发环境)
- **UI组件**: shadcn/ui

## 快速开始

### 前置要求

- Node.js 18.17 或更高版本
- npm 或 yarn

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/lyinet/Prompt.git
cd Prompt
```

2. 安装依赖
```bash
npm install
```

3. 初始化数据库
```bash
npm run db:init
```

4. 启动开发服务器
```bash
npm run dev
```

5. 访问应用
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 一键启动

也可以使用提供的启动脚本：
```bash
chmod +x start.sh
./start.sh
```

## 项目结构

```
prompt-manager/
├── src/
│   ├── app/              # Next.js App Router 页面
│   │   ├── api/          # API 路由
│   │   ├── admin/        # 管理后台
│   │   ├── prompts/      # 提示词展示页面
│   │   └── articles/     # 文章页面
│   ├── components/       # React 组件
│   └── lib/              # 工具函数和配置
├── prisma/
│   ├── schema.prisma     # 数据库模型
│   └── seed.ts           # 种子数据
└── public/
    └── uploads/          # 上传的图片存储
```

## 使用说明

### 管理后台

访问 `/admin` 进入管理后台，可以：
- 添加新的提示词
- 编辑现有提示词
- 管理分类
- 发布文章

### 提示词管理

1. **添加提示词**：点击"添加提示词"按钮，填写标题、内容、描述等信息
2. **上传图片**：支持上传多张示例图片
3. **设置分类**：选择或创建分类标签
4. **类型选择**：标记为文字类、图片类或视频类

### API 端点

- `GET /api/prompts` - 获取提示词列表
- `POST /api/prompts` - 创建新提示词
- `GET /api/prompts/[id]` - 获取单个提示词
- `PUT /api/prompts/[id]` - 更新提示词
- `DELETE /api/prompts/[id]` - 删除提示词
- `POST /api/upload` - 上传图片

## 开发

### 数据库操作

```bash
# 推送数据库模型变更
npm run db:push

# 运行种子数据
npm run db:seed

# 初始化数据库（推送+种子）
npm run db:init
```

### 构建生产版本

```bash
npm run build
npm start
```

## 部署

项目可以部署到任何支持 Next.js 的平台：

- Vercel (推荐)
- Netlify
- Railway
- 自托管服务器

部署前记得：
1. 配置生产环境的数据库（推荐 PostgreSQL）
2. 设置环境变量
3. 配置图片存储（推荐使用云存储服务）

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
