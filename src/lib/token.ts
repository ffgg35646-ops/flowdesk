import jwt from "jsonwebtoken";


const JWT_SECRET =
  process.env.JWT_SECRET as string;



if (!JWT_SECRET) {

  throw new Error(
    "Please define JWT_SECRET inside .env.local"
  );

}



export function createToken(
  payload: object
) {

  return jwt.sign(
    payload,

    JWT_SECRET,

    {
      expiresIn: "7d",
    }

  );

}



export function verifyToken(
  token: string
) {

  return jwt.verify(
    token,

    JWT_SECRET

  );

}
