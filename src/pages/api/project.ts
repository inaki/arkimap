// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Data = {
  name: string;
  cityId: string;
  year: number;
  description: string;
  published: boolean;
  belongsToId: number;
  longitude: number;
  latitude: number;
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
      cityId: "01eccf1a-25b6-4dde-9cea-ba4fdfabc620",
      year: +req.body.year,
      description: req.body.description,
      published: req.body.published,
      belongsToId: "7777b481-f78b-4c56-8d67-04d6213943e4",
      longitude: -99.133208,
      latitude: 19.4326077,
    },
    create: {
      name: req.body.name,
      cityId: "01eccf1a-25b6-4dde-9cea-ba4fdfabc620",
      year: +req.body.year,
      description: req.body.description,
      published: req.body.published,
      belongsToId: "7777b481-f78b-4c56-8d67-04d6213943e4",
      longitude: -99.133208,
      latitude: 19.4326077,
    },
  });

  project.then((data) => res.status(200).json(data));

  console.log(res.status);
}
