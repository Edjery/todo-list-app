"use server";

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import { taskListSchema } from "../schemas";

export async function GET() {
  const data = await prisma.taskList.findMany();

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = await taskListSchema.validate(body, {
      abortEarly: false,
    });

    const taskList = await prisma.taskList.findFirst({
      where: {
        name: validatedData.name,
      },
    });

    if (taskList)
      return NextResponse.json(
        { error: "Task List already exists" },
        { status: 400 }
      );

    const newTaskList = await prisma.taskList.create({
      data: validatedData,
    });

    return NextResponse.json(newTaskList, { status: 200 });
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
