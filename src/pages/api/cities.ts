// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Data = {
  name: string;
  country: string;
  shortName: string;
  latitude: string;
  longitude: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const project = prisma.project.upsert({
    where: {
      id: `${req.body.id}`,
    },
    update: {
      name: req.body.name,
      country: req.body.country,
      shortName: req.body.shortName,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    },
    create: {
      name: req.body.name,
      country: req.body.country,
      shortName: req.body.shortName,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    },
  });

  project.then((data) => res.status(200).json(data));

  console.log(res.status);
}
