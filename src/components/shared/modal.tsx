import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

type ModalWrapperProps = {
  onClose: () => void;
  onOpen: () => void;
  children: React.ReactNode;
  isOpen: boolean;
  title?: string;
  disabled?: boolean;
  finalFocusRef: React.RefObject<any>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
};

function ModalWrapper({
  isOpen,
  onOpen,
  onSubmit,
  onClose,
  disabled = false,
  title = "",
  children,
  finalFocusRef,
  ...props
}: ModalWrapperProps) {
  const [isBrowser, setIsBrowser] = useState(false);
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const modalContent = isOpen ? (
    <>
      <Modal finalFocusRef={finalFocusRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {title.length ? <ModalHeader>{title}</ModalHeader> : null}
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              isDisabled={disabled}
              variant="ghost"
              onClick={handleSubmit}
              type="submit"
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, modalRoot);
  } else {
    return null;
  }
}

export default ModalWrapper;
