import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "@/app/validationSchema";
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validate = createIssueSchema.safeParse(body);

  if (!validate.success)
    return NextResponse.json(validate.error.format(), { status: 400 });
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
