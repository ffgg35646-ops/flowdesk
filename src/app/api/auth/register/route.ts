import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Company from "@/models/Company";

import { createToken } from "@/lib/token";
import { registerSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid data",
          errors: validation.error.issues,
        },
        {
          status: 400,
        }
      );
    }

    const {
      name,
      email,
      password,
      companyName,
    } = validation.data;


    const existingUser = await User.findOne({
      email,
    });


    if (existingUser) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }


    const hashedPassword = await bcrypt.hash(
      password,
      12
    );


    // Create user first
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "owner",
    });


    // Create company with user as owner
    const company = await Company.create({
      name: companyName,
      owner: user._id,
    });


    // Link company to user
    user.company = company._id;

    await user.save();


    const token = createToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      companyId: company._id.toString(),
    });


    const response = NextResponse.json(
      {
        message: "Account created",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 201,
      }
    );


    response.cookies.set(
      "flowdesk_token",
      token,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV === "production",

        sameSite: "strict",

        maxAge: 60 * 60 * 24 * 7,

        path: "/",
      }
    );


    return response;


  } catch (error) {

    console.error(
      "REGISTER ERROR:",
      error
    );


    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Server error",
      },
      {
        status: 500,
      }
    );
  }
}
