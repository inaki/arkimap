import {
  Box,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  IconButton,
  Flex,
} from "@chakra-ui/react";

import { FiPlus } from "react-icons/fi";

type ProjectsType = {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
};

type ProjectsProps = {
  Projectss: ProjectsType[];
};

const Projects = ({ projects }: ProjectProps) => {
  return (
    <Box>
      <Flex>
        <Heading mb={10} ml={4} mr={10}>
          Projects
        </Heading>
        <IconButton icon={<FiPlus />} aria-label="add architect" />
      </Flex>

      <TableContainer>
        <Table variant="simple">
          {/* <TableCaption>some caption i want to add on foot</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>City</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects?.map((project) => (
              <Tr key={project.id}>
                <Td>{project.name}</Td>
                <Td>
                  {project.city.name}, {project.city.country}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Projects;
