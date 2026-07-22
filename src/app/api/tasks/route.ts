import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Task from "@/models/Task";

import { getCurrentUser } from "@/lib/auth";

import { taskSchema } from "@/lib/validation";



export async function GET() {


  try {


    await connectDB();



    const sessionUser =
      await getCurrentUser();



    if (!sessionUser) {

      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }



    const tasks =
      await Task.find(
        {
          company:
            sessionUser.companyId,
        }
      )
      .populate(
        "project",
        "name"
      )
      .populate(
        "assignedTo",
        "name email role"
      )
      .populate(
        "createdBy",
        "name email"
      );



    return NextResponse.json(
      {
        tasks,
      },
      {
        status: 200,
      }
    );



  } catch (error) {


    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );


  }

}





export async function POST(
  request: Request
) {


  try {


    await connectDB();



    const sessionUser =
      await getCurrentUser();



    if (!sessionUser) {

      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }



    if (
      sessionUser.role !== "owner" &&
      sessionUser.role !== "manager"
    ) {

      return NextResponse.json(
        {
          message: "Permission denied",
        },
        {
          status: 403,
        }
      );

    }



    const body =
      await request.json();



    const validation =
      taskSchema.safeParse(
        body
      );



    if (!validation.success) {

      return NextResponse.json(
        {
          message: "Invalid data",
        },
        {
          status: 400,
        }
      );

    }



    const task =
      await Task.create({

        ...validation.data,

        company:
          sessionUser.companyId,

        createdBy:
          sessionUser.userId,

      });



    return NextResponse.json(
      {
        message:
          "Task created successfully",

        task,

      },
      {
        status: 201,
      }
    );



  } catch (error) {


    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );


  }

}
