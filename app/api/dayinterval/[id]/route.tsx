"use server";

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import { dayIntervalSchema } from "../../schemas";

const errorMessage = { error: "Day interval not found" };

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const dayInterval = await prisma.dayInterval.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!dayInterval) return NextResponse.json(errorMessage, { status: 404 });
  return NextResponse.json(dayInterval);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = await dayIntervalSchema.validate(body, {
      abortEarly: false,
    });

    const dayInterval = await prisma.dayInterval.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!dayInterval) return NextResponse.json(errorMessage, { status: 404 });

    const updatedDayInterval = await prisma.dayInterval.update({
      where: { id: dayInterval.id },
      data: validatedData,
    });

    return NextResponse.json(updatedDayInterval, { status: 200 });
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
  const dayInterval = await prisma.dayInterval.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!dayInterval) return NextResponse.json(errorMessage, { status: 404 });

  const deletedData = await prisma.dayInterval.delete({
    where: { id: dayInterval.id },
  });

  return NextResponse.json({
    status: "success",
    message: "Item deleted successfully",
  });
}
