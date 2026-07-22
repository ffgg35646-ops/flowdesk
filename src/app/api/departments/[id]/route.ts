import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Department from "@/models/Department";

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



    const department =
      await Department.findOne(
        {

          _id: id,

          company:
            sessionUser.companyId,

        }
      )
      .populate(
        "manager",
        "name email role"
      );



    if (!department) {

      return NextResponse.json(
        {
          message: "Department not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        department,
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
      sessionUser.role !== "owner"
    ) {

      return NextResponse.json(
        {
          message:
            "Only owner can update departments",
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



    const department =
      await Department.findOneAndUpdate(
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



    if (!department) {

      return NextResponse.json(
        {
          message: "Department not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        message:
          "Department updated successfully",

        department,

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
      sessionUser.role !== "owner"
    ) {

      return NextResponse.json(
        {
          message:
            "Only owner can delete departments",
        },
        {
          status: 403,
        }
      );

    }



    const { id } =
      await params;



    const deletedDepartment =
      await Department.findOneAndDelete(
        {

          _id: id,

          company:
            sessionUser.companyId,

        }
      );



    if (!deletedDepartment) {

      return NextResponse.json(
        {
          message: "Department not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        message:
          "Department deleted successfully",
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
