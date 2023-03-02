import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";

export default function ArchitectDetail({
  img,
  title,
  description,
  tags,
  isOpen,
  handleClose,
}: {
  img: string;
  title: string;
  description: string;
  tags: string[];
  isOpen: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal onClose={handleClose} size={"full"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{description && description}</ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
