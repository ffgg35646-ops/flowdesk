import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Project from "@/models/Project";

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



    const project =
      await Project.findOne({

        _id: id,

        company:
          sessionUser.companyId,

      })
      .populate(
        "manager",
        "name email role"
      )
      .populate(
        "members",
        "name email role"
      );



    if (!project) {

      return NextResponse.json(
        {
          message: "Project not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        project,
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



    const body =
      await request.json();



    const project =
      await Project.findOneAndUpdate(
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



    return NextResponse.json(
      {
        project,
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



    await Project.findOneAndDelete(
      {

        _id: id,

        company:
          sessionUser.companyId,

      }
    );



    return NextResponse.json(
      {
        message:
          "Project deleted successfully",
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
