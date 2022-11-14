import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  let token = "";

  if (user && bcrypt.compareSync(password, user.password)) {
    token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: 86400, // expires in 24 hours
    });
    res.status(200).json({ auth: true, token: token });
  } else {
    res.status(401).json({ auth: false, message: "Invalid credentials" });
  }

  res.setHeader(
    "set-cookie",
    cookie.serialize("ARKIMAP_ACCESS_TOKEN", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      maxAge: 86400,
      path: "/",
    })
  );
}
