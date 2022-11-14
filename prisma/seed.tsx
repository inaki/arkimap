import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { citiesData } from "./citiesData";
import { projectsData } from "./projectsData";

const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    citiesData.map(async (city) => {
      return prisma.city.upsert({
        where: { id: city.id },
        update: {},
        create: {
          id: city.id,
          name: city.name,
          country: city.country,
          latitude: city.latitude,
          longitude: city.longitude,
        },
      });
    })
  );

  const salt = bcrypt.genSalt(10);
  const user = await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      email: "user@test.com",
      password: bcrypt.hashSync("password", await salt),
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
      firstName: "John",
      lastName: "Doe",
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "iiaranzadi@gmail.com" },
    update: {},
    create: {
      email: "iiaranzadi@gmail.com",
      password: bcrypt.hashSync("password", await salt),
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
      firstName: "Iñaki",
      lastName: "Aranzadi",
    },
  });

  const architect = await prisma.architect.upsert({
    where: { id: "7777b481-f78b-4c56-8d67-04d6213943e4" },
    update: {},
    create: {
      id: "7777b481-f78b-4c56-8d67-04d6213943e4",
      createdAt: new Date(),
      updatedAt: new Date(),
      firstName: "Luis",
      lastName: "Barragan",
      gender: "male",
      dob: new Date("1902-12-25"),
      country: "Mexico",
      published: true,
      biography: "Luis Barragán was a Mexican architect.",
    },
  });

  const projects = await Promise.all(
    projectsData.map(async (project) => {
      return prisma.project.createMany({
        skipDuplicates: true,
        data: [
          {
            id: project.id,
            name: project.name,
            description: project.description,
            year: project.year,
            latitude: project.latitude,
            longitude: project.longitude,
            belongsToId: project.architectId,
            published: project.published,
            cityId: project.cityId,
          },
        ],
      });
    })
  );
};

run()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
