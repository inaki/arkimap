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

type ArchitectType = {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
};

type ArchitectProps = {
  architects: ArchitectType[];
};

const Architects = ({ architects }: ArchitectProps) => {
  return (
    <Box>
      <Flex>
        <Heading mb={10} ml={4} mr={10}>
          Architects
        </Heading>
        <IconButton icon={<FiPlus />} aria-label="add architect" />
      </Flex>

      <TableContainer>
        <Table variant="simple">
          {/* <TableCaption>some caption i want to add on foot</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Country</Th>
            </Tr>
          </Thead>
          <Tbody>
            {architects?.map((architect) => (
              <Tr key={architect.id}>
                <Td>
                  {architect.firstName} {architect.lastName}
                </Td>
                <Td>{architect.country}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Architects;
