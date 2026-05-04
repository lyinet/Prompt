import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const tag = searchParams.get('tag');
    const model = searchParams.get('model');

    const where: Prisma.PromptWhereInput = {
      ...(category && { categoryId: category }),
      ...(type && { category: { type } }),
      ...(search && {
        OR: [
          { title: { contains: search } },
          { content: { contains: search } },
        ],
      }),
      ...(tag && { tags: { array_contains: tag } }),
      ...(model && { models: { array_contains: model } }),
    };

    const prompts = await prisma.prompt.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
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
    const { title, description, content, categoryId, tags, images, models } = body;

    const prompt = await prisma.prompt.create({
      data: {
        title,
        description,
        content,
        categoryId,
        tags: tags || [],
        images: images || [],
        models: models || [],
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
