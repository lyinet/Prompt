import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 开始初始化数据库...');

  const categories = [
    { name: '文字提示词', slug: 'text-prompts', type: 'text' },
    { name: '图片提示词', slug: 'image-prompts', type: 'image' },
    { name: '视频提示词', slug: 'video-prompts', type: 'video' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    console.log(`✅ 创建分类: ${category.name}`);
  }

  const textCategory = await prisma.category.findUnique({
    where: { slug: 'text-prompts' },
  });

  if (textCategory) {
    await prisma.prompt.upsert({
      where: { id: 'example-1' },
      update: {},
      create: {
        id: 'example-1',
        title: '专业文案撰写助手',
        description: '帮助你撰写专业、吸引人的营销文案',
        content: '你是一位经验丰富的文案撰写专家。请根据以下信息撰写一篇专业的营销文案：\n\n产品/服务：[在此填写]\n目标受众：[在此填写]\n核心卖点：[在此填写]\n\n要求：\n1. 标题要吸引眼球\n2. 内容简洁有力\n3. 突出产品优势\n4. 包含行动号召',
        categoryId: textCategory.id,
        tags: ['文案', '营销', 'ChatGPT'],
        images: [],
      },
    });
    console.log('✅ 创建示例提示词');
  }

  console.log('🎉 数据库初始化完成！');
}

main()
  .catch((e) => {
    console.error('❌ 初始化失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
