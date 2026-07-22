import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

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



    const user =
      await User.findById(
        sessionUser.userId
      )
      .select(
        "-password"
      )
      .populate(
        "company"
      )
      .populate(
        "department"
      );



    if (!user) {


      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );


    }



    return NextResponse.json(
      {
        user,
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
