import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

type DataType = {
  name: string;
  country: string;
  img: string;
  biography: string;
  tags?: string[];
  dob: number;
};

export default function ArchitectDetail({
  data,
  isOpen,
  handleClose,
}: {
  data: DataType;
  isOpen: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal onClose={handleClose} size={"full"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{data.biography && data.biography}</ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
