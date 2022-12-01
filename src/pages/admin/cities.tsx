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

type CitiesType = {
  id: number;
  name: string;
  country: string;
  shortName: string;
};

type CitiesProps = {
  cities: CitiesType[];
};

const Cities = ({ cities }: CityProps) => {
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
            {cities?.map((city) => (
              <Tr key={city.id}>
                <Td>{city.name}</Td>
                <Td>{city.country}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Cities;
