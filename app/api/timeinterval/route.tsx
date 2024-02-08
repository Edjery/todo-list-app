"use server";

import prisma from "@/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import { timeIntervalSchema } from "../schemas";

export async function GET() {
  const data = await prisma.timeInterval.findMany();

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = await timeIntervalSchema.validate(body, {
      abortEarly: false,
    });

    const newTimeInterval = await prisma.timeInterval.create({
      data: validatedData,
    });

    return NextResponse.json(newTimeInterval, { status: 200 });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json(error.errors, { status: 400 });
    } else if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(error.meta, { status: 400 });
    } else {
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
