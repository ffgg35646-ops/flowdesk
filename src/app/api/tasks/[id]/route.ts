import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Task from "@/models/Task";

import { getCurrentUser } from "@/lib/auth";



export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
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



    const { id } =
      await params;



    const task =
      await Task.findOne(
        {

          _id: id,

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
      );



    if (!task) {

      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        task,
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





export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
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



    const { id } =
      await params;



    const body =
      await request.json();



    const task =
      await Task.findOneAndUpdate(
        {

          _id: id,

          company:
            sessionUser.companyId,

        },

        body,

        {
          new: true,
        }
      );



    if (!task) {

      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        message:
          "Task updated successfully",

        task,

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





export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
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



    const { id } =
      await params;



    const deletedTask =
      await Task.findOneAndDelete(
        {

          _id: id,

          company:
            sessionUser.companyId,

        }
      );



    if (!deletedTask) {

      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        message:
          "Task deleted successfully",
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
