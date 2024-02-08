"use server";

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import { tagSchema } from "../../schemas";

const errorMessage = { error: "Tag not found" };

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const tag = await prisma.tag.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!tag) return NextResponse.json(errorMessage, { status: 404 });
  return NextResponse.json(tag);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = await tagSchema.validate(body, {
      abortEarly: false,
    });

    const tag = await prisma.tag.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!tag) return NextResponse.json(errorMessage, { status: 404 });

    const updatedTag = await prisma.tag.update({
      where: { id: tag.id },
      data: validatedData,
    });

    return NextResponse.json(updatedTag, { status: 200 });
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
  const tag = await prisma.tag.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!tag) return NextResponse.json(errorMessage, { status: 404 });

  const deletedData = await prisma.tag.delete({
    where: { id: tag.id },
  });

  return NextResponse.json({
    status: "success",
    message: "Item deleted successfully",
  });
}
