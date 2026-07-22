import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

import { createToken } from "@/lib/token";
import { loginSchema } from "@/lib/validation";


export async function POST(request: Request) {

  try {

    console.log("LOGIN START");


    await connectDB();


    console.log("DATABASE CONNECTED");


    const body = await request.json();


    console.log("BODY RECEIVED", body.email);


    const validation = loginSchema.safeParse(body);


    if (!validation.success) {

      console.log("VALIDATION FAILED");

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
      email,
      password,
    } = validation.data;


    console.log("SEARCH USER", email);


    const user = await User.findOne({
      email,
    });


    console.log(
      "USER RESULT",
      user ? user.email : "NOT FOUND"
    );


    if (!user) {

      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 401,
        }
      );

    }


    console.log("CHECK PASSWORD");


    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );


    console.log(
      "PASSWORD RESULT",
      passwordMatch
    );


    if (!passwordMatch) {

      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 401,
        }
      );

    }


    user.lastLogin = new Date();

    await user.save();


    console.log("USER UPDATED");


    const token = createToken({

      userId: user._id.toString(),

      email: user.email,

      role: user.role,

      companyId: user.company.toString(),

    });


    const response = NextResponse.json(
      {
        message: "Login successful",

        user: {

          id: user._id,

          name: user.name,

          role: user.role,

        },

      },
      {
        status: 200,
      }
    );


    response.cookies.set(
      "flowdesk_token",
      token,
      {

        httpOnly: true,

        secure: process.env.NODE_ENV === "production",

        sameSite: "strict",

        maxAge: 60 * 60 * 24 * 7,

        path: "/",

      }
    );


    console.log("LOGIN SUCCESS");


    return response;


  } catch (error) {

    console.log(
      "LOGIN ERROR:",
      error
    );


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
