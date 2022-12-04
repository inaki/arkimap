import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  IconButton,
  Flex,
  useDisclosure,
  Input,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  Switch,
  Button,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import React, { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import ModalWrapper from "../../components/shared/modal";

type ArchitectType = {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  published: boolean;
  dob: Date | null;
  gender: string;
  biography: string;
};

type ArchitectInputProps = ExcludeTypes<ArchitectType, "id">;

const ArchitectDefaultInputs = {
  firstName: "",
  lastName: "",
  country: "",
  gender: "",
  biography: "",
  published: false,
  dob: null,
};

type ArchitectProps = {
  architects: ArchitectType[];
};

const inputsData = [
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
  { name: "country", label: "Country" },
];

const Architects = ({ architects }: ArchitectProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isValid, setValid] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [buttonTitle, setButtonTitle] = useState("Add Architect");
  const [inputs, setInputs] = useState<ArchitectInputProps>(
    ArchitectDefaultInputs
  );
  const finalRef = useRef(null);

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const JSONdata = JSON.stringify(inputs);
    const endpoint = "/api/architect";
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
      } else if (e.target.name === "dob") {
        (date) => setStartDate(date);
      } else {
        return {
          ...inputs,
          [e.target.name]: e.target.value,
        };
      }
    });

    const valuesEntered = Object.values(inputs).filter((value) => value !== "");
    if (valuesEntered.length < 6) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const handleDateChange = (date: Date) => {
    setStartDate(date);
    setInputs((inputs) => {
      return {
        ...inputs,
        dob: date,
      };
    });
  };

  const handleClose = () => {
    setInputs(ArchitectDefaultInputs);
    setButtonTitle("Add Architect");
    setStartDate(null);
    onClose();
  };

  const handleEditArchitect = (architect: ArchitectType) => {
    setStartDate(architect.dob);
    setButtonTitle("Edit Architect");
    setInputs((inputs) => {
      return {
        ...inputs,
        firstName: architect.firstName,
        lastName: architect.lastName,
        country: architect.country,
        biography: architect.biography,
        published: architect.published,
        gender: architect.gender,
        dob: architect.dob,
      };
    });
    onOpen();
  };

  return (
    <Box>
      <Flex ref={finalRef} tabIndex={-1} aria-label="Focus moved to this box">
        <Heading mb={10} ml={4} mr={10}>
          Architects
        </Heading>
        <IconButton
          onClick={onOpen}
          icon={<FiPlus />}
          aria-label="add architect"
        />
      </Flex>

      <ModalWrapper
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        title="Add Architect"
        buttonTitle={buttonTitle}
        disabled={!isValid}
      >
        <FormControl alignItems="center" mb={6}>
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
                  name={input.name}
                  id={input.name}
                  value={inputs[input.name] || ""}
                  onChange={handleInputChange}
                  placeholder={input.label}
                />
              </Box>
            );
          })}

          <FormLabel htmlFor="gender" mb={2}>
            Gender
          </FormLabel>
          <Select
            name="gender"
            id="gender"
            placeholder="Select gender"
            value={inputs.gender || ""}
            onChange={handleInputChange}
            mb={4}
          >
            <option value="female">female</option>
            <option value="male">male</option>
          </Select>

          <FormLabel htmlFor="biography" mb={2}>
            Biography
          </FormLabel>
          <Textarea
            mb={4}
            required
            minLength={3}
            name="biography"
            id="biography"
            value={inputs.biography || ""}
            onChange={handleInputChange}
            placeholder="Biography"
          />

          <FormLabel htmlFor="dob" mb={2}>
            Date of Birth
          </FormLabel>

          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            mb={4}
            required
            name="dob"
            id="dob"
          />

          <FormLabel htmlFor="published" mb={2} mt={4}>
            Published
          </FormLabel>
          <Switch
            name="published"
            id="published"
            isChecked={inputs.published || false}
            onChange={handleInputChange}
          />
        </FormControl>
      </ModalWrapper>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Country</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {architects?.map((architect) => (
              <Tr key={architect.id}>
                <Td>
                  {architect.firstName} {architect.lastName}
                </Td>
                <Td>{architect.country}</Td>
                <Td>
                  <Button
                    onClick={() => handleEditArchitect(architect)}
                    variant="ghost"
                  >
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

export default Architects;
