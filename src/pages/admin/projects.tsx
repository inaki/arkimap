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

type ProjectsType = {
  id: number;
  name: string;
  city: string;
  description: string;
  year: number;
  published: boolean;
  longitude: number;
  latitude: number;
  belongsToId: number;
};

type ProjectsProps = {
  Projects: ProjectsType[];
};

type ProjectInputProps = ExcludeTypes<ProjectType, "id">;

const ProjectDefaultInputs = {
  name: "",
  description: "",
  city: "",
  year: "",
  published: false,
};

type ProjectProps = {
  projects: ProjectType[];
};

const inputsData = [
  { name: "name", label: "Name", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "year", label: "Year", type: "number" },
];

const Projects = ({ projects }: ProjectProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isValid, setValid] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("Add Project");
  const [inputs, setInputs] = useState<ProjectInputProps>(ProjectDefaultInputs);
  const finalRef = useRef(null);

  const handleClose = () => {
    setInputs(ProjectDefaultInputs);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const JSONdata = JSON.stringify(inputs);
    const endpoint = "/api/project";
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

  const handleEditProject = (project) => {
    setButtonTitle("Edit Project");
    setInputs((inputs) => {
      return {
        ...inputs,
        name: project.name,
        cityId: project.cityId,
        year: project.year,
        published: project.published,
        description: project.description,
      };
    });
    onOpen();
  };

  return (
    <Box>
      <Flex>
        <Heading mb={10} ml={4} mr={10}>
          Projects
        </Heading>
        <IconButton
          onClick={onOpen}
          icon={<FiPlus />}
          aria-label="add project"
        />
      </Flex>

      <ModalWrapper
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        title="Add Project"
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
        <FormLabel htmlFor="description" mb={2}>
          Description
        </FormLabel>
        <Textarea
          mb={4}
          required
          minLength={3}
          name="description"
          id="description"
          value={inputs.description || ""}
          onChange={handleInputChange}
          placeholder="Description"
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
      </ModalWrapper>

      <TableContainer>
        <Table variant="simple">
          {/* <TableCaption>some caption i want to add on foot</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>City</Th>
              <Th>Year</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects?.map((project) => (
              <Tr key={project.id}>
                <Td>{project.name}</Td>
                <Td>
                  {project.city.name}, {project.city.country}
                </Td>
                <Td>{project.year}</Td>
                <Td>
                  <Button
                    onClick={() => handleEditProject(project)}
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

export default Projects;
