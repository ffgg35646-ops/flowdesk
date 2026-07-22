import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Company from "@/models/Company";

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



    const company =
      await Company.findById(
        sessionUser.companyId
      )
      .populate(
        "owner",
        "name email role"
      );



    if (!company) {

      return NextResponse.json(
        {
          message: "Company not found",
        },
        {
          status: 404,
        }
      );

    }



    return NextResponse.json(
      {
        company,
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



    const updatedCompany =
      await Company.findByIdAndUpdate(
        sessionUser.companyId,
        body,
        {
          new: true,
        }
      );



    return NextResponse.json(
      {
        company: updatedCompany,
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
