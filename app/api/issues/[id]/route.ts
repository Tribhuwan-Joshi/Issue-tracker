import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { patchIssueSchema } from "@/app/validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  const id = parseInt(params.id);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  const { title, description, assignedToUserId } = body;
  if (assignedToUserId) {
    // check that user exist
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: id },

    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const id = parseInt(params.id);
  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue)
    return NextResponse.json({ error: "Invalid id" }, { status: 404 });

  await prisma.issue.delete({
    where: { id },
  });
  return NextResponse.json({});
}
