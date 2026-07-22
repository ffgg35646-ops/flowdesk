import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Project from "@/models/Project";

import { getCurrentUser } from "@/lib/auth";

import { projectSchema } from "@/lib/validation";



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



    const projects =
      await Project.find(
        {
          company:
            sessionUser.companyId,
        }
      )
      .populate(
        "manager",
        "name email role"
      )
      .populate(
        "members",
        "name email role"
      );



    return NextResponse.json(
      {
        projects,
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
      projectSchema.safeParse(
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



    const project =
      await Project.create({

        ...validation.data,

        company:
          sessionUser.companyId,

        manager:
          sessionUser.userId,

      });



    return NextResponse.json(
      {
        message:
          "Project created successfully",

        project,

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
