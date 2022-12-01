import { Box } from "@chakra-ui/react";
import { useState } from "react";
import SidebarWithHeader from "../../components/sidebarWithHeader";
import prisma from "../../lib/prisma";
import Architects from "./architects";
import Projects from "./projects";
import { useRouter } from "next/router";
import Cities from "./cities";

const AdminPage = (props) => {
  const { query } = useRouter();

  return (
    <SidebarWithHeader>
      {query.section === "architects" ? (
        <Architects architects={props.architects} />
      ) : null}
      {query.section === "projects" ? (
        <Projects projects={props.projects} />
      ) : null}

      {query.section === "cities" ? <Cities cities={props.cities} /> : null}
    </SidebarWithHeader>
  );
};

export default AdminPage;

export async function getStaticProps() {
  const architects = await prisma.architect.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      country: true,
    },
  });

  const projects = await prisma.project.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      year: true,
      belongsToId: true,
      city: {
        select: {
          name: true,
          country: true,
        },
      },
    },
  });

  const cities = await prisma.city.findMany({
    select: {
      id: true,
      name: true,
      country: true,
      shortName: true,
    },
  });

  return {
    props: {
      architects,
      projects,
      cities,
    },
  };
}
