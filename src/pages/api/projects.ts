import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.body;
  const projects = await prisma.project.findMany({
    where: {
      city,
    },
  });
  res.status(200).json(projects);
}
