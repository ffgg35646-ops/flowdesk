import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Invoice from "@/models/Invoice";

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



    const invoice =
      await Invoice.findOne(
        {

          _id: id,

          company:
            sessionUser.companyId,

        }
      )
      .populate(
        "client"
      )
      .populate(
        "createdBy",
        "name email"
      );



    if (!invoice) {

      return NextResponse.json(
        {
          message: "Invoice not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        invoice,
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
          message:
            "Permission denied",
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



    const invoice =
      await Invoice.findOneAndUpdate(
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



    if (!invoice) {

      return NextResponse.json(
        {
          message: "Invoice not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        message:
          "Invoice updated successfully",

        invoice,

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
            "Only owner can delete invoices",
        },
        {
          status: 403,
        }
      );

    }



    const { id } =
      await params;



    const deletedInvoice =
      await Invoice.findOneAndDelete(
        {

          _id: id,

          company:
            sessionUser.companyId,

        }
      );



    if (!deletedInvoice) {

      return NextResponse.json(
        {
          message: "Invoice not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        message:
          "Invoice deleted successfully",
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
