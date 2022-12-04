// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Data = {
  firstName: string;
  lastName: string;
  gender: string;
  biography: string;
  published: boolean;
  country: string;
  dob: Date;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  const architect = prisma.architect.upsert({
    where: {
      id: `${req.body.id}`,
    },
    update: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      country: req.body.country,
      biography: req.body.biography,
      published: req.body.published,
      dob: new Date(),
    },
    create: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      country: req.body.country,
      biography: req.body.biography,
      published: req.body.published,
      dob: new Date(),
    },
  });

  architect.then((data) => res.status(200).json(data));

  console.log(res.status);
}
