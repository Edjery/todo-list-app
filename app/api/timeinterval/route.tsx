"use server";

import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import { timeIntervalSchema } from "../schemas";

export async function GET() {
  return NextResponse.json("Hello");

  // TODO insert prisma here later
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await timeIntervalSchema.validate(body, { abortEarly: false });

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
