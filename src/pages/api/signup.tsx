import bcrypt from "bcrypt";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const salt = bcrypt.genSaltSync();
  const { email, password } = req.body;

  let user;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
        role: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    res.status(401).json({ message: "User already exists" });
    return;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, time: new Date() },
    "secret",
    {
      expiresIn: "8d",
    }
  );

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("arkimap_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 8,
      path: "/",
    })
  );

  res.status(200).json({ message: "User created" });
}
