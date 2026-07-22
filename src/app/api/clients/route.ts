import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Client from "@/models/Client";

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



    const clients =
      await Client.find(
        {
          company:
            sessionUser.companyId,
        }
      )
      .populate(
        "createdBy",
        "name email"
      );



    return NextResponse.json(
      {
        clients,
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



    const client =
      await Client.create({

        ...body,

        company:
          sessionUser.companyId,


        createdBy:
          sessionUser.userId,

      });



    return NextResponse.json(
      {
        message:
          "Client created successfully",

        client,

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
