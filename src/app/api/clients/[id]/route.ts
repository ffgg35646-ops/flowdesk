import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Client from "@/models/Client";

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



    const client =
      await Client.findOne(
        {
          _id: id,

          company:
            sessionUser.companyId,

        }
      )
      .populate(
        "createdBy",
        "name email"
      );



    if (!client) {

      return NextResponse.json(
        {
          message: "Client not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        client,
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



    const client =
      await Client.findOneAndUpdate(
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



    if (!client) {

      return NextResponse.json(
        {
          message: "Client not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        message:
          "Client updated successfully",

        client,

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



    const deletedClient =
      await Client.findOneAndDelete(
        {

          _id: id,

          company:
            sessionUser.companyId,

        }
      );



    if (!deletedClient) {

      return NextResponse.json(
        {
          message: "Client not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        message:
          "Client deleted successfully",
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
