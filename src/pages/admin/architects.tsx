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
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import ModalWrapper from "../../components/shared/modal";

type ArchitectType = {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
};

type ArchitectInputProps = {
  firstName: string;
  lastName: string;
  country: string;
  gender: string;
  biography: string;
  published: boolean;
};

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

const Architects = ({ architects }: ArchitectProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isValid, setValid] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [inputs, setInputs] = useState<ArchitectInputProps>(
    ArchitectDefaultInputs
  );
  const finalRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const JSONdata = JSON.stringify(inputs);
    const endpoint = "/api/addArchitect";
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
    console.log(date);
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
    onClose();
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
        disabled={!isValid}
      >
        <FormControl alignItems="center" mb={6}>
          <FormLabel htmlFor="firstName" mb={2}>
            First Name
          </FormLabel>
          <Input
            mb={4}
            required
            minLength={3}
            name="firstName"
            id="firstName"
            value={inputs.firstName || ""}
            onChange={handleInputChange}
            placeholder="First Name"
          />

          <FormLabel htmlFor="lastName" mb={2}>
            Last Name
          </FormLabel>
          <Input
            mb={4}
            required
            minLength={3}
            name="lastName"
            id="lastName"
            value={inputs.lastName || ""}
            onChange={handleInputChange}
            placeholder="Last Name"
          />

          <FormLabel htmlFor="country" mb={2}>
            Country
          </FormLabel>
          <Input
            mb={4}
            required
            minLength={3}
            name="country"
            id="country"
            value={inputs.country || ""}
            onChange={handleInputChange}
            placeholder="Country"
          />

          <FormLabel htmlFor="gender" mb={2}>
            Gender
          </FormLabel>
          <Select
            name="gender"
            id="gender"
            placeholder="Select gender"
            onChange={handleInputChange}
            mb={4}
          >
            <option value="option1">female</option>
            <option value="option2">male</option>
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
