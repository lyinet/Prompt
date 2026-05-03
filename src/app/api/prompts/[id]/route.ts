import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const prompt = await prisma.prompt.findUnique({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, description, content, categoryId, tags, images } = body;

    const prompt = await prisma.prompt.update({
      where: { id: params.id },
      data: {
        title,
        description,
        content,
        categoryId,
        tags,
        images,
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
  { params }: { params: { id: string } }
) {
  try {
    await prisma.prompt.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除提示词失败:', error);
    return NextResponse.json({ error: '删除提示词失败' }, { status: 500 });
  }
}
