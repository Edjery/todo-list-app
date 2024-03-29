"use server";

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import { taskListSchema } from "../../schemas";

const errorMessage = { error: "Task list not found" };

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const taskList = await prisma.taskList.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!taskList) return NextResponse.json(errorMessage, { status: 404 });
  return NextResponse.json(taskList);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = await taskListSchema.validate(body, {
      abortEarly: false,
    });

    const taskList = await prisma.taskList.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!taskList) return NextResponse.json(errorMessage, { status: 404 });

    const updatedTaskList = await prisma.taskList.update({
      where: { id: taskList.id },
      data: validatedData,
    });

    return NextResponse.json(updatedTaskList, { status: 200 });
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
  const taskList = await prisma.taskList.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!taskList) return NextResponse.json(errorMessage, { status: 404 });

  const deletedData = await prisma.taskList.delete({
    where: { id: taskList.id },
  });

  return NextResponse.json({
    status: "success",
    message: "Item deleted successfully",
  });
}
