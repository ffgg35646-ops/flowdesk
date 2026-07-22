import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Notification from "@/models/Notification";

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



    const notification =
      await Notification.findOne(
        {
          _id: id,

          user:
            sessionUser.userId,

          company:
            sessionUser.companyId,
        }
      );



    if (!notification) {

      return NextResponse.json(
        {
          message: "Notification not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        notification,
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



    const notification =
      await Notification.findOneAndUpdate(
        {
          _id: id,

          user:
            sessionUser.userId,

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
        notification,
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



    const { id } =
      await params;



    const deletedNotification =
      await Notification.findOneAndDelete(
        {
          _id: id,

          user:
            sessionUser.userId,

          company:
            sessionUser.companyId,
        }
      );



    if (!deletedNotification) {

      return NextResponse.json(
        {
          message: "Notification not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        message:
          "Notification deleted successfully",
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
