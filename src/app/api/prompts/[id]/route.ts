import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const prompt = await prisma.prompt.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!prompt) {
      return NextResponse.json({ error: '提示词不存在' }, { status: 404 });
    }

    return NextResponse.json(prompt);
  } catch (error) {
    console.error('获取提示词失败:', error);
    return NextResponse.json({ error: '获取提示词失败' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, content, categoryId, tags, images, models } = body;

    const prompt = await prisma.prompt.update({
      where: { id },
      data: {
        title,
        description,
        content,
        categoryId,
        tags,
        images,
        models,
      },
      include: { category: true },
    });

    return NextResponse.json(prompt);
  } catch (error) {
    console.error('更新提示词失败:', error);
    return NextResponse.json({ error: '更新提示词失败' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.prompt.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除提示词失败:', error);
    return NextResponse.json({ error: '删除提示词失败' }, { status: 500 });
  }
}
