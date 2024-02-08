"use server";

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import { timeIntervalSchema } from "../../schemas";

const errorMessage = { error: "Time interval not found" };

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const timeInterval = await prisma.timeInterval.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!timeInterval) return NextResponse.json(errorMessage, { status: 404 });
  return NextResponse.json(timeInterval);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = await timeIntervalSchema.validate(body, {
      abortEarly: false,
    });

    const timeInterval = await prisma.timeInterval.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!timeInterval) return NextResponse.json(errorMessage, { status: 404 });

    const updatedTimeInterval = await prisma.timeInterval.update({
      where: { id: timeInterval.id },
      data: validatedData,
    });

    return NextResponse.json(updatedTimeInterval, { status: 200 });
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
  const timeInterval = await prisma.timeInterval.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!timeInterval) return NextResponse.json(errorMessage, { status: 404 });

  const deletedData = await prisma.timeInterval.delete({
    where: { id: timeInterval.id },
  });

  return NextResponse.json({
    status: "success",
    message: "Item deleted successfully",
  });
}
