"use server";

import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import { taskListSchema } from "../../schemas";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // TODO insert prisma here later

  return NextResponse.json(params.id);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await taskListSchema.validate(body, { abortEarly: false });

    // TODO insert prisma here later

    return NextResponse.json(body, { status: 200 });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json(error.errors, { status: 400 });
    } else {
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // TODO insert prisma here later

  return NextResponse.json((params.id, " id num has been deleted"));
}
