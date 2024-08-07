import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { postId, userId } = await req.json();

    const like = await prisma.postLike.create({
      data: {
        postId,
        userId,
      },
    });

    return NextResponse.json(like, { status: 201 });
  } catch (error) {
    console.error("Failed to like post: ", error);
    return NextResponse.json(
      { error: "Failed to like post", details: error },
      { status: 500 },
    );
  }
}
