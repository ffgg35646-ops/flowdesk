import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import User from "@/models/User";

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



    const employee =
      await User.findOne(
        {
          _id: id,

          company:
            sessionUser.companyId,
        }
      )
      .select(
        "-password"
      );



    if (!employee) {

      return NextResponse.json(
        {
          message: "Employee not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        employee,
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



    const employee =
      await User.findOneAndUpdate(
        {
          _id: id,

          company:
            sessionUser.companyId,
        },

        body,

        {
          new: true,
        }
      )
      .select(
        "-password"
      );



    return NextResponse.json(
      {
        employee,
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
          message: "Only owner can delete employees",
        },
        {
          status: 403,
        }
      );

    }



    const { id } =
      await params;



    await User.findOneAndDelete(
      {
        _id: id,

        company:
          sessionUser.companyId,
      }
    );



    return NextResponse.json(
      {
        message:
          "Employee deleted",
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
