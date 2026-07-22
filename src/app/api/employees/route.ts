import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";

import User from "@/models/User";

import { getCurrentUser } from "@/lib/auth";

import { employeeSchema } from "@/lib/validation";



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



    const employees =
      await User.find(
        {
          company:
            sessionUser.companyId,
        }
      )
      .select(
        "-password"
      );



    return NextResponse.json(
      {
        employees,
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



    const validation =
      employeeSchema.safeParse(
        body
      );



    if (!validation.success) {

      return NextResponse.json(
        {
          message: "Invalid data",
        },
        {
          status: 400,
        }
      );

    }



    const {
      name,
      email,
      role,
      jobTitle,
    } =
      validation.data;



    const existingUser =
      await User.findOne({
        email,
      });



    if (existingUser) {

      return NextResponse.json(
        {
          message:
            "Email already exists",
        },
        {
          status: 400,
        }
      );

    }



    const temporaryPassword =
      Math.random()
      .toString(36)
      .slice(-10);



    const hashedPassword =
      await bcrypt.hash(
        temporaryPassword,
        12
      );



    const employee =
      await User.create({

        name,

        email,

        password:
          hashedPassword,

        role,

        jobTitle,

        company:
          sessionUser.companyId,

      });



    return NextResponse.json(
      {
        message:
          "Employee created successfully",

        employee: {

          id:
            employee._id,

          name:
            employee.name,

          email:
            employee.email,

          role:
            employee.role,

        },

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
