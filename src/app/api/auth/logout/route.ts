import { NextResponse } from "next/server";



export async function POST() {


  try {


    const response =
      NextResponse.json(
        {
          message: "Logout successful",
        },
        {
          status: 200,
        }
      );



    response.cookies.delete(
      "flowdesk_token"
    );



    return response;



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
