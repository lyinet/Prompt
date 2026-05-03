import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    const prompts = await prisma.prompt.findMany({
      where: {
        ...(category && { categoryId: category }),
        ...(type && { category: { type } }),
        ...(search && {
          OR: [
            { title: { contains: search } },
            { content: { contains: search } },
          ],
        }),
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(prompts);
  } catch (error) {
    console.error('获取提示词失败:', error);
    return NextResponse.json({ error: '获取提示词失败' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, content, categoryId, tags, images } = body;

    const prompt = await prisma.prompt.create({
      data: {
        title,
        description,
        content,
        categoryId,
        tags: tags || [],
        images: images || [],
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(prompt);
  } catch (error) {
    console.error('创建提示词失败:', error);
    return NextResponse.json({ error: '创建提示词失败' }, { status: 500 });
  }
}
