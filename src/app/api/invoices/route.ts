import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Invoice from "@/models/Invoice";

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



    const invoices =
      await Invoice.find(
        {
          company:
            sessionUser.companyId,
        }
      )
      .populate(
        "client",
        "name email companyName"
      )
      .populate(
        "createdBy",
        "name email"
      );



    return NextResponse.json(
      {
        invoices,
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
          message:
            "Permission denied",
        },
        {
          status: 403,
        }
      );

    }



    const body =
      await request.json();



    const invoiceNumber =
      `INV-${Date.now()}`;



    const invoice =
      await Invoice.create({

        ...body,

        invoiceNumber,

        company:
          sessionUser.companyId,

        createdBy:
          sessionUser.userId,

      });



    return NextResponse.json(
      {
        message:
          "Invoice created successfully",

        invoice,

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
