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
  useDisclosure,
  FormLabel,
  Input,
  Switch,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import { FiPlus } from "react-icons/fi";
import ModalWrapper from "../../components/shared/modal";

type CitiesType = {
  id: number;
  name: string;
  country: string;
  shortName: string;
  latitude: number;
  longitude: number;
};

type CitiesProps = {
  Cities: CityType[];
};

type CityInputProps = ExcludeTypes<CityType, "id">;

const CityDefaultInputs = {
  name: "",
  description: "",
  city: "",
  year: "",
  published: false,
};

type CityProps = {
  cities: CityType[];
};

const inputsData = [
  { name: "name", label: "City Name", type: "text" },
  { name: "country", label: "Country Name", type: "text" },
  { name: "shortName", label: "Short Name", type: "text" },
];

const Cities = ({ cities }: CityProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isValid, setValid] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("Add City");
  const [inputs, setInputs] = useState<CityInputProps>(CityDefaultInputs);
  const finalRef = useRef(null);

  const handleClose = () => {
    setInputs(CityDefaultInputs);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const JSONdata = JSON.stringify(inputs);
    const endpoint = "/api/city";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    });

    const data = await res.json();
    handleClose();
  };

  const handleInputChange = (e) => {
    e.persist();

    setInputs((inputs) => {
      if (e.target.name === "published") {
        return {
          ...inputs,
          [e.target.name]: !inputs.published,
        };
      } else {
        return {
          ...inputs,
          [e.target.name]: e.target.value,
        };
      }
    });

    const valuesEntered = Object.values(inputs).filter((value) => value !== "");
    if (valuesEntered.length < 5) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const handleEditCity = (city) => {
    setButtonTitle("Edit City");
    setInputs((inputs) => {
      return {
        ...inputs,
        name: city.name,
        cityId: city.cityId,
        year: city.year,
        published: city.published,
        description: city.description,
      };
    });
    onOpen();
  };

  return (
    <Box>
      <Flex>
        <Heading mb={10} ml={4} mr={10}>
          Cities
        </Heading>
        <IconButton onClick={onOpen} icon={<FiPlus />} aria-label="add city" />
      </Flex>

      <ModalWrapper
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        title="Add City"
        buttonTitle={buttonTitle}
        disabled={!isValid}
      >
        {inputsData.map((input) => {
          return (
            <Box key={input.name}>
              <FormLabel htmlFor={input.name} mb={2}>
                {input.label}
              </FormLabel>
              <Input
                mb={4}
                required
                minLength={3}
                type={input.type}
                name={input.name}
                id={input.name}
                value={inputs[input.name] || ""}
                onChange={handleInputChange}
                placeholder={input.label}
              />
            </Box>
          );
        })}
      </ModalWrapper>

      <TableContainer>
        <Table variant="simple">
          {/* <TableCaption>some caption i want to add on foot</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Country</Th>
              <Th>Short Name</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {cities?.map((city) => (
              <Tr key={city.id}>
                <Td>{city.name}</Td>
                <Td>{city.country}</Td>
                <Td>{city.shortName}</Td>
                <Td>
                  <Button onClick={() => handleEditCity(city)} variant="ghost">
                    Edit
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Cities;
