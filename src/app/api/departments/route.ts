import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Department from "@/models/Department";

import { getCurrentUser } from "@/lib/auth";



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



    const departments =
      await Department.find(
        {
          company:
            sessionUser.companyId,
        }
      )
      .populate(
        "manager",
        "name email role"
      );



    return NextResponse.json(
      {
        departments,
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
      sessionUser.role !== "owner"
    ) {

      return NextResponse.json(
        {
          message:
            "Only owner can create departments",
        },
        {
          status: 403,
        }
      );

    }



    const body =
      await request.json();



    const department =
      await Department.create({

        ...body,

        company:
          sessionUser.companyId,

      });



    return NextResponse.json(
      {
        message:
          "Department created successfully",

        department,

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
