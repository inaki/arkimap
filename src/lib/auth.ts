import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.ARKIMAP_ACCESS_TOKEN;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "secret") as { id: string };
        user = await prisma.user.findUnique({
          where: {
            id,
          },
        });
        if (!user) {
          throw new Error("No user found");
        }
      } catch (e) {
        res.status(401).json({ error: "Not Authorized" });
        return;
      }
      return handler(req, res, user);
    }
    res.status(401).json({ error: "Not Authorized" });
  };
};
