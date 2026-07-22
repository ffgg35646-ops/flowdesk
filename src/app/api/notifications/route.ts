
import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Notification from "@/models/Notification";

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



    const notifications =
      await Notification.find(
        {
          user:
            sessionUser.userId,

          company:
            sessionUser.companyId,

        }
      )
      .sort(
        {
          createdAt: -1,
        }
      );



    return NextResponse.json(
      {
        notifications,
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



    const body =
      await request.json();



    const notification =
      await Notification.create({

        ...body,

        company:
          sessionUser.companyId,

      });



    return NextResponse.json(
      {
        message:
          "Notification created",

        notification,

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
