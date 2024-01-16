import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const validate = issueSchema.safeParse(body);
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

// just for checking

export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}
