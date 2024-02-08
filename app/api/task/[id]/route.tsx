"use server";

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import { taskSchema } from "../../schemas";

const errorMessage = { error: "Task not found" };

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) return NextResponse.json(errorMessage, { status: 404 });
  return NextResponse.json(task);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = await taskSchema.validate(body, {
      abortEarly: false,
    });

    const task = await prisma.task.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!task) return NextResponse.json(errorMessage, { status: 404 });

    const updatedTask = await prisma.task.update({
      where: { id: task.id },
      data: validatedData,
    });

    return NextResponse.json(updatedTask, { status: 200 });
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
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) return NextResponse.json(errorMessage, { status: 404 });

  const deletedData = await prisma.task.delete({
    where: { id: task.id },
  });

  return NextResponse.json({
    status: "success",
    message: "Item deleted successfully",
  });
}
